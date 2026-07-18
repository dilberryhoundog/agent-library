# Plan: Machinery Heading Renames

Status: Ready. Sources: new decision (this session, from the steps.md draft). Recorded in [todos-discussion.md](todos-discussion.md) §12 decision.

## Decision

The five machinery headings become: `#### Start this step when these are true:` / `#### Step finished when these are true:` / `#### Agent decision:` / `#### Suggested next actions:` / `#### Step invariants:`. Rationale on record: "these are true" states the implicit-AND list semantics in the heading itself; "Agent decision" names who decides; "Suggested next actions" correctly softens the slot to a pointer; "Step invariants" disambiguates from the global Agent Invariants.

## Work

One atomic migration pass — these strings are the most-replicated in the ecosystem; incremental migration would leave mixed dialects.

- `docs/drafthorse/framework/steps.md` — anatomy block already drafted with new headings (TODO comment at line 37 removed); sweep the rest of the file's prose that names the slots ("do this next" slot references → "Suggested next actions", noting the meaning-softening is intended).
- [x] `docs/drafthorse/framework/notation.md` — DONE (notation session). The structural-markings line listing the H4 machinery headings updated to the new five.
- [x] `docs/drafthorse/framework/scaffold.md` — DONE (scaffold.md session). INVENTORY GAP: this file was missing from the plan and carried two stale strings — the Agent Invariants section's `#### Invariants:` (now `#### Step invariants:`) and the Steps section's "optional do-this-next and invariants" (now "optional agent decision, suggested next actions and step invariants"). Grep the framework docs, not only the skills, in the closing inventory.
- `extensions/skills/drafthorse/assets/SKILL-template.md` — working step already uses new headings; the SUCCESS EXIT and PROBLEM steps still carry old ones (`Start this step when:` / `Do this next:`) — migrate.
- `HANDOVER-template.md` — already conforms.
- Every existing DraftHorse skill: drafthorse, classroom, versioning, git-box, agent-commit/push/switch, plus agent docs carrying step anatomy — grep the old heading strings repo-wide for the closing inventory.
- spec-check/saddler heading checks are owned by [plan-spec-check-saddler.md](plan-spec-check-saddler.md).

## Dependencies

- Execute in the migration wave WITH [plan-parent-child-vocab.md](plan-parent-child-vocab.md) (same files, one pass).
- [plan-condition-links.md](plan-condition-links.md) and [plan-decision-slot.md](plan-decision-slot.md) write prose that uses the new names — land those framework edits first or in the same session.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (machinery-heading conformance checks re-keyed to the new strings).
