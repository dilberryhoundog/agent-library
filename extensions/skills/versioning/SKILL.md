---
name: versioning
description: Cut a semantic-version release for a configured unit — bump, changelog, tag, GitHub release.
disable-model-invocation: true
argument-hint: [ unit-name ]
model: sonnet
allowed-tools: Read, Write, Edit, Agent(dev-tools:breaking-change-detector), Bash(git status *), Bash(git symbolic-ref *), Bash(git branch *), Bash(gh auth status), Bash(git tag *), Bash(git log *), Bash(git diff *), Bash(git add *), Bash(git commit *), Bash(git push *), Bash(git ls-remote *), Bash(gh release *), Bash(find * -type l), Bash(readlink *)
---

# Versioning

A release turns committed work into a named, documented snapshot. This skill derives the version bump from conventional commits, proposes it with visible reasoning, and on confirmation updates every version location in sync.

The skill is universal: it carries the _how_ (semver rules, commit mapping, command sequences). The _where_ (which files hold versions, tag patterns, changelog paths) lives in each repository's project config, never in this skill.

# Agent Invariants

**NEVER** move or overwrite an existing tag. If the tag already exists, stop and ask.
**NEVER** update a unit's release artifacts — manifest, changelog, commit, tag, push — before the user has explicitly approved the proposed bump and changelog for that unit.

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

