# Artifact Suite — Implementation Plan

Stage 2 of 6 (Tech Plan) for the kickoff at `dev/workspace/prompts/prompt-2026-08-23-2257.md`. Inputs: the twenty decisions in `dev/workspace/context/stage-1-decisions.md` (D-1..D-20, binding) and the 75 findings in `dev/workspace/reviews/artifact-suite-investigation.html` (DS-, CO-, ST-, AR-, PR-; every `integrate` finding accepted unless a decision overrides it). This plan is the contract Stage 3 builds against: every value in the body governs, and the questions in the last section are owner review items that do not block a work package. Where the Stage 1 review named one thing two ways, this plan picks one name and uses it everywhere; the name in this document wins.

Amended 2026-08-25 on branch artifact-suite-skill-experimental with PIVOT items 1, 2, 3/8 (doctype), 4 (premise), 8 (root), 9; all other PIVOT sections are excluded from this run by the owner's decision.

## Summary

One skill, `extensions/skills/artifact-suite/`, ships a copyable page shell plus page templates and card-level blocks, and a skill procedure that builds a page by copying the shell and splicing content into seven marker regions (D-19, AR-1, AR-15). The shell is an ordinary HTML document carrying the Paper/Ink tokens, three named layouts, the masthead, a generated table of contents, the tag filter bar, a three-way theme control, the floating Copy prompt / View prompt pair, and one engine script (D-1..D-5, D-10, D-18). The engine generates every response surface, persists answers in one localStorage document per page, fingerprints each card so a changed card shows an amber strip and a removed card's answer is held, and composes a provenance-headed return prompt from touched cards only (D-6..D-9). Every URL on a page is derived at load from `#page-meta.provenance`: the eyebrow row links issue, PR, branch and commit to GitHub, and each file reference expands into Disk, Editor and GitHub chips plus Copy path, origin-gated by CSS and routed through the `dev/branches/` mirror for other branches (D-11..D-13). Three templates cover the six kickoff kinds: review serves review, options and issue breakdown; interview carries open questions and answered records; the demo kit is a set of labelled fragments the agent composes from (D-14..D-17). Built pages land in `dev/workspace/artifacts/<id>.html`. The build is finished when the acceptance test — rebuilding the Stage 1 review on the shell — passes.

## Decisions applied

| id   | decision                                                                          | lands in                                                          |
|------|-----------------------------------------------------------------------------------|-------------------------------------------------------------------|
| D-1  | Three layouts `.shell`, `.shell.rail`, `.shell.board`; a page picks by class      | Shell → Layouts                                                   |
| D-2  | ToC below 1040px is a sticky pill row from the same generated list                | Shell → Table of contents                                         |
| D-3  | `integrate` / `yourcall` / `defer` everywhere; filter bar is a shell feature      | Shell → Chips and the filter bar                                  |
| D-4  | Three-way System / Light / Dark; System removes attribute and key                 | Shell → Theme control; Runtime → Function list (`setTheme`)       |
| D-5  | ToC is `.toc`; `.rail` reserved                                                   | Shell → Layouts (name collision rule); Blocks → figure (`.track`) |
| D-6  | One localStorage document per page keyed by page id; theme one shared key         | Runtime → Storage document                                        |
| D-7  | Keep every answer; amber changed strip; hold removed cards' answers; bump `rev`   | Runtime → Fingerprints, changed cards, orphans                    |
| D-8  | Recommended pre-checked; only touched cards in prompt; Accept all                 | Runtime → Touched, defaults, Accept all, Clear                    |
| D-9  | One `#page-meta` JSON block                                                       | Runtime → `#page-meta` schema                                     |
| D-10 | Floating Copy prompt / View prompt pair bottom right                              | Shell → Floating pair                                             |
| D-11 | Reference block: Disk, Editor, GitHub, Copy path; absolute path accepted          | Provenance → link-to-site                                         |
| D-12 | GitHub pins to commit; other branches via `dev/branches/` mirror, marked archived | Provenance → Archive mirror                                       |
| D-13 | Every outbound link `target="_blank" rel="noopener"`                              | Provenance → link-to-site; anchors rule                           |
| D-14 | Three templates; review/options/issue share one card anatomy                      | Page templates → Six kinds onto three templates                   |
| D-15 | Interview republish rewrites answered questions as `.answered` record cards       | Page templates → interview                                        |
| D-16 | Demo has no fixed shape; document structure, classes, integration points          | Page templates → demo kit                                         |
| D-17 | Panel/modal is an optional block                                                  | Blocks → panel                                                    |
| D-18 | Ordinary HTML document with doctype; disk-primary links; no Artifact-tool compatibility requirement (amended 2026-08-25 per PIVOT §8) | Shell → Form; Provenance → Origin gating                          |
| D-19 | Ship as a skill under `extensions/skills/`; versioning and release withdrawn (PIVOT §1); landing directory settled here | Skill; File layout                                                |
| D-20 | Eight reference files; `filebox/review.html` excluded                             | Inputs to this plan only                                          |

## File layout

All paths are repo-relative. Sizes are ceilings; the shell's is the only hard one.

| path                                                                     | purpose                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | size                                                                              |
|--------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| `extensions/skills/artifact-suite/SKILL.md`                              | skill procedure: frontmatter, invariants, marker table, landing rule, token economy, ten steps, terms                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 260-320 lines                                                                     |
| `extensions/skills/artifact-suite/assets/shell.html`                     | The file copied per page: tokens, base rules, three layouts, masthead, ToC containers, filter bar, theme control, floater, engine script, seven markers                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 36KB hard ceiling, 32KB target (CSS ≤ 16KB, engine ≤ 17KB, head + scaffold ≤ 3KB) |
| `extensions/skills/artifact-suite/assets/splice.py`                      | Fills one marker region of a page: from stdin, or by lifting one named part (`style`, `script`, `markup`) out of a template or block file. Placeholder regions are replaced; empty regions take the content before their closing marker. Refuses a second insert of the same sourced part — recognised by testing whether the lifted bytes (delimiters stripped, trailing whitespace normalised) already occur in the page; a hit exits 0 with `already present: <file>#<part>` on stderr and writes nothing. Asserts each marker appears exactly once, exits non-zero on any miss. `splice.py <page> card <cardId>` replaces one card's `<article id="…">…</article>` span from stdin. A fifth form, `splice.py <page> section <sectionId>`, appends stdin immediately before that `<section id="…">`'s closing `</section>`; it asserts the section exists exactly once and exits non-zero otherwise. Two read-only forms: `splice.py <page> show page-meta` prints the region's JSON to stdout; `splice.py <page> show cards` prints one line per `article.card` as `<id>\t<tag>\t<h3 text>`. Both print nothing else. Also writes the layout class on `.shell`; `layout` is idempotent: it rewrites `.shell`'s class attribute in place and may be re-run | ~90 lines                                                                         |
| `extensions/skills/artifact-suite/assets/verify.py`                      | Implements the static checks S1-S9 as subcommands of one script, run as `python3 $S/verify.py <page> --static`. Exits non-zero on the first failing check, naming it                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ~120 lines                                                                        |
| `extensions/skills/artifact-suite/assets/templates/review.html`          | Instruction comment, scoped style (`.verdict-strip`, `.stats`/`.stat`, `.src`, `.delta`, `.options`/`.option`/`.rec`), `#page-meta` exemplar for the three kinds, section skeleton, one exemplar of each card variant                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 5-7KB                                                                             |
| `extensions/skills/artifact-suite/assets/templates/interview.html`       | Instruction comment, scoped style (`.card.answered`, `.q.rec`), `#answered` and `#open` section skeleton, one question card and one answered record                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 3-4KB                                                                             |
| `extensions/skills/artifact-suite/assets/templates/demo-kit.html`        | Labelled copyable fragments (inline strip, board), demo-scoped style (`.demo`, `.tag`, `.sub`, `.note`, `.readout`, `.readout .muted`, `.picks`, `.btnrow`, `.field`, `.help`), the class inventory, the two integration points, the reserved-name list, one worked micro-example, a `kind: "demo"` `#page-meta` exemplar with a minimal page scaffold                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 7-9KB                                                                             |
| `extensions/skills/artifact-suite/assets/blocks/diff.html`               | Diff rows with CSS gutter, optional line numbers, scoped style, copy-added-lines script                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 2-2.5KB                                                                           |
| `extensions/skills/artifact-suite/assets/blocks/panel.html`              | `dialog.panel` markup, scoped style, delegated open/close script                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.5-2KB                                                                           |
| `extensions/skills/artifact-suite/assets/blocks/figure.html`             | `figure.fig` wrapper, SVG class set, `details.more` disclosure, scoped style                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 1.5-2KB                                                                           |
| `extensions/skills/artifact-suite/references/runtime.md`                 | `#page-meta` schema, stored document shape, card attributes, id and rev discipline, `<\/` rule, return prompt format                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 3-5KB                                                                             |
| `extensions/skills/artifact-suite/references/provenance.md`              | Provenance fields, build-time git commands, URL templates, mirror rule, reference attributes, path-check script                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ~130 lines                                                                        |
| `extensions/skills/artifact-suite/references/page-kinds.md`              | Six kinds → three templates, layout and verdict vocabulary per kind, block index, CSS residency table                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ~80 lines                                                                         |
| `extensions/skills/artifact-suite/references/verification-checks.md`     | Checks S1-S9 and V1-V17 with the server commands                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ~90 lines                                                                         |
| `extensions/skills/artifact-suite/tests/fixtures/review-fixture.html`    | Frozen review page: reference block, diff, quote, withdrawn card, options card                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 48-60KB (36KB shell + spliced parts + content)                                    |
| `extensions/skills/artifact-suite/tests/fixtures/interview-fixture.html` | Frozen interview page: question card, answered record                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 48-60KB (36KB shell + spliced parts + content)                                    |
| `extensions/skills/artifact-suite/tests/fixtures/demo-fixture.html`      | Frozen demo page: inline strip and board                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 48-60KB (36KB shell + spliced parts + content)                                    |

Every template and block file delimits its parts for `splice.py`: `/* @style */` … `/* @style:end */` **inside** its `<style>` element, so the lifted style part is bare CSS matching the shell's `/* @template-style */` region; `<!-- @script -->` … `<!-- @script:end -->` **around** its `<script>` element, so the lifted script part carries its own tags into `@template-script`; and `<!-- @markup -->` … `<!-- @markup:end -->` around its markup. The parts are lifted without the agent reading or retyping them. A template's `@markup` part carries section skeletons only — `<section id>`, `.sec-head`, `.sec-intro`, optional `.verdict-strip` — and no `article.card`; card exemplars sit outside the `@markup` delimiters, for reading.

Built pages land in `dev/workspace/artifacts/<id>.html`, where `<id>` is `#page-meta.id` (D-19). `dev/workspace/reviews/` keeps its documented meaning (reviews of completed work) and the Stage 1 corpus. Both directories archive to `dev/branches/<branch>/` identically, so the mirror route works for either (PR-8). Before a copy, `ls dev/workspace/artifacts dev/branches/*/artifacts` confirms the id is unused: on `file://` every local page shares one origin, so a duplicate id merges two pages' stored answers (AR-8, ST-3).

## Shell

### Form

`assets/shell.html` is an ordinary HTML document (D-18 as amended by PIVOT §8; no Artifact-tool compatibility requirement): `<!doctype html>` on line 1, the version stamp on line 2, then `<html lang="en">`, `<head>` (charset, the `@doc-title` marker, favicon, pre-paint script, fonts, style) and `<body>`. It renders in standards mode everywhere. Non-ASCII glyphs in CSS `content` may be written as plain characters; the escapes `\2212` and `\00B7` stay permitted. Line 2 is the version stamp and the editing rule: `<!-- artifact-suite shell v1. Write only between the @markers and the class on .shell; everything else is shared chrome. -->`. Every check reads the stamp by its text, never by line position.

A page is created by `cp extensions/skills/artifact-suite/assets/shell.html dev/workspace/artifacts/<id>.html`, never by writing chrome (AR-1, AR-15). The agent never opens the shell or a page copy with Read or Edit; the page's own state is read back only through `splice.py … show`. Splices are made with `assets/splice.py` under Bash, never with Edit or Write, so the agent never reads or retypes any part of the page and every write is a checked, idempotent operation.

### Markers

Seven editable regions, each delimited by an opening and a closing marker. HTML regions use `<!-- @name -->` … `<!-- @name:end -->`; the one region inside `<style>` uses `/* @template-style */` … `/* @template-style:end */`. A region fills one of two ways, decided by whether the shell ships a placeholder inside it.

- **Placeholder regions** — `@doc-title`, `@page-meta`, `@masthead` — ship exactly one element between the markers. `splice.py` replaces everything between the two markers, both markers untouched; the region is written once and never appended to. Appending would leave two `<title>` elements, two `#page-meta` blocks or two `<h1>`s, and `readMeta()` would parse the placeholder `{}`.
- **Empty regions** — `@template-style`, `@content`, `@sidebar`, `@template-script` — ship nothing between the markers. `splice.py` replaces the closing marker with the content followed by the same closing marker, so the marker survives the next splice (AR-3).

`splice.py` asserts the region's markers appear exactly once before it writes, and refuses to lift the same sourced part twice into one page. To revise one card, `splice.py <page> card <cardId> < new.html` replaces that card's `<article id="…">…</article>` span (AR-6). To add a card inside a section, `splice.py <page> section <sectionId> < card.html` appends before that section's closing `</section>`. `layout`, `card`, `section` and `show` are reserved keywords, never marker names.

