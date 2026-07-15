#!/usr/bin/env node
// classroom-pdf MCP server
//
// A deliberately tiny Model Context Protocol server bundled with the classroom
// plugin. It speaks newline-delimited JSON-RPC 2.0 over stdio (the MCP stdio
// transport) with no SDK dependency, and exposes ONE tool: html_to_pdf.
//
// Puppeteer is the only runtime dependency and is loaded lazily from the
// plugin's persistent data directory (CLAUDE_PLUGIN_DATA). If it is missing
// (first ever run, or a host where the SessionStart install never fired — e.g.
// some cowork containers), the tool self-heals by running install-deps.sh once
// and retrying. This keeps the server startable before its dependency exists.

const fs = require("fs");
const os = require("os");
const path = require("path");
const readline = require("readline");
const { createRequire } = require("module");
const { spawnSync } = require("child_process");

const { inspect } = require("./pdf-inspect.js");
const { disclose } = require("./css-inspect.js");

const PLUGIN_ROOT = process.env.CLAUDE_PLUGIN_ROOT || path.resolve(__dirname, "..");
const DATA_DIR =
  process.env.CLAUDE_PLUGIN_DATA || path.join(os.homedir(), ".claude", "classroom-data");

// The single authority for page geometry. Injected into every document, so no
// document has to carry (or can silently corrupt) its own paging rules.
const PRINT_BASE = path.join(__dirname, "print-base.css");

// ----- dependency loading ---------------------------------------------------

function requireFromData(mod) {
  // createRequire resolves node_modules upward from the given base path, so we
  // anchor it inside the persistent data dir where install-deps.sh installs.
  const req = createRequire(path.join(DATA_DIR, "noop.js"));
  return req(mod);
}

function installDeps() {
  const script = path.join(PLUGIN_ROOT, "scripts", "install-deps.sh");
  const res = spawnSync("bash", [script], {
    stdio: ["ignore", "ignore", "inherit"],
    env: process.env,
  });
  return res.status === 0;
}

function loadPuppeteer() {
  try {
    return requireFromData("puppeteer");
  } catch (_) {
    // Self-heal: install once, then retry. A second failure is surfaced.
    if (!installDeps()) {
      throw new Error(
        "puppeteer is not installed and install-deps.sh failed. Run " +
          `"bash ${path.join(PLUGIN_ROOT, "scripts", "install-deps.sh")}" manually and check Node/npm are available.`
      );
    }
    return requireFromData("puppeteer");
  }
}

// ----- the one tool ---------------------------------------------------------

const TOOL = {
  name: "html_to_pdf",
  description:
    "Render an HTML classroom document (workbook, answer key, guide, certificate) to a " +
    "print-ready A4 PDF using headless Chromium. Pass either inline `html` or a path to an " +
    "HTML file via `htmlPath`.\n\n" +
    "Page geometry — sheet size, per-sheet margins, page breaks, full-bleed covers — is " +
    "supplied by the renderer's own print-base.css, injected into every document. Documents " +
    "carry no paging rules of their own; a document that genuinely needs different geometry " +
    "declares its own CSS `@page` rule, which wins over the injected base.\n\n" +
    "Every conversion returns a report: the print mode (inheriting the house geometry, or " +
    "customised via the document's own `@page`), the sheet count, and any layout flags — a " +
    "near-empty sheet, or a sheet whose size is not the expected one.",
  inputSchema: {
    type: "object",
    properties: {
      html: { type: "string", description: "Inline HTML string to render. Provide this OR htmlPath." },
      htmlPath: { type: "string", description: "Absolute path to an HTML file to render. Provide this OR html." },
      outputPath: { type: "string", description: "Absolute path where the PDF is written (e.g. /project/workbook.pdf)." },
      printBackground: { type: "boolean", description: "Print background colours/images. Default true.", default: true },
    },
    required: ["outputPath"],
  },
};

async function renderPdf(args) {
  if (!args || typeof args.outputPath !== "string") {
    throw new Error("outputPath is required.");
  }
  if (!args.html && !args.htmlPath) {
    throw new Error("Provide either `html` (inline) or `htmlPath` (a file).");
  }

  // Source disclosure is a STATIC read of the document's own CSS, taken before
  // injection so the base's @page rules are never mistaken for the document's.
  const source = args.htmlPath ? fs.readFileSync(path.resolve(args.htmlPath), "utf8") : args.html;

  let printBase;
  try {
    printBase = fs.readFileSync(PRINT_BASE, "utf8");
  } catch (_) {
    // Rendering without the geometry base would silently produce a document
    // with no page margins, no page breaks, and no full-bleed handling. Fail
    // instead: a loud error beats a plausible-looking, wrong PDF.
    throw new Error(`The print geometry base is missing (expected at ${PRINT_BASE}). The plugin install is incomplete.`);
  }

  const puppeteer = loadPuppeteer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    if (args.htmlPath) {
      const url = "file://" + path.resolve(args.htmlPath);
      await page.goto(url, { waitUntil: "networkidle0" });
    } else {
      await page.setContent(args.html, { waitUntil: "networkidle0" });
    }

    // Inject the geometry base as the FIRST stylesheet in <head>, so a
    // document's own rules come later and win the cascade — that ordering is
    // what makes `@page` overridable by a document that needs it (a landscape
    // certificate, say) while every other document inherits the house geometry.
    await page.evaluate((css) => {
      const style = document.createElement("style");
      style.setAttribute("data-classroom-print-base", "");
      style.textContent = css;
      document.head.insertBefore(style, document.head.firstChild);
    }, printBase);

    // preferCSSPageSize makes the document's CSS `@page` the authority on sheet
    // size. Without it Chromium's own `format` wins and the CSS is decorative —
    // which is why page geometry used to be unpredictable. No `format`,
    // `landscape` or `margin` argument is passed for the same reason: one
    // authority for geometry, and it is the CSS.
    await page.pdf({
      path: args.outputPath,
      printBackground: args.printBackground !== false,
      preferCSSPageSize: true,
    });

    return {
      outputPath: args.outputPath,
      disclosure: disclose(source),
      inspection: inspect(args.outputPath),
    };
  } finally {
    await browser.close();
  }
}

