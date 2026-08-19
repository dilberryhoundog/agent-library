# Target: extensions/skills/git/agent-commit/SKILL.md

Executor sub-skill of git-robot. Work: preamble, 8 prose condition blocks to lists, 4 slots (one LOAD-BEARING), de-hold trims, functions, citations.

## De-hold judgment

- `+Read Procedure` start: "A COMMIT procedure from the Brief awaits processing" — per-item loop discriminator (class 2): KEEP; declare `**Looping step**`. "no earlier no-op or refusal has ended the run" — run-ended guard (class 3): KEEP.
- `+Commit New` start: "The current procedure is COMMIT(new)" keep; "and its commits have not been made" — pure de-hold of its own finish (class 1): DROP.
- `+Commit Amend` start: "The current procedure is COMMIT(amend)" keep; "and the amend has not been made" — DROP.

## Condition blocks → lists

All 8 blocks. `+Read Procedure` finished is the judgment-heavy one — the decided action (new / amend / no-op with its named causes) shapes into items or OR blocks per one look each; preserve the no-op cause catalogue exactly (clean tree; every changed file outside the directive's scope; an amend that follows a new, or a second amend, in the same brief). "Never invent or force an empty commit" is an instruction, not a state — move it to the step's invariants or engagement, and record the move.

## Slots

- `+Read Procedure`, `+Commit New`, `+Commit Amend` slots — HINT once `+Result`'s start claims ended runs (it already does: "a no-op or refusal has ended the run") and re-holding covers the next procedure. Delete all three.
- `+Result` slot ("The skill is over, hand control back to git-robot") — LOAD-BEARING Gap 1. Repair: finished conditions become `- the result lines are emitted as the final message text` / `- the skill is complete`.

## Functions

- `+Read Procedure` — `**Looping step** — Re-runnable, taking a different branch each pass.`
- `+Commit New` — ordinary (its multi-commit loop lives in the engagement, not step re-entry; the step re-enters only via `+Read Procedure`'s next procedure). Declare nothing.
- `+Commit Amend` — ordinary.
- `+Result` — folded error step per the executor exception (adapted tail; start claims the ended run alongside the completed one).

## Vocabulary and citations

- Preamble swap; "error drain" clears with it — verify zero after.
- References-heading citations become links: `Current Git State` → `[Current Git State](#current-git-state)`, `Emoji map` → `[Emoji Map](#emoji-map)`, `Commit message format` → `[Commit Message Format](#commit-message-format)`, `Splitting heuristics` → `[Splitting Heuristics](#splitting-heuristics)`, `Breaking changes` (H4 inside a reference) → `[Breaking Changes](#breaking-changes)`. `Expanded Diffs` is an engagement sub-heading of `+Read Procedure` — a step-internal pointer; another step's invariant citing it (`+Read Procedure`'s own invariant does) is in-step and fine; leave `Brief`/`Result` (Terms-style, no glossary here) as code-spans and flag that the Terms section reads "None at this time" while the document leans on `Brief`, `Result`, `Directive` vocabulary git-robot defines — cold-readability flag, no edit.

## Exemplar

None required.
