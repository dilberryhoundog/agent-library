# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-06-21

### Added

- **Classroom skill** — build home-education materials tailored to a learner and
  the family's standing requirements: unit studies, workbooks, separate answer keys,
  scope & sequence maps, parent lesson guides, certificates, and competency/review
  reports. Assembles from reusable course shapes, lesson shapes, document layouts, and
  mid-lesson blocks, applying per-learner pedagogy throughout.
- **Bundled classroom-pdf MCP server** — an `html_to_pdf` tool that renders finished
  HTML to faithful A4 PDFs with headless Chromium, installing its own engine on first
  use (self-healing) so PDF delivery needs no manual setup.
- **Project bootstrap for Claude Code and Co-work** — runs from a project folder. A
  one-time init payload sets up a classroom project (a static rule signal, an
  agent-maintained `CLAUDE.md` config, a `global-requirements.md` starter, and a
  `students/` store), which the skill reads on every build.
