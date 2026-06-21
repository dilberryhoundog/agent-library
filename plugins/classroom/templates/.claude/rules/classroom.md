# Classroom project

This folder is an instantiated **classroom** — a home-education workspace driven by the
`classroom` skill (from the classroom plugin).

## What the agent does here

- When the user wants to create, extend, rebuild, or mark any home-education material
  (unit studies, workbooks, answer keys, scope & sequence, parent guides, certificates,
  reports), use the **classroom** skill. It is the orchestrator for all of that work.
- Treat this project root as the classroom **storage root**. The family's standing
  constants are in `global-requirements.md`; one file per learner lives in `students/`.
  Read those before building; do not re-ask for what they already record.

## Producing PDFs

Finished documents are authored as HTML and delivered as A4 PDF. Convert with the
`html_to_pdf` tool from the **classroom-pdf** MCP server (bundled with the plugin). If
that tool is unavailable on this host, deliver paste-ready HTML and tell the user to
convert in the browser: Print → Save as PDF (A4, margins off).

## Configuration and setup

Resolved, per-project configuration is in `CLAUDE.md`. If this project still has unfilled
placeholders, or you need to (re)bootstrap it, the full setup process is in the skill's
`references/setup.md`.
