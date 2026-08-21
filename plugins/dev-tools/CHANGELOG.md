# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.10.0] - 2026-08-21

### Changed

- `versioning` skill no longer auto-resumes a failed release on re-invocation. A half-applied release now ends the run and reports exactly what state the repository is in and which manual commands would complete it — the user repairs by hand rather than the skill inventorying and finishing automatically.
- `agent-push` and `agent-switch` skills had unused `git rev-parse`/`git branch` tool grants removed (dead weight — neither command was invoked in either skill).
- `git-box` skill gained `issue_write`/`search_issues` GitHub tool grants for workflow-proposal issue creation.
- `git-box`, `agent-commit`, `agent-push`, `agent-switch`, `versioning`, `breaking-change-detector`, and `git-robot` documents migrated to the upgraded DraftHorse step-anatomy spec (internal authoring format only — no invocation surface changed).

### Fixed

- Audit repairs applied across the corpus swept to the upgraded step-anatomy spec (review decisions D8, D11, D12, D13, D16, D18).

## [0.9.2] - 2026-08-09

### Fixed

- The staging confirmation in `agent-commit` no longer asks for a clean working tree. After the step unstages pre-staged out-of-scope files, the tree is deliberately not clean — so the old wording read as a failed check at the exact moment the step had succeeded, inviting the agent to re-stage the strays it had just set aside and recreate the defect the unstage step exists to prevent. The check now confirms the staged column lists exactly the group's files, and names leftover unstaged (` M`) or untracked (`??`) changes as the expected outcome.

## [0.9.1] - 2026-08-09

### Fixed

- `agent-push` now loads on a branch that has no upstream. Its frontmatter probed `@{upstream}`, which exits non-zero when no upstream is configured — aborting skill load before any instruction or push permission was granted, so a first push through Git Box failed with no fallback. Tracking state now reads from `git status --short --branch`, and unpushed commits from `git log --oneline HEAD --not --remotes=origin`; both succeed whether or not an upstream exists. The commit list is scoped to `origin`, so in a fork a commit already on `upstream` still counts as unpushed.

### Changed

- DraftHorse notation migrated across `git-box`, `agent-commit`, `agent-push`, `agent-switch`, `versioning`, `git-robot`, and `breaking-change-detector`: renamed machinery headings, bolded Terms form, and the `harness-format` stamp. Invocation and behaviour unchanged.

## [0.9.0] - 2026-07-13

### Added

- The breaking-change scan now reports why each finding did or did not affect the version — naming the surface it touches, or marking it as costing only a revision round.
- Findings the scan cannot settle are now put to you as uncertain, with what would settle each, instead of being silently resolved as breaking.
- A release that stops partway can now be completed from where it stopped, rather than being restarted.

### Changed

- The breaking-change detector now judges agent-harness changes on their own terms: a stricter audit rule, or a newly permitted document form, no longer counts as breaking simply because a document reads differently.
- The detector is handed the commit range, paths, and version it needs, and works from a single diff — it no longer re-derives what the release already knows, cutting the time a scan takes.
- The detector now runs on a stronger model for the judgment work.

### Fixed

- A breaking change on a pre-1.0 unit no longer proposes a major bump; the pre-1.0 rule is applied as documented.

## [0.8.2] - 2026-07-13

### Fixed

- The versioning skill now verifies a unit's paths are tracked by git before it computes the release range. Previously a wrong path — a typo, a stale symlink, a renamed directory — matched nothing and produced an empty range, indistinguishable from a unit with no commits, so a release you asked for could be silently reported as "nothing to release" and skipped. A bad path now fails loudly and names itself.
- Releases of units whose assets are symlinked are no longer at risk of the same silent skip: the skill now spells out how a symlink target is converted to a repository-relative path, a conversion it previously assumed.

## [0.8.1] - 2026-07-12

### Fixed

- The versioning skill now reads the release date from a live lookup instead of leaving the agent to infer one, so changelog headings and GitHub releases carry the correct date rather than a guessed one.
- The versioning skill now writes its tag message and release notes to a single named file outside the repository, so a release can no longer dirty the working tree and fail its own verification.

### Changed

- The versioning skill's release-process guidance is now carried in the skill itself rather than a separate reference file — same instructions, one fewer file to load.

## [0.8.0] - 2026-07-10

### Added

- Git Box: new `multi-commit-and-push` workflow — split a working tree into multiple scoped commits (each staging only its own files), then push once every commit succeeds.

### Fixed

- Versioning: the skill is now granted the tools its steps actually use, so releases run without missing-permission stalls.

### Changed

- Git Box / agent-commit: clarified skill invariants and chat-context handling.

## [0.7.0] - 2026-07-08

### Changed

- git-robot's tool access is now explicitly scoped to `agent-commit`, `agent-push`, and `agent-switch` skills plus Bash, replacing unrestricted Skill access. This only affects direct/out-of-contract use of git-robot outside git-box.

### Added

- git-box workflows directory with a resolution process (README) and its first template, commit-and-push.

### Removed

- Archived unused skill-framework docs and deprecated assets not part of the dev-tools plugin.

## [0.6.3] - 2026-07-08

### Fixed

- agent-commit no longer sweeps pre-staged out-of-scope files into its first commit:
  it checks the index against the current group, unstages strays (changes preserved),
  and reports each unstaged path in its result.
- git-robot commits no longer trigger permission prompts: commit messages must be
  built with repeated message flags (heredocs and command substitution are banned)
  and must not contain literal shell syntax as text.
- The versioning skill runs prompt-free end to end: its full release command surface
  (tag, log, diff, add, commit, push, ls-remote, gh release, symlink resolution) now
  rides the skill's own permission grants.

## [0.6.2] - 2026-07-08

### Fixed

- The versioning skill's preflight branch command no longer pipes through `sed` —
  pipelines fail the load-time permission check, blocking the skill from loading.
- The breaking-change-detector agent is barred from `find -exec` (which always
  prompts); it now lists symlinks first and resolves each with a separate command.

## [0.6.1] - 2026-07-08

### Fixed

- The versioning skill loads again: its preflight commands (`git status`, `git
  symbolic-ref`, `git branch`, `gh auth status`) are now granted via `allowed-tools`,
  so the harness permission check no longer blocks the skill at invocation.
- git-box's Skill grants now name the installed skills (`dev-tools:agent-commit`,
  `dev-tools:agent-push`, `dev-tools:agent-switch`), removing the approval prompts on
  every verb-skill invocation.
- agent-push loads again: its upstream refs are quoted (`'@{upstream}'`) so the
  brace-expansion permission check passes and PUSH procedures run.

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
