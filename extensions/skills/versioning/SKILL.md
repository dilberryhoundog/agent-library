---
name: versioning
description: Propose and execute semantic version releases - version bump, changelog entry, annotated git tag, GitHub release.
disable-model-invocation: true
argument-hint: [ unit-name ]
model: haiku
---

# Versioning

A release turns committed work into a named, documented snapshot. This skill derives the version bump from conventional commits, proposes it with visible reasoning, and on confirmation updates every version location in sync.

The skill is universal: it carries the _how_ (semver rules, commit mapping, command sequences). The _where_ (which files hold versions, tag patterns, changelog paths) lives in each repository's project config, never in this skill.

# --- Agent Invariants (Global) ---

**NEVER** move or overwrite an existing tag. If the tag already exists, stop and ask.

# --- REFERENCES ---

## Preflight

=== Git Status ===
!`git status --porcelain --untracked-files=no`
=== Branch ===
Remote:
!`git symbolic-ref --short refs/remotes/origin/HEAD | sed 's@^origin/@@'`
Local:
!`git branch --show-current`
=== GitHub Authenticated ===
!`gh auth status`

## Request

=== User Request ===  
$ARGUMENTS

# --- STEPS ---

## +DISPATCH

Read `.claude/rules/versioning.md` in the repository root. **OR** a `## Versioning` section in the project's CLAUDE.md

These define the repository's **versioned units** — each with paths, manifest, changelog, tag pattern, and `github-release` flag.

#### Step invariants

**DO NOT** run extra commands or read from the filesystem.

#### Proceed

**IF**: The versioned units config exists **AND** the requested unit is in the config **OR** no unit was requested (bare invocation)
**THEN**: `--> +PREFLIGHT`

**IF**: NO versioned units config exists **OR** the requested unit is missing from the config
**THEN**: `--> +USER CONFIRMATION` referencing `references/setup-instructions.md`

## +USER CONFIRMATION

Confirm with the user the actions they would like to take.

#### Step Invariants

**DO NOT** update files, commit, tag, or push before the user explicitly approves the proposal.

#### Decision

Upon return with the users' confirmation. Decide between these options:

**IF**: You created with the user: a new config file **OR** new/updated versioned unit
**THEN**: `--> +PREFLIGHT`

**IF**: You repaired a `+PREFLIGHT` failure
**THEN**: `--> +PREFLIGHT`

**IF**: The user guided you on which units to release after a bare invocation
**THEN**: For each chosen unit, `--> +BREAKING CHANGES`.

**IF**: The user is confirming a version update that you proposed **OR** have requested a change to the bump level or change log entry
**THEN**: `--> +EXECUTE`

## +PREFLIGHT

Verify the release preconditions. The `Preflight` reference already holds the live state — read it, do not re-run the commands.

#### Step Invariants

**DO NOT** stage, modify, or write any file during preflight.

#### Return

**IF**: Any of the following cases fail:

- The working tree has modified or staged files (`=== Git Status ===` is non-empty)
- The local branch differs from the remote default (`=== Branch ===`)
- A targeted unit enables `github-release` **AND** `gh` is not authenticated (`=== GitHub Authenticated ===`)

- **THEN**: `--> +USER CONFIRMATION` Reporting the failing precondition to the user. Offer to fix the problems and return.

#### Proceed

**WHEN**: The tree is clean **AND** the branch is the remote default **AND** `gh` is authenticated
**THEN**: `--> +RANGE`

## +RANGE

Determine the commit range for the unit(s) under release.

Resolve the unit's paths per the config's path-resolution rule — the unit directory plus the repo-relative target of every symlink inside it.

Find the unit's latest tag matching its tag pattern (`git tag -l '<pattern>'`, sorted by version).

The range is `<last-tag>..HEAD` filtered to those paths (`git log <last-tag>..HEAD -- <paths>`).

**First release** (no tag exists): the baseline is the manifest's current version, and the changelog entry summarises the unit's history to date.

#### Decision

Choose by how the skill was invoked:

