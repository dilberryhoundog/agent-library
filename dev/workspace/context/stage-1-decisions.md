# Artifact Suite — Stage 1 Decisions

Recorded 2026-08-24 from the user's responses to `dev/workspace/reviews/artifact-suite-investigation.html` (Stage 1 of 6, Investigate). Kickoff: `dev/workspace/prompts/prompt-2026-08-23-2257.md`. Finding ids (DS-, CO-, ST-, AR-, PR-) refer to cards in that review. Every finding tagged `integrate` and not contradicted below is accepted as written.

## Layout & theme

- D-1 Shell layouts: three named layouts — `.shell` (940px reading), `.shell.rail` (1180px grid, 232px left ToC rail, breakpoint 1040px), `.shell.board` (1340px, main + sticky right rail, breakpoint 1060px). A page picks by class.
- D-2 ToC below 1040px: sticky pill row rendered from the same generated list.
- D-3 Chip vocabulary: `integrate` / `yourcall` / `defer` across markup, chips, card edge and filter buttons. Filter bar is a shell feature.
- D-4 Theme control: three-way System / Light / Dark. System removes the attribute and the stored key.
- D-5 Naming: the table of contents is `.toc`; `.rail` stays reserved for existing folder-picker rows.

## Storage & return prompt

- D-6 Storage: one localStorage JSON document per page, keyed by a page id the agent writes in the page meta block. Theme is one shared key across artifacts.
- D-7 Republish: keep every answer; a changed card shows an amber "changed since you answered" strip; a removed card's answer is held for its return; every regeneration bumps `rev`.
- D-8 Defaults: the recommended option is pre-checked; only touched cards enter the return prompt; an explicit "Accept all" button records the pre-checked defaults as agreement.
- D-9 Page data: one `#page-meta` JSON block holds provenance, page id, rev, prompt heading and next-step guidance.
- D-10 Copy controls: floating pair (Copy prompt, View prompt), bottom right.

## Links & provenance

- D-11 File reference block emits three links — disk (`file://`), editor (`vscode://file/<abs>:<line>`), GitHub blob — plus a copy-path control. The absolute checkout path is acceptable in the page.
- D-12 GitHub links pin to the commit the agent read. Files on other branches open from disk via the `dev/branches/` archive mirror, marked "archived copy".
- D-13 Every outbound link opens in a new tab (`target="_blank" rel="noopener"`).

## Page kinds

- D-14 Three templates. Review, options and issue-breakdown share one card anatomy differing by verdict vocabulary (data). The six kickoff kinds map onto the three in the skill's documentation.
- D-15 Interview page on republish: answered questions are rewritten by the agent as `.answered` record cards.
- D-16 Demo page: no fixed shape. Demos are fully customisable by the building agent; the suite must document the available structure, classes and integration points so the agent composes a demo from known parts. (User's own words: "I wanted demos to be fully customisable by the building agent. but also the agent should know the available structure, classes and integration points.")
- D-17 Panel/modal: shipped as an optional block, not part of the shell.

## Packaging & build

- D-18 File form: bare fragment (no doctype/html/head/body), disk-primary links; publishing via the Artifact tool stays open.
- D-19 Packaging: ship as a skill (invocable, versioned, released with the plugins). Deviates from the review's recommendation (bare assets); accepted as the user's call. Where built pages land is settled in the Tech Plan.
- D-20 Corpus: eight reference files. `dev/workspace/filebox/review.html` is not part of it.
