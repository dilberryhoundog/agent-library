// Source disclosure for the classroom renderer — the STATIC, pre-flight half of
// the conversion report.
//
// The renderer injects print-base.css as the first stylesheet of every
// document, so any `@page` rule the document itself declares comes later and
// wins the cascade (see server.js). That override is legitimate — the
// certificate is landscape with no margin — so this module never renders a
// verdict. It only DISCLOSES: did the document override the house geometry, and
// with which properties?
//
// Disclosure pairs with the rendered layout facts (pdf-inspect.js): a document
// that discloses "inheriting" but produces a US-Letter sheet is the signature of
// the base failing to inject — a fact neither half can see alone.

// Every `@page` block in the source, unnamed or named:
//   @page { size: A4 landscape; margin: 0 }   ->  name: "", body: "size:...; margin:0"
//   @page cover { margin: 0 }                 ->  name: "cover", body: "margin:0"
//   @page{ margin: 0 }                        ->  name: "", body: "margin:0" (no space)
const PAGE_RULE = /@page\s*([A-Za-z-]+)?\s*\{([^}]*)\}/g;

// The `size:` value of the default (unnamed) @page, normalised to lower case.
// Used by the layout half as the EXPECTED sheet size: a document that legitimately
// declares `size: A4 landscape` must not be flagged for producing a landscape sheet.
function parseDeclaredSize(body) {
  const m = body.match(/\bsize\s*:\s*([^;]+)/i);
  return m ? m[1].trim().toLowerCase() : null;
}

// disclose(htmlSource) — scan a document's own CSS for @page overrides.
// Returns:
//   overrides    — did the document declare any @page rule at all
//   properties   — the facets it set, as human labels ("@page size", "@page margin",
//                  "@page cover"), for the report's "overrides [...]" list
//   declaredSize — the default @page's `size` value, or null if it declares none
function disclose(htmlSource) {
  const src = String(htmlSource || "");
  const properties = [];
  let declaredSize = null;
  let overrides = false;

  PAGE_RULE.lastIndex = 0;
  let m;
  while ((m = PAGE_RULE.exec(src)) !== null) {
    overrides = true;
    const name = (m[1] || "").trim();
    const body = m[2] || "";

    if (name) {
      const label = `@page ${name}`;
      if (!properties.includes(label)) properties.push(label);
      continue;
    }
    if (/\bsize\s*:/i.test(body)) {
      if (!properties.includes("@page size")) properties.push("@page size");
      declaredSize = parseDeclaredSize(body) || declaredSize;
    }
    if (/\bmargin\s*:/i.test(body)) {
      if (!properties.includes("@page margin")) properties.push("@page margin");
    }
  }

  return { overrides, properties, declaredSize };
}

module.exports = { disclose };
