# Plan: Steps are Universal

Status: Ready. Sources: concept 1, TODO 2. Decisions in [new-concepts-discussion.md](new-concepts-discussion.md) §1, [todos-discussion.md](todos-discussion.md) §2.

## Decision

Adopt as the FIRST steps convention. Universal = every step is always watching its start condition; steps need not chain. Standalone/atomic and universal are the two direct idioms of the entry/exit dynamic (the sibling idiom is in [plan-conditions-carry-routing.md](plan-conditions-carry-routing.md)). Affordances (loopbacks, error catching before the producer finishes, inert steps) written as consequences, not features. Rewrite freely for sharpness.

## Work

- `docs/drafthorse/framework/conventions.md` — replace the `<!-- TODO: New convention -->` block (line 15) with the finished bullet, positioned first among the steps conventions.
- `docs/drafthorse/framework/steps.md` — align the "In play" section prose with the named convention; fix the grammar defect at line 14 ("Also Multiple steps…" → "Multiple steps can also be in play at once").
- Do not touch the preamble here — the preamble carries this concept but is owned by [plan-preamble-rewrite.md](plan-preamble-rewrite.md).

## Dependencies

- Pairs with [plan-conditions-carry-routing.md](plan-conditions-carry-routing.md) — write both bullets in the same session (adjacent bullets, one file).
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (new check: multi-in-play legal, chains not required).
- Contends on conventions.md and steps.md — see the index for the framework-docs session grouping.
