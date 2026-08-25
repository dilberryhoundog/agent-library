---
name: artifact-suite
description: Build an interactive HTML artifact page — review, options, issue breakdown, interview or demo — on the suite shell, so the user decides card by card and returns a prompt carrying those decisions back. Use whenever about to write an HTML page that presents findings, questions, options, a diff set or a demonstration to the user, and when updating a page the suite already built.
allowed-tools: Read, Glob, Grep, Bash(cp:*), Bash(mkdir:*), Bash(ls:*), Bash(cd:*), Bash(printf:*), Bash(grep:*), Bash(diff:*), Bash(wc:*), Bash(git rev-parse:*), Bash(git remote get-url:*), Bash(git cat-file:*), Bash(gh pr view:*), Bash(date:*), Bash(python3:*), Bash(kill:*), mcp__playwright__browser_navigate, mcp__playwright__browser_evaluate, mcp__playwright__browser_click, mcp__playwright__browser_type, mcp__playwright__browser_snapshot, mcp__playwright__browser_console_messages, mcp__playwright__browser_resize, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_close
---

# Artifact Suite

A page in this suite is a copy of one shared HTML shell with content spliced into seven marker regions. The shell carries the theme tokens, three layouts, the masthead, a generated table of contents, the tag filter bar, a three-way theme control, the floating Copy prompt / View prompt pair, and one engine script. The engine attaches a response surface to every card, keeps one `localStorage` document per page, flags a card whose text changed since it was answered, and composes a return prompt from the cards the reader touched — the prompt the reader pastes back into a session.

The agent writes `#page-meta`, the masthead, the section skeletons and the cards. Every other byte is shared chrome, generated at load or lifted mechanically from a template or block file.

## Agent Invariants

- **Write only between the markers and the class on `.shell`.** The seven marker regions and the one `class` attribute on the single `.shell` element are the whole writable surface of a page. Tokens, base and layout rules, the pre-paint script, the eyebrow, the theme control, both `.toc` containers, the filter bar, the floater, `#outwrap`, `#foot` and the engine are fixed.
- **Never Read or Edit the shell or a page copy.** `assets/shell.html` and every built page stay out of context. Create a page with `cp`, write it with `assets/splice.py`, and read its own state back only with `splice.py <page> show page-meta` and `splice.py <page> show cards`.
- **Every write goes through `splice.py` under Bash.** Never Edit, never Write, never retype a part of a page. Each splice is checked — it asserts its markers appear exactly once and refuses to insert the same lifted part twice — so a repeated call is safe and a malformed one writes nothing.
- **A published id is permanent.** A card's `id` and a section's `id` key the reader's stored answers. Once a page has been handed over, an id is never renamed and never reused for another subject; a card that is dropped becomes `.card.dead` with `data-answer="none"` and stays on the page.
- **Write `<\/` inside `#page-meta`.** A literal `</` in a JSON string ends the enclosing `<script>` block. Every `</` in the `#page-meta` JSON is written `<\/`, which JSON reads back as `/`.

## The skill's files

| path                              | what it is                                                                                                            |
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `assets/shell.html`               | the file copied per page; carries the CSS, the seven markers and the engine                                           |
| `assets/splice.py`                | the only writer of a page                                                                                             |
| `assets/verify.py`                | the static checks, run as `python3 assets/verify.py <page> --static`                                                   |
| `assets/templates/review.html`    | page template for the review, options and issue-breakdown kinds                                                        |
| `assets/templates/interview.html` | page template for the interview kind                                                                                   |
| `assets/templates/demo-kit.html`  | the demo kit — labelled fragments, not a page template                                                                 |
| `assets/blocks/reference.html`    | `details.ref` and `a.ref-link`: style, origin gating and the script that builds every reference; required wherever a page carries one |
| `assets/blocks/diff.html`         | diff rows with a CSS gutter and a copy-added-lines script                                                              |
| `assets/blocks/panel.html`        | `dialog.panel` with a delegated open and close                                                                         |
| `assets/blocks/figure.html`       | `figure.fig`, the SVG class kit and `details.more`                                                                     |
| `references/page-kinds.md`        | the six kinds onto three files, section skeletons, the block index, CSS residency, reserved names                      |
| `references/runtime.md`           | `#page-meta` schema, card attributes, storage document, fingerprints, return prompt, `window.SUITE`                    |
| `references/provenance.md`        | provenance fields, build-time git facts, URL templates, mirror rule, reference attributes, the path check              |
| `references/verification-checks.md` | the static and runtime checks, each with the command that runs it                                                   |
| `tests/fixtures/`                 | one frozen page per template; the regression suite after any change to the shell, a template or a block                |

