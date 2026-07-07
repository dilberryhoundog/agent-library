---
name: versioning
description: Cut a semantic-version release for a configured unit — bump, changelog, tag, GitHub release.
disable-model-invocation: true
argument-hint: [ unit-name ]
model: sonnet
---

# Versioning

A release turns committed work into a named, documented snapshot. This skill derives the version bump from conventional commits, proposes it with visible reasoning, and on confirmation updates every version location in sync.

The skill is universal: it carries the _how_ (semver rules, commit mapping, command sequences). The _where_ (which files hold versions, tag patterns, changelog paths) lives in each repository's project config, never in this skill.

# Agent Invariants

**NEVER** move or overwrite an existing tag. If the tag already exists, stop and ask.
**NEVER** update files, commit, tag, or push before the user has explicitly approved the proposed bump and changelog for that unit.

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

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.

## +Dispatch

Identify the versioned units this run will release.

#### Start this step when:

The skill has been invoked.

#### Invariants:

**DO NOT** read any file other than the versioning config, and run no commands — the `Preflight` reference above already holds the live git state.

#### Read the Config:

Read `.claude/rules/versioning.md` in the repository root, or a `## Versioning` section in the project's CLAUDE.md. It defines the repository's versioned units — each with paths, manifest, changelog, tag pattern, and `github-release` flag.

#### Step finished when:

The config is read and the requested unit(s) identified — a named unit found in the config, or every unit when the invocation was bare. When no config exists, or the requested unit is missing from it, that state is established and named to the user (the `+Setup` step now applies).

## +Setup

Create or repair the repository's versioning config with the user.

#### Start this step when:

No versioning config exists in this repository, or the requested unit is not defined in the existing config.

#### Create or Amend the Config:

Follow `references/setup-instructions.md` to discover the repository's units with the user and draft the config (or add/amend the one missing unit in the existing config). Show the drafted config to the user before it is used.

#### Step finished when:

A user-approved config is on disk covering every requested unit — the units are now identified, and the release continues from `+Preflight`.

## +Preflight

Verify the release preconditions.

#### Start this step when:

The unit(s) are identified in a config and the release preconditions have not yet been verified this run (or a precondition failed and has since been repaired).

#### Invariants:

**DO NOT** stage, modify, or write any file during preflight.

#### Verify Preconditions:

The `Preflight` reference already holds the live state — read it, do not re-run the commands. Check: the working tree has no modified or staged files (`Git Status` is empty; untracked files are tolerated), the local branch matches the remote default (`Branch`), and `gh` is authenticated (`GitHub Authenticated`) when any targeted unit enables `github-release`. Report any failing precondition to the user and offer to fix it with them; after a fix, verify again.

#### Step finished when:

The tree is clean, the branch is the remote default, and `gh` is authenticated where needed — every precondition confirmed against the reference, not assumed.

## +Range

Determine the commit range for the unit(s) under release.

#### Start this step when:

Preflight has passed and a targeted unit does not yet have a computed commit range.

#### Compute the Range:

Resolve the unit's paths per the config's path-resolution rule — the unit directory plus the repo-relative target of every symlink inside it. Find the unit's latest tag matching its tag pattern (`git tag -l '<pattern>'`, sorted by version). The range is `<last-tag>..HEAD` filtered to those paths (`git log <last-tag>..HEAD -- <paths>`).

**First release** (no tag matches): the baseline is the manifest's current version, and the changelog entry summarises the unit's history to date.

#### Decision:

How the skill was invoked decides the scope. A named unit gets its range computed directly. A bare invocation computes the range state for every unit in the config, reports each unit's pending commits or "nothing to release", and asks the user which unit(s) to release — units are then released one at a time, in the order chosen.

#### Step finished when:

Every targeted unit has a computed range. A named unit with no commits in range is reported "nothing to release" and is finished. After a bare invocation, the user has chosen which unit(s) to release.

## +Breaking Changes

Set the bump floor by scanning for changes that break users of the unit.

#### Start this step when:

A chosen unit has commits in range but no breaking-change verdict recorded yet.

#### Scan for Breaking Changes:

Inspect the diff's shape (`git diff <range> --stat -- <paths>`). When any changed file defines a user-facing surface (commands, skill definitions, manifests, config schemas, documented formats) — or when uncertain — spawn the `dev-tools:breaking-change-detector` agent, passing the commit range, the unit's paths, and the unit's current version. A confirmed breaking change sets the bump floor to major, overriding a lower commit-derived bump.