| marker             | wraps                                             | fill                | the agent writes                                                                                            |
|--------------------|---------------------------------------------------|---------------------|-------------------------------------------------------------------------------------------------------------|
| `@doc-title`       | the `<title>` element                             | replace placeholder | the page title, equal to `#page-meta.title`                                                                 |
| `@page-meta`       | `<script type="application/json" id="page-meta">` | replace placeholder | the one machine-data block (D-9)                                                                            |
| `@masthead`        | `<h1>` and what follows inside `header.masthead`  | replace placeholder | `<h1>`, `<p class="standfirst">`, optional `<div class="masthead-meta">`                                    |
| `@template-style`  | the last lines inside the shell `<style>`         | append before close | a template's scoped CSS, then each used block's scoped CSS, each spliced once (AR-2, AR-13)                 |
| `@content`         | the interior of `<main>` after the filter bar     | append before close | `<section>` blocks with `.sec-head`, `.sec-intro`, `article.card`                                           |
| `@sidebar`         | the interior of `<aside class="sidebar">`         | append before close | the right column of `.shell.board` only                                                                     |
| `@template-script` | a trailing `<script>` after the engine            | append before close | block scripts and demo scripts only                                                                         |

One attribute outside the markers is writable: the `class` attribute on the single `.shell` element, which carries the page's layout choice (D-1, AR-10). The shell ships `<div class="shell">`; a page adds `rail` or `board`, and nothing else, through `splice.py <page> layout rail|board`. Every other byte outside the markers is fixed: tokens, base and layout rules, the pre-paint script, the eyebrow, the theme control, both `.toc` containers, the filter bar, the floater, `#outwrap`, `#foot`, the engine.

### Document order

```html
<!doctype html>
<!-- artifact-suite shell v1. Write only between the @markers and the class on .shell; everything else is shared chrome. -->
<html lang="en">
<head>
<meta charset="utf-8">
<!-- @doc-title --><title>Untitled</title><!-- @doc-title:end -->
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect width='16' height='16' rx='3' fill='%230D6B64'/%3E%3Crect x='4' y='4' width='8' height='2' fill='%23F4F6F6'/%3E%3Crect x='4' y='8' width='8' height='2' fill='%23F4F6F6'/%3E%3Crect x='4' y='12' width='5' height='2' fill='%23F4F6F6'/%3E%3C/svg%3E">
<script>/* pre-paint: theme restore + origin flag */</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bitter:wght@500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=JetBrains+Mono:wght@400;500&display=swap">
<style>/* shell CSS */ /* @template-style */ /* @template-style:end */</style>
</head>
<body>
<!-- @page-meta -->
<script type="application/json" id="page-meta">{}</script><!-- @page-meta:end -->
<div class="shell">
    <header class="masthead">
        <div class="eyebrow" id="eyebrow"><span class="spacer"></span>
            <div class="themeset" role="group" aria-label="Theme">
                <button class="quiet tiny" type="button" data-theme-set="system" aria-pressed="true">System</button>
                <button class="quiet tiny" type="button" data-theme-set="light" aria-pressed="false">Light</button>
                <button class="quiet tiny" type="button" data-theme-set="dark" aria-pressed="false">Dark</button>
            </div>
        </div>
        <!-- @masthead --><h1>Untitled</h1><!-- @masthead:end -->
    </header>
    <nav class="toc column" id="toc-column" aria-label="Contents"></nav>
    <main>
        <nav class="toc pills" id="toc-pills" aria-label="Contents"></nav>
        <div class="filters" id="filters" hidden></div>
        <!-- @content --><!-- @content:end -->
    </main>
    <aside class="sidebar"><!-- @sidebar --><!-- @sidebar:end --></aside>
    <footer id="foot"></footer>
</div>
<div class="floater"><span class="status" id="status" role="status"></span>
    <button class="ghost tiny" type="button" id="accept-all" hidden>Accept all</button>
    <button class="ghost" type="button" id="view-prompt">View prompt</button>
    <button type="button" id="copy-prompt">Copy prompt</button>
</div>
<div id="outwrap" hidden><textarea id="out" readonly aria-label="Return prompt as plain text"></textarea></div>
<script>/* engine */</script>
<!-- @template-script --><!-- @template-script:end -->
</body>
</html>
```

The font stylesheet URL is byte-identical to `extensions/artifacts/prompt-builder/prompt-builder.html` line 18 (DS-4). The favicon is the literal data URI above — a 16px accent square (`#0D6B64`) carrying three paper bars (`#F4F6F6`) — and is the same on every page.

### Tokens

Copy the three theme blocks from `extensions/artifacts/prompt-builder/prompt-builder.html` lines 21-74 unchanged, keeping the aligned-colon formatting: light on bare `:root`; dark inside `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`; dark again under `:root[data-theme="dark"]` (DS-1). `--shadow` stays a two-layer `box-shadow` per theme. All 14 originals ship, including `--stop-soft` (DS-16).

Add exactly seven tokens to each block (DS-8, DS-16). No other token is added (DS-14).

| token        | light     | dark      | used by                |
|--------------|-----------|-----------|------------------------|
| `--add-bg`   | `#E4F1E9` | `#13291F` | diff added text cell   |
| `--add-ink`  | `#17603E` | `#7FCFA3` | diff added text        |
| `--del-bg`   | `#FAE8E5` | `#2C1A18` | diff removed text cell |
| `--del-ink`  | `#8E332A` | `#E29288` | diff removed text      |
| `--keep-ink` | `#4E5B5C` | `#A9B6B5` | diff context text      |
| `--add-mark` | `#17603E` | `#7FCFA3` | `+` gutter glyph       |
| `--del-mark` | `#8E332A` | `#E29288` | `−` gutter glyph       |

### Type triple and base rules

Declared once on bare `:root`; no template or block ever names a font family (DS-4).

```css
--serif:
"Source Serif 4"
,
Georgia,
"Times New Roman"
,
serif
;
--disp: Bitter,
"Source Serif 4"
,
Georgia, serif
;
--mono:
"JetBrains Mono"
,
ui-monospace, SFMono-Regular, Menlo, Consolas, monospace
;

* { box-sizing: border-box; }
body { margin: 0; background: var(--paper); color: var(--ink); font-family: var(--serif); font-size: 17px; line-height: 1.6; -webkit-font-smoothing: antialiased; }
h1, h2, h3, h4, h5 { font-family: var(--disp); text-wrap: balance; }
code, .mono, kbd { font-family: var(--mono); }
code { font-size: .87em; background: var(--surface-sunk); padding: 1px 5px; border-radius: 2px; }
a { color: var(--accent); }
main { min-width: 0; }
section { margin-bottom: 64px; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) {
	html { scroll-behavior: auto; }
}
@media print {
	.toc, .filters, .themeset, .floater, #outwrap { display: none; }
}
```

Radius is stated as one comment and hardcoded: `/* radius: 2px on controls, 3px on cards. No token — indirection over a constant. */` (DS-14). Two prose measures, set once: 68ch on `.card p`, `.card ul`, `.card ol`, `.sec-intro`; 62ch on `.standfirst`, `.gloss`, `blockquote` (DS-15).

`:has()` policy, recorded as one comment (DS-18): the target is Chrome from `file://`, where `:has()` has shipped since 105. A `:has()` rule adds a visual state the native control already expresses, and never shares a selector list with a non-`:has()` selector. One exception is load-bearing — `.verdicts label:has(input:checked)` is the only expression of a verdict, because `.verdicts input` is visually removed — so the shell carries the floor `@supports not (selector(:has(*))) { .verdicts input { position: static; opacity: 1; width: auto; height: auto; } }` directly beneath the lifted block.

### Layouts

Three named layouts; a page picks one by class on the single `.shell` element (D-1, AR-10). Each declares exactly one breakpoint (DS-3).

```css
.shell { display: grid; grid-template-columns: 1fr; max-width: 940px; margin: 0 auto; padding: 0 22px 96px; }
.shell.rail { max-width: 1180px; }
.shell.board { max-width: 1340px; }
.masthead, footer { grid-column: 1 / -1; }
.shell:not(.board) > .sidebar { display: none; }
@media (min-width: 1040px) {
	.shell.rail { grid-template-columns: 232px minmax(0, 1fr); gap: 56px; padding-right: 32px; }
}
@media (min-width: 1060px) {
	.shell.board { grid-template-columns: minmax(0, 1fr) 440px; gap: 44px; }
	.shell.board > .sidebar { position: sticky; top: 24px; align-self: start; max-height: calc(100vh - 48px); overflow-y: auto; }
}
```

Name collision rule (D-5): the shell never defines a bare `.rail` selector; every rail rule is `.shell.rail`. The board's right column is `.sidebar`. A block needing an element class named `rail` scopes it (`main .rail`); the figure block renames its SVG class to `.track`.

### Masthead

One scaffold, one h1 clamp for all layouts, one standfirst size (DS-2, DS-15).

```css
.masthead { border-bottom: 1px solid var(--rule); padding: 40px 0 26px; margin-bottom: 34px; }
.eyebrow { font-family: var(--mono); font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-faint); display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: center; }
.eyebrow .spacer { margin-left: auto; }
.eyebrow a { color: var(--accent); text-decoration: none; border-bottom: 1px solid var(--rule); }
.eyebrow .pv-branch code { color: var(--accent); }
.eyebrow .sep { color: var(--ink-faint); }
.eyebrow .sep::before { content: "\00B7"; }
h1 { font-size: clamp(26px, 3.6vw, 36px); line-height: 1.1; font-weight: 600; margin: 16px 0 10px; letter-spacing: -.015em; }
.standfirst { max-width: 62ch; color: var(--ink-soft); font-size: 18px; margin: 0; }
.masthead-meta { display: flex; flex-wrap: wrap; gap: 10px 28px; margin-top: 22px; font-size: 14px; color: var(--ink-soft); }
.masthead-meta b { color: var(--ink); font-weight: 600; }
```

The engine inserts the generated eyebrow spans before `.eyebrow .spacer` (Provenance → Eyebrow). The agent writes no eyebrow markup.

### Table of contents

One generated model, two surfaces: `.toc.column` (232px sticky column in `.shell.rail` at ≥ 1040px) and `.toc.pills` (sticky pill row everywhere else), so no viewport lacks navigation (D-2, D-5, PR-7, CO-1). Both containers ship empty; the engine fills them.

```css
.toc.column { display: none; }
.toc.column h4 { font-family: var(--mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--ink-faint); margin: 22px 0 10px; font-weight: 500; }
.toc.column ol { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 7px; }
.toc.column a { text-decoration: none; color: var(--ink-soft); font-size: 14.5px; line-height: 1.35; display: block; border-left: 2px solid var(--rule); padding-left: 10px; }
.toc.column a:hover, .toc.column a:focus-visible, .toc.column a[aria-current="true"] { color: var(--accent); border-left-color: var(--accent); }
.toc.pills { position: sticky; top: 0; z-index: 6; display: flex; gap: 8px; overflow-x: auto; margin: 0 0 26px; padding: 10px 0; background: var(--paper); border-bottom: 1px solid var(--rule); }
.toc.pills a { flex: none; font-family: var(--mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; text-decoration: none; white-space: nowrap; color: var(--ink-soft); background: var(--surface); border: 1px solid var(--rule); border-radius: 2px; padding: 5px 11px; }
.toc.pills a[aria-current="true"] { color: var(--accent); border-color: var(--accent); background: var(--accent-soft); }
.toc li[hidden], .toc a[hidden] { display: none; }
@media (min-width: 1040px) {
	.shell.rail > .toc.column { display: block; position: sticky; top: 24px; align-self: start; max-height: calc(100vh - 48px); overflow-y: auto; padding-bottom: 20px; }
	.shell.rail main > .toc.pills { display: none; }
}
[id] { scroll-margin-top: 72px; }
@media (min-width: 1040px) {
	.shell.rail [id] { scroll-margin-top: 24px; }
}
article[id]:target, section[id]:target { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 3px; }
```

The model: one group per `section[id]` labelled from `.sec-head h2`, one entry per `article.card[id]` labelled from its `.chip.id` text plus `h3`, falling back to the `h3` alone when the card carries no `.chip.id` (answered records). A single IntersectionObserver (rootMargin `-20% 0px -70% 0px`) sets `aria-current="true"` on the matching link in both surfaces. 72px clears the sticky pill row; 24px applies only where the pill row is hidden (PR-9).

Section id contract (PR-9): a `<section>`'s `id` is a lowercase slug of its `.sec-head h2`. It anchors the ToC group, receives the `:target` ring, and keys that section's comment under `sections` in the stored document — so it is permanent once published, exactly as a card id is (AR-6).

### Chips and the filter bar

One vocabulary across markup, chips, card edge and filter: `integrate`, `yourcall`, `defer` (D-3). A card declares `data-tag` on the `<article>`; the chip modifier and the card edge modifier are the same word, so they cannot disagree (DS-10, DS-11).

```css
.chiprow { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 10px; }
.chip { font-family: var(--mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; padding: 3px 8px; border-radius: 2px; background: var(--surface-sunk); color: var(--ink-soft); white-space: nowrap; text-decoration: none; }
.chip.id { background: transparent; border: 1px solid var(--rule); color: var(--ink-faint); }
.chip.integrate { background: var(--accent-soft); color: var(--accent); }
.chip.yourcall { background: var(--warn-soft); color: var(--warn); }
.chip.defer { background: transparent; border: 1px dashed var(--rule); color: var(--ink-faint); }
.chip.dead { background: transparent; border: 1px dashed var(--rule); color: var(--ink-faint); text-decoration: line-through; }
.chip.earlier { background: transparent; border: 1px solid var(--rule); color: var(--ink-faint); }
```

A chip with no modifier is a free topic chip; templates never invent a status modifier (DS-10). `.chip.id` is written as an anchor to its own card — `<a class="chip id" href="#<cardId>">03</a>`. The chip text stays ordinal for the reader (DS-10); the fragment is the subject-named `id` (ST-2). PR-9 and ST-2 conflict here and ST-2 wins: the stored id can never be ordinal, so the chip text and the id are not one token. PR-9's navigable intent is carried instead by making the chip an anchor to its own card, with `article[id]:target` confirming the landing. `.chip.earlier` is the chip the engine inserts on a restored card, reading `Answered earlier` (CO-12).

