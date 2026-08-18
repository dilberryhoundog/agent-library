---
harness-format: DraftHorse
name: versioning
description: Cut a semantic-version release for a configured unit — bump, changelog, tag, GitHub release.
disable-model-invocation: true
argument-hint: [ unit-name ]
model: sonnet
allowed-tools: Read, Write, Edit, Agent(dev-tools:breaking-change-detector), Bash(date *), Bash(git status *), Bash(git symbolic-ref *), Bash(git branch *), Bash(gh auth status), Bash(git tag *), Bash(git log *), Bash(git diff *), Bash(git ls-files *), Bash(git add *), Bash(git commit *), Bash(git push *), Bash(git ls-remote *), Bash(gh release *), Bash(find * -type l), Bash(readlink *)
---

# Versioning

A release turns committed work into a named, documented snapshot. This skill derives the version bump from conventional commits, proposes it with visible reasoning, and on confirmation updates every version location in sync.

The skill is universal: it carries the _how_ (semver rules, commit mapping, command sequences). The _where_ (which files hold versions, tag patterns, changelog paths) lives in each repository's project config.

# Agent Invariants

**NEVER** move or overwrite an existing tag. If the tag already exists, stop and ask.
**NEVER** collect a unit's paths into a shell variable and expand it into a pathspec (`-- $PATHS`). Wherever a command filters by the unit's paths, write the resolved paths out literally, one after another, space-separated, on the command line. A variable expands unsplit in zsh, reaching git as a single pathspec that matches nothing.
**ALWAYS** release the chosen units one at a time, in the order the user chose.
**NEVER** resume a failed run. Report what happened and what state the repository is in, end the skill, and let the user repair and re-invoke.

# --- REFERENCES ---

## Preflight

=== Git Status ===
!`git status --porcelain --untracked-files=no`
=== Branch ===
Remote (as `origin/<branch>`):
!`git symbolic-ref --short refs/remotes/origin/HEAD`
Local:
!`git branch --show-current`
=== GitHub Authenticated ===
!`gh auth status`
=== Today's Date ===
!`date +%Y-%m-%d`

## Request

=== User Request ===  
$ARGUMENTS

## Semver

A version number `MAJOR.MINOR.PATCH` is a compatibility promise about the unit's public interface — whatever its users depend on (for a library: the API; for an agent plugin: skill names, commands, triggers, and observable behaviour).

- **MAJOR** — the promise was broken. Something users rely on was removed, renamed, or changed in a way that would surprise them.
- **MINOR** — the promise was extended. New capability added; everything existing still works.
- **PATCH** — the promise was repaired. Bug fixes, typo corrections, internal improvements; no contract changed.

A `0.x.y` version means "no stability promise yet": breaking changes are permitted and bump only the minor version. Promoting to `1.0.0` is itself a statement — the interface is now stable and the rules above apply in full. A pre-release suffix (`1.2.0-beta.1`, sorting before `1.2.0`) marks changes that should reach testers before promotion to a final version.

## Bump Mapping

Take the highest level that any commit in the range triggers.

| Commit pattern                                                        | Bump                                          | Changelog section |
|-----------------------------------------------------------------------|-----------------------------------------------|-------------------|
| any type with `!` (`feat!:`, `fix!:`, …) or `BREAKING CHANGE:` footer | major (minor if version < 1.0.0)              | Changed / Removed |
| `feat:`                                                               | minor                                         | Added             |
| `fix:`                                                                | patch                                         | Fixed             |
| `perf:`                                                               | patch                                         | Changed           |
| `docs:`, `style:`, `refactor:`, `test:`, `chore:`, `ci:`, `build:`    | patch (or no release if nothing user-visible) | Changed, or omit  |
| `security`-related fixes                                              | patch minimum                                 | Security          |

Commits that change nothing user-visible (CI tweaks, internal refactors) may be omitted from the changelog even though they sit in the range.

## Changelog Rules

