# Release Process Reference

Detailed rules and command sequences for executing a release. Read alongside the project's
versioning config, which supplies the unit's paths, manifest, changelog, tag pattern, and
`github-release` flag.

## Semantic versioning

A version number `MAJOR.MINOR.PATCH` is a compatibility promise about the unit's public
interface — whatever its users depend on (for a library: the API; for an agent plugin:
skill names, commands, triggers, and observable behaviour).

- **MAJOR** — the promise was broken. Something users rely on was removed, renamed, or
  changed in a way that would surprise them.
- **MINOR** — the promise was extended. New capability added; everything existing still
  works.
- **PATCH** — the promise was repaired. Bug fixes, typo corrections, internal improvements;
  no contract changed.

### The 0.x regime

A `0.x.y` version means "no stability promise yet". Breaking changes are permitted and bump
only the minor version. Promoting to `1.0.0` is itself a statement: the interface is now
stable and the rules above apply in full.

### Pre-releases

`1.2.0-beta.1` sorts before `1.2.0`. Use a pre-release suffix when changes should reach
testers before being promoted to a final version.

## Mapping conventional commits to a bump

Take the highest level that any commit in the range triggers.

| Commit pattern | Bump | Changelog section |
|---|---|---|
| `feat!:` or `BREAKING CHANGE:` footer | major (minor if version < 1.0.0) | Changed / Removed |
| `feat:` | minor | Added |
| `fix:` | patch | Fixed |
| `perf:` | patch | Changed |
| `docs:`, `style:`, `refactor:`, `test:`, `chore:`, `ci:`, `build:` | patch (or no release if nothing user-visible) | Changed, or omit |
| `security`-related fixes | patch minimum | Security |

Commits that change nothing user-visible (CI tweaks, internal refactors) may be omitted
from the changelog even though they sit in the range. When the range contains only such
commits, ask the user whether a release is warranted at all.

## Changelog rules

Follow the Keep a Changelog format (https://keepachangelog.com). A changelog is written for
humans deciding whether to upgrade — never paste the git log.

- Newest version first. Heading format: `## [X.Y.Z] - YYYY-MM-DD`.
- Group entries under `### Added`, `### Changed`, `### Fixed`, `### Deprecated`,
  `### Removed`, `### Security`. Include only sections that have entries.
- Each entry describes what a user of the unit notices, in plain language.
- Maintain an `## [Unreleased]` section at the top; releasing moves its entries under the
  new version heading.
- When creating a changelog for the first time, copy `assets/CHANGELOG-template.md`, then
  replace the placeholder version, date, and `Added` entry with the actual baseline version,
  today's date, and the first-release summary (see "First release" below).

## Determining the commit range

```bash
# Latest tag for the unit (pattern from project config, e.g. 'chat-tools/v*' or 'v*')
git tag -l '<pattern>' --sort=-version:refname | head -1

# Commits in range, attributed to the unit by path
git log <last-tag>..HEAD --oneline -- <unit paths>

# Full messages (bodies may contain BREAKING CHANGE footers)
git log <last-tag>..HEAD --format='%H%n%s%n%b%n---' -- <unit paths>
```

In a multi-unit repository, a commit belongs to a unit when it touches that unit's paths. A
commit spanning several units appears in each unit's range — record it in each affected
changelog.

### First release

When no tag matches the pattern:

- The baseline version is whatever the manifest currently holds (or `0.1.0` when no
  manifest exists; confirm with the user).
- The changelog entry summarises the unit's history to date rather than itemising every
  commit.
- Skip the bump derivation; release the baseline version itself unless the user prefers
  otherwise.

## Execution sequence

Substitute values from the project config. Never use heredocs (sandboxing blocks them);
write multi-line content to files with a file-write tool and pass them with `-F` /
`--notes-file`, or use repeated `-m` flags.

Content rule: the tag message and the GitHub release notes are both the unit's changelog
entry for this version (the heading and its sections, verbatim).

File location rule: write the tag-message and notes files in a temp directory *outside the
repository* (e.g. the system temp dir), never inside the repo — an untracked file would
dirty the tree and fail verification.

When the unit's manifest is `none`, skip the manifest edit, stage only the changelog, and
treat the tag as the version's source of truth.

```bash
# 1. Update the manifest version field (edit the file directly), then update the changelog.

# 2. Release commit — stage only this release's files
git add <manifest> <changelog>
git commit -m "chore(release): <unit> v<X.Y.Z>"

# 3. Annotated tag (message file written beforehand, outside the repo)
git tag -a <tag> -F <tag-message-file>

# 4. Push commit and tag together
git push --follow-tags

# 5. GitHub release (when the config enables it; notes file written beforehand, outside the repo)
gh release create <tag> --title "<unit> v<X.Y.Z>" --notes-file <notes-file>
```

Note: tags do not push by default — `--follow-tags` (or an explicit `git push origin
<tag>`) is required.

## Verification checklist

After executing, confirm all version locations agree and report the result:

- [ ] Manifest version field reads `X.Y.Z` (skip when the unit's manifest is `none`).
- [ ] Changelog's top released heading reads `X.Y.Z` with today's date.
- [ ] `git tag -l '<tag>'` shows the tag, and `git ls-remote --tags origin` shows it on the
      remote.
- [ ] `gh release view <tag>` succeeds (when releases are enabled).
- [ ] Working tree is clean.