**IF**: Invoked bare (no unit named)
**THEN**: `--> +USER CONFIRMATION` Compute the range state for every unit in the config, report each unit's pending commits or "nothing to release", and ask which unit(s) to release.

**IF**: A named unit has no commits in range
**THEN**: Report "nothing to release" and **END**.

#### Proceed

**WHEN**: A targeted unit has commits in range
**THEN**: `--> +BREAKING CHANGES`

## +BREAKING CHANGES

Set the bump floor before the proposal by scanning for changes that break an existing user of the unit.

Inspect the diff's shape (`git diff <range> --stat -- <paths>`). When any changed file defines a user-facing surface (commands, skill definitions, manifests, config schemas, documented formats) — or when uncertain — spawn the `dev-tools:breaking-change-detector` agent, passing the commit range, the unit's paths, and the unit's current version. A confirmed breaking change sets the bump floor to major, overriding a lower commit-derived bump.

#### Decision

Choose whether to scan:

**IF**: Every changed file is non-contract by location (tests, CI, internal scripts, release housekeeping) **OR** the commit-derived bump is already major
**THEN**: Skip the scan, recording the skip reason. `--> +PROPOSE`

**IF**: The agent cannot be spawned (not installed, or the spawn errors)
**THEN**: Record the scan as failed and continue on the commit-derived bump. `--> +PROPOSE`

**IF**: A user-facing surface changed **OR** the outcome is uncertain
**THEN**: Run the scan and record its result and any bump floor.

#### Proceed

**WHEN**: The scan has run, been skipped, or failed, and any bump floor is recorded
**THEN**: `--> +PROPOSE`

## +PROPOSE

Derive and present the proposed bump for the unit.

Map each conventional commit in range to a bump level using the table in `references/release-process.md`. Apply the bump floor from `+BREAKING CHANGES`, which overrides a lower commit-derived bump; report any discrepancy.

Present the commit list, what each commit maps to, the resulting bump (e.g. "2 feat, 1 fix → minor: 1.0.1 → 1.1.0"), and a draft changelog entry written user-facing — what a user of the unit notices, not a git log dump. Always show the reasoning, so the user can audit and learn the mapping.

#### Step Invariants

**ALWAYS** state whether the breaking-change scan ran, was skipped (with the reason), or failed.

#### Proceed

**WHEN**: The proposal — bump, reasoning, and draft changelog — is presented
**THEN**: `--> +USER CONFIRMATION`

## +EXECUTE

Apply the release, following the command sequences in `references/release-process.md`. Use the user's final bump and changelog text — their edits win.

Update the manifest version and the changelog. Create the release commit, the annotated tag, push with tags, and the GitHub release when the unit enables it.

#### Step Invariants

**NEVER** use heredocs — they are blocked in some sandboxed shells. Build multi-line content with a file-write tool in a temp directory _outside the repository_ and pass it via `-F` / `--notes-file`, or use repeated `-m` flags. Files written inside the repo would dirty the tree and fail verification.
**ALWAYS** create annotated tags (`git tag -a`), never lightweight.
**ALWAYS** release one commit per unit; stage only the files belonging to that release.
**NEVER** stage untracked files that are not the manifest or changelog; untracked files may exist but do not enter the release commit.

#### Proceed

**WHEN**: The manifest, changelog, commit, tag, push, and any GitHub release are complete
**THEN**: `--> +VERIFY`

## +VERIFY

Confirm every version location agrees.

Check that the manifest version, the changelog heading, the tag, and the GitHub release (when configured) all name the same version.

#### Return

**IF**: Any version location disagrees
**END**: Report the mismatch to the user for resolution.

#### End

**WHEN**: Every version location agrees
**END**: Report the released version and where it now lives, to the user.

# --- TERMS ---

Terms used in this skill:
: **Versioned Unit**: An independently released package defined in the project config, with its own paths, manifest, changelog, tag pattern, and `github-release` flag.
: **Range**: The commit span released for a unit — `<last-tag>..HEAD` filtered to the unit's paths.
: **Bump**: The semver increment (major, minor, patch) derived from the conventional commits in range.
