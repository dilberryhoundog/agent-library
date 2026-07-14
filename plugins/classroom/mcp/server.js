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

const { countPages } = require("./pdf-inspect.js");

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
    "The result reports the PDF's page count. Check it against the page count the document " +
    "was written to have: a surplus page is the signature of content overflowing its sheet.",
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

    return { outputPath: args.outputPath, pageCount: countPages(fs.readFileSync(args.outputPath)) };
  } finally {
    await browser.close();
  }
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
        const { outputPath, pageCount } = await renderPdf((params && params.arguments) || {});
        const sheets = pageCount === 1 ? "1 page" : `${pageCount} pages`;
        reply(id, {
          content: [
            {
              type: "text",
              text:
                `PDF written to ${outputPath} (${sheets}).\n` +
                "Check that page count against the count this document was written to have. " +
                "A surplus page means content overflowed its sheet.",
            },
          ],
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

module.exports = { renderPdf, loadPuppeteer, DATA_DIR };

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
