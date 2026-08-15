# Plan: Retire Suggested Next Actions

Status: OPEN — rehoming proposed, not settled. Source: issue #38, `filebox/steps-preamble-changes.md`.

## Decision

Remove the `#### Suggested next actions:` machinery heading from the step anatomy. Second routing mechanism beside the real one — conditions carry the routing, the pointer restates it, drifts from it, hands a reading agent two places to look.

Four sanctioned uses. Each needs a home before the slot goes, or real instruction goes with it:

- **Loop instruction** — carried by the **looping** function declaration plus a start condition that holds again ([plan-step-functions.md](plan-step-functions.md)).
- **Exit of a finishing step** — carried by the success exit's own finished condition. Run ends when an exit step completes.
- **Bail off unmeetable conditions** — already covered by the error step claiming the remainder. The bail line compensated for a weak finished condition; sharpen the condition instead.
- **Handover control return** — stated by the handover-variant preamble, reinforced by the **handover** function declaration.

## Open question

Does any live document lean on the slot for real routing rather than a hint? Rebuild every such site as conditions BEFORE removal, or routing vanishes silently. Audit the 27 live files carrying the string, step by step, before editing any.

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
