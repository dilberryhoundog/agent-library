# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2026-07-07

### Changed

- **Breaking:** the git verb skills are renamed to hyphenated names (`agent-commit`,
  `agent-push`, `agent-switch`); anything invoking the old names must update.
- All dev-tools skills — versioning, git-box, and the git-robot agent — are rebuilt on the
  DraftHorse standalone-step anatomy: each step declares plain-English start/finished
  conditions, so any agent can execute a run cold.
- The versioning skill's reference files are now pure data: `setup-instructions.md` is
  renamed to `config-template.md`, and all procedural instructions moved into the skill's
  steps.

### Fixed

- Step routing can no longer contradict a step's start condition (do-next guidance is
  advisory; the start condition is what admits a step).
- Typos and grammar in the git-box skill documentation.

## [0.5.0] - 2026-06-26

### Added

- git-box skill: orchestrates git work as a background workflow, delegating to a dedicated
  agent so commits, pushes, and branch switches run without blocking the conversation.
- git-robot agent: the background worker that carries out git-box requests via the
  agent-commit, agent-push, and agent-switch skills.

## [0.4.0] - 2026-06-21

### Added

- The versioning skill can now add or update a unit in an existing config — not just
  create one from scratch. A new plugin can be registered for releases without rewriting
  the whole config.

## [0.3.0] - 2026-06-13

### Added

- Breaking-change detector: the propose gate now spawns a `breaking-change-detector`
  agent that judges the release diff against the unit's public contract. Its bump floor
  overrides a lower commit-derived bump, preventing accidental under-versioning.

## [0.2.0] - 2026-06-12

### Added

- Bare invocation of the versioning skill (no unit argument) now runs a
  release-status sweep across all configured units.

## [0.1.0] - 2026-06-12

### Added

- Versioning skill: five-gate release workflow that derives a semver bump from
  conventional commits, proposes it with visible reasoning, then executes
  changelog update, annotated tag, and GitHub release on confirmation.
- Repo-specific version locations (manifest paths, tag patterns, changelog paths)
  are read from a per-project config file, keeping the skill universal.
- Preflight tolerates untracked files; only modified/staged files block the release.