## Markers

Seven editable regions, each delimited by an opening and a closing marker. HTML regions use `<!-- @name -->` … `<!-- @name:end -->`; the one region inside `<style>` uses `/* @template-style */` … `/* @template-style:end */`.

A region fills one of two ways, decided by whether the shell ships a placeholder inside it.

- **Placeholder regions** — `@doc-title`, `@page-meta`, `@masthead` — ship exactly one element between the markers. `splice.py` replaces everything between the two markers and leaves both markers standing. The region is written once and never appended to: appending would leave two `<title>` elements, two `#page-meta` blocks or two `<h1>`s.
- **Empty regions** — `@template-style`, `@content`, `@sidebar`, `@template-script` — ship nothing between the markers. `splice.py` inserts the content before the closing marker, so the marker survives the next splice.

| marker             | wraps                                             | fill                | the agent writes                                                            |
|--------------------|---------------------------------------------------|---------------------|-----------------------------------------------------------------------------|
| `@doc-title`       | the `<title>` element                             | replace placeholder | the page title, equal to `#page-meta.title`                                 |
| `@page-meta`       | `<script type="application/json" id="page-meta">` | replace placeholder | the one machine-data block                                                  |
| `@masthead`        | `<h1>` and what follows inside `header.masthead`  | replace placeholder | `<h1>`, `<p class="standfirst">`, optional `<div class="masthead-meta">`    |
| `@template-style`  | the last lines inside the shell `<style>`         | append before close | a template's scoped CSS, then each used block's scoped CSS, each spliced once |
| `@content`         | the interior of `<main>` after the filter bar     | append before close | `<section>` blocks with `.sec-head`, `.sec-intro`, `article.card`           |
| `@sidebar`         | the interior of `<aside class="sidebar">`         | append before close | the right column of `.shell.board` only                                     |
| `@template-script` | a trailing `<script>` after the engine            | append before close | block scripts and demo scripts only                                         |

One attribute outside the markers is writable: the `class` on the single `.shell` element, which carries the page's layout. The shell ships `<div class="shell">`; a page adds `rail` or `board` and nothing else, through `splice.py <page> layout rail|board`.

## Splicing

Throughout, `$P` is the page being built and `$S` is `extensions/skills/artifact-suite/assets`.

```
python3 $S/splice.py $P <region> < content          stdin into a marker region
python3 $S/splice.py $P <region> <file> <part>      lift style | script | markup from a template or block
python3 $S/splice.py $P card <cardId> < article     replace one <article id="…">…</article> span
python3 $S/splice.py $P section <sectionId> < html  append before that section's </section>
printf '' | python3 $S/splice.py $P card <cardId>   remove one card; verification only — a published card that is dropped becomes .card.dead and stays
python3 $S/splice.py $P layout rail|board           set the class on .shell; idempotent, re-runnable
python3 $S/splice.py $P show page-meta              print the #page-meta JSON
python3 $S/splice.py $P show cards                  print <id> tab <tag> tab <h3 text> per card
```

Exit 0 on success or on an already-present part, 1 on a usage error, 2 when a marker, card or section is missing or duplicated. A lift leaves `<!-- @lifted <file>#<part> -->` (`/* @lifted … */` inside `<style>`) beside the closing marker, and a second lift of the same part is refused on that line: it prints `already present: <file>#<part>` on stderr and writes nothing. `layout`, `card`, `section` and `show` are reserved keywords and are never marker names.

