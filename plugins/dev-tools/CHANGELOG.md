# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