The filter bar is shell furniture (D-3, CO-9): `button.quiet.tiny` with `data-filter="all|integrate|yourcall|defer|unanswered"`, each ending in `<span class="n">` holding a count computed from the DOM. It ships `hidden`; the engine reveals it when the page carries two or more distinct tags. `unanswered` matches every card whose stored entry is absent or has `touched: false`. `all` and `unanswered` are states, not tags: they carry no chip, no card edge and no markup attribute, so D-3's three-word vocabulary still governs every chip and edge on the page. They are a shell affordance for working through a long page, not a fourth and fifth tag. Filtering toggles `hidden` on non-matching articles and their ToC entries, and the return prompt ignores it.

```css
.filters { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 0 0 26px; }
.filters button[aria-pressed="true"] { color: var(--accent); border-color: var(--accent); background: var(--accent-soft); }
.filters .n { margin-left: 6px; font-variant-numeric: tabular-nums; opacity: .75; }
.filters[hidden] { display: none; }
```

### Card anatomy and section furniture

```css
.card { background: var(--surface); border: 1px solid var(--rule); border-left: 3px solid var(--rule); border-radius: 3px; box-shadow: var(--shadow); padding: 22px 24px; margin-bottom: 22px; }
.card > *:first-child { margin-top: 0; }
.card h3 { font-size: 19.5px; margin: 0 0 8px; font-weight: 600; line-height: 1.3; }
.card p, .card ul, .card ol { max-width: 68ch; }
.card ul, .card ol { padding-left: 20px; }
.card li { margin-bottom: 6px; }
.card p:last-child { margin-bottom: 0; }
.card[hidden] { display: none; }
.card[data-tag="integrate"] { border-left-color: var(--accent); }
.card[data-tag="yourcall"] { border-left-color: var(--warn); }
.card[data-tag="defer"] { border-left-color: var(--ink-faint); }
.card.dead { border-left-color: var(--ink-faint); background: var(--surface-sunk); }
.card.dead h3 { color: var(--ink-soft); }
.card.needs-id { border-left-color: var(--warn); }
.changed { font-family: var(--mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--warn); background: var(--warn-soft); border-left: 2px solid var(--warn); padding: 6px 10px; margin: 0 0 12px; display: flex; gap: 10px; align-items: center; }
.verdicts label.recommended .rec { font-family: var(--mono); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); margin-left: 7px; }
.sec-head { display: flex; align-items: baseline; gap: 14px; border-bottom: 2px solid var(--ink); padding-bottom: 8px; margin-bottom: 10px; }
.sec-head h2 { font-size: 25px; margin: 0; font-weight: 600; letter-spacing: -.01em; }
.sec-head .count { font-family: var(--mono); font-size: 12px; color: var(--ink-faint); margin-left: auto; }
.sec-intro { color: var(--ink-soft); max-width: 68ch; margin: 14px 0 30px; }
.gloss { color: var(--ink-soft); font-size: 14.5px; margin: 0 0 18px; max-width: 62ch; }
```

The edge is a `border-left` driven by `data-tag`, never a class the agent must keep in sync (DS-11, D-3). `.card.dead` is a withdrawn card (AR-6). `.changed` is the amber strip the engine inserts on a card whose fingerprint moved since it was answered (D-7).

The response surface — `.respond`, `.verdicts`, `textarea` — and `.loose` with its `.lab` are lifted from `dev/workspace/reviews/section-ledger.html` lines 378-427 unchanged, plus `.verdicts label.recommended .rec` for the recommended marker, declared in the fence above (CO-2, AR-5, DS-13). The lift drops `.loose .lab`'s type declarations — the micro-label rule already carries them — and keeps only `.loose .lab { margin-bottom: 9px; }`. `.clear` carries no rule of its own; it is a hook on `button.quiet.tiny`. The engine generates every one of these nodes; the agent writes only the `<article>`, its `.chiprow`, its `<h3>` and its prose.

### Quote, micro-label, disclosure, buttons

```css
blockquote { margin: 14px 0; padding: 4px 0 4px 16px; border-left: 2px solid var(--accent); color: var(--ink-soft); font-style: italic; max-width: 62ch; }
blockquote code { font-style: normal; }
blockquote cite, .q, .lab { display: block; margin-top: 6px; font-family: var(--mono); font-size: 11px; letter-spacing: .09em; text-transform: uppercase; font-style: normal; color: var(--ink-faint); }
details { background: var(--surface); border: 1px solid var(--rule); border-radius: 3px; padding: 10px 14px; margin: 14px 0; }
details summary { cursor: pointer; font-family: var(--mono); font-size: 12px; letter-spacing: .06em; color: var(--ink-soft); }
```

One micro-label rule serves the quote's `<cite>`, the interview record's `.q` and the loose box's `.lab` (DS-12, CO-8). A quote sits between the `<h3>` and the prose.

Buttons are taken whole from `extensions/artifacts/prompt-builder/prompt-builder.html` lines 559-580 (DS-14): filled accent base, `.ghost`, `.quiet`, `.amber`, `.tiny`, `:disabled`, hover `filter: brightness(1.08)`, focus `outline: 2px solid var(--ink)`; padding `9px 15px`, `.tiny` `6px 11px`. `.danger` is not carried.

### Theme control

Three buttons in `.themeset` carrying `data-theme-set="system|light|dark"` with `aria-pressed` (D-4, DS-7). System removes `data-theme` and the stored key so the three-tier cascade governs again. The pre-paint script is the first `<script>` in the document, above `<style>` (DS-5, AR-11, PR-3):

```html

<script>
    /* Runs before first paint so a remembered theme does not flash the default. */
    try {
        var t = localStorage.getItem("artifact-suite.theme");
        if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    } catch (e) { /* storage blocked; the system theme applies */
    }
    document.documentElement.dataset.origin = location.protocol === "file:" ? "disk" : "web";
</script>
```

```css
.themeset { display: flex; gap: 4px; }
.themeset button[aria-pressed="true"] { color: var(--accent); border-color: var(--accent); background: var(--accent-soft); }
```

### Floating pair

Copy prompt filled, View prompt ghosted, Accept all ghosted-tiny and hidden until a card carries `data-recommended`; `#status` sits left of them (D-10, D-8, ST-7, ST-8). The shell defines no `.actions` bar. D-10's pair is the copy control; `#accept-all` (D-8) and `#status` (ST-8) share the container because both belong to the same act of answering, and both are hidden or empty until they apply, so the resting state is still the pair.

```css
.floater { position: fixed; right: 22px; bottom: 22px; z-index: 40; display: flex; gap: 8px; align-items: center; }
.floater .status { font-family: var(--mono); font-size: 11.5px; color: var(--ink-soft); background: var(--paper); padding: 2px 6px; border-radius: 2px; }
.floater .status.bad { color: var(--stop); }
.floater [hidden] { display: none; }
#outwrap { position: fixed; right: 22px; bottom: 74px; z-index: 39; width: min(560px, calc(100vw - 44px)); background: var(--surface); border: 1px solid var(--rule); border-left: 2px solid var(--accent); border-radius: 3px; box-shadow: var(--shadow); padding: 10px; }
#outwrap[hidden] { display: none; }
#out { width: 100%; height: min(52vh, 460px); font-family: var(--mono); font-size: 12.5px; line-height: 1.55; }
#foot { font-family: var(--mono); font-size: 12px; color: var(--ink-faint); padding-top: 18px; border-top: 1px solid var(--rule); display: flex; flex-wrap: wrap; gap: 8px 18px; align-items: center; }
#foot .sep { color: var(--ink-faint); }
#held-note, #storage-note { flex-basis: 100%; color: var(--warn); }
@media (max-width: 620px) {
	.floater { left: 14px; right: 14px; justify-content: flex-end; }
	#outwrap { left: 14px; right: 14px; width: auto; }
}
```

### Class inventory

| name                                                                                                                                                                                                                      | purpose                                                                                              | who writes it                                         |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| `.shell`, `.shell.rail`, `.shell.board`                                                                                                                                                                                   | layout container; page opts in by class                                                              | agent (one class)                                     |
| `.masthead`, `.eyebrow`, `.eyebrow .spacer`                                                                                                                                                                               | header band; provenance row; right-push                                                              | shell / engine                                        |
| `.standfirst`, `.masthead-meta`                                                                                                                                                                                           | lead paragraph 62ch; stat row of `<span><b>Label</b> value</span>`                                   | agent in `@masthead`                                  |
| `.themeset`                                                                                                                                                                                                               | theme button group                                                                                   | shell                                                 |
| `.toc`, `.toc.column`, `.toc.pills`                                                                                                                                                                                       | generated navigation, two surfaces                                                                   | engine                                                |
| `.filters`, `.filters .n`                                                                                                                                                                                                 | tag filter bar with counts                                                                           | engine                                                |
| `.sidebar`                                                                                                                                                                                                                | board right column; hidden in other layouts                                                          | agent in `@sidebar`                                   |
| `.sec-head`, `.sec-head .count`, `.sec-intro`, `.gloss`                                                                                                                                                                   | section furniture                                                                                    | agent in `@content`                                   |
| `.card`, `.card.dead`, `.card.needs-id`                                                                                                                                                                                   | card ground; withdrawn; missing id                                                                   | agent; engine for `needs-id`                          |
| `.changed`                                                                                                                                                                                                                | amber changed-since-answered strip with Dismiss (`button.quiet.tiny[data-card][data-act="dismiss"]`) | engine                                                |
| `.chiprow`, `.chip`, `.chip.id`, `.chip.integrate`/`.yourcall`/`.defer`, `.chip.dead`, `.chip.earlier`                                                                                                                    | chip row and modifiers                                                                               | agent; engine for `earlier`                           |
| `.respond`, `.verdicts`, `.verdicts label.recommended`, `.verdicts .rec`, `.clear`                                                                                                                                        | generated response surface                                                                           | engine                                                |
| `.option .rec`, `.q.rec`                                                                                                                                                                                                  | recommended marker inside an agent-written option row; interview recommend line                      | agent (template-scoped CSS)                           |
| `.loose`, `.lab`                                                                                                                                                                                                          | section comment box and its label                                                                    | engine from `data-loose`                              |
| `.floater`, `.status`, `.status.bad`                                                                                                                                                                                      | fixed controls and transient message                                                                 | shell / engine                                        |
| `.mono`                                                                                                                                                                                                                   | opt-in monospace span                                                                                | anywhere                                              |
| `.refs`, `details.ref`, `.path`, `.lines`, `.loc`, `.mirror`, `.ref-links`, `.ref-chip`, `.ref-disk`, `.ref-editor`, `.ref-gh`, `.ref-site`, `.ref-copy`, `.ref--nodisk`, `.ref--broken`, `a.ref-link`, `.path--unlinked` | file and site reference block (Provenance)                                                           | agent writes the empty `details.ref`; engine the rest |
| `.pv-kind`, `.pv-rev`, `.pv-issue`, `.pv-pr`, `.pv-branch`, `.pv-commit`, `.pv-date`, `.sep`                                                                                                                              | eyebrow cells and the separator (`::before` content `\00B7`)                                         | engine                                                |
| `#page-meta`, `#eyebrow`, `#toc-column`, `#toc-pills`, `#filters`, `#status`, `#accept-all`, `#view-prompt`, `#copy-prompt`, `#outwrap`, `#out`, `#foot`, `#held-note`, `#storage-note`                                   | reserved ids; `#held-note` holds `button.quiet.tiny[data-held="show"]` and `[data-held="discard"]`   | shell / engine                                        |

Reserved for demos and blocks to avoid: every id above, `data-theme`, every token, every shell class — `.status`, `.card`, `.chip`, `.respond`, `.toc`, `.filters`, `.floater` included — even where the shell's rule is scoped elsewhere. `.rail` is not a shell selector: it stays available for the folder-picker row pattern it already names (D-5). Do not use it as a layout or navigation class.

## Runtime & state

### Script placement and dialect

The shell carries two scripts: the pre-paint script above `<style>` and one engine IIFE `(function () { "use strict"; … })();` at the foot. Templates contribute no JavaScript; blocks and demos put theirs in `@template-script`. The engine is written in prompt-builder's dialect — `var`, function declarations, string concatenation, no arrow functions, template literals, optional chaining or `class` — so lifted blocks read identically across the family. Order follows invocation order (`extensions/rules/STYLE.md`): `boot()` is declared first under a `Boot` banner, its callees below it in the order it calls them, under banners: `Boot`, `Meta and capabilities`, `Storage`, `Fingerprints`, `Respond surfaces`, `Restore`, `Recording`, `Provenance`, `Navigation and filters`, `Return prompt`, `Clipboard and status`, `Theme`. Comments state constraints only (`extensions/rules/code-comments.md`); three earn one: `file://` shares one origin so keys carry the page id (AR-8); `localStorage` can throw so
every access is wrapped (CO-12); a literal `</` in a JSON string ends the script block so `#page-meta` writes `<\/` (ST-11).

The engine exposes one global for blocks and demos: `window.SUITE = { copyText: copyText, flash: flash, meta: META }`. Nothing else is reachable from outside.

### `#page-meta` schema

The sole agent-authored data surface; prose lives in markup (D-9, AR-4). Any `</` inside a string is written `<\/` (ST-11). Unknown keys are ignored.

```json
{
  "id": "artifact-suite-investigation",
  "kind": "review",
  "rev": 1,
  "title": "Artifact suite — investigation",
  "provenance": {
    "repo": "https://github.com/dilberryhoundog/agent-library",
    "root": "/Users/dylangraham/Projects/agent-library",
    "self": "dev/workspace/artifacts/artifact-suite-investigation.html",
    "branch": "artifacts",
    "commit": "b966a43f1c2d4e5a6b7c8d9e0f1a2b3c4d5e6f70",
    "issue": null,
    "pr": null,
    "date": "2026-08-24",
    "builtAt": "2026-08-24T03:12:07Z",
    "editor": "vscode"
  },
  "prompt": {
    "heading": "Response — artifact suite investigation"
  },
  "next": [
    "Apply every accepted card to the plan before writing code.",
    "Ask rather than guess where a card is marked Revise with no note."
  ]
}
```