Every template and block file delimits its parts for `splice.py`: `/* @style */` … `/* @style:end */` **inside** its `<style>` element, so the lifted style is bare CSS matching the shell's `@template-style` region; `<!-- @script -->` … `<!-- @script:end -->` **around** its `<script>` element, so the lifted script carries its own tags; `<!-- @markup -->` … `<!-- @markup:end -->` around its markup. A template's `@markup` part carries section skeletons only — `<section id>`, `.sec-head`, `.sec-intro`, an optional `.verdict-strip` — and no cards; the card exemplars after `@markup:end` are for reading.

## Where pages land

A built page is `dev/workspace/artifacts/<id>.html`, where `<id>` is `#page-meta.id`.

Before copying the shell, confirm the id is unused:

```bash
ls dev/workspace/artifacts dev/branches/*/artifacts
```

Over `file://` every local page shares one origin, so two pages with the same id merge their stored answers. The id is also the file name and the storage key, so it is chosen once and never changed.

`dev/workspace/reviews/` keeps its own meaning — reviews of completed work — and is not where a suite page lands. Both directories archive to `dev/branches/<branch>/` identically, so a reference to either resolves through the mirror route.

## Token economy

The point of the suite is that chrome is never typed.

| never typed                                           | supplied by                                                                    |
|-------------------------------------------------------|----------------------------------------------------------------------------------|
| tokens, layout rules, the engine                      | the `cp` of the shell                                                            |
| `.respond`, radios, textareas                         | the engine, per card                                                             |
| the ToC, the pill row, the filter bar, the theme control | the engine                                                                    |
| any `file://`, `vscode://` or GitHub URL              | the engine, from `data-path` and `#page-meta.provenance`                         |
| the eyebrow markup                                    | the engine                                                                       |
| the return prompt text                                | `composePrompt()` in the engine                                                  |
| the shell's contents                                  | copied by `cp`, written by `splice.py`; never Read, never Edited                 |
| a template's scoped CSS, a block's CSS and its script | `splice.py` lifting the `style` or `script` part; never read, never typed        |
| a second page template                                | one page template per page; `demo-kit.html` is a kit and may be read alongside it |
| a whole file on update                                | one splice per changed card                                                      |

A ten-card review page costs roughly 95 authored lines: the cards themselves, `#page-meta`, the masthead, and nothing else. Reading a template's `@style` or `@script` part into context, or retyping any of it, defeats this and is a defect.

## Page kinds

Six page kinds land on one shell and three template files. The shell is the substrate every page is copied from; the other five are the values `#page-meta.kind` takes. `references/page-kinds.md` carries the layout class, the default verdict set, the section skeletons and the signature blocks for each.

| kind        | file                                                            |
|-------------|-----------------------------------------------------------------|
| page shell  | `assets/shell.html` — copied by every kind                      |
| `review`    | `assets/templates/review.html`                                  |
| `options`   | `assets/templates/review.html`                                  |
| `issue`     | `assets/templates/review.html`                                  |
| `interview` | `assets/templates/interview.html`                               |
| `demo`      | `assets/templates/demo-kit.html` (a kit, readable from any kind) |

Review, options and issue share one card anatomy. What differs between them is the verdict vocabulary carried as data on the card, the chips, and which optional blocks appear.

## Build procedure

Plugin assets run from the last installed release, so these steps run against the working-tree copy of `extensions/skills/artifact-suite/` until a release ships that carries it.

### 1. Open the Build

Decide the kind, the layout class and the `id` slug. Verify the slug is unused with `ls dev/workspace/artifacts dev/branches/*/artifacts`. Decide new page versus revision of a page already published; a revision runs step 7.

### 2. Load the Page Kind

Read `references/page-kinds.md`, then the one page template the kind maps to: `review.html` for the review, options and issue-breakdown kinds, `interview.html` for interview. Never a second page template.

A `demo` page maps to no page template — it reads `assets/templates/demo-kit.html` alone, and the kit's part 6 supplies the `#page-meta` exemplar and the page scaffold. The kit is not a page template: a page of any other kind reads it in addition to its page template whenever that page carries a `.demo`.

