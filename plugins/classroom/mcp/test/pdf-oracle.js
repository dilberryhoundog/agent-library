// Shared helper: extract the page count from a rendered PDF buffer without a
// PDF parsing dependency. Reads the page tree's `/Type /Pages ... /Count N`
// entry, falling back to counting standalone `/Type /Page` objects if no
// `/Count` is found (some writers omit or split the tree).
const fs = require("fs");

function countPages(pdfBuffer) {
  const text = pdfBuffer.toString("latin1");

  const pagesMatch = text.match(/\/Type\s*\/Pages\b[^>]*?\/Count\s+(\d+)/);
  if (pagesMatch) return parseInt(pagesMatch[1], 10);

  // /Count can precede /Type in some writers; search both orders.
  const countFirst = text.match(/\/Count\s+(\d+)[^>]*?\/Type\s*\/Pages\b/);
  if (countFirst) return parseInt(countFirst[1], 10);

  // Fallback: count distinct page objects.
  const pageObjs = text.match(/\/Type\s*\/Page[^s]/g);
  return pageObjs ? pageObjs.length : 0;
}

function countPagesFromFile(pdfPath) {
  return countPages(fs.readFileSync(pdfPath));
}

module.exports = { countPages, countPagesFromFile };