| field                               | type             | rule                                                                                                                   |
|-------------------------------------|------------------|------------------------------------------------------------------------------------------------------------------------|
| `id`                                | string           | kebab slug naming the page's subject; permanent once published (AR-6); sole input to the storage key and the file name |
| `kind`                              | string           | `review`, `options`, `issue`, `interview`, `demo`; selects `DEFAULT_VERDICTS` and the eyebrow label (D-14)             |
| `rev`                               | integer          | starts at 1; the agent increments it on every regeneration (D-7)                                                       |
| `title`                             | string           | equals the `<title>` and the `<h1>`; fallback prompt heading                                                           |
| `provenance.repo`                   | string           | https base, no trailing slash, no `.git`; absent drops every GitHub link                                               |
| `provenance.root`                   | string           | absolute checkout path, no trailing slash (D-11); absent drops Disk and Editor chips                                   |
| `provenance.self`                   | string           | this page's repo-relative path; feeds the `Source:` line (ST-6)                                                        |
| `provenance.branch`                 | string or null   | null on detached HEAD                                                                                                  |
| `provenance.commit`                 | string           | full 40-hex sha the agent read; never named `base` (PR-11)                                                             |
| `provenance.issue`, `provenance.pr` | integer or null  | never a string or URL                                                                                                  |
| `provenance.date`                   | string           | `YYYY-MM-DD`                                                                                                           |
| `provenance.builtAt`                | string           | UTC ISO stamp                                                                                                          |
| `provenance.editor`                 | string or null   | scheme word, default `vscode`; null drops the Editor chip (PR-12)                                                      |
| `prompt.heading`                    | string           | emitted as `## <heading>`; no leading `##`                                                                             |
| `next`                              | array of strings | emitted as a `-` list under `### Next`; may be `[]`                                                                    |

Per-card verdict option sets are the one thing AR-4 and AR-5 place here that this plan does not: they live on the `<article>` as `data-verdicts`, beside the card they govern, since D-14 requires only that the vocabulary be data and a card-keyed map in JSON drifts from the cards it names. `#page-meta` therefore carries page id, provenance, prompt heading and next-step guidance and nothing per-card (D-9).

`readMeta()` parses the block once into `META`; on failure it flashes a red notice and returns `{ id: "unknown-page", kind: "review", rev: 1, title: document.title, provenance: {}, prompt: {}, next: [] }`.

### Card contract

A card is `<article class="card" id="<cardId>" data-tag="integrate">`. The `id` attribute is the card id: an agent-assigned kebab slug naming the subject (`id="storage-key-scheme"`), never a position (ST-2). A stable identifier the subject already carries outside the page — a finding id such as `ds-1`, an issue such as `issue-45` — names the subject and is a valid card id; a counter of the card's place on the page is not. One attribute serves storage, the radio `name`, the ToC anchor and the deep link (PR-9). The printed `.chip.id` stays ordinal for the reader and is never read by the engine.

Optional attributes on the `<article>`:

| attribute          | form                                             | effect                                                                                                                                           |
|--------------------|--------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| `data-tag`         | `integrate`, `yourcall`, `defer`                 | card edge, chip match, filter (D-3)                                                                                                              |
| `data-verdicts`    | pipe-separated labels, `"Agree\|Revise\|Reject"` | verdict options; absent falls back to `DEFAULT_VERDICTS[META.kind]` (AR-16, CO-3)                                                                |
| `data-recommended` | exact text of one option                         | pre-checked; its label gets `.recommended` and a `.rec` badge (D-8, ST-5, DS-13)                                                                 |
| `data-answer`      | `verdict` (default), `options`, `none`           | `options`: the agent wrote `.option` radios, the engine binds them and appends only the textarea; `none`: no response surface (answered records) |

```js
var DEFAULT_VERDICTS = {review: ["Agree", "Revise", "Reject"], issue: ["Accept", "Amend", "Defer"], options: [], interview: [], demo: []};
```

An empty resolved set yields a comment-only `.respond`. Options and interview cards always carry `data-verdicts` or `data-answer="options"` because their options are the page's content.

`validateCards()` runs first in `boot()`: a card without `id` gets `console.warn("artifact-suite: card without id — no response surface attached")`, class `needs-id`, and no `.respond`; a card whose id matches `/^[a-z]?\d+$/i` gets a warning naming the ordinal hazard but is still wired.

### Generated respond surface

`attachRespond(card)` appends this as the card's last child and returns early when `.respond` exists or `data-answer="none"` (AR-5, CO-2, ST-10):

```html

<div class="respond">
    <div class="verdicts" data-card="storage-key-scheme">
        <label class="recommended"><input type="radio" name="v-storage-key-scheme" value="Agree" checked>Agree<span class="rec">recommended</span></label>
        <label><input type="radio" name="v-storage-key-scheme" value="Revise">Revise</label>
        <label><input type="radio" name="v-storage-key-scheme" value="Reject">Reject</label>
    </div>
    <textarea data-card="storage-key-scheme" placeholder="Comment on storage-key-scheme…"></textarea>
    <button type="button" class="quiet tiny clear" data-card="storage-key-scheme" data-act="clear">Clear</button>
</div>
```

Radio `name` is `v-<cardId>`. `.verdicts` is omitted when the set is empty; for `data-answer="options"` `attachRespond` sets `data-card="<cardId>"` on the agent's `.options` container, binds the `.option` inputs already named `v-<cardId>`, and appends only the textarea and Clear. `markChanged` writes `data-card` and `data-act="dismiss"` on the Dismiss button it inserts; Clear carries `data-act="clear"`. Events are delegated from `document` — one `change`, one `input`, one `click` — dispatching on `event.target.closest("[data-card],[data-section],[data-filter],[data-held]")`; `#held-note`'s Show and Discard carry `data-held="show"` and `data-held="discard"`.

A section carrying `data-loose="<label>"` gets a `.loose` box appended by `attachLoose(section)`: `<div class="loose"><span class="lab">label</span><textarea data-section="<sectionId>"></textarea></div>` (CO-6).

### Storage document

One JSON document per page, read once at boot, written once per debounced change (D-6, ST-1, ST-3).

| key                        | holds                                                             |
|----------------------------|-------------------------------------------------------------------|
| `artifact-suite.page.<id>` | the page document                                                 |
| `artifact-suite.theme`     | `"light"` or `"dark"`; absent means follow the system (D-4, AR-8) |

```json
{
  "schema": 1,
  "pageId": "artifact-suite-investigation",
  "rev": 2,
  "savedAt": "2026-08-24T09:31:04.118Z",
  "cards": {
    "storage-key-scheme": {
      "verdict": "Revise",
      "comment": "Two paragraphs\n\nof rationale.",
      "fingerprint": "-1483920117",
      "answeredAt": "2026-08-24T09:30:58.402Z",
      "touched": true,
      "rev": 1
    }
  },
  "sections": {
    "additional-comments": {
      "comment": "…",
      "touched": true,
      "answeredAt": "…"
    }
  },
  "orphans": {
    "old-card-id": {
      "verdict": "Agree",
      "comment": "",
      "fingerprint": "884213",
      "answeredAt": "…",
      "touched": true,
      "rev": 1,
      "title": "The card as titled when answered"
    }
  }
}
```

Per-card record: `verdict` (string or null), `comment` (raw newlines kept), `fingerprint`, `answeredAt`, `touched` (separates never-looked-at from looked-at-and-agreed, ST-5), `rev` (the `META.rev` answered against, ST-4). Orphans carry the same plus `title`.

Accessors are prompt-builder's (`extensions/artifacts/prompt-builder/prompt-builder.html` lines 1703-1705): `readStore(k)`, `writeStore(k, v)`, `dropStore(k)`, each wrapped in try/catch and falling back to an in-memory `MEM` map. When `CAN_LS` is false, `boot()` renders `#storage-note` inside `#foot`: `This browser is not saving answers — copy the prompt before you close the page.` `saveSoon()` debounces `saveState()` by 200ms.

### Fingerprints, changed cards, orphans

`fingerprintOf(card)`: clone the card, strip every engine-generated region from the clone — `.respond`, `.changed`, `.chip.earlier`, `.ref-links`, each reference's `summary`, and any `.demo` — then `hashOf(normalise(clone.textContent) + "|" + (card.dataset.tag || "") + "|" + (card.dataset.verdicts || ""))`. `normalise` collapses whitespace runs and trims; `hashOf` is prompt-builder's DJB2 (lines 1693-1697). Per card, never per file (AR-7). Normalised text rather than innerHTML so re-indenting during an unrelated edit does not read as a change; every prose, option and tag change is still caught. The hash covers authored prose alone, so it is the same whether taken before or after `expandRef` and the block and demo wiring run — independent of `boot()` order (PIVOT §9).

On restore (D-7):

| stored vs current fingerprint | behaviour                                                                                                                                        |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| equal                         | restore verdict and comment silently; insert `.chip.earlier`                                                                                     |
| different                     | restore both, then `markChanged(card, entry)` inserts `.changed` reading `Changed since you answered (rev <entry.rev>).` with a `Dismiss` button |
| no entry                      | pre-check `data-recommended`; leave untouched                                                                                                    |

`restoreCard()` returns immediately for any card carrying `data-answer="none"`: no verdict or comment is written back, no `.chip.earlier`, no `.changed`. The stored entry is kept (D-7) but excluded from `touchedCards()`, so an answer the agent has already transcribed into an `.answered` record or a withdrawn card does not re-enter the return prompt (D-15, D-8).

`dismissChanged(cardId)` re-fingerprints, writes the new fingerprint and `META.rev` into the entry, removes the strip, leaves `touched` alone. Staleness is decided by fingerprint alone; bumping `rev` without changing a card leaves it clean.

`collectOrphans()` moves every stored id with no matching card into `orphans` with its last title, then renders `#held-note` inside `#foot`: `<n> answers held for cards no longer on this page.` plus `Show` (lists id and title) and `Discard` (`discardHeld()`) (ST-13). When a card returns under the same id, `restoreCard()` moves its orphan back into `cards` and marks it changed.

### Touched, defaults, Accept all, Clear

`touched` flips true on the first genuine `change` on a card's radios or `input` on its textarea (ST-5). A pre-checked recommendation left alone stays untouched. `acceptAll()` (D-8): for every card with `data-recommended` whose entry is untouched, set the recommended verdict, `touched`, `answeredAt`, `rev`, save, then `flash("<n> cards recorded as agreed; <m> without a recommendation skipped.")`. `#accept-all` is shown only when at least one card carries `data-recommended`. `clearCard(cardId)` (ST-10) unchecks the group, empties the textarea, removes `.changed` and `.chip.earlier`, deletes the entry, re-applies the pre-check, saves.

Affirmation is carried by the delegated `click` handler, not `change`: a click on an `input[type=radio]` inside `.verdicts` or `.options` that was already `checked` fires no `change`, so the click handler calls `recordVerdict(cardId, input.value)` for it. Recording the value the card already holds is a no-op apart from `touched`, `answeredAt` and `rev` — which is the point: a deliberate click on the recommendation is a decision and enters the return prompt, while a card left alone does not (D-8).

### Return prompt

`composePrompt()` returns `""` when no card or section is touched and no orphan is held (AR-14), otherwise this and nothing else (ST-6, CO-13, ST-9, CO-11, D-9):

```
## Response — artifact suite investigation

Source: /Users/dylangraham/Projects/agent-library/dev/workspace/artifacts/artifact-suite-investigation.html · branch artifacts · rev 2 · built 2026-08-24
Untouched: 4 left at their recommended default, 3 unanswered.
Held: 2 answers for cards no longer on this page (old-card-id, other-id).

### Decisions

**storage-key-scheme · Keys must carry a page id**
- Verdict: Revise
- Note:
  Two paragraphs

  of rationale.
- Depth field, as configured: three options

**additional-comments · Additional comments**
- Note: one line

### Next

- Apply every accepted card to the plan before writing code.

Re-open: file:///Users/dylangraham/Projects/agent-library/dev/workspace/artifacts/artifact-suite-investigation.html
```

Rules: heading is `"## " + (META.prompt.heading || META.title)`. The `Source:` line is `provenanceLine()`: `pageFile()` (`root + "/" + self`), then the present values of branch, issue URL or PR URL, `rev`, and the build date, labelled `built`, joined with ` · `, empties dropped. `Untouched:` is two bare counts naming no card — `Untouched: 4 left at their recommended default, 3 unanswered.` The first counts untouched cards carrying `data-recommended`, the second untouched cards without one; cards with `data-answer="none"` count in neither. Either clause is dropped when its count is zero and the whole line is dropped when both are. The line is kept: D-8 governs which cards enter the prompt, a count that names none of them enters no card, and it preserves ST-6's unchanged summary in the one form D-8 allows. It sits under `Source:` rather than in ST-6's fourth position because, reduced to counts, it is a header fact about the page rather than a block of content, and `### Decisions` then
runs unbroken into `### Next` (ST-6, AR-14). `Held:` appears only when orphans exist, ids only. `### Decisions` lists touched cards in document order as `**<cardId> · <h3 text>**`, then `- Verdict:` only when set, then `formatNote(comment)`: one line emits `- Note: <text>`; many emit `- Note:` followed by each non-empty line prefixed with two spaces, empty lines emitted bare so paragraph breaks survive (ST-9). A radio token is never upper-cased. A `.demo[data-report]` inside a touched card with a non-empty `dataset.state` adds `- <data-report>: <state>`. Touched `data-loose` sections follow cards as `**<sectionId> · <h2 text>**`. `### Decisions` is omitted when no card and no section is touched, the same way `### Next` is omitted when `META.next` is empty; a prompt carrying only a `Held:` line is still emitted, because a held answer is a fact the agent needs. `### Next` prints `META.next` and is omitted when empty. `Re-open:` is `pageHref()` — `decodeURIComponent(location.href)` from
`file:`, else `location.href` — so a published page points at its URL. Filtering never affects composition.

`copyPrompt()` composes; on `""` it flashes `Nothing answered yet — nothing to copy.` and writes nothing. `viewPrompt()` toggles `#outwrap`, filling `#out` with the prompt or `_No responses entered._`.