Read a template for its exemplars and its instruction comment only. Its `@style` and `@script` parts are never read into context. Locate the parts first — `grep -n "@style\\|@script\\|@markup" <file>` — then Read only the line ranges outside them, with `offset` and `limit`. The same technique reads a block file and the kit.

### 3. Resolve Provenance

Run the build-time git facts from `references/provenance.md` and derive `repo`, `root`, `self`, `branch`, `commit`, `date` and `builtAt`. `pr` comes from `gh pr view`; `issue` is the number the task names, else `null`; `editor` defaults to `vscode`.

### 4. Instantiate the Shell

```bash
P=dev/workspace/artifacts/<id>.html
S=extensions/skills/artifact-suite/assets
mkdir -p dev/workspace/artifacts && cp $S/shell.html $P
```

Every Bash call is a fresh shell — re-assign `P` and `S` at the head of each command.

Fill the three placeholder regions through `splice.py`, replacing the placeholder element inside each — `@doc-title`'s `<title>Untitled</title>`, `@page-meta`'s `{}` block with `rev` at 1, `@masthead`'s `<h1>Untitled</h1>` — leaving all six markers in place. Each is one stdin splice; the `#page-meta` fields are in `references/runtime.md` and `references/provenance.md`, and the JSON is written with `<\/` for every `</`.

```bash
python3 $S/splice.py $P page-meta <<'JSON'
<script type="application/json" id="page-meta">{ … }</script>
JSON
```

`#page-meta.title`, the `<title>` and the `<h1>` carry the same string; the engine warns in the console when they disagree.

Then `python3 $S/splice.py $P layout rail` (or `board`) when the kind calls for it: the one sanctioned write outside a marker.

On the options kind the card count decides the class. When it is not yet fixed, leave `.shell` bare and re-run `splice.py $P layout rail` once the cards are written.

Never Read the shell or the copy.

### 5. Splice the Template

Splice each part mechanically, once per page. Never retype a scoped style or a block script.

```bash
P=dev/workspace/artifacts/<id>.html
S=extensions/skills/artifact-suite/assets
python3 $S/splice.py $P template-style $S/templates/review.html style
python3 $S/splice.py $P content        $S/templates/review.html markup
python3 $S/splice.py $P template-style $S/blocks/reference.html style
python3 $S/splice.py $P template-script $S/blocks/reference.html script
python3 $S/splice.py $P template-style $S/blocks/diff.html style
python3 $S/splice.py $P template-script $S/blocks/diff.html script
```

The reference block is spliced on every page that carries a `details.ref` or an `a.ref-link`; a reference on a page without it stays an empty element. The `content` splice lays in the template's section skeletons; an options page skips it and writes its own `<section id="options">` from stdin, in the shape `references/page-kinds.md` gives. A page needing a section the template does not ship writes that section into `@content` from stdin in the same shape — `<section id>`, `.sec-head`, `.sec-intro` — before its cards go in.

Splice a block's parts the first time that block appears on the page, and only then. `references/page-kinds.md` names each block's parts and what the agent writes for it; the block's own markup is typed into a card or a section like any other prose.

### 6. Write the Cards

One splice per card into its section:

```bash
python3 $S/splice.py $P section <sectionId> <<'HTML'
<article class="card" id="storage-key-scheme" data-tag="integrate">
	<div class="chiprow"><a class="chip id" href="#storage-key-scheme">03</a><span class="chip integrate">Integrate</span></div>
	<h3>One JSON document per page</h3>
	<p>Prose at the shell's measure; the card writes no max-width.</p>
</article>
HTML
```

The agent types the cards and nothing else: `article#id[data-tag]`, the chiprow with the anchor id chip, the `h3`, the prose, and each reference as an empty `details.ref` carrying its attributes. Card and reference attributes are in `references/runtime.md` and `references/provenance.md`.

Finished when every card has a unique subject-named id and every card needing a non-default vocabulary carries `data-verdicts` or `data-answer="options"`.

### 7. Revise a Published Page

Dormant — run this step only when the build revises a page already handed over.

