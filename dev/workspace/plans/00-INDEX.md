# DraftHorse Spec Upgrade — Plan Index

Branch: `drafthorse-spec-upgrade`. One plan doc per unified concept/TODO; this index is the cross-plan map — execution waves, shared-file contention, and dependencies. Source material: the two discussion docs (decisions of record) and five review reports (finding inventories) in this folder. Settled with NO work: Dynamic Improvement (concept 9 — stays as written in conventions.md).

## Working context

The three surfaces this upgrade operates on:

- `docs/drafthorse/` — the framework (authoring spec): `framework/{scaffold,conventions,steps,notation,references,handover,environments→surfaces}.md` + `framework/README.md`, `drafthorse-spec-check.md` (the audit spec; its frontmatter `update_instructions` govern the saddler), and `template/SKILL.md`.
- `extensions/skills/drafthorse/` — the drafthorse skill (the convert/author workflow): `SKILL.md`, `assets/SKILL-template.md`, `assets/HANDOVER-template.md`, `references/` (condition-writing, step-splitting, collecting-references).
- `extensions/agents/drafthorse-saddler.md` — the audit subagent, REGENERATED from drafthorse-spec-check.md, never hand-edited.

Downstream consumers touched by the migration wave: the DraftHorse-format skills (`extensions/skills/{classroom,versioning,git-box,agent-commit,agent-push,agent-switch}/`) and any agent docs carrying the preamble/step anatomy.

## Status at a glance

- Ready (17): steps-are-universal, conditions-carry-routing, gates-are-compound, sharp-prose, naming-not-explaining, half-applied-dispositions, decision-slot, condition-links, handover-location, handover-citation, reference-notation, frontmatter-stamp, parent-child-vocab, machinery-headings, surfaces-doc, child-skills, mechanical-fixes, preamble-rewrite, utilities-term, handover-template, config-wiring, spec-check-saddler (last).
- Further discussion: NONE — wave 0 is closed.
- On hold (1): [plan-drafthorse-rule.md](plan-drafthorse-rule.md).

## Execution waves

Wave 0 — discussions (CLOSED; all four settled, each plan now Ready):

- [x] [plan-preamble-rewrite.md](plan-preamble-rewrite.md) — SETTLED; now Ready. Final preamble text decided; its steps.md work (canonical copy, in-play/active synonym, step usage patterns catalogue) joins the steps.md session in wave 1, and the copy-sweep rides wave 3. Unblocks the handover template.
- [x] [plan-utilities-term.md](plan-utilities-term.md) — SETTLED; now Ready. Five utilities (handover is a dynamic reference, not a peer); "segment" dropped; house metaphor is the scaffold.md definition sentence. scaffold.md bulk runs in its own session; its one-line de-segmenting edits join the notation/conventions/handover sessions. Unblocks the references.md opening noun.
- [x] [plan-config-wiring.md](plan-config-wiring.md) — SETTLED; now Ready. Config wiring is NOT a frontmatter concept (declared in plugin.json; cannot substitute into frontmatter at all) — scaffold.md's bullet is DELETED, not uncommented, and the concept is recatalogued as a "User configuration" dynamic reference. Also found a bug in references.md's dynamic-family definition.
- [x] [plan-handover-template.md](plan-handover-template.md) — SETTLED; now Ready. Turned out to be more than tuning: the handover-variant preamble is final, handover.md's "same universal preamble" claim is FALSE and gets rewritten, and handover globals are RE-SCOPED to the parent step (reversing the whole-run rule). Feeds two spec-check changes.

Wave 1 — framework docs (grouped by contended file; each group = one session to avoid conflicting edits):