// ----- the conversion report ------------------------------------------------
//
// Combines the static source disclosure with the rendered layout facts into the
// single report the agent sees after every conversion. Its PRESENCE is the
// verification mechanism — reacting to present tool output is default agent
// behaviour, so the skill carries no "check the page count" instruction.

const A4 = { w: 209.9, h: 297, label: "A4" };

// The sheet the layout half expects, derived from what the document disclosed.
// `null` when the declared size is one we cannot map to millimetres — better to
// emit no size flag than a wrong one.
function expectedSheet(declaredSize) {
  if (!declaredSize) return A4; // inheriting, or an override that left size alone
  const landscape = /\blandscape\b/.test(declaredSize);
  let base;
  if (/\ba4\b/.test(declaredSize)) base = { w: 209.9, h: 297 };
  else if (/\bletter\b/.test(declaredSize)) base = { w: 215.9, h: 279.4 };
  else return null;
  const { w, h } = landscape ? { w: base.h, h: base.w } : base;
  const label = /\ba4\b/.test(declaredSize) ? "A4" : "Letter";
  return { w, h, label: landscape ? `${label} landscape` : label };
}

const near = (a, b) => Math.abs(a - b) <= 1;

function layoutFlags(inspection, expected) {
  const flags = [];
  inspection.pages.forEach((p, i) => {
    const n = i + 1;
    if (p.textless) flags.push(`sheet ${n} is near-empty`);
    if (expected && p.widthMm != null && p.heightMm != null &&
        !(near(p.widthMm, expected.w) && near(p.heightMm, expected.h))) {
      flags.push(`sheet ${n} is ${p.widthMm}×${p.heightMm}mm, not ${expected.label}`);
    }
  });
  return flags;
}

function buildReport({ outputPath, disclosure, inspection }) {
  const mode = disclosure.overrides
    ? `customised — overrides [${disclosure.properties.join(", ")}]`
    : "standard — inheriting from print-base.css";
  const flags = layoutFlags(inspection, expectedSheet(disclosure.declaredSize));
  return (
    `PDF written to ${outputPath}.\n` +
    `  Print mode: ${mode}\n` +
    `  Sheets: ${inspection.pageCount}\n` +
    `  Flags: ${flags.length ? flags.join("; ") : "none"}`
  );
}

// ----- JSON-RPC plumbing ----------------------------------------------------

const PROTOCOL_VERSION = "2024-11-05";

function send(msg) {
  process.stdout.write(JSON.stringify(msg) + "\n");
}

function reply(id, result) {
  send({ jsonrpc: "2.0", id, result });
}

function replyError(id, code, message) {
  send({ jsonrpc: "2.0", id, error: { code, message } });
}

async function handle(msg) {
  const { id, method, params } = msg;

  // Notifications (no id) require no response.
  if (id === undefined || id === null) return;

  switch (method) {
    case "initialize":
      reply(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: { name: "classroom-pdf", version: "0.1.0" },
      });
      return;

    case "tools/list":
      reply(id, { tools: [TOOL] });
      return;

    case "tools/call": {
      const name = params && params.name;
      if (name !== "html_to_pdf") {
        replyError(id, -32602, `Unknown tool: ${name}`);
        return;
      }
      try {
        const result = await renderPdf((params && params.arguments) || {});
        reply(id, {
          content: [{ type: "text", text: buildReport(result) }],
        });
      } catch (err) {
        reply(id, {
          content: [{ type: "text", text: `Failed to render PDF: ${err.message}` }],
          isError: true,
        });
      }
      return;
    }

    case "ping":
      reply(id, {});
      return;

    default:
      replyError(id, -32601, `Method not found: ${method}`);
  }
}

module.exports = { renderPdf, buildReport, loadPuppeteer, DATA_DIR };

if (require.main === module) {
  const rl = readline.createInterface({ input: process.stdin });
  rl.on("line", (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    let msg;
    try {
      msg = JSON.parse(trimmed);
    } catch (_) {
      return; // ignore non-JSON lines
    }
    Promise.resolve(handle(msg)).catch((err) => {
      if (msg && msg.id != null) replyError(msg.id, -32603, String(err && err.message));
    });
  });
}
