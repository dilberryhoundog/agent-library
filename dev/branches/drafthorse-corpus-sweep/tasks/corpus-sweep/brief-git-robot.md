# Target: extensions/agents/git-robot.md

Agent document (kindred format — frontmatter differs from a skill; scaffold and steps take the full migration). Work: preamble, 6 prose condition blocks to lists, 3 slots, the ambiguous `+Report` phrasing (settled below), functions, vocabulary.

## De-hold judgment

- `+Dispatch` start: "an uncompleted procedure remains" — per-item loop discriminator (class 2): KEEP; declare `**Looping step**`. "no blocking failure has stopped the run" — run-ended guard (class 3): KEEP.
- `+Execute` start: "the procedure's actions are not yet completed" — per-procedure discriminator on a re-entrant step (class 2): KEEP; declare `**Looping step**`.

## Condition blocks → lists

All 6 blocks, one look per item.

## Slots

All three HINT — routing already condition-carried (`+Report` starts on every-procedure-completed-or-attempted OR blocking-failure/unprocessable-brief). Delete all three.

## +Report — the ambiguous termination (SETTLED)

Adopt doc-reviewer's phrasing: finished conditions become `- the report covers every completed and attempted procedure` / `- the report is presented to the invoking agent as the final message text`. That closes the "Finish your turn" doubt without behaviour change.

## Functions

- `+Dispatch`, `+Execute` — `**Looping step** — Re-runnable, taking a different branch each pass.`
- `+Report` — folded error step per the executor exception (adapted tail; its start condition claims the blocked or unprocessable run alongside the completed one). Its directive already says "the exit for successes, failures, and difficulties alike" — keep.

## Vocabulary and citations

- Preamble swap; "error drain" clears with it — verify zero after (the file greps for "error drain" only in the preamble).
- References-heading citations become links where a step cites them: `Procedure Translations` → `[Procedure Translations](#procedure-translations)` (H4 inside References — link to it), `Output Directive` mentions are the Term, not the `## Output Directives` heading — leave the Term mentions; link only a citation that plainly points the agent at the reference section.

## Exemplar

Nominate: **Looping step** (`+Dispatch`, migrated) — this is the sweep's looping exemplar candidate alongside versioning's.
