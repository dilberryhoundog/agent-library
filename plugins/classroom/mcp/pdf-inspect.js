// Dependency-free PDF inspection for the classroom renderer.
//
// The renderer's failure modes (phantom pages, lost continuation margins,
// full-bleed spill) are only observable in the produced PDF, so both the MCP
// server and the geometry regression suite read the output back through here.
//
// Two facts are extracted straight from the PDF byte stream, with no parser
// dependency:
//   - page count, from the page tree
//   - per-page geometry: sheet size, and the ink bounding box (the extent of
//     the drawing and text operators inside the page's content stream)
//
// The ink bounding box is what makes a margin assertable: the gap between the
// sheet edge and the ink is the margin the reader actually sees on paper.

const fs = require("fs");
const zlib = require("zlib");

const PT_PER_MM = 72 / 25.4;
const mm = (pt) => pt / PT_PER_MM;

function countPages(pdfBuffer) {
  const text = pdfBuffer.toString("latin1");
  // The page tree is not always a single /Pages node. Once a document grows past
  // a handful of pages, Chromium splits it into a ROOT /Pages node (whose /Count
  // is the total) over intermediate /Pages nodes carrying PARTIAL counts — and an
  // intermediate node can sit earlier in the byte stream than the root. Reading
  // the FIRST /Count therefore under-counts by whatever the other subtrees hold.
  // Take the MAX /Count across every /Pages node (the root's total is the
  // largest), matching /Count on either side of /Type within the same dict.
  const counts = [];
  let m;
  const forward = /\/Type\s*\/Pages\b[^>]{0,400}?\/Count\s+(\d+)/g;
  while ((m = forward.exec(text)) !== null) counts.push(parseInt(m[1], 10));
  const backward = /\/Count\s+(\d+)[^>]{0,400}?\/Type\s*\/Pages\b/g;
  while ((m = backward.exec(text)) !== null) counts.push(parseInt(m[1], 10));
  // Cross-check against the leaf /Page objects (\b after "Page" excludes
  // "/Pages"); they give the same total whenever they are not hidden inside
  // compressed object streams, and correct a /Count that only saw a subtree.
  const leaves = (text.match(/\/Type\s*\/Page\b/g) || []).length;
  if (leaves) counts.push(leaves);
  return counts.length ? Math.max(...counts) : 0;
}

// Every "N 0 obj ... endobj" in the file, keyed by object number.
function indexObjects(buf) {
  const text = buf.toString("latin1");
  const objects = new Map();
  const re = /(\d+)\s+\d+\s+obj\b/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const start = m.index + m[0].length;
    const end = text.indexOf("endobj", start);
    if (end === -1) continue;
    objects.set(parseInt(m[1], 10), { start, end, header: text.slice(start, Math.min(start + 400, end)) });
  }
  return { text, objects };
}

// A stream's bytes, inflated when the object declares FlateDecode.
function streamBytes(buf, text, obj) {
  const sliceHeader = text.slice(obj.start, obj.end);
  const sIdx = sliceHeader.indexOf("stream");
  if (sIdx === -1) return null;
  let dataStart = obj.start + sIdx + "stream".length;
  if (text[dataStart] === "\r") dataStart++;
  if (text[dataStart] === "\n") dataStart++;
  const endIdx = text.indexOf("endstream", dataStart);
  if (endIdx === -1) return null;
  const raw = buf.subarray(dataStart, endIdx);
  if (/\/FlateDecode/.test(sliceHeader)) {
    try {
      return zlib.inflateSync(raw);
    } catch (_) {
      return null;
    }
  }
  return raw;
}

// The TEXT bounding box: where the page actually places glyphs. Chromium emits
// its page content under a uniform scale (CSS px -> PDF points, `s 0 0 s 0 0
// cm`), so the leading `cm` operator is read and applied; without it every
// coordinate is off by that factor.
//
// Only text placements are measured, deliberately. Page-filling background
// rectangles (Chromium paints an opaque white sheet) would peg any ink box to
// the paper's edge and make every margin read as zero — the glyphs are what a
// reader sees as the margin.
// Affine matrices are [a b c d e f], applied to a row vector:
//   x' = a*x + c*y + e      y' = b*x + d*y + f
const IDENTITY = [1, 0, 0, 1, 0, 0];

// compose(M, N) — apply M, then N.
function compose(M, N) {
  return [
    M[0] * N[0] + M[1] * N[2],
    M[0] * N[1] + M[1] * N[3],
    M[2] * N[0] + M[3] * N[2],
    M[2] * N[1] + M[3] * N[3],
    M[4] * N[0] + M[5] * N[2] + N[4],
    M[4] * N[1] + M[5] * N[3] + N[5],
  ];
}

