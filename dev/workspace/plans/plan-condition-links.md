# Plan: Condition Links (implicit AND, OR separator)

Status: Ready. Sources: concept 2. Decision in [new-concepts-discussion.md](new-concepts-discussion.md) §2 (amended).

## Decision

Ban `**AND**`. A plain `- <condition>` list is implicitly conjunctive. `**OR these are true:**` is the canonical separator between list groups (groups of ANDed conditions, ORed together — no precedence rules). The separator wording deliberately echoes the machinery headings `…when these are true:` so heading and list state the same semantics. Demonstrated at SKILL-template.md:76.

## Work

- `docs/drafthorse/framework/notation.md` — rewrite the "Condition links" entry (line 11–13): remove `**AND**`, state implicit-AND semantics, give the canonical `**OR these are true:**` form with one example; fixes the comma-splice defect at line 13 in passing.
- `extensions/skills/drafthorse/assets/SKILL-template.md` — already demonstrates the form (lines 74–88); verify both condition blocks conform, no other change.
- `extensions/skills/drafthorse/references/condition-writing.md` — the conditions authoring guide never mentions the notation (call-sites gap §5); add the implicit-AND + OR-separator rule with the same example.

## Dependencies

- Wording is coupled to [plan-machinery-headings.md](plan-machinery-headings.md) ("…when these are true:" echo) — land the headings decision first or in the same session.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (syntax check: no `**AND**`, separator form exact).
