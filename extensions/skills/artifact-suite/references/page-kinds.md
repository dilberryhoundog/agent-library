# Page kinds

Six kickoff kinds land on one shell and three template files. The shell is the substrate every page is copied from; the other five are values of `#page-meta.kind`.

| kickoff kind    | `kind`      | file                                | layout class                                        | default verdicts        |
|-----------------|-------------|-------------------------------------|-----------------------------------------------------|-------------------------|
| page shell      | —           | `assets/shell.html`                 | —                                                   | —                       |
| review page     | `review`    | `assets/templates/review.html`      | `.shell.rail`                                       | `Agree\|Revise\|Reject` |
| options page    | `options`   | `assets/templates/review.html`      | `.shell` to eight cards, `.shell.rail` from nine    | none                    |
| issue breakdown | `issue`     | `assets/templates/review.html`      | `.shell.rail`                                       | `Accept\|Amend\|Defer`  |
| interview page  | `interview` | `assets/templates/interview.html`   | `.shell`                                            | none                    |
| demo page       | `demo`      | `assets/templates/demo-kit.html`    | `.shell.board` for a board, `.shell` for inline strips | none                  |

What each layout class shows: `.shell` — the sticky section pill row only, no card table of contents at any width; `.shell.rail` — the column table of contents with one entry per card above 1040px, the pill row below it; `.shell.board` — the pill row plus the sticky `.sidebar` above 1060px.

One page reads one page template. `demo-kit.html` is a kit rather than a page template: a page of any kind carrying a `.demo` reads it in addition to its page template, and a demo-kind page reads it alone, taking its `#page-meta` exemplar and page scaffold from the kit's part 6.

The layout class is the one attribute a page writes outside the markers, through `python3 $S/splice.py $P layout rail|board`. A page on the bare `.shell` needs no call. `.shell.board` is the only layout that shows `.sidebar`.

Review, options and issue share one card anatomy. What differs between them is the verdict vocabulary carried as data, the chips, and which optional blocks appear. A kind whose default set is empty gives each answering card its own `data-verdicts`, or `data-answer="options"` where the options are the page's content.

The eyebrow prints the kind as `Review`, `Options`, `Issue breakdown`, `Interview` or `Demo`.

## Section skeletons

A template's `@markup` part carries section skeletons only — `<section id>`, `.sec-head`, `.sec-intro`, an optional `.verdict-strip` — and no cards. Cards enter a section afterwards with `python3 $S/splice.py $P section <sectionId> < card.html`. The card exemplars that follow `@markup:end` in each template file are for reading.

| template       | sections it ships                                                                 |
|----------------|-------------------------------------------------------------------------------------|
| `review.html`  | `#findings` with a `.verdict-strip` — the review and issue kinds                    |
| `interview.html` | `#answered` above `#open`                                                         |
| `demo-kit.html`  | `#demonstration`                                                                  |

An issue-breakdown page adds `<section id="additional-comments" data-loose="Additional comments">` so the reader can answer past the cards. Any other section name is written into `@content` from stdin in the same shape.

An options page does not splice `review.html`'s `markup` part — `#findings` is a review word. It writes its own section from stdin, then splices its cards into it:

```bash
python3 $S/splice.py $P content <<'HTML'
<section id="options">
	<div class="sec-head"><h2>Options</h2><span class="count">4</span></div>
	<p class="sec-intro">One or two lines on what is being decided.</p>
</section>
HTML
```

A section's `id` is a lowercase slug of its `.sec-head h2`. It anchors the ToC group, receives the `:target` ring and keys that section's comment in the stored document, so it is permanent once published, exactly as a card id is.

## Blocks

Every block file opens with an instruction comment naming what it is, which parts to splice and where its markup goes. A part is spliced once per page; a second splice of the same part is refused with `already present: <file>#<part>`.

