# Plan: Retire Suggested Next Actions

Status: DECIDED — removal confirmed safe, load-bearing sites inventoried. Source: issue #38, `filebox/steps-preamble-changes.md`.

## Decision

Remove the `#### Suggested next actions:` machinery heading from the step anatomy. Second routing mechanism beside the real one — conditions carry the routing, the pointer restates it, drifts from it, hands a reading agent two places to look.

Four sanctioned uses. Each needs a home before the slot goes, or real instruction goes with it:

- **Loop instruction** — carried by the **looping** function declaration plus a start condition that holds again ([plan-step-functions.md](plan-step-functions.md)).
- **Exit of a finishing step** — carried by the success exit's own finished condition. Run ends when an exit step completes.
- **Bail off unmeetable conditions** — already covered by the error step claiming the remainder. The bail line compensated for a weak finished condition; sharpen the condition instead.
- **Handover control return** — stated by the handover-variant preamble, reinforced by the **handover** function declaration.

## Audit result

Audit run and closed. True counts correct the estimate: 21 live files, 63 occurrences, of which **48 are real step slots** and 15 are spec prose naming the slot. A further 12 lowercase prose mentions sit in the authoring guides. Planning documents under `dev/` hold 33 more, excluded.

Of the 48 slots: **34 HINT, 13 LOAD-BEARING, 1 AMBIGUOUS**. Removal is safe at 34 sites with no replacement written.

Amended after `assets/SKILL-template.draft.md` was deleted in wave 2, taking 3 slots with it: **45 slots — 33 HINT, 11 LOAD-BEARING, 1 AMBIGUOUS**.

The 13 load-bearing sites collapse into three gaps:

**Gap 1 — termination stated in the slot, not in an exit step's finished conditions.** Nine sites. `git-box:233` (no success exit at all on the commonest path), `drafthorse/SKILL.md:214`, the three git verb skills' `+Result` steps (`agent-commit:240`, `agent-push:116`, `agent-switch:170`, all carrying the same handback line), and both templates in both revisions (`SKILL-template.md:114`, `.draft.md:121`, `SKILL-template.md:137`, `.draft.md:143`). Fix: `- the skill is complete` written into the exit step's finished conditions. The two shipped template lines seeded this into versioning, classroom and drafthorse — fix the template first and the derivatives become mechanical.

**Gap 2 — versioning's serialisation discipline.** One site, `versioning/SKILL.md:167` (`+Range`): *"Release the chosen units one at a time, in the order chosen."* `+Breaking Changes` starts on a condition simultaneously true for every chosen unit, and the preamble sanctions multiple steps in play. Nothing else stops interleaved releases or fixes the order. Fits none of the four sanctioned uses and has no planned replacement. Fix: a step invariant on `+Range`, since the ordering fact is not condition-shaped.

**Gap 3 — the error step as an abandoned run's only exit.** Two sites, `versioning:383` and `drafthorse/SKILL.md:234`. Both read "Resume the step the user chose, or end the skill"; the resume half is covered by re-holding start conditions, the end half by nothing. `classroom:396` carries the identical sentence and is a HINT — its `+Conclude` claims the user-ended run where versioning's `+Finish` does not. Fix: an alternative start block on the success exit claiming the abandoned run. `drafthorse:234` also carries a second orphan fact — the un-approval cascade, which every gate-shaped start condition in that document silently depends on and which appears nowhere else in the skill. Belongs in a global agent invariant.

Two items needing a call before the sweep:

- **`agent-switch:102` (`+Stash`) is a behaviour question, not a rewrite.** The slot's no-op clause is the only thing stopping a clean-tree stash no-op from continuing into an unstashed switch. `+Result` starts on refusal, failure or conflict — a no-op is none of the three. Either `+Result` claims the no-op, or the no-op should not end the run at all. Decide the behaviour, then write it.
- **`git-robot:190` (`+Report`) is the one AMBIGUOUS site.** *"Finish your turn."* The finished condition implies the stop without stating it. `doc-reviewer:185` closes the same doubt with "as the final message text". Worth adopting that phrasing whichever way the slot decision lands.

Salvage: `condition-writing.md:44`'s second bullet — a happy-path-only pointer overriding a destination's own refusal — is the only statement of that failure mode in the authoring guides. Rehome it before deleting the section.

## Work

- `docs/drafthorse/framework/steps.md` — delete the `## Suggested next actions` section; strip the slot from the anatomy; correct line 5 ("a step knows nothing about any other step, except where its *Suggested next actions* guidance subtly points"), the `## Conditions` prose naming the slot as a routing home, and the usage-patterns prose assigning it the loop instruction.
- `docs/drafthorse/framework/notation.md` — drop the heading from the machinery list. Four remain.
- `docs/drafthorse/framework/conventions.md` — one site.
- `assets/SKILL-template.md` — remove the slot block and the `:49` comment teaching it ("a step names another step only in its `Suggested next actions:` slot").
- `assets/HANDOVER-template.md` — remove the `Suggested next actions:` block on the final child step. Variant preamble owns that content.
- `extensions/skills/drafthorse/references/condition-writing.md` — delete the `## Suggested next actions` section; check what the two condition sections then owe.
- `extensions/skills/drafthorse/SKILL.md` — instructions teaching the pointer.
- Corpus sweep — 8 skills, 5 agent documents.
- `docs/drafthorse/drafthorse-spec-check.md` and the saddler — slot checks removed. Regenerated last.

## Dependencies

- Paired with [plan-step-functions.md](plan-step-functions.md). One pass per step does both.
- Removal kills the only sanctioned cross-step reference. "A step names no other step" becomes absolute; `steps.md` line 5 must say so plainly.
