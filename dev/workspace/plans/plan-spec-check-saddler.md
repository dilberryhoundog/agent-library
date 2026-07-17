# Plan: Spec-Check Incorporation + Saddler Regeneration

Status: Ready — but sequenced LAST (consumes every other plan's outcome). Sources: TODOs 9, 10, 11; concept 6. Decisions in [todos-discussion.md](todos-discussion.md) §9–§11, [new-concepts-discussion.md](new-concepts-discussion.md) §6.

## Decision

Mine the finalised conventions into checkable tests in `docs/drafthorse/drafthorse-spec-check.md`, add the Handover Checks and audit step, then REGENERATE `extensions/agents/drafthorse-saddler.md` from the spec-check per its frontmatter `update_instructions` — never edit the usage directly.

## Work

New/changed checks (each keyed to its source plan):

- Conditions carry routing; Steps are universal (multi-in-play legal, chains not required).
- Gates are compound, re-worded to the decided statement.
- Sharp Prose; Naming-not-Explaining (heading length/uniqueness per document).
- Condition-links syntax: no `**AND**`; `**OR these are true:**` exact form.
- Half-applied: the exclusion test (saddler.md:83) is REPLACED by the disposition check — the error step's engagement covers the common error paths (half-applied first).
- Decision slot: three limits + named-fact ban ("a decision was made" never satisfies).
- Handover Checks (TODO 10): stamp/`-handover` suffix/root location three-signal agreement; every citation in the " — Handover" form (bare links = defect); reduced audit profile (frontmatter-identity/exit-step checks waived), otherwise full DraftHorse; discovery = `*-handover.md` glob + citation collection, set mismatch flagged; uncited handover = pass but report. The references/-carve-out check retires.
- `## +Audit the Handovers` step (TODO 11): shaped like Test Each Step — start when a handover is discovered; finished when every Handover Check is applied to every handover file and findings recorded.
- Stamp check: every audited document carries `harness-format: DraftHorse` (exact casing).
- Terminology/heading re-keys: machinery heading strings, parent/child vocabulary, utilities terms — the spec-check's own prose and check strings updated to match the migrated framework.
- Known deliberate patterns preserved as non-defects: `#### Decision:`-above-H3 step-scope machinery; shared-worker references (the data-not-work false positive) — revisit whether the new handover conventions now resolve the latter properly.

## Dependencies

- BLOCKED BY: all conventions plans, [plan-half-applied-dispositions.md](plan-half-applied-dispositions.md), [plan-decision-slot.md](plan-decision-slot.md), [plan-condition-links.md](plan-condition-links.md), the handover trio (location/citation/stamp), [plan-machinery-headings.md](plan-machinery-headings.md), [plan-parent-child-vocab.md](plan-parent-child-vocab.md), and the [plan-utilities-term.md](plan-utilities-term.md) discussion (check terminology).
- [plan-config-wiring.md](plan-config-wiring.md) outcome updates the twin Config-wiring bullet here — if still undecided when this runs, leave that bullet commented in both places.
- Final step: regenerate the saddler; then the saddler and spec-check are back in lockstep.
