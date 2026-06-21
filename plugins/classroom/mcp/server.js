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

const os = require("os");
const path = require("path");
const readline = require("readline");
const { createRequire } = require("module");
const { spawnSync } = require("child_process");

const PLUGIN_ROOT = process.env.CLAUDE_PLUGIN_ROOT || path.resolve(__dirname, "..");
const DATA_DIR =
  process.env.CLAUDE_PLUGIN_DATA || path.join(os.homedir(), ".claude", "classroom-data");

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
    "Render HTML to a faithful, print-ready PDF (A4 by default) using headless Chromium. " +
    "Use this to convert finished classroom documents (workbooks, answer keys, guides) into " +
    "the deliverable PDF. Pass either inline `html` or a path to an HTML file via `htmlPath`.",
  inputSchema: {
    type: "object",
    properties: {
      html: { type: "string", description: "Inline HTML string to render. Provide this OR htmlPath." },
      htmlPath: { type: "string", description: "Absolute path to an HTML file to render. Provide this OR html." },
      outputPath: { type: "string", description: "Absolute path where the PDF is written (e.g. /project/workbook.pdf)." },
      format: { type: "string", description: "Paper size. Default 'A4'.", default: "A4" },
      landscape: { type: "boolean", description: "Landscape orientation. Default false.", default: false },
      printBackground: { type: "boolean", description: "Print background colours/images. Default true.", default: true },
      margin: {
        type: "object",
        description: "Page margins, e.g. {\"top\":\"0\",\"bottom\":\"0\",\"left\":\"0\",\"right\":\"0\"}. Default 0 all sides so the document's own layout controls margins.",
        properties: {
          top: { type: "string" },
          bottom: { type: "string" },
          left: { type: "string" },
          right: { type: "string" },
        },
      },
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
    const margin = args.margin || { top: "0", bottom: "0", left: "0", right: "0" };
    await page.pdf({
      path: args.outputPath,
      format: args.format || "A4",
      landscape: args.landscape === true,
      printBackground: args.printBackground !== false,
      margin,
    });
    return args.outputPath;
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
        const outPath = await renderPdf((params && params.arguments) || {});
        reply(id, {
          content: [{ type: "text", text: `PDF written to ${outPath}` }],
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