### Clipboard, status, a11y

`copyText(text, onDone)` is the suite's only clipboard path (ST-7): feature-test `navigator.clipboard && navigator.clipboard.writeText`, pass `fallback` as the rejection handler; `fallback` tries prompt-builder's `execCommand("copy")` textarea (lines 3586-3596) and, failing that, reveals `#outwrap`, selects `#out`, and flashes `Clipboard blocked — select the text below and copy.` as bad. `flash(msg, bad)` writes `textContent` into `#status` (`role="status"` implies `aria-live="polite"`), toggles `.bad`, and clears after 2500ms unless bad (ST-8). Every transient message in the suite routes through `flash`.

### Capabilities

```js
var CAN_LS = (function () {
    try {
        localStorage.setItem("artifact-suite.__probe", "1");
        localStorage.removeItem("artifact-suite.__probe");
        return true;
    } catch (e) {
        return false;
    }
})();
var CAN_FS = typeof window.showSaveFilePicker === "function";
```

`capabilityGate()` removes every `[data-needs="fs"]` element when `CAN_FS` is false (ST-12) and renders `#storage-note` when `CAN_LS` is false. No File System Access affordance ships in this release (AR-17). No `prompt()` or `alert()` anywhere. The required surface is localStorage plus clipboard plus inline CSS/JS, which works from `file://` and over http alike.

### Function list

Declared in this order inside the engine IIFE, callers above callees.

| function                                                                                                     | contract                                                                                                                                                                                                                                                                                                                                                                                                                              |
|--------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `boot()`                                                                                                     | `readMeta` → `capabilityGate` → `loadState` → `validateCards` → per card `attachRespond` + `restoreCard` → `attachLoose` per `[data-loose]` → `collectOrphans` → `renderEyebrow` → `expandRef` per ref → `auditPaths` → `buildToc` → `observeSections` → `buildFilters` → wire delegated events, `#filters`, `#copy-prompt`, `#view-prompt`, `#accept-all`, `.themeset` → `checkTitles` → `revealTarget`; bound to `DOMContentLoaded` |
| `readMeta()`                                                                                                 | parse `#page-meta` into `META`; safe stub and red flash on failure                                                                                                                                                                                                                                                                                                                                                                    |
| `capabilityGate()`                                                                                           | probe `CAN_LS`/`CAN_FS`; strip `[data-needs="fs"]`; render `#storage-note`                                                                                                                                                                                                                                                                                                                                                            |
| `stateKey()`                                                                                                 | `"artifact-suite.page." + META.id`                                                                                                                                                                                                                                                                                                                                                                                                    |
| `readStore(k)` / `writeStore(k, v)` / `dropStore(k)`                                                         | guarded JSON accessors with `MEM` fallback                                                                                                                                                                                                                                                                                                                                                                                            |
| `loadState()` / `saveState()` / `saveSoon()`                                                                 | read the document; stamp `savedAt` and `rev` and write it; 200ms debounce                                                                                                                                                                                                                                                                                                                                                             |
| `hashOf(s)` / `normalise(s)` / `fingerprintOf(card)`                                                         | DJB2; whitespace collapse; per-card fingerprint over authored prose alone — `.respond`, `.changed`, `.chip.earlier`, `.ref-links`, each reference's `summary` and any `.demo` stripped from the clone                                                                                                                                                                                                                                 |
| `cardList()` / `cardTitle(card)` / `verdictsFor(card)`                                                       | `article.card[id]` in document order ignoring `hidden`; trimmed `h3` text; `data-verdicts` split on `\|` else default                                                                                                                                                                                                                                                                                                                 |
| `validateCards()`                                                                                            | warn and mark `needs-id`; warn on ordinal-shaped ids                                                                                                                                                                                                                                                                                                                                                                                  |
| `attachRespond(card)` / `attachLoose(section)`                                                               | build the response surface; build the section comment box                                                                                                                                                                                                                                                                                                                                                                             |
| `entryFor(cardId)` / `restoreCard(card)` / `markChanged(card, entry)` / `dismissChanged(cardId)`             | stored record; restore with fingerprint check; amber strip; re-fingerprint                                                                                                                                                                                                                                                                                                                                                            |
| `collectOrphans()` / `discardHeld()`                                                                         | move unmatched ids to `orphans` and render `#held-note`; empty `orphans`                                                                                                                                                                                                                                                                                                                                                              |
| `recordVerdict(cardId, value)` / `recordComment(cardId, text)` / `recordSection(sectionId, text)`            | set value, `touched`, `answeredAt`, `rev`; `saveSoon()`                                                                                                                                                                                                                                                                                                                                                                               |
| `clearCard(cardId)` / `acceptAll()`                                                                          | reset one card; agree every untouched recommended card                                                                                                                                                                                                                                                                                                                                                                                |
| `encPath(p)` / `lineAnchor(lines)` / `firstLine(lines)` / `mirrorPath(path, branch)`                         | percent-encode each path segment; `#L`/`#L`-`#L` anchor from `data-lines`; the first number of `data-lines`; the `dev/branches/` mirror path or `null`                                                                                                                                                                                                                                                                                |
| `renderEyebrow()` / `expandRef(el)` / `auditPaths()`                                                         | Provenance section below                                                                                                                                                                                                                                                                                                                                                                                                              |
| `buildToc()` / `observeSections()`                                                                           | render the model into `#toc-column` and `#toc-pills`; drive `aria-current`                                                                                                                                                                                                                                                                                                                                                            |
| `buildFilters()` / `applyFilter(name)`                                                                       | counts per tag plus `unanswered`; reveal when ≥ 2 tags; toggle `hidden` on cards and ToC entries                                                                                                                                                                                                                                                                                                                                      |
| `revealTarget()`                                                                                             | un-hide and scroll to the card named by `location.hash`, on load and `hashchange`                                                                                                                                                                                                                                                                                                                                                     |
| `touchedCards()` / `pageFile()` / `pageHref()` / `provenanceLine()` / `formatNote(text)` / `composePrompt()` | return prompt                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `copyPrompt()` / `viewPrompt()` / `copyText(text, onDone)` / `flash(msg, bad)`                               | clipboard and status                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `checkTitles()`                                                                                              | warn when `META.title`, `<title>` and `<h1>` disagree                                                                                                                                                                                                                                                                                                                                                                                 |
| `setTheme(mode)`                                                                                             | apply `system`/`light`/`dark`; sync `aria-pressed`; system removes attribute and key                                                                                                                                                                                                                                                                                                                                                  |

## Provenance & links

### URL derivation

Every URL derives from `META.provenance`; no template writes a literal href (PR-2, PR-5, AR-12). `encPath(p)` is `p.split("/").map(encodeURIComponent).join("/")`; line suffixes append after encoding.

| target                       | template                                                                                                    |
|------------------------------|-------------------------------------------------------------------------------------------------------------|
| Disk                         | `"file://" + encPath(root + "/" + diskPath)` (no line fragment: a `.md` over `file://` has no `#L` anchors) |
| Editor                       | `editor + "://file" + encPath(root + "/" + diskPath) + (lines ? ":" + firstLine(lines) : "")`               |
| GitHub blob                  | `repo + "/blob/" + ref + "/" + encPath(path) + lineAnchor(lines)`                                           |
| Issue / PR / Branch / Commit | `repo + "/issues/" + n`, `"/pull/" + n`, `"/tree/" + branch`, `"/commit/" + commit`                         |

`ref` is `commit` unless the block names another branch, then that branch name (D-12, PR-8); `data-commit` overrides. `lineAnchor("136-142")` is `#L136-L142`, `lineAnchor("136")` is `#L136`; `firstLine("136-142")` is `136`. `data-find` (scroll-to-text) is reserved and not implemented (PR-13). PR-5's and AR-12's `relRoot` is not carried: D-11 accepts the absolute checkout path, so the Disk href is `file://` over `root` and no relative prefix is needed. Nothing in the suite emits a relative file href.

### Build-time git facts

Run once per build from the repo root before writing the page (ST-6, PR-4):

```bash
cd "$(git rev-parse --show-toplevel)" && printf 'root=%s\nbranch=%s\ncommit=%s\norigin=%s\nbuiltAt=%s\n' \
  "$(git rev-parse --show-toplevel)" "$(git rev-parse --abbrev-ref HEAD)" "$(git rev-parse HEAD)" \
  "$(git remote get-url origin)" "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
gh pr view --json number --jq .number 2>/dev/null || true
```

`repo` is `origin` with `.git` stripped and `git@github.com:owner/name` rewritten to `https://github.com/owner/name`. `date` is the first ten characters of `builtAt`. A branch value of `HEAD` means detached: write `null`. Empty `gh pr view` output means `pr: null`. `issue` is never guessed: the agent writes the number the task names, else `null`.

### link-to-site

The agent writes only attributes; the engine builds the rest (PR-1, PR-6, CO-7, D-11):

```html

<details class="ref" data-path="docs/drafthorse/framework/steps.md" data-lines="136-142" data-loc="§ Dispositions"></details>
```

| attribute     | required                        | form                                                      | use                                                                                                                                                                        |
|---------------|---------------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `data-path`   | one of `data-path` / `data-url` | repo-relative POSIX path; no leading `/` or `./`; no `..` | every file href                                                                                                                                                            |
| `data-url`    | one of `data-path` / `data-url` | absolute `https:` URL                                     | a reference that is a site rather than a repo file; renders one chip, `.ref-chip.ref-site` labelled `Open site`, always the solid one. Mutually exclusive with `data-path` |
| `data-lines`  | no                              | `/^\d+(?:-\d+)?$/`                                        | `#L` anchor, editor `:line`, `.lines` badge                                                                                                                                |
| `data-loc`    | no                              | free text                                                 | display only, never parsed                                                                                                                                                 |
| `data-branch` | no                              | branch name                                               | mirror route and blob ref (D-12)                                                                                                                                           |
| `data-commit` | no                              | `/^[0-9a-f]{7,40}$/`                                      | blob ref override                                                                                                                                                          |
| `data-label`  | no                              | free text                                                 | inline `a.ref-link` text; defaults to the path                                                                                                                             |

Several references in sequence sit in `<div class="refs">`. A reference carries `data-path` or `data-url`, never both and never neither; a `data-url` reference is never origin-gated, never mirrored, and its summary shows the URL's host and path in `.path` with `data-loc` beside it, and `.ref-copy` copies the URL. A malformed `data-lines` is treated as absent; a malformed `data-path`, a `data-url` that is not `https:`, or a reference carrying both or neither renders `.ref--broken` with no chips and a `console.warn`. A diff block is always preceded by a `details.ref` naming its file. `provenance.root` keeps the absolute checkout path on every page, wherever the page is served (D-11 stands; PIVOT §8 second decision).

`expandRef(el)` generates, collapsed by default:

```html

<details class="ref" data-path="…" data-lines="136-142" data-loc="§ Dispositions">
    <summary><span class="path">docs/drafthorse/framework/steps.md</span><span class="lines">L136-142</span><span class="loc">§ Dispositions</span><span class="mirror">archived copy</span></summary>
    <div class="ref-links">
        <a class="ref-chip ref-disk" href="…" target="_blank" rel="noopener" title="/abs/path">Open file</a>
        <a class="ref-chip ref-editor" href="…" target="_blank" rel="noopener" title="vscode · line 136">Editor</a>
        <a class="ref-chip ref-gh" href="…" target="_blank" rel="noopener" title="blob/b966a43">GitHub</a>
        <button type="button" class="ref-chip ref-copy">Copy path</button>
    </div>
</details>
```

`.mirror` appears only on a mirrored reference. Every generated anchor carries `target="_blank" rel="noopener"` (D-13); in-page `#` anchors (ToC, `.chip.id`) never do. `a.ref-link` expands in place: `href` is the primary route for the current origin, plus `target`, `rel` and a `title` naming the other routes.

```css
details.ref { padding: 0; border-left: 2px solid var(--rule); border-radius: 2px; margin: 12px 0; }
details.ref summary { display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: baseline; padding: 9px 14px; background: var(--surface-sunk); }
.ref .path { font-family: var(--mono); font-size: 12.5px; color: var(--ink); word-break: break-all; }
.ref .lines, .ref .loc { font-family: var(--mono); font-size: 11.5px; color: var(--ink-faint); }
.ref .mirror { margin-left: auto; font-family: var(--mono); font-size: 10.5px; letter-spacing: .09em; text-transform: uppercase; background: var(--warn-soft); color: var(--warn); padding: 3px 8px; border-radius: 2px; }
.ref-links { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding: 12px 14px; }
.ref-chip { font-family: var(--mono); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; border: 1px solid var(--rule); border-radius: 2px; padding: 4px 10px; color: var(--ink-soft); background: var(--surface); text-decoration: none; cursor: pointer; }
.refs { display: grid; gap: 8px; margin: 14px 0; }
.path--unlinked { text-decoration: underline dotted var(--warn); }
.ref--broken > summary { border-left: 2px solid var(--stop); }
.ref--broken .path { color: var(--stop); }
```

`.ref-copy` copies the repo-relative path the Disk chip opens (the mirror path when mirrored) with `":" + data-lines` appended when lines exist, via `copyText`.

### Origin gating

The pre-paint script sets `data-origin="disk"|"web"` on the root (PR-3, D-18). CSS alone picks the primary chip and hides what cannot work, so a page published from disk needs no rebuild (AR-12). Exactly one chip is ever solid (PR-10).

```css
:root[data-origin="web"] .ref-disk, :root[data-origin="web"] .ref-editor, .ref--nodisk .ref-disk, .ref--nodisk .ref-editor { display: none; }
:root[data-origin="disk"] .ref:not(.ref--nodisk) .ref-disk, :root[data-origin="web"] .ref-gh, .ref--nodisk .ref-gh, .ref-site { background: var(--accent); color: var(--paper); border-color: var(--accent); }
```

The eyebrow is never gated: every eyebrow link is https.

### Archive mirror