Skip the scan (recording the reason) when every changed file is non-contract by location (tests, CI, internal scripts, release housekeeping) or the commit-derived bump is already major. When the agent cannot be spawned (not installed, or the spawn errors), record the scan as failed and continue on the commit-derived bump.

#### Step finished when:

The scan has run, been skipped with its reason, or failed — and the verdict (including any bump floor) is recorded for the unit.

## +Propose

Derive and present the proposed bump for the unit.

#### Start this step when:

A unit has commits in range and a breaking-change verdict recorded, but no proposal has been shown to the user yet.

#### Derive and Present:

Map each conventional commit in range to a bump level using the table in `references/release-process.md`. Apply the bump floor from the breaking-change scan — it overrides a lower commit-derived bump; report any discrepancy. Present the commit list, what each commit maps to, the resulting bump (e.g. "2 feat, 1 fix → minor: 1.0.1 → 1.1.0"), and a draft changelog entry written user-facing — what a user of the unit notices, not a git log dump. Always show the reasoning so the user can audit and learn the mapping, and state whether the breaking-change scan ran, was skipped (with the reason), or failed.

#### Step finished when:

The user has seen the bump, the reasoning, and the draft changelog, and has responded. Approval or edits mean the release is ready to execute — the user's final bump and changelog text win. A decline means the unit is finished, recorded as declined.

## +Execute

Apply the approved release.

#### Start this step when:

The user has approved a proposed bump and changelog for a unit (with any edits applied), and no part of that release — commit, tag, or GitHub release — has been applied yet. A half-applied release never re-enters this step; it belongs to `+Handle a Problem`.

#### Invariants:

**NEVER** use heredocs — they are blocked in some sandboxed shells. Build multi-line content with a file-write tool in a temp directory _outside the repository_ and pass it via `-F` / `--notes-file`, or use repeated `-m` flags. Files written inside the repo would dirty the tree and fail verification.
**ALWAYS** create annotated tags (`git tag -a`), never lightweight.
**ALWAYS** release one commit per unit; stage only the files belonging to that release.
**NEVER** stage untracked files that are not the manifest or changelog; untracked files may exist but do not enter the release commit.

#### Apply the Release:

Follow the command sequences in `references/release-process.md`, using the user's final bump and changelog text. Update the manifest version and the changelog. Create the release commit, the annotated tag, push with tags, and the GitHub release when the unit enables it. When any command fails partway, stop — do not retry commands that already succeeded.

#### Step finished when:

The manifest, changelog, commit, tag, push, and any GitHub release are complete for the unit.

## +Verify

Confirm every version location agrees.

#### Start this step when:

A unit's release has been executed but not yet checked for agreement.

#### Confirm the Versions Agree:

Check that the manifest version, the changelog heading, the tag (local and remote), and the GitHub release (when configured) all name the same version.

#### Step finished when:

Every version location agrees and the unit is reported released. When other chosen units still await release, the `+Breaking Changes` start condition holds again for the next unit. A mismatch is a problem for the `+Handle a Problem` step.

## +Finish

Report the run's outcome and end the skill.

#### Start this step when:

Every requested unit has been released and verified, declined, or reported "nothing to release".

#### Report:

Summarise the run per unit — the released version and where it now lives (manifest, changelog, tag, GitHub release), or why the unit released nothing.

#### Step finished when:

The summary is presented. The skill is complete.

## +Handle a Problem

Surface anything the other steps don't cover, and decide with the user how to continue.

#### Start this step when:

Something has gone wrong, or a situation has arisen that no other step covers — a verification mismatch, a failed command mid-release, an unresolvable config, an unexpected repository state.

#### Surface the Problem:

Tell the user plainly what happened, where in the release it arose, what state the repository is now in (especially anything half-applied: a commit without its tag, a tag not pushed, a release note missing), and what the options are. A pushed commit and tag are durable even when a later step failed — never retry by re-tagging.

#### Step finished when:

The user has been informed and has decided how to continue — resuming another step, fixing the state together in the main chat, or ending the skill.

# --- TERMS ---

Terms used in this skill:
: **Versioned Unit**: An independently released package defined in the project config, with its own paths, manifest, changelog, tag pattern, and `github-release` flag.
: **Range**: The commit span released for a unit — `<last-tag>..HEAD` filtered to the unit's paths.
: **Bump**: The semver increment (major, minor, patch) derived from the conventional commits in range.  