Follow the Keep a Changelog format (https://keepachangelog.com). A changelog is written for humans deciding whether to upgrade — never paste the git log.

- Newest version first. Heading format: `## [X.Y.Z] - YYYY-MM-DD`.
- Group entries under `### Added`, `### Changed`, `### Fixed`, `### Deprecated`, `### Removed`, `### Security`. Include only sections that have entries.
- Each entry describes what a user of the unit notices, in plain language.
- Maintain an `## [Unreleased]` section at the top; releasing moves its entries under the new version heading.
- The fill-in skeleton for a brand-new changelog is the skill directory's `assets/CHANGELOG-template.md`.

# --- STEPS ---

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.
>- A step may fold in a handover doc: follow its steps as sub-steps of that master step, which handles their exits and errors; when they are done, keep going with the master step.

## +Dispatch

Identify the versioned units this run will release.

#### Start this step when:

The skill has been invoked and the requested unit(s) are not yet identified.

#### Step finished when:

The config is read and the requested unit(s) identified from the `Request` reference — a named unit found in the config, or every unit when the invocation was bare. When no config exists, or the requested unit is missing from it, that state is established and named to the user instead.

#### Invariants:

**DO NOT** read any file other than the versioning config, and run no commands — the `Preflight` reference above already holds the live git state.

### Read the Config:

Read `.claude/rules/versioning.md` in the repository root, or a `## Versioning` section in the project's CLAUDE.md. It defines the repository's versioned units — each with paths, manifest, changelog, tag pattern, and `github-release` flag.

## +Setup

Create or repair the repository's versioning config with the user.

#### Start this step when:

No versioning config exists in this repository, or a requested unit is not defined in the existing config.

#### Step finished when:

A user-approved config is on disk covering every requested unit.

#### Do this next:

The units are now identified in the config — proceed to preflight.

### Create or Amend the Config:

Interview the repository to discover its units — how many deliverables, where each manifest's literal version string lives, the tag pattern, where each changelog lives, and which units publish GitHub releases — using the discovery heuristics and field rules in `references/config-template.md`, and confirm the findings with the user. Draft the config from the template at its preferred placement; when a config already exists, add or amend only the missing unit's block, following the existing units' conventions rather than recreating the file. Show the drafted config or amended block to the user before it is used.

## +Preflight

Verify the release preconditions.

#### Start this step when:

The unit(s) are identified in a config and the release preconditions have not yet been verified this run (or a precondition failed and has since been repaired).

#### Step finished when:

The tree is clean, the branch is the remote default, and `gh` is authenticated where needed — every precondition confirmed against the reference, not assumed.

#### Invariants:

**DO NOT** stage, modify, or write any file during preflight.

### Verify Preconditions:

The `Preflight` reference already holds the live state — read it, do not re-run the commands. Check: the working tree has no modified or staged files (`Git Status` is empty; untracked files are tolerated), the local branch matches the remote default (`Branch` — compare after stripping the `origin/` prefix from the remote value), and `gh` is authenticated (`GitHub Authenticated`) when any targeted unit enables `github-release`. Report any failing precondition to the user and offer to fix it with them; after a fix, verify again.

## +Range

Determine the commit range for the unit(s) under release.

#### Start this step when:

The release preconditions have been verified this run, and a targeted unit does not yet have a computed commit range.

#### Step finished when:

Every targeted unit has a computed range. A named unit with no commits in range is reported "nothing to release" and is finished. After a bare invocation, the user has chosen which unit(s) to release.

### Compute the Range:

Resolve the unit's paths: by default, the unit directory plus the repo-relative target of every symlink inside it; a path-resolution rule in the config, when present, overrides this default. Resolve the symlink targets with this command block:

```bash
# Symlinks in the unit directory, then each one's repo-relative target
find <unit-dir> -type l
readlink <symlink>
```

Compute the range with this command block — the unit's latest tag matching its tag pattern, then `<last-tag>..HEAD` filtered to the unit's paths:

```bash
# Latest tag for the unit (pattern from project config, e.g. 'chat-tools/v*' or 'v*')
git tag -l '<pattern>' --sort=-version:refname | head -1

# Commits in range, attributed to the unit by path
git log <last-tag>..HEAD --oneline -- <unit paths>

# Full messages (bodies may contain BREAKING CHANGE footers)
git log <last-tag>..HEAD --format='%H%n%s%n%b%n---' -- <unit paths>
```

In a multi-unit repository, a commit belongs to a unit when it touches that unit's paths. A commit spanning several units appears in each unit's range — record it in each affected changelog.

**First release** (no tag matches): the baseline is the manifest's current version (`0.1.0` when no manifest exists — confirm with the user). Skip the bump derivation and release the baseline version itself unless the user prefers otherwise; the changelog entry summarises the unit's history to date rather than itemising every commit.

#### Decision:

How the skill was invoked decides the scope. A named unit gets its range computed directly. A bare invocation computes the range state for every unit in the config, reports each unit's pending commits or "nothing to release", and asks the user which unit(s) to release — units are then released one at a time, in the order chosen.

## +Breaking Changes

Set the bump floor by scanning for changes that break users of the unit.

#### Start this step when:

A chosen unit has commits in range but no breaking-change verdict recorded yet.

#### Step finished when:

The scan has run, been skipped with its reason, or failed — and the verdict (including any bump floor) is recorded for the unit.

### Scan for Breaking Changes:

Inspect the diff's shape (`git diff <range> --stat -- <paths>`). When any changed file defines a user-facing surface (commands, skill definitions, manifests, config schemas, documented formats) — or when uncertain — spawn the `dev-tools:breaking-change-detector` agent, passing the commit range, the unit's paths, and the unit's current version. A confirmed breaking change sets the bump floor to major, overriding a lower commit-derived bump.

Skip the scan (recording the reason) when every changed file is non-contract by location (tests, CI, internal scripts, release housekeeping) or the commit-derived bump is already major. When the agent cannot be spawned (not installed, or the spawn errors), record the scan as failed and continue on the commit-derived bump.

## +Propose

Derive and present the proposed bump for the unit.

#### Start this step when:

A unit has commits in range and a breaking-change verdict recorded, but no proposal has been shown to the user yet.

#### Step finished when:

The user has seen the bump, the reasoning, and the draft changelog, and has responded — approval or edits recorded with the user's final bump and changelog text, or a decline recorded and the unit finished.

### Derive and Present:

Map each conventional commit in range to a bump level using the `Bump Mapping` reference, judged against the compatibility promise in the `Semver` reference. Apply the bump floor from the breaking-change scan — it overrides a lower commit-derived bump; report any discrepancy. Present the commit list, what each commit maps to, the resulting bump (e.g. "2 feat, 1 fix → minor: 1.0.1 → 1.1.0"), and a draft changelog entry per the `Changelog Rules` reference, written user-facing — what a user of the unit notices, not a git log dump. Always show the reasoning so the user can audit and learn the mapping, and state whether the breaking-change scan ran, was skipped (with the reason), or failed. When the range contains only commits that change nothing user-visible, ask the user whether a release is warranted at all before proposing a bump.

## +Execute

Apply the approved release.

#### Start this step when:

The user has approved a proposed bump and changelog for a unit (with any edits applied), and no part of that release — commit, tag, or GitHub release — has been applied yet. A half-applied release never re-enters this step; it belongs to `+Handle a Problem`.

#### Step finished when:

The manifest, changelog, commit, tag, push, and any GitHub release are complete for the unit.

#### Invariants:

**NEVER** use heredocs — they are blocked in some sandboxed shells. Build multi-line content with `Write` in a temp directory _outside the repository_ and pass it via `-F` / `--notes-file`, or use repeated `-m` flags. Files written inside the repo would dirty the tree and fail verification.
**ALWAYS** create annotated tags (`git tag -a`), never lightweight.
**ALWAYS** release one commit per unit; stage only the files belonging to that release.
**NEVER** stage untracked files that are not the manifest or changelog; untracked files may exist but do not enter the release commit.

### Apply the Release:

Follow this sequence, substituting values from the project config and using the user's final bump and changelog text. Content rule: the tag message and the GitHub release notes are both the unit's changelog entry for this version (the heading and its sections, verbatim).

```bash
# 1. Update the manifest version field (edit the file directly), then update the changelog per the `Changelog Rules` reference.

# 2. Release commit — stage only this release's files
git add <manifest> <changelog>
git commit -m "chore(release): <unit> v<X.Y.Z>"

# 3. Annotated tag (message file written beforehand, outside the repo)
git tag -a <tag> -F <tag-message-file>

# 4. Push commit and tag together — tags do not push by default
git push --follow-tags

# 5. GitHub release (when the config enables it; notes file written beforehand, outside the repo)
gh release create <tag> --title "<unit> v<X.Y.Z>" --notes-file <notes-file>
```

When the unit's manifest is `none`, skip the manifest edit, stage only the changelog, and treat the tag as the version's source of truth. When the unit has no changelog yet, create it from the skill directory's `assets/CHANGELOG-template.md`, replacing the placeholder version, date, and entry with the actual baseline. When any command fails partway, stop — do not retry commands that already succeeded.

## +Verify

Confirm every version location agrees.

#### Start this step when:

A unit's release has been executed but not yet checked for agreement.

#### Step finished when:

Every version location agrees and the unit is reported released, or a mismatch is recorded.

### Confirm the Versions Agree:

Work through this checklist — every location must agree on the released version `X.Y.Z`:

- [ ] Manifest version field reads `X.Y.Z` (skip when the unit's manifest is `none`).
- [ ] Changelog's top released heading reads `X.Y.Z` with today's date.
- [ ] `git tag -l '<tag>'` shows the tag, and `git ls-remote --tags origin` shows it on the remote.
- [ ] `gh release view <tag>` succeeds (when releases are enabled).
- [ ] No modified or staged files remain (`git status --porcelain --untracked-files=no` is empty).

## +Finish

Report the run's outcome and end the skill.

#### Start this step when:

Every requested unit has been released and verified, declined, or reported "nothing to release".

#### Step finished when:

The summary is presented. The skill is complete.

#### Do this next:

End the skill and return to the user.

### Report:

Summarise the run per unit — the released version and where it now lives (manifest, changelog, tag, GitHub release), or why the unit released nothing.

## +Handle a Problem

Surface anything the other steps don't cover, and decide with the user how to continue.

#### Start this step when:

Something has gone wrong, or a situation has arisen that no other step covers — a verification mismatch, a failed command mid-release, an unresolvable config, an unexpected repository state.

#### Step finished when:

The user has been informed and has decided how to continue.

#### Do this next:

Resume the step the user chose, or end the skill.

### Surface the Problem:

Tell the user plainly what happened, where in the release it arose, what state the repository is now in (especially anything half-applied: a commit without its tag, a tag not pushed, a release note missing), and what the options are. A pushed commit and tag are durable even when a later step failed — never retry by re-tagging.

#### Github release failure

when only the GitHub release step failed (e.g. `gh` missing or unauthenticated), instruct the user to publish the release manually for the existing tag.

# --- TERMS ---

Terms used in this skill:
: **Versioned Unit**: An independently released package defined in the project config, with its own paths, manifest, changelog, tag pattern, and `github-release` flag.
: **Range**: The commit span released for a unit — `<last-tag>..HEAD` filtered to the unit's paths.
: **Bump**: The semver increment (major, minor, patch) derived from the conventional commits in range.  
