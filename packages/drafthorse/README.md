# DraftHorse

A Claude Code plugin: the DraftHorse framework for self-routing procedural documents, the builder skill, and the spec-checker agent.

This directory is a self-contained package. Every file it needs lives inside it; nothing here links or cites outside the directory, so it installs whole and can be lifted into its own repository unchanged.

## Map

- `skills/drafthorse/` — the builder skill (`/drafthorse`): build a new skill or convert an existing document through gated phases.
- `agents/drafthorse-saddler.md` — the spec-checker agent; regenerated from `docs/drafthorse-spec-check.md`.
- `docs/framework/` — the normative framework, read from its README.
- `docs/drafthorse-spec-check.md` — authoring source for the checker; never executed.
- `rules/DraftHorse.md` — consumer-facing rule set (in progress).
- `CHANGELOG.md` — release history; tags are `drafthorse/v{version}`.
