# PIVOT — artifact suite implementation plan

Companion to `dev/workspace/plans/artifact-suite-implementation.md`, the Stage 2 tech plan for the kickoff at `dev/workspace/prompts/prompt-2026-08-23-2257.md`. This document records what was decided and discovered after that plan was written.

**Disposition.** Merge these changes into the plan, then delete this file. It is a work order against the plan, not a permanent overlay. Until the merge happens the two are read together and this document wins wherever they disagree.

**Authority over the Stage 1 decisions.** The plan's opening line declares the twenty decisions in `dev/workspace/context/stage-1-decisions.md` binding, and two of them are amended here by the repository owner, who took them in the first place:

- **D-19** ("ship as a skill, invocable, versioned, released with the plugins") — section 1 keeps the skill and withdraws the versioning and release clauses.
- **D-18** ("bare fragment") — section 3 reopens it; the first decision in section 8 settles it.

Amend both entries in `stage-1-decisions.md` to match whatever is settled, and amend their rows in the plan's `## Decisions applied` table.

**D-17** ("panel/modal is an optional block, not part of the shell") is **not** amended. Section 5 moves the panel's CSS and its open-and-close handler into the shell, which reads like a conflict and is not one — see the reconciliation in section 5.

No other Stage 1 decision changes. Where this document and a Stage 1 decision appear to conflict and the decision id is not named above, the Stage 1 decision stands and the conflict is a defect in this document.

**Markers.** Every section carries **Binding** or **Proposed**, on its heading or on each of its sub-headings where the two differ.

- **Binding** — settled. Apply it.
- **Proposed** — a worked-out suggestion. Adapt it or reject it, and record the reason in the plan section it touches.

Section 8 carries neither marker. It holds the decisions that are still open, each naming the work packages it blocks and the value to build against while it stands open, so work proceeds rather than stalling.

## 1. Release packaging is out of scope — Binding

The plan packages a release: a symlink into the `chat-tools` plugin, a version bump to 2.2.0, and WP-10 to cut it.

None of that was asked for. The kickoff lists its deliverables as Review, Implementation plan and Artifact, and its process ends at Commit Work and a GitHub PR. Releases are governed by the `versioning` skill and `.claude/rules/versioning.md`, which own that workflow entirely.

Delete: the `plugins/chat-tools/skills/artifact-suite` row from File layout; the `### Plugin placement and release` section; WP-10 from Stage 3 work packages; the sentence "Nothing is released before WP-9"; and the release clause closing the Summary. The build is finished when the acceptance test passes.

One sentence in the deleted section is an operating rule rather than a release step, and survives. Relocate it into the build procedure (retitled by section 6): **plugin assets run from the last installed release, so the skill is executed by hand from the working tree throughout Stage 3.** An agent that installs a plugin to test this skill will otherwise exercise stale assets.

## 2. Build a plain skill; convert to DraftHorse later — Binding

The plan specifies `harness-format: DraftHorse` and a body of ten DraftHorse steps. Building that way is driven by the `drafthorse` skill, which is more involved than the plan assumes.

Verified in `extensions/skills/drafthorse/SKILL.md`: the skill carries `disable-model-invocation: true`, walks gated phases (references, step map, invariants, draft), and holds the global invariant *"NEVER proceed past a gate without the user's approval of that phase's artifact."* Every gate halts until a human answers.

The kickoff sets the execution strategy as "Author a dynamic workflow for this task". A workflow runs unattended — it fans work out to subagents that cannot summon a human mid-run — so a procedure that halts at each gate for approval cannot execute inside one. That is the whole incompatibility.

**The route:** the workflow writes an ordinary `SKILL.md` carrying no DraftHorse structure. Converting it is a separate, later, interactive task — the `drafthorse` skill accepts a path to an existing document, drafts to a sibling `<destination>.draft.md`, and overwrites the original on acceptance. Nothing in this build depends on that conversion happening.

