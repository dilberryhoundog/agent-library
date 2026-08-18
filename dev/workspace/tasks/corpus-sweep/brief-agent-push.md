# Target: extensions/skills/git/agent-push/SKILL.md

Executor sub-skill of git-robot. Work: preamble, 6 prose condition blocks to lists, 3 slots (one LOAD-BEARING), one de-hold trim, functions, citations.

## De-hold judgment

- `+Read Procedure` start: "A PUSH procedure from the Brief awaits processing" — item-awaits shape, and PUSH runs once per procedure: keep as the sole start item; no Looping declaration needed unless a brief can carry several PUSH procedures — it can (procedures repeat), so declare `**Looping step**` only if you judge re-entry realistic; otherwise leave ordinary and record the judgment.
- `+Push` start: "and no push has been attempted" — pure de-hold (class 1): DROP. Keep "the push shape is decided and there are unpushed commits the remote can fast-forward (or the branch has no upstream yet)" as split items.

## Condition blocks → lists

All 6 blocks. `+Read Procedure` finished carries the three decided shapes (pushable / up-to-date no-op / rejection) — shape as items or OR blocks per one look; preserve the parenthetical diagnostics.

## Slots

- `+Read Procedure` slot — HINT once `+Result`'s start claims the non-push resolutions (it already does: "the procedure resolved without pushing (up to date, rejection, or error)"). Delete. Note the slot's "do not push a rejected branch" tail: that instruction is already carried by `+Push`'s start (only the fast-forwardable shape admits) and the force-flag invariant — record the judgment.
- `+Push` slot — HINT. Delete.
- `+Result` slot — LOAD-BEARING Gap 1. Repair: finished conditions become `- the result line is emitted as the final message text` / `- the skill is complete`.

## Functions

- `+Result` — folded error step per the executor exception (adapted tail; start claims the resolved-without-pushing run alongside the pushed one).
- `+Push` — ordinary. `+Read Procedure` — per your judgment above.

## Vocabulary and citations

- Preamble swap; "error drain" clears with it — verify zero after.
- References-heading citations become links: `Current Git State` → `[Current Git State](#current-git-state)`, `Branch + tracking`/`Unpushed commits` are mini-headings (`===` labels) — stay code-spans, `Push outcomes` → `[Push Outcomes](#push-outcomes)` where cited. Flag (no edit) the empty Terms section leaning on git-robot's `Brief`/`Result` vocabulary.

## Exemplar

None required.
