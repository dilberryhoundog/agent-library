#!/usr/bin/env node
// Geometry regression suite for the classroom-pdf renderer.
//
// Every rule in mcp/print-base.css is pinned by a case below. The renderer is
// the only authority on its own behaviour, so a geometry claim is settled by
// running this, never by reasoning about Chromium.
//
//   node mcp/test/run-tests.js
//
// Cases render through the SAME code path the MCP tool uses (renderPdf from
// server.js, which injects print-base.css), then read the produced PDF back
// with pdf-inspect.js and assert on what a reader would actually see on paper:
// how many sheets, where the text sits relative to each sheet's edges, and
// which sheets carry which colours.

const os = require("os");
const path = require("path");
const fs = require("fs");

const { renderPdf, buildReport } = require("../server.js");
const { inspect } = require("../pdf-inspect.js");
const { disclose } = require("../css-inspect.js");

// The MCP host sets PUPPETEER_CACHE_DIR from .mcp.json; standalone runs need it
// pointed at the same Chromium the server uses.
if (!process.env.PUPPETEER_CACHE_DIR) {
  const dataDir = process.env.CLAUDE_PLUGIN_DATA || path.join(os.homedir(), ".claude", "classroom-data");
  process.env.PUPPETEER_CACHE_DIR = path.join(dataDir, "puppeteer");
}

const FIXTURES = path.join(__dirname, "fixtures");
const OUT = fs.mkdtempSync(path.join(os.tmpdir(), "classroom-geom-"));

const A4 = { w: 209.9, h: 297 };
const A4_LANDSCAPE = { w: 297, h: 209.9 };
const GREEN = "45,106,79";   // the fixtures' full-bleed colour
const BAND = "255,253,242";  // the fixtures' annotation-band tint

let passed = 0;
const failures = [];

function check(name, condition, detail) {
  if (condition) {
    passed++;
    console.log(`  ok   ${name}`);
  } else {
    failures.push(`${name} — ${detail}`);
    console.log(`  FAIL ${name}\n         ${detail}`);
  }
}

async function render(fixture) {
  const outputPath = path.join(OUT, fixture.replace(/\.html$/, ".pdf"));
  await renderPdf({ htmlPath: path.join(FIXTURES, fixture), outputPath });
  return inspect(outputPath);
}

const sheet = (p, want) => p.widthMm === want.w && p.heightMm === want.h;

