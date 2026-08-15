# Step Anatomy Refactor — Plan Index

Branch: `drafthorse-step-anatomy`, cut from main. Scope: issue #38. One plan doc per concept; this index maps waves, contended files, dependencies. Source material: `filebox/steps-preamble-changes.md`.

Predecessor upgrade's plans archived at `dev/branches/drafthorse-spec-upgrade/plans/`, index included. Consult it for inherited decisions of record.

## Working context

Three surfaces, unchanged from the predecessor:

- `docs/drafthorse/` — the framework: `framework/{scaffold,conventions,steps,notation,references,handover,surfaces}.md` + `framework/README.md`, and `drafthorse-spec-check.md` (the audit spec; its `update_instructions` govern the saddler).
- `extensions/skills/drafthorse/` — the build skill: `SKILL.md`, `assets/{SKILL-template,HANDOVER-template}.md`, `references/{condition-writing,step-splitting,collecting-references}.md`.
- `extensions/agents/drafthorse-saddler.md` — the audit subagent. REGENERATED from the spec-check, never hand-edited.

Downstream: the DraftHorse-format skills (`classroom`, `versioning`, `git-box`, three git verb skills, `drafthorse` itself) and the agent documents in `extensions/agents/`.

## Plans

- [plan-preamble-prose.md](plan-preamble-prose.md) — PART APPLIED. Preamble becomes telegraphic prose. Both texts final, framework copies updated, corpus sweep outstanding.
- [plan-step-functions.md](plan-step-functions.md) — DECIDED. Weighted step description plus one declared function from a six-entry catalogue.
- [plan-slot-removal.md](plan-slot-removal.md) — DECIDED. `#### Suggested next actions:` retired, its four sanctioned uses rehomed. Audit closed: 34 of 48 slots removable outright, 13 load-bearing across three gaps.
- [plan-error-step-naming.md](plan-error-step-naming.md) — DECIDED. **error step** is the noun, `+Handle a Problem` the heading. Sites inventoried, edits outstanding.
- [plan-load-bearing-slots.md](plan-load-bearing-slots.md) — OPEN, NEW. The 13 slots carrying instruction no condition expresses. Document repair on a per-site approval cycle. Unknown to #38 until the audit ran.

## Execution waves

Wave 0 — decisions. Nothing edits until these close:

- [x] Function catalogue — six entries as written, one function per step, definitions in a new drafthorse reference file with a spec entry, template pointer and skill instructions. [plan-step-functions.md](plan-step-functions.md)
- [x] Error-step name — **error step**; `+Handle a Problem` kept as the heading. [plan-error-step-naming.md](plan-error-step-naming.md)
- [x] Slot audit — done. 48 slots, 34 removable outright, 13 load-bearing collapsing to three gaps, 1 ambiguous. Two behaviour calls outstanding. [plan-slot-removal.md](plan-slot-removal.md)

Waves 1 and 2 together are the spec-and-skill pass. They change what DraftHorse teaches. No document's own step machinery is touched in either wave — the corpus stays whole and non-conforming until wave 3, and the saddler is not run as a gate in that window.

Wave 1 — framework docs, grouped by contended file, one session per group:

- [x] `steps.md` session — DONE. Anatomy head carries description plus a bolded function line; new `## Step functions` section with the six entries, one-function rule, and the loop/dormant mechanism salvaged from the deleted usage-patterns block; `## Suggested next actions` section deleted; line 5, the responsibility paragraph and `## Conditions` corrected; error-step vocabulary applied at both exception sites. Verified: slot string and both retired names return zero, machinery headings down to four.
- [x] `notation.md` session — DONE. Machinery heading list down to four, "last three optional" corrected to two. New structural-marking entry for the declared function, written in the generic placeholder form the Terms entry uses (`**Step function** — the step's function description`); `steps.md`'s anatomy block aligned to the same placeholder.
- [x] `handover.md` + `conventions.md` + `scaffold.md` + `README.md` — DONE. `handover.md` ×3 error-step renames; `conventions.md` stepping-stones bullet lost its slot sentence; `scaffold.md`'s contract inventory rewritten to head-then-contract with the slot dropped; `README.md` names the declared function in its Steps summary. Framework-wide verification: the slot string and both retired names return zero across `docs/drafthorse/framework/`. The spec-check still carries 6 slot hits by design — wave 4.