`dev/branches/<branch>/` mirrors that branch's `dev/workspace/` one level shallower. `mirrorPath(path, branch)` returns `"dev/branches/" + branch + "/" + path.slice("dev/workspace/".length)` when `path` starts with `dev/workspace/`, else `null` (D-12, PR-8).

| `data-branch` | mirror | result                                                                                                             |
|---------------|--------|--------------------------------------------------------------------------------------------------------------------|
| absent        | —      | `diskPath` is `data-path`; blob pins to `commit`                                                                   |
| present       | exists | `diskPath` is the mirror path; `.mirror` badge; Disk and Editor `title` name the mirror; blob uses the real branch |
| present       | none   | class `ref--nodisk`: Disk and Editor dropped, GitHub primary at either origin                                      |

### Eyebrow

`renderEyebrow()` inserts cells before `.eyebrow .spacer` in the fixed order kind · rev · issue · pr · branch · commit · date (PR-4, CO-6). Kind is the display label for `META.kind` (`Review`, `Options`, `Issue breakdown`, `Interview`, `Demo`); issue, pr, branch and commit are anchors when `repo` is present; commit renders `commit.slice(0, 7)` with the full sha as `title`; branch is the highlighted cell (`.pv-branch code`). Cells carry `pv-kind`, `pv-rev`, `pv-issue`, `pv-pr`, `pv-branch`, `pv-commit`, `pv-date`. Absent fields emit nothing; present cells are collected into an array first and joined with `<span class="sep" aria-hidden="true"></span>` (the glyph comes from `.eyebrow .sep::before`), so no separator strands.

### Unlinked-path audit and path check

`auditPaths()` runs last in provenance: any `.path` element outside `.ref` or `.ref-link` gets `path--unlinked` and a `console.warn` (PR-1). At build time, after writing the page, the path check in `references/provenance.md` runs from the repo root: for every `data-path`, resolve the mirror when `data-branch` is set, confirm the file exists, and confirm the end of `data-lines` is within the file's line count; a `data-branch` reference whose mirror is absent (the `ref--nodisk` case) is instead checked with `git cat-file -e <branch>:<path>`; every `data-url` is checked to start with `https://`. Any output other than `OK` is a build failure.

### Absence and failure table

| condition                                                                | result                                                                |
|--------------------------------------------------------------------------|-----------------------------------------------------------------------|
| `repo` missing                                                           | GitHub chip dropped; eyebrow issue/pr/branch/commit as plain `<code>` |
| `root` missing                                                           | Disk and Editor chips dropped                                         |
| `editor` null                                                            | Editor chip dropped (PR-12)                                           |
| `issue`/`pr` null                                                        | cell omitted (PR-4)                                                   |
| `branch` null                                                            | branch cell omitted; blob pins to `commit`                            |
| `data-lines` absent or malformed                                         | no `.lines`, no `#L`, no `:line`                                      |
| `data-branch` set, no mirror                                             | `ref--nodisk`                                                         |
| origin `web`                                                             | Disk and Editor chips hidden, GitHub primary                          |
| `data-path` malformed                                                    | `ref--broken`                                                         |
| `data-url` not `https:`, or both / neither of `data-path` and `data-url` | `ref--broken`                                                         |

## Blocks

### CSS residency

Three tiers on the seam AR-2 measured.

| tier                      | holds                                                                                                                                                                                                                                                                                                                                                         | pasted by                                                                           |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| shell                     | tokens, base, layouts, masthead, `.toc`, `.filters`, `.chip*`, `.card*`, `.changed`, `.respond`/`.verdicts`/`.verdicts .rec`/`textarea`/`.clear`, `.loose`/`.lab`, `blockquote`/`cite`/`.q`, `details`, `details.ref` and every `.ref*`/`.pv-*`, buttons, `.themeset`, `.floater`, `#outwrap`, `#foot`, `.masthead-meta`, `.sec-head`, `.sec-intro`, `.gloss` | nobody                                                                              |
| template scoped `<style>` | review: `.verdict-strip`, `.stats`/`.stat`, `.src`, `.delta`, `.options`/`.option`/`.option .rec`; interview: `.card.answered`, `.q.rec`; demo kit: `.demo`, `.tag`, `.sub`, `.note`, `.readout`, `.readout .muted`, `.picks`, `.btnrow`, `.field`, `.help`                                                                                                   | `splice.py`, once per page, into `@template-style`                                  |
| block scoped `<style>`    | `diff.html`, `panel.html`, `figure.html`                                                                                                                                                                                                                                                                                                                      | `splice.py`, once per page, into `@template-style` the first time the block appears |

`figure.html` additionally owns `figcaption.cap`, `details.more` and `details.more .body`; `details.more` and `details.ref` never share a class. No template or block declares a font family, raw colour or token (DS-4, DS-16); no block restates a shell selector. Every block file opens with an instruction comment stating what it is, what to paste where, and that its style is safe to inline once (AR-13).

### Review card

Agent writes:

```html

<article class="card" id="storage-key-scheme" data-tag="integrate">
    <div class="chiprow"><a class="chip id" href="#storage-key-scheme">03</a><span class="chip integrate">Integrate</span><span class="chip">storage</span></div>
    <h3>One JSON document per page</h3>
    <p>Prose at the shell's 68ch measure; the card writes no max-width.</p>
</article>
```

Engine generates `.respond`, the edge colour from `data-tag`, the ToC entry, the `.chip.earlier` and `.changed` states. Body order is fixed: `.chiprow`, `h3`, optional `blockquote`, prose and evidence blocks, engine `.respond` last (CO-8).

### Options card

Agent writes, lifting the `.mode` row of `dev/workspace/reviews/process-nesting-demo.html` under the name `.option` (CO-5, DS-13):

```html

<article class="card" id="skill-name" data-tag="yourcall" data-answer="options" data-recommended="corpus-sweep">
    <div class="chiprow"><a class="chip id" href="#skill-name">N1</a><span class="chip yourcall">Your call</span></div>
    <h3>What the skill is called</h3>
    <p>One paragraph of framing.</p>
    <div class="options">
        <label class="option recommended"><input type="radio" name="v-skill-name" value="corpus-sweep" checked>
            <div><b>corpus-sweep<span class="rec">recommended</span></b><span>Matches the vocabulary already in use.</span></div>
        </label>
        <label class="option"><input type="radio" name="v-skill-name" value="corpus-migrate">
            <div><b>corpus-migrate</b><span>Names the destructive half only.</span></div>
        </label>
    </div>
</article>
```

Review-template style: `.options { display: grid; gap: 10px; }`, `.option` (flex row, `--surface`, 1px `--rule`, 2px left rule, radius 2px, `11px 14px`, pointer), `.option:has(input:checked)` accent edge, `.option input { margin-top: 6px; accent-color: var(--accent); }`, `.option b` (`--disp` 15.5px block), `.option span` (`--ink-soft` 14.5px), `.option .rec` (mono 10px uppercase accent), `.option.recommended { background: var(--accent-soft); border-left-color: var(--accent); }`. `checked`, `.recommended` and `data-recommended` must agree; a mismatch is a build error. Engine binds the radios, appends textarea and Clear, and `acceptAll()` targets `data-recommended` (D-8).

### Issue breakdown pieces

`.masthead-meta` in `@masthead` or, when numbers carry the page, `.stats` tiles from `dev/branches/agent-teams/reviews/corpus-sweep-design.html` retokenised (CO-6, DS-17): `.stats` flex wrap gap 10px; `.stat` (`--surface`, 1px `--rule`, radius 3px, `10px 14px`); `.stat b` (`--disp` 20px tabular); `.stat span` (mono 10.5px uppercase `--ink-faint`). `.verdict-strip` as the first child of the first section: `--accent-soft` ground, 1px `--accent` border, radius 3px, `18px 22px`, `h3` 18px accent, `p` 68ch (`dev/branches/drafthorse-condition-precedence/artifacts/issue-45-review.html` lines 191-199). Section order `#investigation` (cards) then `#additional-comments` carrying `data-loose="Additional comments — anything the cards missed"`.

### Quoted conversation

```html

<blockquote><p>I wanted demos to be fully customisable by the building agent.</p><cite>You · session 2026-08-21</cite></blockquote>
```

Shell CSS only; a multi-turn exchange is consecutive blockquotes, each with its own `<cite>` (DS-12, CO-8). Engine generates nothing.

### Filterable tags

The card carries `data-tag` and the chiprow prints the matching chip; that is all the agent writes. Engine: filter bar, counts, `hidden` toggling, ToC exclusion (CO-9, D-3). Display labels `Integrate`, `Your call`, `Defer`. A `.card.dead` keeps its `data-tag`, stays in the ToC and the counts; withdrawal is a state.

### Withdrawn card

`<article class="card dead" id="…" data-tag="…" data-answer="none">` with `<span class="chip dead">Withdrawn</span>` in the chiprow. It keeps its id and never leaves the page (AR-6, DS-11). A withdrawn card carries `data-answer="none"` so it stops taking new answers while keeping its id and its held record (AR-6, D-7).

### Block file: diff — `assets/blocks/diff.html`

One row per line, no glyph in the text (DS-9, CO-10, AR-9):

```html

<div class="diff" data-copy="adds">
    <div class="diff-row ctx"><span class="tx">- **Named recoverable failure** — claim the remainder.</span></div>
    <div class="diff-row del"><span class="tx">- **De-hold** — the condition must stop holding.</span></div>
    <div class="diff-row add"><span class="tx">- **User approval problem** — claim the remainder.</span></div>
    <div class="diff-row gap"><span class="tx">…</span></div>
</div>
```

Line numbers: add `numbered` to the container and `data-ln` to each row that has one.

```css
.diff { font-family: var(--mono); font-size: 12.5px; line-height: 1.65; border: 1px solid var(--rule); border-radius: 2px; background: var(--surface-sunk); overflow-x: auto; margin: 4px 0 14px; }
.diff-row { display: grid; grid-template-columns: 1.6em minmax(0, 1fr); }
.diff-row::before { content: ""; grid-column: 1; grid-row: 1; text-align: center; user-select: none; }
.diff-row > .tx { grid-column: 2; grid-row: 1; padding: 3px 12px 3px 4px; white-space: pre-wrap; word-break: break-word; }
.diff.numbered .diff-row { grid-template-columns: 3.4em 1.6em minmax(0, 1fr); }
.diff.numbered .diff-row::after { content: attr(data-ln); grid-column: 1; grid-row: 1; text-align: right; padding-right: 10px; color: var(--ink-faint); user-select: none; font-variant-numeric: tabular-nums; }
.diff.numbered .diff-row::before { grid-column: 2; }
.diff.numbered .diff-row > .tx { grid-column: 3; }
.diff-row.add::before { content: "+"; color: var(--add-mark); }
.diff-row.del::before { content: "\2212"; color: var(--del-mark); }
.diff-row.ctx > .tx { color: var(--keep-ink); }
.diff-row.add > .tx { background: var(--add-bg); color: var(--add-ink); }
.diff-row.del > .tx { background: var(--del-bg); color: var(--del-ink); }
.diff-row.gap > .tx { color: var(--ink-faint); opacity: .7; }
```

The gutter carries no background; the tint paints only `.tx` (DS-9). Context rows get an empty gutter (CO-10). Keep lines take `--keep-ink` on the block's `--surface-sunk` (DS-8). The block's script, pasted into `@template-script`, appends `button.quiet.tiny` "Copy added lines" to every `.diff[data-copy="adds"]`, joining `.add .tx` text and calling `SUITE.copyText` (CO-10, ST-7).

### Block file: panel — `assets/blocks/panel.html`

Optional, never shell furniture (D-17). Opener `<button class="ghost tiny" type="button" data-panel="panel-method">…</button>` anywhere; `<dialog class="panel" id="panel-method">` as a sibling of the section with `<button class="quiet tiny close" data-panel-close>Close</button>`, `h2`, `p.lede`, `h3`, `p`. Style is prompt-builder's `dialog.help` (lines 680-713) under the name `dialog.panel`. Script: one delegated click — `[data-panel]` opens with `showModal()`, `[data-panel-close]` or a click on the dialog backdrop closes. Nothing inside a dialog is collected into the prompt.

### Block file: figure — `assets/blocks/figure.html`

`figure.fig` (`--surface`, 1px `--rule`, radius 3px, `16px 18px`, `overflow-x: auto`) with `svg { display: block; min-width: 640px; max-width: 100%; height: auto; }` and `figcaption.cap` (14px `--ink-faint`, `margin: 10px 0 0`). The SVG kit is lifted from `dev/branches/agent-teams/reviews/corpus-sweep-design.html` lines 50-62 and remapped onto tokens (CO-14, DS-17): `--panel` → `--surface`, `--line` → `--rule`, `--muted` → `--ink-faint`, `--lane` → `--surface-sunk`, the three actor colours `--wf`/`--ml`/`--usr` → `--accent`/`--warn`/`--ink-soft` under the names `.box.a`/`.box.b`/`.box.c`, and `svg text` on `--mono` with `fill: var(--ink)`. The resulting rules: `svg .lanebg { fill: var(--surface-sunk); }`, `svg .lanelbl { font-size: 10px; letter-spacing: .09em; fill: var(--ink-faint); }`, `svg .box { fill: var(--surface); stroke: var(--rule); stroke-width: 1.5; }`, `svg .box.a { stroke: var(--accent); } svg .box.b { stroke: var(--warn); } svg .box.c { stroke: var(--ink-soft); }`,
`svg .t { font-size: 11px; }`, `svg .ts { font-size: 9.5px; fill: var(--ink-faint); }`, `svg .arw { stroke: var(--ink-faint); stroke-width: 1.4; fill: none; }`, `svg .track { stroke: var(--rule); stroke-width: 2; }`, `svg .dot { fill: var(--surface); stroke-width: 2; }`. `.track` is the source's `.rail` renamed (D-5). Actor colours come from `.a/.b/.c`; a `style` attribute on an SVG element is a build error. The same file carries `details.more` with `summary` and `.body` for collapsed evidence; `details.more` and `details.ref` never share a class.

