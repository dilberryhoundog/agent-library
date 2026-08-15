# Step Anatomy Refactor — Plan Index

Branch: `drafthorse-step-anatomy`, cut from main. Scope: issue #38. One plan doc per concept; this index maps waves, contended files, dependencies. Source material: `filebox/steps-preamble-changes.md`, plus the draft notation at `extensions/skills/drafthorse/assets/SKILL-template.draft.md:45`.

Predecessor upgrade's plans archived at `dev/branches/drafthorse-spec-upgrade/plans/`, index included. Consult it for inherited decisions of record.

## Working context

Three surfaces, unchanged from the predecessor:

- `docs/drafthorse/` — the framework: `framework/{scaffold,conventions,steps,notation,references,handover,surfaces}.md` + `framework/README.md`, and `drafthorse-spec-check.md` (the audit spec; its `update_instructions` govern the saddler).
- `extensions/skills/drafthorse/` — the build skill: `SKILL.md`, `assets/{SKILL-template,HANDOVER-template}.md`, `references/{condition-writing,step-splitting,collecting-references}.md`.
- `extensions/agents/drafthorse-saddler.md` — the audit subagent. REGENERATED from the spec-check, never hand-edited.

Downstream: the DraftHorse-format skills (`classroom`, `versioning`, `git-box`, three git verb skills, `drafthorse` itself) and the agent documents in `extensions/agents/`.

## Plans

- [plan-preamble-prose.md](plan-preamble-prose.md) — PART APPLIED. Preamble becomes telegraphic prose. Both texts final, framework copies updated, corpus sweep outstanding.
- [plan-step-functions.md](plan-step-functions.md) — OPEN. Weighted step description plus a declared function from a catalogue.
- [plan-slot-removal.md](plan-slot-removal.md) — OPEN. `#### Suggested next actions:` retired, its four sanctioned uses rehomed.
- [plan-error-step-naming.md](plan-error-step-naming.md) — OPEN. One name for an object currently carrying four.

## Execution waves

Wave 0 — decisions. Nothing edits until these close:

- [ ] Function catalogue: entries, a discriminating test per entry, one function or several, catalogue home. [plan-step-functions.md](plan-step-functions.md)
- [ ] Error-step name. [plan-error-step-naming.md](plan-error-step-naming.md)
- [ ] Slot audit: does any live document use the slot for real routing rather than a hint. [plan-slot-removal.md](plan-slot-removal.md)

Wave 1 — framework docs, grouped by contended file, one session per group:

- [ ] `steps.md` session — anatomy head, function catalogue, `## Suggested next actions` section deleted, commented usage-patterns block deleted, error-step vocabulary, plus the line-5 and `## Conditions` corrections following the slot's removal.
- [ ] `notation.md` session — machinery heading list down to four; marking entry for the bolded function line.
- [ ] `handover.md` + `conventions.md` + `scaffold.md` + `README.md` — vocabulary and single-site corrections.

Wave 2 — build skill and templates:

- [ ] `assets/SKILL-template.md`, `assets/HANDOVER-template.md` — head shape, chooser list, slot blocks and stale comments removed.
- [ ] `extensions/skills/drafthorse/SKILL.md` and `references/condition-writing.md` — the instructions a builder follows.
- [ ] Decide the fate of `assets/SKILL-template.draft.md`.

Wave 3 — corpus sweep, ONE atomic pass:

- [ ] Per step, one edit: new preamble, slot removed, description weighted, function declared, error-step vocabulary. Splitting this leaves mixed dialects.

Wave 4 — verification layer, strictly last:

- [ ] `drafthorse-spec-check.md` rewritten against the migrated framework. Saddler regenerated from it. Saddler run against a migrated skill as the acceptance test.

Wave 5 — releases:

- [ ] `agent-tools`, `chat-tools`, `dev-tools`, `classroom` all carry affected documents. Cut via `/dev-tools:versioning`.
- [ ] Predecessor branch left a classroom release uncut. Check whether it still stands before cutting a new one.

## Contended files

- `steps.md` — 4 plans → one session.
- `notation.md` — 2 plans → one session.
- Both templates — touched by every plan → wave 2 only.
- spec-check + saddler — write-once at the end, never edited per-plan.

## Rules for executing agents

- Framework holds authority. Where the spec-check or a saddler finding disagrees with a framework doc, the CHECK is wrong. Never edit a framework doc, skill, or template to silence a finding.
- Saddler findings before wave 4 carry no authority. The checker stays knowingly stale until then.
- Read each file, edit per verified site. Scripts measure only — inventories, counts, proving a set empty. Never the edit.
- Two preambles answer one grep. The four classroom handovers take the variant; a corpus-wide match offers them the universal text.
- Report new problems found mid-plan. Never improvise fixes outside a plan's scope.

## House register

All five plans, and every document this refactor writes, use telegraphic register. Framework docs convert as their sites get edited, so mixed prose across `docs/drafthorse/` is expected and marks what has been touched.