Amend `### SKILL.md shape` to drop `harness-format: DraftHorse` from the frontmatter and to describe an ordinary skill body. Amend the build procedure section, which section 6 also retitles, to drop the DraftHorse step vocabulary in its opening sentence: "each step is its own DraftHorse heading with its own start and finish conditions". The steps themselves stay; only the format they are written in changes.

## 3. What "the Artifact tool" is, and what depends on it — Binding

The plan's D-18 makes the shell a bare HTML fragment with no `<!doctype>`, `<html>`, `<head>` or `<body>`, so one file serves both a local browser and "the Artifact tool", which the plan glosses only as "the claude.ai publishing tool".

The Artifact tool is a publishing tool available to Claude Code sessions. It takes an HTML file, wraps it in its own `<!doctype html><head></head><body>` skeleton, and hosts it as a page on claude.ai reachable by a shareable link, served under a content-security policy that blocks external hosts. Google Fonts is the exception that policy allows, which is what keeps the shell's font `<link>` legal.

These properties were read from the tool's own interface documentation in the session that produced this document. The tool is external to this repository and may change, so re-verify before acting on the first decision in section 8. An agent holding the tool reads its current description directly; an agent without it asks the repository owner, and treats the dependency as undesirable until told otherwise, since a tool the executing agent cannot reach cannot be a build target.

Publishing to that tool is the only thing the bare-fragment rule buys. Every site below exists to serve it, and each must be resolved together:

- the bare-fragment rule itself (D-18), stated in `### Form`;
- **static check S1**'s first clause, asserting no `<!doctype`, `<html`, `<head` or `<body` tag appears in the file — under section 8's build-against default it fails on every page, so that clause inverts. S1's second clause, "line 1 carries the shell stamp", is the only static verification the stamp has and survives either answer, though its positional wording changes with the bullet below;
- quirks mode when a page is opened from disk, and the four avoidance rules written to survive it — lowercase selectors only, explicit font and line-height on `td`/`th`, no percentage heights, no image in a table;
- the CSS `content` escapes (`\2212`, `\00B7`), written because `<meta charset>` is inert under the wrapper;
- runtime check V6a, which serves every fixture twice and compares screenshots between the bare and wrapped forms;
- the `@doc-title` row in the `### Markers` table, whose note explains the real `<title>` tag by the Artifact tool scanning only the first 8KB;
- the `### Form` sentence pinning the version stamp to line 1 — a doctype takes line 1, so the stamp moves to line 2 and every check reads it by its text rather than by position;
- in `## Risks`, the quirks-mode bullet and the `:has()` bullet's closing clause "re-check if published through the Artifact tool". A third Risks bullet names the Artifact tool — the one on `provenance.root` exposing the home directory — but it is governed by the second open decision in section 8, not by this one;
- the plan's unresolved question on shipping a doctype and stripping it at publish.

Drop the dependency and every one is deleted or inverted: the shell becomes an ordinary HTML document with a doctype and renders in standards mode everywhere. The rule for finding any site this list misses: every plan site keyed to D-18, and every site that names the Artifact tool, quirks mode or `compatMode`. Whether to drop it is the first decision in section 8.

## 4. Edit does not require reading a whole file — Binding

The plan routes every write to a page through `assets/splice.py`, justified in `### Form`:

> Splices are made with `assets/splice.py` under Bash, never with Edit or Write: both tools refuse a path they have not Read in the same session, and reading the copy would re-read the whole shell.

The second half of that sentence is false. The Read tool accepts `offset` and `limit`; a partial read satisfies Edit's precondition, and the unlock is per file, not per region.

Reproduced against a 2405-line copy of `dev/workspace/reviews/artifact-suite-plan-review.html` with no prior read in the session:

1. Read lines 405-412 only, then Edit a string inside that window — succeeds.
2. Same 8-line read, then Edit a string at line 1169, in a region never read — also succeeds.