### Agent writes versus engine generates

| block           | agent writes                                                        | engine generates                                         |
|-----------------|---------------------------------------------------------------------|----------------------------------------------------------|
| review card     | `article#id[data-tag]`, chiprow, `h3`, prose                        | `.respond`, edge, ToC entry, `.chip.earlier`, `.changed` |
| options card    | `.option` rows with the recommended row checked                     | textarea, Clear; binds radios; Accept all                |
| issue breakdown | `.masthead-meta` or `.stats`, `.verdict-strip`, cards, `data-loose` | eyebrow, `.loose` box                                    |
| link to site    | empty `details.ref` with attributes                                 | summary, chips, hrefs, gating, mirror badge, Copy path   |
| quote           | `blockquote` with `cite`                                            | nothing                                                  |
| filterable tags | `data-tag` and chip                                                 | filter bar, counts, hiding                               |
| diff            | container and rows                                                  | copy-added-lines button (block script); glyphs from CSS  |
| panel           | opener and `dialog.panel`                                           | nothing (block script opens and closes)                  |
| figure          | `figure.fig` SVG with kit classes                                   | nothing                                                  |
| demo            | everything inside `.demo` plus its script                           | `data-report` line in the prompt                         |

## Page templates

### Six kinds onto three templates

| kickoff kind    | file                                                            | `kind`      | layout (D-1)                                           | default verdicts                            | signature blocks                                                                                  |
|-----------------|-----------------------------------------------------------------|-------------|--------------------------------------------------------|---------------------------------------------|---------------------------------------------------------------------------------------------------|
| page shell      | `assets/shell.html`                                             | —           | —                                                      | —                                           | —                                                                                                 |
| review page     | `assets/templates/review.html`                                  | `review`    | `.shell.rail`                                          | `Agree\|Revise\|Reject`                     | verdict strip, cards, refs, diffs                                                                 |
| options page    | `assets/templates/review.html`                                  | `options`   | `.shell` up to eight cards, `.shell.rail` from nine    | none; `data-answer="options"` rows          | options cards, quotes                                                                             |
| issue breakdown | `assets/templates/review.html`                                  | `issue`     | `.shell.rail`                                          | `Accept\|Amend\|Defer`                      | masthead meta or stats, verdict strip, `#investigation`, `#additional-comments` with `data-loose` |
| interview page  | `assets/templates/interview.html`                               | `interview` | `.shell`                                               | none; each question carries `data-verdicts` | answered records, question cards, quotes                                                          |
| demo page       | `assets/templates/demo-kit.html` (kit — readable from any kind) | `demo`      | `.shell.board` for a board, `.shell` for inline strips | none                                        | whatever the demo composes                                                                        |

A page declares its layout by class on `.shell` and nothing else (AR-10). `demo-kit.html` is a kit, not a page template: a page of any kind that carries a `.demo` reads it in addition to its page template (D-16, CO-4). The anatomy is one card; what differs between review, options and issue is the verdict vocabulary as data, the chips, and which optional blocks appear (D-14, AR-16, CO-2).

### Template: review

Contents in order: instruction comment naming what to fill and where; the scoped `<style>` (`.verdict-strip`, `.stats`/`.stat`, `.src`, `.delta`, `.options`/`.option`/`.rec`); a `#page-meta` exemplar for each of the three kinds; the section skeleton; one exemplar each of a review card, an options card, a withdrawn card, a card with a `details.ref`, and a card with a quote.

```html

<section id="findings">
    <div class="sec-head"><h2>Findings</h2><span class="count">8</span></div>
    <p class="sec-intro">One or two lines on what the section covers.</p>
    <div class="verdict-strip"><h3>Where it landed</h3>
        <p>…</p></div>
</section>
```

The skeleton is the whole `@markup` part; cards enter it later through `splice.py $P section findings`. The card exemplars that follow in the file sit outside the `@markup` delimiters.

`.src` is the pre-formatted evidence box (`dev/branches/drafthorse-condition-precedence/artifacts/issue-45-review.html` lines 218-228): mono 12.5px, `--ink-faint`, `--surface-sunk`, 2px `--rule` left, `overflow-x: auto`, `white-space: pre`. `.delta` is the two-column now/next comparison (same file, lines 258-274) with `.delta .now` on a 2px `--stop` edge and `.delta .next` on `--accent`.

### Template: interview

Open question:

```html

<article class="card" id="self-update-recipe" data-tag="yourcall" data-verdicts="You draft it|I'll write it" data-recommended="You draft it">
    <div class="chiprow"><a class="chip id" href="#self-update-recipe">Q1</a><span class="chip yourcall">Your call</span></div>
    <h3>What does the self-update recipe actually say?</h3>
    <p>Framing.</p>
    <p class="q rec"><b>Recommend:</b> I draft it, you edit it in place.</p>
</article>
```

Answered record, written by the agent on republish in place of the question (D-15, CO-3):

```html

<article class="card answered" id="self-update-recipe" data-tag="integrate" data-answer="none">
    <p class="q">Q1 · what the recipe says</p>
    <h3>You draft it</h3>
    <p>What the answer settled, in the agent's words.</p>
</article>
```

The record keeps the question's id so the stored answer stays attached (ST-2); `data-answer="none"` stops a second response surface. Records sit in `#answered` above `#open`. Scoped style: `.card.answered { border-left-color: var(--accent); }`, `.card.answered h3 { font-size: 16.5px; margin: 0 0 6px; }`, `.q.rec { color: var(--ink); text-transform: none; letter-spacing: 0; font-family: var(--serif); font-size: 15px; }`, `.q.rec b { color: var(--accent); }`.

### Template: demo kit (D-16)

Not a page: a kit file of labelled fragments, each preceded by a comment naming what it is and what it costs. Six parts:

