# Target: extensions/skills/git/agent-switch/SKILL.md

Executor sub-skill of git-robot. Work: preamble, 10 prose condition blocks to lists, 5 slots, the `+Stash` no-op behaviour decision (settled below), functions, citations.

## The +Stash no-op decision — SETTLED: the no-op ends the run (Option A)

Today only `+Stash`'s slot stops a clean-tree stash no-op from continuing into an unstashed switch — and continuing would also arm a later `pop` to restore some unrelated pre-existing stash entry. The run therefore ends on a recorded no-op, reported. Encode it in conditions:

- `+Read Procedure` start guard becomes `- no refusal, failure, or no-op has ended the run` (run-ended guard — keep, extended).
- `+Result` start claims it: every action run, OR `- a refusal, failure, conflict, or no-op has ended the run early` (shape the OR blocks per one-look-per-item).
- `+Stash`'s finished condition already records the no-op — keep.

(Option B — a no-op continues into the switch — was considered and rejected: it silently changes shipped behaviour and makes a chained `pop` dangerous. Record this in your notes; the reviewer sees both options.)

## Condition blocks → lists

All 10 blocks. Splits: e.g. `+Read Procedure` start = two items (an action awaits; no refusal/failure/no-op has ended the run); finished = judged-safe / refusal-recorded / no-actions-remain as OR blocks or items per your one-look judgment. Preserve meaning exactly.

## De-hold judgment

- `+Read Procedure` start "an action not yet run" — per-item loop discriminator (class 2): KEEP; declare `**Looping step**` on `+Read Procedure`.
- "no refusal or failure has ended the run" — run-ended guard (class 3): keep, extend with no-op per the decision above.
- `+Stash`/`+Switch`/`+Pop` start ("The next safe action is X") — no de-hold present; leave.

## Slots

All five deleted. `+Read Procedure`, `+Stash`, `+Switch`, `+Pop` slots are HINT once the `+Result` start claims ended runs and re-holding covers return-to-judging. `+Result`'s slot ("The skill is over, hand control back to git-robot") is LOAD-BEARING Gap 1 — repair: finished conditions become `- the result lines are emitted as the final message text` / `- the skill is complete`.

## Functions

- `+Read Procedure` — `**Looping step** — Re-runnable, taking a different branch each pass.`
- `+Result` — folded error step per the executor exception (adapted tail per the common brief; its start condition claims the ended run alongside the completed one).
- `+Stash`, `+Switch`, `+Pop` — ordinary; declare nothing.

## Vocabulary and citations

- Preamble swap; "error drain" clears with it — verify zero after.
- Citations to References headings become links: `Current Git State` → `[Current Git State](#current-git-state)` (in `+Read Procedure`'s engagement; note the engagement writes it as `Current Git State` — link to the actual heading `## Current Git state`, anchor `#current-git-state`), `Brief`… is not a heading here — leave. `Switch outcomes`/`Actions` mentions: link where they cite the References headings.

## Exemplar

None required (git-robot's brief nominates the looping shape from a richer site); still return one if a block reads as a particularly clean specimen.
