# Classroom — project configuration

The all-in-one signal and configuration file for this classroom project. It loads on every session. This file is **maintained by the agent**: update it as the classroom changes — new learners, a finished course, a shift in where working files are kept.

<!-- On first setup, fill the bracketed fields below and delete this comment and any bracket prompts you have resolved. Keep the section structure. -->

## This project

- **Family / classroom:** <family or classroom name>
- **Storage root:** this project root (`.`)
- **Standing requirements:** `global-requirements.md`
- **Learners:** one file per learner in `students/` (see roster below)
- **Working outputs:** <where finished builds are saved, e.g. `builds/<subject>/`>
- **Document sources:** the HTML each PDF was rendered from, in a `source/` folder beside it

## Learner roster

<!-- One line per learner once their student file exists. Create a learner file by reading
the skill's references/students/\_template.md and writing students/<name>.md. -->

- <learner name> — `students/<name>.md` — <one-line: age/stage, current focus>

## PDF delivery

Write each document's HTML to a `source/` folder beside its PDF, then convert it by passing that file's path as `htmlPath` to the `html_to_pdf` tool (classroom-pdf MCP server). The saved HTML is the editable copy — corrections and later units reopen it. Fallback when the tool is unavailable: still save the HTML, then the user prints to PDF (A4, margins off).

Page geometry is injected by the tool and is not written into documents. A document carries identity styling only, plus three classes: `block` on a component that must not split across a page break, `bleed` on a page that reaches the paper's edge, `annotated` on a content page wanting the annotation band. Never size a box to the sheet in print. To change geometry for one document, declare an `@page` rule in it — the injected base loads first, so the document's own rule wins. The tool reports the PDF's page count: check it against the count the document was written to have, since a surplus page means content overflowed its sheet.

## Status / resume notes

<!-- Short running log so the next session can pick up: what's built, what's approved, what's next. The agent keeps this current. -->

- <e.g. "Fractions unit: scope & sequence approved; units 1–3 built; unit 4 next.">

## Setup

To (re)bootstrap this project or understand the file layout, read the skill's `references/setup.md`.
