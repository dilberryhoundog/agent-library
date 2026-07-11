# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.2] - 2026-07-12

### Fixed

- Fixed page-margin and print-layout breaks in document templates (answer key, competency report, parent lesson guide, review document, scope and sequence, workbook) — continuation sheets were losing top/bottom margins when content overflowed one A4 page. Tables now repeat header rows across page breaks and avoid splitting rows/callouts mid-page.

## [0.3.1] - 2026-07-10

### Changed

- Internal: the skill's setup, marking, and media-processing reference docs now use the DraftHorse handover sub-step model, and several skill-authoring audit gaps were closed. No change to how the skill is invoked, its project layout, or its outputs.

## [0.3.0] - 2026-07-10

### Added

- Optional grounding research now runs through a dedicated `course-researcher` subagent. When a build needs source material you don't have in hand, it sweeps the web for unit candidates — free resources plus purchased options worth the spend — and returns a structured candidate set; the skill then recommends a fitting selection and saves your choices to the course's `matter/`. The token-heavy searching stays quarantined out of the main session.

### Changed

- The classroom skill and its setup guide are rebuilt on DraftHorse step-based anatomy. Same workflow, invocation, outputs, and file layout — no action needed to upgrade. Marking/review and media-link verification are now factored into standalone handover documents.

## [0.2.0] - 2026-07-09

### Changed

- Classroom-project detection now keys on a single `CLASSROOM SKILL COMPATIBLE` marker emitted by a dedicated signal rule, replacing the previous heuristic (checking for a classroom rule/CLAUDE.md section plus `global-requirements.md`). **Migration:** existing classroom projects bootstrapped under 0.1.0 won't carry this marker and will stop being recognized until you re-run the setup bootstrap or add `.claude/rules/classroom-signal.md` from the updated template.

### Added

- Builds now retain the editable HTML source alongside each delivered PDF, in a matching `source/` folder (e.g. `unit-04/source/workbook.html` beside `unit-04/workbook.pdf`).

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
