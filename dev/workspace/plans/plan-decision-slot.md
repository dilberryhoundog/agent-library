# Plan: Decision Slot Reframe

Status: Ready. Sources: concept 15, TODO 8. Decisions in [new-concepts-discussion.md](new-concepts-discussion.md) §15, [todos-discussion.md](todos-discussion.md) §8.

## Decision

Keep the discipline, adopt the framing. The three limits stay verbatim (no work; no routing; must resolve to a fact the finished condition depends on). Definition widens to the intent level: "run state the document could not decide in advance, resolved by the agent's judgment while the step is in play" — with scope/shape and reference flip/flop shown as instances (choosing which reference to load IS a shape decision). Banned degenerate condition: a Decision must resolve to a named fact; "a decision was made" never satisfies a finished condition.

## Work

- `docs/drafthorse/framework/steps.md` — rewrite the Decision section (line ~85): delete the TODO block, widen the definition per above, keep the three limits, add the named-fact ban, keep the bounded-fork paragraph.
- Heading rename `#### Decision:` → `#### Agent decision:` is owned by [plan-machinery-headings.md](plan-machinery-headings.md) — write this section's prose using the new name.
- Note for reviewers: `#### Decision:` headings appearing ABOVE an H3 engagement are deliberate step-scope machinery, not a defect (established saddler false-positive).

## Dependencies

- Sequenced with [plan-machinery-headings.md](plan-machinery-headings.md) (name agreement).
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (Decision checks: three limits + named-fact ban).
