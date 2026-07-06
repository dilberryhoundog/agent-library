# Project Config Setup

How to create a repository's versioning config when none exists, and how to add or update a unit in an existing one. The config externalises everything repo-specific so the versioning skill stays universal.

## Adding or updating a unit (config already exists)

When the config exists but the requested unit is not defined — or a defined unit's details have changed — edit `.claude/rules/versioning.md` (or the CLAUDE.md `## Versioning` section) rather than recreating it. Add or amend one `### <unit-name>` block using the field shape in "Config template" below, following the existing units' conventions for paths, manifest, tag pattern, and `github-release`. Resolve a unit's paths the way the existing config documents(e.g. a plugin's directory plus the resolved targets of its symlinks). Confirm the block with the user before the first release uses it. The rest of this file covers creating a config from scratch.

## Placement

1. Preferred: `.claude/rules/versioning.md` in the repository root.
2. Fallback (when the user prefers fewer files): a `## Versioning` section appended to the project's CLAUDE.md with the same content.

## Discovering the units

Interview the repository, then confirm with the user:

- **Single project** (one deliverable): one unit. Find its manifest — the file holding the **literal version string**. Candidates: `package.json`, `pyproject.toml`, `Cargo.toml`,`.claude-plugin/plugin.json`, a `VERSION` file. Beware delegation: some ecosystems reference the version from elsewhere (a gemspec reading `lib/<gem>/version.rb`, a build file reading a constant) — record the file and field that contain the literal, not the reference. Tag pattern is plain `v{version}`.
- **Multi-unit repository** (plugin marketplace, monorepo): one unit per independently versioned deliverable, plus optionally a unit for the repository itself covering root and shared files. Tag patterns are namespaced: `{unit}/v{version}`.
- A unit with no manifest (e.g. a repository-level unit) uses its tags as the version source of truth.

Ask the user which units should publish GitHub releases and where each changelog lives (default: `CHANGELOG.md` inside the unit's directory; repository root for a repo-level unit).

## Config template

```markdown
# Versioning Config

Read by the versioning skill. Defines this repository's versioned units.

## Units

### <unit-name>

- paths: <directories this unit owns, space-separated>
- manifest: <path/to/manifest> (field: <version-field>) | none (tags are source of truth)
- changelog: <path/to/CHANGELOG.md>
- tag: <unit-name>/v{version}
- github-release: yes | no

### <repo-name> (repository-level unit, optional)

- paths: everything not owned by another unit
- manifest: none (tags are source of truth)
- changelog: CHANGELOG.md
- tag: v{version}
- github-release: yes | no
```

## Rules for writing the config

- Use agent-agnostic language: any agent in any future session must be able to act on the config without this conversation's context.
- Every unit needs all five fields; write `none` explicitly rather than omitting a field.
- Path ownership should be unambiguous — when two units could claim a path, assign it explicitly.
- After writing the config, show it to the user for confirmation before the first release uses it.