| block  | file                     | parts                     | the agent writes                                                    | what comes with it                                              |
|--------|--------------------------|---------------------------|---------------------------------------------------------------------|-----------------------------------------------------------------|
| reference | `assets/blocks/reference.html` | `style`, `script`, `markup` | an empty `details.ref` carrying `data-path` or `data-url` and the optional `data-lines`, `data-loc`, `data-branch`, `data-commit`; several in a `.refs`; an empty inline `a.ref-link` with `data-label` | the summary, the Disk, Editor and GitHub chips, Copy path, every href, the origin gating and the mirror badge, all from `#page-meta.provenance`. Required on every page carrying a reference; a diff is always preceded by one |
| diff   | `assets/blocks/diff.html`   | `style`, `script`, `markup` | `.diff` container and one `.diff-row` per line, classed `ctx`, `del`, `add` or `gap`, each holding a `.tx` span; `numbered` plus `data-ln` for line numbers; `data-copy="adds"` to ask for the copy button | the `+` and `−` glyphs from the CSS gutter, so no marker is typed into a line; the block script appends a `Copy added lines` button routed through `SUITE.copyText` |
| panel  | `assets/blocks/panel.html`  | `style`, `script`, `markup` | an opener `button[data-panel="<dialogId>"]` in the prose and a `dialog.panel` with that id as a sibling of the section | the block script's delegated open, close-button and backdrop-click handling |
| figure | `assets/blocks/figure.html` | `style`, `markup`           | `figure.fig` holding an inline SVG drawn with the class kit, `figcaption.cap`, and an optional `details.more` for evidence that would crowd it | both themes, from the kit classes alone; there is no script |

The figure kit is `.lanebg`, `.lanelbl`, `.box` with `.a`, `.b` or `.c` for actor colour, `.t`, `.ts`, `.arw`, `.track` and `.dot`. A `style` attribute on an SVG element is a build error. `details.more` and `details.ref` never share a class.

A diff is always preceded by a `details.ref` naming its file. Nothing inside a `dialog.panel` reaches the return prompt.

## CSS residency

Three tiers. Nothing is retyped: the template and block tiers are lifted by `splice.py` into `@template-style`.

| tier                      | holds                                                                                                                                                                                                                                                                                                                                     | pasted by                                             |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|
| shell                     | tokens, base rules, the three layouts, `.masthead` and `.eyebrow`, `.toc`, `.filters`, `.chip*`, `.card*`, `.changed`, `.respond` / `.verdicts` / `textarea` / `.clear`, `.loose` and `.lab`, `blockquote` / `cite` / `.q`, `details`, `.path--unlinked`, the `.pv-*` eyebrow cells, buttons, `.themeset`, `.floater`, `#outwrap`, `#foot`, `.masthead-meta`, `.sec-head`, `.sec-intro`, `.gloss` | nobody — it ships in `shell.html`                     |
| template scoped `<style>` | review: `.verdict-strip`, `.stats` and `.stat`, `.src`, `.delta` with `.now` and `.next`, `.options` / `.option` / `.option .rec`. interview: `.card.answered`, `.q.rec`. demo kit: `.demo`, `.demo > .tag`, `.demo .sub`, `.demo .note`, `.readout` and `.readout .muted`, `.picks`, `.btnrow`, `.field`, `.help`                          | `splice.py`, once per page                            |
| block scoped `<style>`    | reference: `details.ref` and every `.ref*`, `.refs`, the origin-gating rules. diff: `.diff`, `.diff-row` and its four states. panel: `dialog.panel` and its interior. figure: `figure.fig`, `figcaption.cap`, the SVG kit, `details.more`                                                                                                   | `splice.py`, the first time the block appears on a page |

No template or block declares a font family or a token, and none restates a shell selector. The one raw colour in the set is `panel.html`'s `dialog.panel::backdrop`, where custom properties do not reliably inherit. Radius is a constant, not a token: 2px on controls, 3px on cards.

## Reserved names

A demo or block takes none of the shell's ids — `#page-meta`, `#eyebrow`, `#toc-column`, `#toc-pills`, `#filters`, `#status`, `#accept-all`, `#view-prompt`, `#copy-prompt`, `#outwrap`, `#out`, `#foot`, `#held-note`, `#storage-note` — and none of its class names, `.status`, `.card`, `.chip`, `.respond`, `.toc`, `.filters` and `.floater` included, even where the shell's rule is scoped elsewhere. The demo kit's part 4 carries the full list.

`.rail` alone is never a shell selector: every rail rule is written `.shell.rail`, leaving the bare name free for the folder-picker row pattern it already names elsewhere. A block needing an element class called `rail` scopes it; the figure kit calls its timeline `.track` for the same reason.

`layout`, `card`, `section` and `show` are `splice.py` keywords and are never marker names.
