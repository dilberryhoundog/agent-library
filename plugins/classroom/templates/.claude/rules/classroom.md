# Classroom project

This folder is an instantiated **classroom** — a home-education workspace driven by the `classroom` skill (from the classroom plugin).

## What the agent does here

- When the user wants to create, extend, rebuild, or mark any home-education material (unit studies, workbooks, answer keys, scope & sequence, parent guides, certificates, reports), use the **classroom** skill. It is the orchestrator for all of that work.
- Treat this project root as the classroom **storage root**. The family's standing constants are in `global-requirements.md`; one file per learner lives in `students/`. Read those before building; do not re-ask for what they already record.

## Producing PDFs

Finished documents are authored as HTML and delivered as A4 PDF. Save each document's HTML into a `source/` folder beside where its PDF is delivered, then convert it by passing that file's path as `htmlPath` to the `html_to_pdf` tool from the **classroom-pdf** MCP server (bundled with the plugin). The PDF is derived output; the HTML in `source/` is the copy later sessions edit. If that tool is unavailable on this host, still save the HTML, then deliver it paste-ready and tell the user to convert in the browser: Print → Save as PDF (A4, margins off).

## Configuration and setup

Resolved, per-project configuration is in `CLAUDE.md`. If this project still has unfilled placeholders, or you need to (re)bootstrap it, the full setup process is in the skill's
`references/setup.md`.
