# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-06-12

### Added

- `magic-reply` now recognises a `-- prepare document --` trigger for shaping context
  and framing documents with agent-agnostic standards.
- Agent-agnostic documentation guides included in the skill set.

### Fixed

- Blind-review corrections applied to the `prepare-document` skill content.

## [1.0.0] - 2026-06-12

### Added

- `conversation-capture` skill: extracts and saves a Claude Code session transcript
  to workspace history.
- `magic-reply` skill: trigger-based response templates activated by `-- phrase --`
  patterns in user messages.
- Skills follow the agent-agnostic standard: resolvable by any agent in any future
  session with no prior context.
