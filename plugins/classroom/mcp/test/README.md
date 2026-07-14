# Geometry regression suite

Run it:

```
node mcp/test/run-tests.js
```

It renders each fixture in `fixtures/` through the same code path the `html_to_pdf` tool uses (so `print-base.css` is injected exactly as it is in production), reads the produced PDF back with `../pdf-inspect.js`, and asserts on what a reader would see on paper: how many sheets, where the text sits relative to each sheet's edges, and which sheets carry which colours.

## The rule

**Every rule in `mcp/print-base.css` traces to a case here.** Change a geometry rule, change its case. A geometry claim is settled by running the renderer, never by reasoning about what Chromium ought to do — the whole class of faults this suite exists to prevent came from plausible reasoning that the renderer did not honour.

## Why the fixtures carry no CSS reset

Deliberate. The injected base has to hold up in a document that resets nothing, because hand-written documents will be exactly that. Two of the faults this suite pins are only reachable without a reset:

- **`body`'s user-agent margin.** 8px of it, added to the block flow above a full-height element, makes a full-bleed cover 16px taller than the sheet — which spills a near-empty second sheet carrying the cover's background colour. The base neutralises `html`/`body` in print for this reason.
- **A child's collapsing top margin.** An `<h1>` with its default margin collapses *out* of a full-bleed box and pushes it past the sheet, with the same result. `.bleed` establishes a block formatting context (`overflow: hidden`) so it cannot.

Both faults depend on what a given document happens to reset, which is why they historically appeared on some documents and not others and looked nondeterministic. The fixtures keep the user-agent margins so the suite keeps catching them.

## What each fixture pins

- `content-short.html` — a short page renders exactly one sheet (no phantom trailing sheet).
- `content-long.html` — content overflowing one sheet keeps its page margins on **every** continuation sheet. This is what page-box margins buy that box padding cannot: padding applies once, at the box's start and end, so a padding-based layout leaves continuation sheets flush against the paper.
- `pages-three.html` — three `.page` boxes make exactly three sheets, with no trailing blank.
- `bleed-cover.html` — a full-bleed cover fills its sheet and stops there.
- `bleed-then-content.html` — the bleed colour reaches sheet 1 and no further; the content sheets after it keep their margins.
- `override-landscape.html` — a document's own `@page` beats the injected base. This is the sanctioned override lever (certificates use it), and it works because the base is injected as the *first* stylesheet.
- `block-unbreakable.html` — an element carrying `block` moves whole to the next sheet rather than splitting.
- `annotation-band.html` — a fixed-position band repeats on every sheet.
- `table-long.html` — a table taller than one sheet keeps its margins and repeats its header row.