function textBox(content) {
  const s = content.toString("latin1");

  // A content stream must be INTERPRETED, not pattern-matched. Chromium draws
  // the page under a scale-and-flip transform (`3.125 0 0 3.125 237.5 212.5 cm`
  // with a `1 0 0 -1 ... Tm` text matrix), so a raw `Tm` coordinate is neither
  // in points nor measured from the sheet's bottom-left. Reading the operators
  // without composing the matrices puts every glyph at the wrong place — and,
  // because the numbers still look plausible, does so silently.
  //
  // So: track the graphics-state stack (q/Q/cm) and the text matrices (Tm, and
  // the relative moves Td/TD/T*), and record a point wherever glyphs are
  // actually shown (Tj/TJ/'/"). The result is in PDF user space: points, origin
  // at the sheet's bottom-left.
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const note = (x, y) => {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  };

  let ctm = IDENTITY;
  const stack = [];
  let tm = IDENTITY;   // text matrix
  let tlm = IDENTITY;  // text line matrix
  let leading = 0;

  const tokens = s.match(/\[[^\]]*\]|\((?:\\.|[^\\)])*\)|<[0-9A-Fa-f\s]*>|\/[^\s/<>[\]()]+|-?[\d.]+|[A-Za-z'"*]+/g) || [];
  const nums = [];
  const showGlyphs = () => {
    const m = compose(tm, ctm); // glyph origin (0,0) in text space
    note(m[4], m[5]);
  };

  for (const tok of tokens) {
    if (/^-?[\d.]+$/.test(tok)) {
      nums.push(Number(tok));
      continue;
    }
    if (tok[0] === "/" || tok[0] === "[" || tok[0] === "(" || tok[0] === "<") continue;

    switch (tok) {
      case "q":
        stack.push(ctm);
        break;
      case "Q":
        ctm = stack.pop() || IDENTITY;
        break;
      case "cm":
        if (nums.length >= 6) ctm = compose(nums.slice(-6), ctm);
        break;
      case "BT":
        tm = tlm = IDENTITY;
        break;
      case "Tm":
        if (nums.length >= 6) tm = tlm = nums.slice(-6);
        break;
      case "TD":
        if (nums.length >= 2) leading = -nums[nums.length - 1];
      // falls through — TD also moves like Td
      case "Td":
        if (nums.length >= 2) {
          tlm = compose([1, 0, 0, 1, nums[nums.length - 2], nums[nums.length - 1]], tlm);
          tm = tlm;
        }
        break;
      case "TL":
        if (nums.length >= 1) leading = nums[nums.length - 1];
        break;
      case "T*":
        tlm = compose([1, 0, 0, 1, 0, -leading], tlm);
        tm = tlm;
        break;
      case "'":
      case '"':
        tlm = compose([1, 0, 0, 1, 0, -leading], tlm);
        tm = tlm;
        showGlyphs();
        break;
      case "Tj":
      case "TJ":
        showGlyphs();
        break;
      default:
        break;
    }
    nums.length = 0;
  }

  if (minX === Infinity) return null; // no glyphs on this sheet
  return { minX, minY, maxX, maxY };
}

// Distinct non-white fill colours a page paints (`r g b rg`), rounded — used to
// assert that a decorative element (a tint band, a full-bleed panel) is present
// on a given sheet.
function fillColours(content) {
  const s = content.toString("latin1");
  const out = new Set();
  const re = /(-?[\d.]+)\s+(-?[\d.]+)\s+(-?[\d.]+)\s+rg\b/g;
  let m;
  while ((m = re.exec(s)) !== null) {
    const rgb = m.slice(1, 4).map((v) => Math.round(Number(v) * 255));
    out.add(rgb.join(","));
  }
  return [...out];
}

// Per-page report:
//   widthMm/heightMm — the sheet
//   textless         — the sheet places no glyphs (a phantom sheet, or a
//                      deliberately wordless full-bleed panel)
//   colours          — distinct fill colours, as "r,g,b" (0-255)
//   textMargins      — mm from each sheet edge to the nearest glyph ORIGIN.
//                      `top` and `left` are therefore exact; `right` and
//                      `bottom` measure to where the outermost run STARTS, not
//                      where it ends, so they read larger than the true margin.
//                      Assert on top/left.
function inspect(pdfPath) {
  const buf = fs.readFileSync(pdfPath);
  const { text, objects } = indexObjects(buf);
  const pages = [];

  for (const [, obj] of objects) {
    if (!/\/Type\s*\/Page\b/.test(obj.header)) continue;
    const box = obj.header.match(/\/MediaBox\s*\[\s*([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s*\]/);
    const contentsRef = obj.header.match(/\/Contents\s+(\d+)\s+\d+\s+R/);
    const width = box ? Number(box[3]) : null;
    const height = box ? Number(box[4]) : null;

    let tb = null;
    let colours = [];
    if (contentsRef) {
      const cObj = objects.get(parseInt(contentsRef[1], 10));
      if (cObj) {
        const bytes = streamBytes(buf, text, cObj);
        if (bytes) {
          tb = textBox(bytes);
          colours = fillColours(bytes);
        }
      }
    }

    pages.push({
      widthMm: width == null ? null : +mm(width).toFixed(1),
      heightMm: height == null ? null : +mm(height).toFixed(1),
      textless: !tb,
      colours,
      textMargins: tb && height != null && width != null
        ? {
            top: +mm(height - tb.maxY).toFixed(1),
            bottom: +mm(tb.minY).toFixed(1),
            left: +mm(tb.minX).toFixed(1),
            right: +mm(width - tb.maxX).toFixed(1),
          }
        : null,
    });
  }

  return { pageCount: countPages(buf), pages };
}

module.exports = { countPages, inspect };
