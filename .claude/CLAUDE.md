# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

A custom Claude Code plugin and skill library — a personal marketplace for distributing reusable extensions (skills, agents, rules) to Claude Code installations. It is also the authoritative source of documentation standards (the agent-agnostic framework).

## Repository Structure

- `plugins/` — versioned, installable packages. Each plugin is an independent release unit with its own `plugin.json`, `CHANGELOG.md`, and `skills/` or `agents/` directories.
- `skills/` — library-level skill guides (SKILL.md files). Plugins expose skills via symlinks into this directory.
- `agents/` — custom Claude Code subagents (markdown agent definitions).
- `rules/` — organizational standards applied across the library.
- `docs/` — guides for maintaining the marketplace and authoring plugins/skills.
- `.claude-plugin/marketplace.json` — the plugin registry (owner: dilberryhoundog).
- `.claude/rules/versioning.md` — versioning unit definitions (read by the versioning skill).

## Plugins

Four local plugins, each versioned independently:

- `chat-tools` — conversation capture, document shaping, context management skills
- `dev-tools` — semantic versioning and release automation (the versioning skill)
- `custom-agents` — suite of custom Claude Code agents
- `agent-library` (repository-level unit) — umbrella unit covering everything outside `plugins/`

External plugins (`dev-workspace`, `dev-deploy`) are sourced from separate repos and listed in the marketplace only.

## Skills Architecture

Skills are markdown guides (SKILL.md) that Claude reads to acquire specialized workflows. They live in `skills/<name>/SKILL.md`. Plugins expose skills by symlinking: e.g., `plugins/dev-tools/skills/versioning -> ../../../skills/versioning`.

The same skill can be linked into multiple plugins. Adding a new skill to a plugin means creating a symlink — not copying files.

## Versioning and Releases

Versioning is managed by the `versioning` skill (in `dev-tools` plugin). Units are defined in `.claude/rules/versioning.md`. To cut a release, invoke `/versioning` and follow the skill's workflow — it handles changelog, manifest bump, tag, and GitHub release.

Key rules:
- Plugin versions live in `plugins/<name>/.claude-plugin/plugin.json` (field: `version`).
- The `agent-library` unit uses tags as source of truth (no manifest).
- Each unit gets its own git tag: `chat-tools/v{version}`, `dev-tools/v{version}`, `v{version}` for the root unit.

## Documentation Standards

All documents in this repo (SKILL.md, agents, rules, CLAUDE.md) must be **agent-agnostic**: resolvable by any agent in any future session with no session context. See `rules/agent-agnostic.md` for the full standard. The `doc-reviewer` agent (`agents/doc-reviewer.md`) audits documents for compliance.

Key rules from `rules/code-comments.md`:
- Comments must encode durable facts (hidden constraints, invariants, workarounds).
- No narration of what code does, no task references, no caller references.