- [ ] conventions.md session: [plan-conditions-carry-routing.md](plan-conditions-carry-routing.md) + [plan-steps-are-universal.md](plan-steps-are-universal.md) (paired bullets) + [plan-gates-are-compound.md](plan-gates-are-compound.md) + [plan-sharp-prose.md](plan-sharp-prose.md) + [plan-naming-not-explaining.md](plan-naming-not-explaining.md) + the conventions.md items of [plan-half-applied-dispositions.md](plan-half-applied-dispositions.md), [plan-surfaces-doc.md](plan-surfaces-doc.md) (Sub Agents bullet removal) and [plan-utilities-term.md](plan-utilities-term.md) (line 32 "data segment") + duplicate-bullet cleanup. This single session resolves every TODO block in conventions.md.
- [ ] steps.md session: [plan-half-applied-dispositions.md](plan-half-applied-dispositions.md) (disposition catalogue) + [plan-decision-slot.md](plan-decision-slot.md) + [plan-preamble-rewrite.md](plan-preamble-rewrite.md) steps.md items (canonical preamble copy, in-play/active synonym, step usage patterns catalogue — the sibling of the disposition catalogue) + steps.md items of universal/routing/gates plans. Write all prose using the NEW machinery heading names.
- [ ] notation.md session (also owns references.md): [plan-condition-links.md](plan-condition-links.md) + [plan-reference-notation.md](plan-reference-notation.md) + the notation items of [plan-handover-citation.md](plan-handover-citation.md) and [plan-machinery-headings.md](plan-machinery-headings.md) and [plan-utilities-term.md](plan-utilities-term.md) (line 22 "segment dividers" → dividers) + [plan-config-wiring.md](plan-config-wiring.md) references.md items (new "User configuration" dynamic-reference entry; FIX the dynamic-family shape sentence, which is false for Data load as well).
- [ ] handover.md session: handover.md items of [plan-handover-location.md](plan-handover-location.md), [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md), [plan-parent-child-vocab.md](plan-parent-child-vocab.md), [plan-utilities-term.md](plan-utilities-term.md) (line 12 "Steps segment"), and [plan-handover-template.md](plan-handover-template.md) (rewrite the false "same universal preamble" claim; re-scope the globals bullet to the parent step; add the template pointer). The globals re-scope also lands in step-splitting.md.
- [ ] scaffold.md session (uncontended, any time in this wave): [plan-utilities-term.md](plan-utilities-term.md) — house-metaphor definition sentence, five utilities, de-segmenting — plus [plan-config-wiring.md](plan-config-wiring.md) (delete the Config wiring bullet; "four concerns" → three).

Wave 2 — new docs:

- [ ] [plan-surfaces-doc.md](plan-surfaces-doc.md) + [plan-child-skills.md](plan-child-skills.md) in one session (the Child Skills entry is the definition home). surfaces.md also becomes the home for the `${user_config.*}` mechanism per [plan-config-wiring.md](plan-config-wiring.md): the four substitution surfaces, the sensitive/keychain/`CLAUDE_PLUGIN_OPTION_*` specifics, and the plugin-only caveat.

Wave 3 — the migration pass (ONE atomic sweep across all skills/templates/agent docs; splitting it leaves mixed dialects):

- [ ] [plan-machinery-headings.md](plan-machinery-headings.md) + [plan-parent-child-vocab.md](plan-parent-child-vocab.md) + preamble copy-sweep (final text from wave 0) + [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md) application + [plan-handover-location.md](plan-handover-location.md) file moves/renames + [plan-handover-citation.md](plan-handover-citation.md) citation updates + [plan-utilities-term.md](plan-utilities-term.md) stale-term sweep across the templates and drafthorse SKILL.md ("five parts", "declaration segment", "data segment" — NOT versioning SKILL.md:178, which means path segments) + classroom Terms `:` prefix. Same files, one pass. report-call-sites.md is the closing checklist; grep inventories before declaring done.
- [ ] [plan-mechanical-fixes.md](plan-mechanical-fixes.md) — ride-along; verify each item wasn't consumed by a wave-1 rewrite first.

Wave 4 — verification layer (strictly last):

- [ ] [plan-spec-check-saddler.md](plan-spec-check-saddler.md) — consumes every prior outcome; ends with saddler regeneration. Two changes come from [plan-handover-template.md](plan-handover-template.md): teach it TWO preambles (universal + handover-variant — the check that wrongly forced unification), and narrow the cross-set globals sweep (spec-check:72, :77) to the parent-step scope. Then run the saddler against a migrated skill (classroom or git-box) as the acceptance test of the whole upgrade.

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
- **The spec-check and saddler are knowingly STALE until wave 4.** This is by design: the framework moves in waves 1–3 and is folded into the spec-check last. Consequences, binding on every executing agent:
  - The framework is the authority. Where a check disagrees with a framework doc, the CHECK is wrong.
  - NEVER edit a framework doc, skill, or template to satisfy a spec-check or saddler finding. That is how `handover.md` acquired its false "same universal preamble" claim — a document made wrong to silence a flag.
  - Saddler findings produced before wave 4 are not authoritative. Do not run it as a gate; the acceptance-test run comes after regeneration.
  - Record any check/framework disagreement against [plan-spec-check-saddler.md](plan-spec-check-saddler.md) instead of acting on it.
- classroom is an independently versioned plugin: wave-3 changes to it warrant a release flag, not a release (versioning is its own workflow).
- Report NEW problems found mid-plan; do not improvise fixes outside the plan's scope (the Dynamic Improvement ethos applies to this upgrade itself).