This matches the Edit tool's stated contract, which requires that the *file* have been read. (The `conversation-capture` skill reads the first 20 lines of a large transcript and then edits it, but it ships in the installed `dev-workspace` plugin rather than this repository, so treat the reproduction above as the evidence.)

Two conditions govern each Edit, and the shell's markers satisfy both: `old_string` must match byte for byte, and it must be unique in the file. Marker strings are fixed constants the skill states outright, so the agent never reads a marker to learn it.

Three amendments follow that no other section covers.

**Add `Edit` to `allowed-tools`** in `### SKILL.md shape`. Keep the `Bash(python3:*)` grant: it also runs `assets/verify.py` and the runtime tier's `python3 -m http.server`, both of which survive. No grant is removed by this change.

**Reword the global invariant** in the same section, from "never Read the shell or the page copy" to **never read the shell, and never read a page copy in full**. A bounded read is now the mechanism, so the unqualified prohibition would forbid the build.

**Reword the same sentence where it recurs in the build procedure's "Instantiate the Shell" step**, which closes "Never Read the shell or the copy" — amending only the invariant leaves that step forbidding what it must now do. The step also gains the unlocking read as an explicit action: immediately after the `cp`, read the page copy with `limit: 5`, which satisfies Edit's precondition for the whole file and confirms the shell stamp in the same call. Check for the stamp text rather than for a line number, since section 8's first decision governs whether line 1 holds the stamp or a doctype. Every later Edit in the build depends on that one read having happened.

## 5. The shell carries everything reusable — Binding

Every CSS class a page template uses pre-exists in the shell. All base JavaScript lives in the shell. Nothing is spliced, lifted or pasted between files **at build time** — that is, while a page is being made.

That rule governs page building only. Authoring the shell itself is unaffected: WP-1 and WP-2 still copy the theme blocks and buttons out of `prompt-builder.html`, the response surface out of `section-ledger.html`, and the SVG kit out of `corpus-sweep-design.html`, exactly as the plan specifies. Those are one-time transcriptions into a source file, not splices into a page.

**Reconciliation with D-17.** Shipping the panel's style and handler in the shell leaves D-17 satisfied. "Not part of the shell" means the panel is never furniture a page carries by default, and it still is not: a page renders no panel unless the agent writes `<dialog class="panel">` into `@content`. What ships in the shell is the panel's *implementation*, carried as bytes on every page; what stays optional is its *presence*. The Ceilings sub-section below accepts that byte cost. The same reading applies to the diff and figure blocks.

The sentence that would otherwise read as overturning D-17 is the opening of `### Block file: panel` — "Optional, never shell furniture (D-17)" — which is false once the style and handler ship in the shell. Rewrite it to say the panel is optional in presence and shell-resident in implementation, and check `### Block file: diff` and `### Block file: figure` for the same phrasing. No sweep string catches this site.

This holds more easily than the plan assumes, because there is no page-kind JavaScript to move. The engine already drives all five kinds generically through data attributes on the card: `data-answer="options"` binds an options card's radios, `data-answer="none"` marks an answered record or a withdrawn card, `data-verdicts` overrides the kind default, `data-report` collects a demo's state into the return prompt.

The plan's `@template-script` region therefore never held page-kind code. It held block scripts, which are fixed, small, and belong in the shell alongside everything else — a diff's copy-added-lines button is about eight lines, a panel's open and close about five, a figure needs none. Each keys off a selector that costs nothing when the page carries no such block.

Templates stop being files that get spliced into a page. They become markup exemplars: the agent reads one to learn which classes and attributes to write, then writes markup. Blocks likewise document markup shapes whose CSS and behaviour already ship.

Delete from the plan, by site:

- the `@template-style` and `@template-script` rows from the `### Markers` table, and their entries in `### Document order`;
- the three-tier table in `### CSS residency`, which becomes one tier, the shell;
- static check **S9**, which compared a spliced part against its source;
- the File layout paragraph defining the `/* @style */`, `<!-- @script -->` and `<!-- @markup -->` delimiters in template and block files — nothing lifts those parts any more, so nothing needs them marked;
- the "scoped style" and "copy-added-lines script" clauses from the template and block rows of the File layout table, since both now ship in the shell;
- **WP-5**'s done-check clause "each splices once", and **WP-4**'s "each splices into a fresh shell copy";
- in `### Script placement and dialect`, "blocks and demos put theirs in `@template-script`" — blocks no longer do, demos use `@demo-script`;
- in the diff block section, "The block's script, pasted into `@template-script`";
- in `### Blocks` closing prose, the instruction-comment clause "what to paste where, and that its style is safe to inline once";
- in `### Template: demo kit`, part 1's ownership of the demo scoped style (section 7 moves it to the shell) and part 3's integration points "demo CSS scoped under the demo's own id in `@template-style`; demo JS in `@template-script`", which become `@demo-style` and `@demo-script`;
- in `### Template: review`, "cards enter it later through `splice.py $P section findings`", and the two `@markup` clauses around it — "The skeleton is the whole `@markup` part" and "card exemplars sit outside the `@markup` delimiters". With the delimiters gone the file is a plain exemplar: it shows a section skeleton to imitate and card exemplars beside it, and nothing in it is delimited for machine extraction. The same `@markup` wording recurs in the File layout paragraph that defines the delimiters.

Three `### Token economy` rows name `splice.py`, and each becomes something different — take them by their left-hand cell:

- **"a template's scoped CSS, a block's CSS and its script"** — delete the row. Nothing is lifted, and none of it is authored per page any more.
- **"the shell's contents"** — its supplier reads "copied by `cp` and spliced by `splice.py`; never Read, never Edited". Rewrite to `cp`, then a bounded read and Edits; the "never Read, never Edited" clause is exactly what section 4 overturns.
- **"a whole file on update"** — keep the row; change "per-card splices" to per-card Edits.

**Sweep.** These lists name what was found, and are not a guarantee of completeness. After applying them, search the plan for `splice`, `@template-`, `@style`, `@script`, `@markup`, `paste`, `lift`, `36KB`, `ten steps` and `DraftHorse`, and resolve every remaining hit against the sections above. The three bare part names are listed separately because `@template-` does not match them.

### Ceilings

The plan carries three, and the roughly 4KB of CSS and 1KB of JavaScript moving into the shell breaches two of them. Under `cp` plus Edit the shell is never read into context, so its size costs disk alone.

- The 36KB hard / 32KB target file ceiling, stated in the File layout `shell.html` row — drop it.
- WP-1's done-check `CSS ≤ 16KB` — drop it.
- WP-2's done-check `engine ≤ 17KB` — drop it.

Two further sites cite the 36KB figure and follow it out: the three `tests/fixtures/` File layout rows sized "48-60KB (36KB shell + spliced parts + content)", which lose the arithmetic and the phrase "spliced parts"; and the `## Risks` shell-budget bullet, whose whole subject is the ceiling.

Replace all of it with a single recorded measurement in WP-2's done-check: report the shell's byte size, and report it again in the acceptance test.

## 6. Replacing splice.py — Binding

`splice.py` has seven forms. Section 4 replaces one of them. Each of the others has a replacement, and four surviving build-procedure steps — "Instantiate the Shell", "Write the Cards", "Revise a Published Page", and the error step — plus `### Update procedure` must be rewritten onto them. A fifth step, "Splice the Template", is deleted; see below. Steps are named rather than numbered here because this section renumbers them.

Delete or rewrite, by site:

- the `assets/splice.py` File layout row;
- **WP-1**'s `splice.py` work item, and the half of its done-check reading "`splice.py` fills each region kind, appends into a section, and refuses a duplicate part";
- the first half of the `### Form` sentence quoted in section 4 ("Splices are made with `assets/splice.py` under Bash, never with Edit or Write");
- in `### SKILL.md shape`, "no Edit or Write grant, since every write to a page goes through `splice.py`" — section 4 grants `Edit`, so this clause inverts;
- the error step's `splice.py` branch, "`splice.py` non-zero → report its message and stop", which has no referent once the script is gone. The failure it guarded becomes an Edit that finds no match or an ambiguous one, and the branch is rewritten to that.