async function main() {
  console.log(`\nclassroom-pdf geometry suite\noutput: ${OUT}\n`);

  // ---- Sheet size: CSS @page is authoritative -----------------------------
  // The tool passes preferCSSPageSize, so the document's @page size decides the
  // sheet. Without it, Chromium's own `format` wins and the CSS is decorative.
  console.log("sheet size");
  {
    const r = await render("content-short.html");
    check("A4 portrait from CSS @page", sheet(r.pages[0], A4), `got ${r.pages[0].widthMm}x${r.pages[0].heightMm}mm`);
  }
  {
    // A document's own @page overrides the injected base — the certificate case.
    const r = await render("override-landscape.html");
    check("document @page overrides the injected base (landscape)", sheet(r.pages[0], A4_LANDSCAPE), `got ${r.pages[0].widthMm}x${r.pages[0].heightMm}mm`);
    check("landscape override renders exactly 1 sheet", r.pageCount === 1, `got ${r.pageCount}`);
  }

  // ---- Phantom pages ------------------------------------------------------
  // A short document must not append a near-empty sheet. The fault this guards:
  // a box sized to the sheet rounds past the page box and spills a continuation.
  console.log("\nphantom pages");
  {
    const r = await render("content-short.html");
    check("short content page renders exactly 1 sheet", r.pageCount === 1, `got ${r.pageCount}`);
  }
  {
    const r = await render("pages-three.html");
    check("three short .page boxes render exactly 3 sheets", r.pageCount === 3, `got ${r.pageCount}`);
    check("no trailing blank sheet after the last .page", !r.pages[r.pages.length - 1].textless, "final sheet has no text");
  }
  {
    // A ten-sheet document (bleed cover + 9 content pages) splits Chromium's PDF
    // page tree into a root /Pages node over intermediate nodes with partial
    // counts. countPages must total the whole tree, not the first subtree it sees.
    const r = await render("pages-ten.html");
    check("a ten-sheet document counts exactly 10 sheets (split page tree)", r.pageCount === 10, `got ${r.pageCount}`);
    check("the per-page inspection also finds 10 sheets", r.pages.length === 10, `got ${r.pages.length}`);
  }

  // ---- Full bleed ---------------------------------------------------------
  // The `.bleed` box must fill its sheet edge-to-edge and STOP there. It is
  // capped with `height: 100vh` and `overflow: hidden`; the overflow also
  // establishes a block formatting context, without which a child's default top
  // margin (an <h1> is enough) collapses out and spills a coloured second
  // sheet. The fixture's heading deliberately keeps its user-agent margin.
  console.log("\nfull bleed");
  {
    const r = await render("bleed-cover.html");
    check("bleed cover alone renders exactly 1 sheet", r.pageCount === 1, `got ${r.pageCount}`);
    check("bleed colour reaches the sheet", r.pages[0].colours.includes(GREEN), `colours: ${r.pages[0].colours}`);
  }
  {
    const r = await render("bleed-then-content.html");
    check("bleed + 2 content pages renders exactly 3 sheets", r.pageCount === 3, `got ${r.pageCount}`);
    check("bleed colour on sheet 1 only", r.pages[0].colours.includes(GREEN) && !r.pages[1].colours.includes(GREEN), "bleed leaked past its sheet");
    check("content sheet 2 keeps its top margin", r.pages[1].textMargins && r.pages[1].textMargins.top >= 17, `top=${r.pages[1].textMargins && r.pages[1].textMargins.top}mm`);
  }

  // ---- Continuation sheets keep their margins ------------------------------
  // Page margins live on @page (per sheet), never on box padding (which applies
  // once, at the box's start and end). This is what a padding-based layout gets
  // wrong: the second sheet of an overflowing page starts flush to the paper.
  console.log("\ncontinuation sheets");
  {
    const r = await render("content-long.html");
    check("long content flows onto more than one sheet", r.pageCount > 1, `got ${r.pageCount}`);
    const bad = r.pages.filter((p) => !p.textMargins || p.textMargins.top < 17 || p.textMargins.left < 17);
    check("EVERY sheet keeps its top and left margin", bad.length === 0,
      `offending sheets: ${JSON.stringify(r.pages.map((p) => p.textMargins))}`);
  }

  // ---- Unbreakable components ---------------------------------------------
  console.log("\nunbreakable blocks");
  {
    const r = await render("block-unbreakable.html");
    // The tall .block is pushed whole onto the last sheet rather than split.
    const last = r.pages[r.pages.length - 1];
    check("a `.block` is not split across sheets", last.colours.includes("238,238,255"), `block colour missing from final sheet: ${last.colours}`);
  }

  // ---- Annotation band ----------------------------------------------------
  // A fixed-position band repeats on every sheet; the document reserves room for
  // it with a wider right page margin of its own.
  console.log("\nannotation band");
  {
    const r = await render("annotation-band.html");
    check("band spans more than one sheet", r.pageCount > 1, `got ${r.pageCount}`);
    const missing = r.pages.filter((p) => !p.colours.includes(BAND));
    check("band tint appears on EVERY sheet", missing.length === 0, `${missing.length} sheet(s) without the band`);
  }
  {
    // A fixed band repeats on every sheet, which must not include a cover: the
    // bleed stacks above it. CSS cannot select a sheet by number, so the cover
    // has to cover the band rather than the band having to skip the cover.
    const r = await render("band-with-cover.html");
    check("cover + content renders exactly 2 sheets", r.pageCount === 2, `got ${r.pageCount}`);
    check("band does NOT appear on the full-bleed cover", !r.pages[0].colours.includes(BAND), "band leaked onto the cover");
    check("band DOES appear on the content sheet", r.pages[1].colours.includes(BAND), "band missing from the content sheet");
  }

  // ---- Table headers ------------------------------------------------------
  console.log("\ntables");
  {
    const r = await render("table-long.html");
    check("long table spans more than one sheet", r.pageCount > 1, `got ${r.pageCount}`);
    const bad = r.pages.filter((p) => !p.textMargins || p.textMargins.top < 17);
    check("every table sheet keeps its top margin", bad.length === 0, "a sheet lost its top margin");
  }

  // ---- Source disclosure: the static, pre-flight half ---------------------
  // disclose() reads the DOCUMENT's own CSS only. A plain document overrides
  // nothing; the certificate case declares its own @page and must be disclosed
  // as such, with the properties it set.
  console.log("\nsource disclosure");
  {
    const src = fs.readFileSync(path.join(FIXTURES, "content-short.html"), "utf8");
    const d = disclose(src);
    check("a plain document discloses no override", d.overrides === false, JSON.stringify(d));
  }
  {
    const src = fs.readFileSync(path.join(FIXTURES, "override-landscape.html"), "utf8");
    const d = disclose(src);
    check("a document's own @page is disclosed as an override", d.overrides === true, JSON.stringify(d));
    check("the overridden properties are named", d.properties.includes("@page size") && d.properties.includes("@page margin"), JSON.stringify(d.properties));
    check("the declared size is parsed for the layout half", /a4\s+landscape/.test(d.declaredSize || ""), `declaredSize=${d.declaredSize}`);
  }

  // ---- The conversion report: disclosure + layout facts, combined ---------
  // buildReport is what the agent sees after every conversion. Its presence is
  // the verification mechanism, so its shape is pinned here.
  console.log("\nconversion report");
  {
    const outputPath = path.join(OUT, "report-standard.pdf");
    const result = await renderPdf({ htmlPath: path.join(FIXTURES, "content-short.html"), outputPath });
    const report = buildReport(result);
    check("standard document reports inheriting print mode", /Print mode: standard/.test(report), report);
    check("standard document reports its sheet count", /Sheets: 1/.test(report), report);
    check("a clean standard document reports no flags", /Flags: none/.test(report), report);
  }
  {
    const outputPath = path.join(OUT, "report-override.pdf");
    const result = await renderPdf({ htmlPath: path.join(FIXTURES, "override-landscape.html"), outputPath });
    const report = buildReport(result);
    check("override reports customised print mode with its properties", /Print mode: customised — overrides \[.*@page size.*\]/.test(report), report);
    check("a legitimate landscape override is NOT flagged as a wrong sheet size", !/not A4 landscape/.test(report) && !/not A4\b/.test(report), report);
  }

  // ---- Deeper layout facts (Phase 3) --------------------------------------
  // The report's Flags half must catch symptoms the page count cannot: content
  // wider than the column, an SVG escaping its viewBox, a sparse continuation
  // sheet. In standard mode the report also states the usable content box.
  console.log("\ndeeper layout facts");
  {
    const outputPath = path.join(OUT, "report-box.pdf");
    const result = await renderPdf({ htmlPath: path.join(FIXTURES, "content-short.html"), outputPath });
    const report = buildReport(result);
    check("standard mode states the usable content box", /Content box: 170 × 261 mm/.test(report), report);
  }
  {
    const outputPath = path.join(OUT, "report-wide.pdf");
    const result = await renderPdf({ htmlPath: path.join(FIXTURES, "overflow-wide.html"), outputPath });
    const report = buildReport(result);
    check("an over-wide element is caught by the DOM pass", result.dom.overflow.length > 0, JSON.stringify(result.dom));
    check("the over-wide element is named by selector as overflowing", /\.too-wide overflows the content box by \d/.test(report), report);
  }
  {
    const outputPath = path.join(OUT, "report-svg.pdf");
    const result = await renderPdf({ htmlPath: path.join(FIXTURES, "svg-overflow.html"), outputPath });
    const report = buildReport(result);
    check("an SVG drawing outside its viewBox is flagged", /svg\.diagram draws outside its viewBox/.test(report), report);
  }
  {
    // A genuinely full multi-sheet document must NOT trip the sparse-sheet flag
    // on its continuation sheets — only an early page break should.
    const outputPath = path.join(OUT, "report-long.pdf");
    const result = await renderPdf({ htmlPath: path.join(FIXTURES, "content-long.html"), outputPath });
    const report = buildReport(result);
    check("a filled multi-sheet document raises no sparse-sheet flag", !/% full/.test(report), report);
  }
  {
    // Fixed-width content inside a `.bleed` legitimately uses the full sheet, not
    // the content column — the DOM pass must exempt it, not flag it as overflow.
    const outputPath = path.join(OUT, "report-bleed-wide.pdf");
    const result = await renderPdf({ htmlPath: path.join(FIXTURES, "bleed-wide.html"), outputPath });
    const report = buildReport(result);
    check("full-bleed fixed-width content is NOT flagged as content-box overflow", !/overflows the content box/.test(report), report);
  }

  console.log(`\n${passed} passed, ${failures.length} failed\n`);
  if (failures.length) {
    for (const f of failures) console.log(`  FAILED: ${f}`);
    process.exit(1);
  }
  fs.rmSync(OUT, { recursive: true, force: true });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
