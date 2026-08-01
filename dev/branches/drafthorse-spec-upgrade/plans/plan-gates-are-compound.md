# Plan: Gates are Compound

Status: Ready. Sources: TODO 3. Decision in [todos-discussion.md](todos-discussion.md) §3.

## Decision

Single sharp statement, no test pattern: "**Gates are compound** — a gate's finished conditions state the artifact's own completion criteria alongside the user's approval." The step-return / post-approval-edit behaviour lives in steps.md's User gates section only (SSoT: convention names the rule, steps.md carries the behaviour).

## Work

- `docs/drafthorse/framework/conventions.md` — replace the commented-out bullet + `<!-- TODO -->` at line 24 with the decided statement (uncomment, rewrite).
- `docs/drafthorse/framework/steps.md` — User gates section: keep the revocation/un-approval behaviour prose; align its compound statement to point at (not restate) the convention.

## Dependencies

- Contends on conventions.md and steps.md — framework-docs session grouping in the index.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (existing "compound if a gate" check re-worded to the decided statement).