The `### Markers` section survives, but its placeholder-versus-empty fill semantics are written in `splice.py` terms throughout and are restated against Edit: a **placeholder** region is filled by Editing the placeholder element itself into the content, and an **empty** region is filled by Editing its closing marker into content-plus-the-same-closing-marker.

| `splice.py` form | replacement |
|-------------------|-------------|
| fill a marker region from stdin | `Edit` against the marker string, which the skill states as a constant |
| lift a named `@style` / `@script` part from a template or block | gone — section 5 removes every lift |
| `card <cardId>` — replace one card | bound the card, `Read` that range, `Edit` it. Only the card being revised is read |
| `section <sectionId>` — append a card | `Edit` against that section's end marker (see below) |
| `layout rail\|board` | `Edit` `<div class="shell">` to `<div class="shell rail">`. The string is unique and the write is the one sanctioned change outside a marker, unchanged from the plan |
| `show page-meta` | bound the block, `Read` that range |
| `show cards` | `grep -n 'article class="card' <page>` — prints every card's id and line number without reading the file |

**Bounding a range.** `grep -n` returns a starting line and no end, so each read window is bounded explicitly rather than guessed. A card runs from its `grep -n 'id="<cardId>"'` hit to the line before the next `article class="card"` hit, and to the `</section>` or `<!-- @end-` hit that follows it when it is the last card in its section. The `#page-meta` block runs from its `grep -n 'id="page-meta"'` hit to the next `</script` hit. In both cases take the two line numbers from one `grep -n` invocation carrying both patterns, then `Read` with `offset` and `limit` set from them. Reading a few lines wider than the region is harmless; reading short truncates the text the Edit then has to match, so err wide.

**Section end markers.** Appending a card needs a unique anchor, and `</section>` is not unique. Each `<section>` the agent writes carries `<!-- @end-<sectionId> -->` immediately before its closing tag; a card is added by Editing that marker into card-plus-marker. Add this to the card-writing step and to the review and interview template exemplars.

**Guards.** `grep -c` asserts a marker appears exactly once before a write, which is what the plan's marker discipline already required. No duplicate-insert guard is carried over: it existed to stop the same lifted part entering a page twice, section 5 removes every lift, and Edit's own uniqueness precondition fails loudly on an ambiguous target in any case.

**Step 5 is deleted; the procedure becomes nine steps.** The plan's step 5, "Splice the Template", did two things. It lifted the template's `@style` and `@script` parts, which section 5 abolishes. And it spliced the template's `@markup` part — the page's section scaffolding — into `@content`. The reading that remains once the lifts are gone is already step 2's work: "Load the Page Kind" reads `references/page-kinds.md`, then the one page template the kind maps to, plus the demo kit when the page carries a demo. Keeping step 5 for that alone would order the same read twice, at positions 2 and 5, with provenance and the `cp` in between.

**The scaffolding needs a home, or the procedure has a hole.** Nothing else writes `@content`: step 4 fills only `@doc-title`, `@page-meta` and `@masthead`, and the card step writes cards *into* sections that must already exist. Widen the card step and retitle it **"Write the Content"**. It opens by writing the section skeletons — `<section id>`, `.sec-head`, `.sec-intro`, an optional `.verdict-strip`, and the `<!-- @end-<sectionId> -->` marker before each closing tag — as one Edit into `@content`, imitating the exemplar read at step 2. It then writes cards against those end markers as before.

The same step owns `@sidebar`, which no step owned before either. The demo kind is the only one the plan maps to `.shell.board`, and its board shape puts controls in `@content` and live rendering in `@sidebar`; a board page whose sidebar is never written reaches hand-over with an empty column. The step writes `@sidebar` after the cards on a board page, and skips it otherwise — every other layout hides that column outright, so writing into it would be invisible.