**Wave 1 is closed.**

Wave 2 — build skill and templates. Same session boundary as wave 1:

- [x] `references/step-functions.md` — DONE. Six entries, one-function rule, an example declaration, and how to write the weighted description. Standalone, no framework link (portability). `references/README.md` notes it as a plain data reference outside the authoring trilogy, so that file's "these three files" argument still holds.
- [x] `assets/SKILL-template.md`, `assets/HANDOVER-template.md` — DONE. Weighted description comment plus a `**<Step function>**` placeholder carrying the six-shape chooser inline; generic placeholder slot deleted from both; scaffolding comments rewritten to "a step names no other step"; the shipped error step now declares `**Error step**`. HANDOVER's chooser omits the error step, which never appears in a handover, and its `:87` slot went as an audited HINT. CARVE-OUT HELD: `SKILL-template.md:112` and `:137` left intact for [plan-load-bearing-slots.md](plan-load-bearing-slots.md).
- [x] `extensions/skills/drafthorse/SKILL.md`, `references/condition-writing.md`, `references/step-splitting.md` — DONE. Digest bullet rewritten to "a step names no other step" plus a new self-description bullet; `+Draft the Skill` now instructs the weighted description and one declared function, citing the new guide; error-step vocabulary applied at the two teaching sites. `condition-writing.md` lost its slot section, its framing and routing-home sentences corrected, and the salvage bullet rehomed as a new finished-condition rule ("cover every outcome the step can end on"); its terminal-steps example now teaches completion in the finished condition, which is what the load-bearing repair will write. `step-splitting.md` was in scope after all — three teaching sites. DUAL ROLE HELD: SKILL.md's own preamble, slots and step heads untouched, corpus in wave 3.
- [x] `assets/SKILL-template.draft.md` — deleted. Its two load-bearing sites leave [plan-load-bearing-slots.md](plan-load-bearing-slots.md) at 11.

**Wave 2 is closed.**

Wave 2b — document repair, gating the sweep. First wave to touch a document's own machinery:

- [ ] [plan-load-bearing-slots.md](plan-load-bearing-slots.md) run to its definition of done. Templates first, then the derivative sites. Per-site user approval; no silent behaviour choices. The sweep may not delete a slot at any site this plan names until it closes.

Wave 3 — corpus sweep, ONE atomic pass:

- [ ] Per step, one edit: new preamble, slot removed, description weighted, function declared, error-step vocabulary. Splitting this leaves mixed dialects. `drafthorse/SKILL.md` and both templates are corpus here like any other document — their step machinery migrates in this pass, not in wave 2.

Wave 4 — verification layer, strictly last:

- [ ] `drafthorse-spec-check.md` rewritten against the migrated framework. Saddler regenerated from it. Saddler run against a migrated skill as the acceptance test.

Wave 5 — releases:

- [ ] `agent-tools`, `chat-tools`, `dev-tools`, `classroom` all carry affected documents. Cut via `/dev-tools:versioning`.
- [ ] Predecessor branch left a classroom release uncut. Check whether it still stands before cutting a new one.

## Contended files

- `steps.md` — 4 plans → one session.
- `notation.md` — 2 plans → one session.
- Both templates — touched by every plan → wave 2 only, less the two load-bearing slots wave 2b owns.
- `versioning/SKILL.md`, `drafthorse/SKILL.md`, `git-box/SKILL.md`, the three git verb skills, `git-robot.md` — condition and invariant repairs in wave 2b, vocabulary in wave 3. Two passes, different machinery.
- spec-check + saddler — write-once at the end, never edited per-plan.

## Rules for executing agents

- Framework holds authority. Where the spec-check or a saddler finding disagrees with a framework doc, the CHECK is wrong. Never edit a framework doc, skill, or template to silence a finding.
- Saddler findings before wave 4 carry no authority. The checker stays knowingly stale until then.
- Read each file, edit per verified site. Scripts measure only — inventories, counts, proving a set empty. Never the edit.
- Two preambles answer one grep. The four classroom handovers take the variant; a corpus-wide match offers them the universal text.
- Report new problems found mid-plan. Never improvise fixes outside a plan's scope.
