---
harness-format: DraftHorse, Handover
---

# Deliver Without the Renderer (Handover)

Deliver a finished classroom document as a print-ready file when the `html_to_pdf` tool is unavailable on this host, so a build is not blocked by a missing PDF engine. A parent step folds this in whenever a document is ready but the renderer cannot run.

# --- REFERENCES ---

## The Geometry Base

=== the stylesheet the renderer injects, and where it belongs ===
The geometry lives at `${CLAUDE_PLUGIN_ROOT}/mcp/print-base.css`. Its correct position is the **first child of `<head>`**: earlier than the document's own `<style>`, so that `<style>` (and any `@page` it declares) comes later and wins the cascade, exactly as under the tool.

# --- STEPS ---

> Handovers are child steps of a parent step:
>
>- The parent step reads success from the state the handover leaves behind.
>- Invoke a child step any time its *start* conditions are met.
>- If all child steps are *finished* or inactive, return to the parent step and continue.
>- Error handling is covered by the parent document, unless an optional child problem step is present.
>- Global invariants apply across the whole parent step; step invariants are confined to the child step.

## +Produce a Print-Ready Standalone

Turn a geometry-less source document into a file that prints correctly from a browser.

#### Start this step when these are true:

- a document's HTML is written to `source/`
- the renderer cannot run
- no current print-ready standalone exists for it — none produced yet, or the `source/` HTML has changed since the last one was written

#### Step finished when these are true:

- a standalone file sits beside the source (named to mark it a delivery copy, e.g. `workbook.print.html` next to `workbook.html`), with the geometry base inlined as the first `<style>` in its `<head>`
- the `source/` HTML is unchanged
- the user has been told to open the standalone and print it to PDF at A4 (Print → Save as PDF, paper A4)

#### Step invariants:

**NEVER** write the injected geometry into the `source/` HTML — it stays the clean, renderer-ready copy that later sessions reopen. The inlined file is a separate, throwaway delivery artifact.

### Inline and Hand Over:

Read the geometry base named in `The Geometry Base` and the document's `source/` HTML. Write a copy of that HTML with the base inlined as the first `<style>` element in `<head>`, saved beside the source under a `.print.html` name so it is never mistaken for the editable copy. Tell the user this print-ready file is their deliverable for now: open it in a browser and Save as PDF at A4. Note that the plain `source/` file stays the copy to edit, and that a normal re-conversion will produce the PDF directly once the renderer is available.