Its finish condition gains two clauses: every section carries an id and an end marker, and a page whose `.shell` class is `board` has a non-empty `@sidebar`. The second clause tests the layout class actually on the page, so it stays silent for the kinds that never take a sidebar.

Step 2 keeps sole ownership of reading templates, and changes in one clause. It closes "Read a template for its exemplars and instruction comment only; its `@style` and `@script` parts are never read into context" — section 5 abolishes those parts and deletes the paragraph defining their delimiters, so the clause describes something that will no longer exist. Cut it; what survives is that a template is read for its exemplars and its instruction comment. Steps 6 to 10 shift down by one and become 5 to 9, so the error step stands alone as step 9.

Three sites count the steps and must be updated, not two: the `### Build procedure (the ten steps)` heading, retitled to `(the nine steps)`; the `### SKILL.md shape` body description; and the File layout row for `SKILL.md`, whose purpose cell reads "ten steps, terms" and also still calls the file a "DraftHorse procedure", which section 2 amends only inside `### SKILL.md shape`.

One pointer breaks silently rather than dangling: `### Update procedure` opens "Revision rules are step 7", and after the shift step 7 is "Verify the Page". Retitle it to name the step — "Revision rules are the Revise a Published Page step" — in keeping with this document's own by-title convention, so a future renumber cannot break it again.

`assets/verify.py` is untouched by any of this. It is a lint script over a finished page and stands or falls on its own merits.

## 7. Demos are the one exception

A demo has no fixed shape and is composed by the building agent, so its behaviour cannot pre-exist in the shell. Split it in two; only one half is bespoke.

### Chrome, regions and markers — Binding

**Demo chrome belongs in the shell.** The demo class vocabulary — `.demo`, `.demo > .tag`, `.sub`, `.note`, `.readout`, `.readout .muted`, `.picks`, `.btnrow`, `.field`, `.help` — is as fixed and reusable as `.card`, and ships with everything else. Demo markup is written into `@content` beside the card it illustrates, needing no marker of its own.

**Demo behaviour is authored into `@demo-script`.** The agent writes it directly with Edit, which works natively because the agent authored the bytes and has no source file to lift them from. `@demo-style` accompanies it for a demo introducing a shape the vocabulary lacks; most demos will not use it.

The two new regions take the delimiter form and document position of the two they replace. The marker count stays at seven, so static check S2 ("all seven marker pairs present exactly once") stands verbatim. The renamed entries appear in the `### Markers` table and the `### Document order` listing, and `@template-style`/`@template-script` recur well beyond those two places — section 5's deletion list names the ones found, and its sweep for `@template-` catches the rest.

- `@demo-style` — CSS-comment delimited, `/* @demo-style */` … `/* @demo-style:end */`, inside the shell `<style>` as its last content. Replaces `@template-style`.
- `@demo-script` — HTML-comment delimited, `<!-- @demo-script -->` … `<!-- @demo-script:end -->`, in a trailing `<script>` after the engine. Replaces `@template-script`.

The marker set becomes `@doc-title`, `@page-meta`, `@masthead`, `@content`, `@sidebar`, `@demo-style`, `@demo-script`.

Three constraints govern the script region, and the first is easy to miss:

- A literal `</` inside a JavaScript string ends the script block. Write `<\/`, the rule the plan already states for `#page-meta`.
- A demo stores nothing in `localStorage`. The page holds one document under one key; demo state lives in memory or in `dataset`.
- A demo touches no reserved id, no shell class, and no token or theme attribute, exactly as the plan's demo rules already require.

### The demo helper — Proposed

To keep authored scripts short and scoped, the shell exposes a demo helper beside the existing `window.SUITE` surface. `SUITE.demo(id, fn)` finds the demo element and gives the callback its own function scope, so several demos on one page cannot collide. It hands the callback four operations:

