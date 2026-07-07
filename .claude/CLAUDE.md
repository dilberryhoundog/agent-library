# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

A custom Claude Code plugin and skill library — a personal marketplace for distributing reusable extensions (skills, agents, rules) to Claude Code installations. It is also the authoritative source of documentation standards (the agent-agnostic framework).

## Repository Structure

- `plugins/` — versioned, installable packages. Each plugin is an independent release unit with its own `plugin.json`, `CHANGELOG.md`, and `skills/` or `agents/` directories (populated by symlinks).
- `extensions/` — the shared asset library (`skills/`, `agents/`, `commands/`, `output-styles/`, `rules/`) that plugins symlink from. Single source of truth; one asset can feed multiple plugins.
- `docs/` — A mix of official and local guides for maintaining the marketplace and authoring plugins/skills.
- `.claude-plugin/marketplace.json` — the plugin registry (owner: dilberryhoundog).

## Plugins

Local plugins live in `plugins/`, each an independently versioned package composed from symlinked `extensions/` assets. Additional plugins are hosted in their own repositories. `.claude-plugin/marketplace.json` is the authoritative list of what the marketplace serves and where each remote plugin's source lives.

## Skills Architecture

Skills are markdown guides (SKILL.md) that Claude reads to acquire specialized workflows. They live in `extensions/skills/<name>/SKILL.md`. Plugins expose skills by symlinking: e.g., `plugins/dev-tools/skills/versioning -> ../../../extensions/skills/versioning`.

The same skill can be linked into multiple plugins. Adding a new skill to a plugin means creating a symlink — not copying files.

## Versioning and Releases

Versioning is managed by the `versioning` skill (in `dev-tools` plugin). Units are defined in `.claude/rules/versioning.md`. To cut a release, invoke `/versioning` and follow the skill's workflow — it handles changelog, manifest bump, tag, and GitHub release.

Key rules:

- Plugin versions live in `plugins/<name>/.claude-plugin/plugin.json` (field: `version`).
- Each unit gets its own git tag: `agent-tools/v{version}`, `chat-tools/v{version}`, `dev-tools/v{version}`

## Documentation Standards

All documents in this repo (SKILL.md, agents, rules, CLAUDE.md) must be **agent-agnostic**: resolvable by any agent in any future session with no session context.
