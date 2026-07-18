# DraftHorse Spec Upgrade — Plan Index

Branch: `drafthorse-spec-upgrade`. One plan doc per unified concept/TODO; this index is the cross-plan map — execution waves, shared-file contention, and dependencies. Source material: the two discussion docs (decisions of record) and five review reports (finding inventories) in this folder. Settled with NO work: Dynamic Improvement (concept 9 — stays as written in conventions.md).

## Working context

The three surfaces this upgrade operates on:

- `docs/drafthorse/` — the framework (authoring spec): `framework/{scaffold,conventions,steps,notation,references,handover,environments→surfaces}.md` + `framework/README.md`, `drafthorse-spec-check.md` (the audit spec; its frontmatter `update_instructions` govern the saddler), and `template/SKILL.md`.
- `extensions/skills/drafthorse/` — the drafthorse skill (the convert/author workflow): `SKILL.md`, `assets/SKILL-template.md`, `assets/HANDOVER-template.md`, `references/` (condition-writing, step-splitting, collecting-references).
- `extensions/agents/drafthorse-saddler.md` — the audit subagent, REGENERATED from drafthorse-spec-check.md, never hand-edited.

Downstream consumers touched by the migration wave: the DraftHorse-format skills (`extensions/skills/{classroom,versioning,git-box,agent-commit,agent-push,agent-switch}/`) and any agent docs carrying the preamble/step anatomy.

## Status at a glance

- Ready (18): steps-are-universal, conditions-carry-routing, gates-are-compound, sharp-prose, naming-not-explaining, half-applied-dispositions, decision-slot, condition-links, handover-location, handover-citation, reference-notation, frontmatter-stamp, parent-child-vocab, machinery-headings, surfaces-doc, child-skills, mechanical-fixes, preamble-rewrite, utilities-term, handover-template, config-wiring, terms-notation, spec-check-saddler (last).
- Further discussion: NONE — wave 0 is closed.
- On hold (1): [plan-drafthorse-rule.md](plan-drafthorse-rule.md).

## Execution waves

Wave 0 — discussions (CLOSED; all four settled, each plan now Ready):

- [x] [plan-preamble-rewrite.md](plan-preamble-rewrite.md) — SETTLED; now Ready. Final preamble text decided; its steps.md work (canonical copy, in-play/active synonym, step usage patterns catalogue) joins the steps.md session in wave 1, and the copy-sweep rides wave 3. Unblocks the handover template.
- [x] [plan-utilities-term.md](plan-utilities-term.md) — SETTLED; now Ready. Five utilities (handover is a dynamic reference, not a peer); "segment" dropped; house metaphor is the scaffold.md definition sentence. scaffold.md bulk runs in its own session; its one-line de-segmenting edits join the notation/conventions/handover sessions. Unblocks the references.md opening noun.
- [x] [plan-config-wiring.md](plan-config-wiring.md) — SETTLED; now Ready. Config wiring is NOT a frontmatter concept (declared in plugin.json; cannot substitute into frontmatter at all) — scaffold.md's bullet is DELETED, not uncommented, and the concept is recatalogued as a "User configuration" dynamic reference. Also found a bug in references.md's dynamic-family definition.
- [x] [plan-handover-template.md](plan-handover-template.md) — SETTLED; now Ready. Turned out to be more than tuning: the handover-variant preamble is final, handover.md's "same universal preamble" claim is FALSE and gets rewritten, and handover globals are RE-SCOPED to the parent step (reversing the whole-run rule). Feeds two spec-check changes.

Wave 1 — framework docs (CLOSED; all four sessions done). Grouped by contended file; each group was one session to avoid conflicting edits:

- [x] conventions.md session (DONE): [plan-conditions-carry-routing.md](plan-conditions-carry-routing.md) + [plan-steps-are-universal.md](plan-steps-are-universal.md) (paired bullets) + [plan-gates-are-compound.md](plan-gates-are-compound.md) + [plan-sharp-prose.md](plan-sharp-prose.md) + [plan-naming-not-explaining.md](plan-naming-not-explaining.md) + the conventions.md items of [plan-half-applied-dispositions.md](plan-half-applied-dispositions.md), [plan-surfaces-doc.md](plan-surfaces-doc.md) (Sub Agents bullet removal) and [plan-utilities-term.md](plan-utilities-term.md) (line 32 "data segment") + duplicate-bullet cleanup. This single session resolves every TODO block in conventions.md.
- [x] steps.md session (DONE): [plan-half-applied-dispositions.md](plan-half-applied-dispositions.md) (disposition catalogue) + [plan-decision-slot.md](plan-decision-slot.md) + [plan-preamble-rewrite.md](plan-preamble-rewrite.md) steps.md items (canonical preamble copy, in-play/active synonym, step usage patterns catalogue — the sibling of the disposition catalogue) + steps.md items of universal/routing/gates plans. Write all prose using the NEW machinery heading names.
- [x] notation.md session (DONE; also owned references.md): [plan-condition-links.md](plan-condition-links.md) + [plan-reference-notation.md](plan-reference-notation.md) + the notation items of [plan-handover-citation.md](plan-handover-citation.md) and [plan-machinery-headings.md](plan-machinery-headings.md) and [plan-utilities-term.md](plan-utilities-term.md) (line 22 "segment dividers" → dividers) + [plan-config-wiring.md](plan-config-wiring.md) references.md items (new "User configuration" dynamic-reference entry; FIX the dynamic-family shape sentence, which is false for Data load as well). Also took the framework-wide bare-filename link sweep (all 16 sites across scaffold/conventions/steps/references/notation/handover — the convention is set here, so it landed in one mechanical pass rather than waiting for wave 3) and the framework half of the NEW [plan-terms-notation.md](plan-terms-notation.md), including scaffold.md:43.
- [x] handover.md session (DONE — wave 1 is closed): handover.md items of [plan-handover-location.md](plan-handover-location.md), [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md), [plan-utilities-term.md](plan-utilities-term.md) ("Steps segment" — the last "segment" in the framework), and [plan-handover-template.md](plan-handover-template.md). Also took `framework/README.md` (`type: handover` + a "five frame parts" utilities miss — no session owned that file) and HANDOVER-template.md (pulled forward from wave 3: its globals comment was actively teaching the reversed rule). Deliberate scope limit: parent/child vocab was applied ONLY to sentences a plan had me rewriting, so handover.md still carries "master step" in its untouched paragraphs — wave 3 finishes it. Two findings recorded: step-splitting.md has no globals rule to align (plan premise wrong), and the retired references/ carve-out sharpens the shared-worker gap for wave 4.
- [x] scaffold.md session (DONE): [plan-utilities-term.md](plan-utilities-term.md) — definition sentence, five utilities, de-segmenting — plus [plan-config-wiring.md](plan-config-wiring.md) (Config wiring bullet deleted). Three amendments landed here: the house metaphor is NOT written into scaffold.md (reverses the wave-0 §13 decision — it was the reasoning that settled the word, not prose the document needs); the frontmatter concern count stays FOUR because [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md)'s scaffold item (unassigned by this index — a gap) takes config wiring's place in the list; and scaffold.md's `type: handover` paragraph plus a machinery-heading inventory miss were corrected in passing.

Wave 2 — new docs:

- [ ] [plan-surfaces-doc.md](plan-surfaces-doc.md) + [plan-child-skills.md](plan-child-skills.md) in one session (the Child Skills entry is the definition home). surfaces.md also becomes the home for the `${user_config.*}` mechanism per [plan-config-wiring.md](plan-config-wiring.md): the four substitution surfaces, the sensitive/keychain/`CLAUDE_PLUGIN_OPTION_*` specifics, and the plugin-only caveat.

Wave 3 — the migration pass (ONE atomic sweep across all skills/templates/agent docs; splitting it leaves mixed dialects):

- [ ] [plan-machinery-headings.md](plan-machinery-headings.md) + [plan-parent-child-vocab.md](plan-parent-child-vocab.md) + preamble copy-sweep (final text from wave 0) + [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md) application + [plan-handover-location.md](plan-handover-location.md) file moves/renames + [plan-handover-citation.md](plan-handover-citation.md) citation updates + [plan-utilities-term.md](plan-utilities-term.md) stale-term sweep across the templates and drafthorse SKILL.md ("five parts", "declaration segment", "data segment" — NOT versioning SKILL.md:178, which means path segments) + [plan-terms-notation.md](plan-terms-notation.md) de-prefixing (`: **Term**: x` → `- **Term** — x` in both templates, classroom, versioning, git-box, agent-commit/push/switch; closing check `grep -rn '^: \*\*' docs extensions` returns nothing). Same files, one pass. report-call-sites.md is the closing checklist; grep inventories before declaring done.
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