- `d.out(text)` — write the demo's readout
- `d.note(text)` — write the demo's transient one-line status
- `d.report(state)` — set `dataset.state`, which the return prompt emits as `- <data-report>: <state>` under the card
- `d.on(event, selector, fn)` — delegate an event within this demo only

A demo written against these runs to roughly six to ten lines. Rejecting this helper costs nothing structural: demo scripts then wire their own listeners and set `dataset.state` directly, at three to four times the length. The regions and constraints above hold either way.

## 8. Open decisions

Neither is settled. Each names what it blocks and the value to build against while it stands open, so work proceeds rather than stalling. Both need the repository owner; record the answer in the plan section named.

**Whether to keep Artifact-tool compatibility.** Amends D-18. Blocks WP-1 (shell chrome — doctype or not, and the four quirks-avoidance rules) and WP-8 (`verify.py`, which writes the doctype-wrapped copy V6a compares). Section 3 has the full site list. Build against **drop the dependency**: ship an ordinary HTML document with a doctype. Both answers are mechanical to reach from the other, so the default costs nothing if overruled. Record the answer in `### Form` and in D-18.

**Whether `provenance.root` may carry the absolute checkout path.** Blocks WP-3 (provenance). It holds the absolute path because that is what makes the disk and editor chips resolve; a page published anywhere then carries the home directory name. Build against **keep it**, which is what D-11 already decided. The alternative is blanking `root` at publish time, which costs nothing on the web since origin gating hides the disk chips there anyway. Record the answer in `### link-to-site`.

### The plan's own unresolved questions — Binding

The plan closes with five, as an unnumbered list. Referred to here by subject, since the plan assigns them no numbers. Four are settled by the dispositions below and need no further decision; the fifth is re-decided as the first open decision above.

- **Shell budget** — superseded by section 5. Drop the ceilings rather than raise them.
- **`Bash(kill:*)` for the verification server** — stands unchanged.
- **Fixtures inside the released plugin payload** — deferred with section 1. With release packaging out of scope this belongs to whatever task later takes distribution up. The fixtures stay in the repository regardless, being the regression suite.
- **Bare fragment versus a stripped doctype** — superseded by section 3 and re-decided as the first open decision above. Its standing default of "keep the bare fragment" was accepted before section 3's content was known, so it carries no weight.
- **The skill's tool set** — stands, with its subject changed. With `splice.py` gone, the set to confirm is `Read` with `offset`/`limit` plus `Edit`, per section 4. The invariant it protects is unchanged in substance: the agent never reads the shell, and never reads a page copy in full.

## 9. Two defects found while exercising the design — Binding

Both surfaced while building `dev/workspace/reviews/artifact-suite-plan-review.html`, a page written to this plan's specification. Both are reproducible and both are real.

**Fingerprints are taken before the engine finishes generating.** The plan's `boot()` order runs `restoreCard`, which fingerprints a card, before `expandRef` and before any block or demo wiring has filled its containers. A card holding a reference or a demo hashes one way when an answer is recorded, after boot completes, and differently on the next load, before the reference is expanded. Every such card then shows the amber changed strip with nothing having changed. On the acceptance rebuild, where all 75 cards carry evidence, it fires on all of them — and check V12 catches it only after the shell is written.

Fix `fingerprintOf` to strip every engine-generated region from its clone: `.respond`, `.changed`, `.chip.earlier`, `.ref-links`, a reference's `summary`, and any `.demo`. The hash then covers authored prose alone and no longer depends on boot order. Reordering `boot()` to put `expandRef` and the block and demo wiring above `restoreCard` also works, and re-breaks the moment a future generator is added below restore.

**Origin gating leaves the editor chip visible on the web.** The plan's two gating rules hide `.ref-disk` when the origin is web, and hide both `.ref-disk` and `.ref-editor` on a `ref--nodisk` reference. A published page therefore still offers an `editor://` link built from the author's absolute checkout path, which resolves on one machine. Add `.ref-editor` to the web rule alongside `.ref-disk`.