Follow the Keep a Changelog format (https://keepachangelog.com). A changelog is written for humans deciding whether to upgrade.

- Newest version first. Heading format: `## [X.Y.Z] - YYYY-MM-DD`, dated from the [Preflight](#preflight) reference's `Today's Date` — never from memory.
- Group entries under `### Added`, `### Changed`, `### Fixed`, `### Deprecated`, `### Removed`, `### Security`. Include only sections that have entries.
- Each entry describes what a user of the unit notices, in plain language.
- Maintain an `## [Unreleased]` section at the top; releasing moves its entries under the new version heading.
- The fill-in skeleton for a brand-new changelog is the skill directory's [CHANGELOG Template](assets/CHANGELOG-template.md).

# --- STEPS ---

Steps are universal and standalone. Marked `## +<Step Name>`. Work, instructions, rules — self-contained. Invoke a step whenever its start conditions match. Step completes only when its finished conditions match. Multiple steps activate at once. Call every cited reference. References use markdown link notation.

## +Dispatch

Identify the versioned units this run will release.

#### Start this step when these are true:

- the skill has been invoked

#### Step finished when these are true:

- the versioning config has been read
- the requested unit(s) are identified in the config from the [Request](#request), or every unit in the config when the invocation was bare

#### Step invariants:

**DO NOT** read any file other than the versioning config, and run no commands — the [Preflight](#preflight) reference above already holds the live git state.

### Read the Config:

Read `.claude/rules/versioning.md` in the repository root, or a `## Versioning` section in the project's CLAUDE.md. It defines the repository's versioned units — each with paths, manifest, changelog, tag pattern, and `github-release` flag.

## +Setup

Create or repair the repository's versioning config with the user.

**Dormant step** — Skippable, activates only when its state arises.

#### Start this step when these are true:

- no versioning config exists in this repository

**OR these are true:**

- a config exists
- a requested unit is not defined in it, or the requested unit's definition is wrong — its paths no longer resolve, or are not tracked by git

#### Step finished when these are true:

- a config covering every requested unit is on disk
- the user has approved it

### Create or Amend the Config:

Interview the repository to discover its units — how many deliverables, where each manifest's literal version string lives, the tag pattern, where each changelog lives, and which units publish GitHub releases — using the discovery heuristics and field rules in [Config Template](references/config-template.md), and confirm the findings with the user. Draft the config from the template at its preferred placement; when a config already exists, add or amend only the block of the unit that is missing or wrong, following the existing units' conventions rather than recreating the file. When repairing a unit whose paths failed verification, re-derive them from the repository as it stands now — a path may have been renamed, moved, or deleted since the config was written. Show the drafted config or amended block to the user before it is used.

## +Preflight

Verify the release preconditions.

#### Start this step when these are true:

- the requested unit(s) are identified in a config

#### Step finished when these are true:

- the working tree carries no modified or staged files
- the local branch is the remote default branch
- `gh` is authenticated, where any targeted unit enables `github-release`

#### Step invariants:

**DO NOT** stage, modify, or write any file during preflight.

### Verify Preconditions:

The [Preflight](#preflight) reference already holds the live state — read it, do not re-run the commands. Check: the working tree has no modified or staged files (`Git Status` is empty; untracked files are tolerated), the local branch matches the remote default (`Branch` — compare after stripping the `origin/` prefix from the remote value), and `gh` is authenticated (`GitHub Authenticated`) when any targeted unit enables `github-release`. Report any failing precondition to the user.

## +Range

Determine the commit range for the unit(s) under release.

#### Start this step when these are true:

- the release preconditions have been verified this run

#### Step finished when these are true:

- every targeted unit has a computed commit range
- every targeted unit has a recorded current version — from its last matching tag, or its candidate baseline when it is a first release
- a targeted unit with no commits in range is recorded "nothing to release"
- after a bare invocation, the user has chosen which surveyed unit(s) to release
- after a bare invocation, every unchosen surveyed unit is recorded as not selected

#### Agent decision:

How the skill was invoked decides which units this step targets: an invocation naming a unit targets that unit alone; a bare invocation targets every unit in the config.

### Compute the Range:

Resolve the unit's paths: by default, the unit directory plus the repo-relative target of every symlink inside it; a path-resolution rule in the config, when present, overrides this default. List the symlinks and read their targets with this command block:

```bash
# Symlinks in the unit directory, then each one's raw target
find <unit-dir> -type l
readlink <symlink>
```

`readlink` returns the target **relative to the symlink's own directory**, not to the repository root. Convert it before use: join the target onto the symlink's directory, then resolve the `../` segments. Worked example —

- symlink: `plugins/dev-tools/skills/versioning`
- `readlink` output: `../../../extensions/skills/versioning`
- symlink's directory: `plugins/dev-tools/skills`
- joined: `plugins/dev-tools/skills/../../../extensions/skills/versioning`
- resolved (each `..` climbs one level: `skills` → `dev-tools` → `plugins`): `extensions/skills/versioning`

The repo-relative form is what every later command takes. A raw `readlink` target passed to git is rejected as outside the repository, or silently matches nothing.

Compute the range with this command block — the unit's latest tag matching its tag pattern, then `<last-tag>..HEAD` filtered to the unit's paths:

```bash
# Every resolved path must be tracked — run this before filtering anything
git ls-files --error-unmatch <unit paths>

# Latest tag for the unit (pattern from project config, e.g. 'chat-tools/v*' or 'v*')
git tag -l '<pattern>' --sort=-version:refname | head -1

# Commits in range, attributed to the unit by path filters
git log <last-tag>..HEAD --oneline -- <unit paths>

# Full messages (bodies may contain BREAKING CHANGE footers)
git log <last-tag>..HEAD --format='%H%n%s%n%b%n---' -- <unit paths>
```

The last matching tag also carries the unit's current version: strip the fixed prefix its tag pattern defines (`chat-tools/v0.8.2` under pattern `chat-tools/v*` gives `0.8.2`). Record it with the range — later steps bump from it, and the breaking-change scan is briefed with it.

In a multi-unit repository, a commit belongs to a unit when it touches that unit's paths. A commit spanning several units appears in each unit's range — record it in each affected changelog.

Run the resolution and the command block above once per targeted unit. After a bare invocation, present the survey to the user — each unit's pending commits, or "nothing to release" — and ask which unit(s) to release; the units they choose are the ones that carry on into the release.

#### First release

When no tag matches the unit's pattern, the unit has never been released and there is no prior version to measure from. Record it as a first release, and record its candidate baseline version: the manifest's current version, or `0.1.0` when the unit has no manifest. The range is the unit's whole history to date.

#### Path errors

`git log` ignores a pathspec that matches nothing, so a wrong path and a quiet unit produce the same empty output. Verifying the paths first is what tells them apart: once every resolved path is tracked, an empty range is the repository's answer and can be acted on.

`git ls-files --error-unmatch` fails on the first path it cannot match, naming it. When it fails, the paths are wrong, not the repository quiet — the unit's definition cannot produce a range, and no range may be filtered through unverified paths. Report the path git rejected and how it was resolved (a symlink target converted wrongly, a stale target, or a config path that no longer exists).

## +Breaking Changes

Set the bump floor by scanning for changes that break users of the unit.

**Looping step** — Re-runnable, taking a different branch each pass.

#### Start this step when these are true:

- a chosen unit has commits in range
- no breaking-change verdict is recorded for it

#### Step finished when these are true:

- the scan has run, been skipped, or failed for the unit
- a scan that ran has its verdict, its bump floor, and any uncertain findings recorded
- a scan that was skipped or failed has that outcome and its reason recorded in place of a floor

### Scan for Breaking Changes:

Inspect the diff's shape (`git diff <range> --stat -- <paths>`). When any changed file defines a user-facing surface (commands, skill definitions, manifests, config schemas, documented formats) — or when uncertain — spawn the `dev-tools:breaking-change-detector` agent with a brief in this shape:

```txt
Range:   <the computed commit range>
Paths:   <the unit's resolved paths, written out literally>
Version: <the unit's current version, or "first release">
```

The agent takes these as given and does not recompute them, so a brief missing any of the three fails the scan rather than sending it off to re-derive what this step already holds. Record the bump floor from the agent's report as returned — Record the report's uncertain findings alongside the verdict: they set no floor, and the user rules on them at the proposal.

Skip the scan (recording the reason) when the unit is a first release — nothing has been published that a change could break — when every changed file is non-contract by location (tests, CI, internal scripts, release housekeeping), or when the commit-derived bump is already major. When the agent cannot be spawned (not installed, or the spawn errors), record the scan as failed and continue on the commit-derived bump.

## +Propose

Derive and present the proposed bump for the unit.

**Looping step** — Re-runnable, taking a different branch each pass.

#### Start this step when these are true:

- a unit has commits in range
- a breaking-change verdict is recorded for it
- neither an approval nor a decline stands for it

#### Step finished when these are true:

- the proposed bump is derived from the commits in range per [Bump Mapping](#bump-mapping), with the breaking-change floor applied
- any uncertain findings from the scan have been put to the user
- the user has seen the bump, the reasoning, and the draft changelog
- the user has responded — approval or edits recorded with their final bump and changelog text, or a decline recorded and the unit finished

### Derive and Present:

Map each conventional commit in range to a bump level using the [Bump Mapping](#bump-mapping) reference, judged against the compatibility promise in the [Semver](#semver) reference. Apply the bump floor from the breaking-change scan — it overrides a lower commit-derived bump; report any discrepancy. Present the commit list, what each commit maps to, the resulting bump (e.g. "2 feat, 1 fix → minor: 1.0.1 → 1.1.0"), and a draft changelog entry per the [Changelog Rules](#changelog-rules) reference. Always show the reasoning so the user can audit and learn the mapping, and state whether the breaking-change scan ran, was skipped (with the reason), or failed. When the scan ran, name the class each finding was given — the surface it touches, or revision-cost — so the user can see why a change did or did not set the floor. Put any uncertain findings to the user with what would settle each: they carry no floor of their own, so the user decides whether one lifts the bump. When the range contains only commits that change nothing
user-visible, ask the user whether a release is warranted at all before proposing a bump.

#### First release

A unit recorded as a first release has no prior version to bump from. Derive nothing: present its recorded baseline version as the proposal, with a changelog entry that summarises the unit's history to date rather than itemising every commit in range. The user approves the baseline, edits it, or names a different starting version.

## +Execute

Apply the approved release.

**Looping step** — Re-runnable, taking a different branch each pass.

#### Start this step when these are true:

- the user has approved a proposed bump and changelog for the unit, with any edits applied

#### Step finished when these are true:

- the manifest carries the new version, or the unit's manifest is `none`
- the changelog carries the new version's entry
- the release commit is made
- the annotated tag exists
- commit and tag are pushed
- the GitHub release is published, where the config enables it

#### Step invariants:

**NEVER** use heredocs — they are blocked in some sandboxed shells. Build multi-line content with `Write` to `/tmp/versioning-<unit>-<X.Y.Z>.md` and pass that path via `-F` / `--notes-file`, or use repeated `-m` flags. **NEVER** write it inside the repository — that would dirty the tree and fail verification.
**ALWAYS** create annotated tags (`git tag -a`).
**ALWAYS** release one commit per unit; stage only the files belonging to that release.
**NEVER** stage untracked files that are not the manifest or changelog.
**NEVER** re-apply an artifact that already exists. A release commit, an annotated tag, a pushed ref, and a published GitHub release are all durable.

### Apply the Release:

Follow this sequence, substituting values from the project config and using the user's final bump and changelog text. Content rule: the tag message and the GitHub release notes are both the unit's changelog entry for this version (the heading and its sections, verbatim) — so one written file serves both.

```bash
# 1. Update the manifest version field (edit the file directly), then update the changelog per the [Changelog Rules](#changelog-rules) reference.

# 2. Write the changelog entry to /tmp/versioning-<unit>-<X.Y.Z>.md with `Write` — it is both the tag message and the release notes.

# 3. Release commit — stage only this release's files
git add <manifest> <changelog>
git commit -m "chore(release): <unit> v<X.Y.Z>"

# 4. Annotated tag
git tag -a <tag> -F /tmp/versioning-<unit>-<X.Y.Z>.md

# 5. Push commit and tag together — tags do not push by default
git push --follow-tags

# 6. GitHub release (when the config enables it)
gh release create <tag> --title "<unit> v<X.Y.Z>" --notes-file /tmp/versioning-<unit>-<X.Y.Z>.md
```

When the unit's manifest is `none`, skip the manifest edit, stage only the changelog, and treat the tag as the version's source of truth. When the unit has no changelog yet, create it from the skill directory's [CHANGELOG Template](assets/CHANGELOG-template.md), replacing the placeholder version, date, and entry with the actual baseline.

## +Verify

Confirm every version location agrees.

**Looping step** — Re-runnable, taking a different branch each pass.

#### Start this step when these are true:

- a unit's release has been executed

#### Step finished when these are true:

- every version location has been checked against the released version
- the unit is reported released, or a mismatch is recorded

### Confirm the Versions Agree:

Work through this checklist — every location must agree on the released version `X.Y.Z`:

- [ ] Manifest version field reads `X.Y.Z` (skip when the unit's manifest is `none`).
- [ ] Changelog's top released heading reads `X.Y.Z`, dated to the [Preflight](#preflight) reference's `Today's Date`.
- [ ] `git tag -l '<tag>'` shows the tag, and `git ls-remote --tags origin` shows it on the remote.
- [ ] `gh release view <tag>` succeeds (when releases are enabled).
- [ ] No modified or staged files remain (`git status --porcelain --untracked-files=no` is empty).

## +Finish

Report the run's outcome and end the skill.

**Success step** — Resolves the run's done state and exits.

#### Start this step when these are true:

- every chosen unit has been released and verified, declined, or reported "nothing to release"
- no surveyed unit is still awaiting the user's choice

**OR these are true:**

- the user has ended the run at the error step

#### Step finished when these are true:

- the run summary has been presented to the user
- the skill is complete

### Report:

Summarise the run per unit — the released version and where it now lives (manifest, changelog, tag, GitHub release), or why the unit released nothing. List surveyed-but-unselected units with their pending commit counts. After a run ended at the error step, state which units released and which remain.

## +Handle a Problem

Surface anything the other steps don't cover, and decide with the user how to continue.

**Error step** — Handles recovery and bails.

#### Start this step when these are true:

- something has gone wrong — a verification mismatch, a failed command mid-release, an unresolvable config, an unresolvable unit path, an unexpected repository state

**OR these are true:**

- a situation has arisen that no other step covers

#### Step finished when these are true:

- the user has been informed of what happened and what state the repository is now in
- the user has decided how to continue

### Surface the Problem:

Tell the user plainly what happened, where in the release it arose, and what state the repository is now in. End the skill. The user repairs the state, then re-runs for a clean pass.

#### Half-applied release

Take the inventory first — a command that already succeeded leaves a durable trace:

```bash
# Which artifacts for this version already exist?
git log --oneline -1                                  # is the release commit already made?
git tag -l '<tag>'                                    # does the annotated tag exist locally?
git ls-remote --tags origin 'refs/tags/<tag>'         # is the tag on the remote?
gh release view <tag>                                 # is the GitHub release published?
```

Read the manifest and changelog to see whether they already carry the version. Report to the user exactly which artifacts exist and which do not, and name the manual commands that would complete the release — without running them. A pushed commit and tag are durable even when a later step failed — never retry by re-tagging. End the run, and suggest an issue against this skill so the gap is recorded.

#### Github release failure

When only the GitHub release step failed (e.g. `gh` missing or unauthenticated), instruct the user to publish the release manually for the existing tag.

# --- TERMS ---

Terms used in this skill:

- **Versioned Unit** — An independently released package defined in the project config, with its own paths, manifest, changelog, tag pattern, and `github-release` flag.
- **Range** — The commit span released for a unit — `<last-tag>..HEAD` filtered to the unit's paths.
- **Bump** — The semver increment (major, minor, patch) derived from the conventional commits in range.
