# Provenance

Every URL on a page derives at load from `#page-meta.provenance`. The agent writes provenance values and reference attributes; the engine's `renderEyebrow()` builds the eyebrow, `auditPaths()` flags a stray `.path`, and the reference block's `expandRef()` builds every reference. No template, block or card carries a literal `href` to a file or a site.

The reference block, `assets/blocks/reference.html`, carries the `details.ref` style, the origin gating and `expandRef()`. Splice its `style` and `script` parts on every page that carries a `details.ref` or an `a.ref-link`; without them a reference stays an empty element.

## Fields

`#page-meta.provenance` carries these keys. Unknown keys are ignored.

| field     | type            | rule                                                                                                                    |
|-----------|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| `repo`    | string          | https base, no trailing slash, no `.git` — `https://github.com/owner/name`. Absent drops every GitHub link and anchor    |
| `root`    | string          | absolute checkout path, no trailing slash. Absent drops the Disk and Editor chips                                        |
| `self`    | string          | this page's repo-relative path; feeds the return prompt's `Source:` line                                                 |
| `branch`  | string or null  | the branch the page was built on; `null` on a detached HEAD                                                              |
| `commit`  | string          | the full 40-hex sha the agent read; never named `base`                                                                   |
| `issue`   | integer or null | the issue number the task names; never a string or URL; never guessed                                                    |
| `pr`      | integer or null | the open PR number for the branch, from `gh`; `null` when none                                                           |
| `date`    | string          | `YYYY-MM-DD`; the first ten characters of `builtAt`                                                                      |
| `builtAt` | string          | UTC ISO stamp, `2026-08-24T03:12:07Z`                                                                                    |
| `editor`  | string or null  | URL-scheme word, default `vscode`; `null` drops the Editor chip                                                          |

## Build-time git facts

Run once per build from the repo root, before writing `#page-meta`:

```bash
cd "$(git rev-parse --show-toplevel)" && printf 'root=%s\nbranch=%s\ncommit=%s\norigin=%s\nbuiltAt=%s\n' \
  "$(git rev-parse --show-toplevel)" "$(git rev-parse --abbrev-ref HEAD)" "$(git rev-parse HEAD)" \
  "$(git remote get-url origin)" "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
gh pr view --json number --jq .number 2>/dev/null || true
```

Derivations:

- `repo` is `origin` with a trailing `.git` stripped and `git@github.com:owner/name` rewritten to `https://github.com/owner/name`.
- `date` is `builtAt` cut to ten characters.
- A `branch` value of `HEAD` means detached: write `null`.
- Empty `gh pr view` output means `pr: null`.
- `issue` is the number the task names, else `null`.
- `self` is the page path relative to `root`: `dev/workspace/artifacts/<id>.html`.

## URL templates

`encPath(p)` is `p.split("/").map(encodeURIComponent).join("/")`; line suffixes append after encoding. `lineAnchor("136-142")` is `#L136-L142`, `lineAnchor("136")` is `#L136`; `firstLine("136-142")` is `136`.

| target      | template                                                                                    |
|-------------|---------------------------------------------------------------------------------------------|
| Disk        | `"file://" + encPath(root + "/" + diskPath)` — no line fragment                             |
| Editor      | `editor + "://file" + encPath(root + "/" + diskPath) + (lines ? ":" + firstLine(lines) : "")` |
| GitHub blob | `repo + "/blob/" + ref + "/" + encPath(path) + lineAnchor(lines)`                           |
| Issue       | `repo + "/issues/" + issue`                                                                 |
| PR          | `repo + "/pull/" + pr`                                                                      |
| Branch      | `repo + "/tree/" + branch`                                                                  |
| Commit      | `repo + "/commit/" + commit`                                                                |

`diskPath` is `data-path`, or the mirror path when `data-branch` is set. `ref` is `provenance.commit`, or the `data-branch` name when the reference names another branch; `data-commit` overrides both. Every generated outbound anchor carries `target="_blank" rel="noopener"`; in-page `#` anchors never do.

### Origin gating

The pre-paint script sets `data-origin="disk"` on `:root` when the page is opened over `file:`, else `data-origin="web"`. CSS alone picks the primary chip: on `disk` the Disk chip is solid; on `web` the Disk and Editor chips are hidden and GitHub is solid. A `ref--nodisk` reference — the mirror is absent, or `provenance.root` is — hides Disk and Editor at either origin and makes GitHub solid. A `data-url` reference is never gated: its `Open site` chip is always solid. Exactly one chip is solid per reference. The eyebrow is never gated; every eyebrow link is https.

