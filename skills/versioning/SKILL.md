---
name: versioning
description: Propose and execute semantic version releases - version bump, changelog entry, annotated git tag, GitHub release.
disable-model-invocation: true
argument-hint: [unit-name]
model: sonnet
---

# Versioning

A release turns committed work into a named, documented snapshot. This skill derives the
version bump from conventional commits, proposes it with visible reasoning, and on
confirmation updates every version location in sync.

The skill is universal: it carries the _how_ (semver rules, commit mapping, command
sequences). The _where_ (which files hold versions, tag patterns, changelog paths) lives in
each repository's project config, never in this skill.

## Project config (required)

Read `.claude/rules/versioning.md` in the repository root. Fallback: a `## Versioning`
section in the project's CLAUDE.md. The config defines the repository's **versioned
units** — each with paths, manifest, changelog, tag pattern, and `github-release` flag.

If no config exists, follow `references/setup-instructions.md` to create one with the
user, then continue with the release.

## Workflow

Proceed through five gates in order. Never skip the confirmation gate.

### 1. Preflight

- Working tree is clean (`git status --porcelain` is empty). If dirty, stop and report.
- On the remote's default branch (`git symbolic-ref refs/remotes/origin/HEAD`). When the
  current branch differs, stop and ask.
- Project config exists and identifies the unit(s) being released.

### 2. Determine range

- Find the unit's latest tag matching its tag pattern: `git tag -l '<pattern>'`, sorted by
  version.
- The range is `<last-tag>..HEAD`, filtered to the unit's paths:
  `git log <last-tag>..HEAD -- <paths>`.
- **First release** (no tag exists): the baseline is the manifest's current version, and
  the changelog entry summarises the unit's history to date.
- No commits in range: report "nothing to release" and stop.

### 3. Propose

- Map each conventional commit to a bump level using the table in
  `references/release-process.md`.
- Present: the commit list, what each commit maps to, the resulting bump
  (e.g. "2 feat, 1 fix → minor: 1.0.1 → 1.1.0"), and a draft changelog entry written
  user-facing — what a user of the unit notices, not a git log dump.
- Always show the reasoning, so the user can audit (and learn) the mapping.

### 4. Confirm

- Wait for explicit approval. The user may override the bump level or edit the changelog
  draft; their choice wins.

### 5. Execute and verify

Follow the command sequences in `references/release-process.md`:

- Update the manifest version and the changelog.
- Create the release commit, annotated tag, push with tags, GitHub release (when
  configured).
- Verify every version location agrees (manifest, changelog heading, tag, release) and
  report the result.

## Hard rules

- Never use heredocs — sandboxing blocks them by design. Build multi-line content with a
  file-write tool in a temp directory _outside the repository_ and pass it via `-F` /
  `--notes-file`, or use repeated `-m` flags. Files written inside the repo would dirty the
  tree and fail verification.
- Annotated tags only (`git tag -a`), never lightweight.
- Never move or overwrite an existing tag. If the tag already exists, stop and ask.
- One release commit per unit; stage only the files belonging to that release.
