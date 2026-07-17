# DraftHorse Spec Upgrade — Plan Index

Branch: `drafthorse-spec-upgrade`. One plan doc per unified concept/TODO; this index is the cross-plan map — execution waves, shared-file contention, and dependencies. Source material: the two discussion docs (decisions of record) and five review reports (finding inventories) in this folder. Settled with NO work: Dynamic Improvement (concept 9 — stays as written in conventions.md).

## Working context

The three surfaces this upgrade operates on:

- `docs/drafthorse/` — the framework (authoring spec): `framework/{scaffold,conventions,steps,notation,references,handover,environments→surfaces}.md` + `framework/README.md`, `drafthorse-spec-check.md` (the audit spec; its frontmatter `update_instructions` govern the saddler), and `template/SKILL.md`.
- `extensions/skills/drafthorse/` — the drafthorse skill (the convert/author workflow): `SKILL.md`, `assets/SKILL-template.md`, `assets/HANDOVER-template.md`, `references/` (condition-writing, step-splitting, collecting-references).
- `extensions/agents/drafthorse-saddler.md` — the audit subagent, REGENERATED from drafthorse-spec-check.md, never hand-edited.

Downstream consumers touched by the migration wave: the DraftHorse-format skills (`extensions/skills/{classroom,versioning,git-box,agent-commit,agent-push,agent-switch}/`) and any agent docs carrying the preamble/step anatomy.

## Status at a glance

- Ready (13): steps-are-universal, conditions-carry-routing, gates-are-compound, sharp-prose, naming-not-explaining, half-applied-dispositions, decision-slot, condition-links, handover-location, handover-citation, reference-notation, frontmatter-stamp, parent-child-vocab, machinery-headings, surfaces-doc, child-skills, mechanical-fixes, spec-check-saddler (last).
- Further discussion (4): [plan-config-wiring.md](plan-config-wiring.md), [plan-utilities-term.md](plan-utilities-term.md), [plan-preamble-rewrite.md](plan-preamble-rewrite.md), [plan-handover-template.md](plan-handover-template.md).
- On hold (1): [plan-drafthorse-rule.md](plan-drafthorse-rule.md).

## Execution waves

Wave 0 — discussions (user sessions, any order, before their dependents):

- [plan-preamble-rewrite.md](plan-preamble-rewrite.md) — blocks the migration wave's preamble copy-sweep and the handover template.
- [plan-utilities-term.md](plan-utilities-term.md) — blocks the utilities stale-term sweep and spec-check terminology.
- [plan-config-wiring.md](plan-config-wiring.md) — blocks nothing (bullet stays commented); needed before spec-check finalises its twin bullet.
- [plan-handover-template.md](plan-handover-template.md) — tuning only; blocked by preamble-rewrite.

Wave 1 — framework docs (grouped by contended file; each group = one session to avoid conflicting edits):

- conventions.md session: [plan-conditions-carry-routing.md](plan-conditions-carry-routing.md) + [plan-steps-are-universal.md](plan-steps-are-universal.md) (paired bullets) + [plan-gates-are-compound.md](plan-gates-are-compound.md) + [plan-sharp-prose.md](plan-sharp-prose.md) + [plan-naming-not-explaining.md](plan-naming-not-explaining.md) + the conventions.md items of [plan-half-applied-dispositions.md](plan-half-applied-dispositions.md) and [plan-surfaces-doc.md](plan-surfaces-doc.md) (Sub Agents bullet removal) + duplicate-bullet cleanup. This single session resolves every TODO block in conventions.md.
- steps.md session: [plan-half-applied-dispositions.md](plan-half-applied-dispositions.md) (disposition catalogue) + [plan-decision-slot.md](plan-decision-slot.md) + steps.md items of universal/routing/gates plans. Write all prose using the NEW machinery heading names.
- notation.md session: [plan-condition-links.md](plan-condition-links.md) + [plan-reference-notation.md](plan-reference-notation.md) + the notation items of [plan-handover-citation.md](plan-handover-citation.md) and [plan-machinery-headings.md](plan-machinery-headings.md).
- handover.md session: handover.md items of [plan-handover-location.md](plan-handover-location.md), [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md), [plan-parent-child-vocab.md](plan-parent-child-vocab.md).

Wave 2 — new docs:

- [plan-surfaces-doc.md](plan-surfaces-doc.md) + [plan-child-skills.md](plan-child-skills.md) in one session (the Child Skills entry is the definition home).

Wave 3 — the migration pass (ONE atomic sweep across all skills/templates/agent docs; splitting it leaves mixed dialects):

- [plan-machinery-headings.md](plan-machinery-headings.md) + [plan-parent-child-vocab.md](plan-parent-child-vocab.md) + preamble copy-sweep (final text from wave 0) + [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md) application + [plan-handover-location.md](plan-handover-location.md) file moves/renames + [plan-handover-citation.md](plan-handover-citation.md) citation updates + utilities stale-term sweep (once wave 0 decides) + classroom Terms `:` prefix. Same files, one pass. report-call-sites.md is the closing checklist; grep inventories before declaring done.
- [plan-mechanical-fixes.md](plan-mechanical-fixes.md) — ride-along; verify each item wasn't consumed by a wave-1 rewrite first.

Wave 4 — verification layer (strictly last):

- [plan-spec-check-saddler.md](plan-spec-check-saddler.md) — consumes every prior outcome; ends with saddler regeneration. Then run the saddler against a migrated skill (classroom or git-box) as the acceptance test of the whole upgrade.

## Contended files (why the waves exist)

- conventions.md — 7 plans touch it → one session.
- steps.md — 6 plans → one session (plus migration ride-through).
- notation.md — 4 plans → one session.
- handover.md — 3 plans → one session.
- Every skill/template (preamble + headings + vocab + stamp) → the single wave-3 pass.
- spec-check + saddler — write-once at the end; NEVER edited per-plan.

## Cross-plan rules for executing agents

- Decisions of record live in new-concepts-discussion.md and todos-discussion.md — a plan summarises its decision, but on any doubt the discussion doc wins; do not re-litigate decisions.
- Write all new prose with the post-migration vocabulary (new heading names, parent/child, DraftHorse casing) even before wave 3 sweeps the old copies.
- Do not edit drafthorse-saddler.md directly, ever — regenerate from the spec-check.
- classroom is an independently versioned plugin: wave-3 changes to it warrant a release flag, not a release (versioning is its own workflow).
- Report NEW problems found mid-plan; do not improvise fixes outside the plan's scope (the Dynamic Improvement ethos applies to this upgrade itself).
