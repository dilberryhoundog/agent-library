# Classroom — project configuration

The all-in-one signal and configuration file for this classroom project. It loads on every session. This file is **maintained by the agent**: update it as the classroom changes — new learners, a finished course, a shift in where working files are kept.

<!-- On first setup, fill the bracketed fields below and delete this comment and any
   bracket prompts you have resolved. Keep the section structure. -->

## This project

- **Family / classroom:** <family or classroom name>
- **Storage root:** this project root (`.`)
- **Standing requirements:** `global-requirements.md`
- **Learners:** one file per learner in `students/` (see roster below)
- **Working outputs:** <where finished builds are saved, e.g. `builds/<subject>/`>

## Learner roster

<!-- One line per learner once their student file exists. Create a learner file by reading
the skill's references/students/\_template.md and writing students/<name>.md. -->

- <learner name> — `students/<name>.md` — <one-line: age/stage, current focus>

## PDF delivery

Convert finished HTML to A4 PDF with the `html_to_pdf` tool (classroom-pdf MCP server).
Fallback when unavailable: deliver HTML, user prints to PDF (A4, margins off).

## Status / resume notes

<!-- Short running log so the next session can pick up: what's built, what's approved,
what's next. The agent keeps this current. -->

- <e.g. "Fractions unit: scope & sequence approved; units 1–3 built; unit 4 next.">

## Setup

To (re)bootstrap this project or understand the file layout, read the skill's
`references/setup.md`.