## Mirror rule

`dev/branches/<branch>/` holds an archive of that branch's `dev/workspace/`, one level shallower. `mirrorPath(path, branch)` returns `"dev/branches/" + branch + "/" + path.slice("dev/workspace/".length)` when `path` starts with `dev/workspace/`, else `null`.

| `data-branch` | mirror  | result                                                                                                                   |
|---------------|---------|--------------------------------------------------------------------------------------------------------------------------|
| absent        | —       | `diskPath` is `data-path`; blob pins to `commit`                                                                         |
| present       | exists  | `diskPath` is the mirror path; summary shows the `.mirror` badge `archived copy`; Disk and Editor `title` name the mirror; blob uses the branch |
| present       | none    | class `ref--nodisk`: Disk and Editor dropped, GitHub primary at either origin; Copy path copies `data-path`               |

A page whose provenance has no `root` gives every file reference `ref--nodisk` the same way.

At runtime "exists" means `mirrorPath` returned a path; the path check below confirms the file is on disk.

## Reference attributes

The agent writes an empty `details.ref` carrying attributes; several in sequence sit in `<div class="refs">`. An inline reference is `<a class="ref-link" data-path="…" data-label="…"></a>`; the engine fills its `href` with the primary route for the current origin, its text from `data-label` (default the path), and a `title` naming the other routes.

```html
<details class="ref" data-path="docs/drafthorse/framework/steps.md" data-lines="136-142" data-loc="§ Dispositions"></details>
```

| attribute     | required                        | form                                                      | use                                                                                                    |
|---------------|---------------------------------|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| `data-path`   | one of `data-path` / `data-url` | repo-relative POSIX path; no leading `/` or `./`; no `..` | every file href                                                                                        |
| `data-url`    | one of `data-path` / `data-url` | absolute `https:` URL                                     | a site reference: one chip `.ref-chip.ref-site` labelled `Open site`; `.path` shows host and path; `.ref-copy` copies the URL |
| `data-lines`  | no                              | `/^\d+(?:-\d+)?$/`                                        | `#L` anchor, editor `:line`, `.lines` badge                                                            |
| `data-loc`    | no                              | free text                                                 | display only, never parsed                                                                             |
| `data-branch` | no                              | branch name                                               | mirror route and blob ref                                                                              |
| `data-commit` | no                              | `/^[0-9a-f]{7,40}$/`                                      | blob ref override                                                                                      |
| `data-label`  | no                              | free text                                                 | `a.ref-link` text; defaults to the path                                                                |

The engine generates, collapsed by default: a `summary` with `.path`, `.lines` (`L136-142`), `.loc` and `.mirror`; then `.ref-links` holding `a.ref-chip.ref-disk` (`Open file`, title the absolute path), `a.ref-chip.ref-editor` (`Editor`, title `vscode · line 136`), `a.ref-chip.ref-gh` (`GitHub`, title `blob/<short ref>`) and `button.ref-chip.ref-copy` (`Copy path`). `.ref-copy` copies the repo-relative path the Disk chip opens — the mirror path when mirrored — with `:<data-lines>` appended when lines exist. It is the only element on a page that carries `data-copy`; the block's own click listener reads it, so no other block may use that attribute for a copy payload.

Failures: a malformed `data-lines` is treated as absent. A malformed `data-path`, a `data-url` that is not `https:`, or a reference carrying both or neither attribute renders `.ref--broken` with no chips and a `console.warn`. Any `.path` element outside a `.ref` or `.ref-link` gets `.path--unlinked` and a `console.warn` from `auditPaths()`.

## Path check

`references/path-check.sh` is the check; `verify.py` S6 runs it on every static tier, and it runs by hand from anywhere:

```bash
bash extensions/skills/artifact-suite/references/path-check.sh dev/workspace/artifacts/<id>.html
```

It prints `OK` and exits 0, or prints one line per failing reference and exits 1; any output other than `OK` is a build failure. For every `data-path` it resolves the mirror when `data-branch` is set, confirms the file exists, and confirms the end of `data-lines` lies within the file's line count; a `data-branch` reference with no mirror is checked with `git cat-file -e <branch>:<path>`; every `data-url` must start with `https://`. Script bodies are skipped, so the block's own source never reads as a reference.