1. Scoped style for `.demo` (dashed sunk strip), `.demo > .tag` (mono accent label, convention `live · <scope>`), `.demo .sub` (one-line instruction), `.demo .note` (mono `--ink-faint` one-line transient text, the demo's own status line — `.status` is reserved by the shell), `.readout` (mono live output on a 2px accent edge) and `.readout .muted`, `.picks` (pill radio/checkbox set with `:has(input:checked)` accent), `.btnrow`, `.field`/`.help`; all on tokens (CO-4).
2. The two proven shapes as ~15-line skeletons: the inline strip inside a review card (`<div class="demo" id="d1" data-report="Depth field, as configured"><span class="tag">live · …</span><p class="sub">…</p><div class="btnrow"><button class="ghost tiny">…</button><span class="note"></span></div><div class="readout"></div></div>`), and the board (page on `.shell.board`, controls in `@content`, live rendering in `@sidebar`).
3. Integration points: demo CSS scoped under the demo's own id in `@template-style`; demo JS in `@template-script`; `SUITE.flash(msg, bad)` for announcements; `SUITE.copyText(text, onDone)` for clipboard; `SUITE.meta` read-only; `data-report` on `.demo` plus a current `dataset.state` for the return prompt.
4. Rules: no external asset; no `localStorage` in any form (the page has one document under one key, D-6; demo state lives in memory or `dataset`); no `data-theme`, token or theme-block edits (DS-5); no font family, raw colour or shell-class redeclaration; none of the reserved ids, and no shell class name — `.status`, `.card`, `.chip`, `.respond`, `.toc`, `.filters`, `.floater` included — even where the shell's rule is scoped elsewhere; no `.respond` or its inputs, and no `data-card` on a demo control; a demo card that takes a verdict is still an ordinary card with an id.
5. One worked micro-example, complete, ~20 lines.
6. A `kind: "demo"` `#page-meta` exemplar and a minimal page scaffold — one `@masthead` block and one `<section id="…">` with `.sec-head`, so a demo-kind page has the same authoring floor as a review or interview page.

A composed demo page carries only the fragments it used.

## Skill

### SKILL.md shape

An ordinary skill: frontmatter, then a plain markdown body following the repository's skill conventions. Conversion to DraftHorse is a separate, later, interactive task run through the `drafthorse` skill against the finished file. Frontmatter:

```yaml
---
name: artifact-suite
description: Build an interactive HTML artifact page — review, options, issue breakdown, interview or demo — on the suite shell, so the user decides card by card and returns a prompt carrying those decisions back. Use whenever about to write an HTML page that presents findings, questions, options, a diff set or a demonstration to the user, and when updating a page the suite already built.
allowed-tools: Read, Glob, Grep, Bash(cp:*), Bash(mkdir:*), Bash(ls:*), Bash(cd:*), Bash(printf:*), Bash(grep:*), Bash(diff:*), Bash(wc:*), Bash(git rev-parse:*), Bash(git remote get-url:*), Bash(git cat-file:*), Bash(gh pr view:*), Bash(date:*), Bash(python3:*), Bash(kill:*), mcp__playwright__browser_navigate, mcp__playwright__browser_evaluate, mcp__playwright__browser_click, mcp__playwright__browser_type, mcp__playwright__browser_snapshot, mcp__playwright__browser_console_messages, mcp__playwright__browser_resize, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_close
---
```

Both invocation fields omitted: model-invocable and user-invocable, so the agent reaches for it before hand-authoring chrome (AR-1). No `rm` grant; no Edit or Write grant, since every write to a page goes through `splice.py` (Shell → Form). The static checks run through `assets/verify.py` under the `python3` grant; `grep`, `diff` and `wc` are granted for the acceptance test's byte count, the path check's line count and ad hoc confirmation, and `browser_take_screenshot` for the runtime tier. Body, under plain headings: global invariants (write only between markers and the class on `.shell`; never Read the shell or the page copy; ids permanent; `<\/` rule), inline references (marker table, landing rule, token economy, six-kind mapping), the ten numbered steps, terms.

### Build procedure (the ten steps)

Ten numbered steps; the error step stands alone as step 10. Plugin assets run from the last installed release, so the skill is executed by hand from the working tree throughout Stage 3.

1. **Open the Build** — decide kind, layout class, `id` slug (verified unused with `ls dev/workspace/artifacts dev/branches/*/artifacts`), and new page versus revision.
2. **Load the Page Kind** — read `references/page-kinds.md`, then the one page template the kind maps to: `review.html` for the review, options and issue-breakdown kinds, `interview.html` for interview; never a second page template. A `demo` page maps to no page template — it reads `assets/templates/demo-kit.html` alone, and the kit's part 6 supplies the `#page-meta` exemplar and page scaffold. The kit is not a page template: a page of any other kind reads it in addition to its page template whenever that page carries a `.demo` (D-16, CO-4). Read a template for its exemplars and instruction comment only; its `@style` and `@script` parts are never read into context.
3. **Resolve Provenance** — run the build-time git facts; derive `repo`, `root`, `self`, `branch`, `commit`, `date`, `builtAt`; `pr` from `gh`; `issue` from the task or null; `editor` defaults to `vscode`.
4. **Instantiate the Shell** — `P=dev/workspace/artifacts/<id>.html; S=extensions/skills/artifact-suite/assets; mkdir -p dev/workspace/artifacts && cp $S/shell.html $P`. Every Bash call is a fresh shell — re-assign `P` and `S` at the head of each command. Fill the three placeholder regions through `splice.py`, replacing the placeholder element inside each — `@doc-title`'s `<title>Untitled</title>`, `@page-meta`'s `{}` block (`rev` 1), `@masthead`'s `<h1>Untitled</h1>` — leaving all six markers in place; then `python3 $S/splice.py $P layout rail` (or `board`) when the kind calls for it, the one sanctioned write outside a marker. On the options kind the card count decides the class; when it is not yet fixed, leave `.shell` bare and re-run `splice.py $P layout rail` once the cards are written. Never Read the shell or the copy.
5. **Splice the Template** — never retype a scoped style or a block script. Splice each part mechanically, once per page. A template's `@markup` part carries section skeletons only — `<section id>`, `.sec-head`, `.sec-intro`, optional `.verdict-strip` — and no `article.card`; card exemplars sit outside the `@markup` delimiters, for reading:

```bash
P=dev/workspace/artifacts/<id>.html
S=extensions/skills/artifact-suite/assets
python3 $S/splice.py $P template-style $S/templates/review.html style
python3 $S/splice.py $P content $S/templates/review.html markup
python3 $S/splice.py $P template-style $S/blocks/diff.html style
python3 $S/splice.py $P template-script $S/blocks/diff.html script
```

6. **Write the Cards** — one splice per card into its section, `python3 $S/splice.py $P section <sectionId> <<'HTML' … HTML`: `article#id[data-tag]`, chiprow with the anchor id chip, `h3`, prose, refs as empty `details.ref`. The agent types only the cards. Finished when every card has a unique subject-named id and every card needing a non-default vocabulary carries `data-verdicts` or `data-answer="options"`.
7. **Revise a Published Page** (dormant) — open with `python3 $S/splice.py $P show page-meta` and `python3 $S/splice.py $P show cards` to read the current `rev`, the `#page-meta` body and the ids on the page before any splice; published ids are permanent; a dropped card becomes `.card.dead` with `.chip.dead` and `data-answer="none"`; only changed cards are spliced (`splice.py $P card <cardId>`); `rev` bumps by one, `date`, `builtAt` and `commit` update in the same `@page-meta` splice. The git diff touches `#page-meta` and the edited cards, nothing else.
8. **Verify the Page** — run `references/verification-checks.md` (static tier through `python3 $S/verify.py $P --static`, then the runtime tier); repair before hand-over; report a skipped runtime tier with its reason.
9. **Hand the Page Over** (success) — report the `file://` path, `id`, `rev`, card count and checks run.
10. **Handle a Build Problem** (error) — missing marker → hard bail naming it; slug collision → rename and re-copy; unparseable `#page-meta` → restore and re-splice, never leave it on disk; `splice.py` non-zero → report its message and stop; no browser → static tier only; template does not cover the shape → hard bail and raise an issue, never a third page template.

### Update procedure

Revision rules are step 7. The engine's per-card fingerprint raises `.changed` on exactly the edited cards; a whole-file rewrite raises it on all of them and is a defect (D-7, AR-6, AR-7).

### Token economy

| never typed                                           | supplied by                                                                               |
|-------------------------------------------------------|-------------------------------------------------------------------------------------------|
| tokens, layout rules, engine                          | the `cp` of the shell (AR-1)                                                              |
| `.respond`, radios, textareas                         | engine per card (AR-5)                                                                    |
| ToC, pill row, filter bar, theme control              | engine (PR-7, D-2, D-3, D-4)                                                              |
| any `file://`, `vscode://` or GitHub URL              | engine from `data-path` and `META.provenance` (PR-5)                                      |
| eyebrow markup                                        | engine (PR-4)                                                                             |
| return prompt text                                    | `composePrompt()` (CO-13, AR-14)                                                          |
| the shell's contents                                  | copied by `cp` and spliced by `splice.py`; never Read, never Edited                       |
| a template's scoped CSS, a block's CSS and its script | `assets/splice.py` lifting the `@style`/`@script` part (never read, never typed)          |
| a second page template                                | one page template per page (AR-15); `demo-kit.html` is a kit and may be read alongside it |
| a whole file on update                                | per-card splices (AR-6)                                                                   |

Expected cost (AR-15): one template read for its exemplars plus the cards themselves — roughly 95 authored lines and 8-10KB for a 10-card review, none of it chrome — against 3-4K output tokens of chrome per page under hand-authoring.

### Verification procedure

Static tier, no browser:

Every static check S1-S9 is implemented as a subcommand of one script, `assets/verify.py`, run as `python3 $S/verify.py <page> --static`; `references/verification-checks.md` documents each check and the one command that runs them all.

- **S1** `<!doctype html>` is line 1 of the file and the shell stamp text `artifact-suite shell v1` is present (D-18 as amended).
- **S2** all seven marker pairs present exactly once.
- **S3** `#page-meta` parses after replacing `<\/` with `</`; carries `id`, `kind`, `rev`, `title`, `provenance`, `prompt`, `next` (ST-11).
- **S4** every `article.card` has an `id`; ids unique; none matches `^[a-z]?\d+$` (ST-2).
- **S5** every options card has `checked`, `.recommended` and `data-recommended` agreeing; every `.path` sits inside a ref (PR-1).
- **S6** no `<img src>`, `<link href>` or `<script src>` names any host but `fonts.googleapis.com` and `fonts.gstatic.com`; every other absolute URL in the file sits inside `#page-meta` or a `data-url` attribute — no literal `href` anywhere (PR-2, PR-5); path check prints `OK`.
- **S7** exactly one `<title>`, one `<h1>` and one `id="page-meta"` in the file; no placeholder text (`Untitled`, `>{}<`) survives.
- **S8** the file carries exactly one element matching `class="shell"`, `class="shell rail"` or `class="shell board"`, and no other class on it.
- **S9** every spliced `@style`/`@script` part is byte-identical to its source part in `assets/`.
- **S10** every `article.card` is a descendant of a `section[id]`.

Runtime tier, Playwright over `python3 -m http.server 8787 --bind 127.0.0.1 --directory "$(git rev-parse --show-toplevel)"` (background, pid recorded, killed at the end), URL `http://127.0.0.1:8787/dev/workspace/artifacts/<id>.html`. Interaction uses `browser_click` and `browser_type`; `browser_evaluate` reads state and injects the failure conditions V12, V12a and V16 require.

- **V1** zero console errors and warnings; the `card without id` warning absent.
- **V2** ToC entry count equals `article.card[id]` count; `.respond` count equals `article.card[id]:not([data-answer="none"]):not(.needs-id)` count (AR-5, PR-7).
- **V3** no hand-written `input[type=radio]` or `textarea` outside `.respond`, except inside `.options` (options cards) or inside a `.demo` (demo controls, which never carry `data-card`).
- **V4** every radio group `name` is `v-<cardId>` of its own card.
- **V5** theme: Light then Dark change the computed `--paper`; System removes `data-theme` and `artifact-suite.theme` (D-4).
- **V6** the pre-paint script is the first `<script>` and precedes `<style>` (AR-11).
- **V7** choose a verdict, type a multi-line comment, reload: both restore with line breaks (ST-1, ST-9).
- **V8** every key written starts with `artifact-suite.page.<id>` except `artifact-suite.theme` (D-6, AR-8).
- **V9** Clear returns a card to unanswered (ST-10).
- **V10** nothing touched → Copy flashes the nothing-answered message and View shows `_No responses entered._`; one card answered → prompt has the `Source:` line, that card as `**<cardId> · <title>**`, no untouched card, and an `Untouched:` line whose two counts equal the untouched cards with and without `data-recommended` (AR-14, CO-13, D-8).
- **V11** Accept all records the pre-checked defaults and they appear in the prompt (D-8).
- **V12** mutate one card's text through the page, reload: `.changed` on that card only, all other answers intact (D-7, AR-7); answer a card carrying a `details.ref`, reload without editing: no `.changed` on it (PIVOT §9).
- **V12a** answer two cards, remove one card from the file, reload: `#held-note` reports one held answer, Show lists its id and title, the prompt carries the `Held:` line, and Discard empties it (D-7, ST-13); a card restored under the same id carries `.chip.earlier` (CO-12).
- **V12b** a section carrying `data-loose` gets a `.loose` box; typing in it and copying puts `**<sectionId> · <h2 text>**` after the cards in the prompt (CO-6).
- **V13** every generated `a[href*="://"]` carries `target="_blank" rel="noopener"` (D-13); every chip a ref actually renders has an href with no `undefined`, `null` or empty segment; a plain ref renders Disk, Editor and GitHub and its GitHub href contains `commit` (D-12, PR-11); a `data-branch` ref whose mirror exists resolves under `dev/branches/<branch>/` and shows `.mirror` (PR-8); a `data-branch` ref with no mirror carries `ref--nodisk` and renders GitHub alone; with `editor: null` no Editor chip is rendered (PR-12); with `data-origin` set to `web` through `browser_evaluate`, `.ref-disk` and `.ref-editor` are both hidden and GitHub is solid (PIVOT §9); a `data-url` ref renders `.ref-site` alone; exactly one `.ref-chip` is solid per ref (PR-10).
- **V14** at 1440, 1100, 900 and 390px, `scrollWidth <= innerWidth + 1`; in `.shell.rail` below 1040 the column is hidden and the pill row visible (D-1, D-2).
- **V15** each filter leaves visible exactly the cards carrying that `data-tag`; `unanswered` leaves the cards whose entry is absent or `touched: false` (D-3).
- **V16** with `navigator.clipboard` deleted, Copy reports through `#status` without throwing (ST-7); `#status` has `role="status"` (ST-8); `capabilityGate` removes any `[data-needs="fs"]` element injected by the test (ST-12; no such element ships in this release, AR-17).
- **V16a** scroll to the second section: exactly one link in each of `#toc-column` and `#toc-pills` carries `aria-current="true"`, and it names that section (D-2).
- **V17** on a card carrying `data-recommended`, clicking the already-checked recommended radio marks it touched and puts it in the prompt; loading the page and touching nothing leaves it out (D-8).

Fixtures in `tests/fixtures/` freeze provenance (`id: "fixture-<kind>"`, `commit: "0000000000000000000000000000000000000000"`, `date: "2000-01-01"`, `branch: "fixture"`) and are the regression suite: after any change to the shell, a template or a block, run both tiers over all three before committing. A fixture that must change to keep passing is a contract change and is re-committed with the shell change.

## Stage 3 work packages

| WP    | work                                                                                                                                                                                                                                                     | depends on                      | done-check                                                                                                                                                                                                                                                         |
|-------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| WP-1  | `assets/shell.html` chrome: stamp line, markers, tokens (14 + 7), base, layouts, masthead, ToC containers, filters, chips, card, respond, quote, details, buttons, themeset, floater, `#foot`, ref and eyebrow CSS, pre-paint script; `assets/splice.py` | —                               | a bare `cp` renders an empty valid page from `file://` in both themes; `splice.py` fills each region kind, appends into a section, and refuses a duplicate part; the `@supports not (selector(:has(*)))` verdict floor is present; CSS ≤ 16KB; S1, S2, S7, S8 pass |
| WP-2  | the engine in `assets/shell.html`: every function in the list, `window.SUITE`                                                                                                                                                                            | WP-1 (same file; land together) | a hand-made three-card page passes V1-V12b, V14-V17; engine ≤ 17KB                                                                                                                                                                                                 |
| WP-3  | provenance inside the engine: `renderEyebrow`, `expandRef`, `auditPaths`, mirror and gating; `references/provenance.md` with the path check                                                                                                              | WP-2                            | V13 passes on a page with a plain ref, a mirrored ref, a nodisk ref, a `data-url` ref and `editor: null`                                                                                                                                                           |
| WP-4  | `assets/templates/review.html`, `assets/templates/interview.html`                                                                                                                                                                                        | WP-1, WP-2, WP-3                | each splices into a fresh shell copy and passes both tiers                                                                                                                                                                                                         |
| WP-5  | `assets/blocks/diff.html`, `assets/blocks/panel.html`, `assets/blocks/figure.html`, `assets/templates/demo-kit.html`                                                                                                                                     | WP-1, WP-2                      | each splices once without restating a shell selector; diff copy button uses `SUITE.copyText`; V1 stays clean                                                                                                                                                       |
| WP-6  | `references/runtime.md`, `references/page-kinds.md`                                                                                                                                                                                                      | WP-3, WP-4, WP-5                | every name in them greps to a definition in this plan                                                                                                                                                                                                              |
| WP-7  | `SKILL.md`                                                                                                                                                                                                                                               | WP-6                            | a fresh agent builds a review page from the working tree by following it, with no question back                                                                                                                                                                    |
| WP-8  | `assets/verify.py`, `references/verification-checks.md`, `tests/fixtures/*`                                                                                                                                                                              | WP-3, WP-4, WP-5                | all three fixtures pass S1-S10 and V1-V17                                                                                                                                                                                                                          |
| WP-9  | acceptance rebuild and report                                                                                                                                                                                                                            | WP-7, WP-8                      | the acceptance test below passes                                                                                                                                                                                                                                   |

WP-4 runs once WP-3 lands; WP-5 depends only on WP-1 and WP-2, so it runs alongside WP-3. The build is finished when WP-9's acceptance test passes.

### Acceptance test

Rebuild `dev/workspace/reviews/artifact-suite-investigation.html` onto the shell as `dev/workspace/artifacts/artifact-suite-investigation.html`, leaving the original as the baseline. Review kind on `.shell.rail`, 75 cards across five lens sections, each card's id the lowercased finding id (`ds-1` … `pr-13`, a stable external identifier and so a valid subject name under the Card contract), each finding's evidence as `details.ref` with `data-path` and `data-lines`. It passes when:

- all 75 cards are present with lens section, chiprow, tag and prose intact, and both verification tiers pass;
- answering the thirteen `yourcall` cards as the user answered them, and accepting the recommended default on the rest, yields a prompt whose `### Decisions` blocks carry exactly those thirteen subjects and verdicts — nothing lost, nothing invented; the decisions the user reached outside a card (D-16, D-19, D-20) are out of scope for this check;
- untouched cards stay out of the prompt and the empty page yields the placeholder line (AR-14, D-8);
- the prompt opens with the `Source:` line and keys each block `**<cardId> · <title>**` (CO-13, ST-6);
- reloading restores every answer (ST-1); editing one card's prose and bumping `rev` raises `.changed` on that card alone (D-7);
- every evidence ref opens the cited file on disk and its GitHub chip pins to the build commit (D-11, D-12);
- the authored bytes are recorded against the original's 244KB and the delta reported (AR-1).

## Risks

- Shell budget: AR-1's 14-18KB predates the persistence, ToC, filter and provenance scope. Measured from this plan's own rules the shell is ~15.5KB CSS (10.5KB written here, 1.6KB tokens copied from prompt-builder lines 21-74, 0.6KB added tokens, 0.9KB buttons, 1.8KB response surface) plus an engine of ~54 functions, four of them one-line URL helpers well under the floor, at prompt-builder's ~340B/function floor, so the ceiling is set at 36KB hard / 32KB target. If the engine overruns 17KB, move `details.ref` CSS and `expandRef` into `assets/blocks/reference.html` before cutting any engine behaviour. A 10-card page then lands near 36 + 2 (template style) + 10 (content) = 48KB, well inside the 120KB working budget.
- `file://` storage: AR-8 and CO-12 disagree on whether Chrome's `file://` origin throws on `localStorage`; the runtime tier therefore runs over localhost, and the `MEM` fallback plus `#storage-note` cover the throwing case. Check V7 manually from `file://` once in WP-2.
- `:has()` with no fallback beyond the verdict floor (DS-18): acceptable for Chrome.
- Absolute checkout path in `#page-meta.provenance.root` (D-11): a page published anywhere exposes the home directory name; kept as decided (PIVOT §8 second decision).
- Fingerprint over normalised text misses attribute-only edits other than `data-tag` and `data-verdicts`; an agent changing `data-recommended` alone will not raise `.changed`.
- `Bash(kill:*)` in `allowed-tools` is broad; the skill scopes its use to the recorded server pid.
- Model-invocable skill may trigger on HTML pages outside the suite's purpose; the description names the five kinds to bound it.

## Unresolved questions

Owner review items. The body value stands and Stage 3 builds against it until the user overrules it here.

- Shell budget set at 36KB hard / 32KB target over AR-1's 14-18KB — stands as written; the original ceilings are kept for this run.
- `Bash(kill:*)` in the skill's allowed-tools, or the user starts and stops the verification server?
- Whether `tests/fixtures/` ship inside a released plugin payload is deferred with release packaging (PIVOT §1); the fixtures stay in the repository as the regression suite.
- Edit and Write are absent from the skill's allowed-tools; every page write goes through `assets/splice.py` so the agent never reads or retypes any part of the page and every write is checked and idempotent. A bounded Read with `offset`/`limit` would unlock Edit for the whole file, so this is a chosen discipline rather than a tool constraint — confirm this tool set (kickoff names none).