Open with `python3 $S/splice.py $P show page-meta` and `python3 $S/splice.py $P show cards` to read the current `rev`, the `#page-meta` body and the ids on the page before any splice. Published ids are permanent. A dropped card becomes `.card.dead` with `.chip.dead` and `data-answer="none"`. Only changed cards are spliced, one at a time with `splice.py $P card <cardId>`. `rev` bumps by one, and `date`, `builtAt` and `commit` update in the same `@page-meta` splice.

The git diff touches `#page-meta` and the edited cards, nothing else. A whole-file rewrite raises the changed strip on every card the reader had answered and is a defect.

### 8. Verify the Page

Run `references/verification-checks.md`. Its static tier is one command, `python3 $S/verify.py $P --static`, which exits non-zero naming the first failing check; S6 runs `references/path-check.sh` over every reference on the page. Its runtime tier drives the page in Playwright over a local `python3 -m http.server` bound to `127.0.0.1` and rooted at the repo, killing the recorded server pid at the end; the reference carries the checks and the commands.

Repair before hand-over. A skipped runtime tier — no browser available — is reported with its reason.

### 9. Hand the Page Over

Success exit. Report the `file://` path, the `id`, the `rev`, the card count and which checks ran.

### 10. Handle a Build Problem

Error exit.

- Missing marker — hard bail naming the marker.
- Slug collision — rename and re-copy.
- Unparseable `#page-meta` — restore and re-splice, never leave it on disk.
- `splice.py` exits non-zero — report its message and stop.
- No browser — static tier only, reported as such.
- The template does not cover the shape — hard bail and raise an issue. Never write a third page template.

## Terms

- **Shell** — `assets/shell.html`, the one file every page is copied from. It holds the CSS, the seven markers and the engine.
- **Page** — one copy of the shell at `dev/workspace/artifacts/<id>.html`, filled through its markers.
- **Marker region** — one of the seven delimited spans a page may be written into.
- **Splice** — one checked, idempotent write into a page through `assets/splice.py`.
- **Part** — the `style`, `script` or `markup` span a template or block file delimits for lifting.
- **Page template** — `review.html` or `interview.html`; a page reads exactly one.
- **Kit** — `demo-kit.html`, a file of labelled fragments rather than a page; readable alongside any page template.
- **Block** — a card-level component in `assets/blocks/`: reference, diff, panel, figure. Reference is required wherever a page carries one; the rest are optional.
- **Card** — `<article class="card" id="…">`, the unit the reader answers.
- **Card id** — the `id` on the article: a kebab slug naming the subject, or a stable identifier the subject already carries, never a position. It keys the stored answer, the radio `name`, the ToC anchor and the deep link.
- **Section id** — the `id` on a `<section>`, a lowercase slug of its `.sec-head h2`. It anchors the ToC group and keys that section's comment. Permanent, exactly as a card id is.
- **Layout class** — `.shell`, `.shell.rail` or `.shell.board`, the page's one choice outside the markers.
- **Tag** — `data-tag` on a card, one of `integrate`, `yourcall`, `defer`. It drives the card edge, the chip and the filter bar.
- **Verdict** — one option in a card's answer set, from `data-verdicts` or the kind's default set.
- **Respond surface** — the `.respond` block the engine appends to each answering card: verdict radios, a textarea and Clear.
- **Touched** — a card the reader actually acted on. Only touched cards enter the return prompt.
- **Fingerprint** — a hash of a card's authored prose, tag and verdict set, used to flag a card that changed since it was answered.
- **Held answer** — a stored answer whose card is no longer on the page; reported in `#foot` and in the return prompt.
- **`rev`** — the page's revision number in `#page-meta`, starting at 1 and bumped by the agent on every regeneration.
- **Provenance** — the `#page-meta.provenance` object every URL on the page derives from at load.
- **Reference** — an empty `details.ref` carrying `data-path` or `data-url`; the engine builds its summary, chips and hrefs.
- **Mirror** — the `dev/branches/<branch>/` archive a reference on another branch resolves through on disk.
- **Return prompt** — the markdown the engine composes from the touched cards, which the reader copies back into a session.
