---
type: handover
---

# Deliver Without the Renderer (Handover)

Deliver a finished classroom document as a print-ready file when the `html_to_pdf` tool is unavailable on this host, so a build is not blocked by a missing PDF engine. A handover doc — a master step folds this in whenever a document is ready but the renderer cannot run. Its step runs as a sub-step of that master step, and its references and invariants come into play for the run; it leans on the master document's tool grants. It routes no success or failure of its own: the master step reads the delivered standalone from the run, and a failure falls to the master document's problem step.

The document shells carry no page geometry of their own — the `html_to_pdf` tool injects it from `print-base.css` at conversion. So a shell handed straight to a browser prints with no margins, no page breaks, and the wrong sheet size. The fix is to do by hand what the tool does automatically: inline that same geometry into a throwaway delivery copy, and leave the editable `source/` file untouched for when the renderer returns.

# Agent Invariants

**NEVER** write the injected geometry into the `source/` HTML — it stays the clean, renderer-ready copy that later sessions reopen. The inlined file is a separate, throwaway delivery artifact.

# --- REFERENCES ---

## The Geometry Base

=== the stylesheet the renderer injects, and where the agent inlines it ===
The geometry lives at `${CLAUDE_PLUGIN_ROOT}/mcp/print-base.css`. Inline it as a `<style>` element that is the **first child of `<head>`** — first, so the document's own `<style>` (and any `@page` it declares) comes later and wins the cascade, exactly as it does under the tool.

# --- STEPS ---

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.
>- A step may fold in a handover doc: follow its steps as sub-steps of that master step, which handles their exits and errors; when they are done, keep going with the master step.

## +Produce a Print-Ready Standalone

Turn a geometry-less source document into a file that prints correctly from a browser.

#### Start this step when:

A document's HTML is written to `source/`, the renderer cannot run, and no print-ready standalone has yet been produced for it.

#### Step finished when:

A standalone file sits beside the source (named to mark it a delivery copy, e.g. `workbook.print.html` next to `workbook.html`) with the geometry base inlined as the first `<style>` in its `<head>`, the `source/` HTML is unchanged, and the user has been told to open the standalone and print it to PDF at A4 (Print → Save as PDF, paper A4).

### Inline and Hand Over:

Read the geometry base named in `The Geometry Base` and the document's `source/` HTML. Write a copy of that HTML with the base inlined as the first `<style>` element in `<head>`, saved beside the source under a `.print.html` name so it is never mistaken for the editable copy. Tell the user this print-ready file is their deliverable for now: open it in a browser and Save as PDF at A4. Note that the plain `source/` file stays the copy to edit, and that a normal re-conversion will produce the PDF directly once the renderer is available.
