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
- [plan-step-functions.md](plan-step-functions.md) — DECIDED, then superseded in part. A step opens with a **directive** naming the agent's task on entry, not a weighted description. Catalogue is six entries with fixed declaration strings: Error, Success, Looping, Routing, Dormant, Handover. Support was retired and Success added after the plan was written.
- [plan-slot-removal.md](plan-slot-removal.md) — DECIDED. `#### Suggested next actions:` retired, its four sanctioned uses rehomed. Audit closed: 34 of 48 slots removable outright, 13 load-bearing across three gaps.
- [plan-error-step-naming.md](plan-error-step-naming.md) — DECIDED. **error step** is the noun, `+Handle a Problem` the heading. Sites inventoried, edits outstanding.
- [plan-load-bearing-slots.md](plan-load-bearing-slots.md) — PART APPLIED. Four sites closed in wave 4 (both templates, `+Deliver`, `+Handle a Problem`); seven remain for wave 5. Document repair on a per-site approval cycle. Unknown to #38 until the audit ran.
- Condition precedence — issue [#45](https://github.com/dilberryhoundog/agent-library/issues/45), raised and merged mid-wave-4 from the `drafthorse-condition-precedence` branch (workspace archived at `dev/branches/drafthorse-condition-precedence/`). Surfaced by the pilot, which is wave 4 working as designed. **The diagnosis held, the remedy did not** — read the issue's comments, not its body, for the decisions of record:
    - **De-hold retired.** A start condition no longer carries a negated copy of its own finished condition. `steps.md § In play` already defined a step as a span ending at its finished condition; the corpus agreed in practice.
    - **Precedence rejected.** A rule per state, which `conventions.md` names as bloat. Worse, it blocks the backtrack it was meant to protect: walked from `+Deliver` with the step map rejected, a finished-on-"the draft is written" step is barred permanently, so a re-mapped build could never be redrafted. De-hold locked re-entry at the start condition; precedence locks the same door from the other side.
    - **Scoping rejected.** A clause per condition, and unnecessary once start conditions name durable artifact state.
    - **What carries it instead** — a withdrawn approval is a claimed remainder at the error step, now a disposition class in `steps.md`: **User approval problem**. The cascade then falls out of conditions already written, since each start condition names the approval it depends on.
    - **Also settled** — a start condition may name an artifact's state and leave the approval behind it implied ("a complete draft exists" carries both the gate and the work). Naming the step stays forbidden.
- [plan-step-shape-examples.md](plan-step-shape-examples.md) — OPEN, queued behind the corpus sweep. Machinery examples per catalogue entry, so a builder selects and adjusts rather than builds. Pairs with pulling the error and success blocks out of the template.

## Execution waves

Wave 0 — decisions. Nothing edits until these close:

- [x] Function catalogue — six entries as written, one function per step, definitions in a new drafthorse reference file with a spec entry, template pointer and skill instructions. [plan-step-functions.md](plan-step-functions.md)
- [x] Error-step name — **error step**; `+Handle a Problem` kept as the heading. [plan-error-step-naming.md](plan-error-step-naming.md)
- [x] Slot audit — done. 48 slots, 34 removable outright, 13 load-bearing collapsing to three gaps, 1 ambiguous. Two behaviour calls outstanding. [plan-slot-removal.md](plan-slot-removal.md)

Waves 1 to 3 are the spec pass — the framework, what the build skill teaches, and the checker that condenses both. No document's own step machinery is touched across them. The corpus stays whole and non-conforming throughout, and the saddler carries no authority until wave 3 regenerates it.

Wave 1 — framework docs, grouped by contended file, one session per group:

- [x] `steps.md` session — DONE. Anatomy head carries description plus a bolded function line; new `## Step functions` section with the six entries, one-function rule, and the loop/dormant mechanism salvaged from the deleted usage-patterns block; `## Suggested next actions` section deleted; line 5, the responsibility paragraph and `## Conditions` corrected; error-step vocabulary applied at both exception sites. Verified: slot string and both retired names return zero, machinery headings down to four.
- [x] `notation.md` session — DONE. Machinery heading list down to four, "last three optional" corrected to two. New structural-marking entry for the declared function, written in the generic placeholder form the Terms entry uses (`**Step function** — the step's function description`); `steps.md`'s anatomy block aligned to the same placeholder.
- [x] `handover.md` + `conventions.md` + `scaffold.md` + `README.md` — DONE. `handover.md` ×3 error-step renames; `conventions.md` stepping-stones bullet lost its slot sentence; `scaffold.md`'s contract inventory rewritten to head-then-contract with the slot dropped; `README.md` names the declared function in its Steps summary. Framework-wide verification: the slot string and both retired names return zero across `docs/drafthorse/framework/`. The spec-check still carries 6 slot hits by design — wave 3.

**Wave 1 is closed.**

Wave 2 — build skill and templates. Same session boundary as wave 1:

- [x] `references/step-functions.md` — DONE. Six entries, one-function rule, an example declaration, and how to write the weighted description. Standalone, no framework link (portability). `references/README.md` notes it as a plain data reference outside the authoring trilogy, so that file's "these three files" argument still holds.
- [x] `assets/SKILL-template.md`, `assets/HANDOVER-template.md` — DONE. Weighted description comment plus a `**<Step function>**` placeholder carrying the six-shape chooser inline; generic placeholder slot deleted from both; scaffolding comments rewritten to "a step names no other step"; the shipped error step now declares `**Error step**`. HANDOVER's chooser omits the error step, which never appears in a handover, and its `:87` slot went as an audited HINT. CARVE-OUT HELD: `SKILL-template.md:112` and `:137` left intact for [plan-load-bearing-slots.md](plan-load-bearing-slots.md).
- [x] `extensions/skills/drafthorse/SKILL.md`, `references/condition-writing.md`, `references/step-splitting.md` — DONE. Digest bullet rewritten to "a step names no other step" plus a new self-description bullet; `+Draft the Skill` now instructs the weighted description and one declared function, citing the new guide; error-step vocabulary applied at the two teaching sites. `condition-writing.md` lost its slot section, its framing and routing-home sentences corrected, and the salvage bullet rehomed as a new finished-condition rule ("cover every outcome the step can end on"); its terminal-steps example now teaches completion in the finished condition, which is what the load-bearing repair will write. `step-splitting.md` was in scope after all — three teaching sites. DUAL ROLE HELD: SKILL.md's own preamble, slots and step heads untouched, corpus in wave 3.
- [x] `assets/SKILL-template.draft.md` — deleted. Its two load-bearing sites leave [plan-load-bearing-slots.md](plan-load-bearing-slots.md) at 11.

**Wave 2 is closed.**

Wave 3 — the checker, rebuilt as part of the spec. `drafthorse-spec-check.md` is spec, not corpus: it condenses the framework into the tests a checker needs, so it follows a framework change immediately rather than trailing the migration (`framework/README.md` states this ordering as the downstream-consumer rule):

- [x] `docs/drafthorse/drafthorse-spec-check.md` — DONE. Machinery-heading check down to four with the slot named as retired; new `Declared function` notation check (closed catalogue, one per step); both preamble texts replaced with the settled prose versions; `Suggested next actions` check group deleted and its surviving fact rehomed as a finished-condition rule; new `Terminal steps state their termination` rule, which is what the load-bearing repair will write; `Purpose line` replaced by `Self-description`; `Standalone` now reads "a step names no other step"; error-step vocabulary throughout, including the `Error Step` term. Its OWN machinery migrated too, so the regenerated saddler conforms: prose preamble, both slots removed (both audited HINT, destinations verified), `**Dormant step**` declared on `+Audit the Handovers`, `**Error step**` on `+Compose the Report` per the executor exception, and that step's finished conditions now state the review is complete.
- [x] `extensions/agents/drafthorse-saddler.md` — DONE. Regenerated per the `usages:` rule: frontmatter and identity paragraph kept, everything from `# Agent Invariants` down replaced from the spec-check. Verified in lockstep — the two bodies diff empty. The only surviving mention of the retired slot is the check that flags it.

**Wave 3 is closed.**

Wave 4 — the pilot. One document migrated whole and put through the rebuilt checker, before the corpus commits to anything:

- [x] `assets/SKILL-template.md` — DONE. Success exit declares `**Success step**` and states `the skill is complete` in its finished conditions; error step keeps its two conditions unchanged. Both slots deleted, nothing rehomed. An explicit abandoned-run block was written and then reverted: `the user has decided how to continue` already covers stopping, and a finished step with no start condition holding is a stopped run.
- [x] `extensions/skills/drafthorse/SKILL.md` migrated whole — DONE. Settled universal preamble (the original text, not #45's amended wording); both slots deleted; all eight start conditions trimmed to entry state; `**Success step**` on `+Deliver` with the build's completion in its finished condition; `**Error step**` on `+Handle a Problem`; two directives sharpened, seven judged already conforming; the `The run resolves` digest bullet corrected to match the checker. Error-step vocabulary needed nothing — wave 2 had already done it.
- [x] Load-bearing repairs — scoping phrases on the four gate finished conditions were drafted, then rejected: the cascade jam was an artefact of de-hold's process-negations, and with every finish an artifact fact the agent reads a stale approval correctly. The un-approval fact itself resolved the other way at the merge — `+Handle a Problem`'s engagement now claims a withdrawn approval explicitly, from [#45](https://github.com/dilberryhoundog/agent-library/issues/45)'s branch.
- [ ] **Checker pass, before the audit.** Deferred here from [#45](https://github.com/dilberryhoundog/agent-library/issues/45) deliberately, so the spec-check takes one edit and the saddler one regeneration rather than two passes over the same lines. Shapes already agreed in that issue: delete the **De-hold** check; append the loop terminator to **Loops are re-holding conditions**; delete **Approval is revocable state**, matching `steps.md § User gates`; in `+Audit the Steps`, drop the step-walk parenthetical from `(state terms, de-hold)` to `(state terms)` — it is what the auditing agent performs, so leaving it reinstates the rule whatever the References say. Then regenerate `extensions/agents/drafthorse-saddler.md` from the spec-check, never hand-edited. A false-positive guard ("a start condition needs no closing clause") was proposed and dropped; the rule's absence is enough.
- [x] Audit run against the pilot as the acceptance test — DONE, by hand against `drafthorse-spec-check.md`. Verdict `revise`, six findings, every one landing on the document and none on the checker or the framework. Scenario-walk passed, including the withdrawn-approval path. Fixes applied: all eighteen condition blocks converted from prose to lists and split per **One condition per item**; `**Dormant step**` declared on `+Fill Reference Gaps`; `+Handle a Problem`'s start split across an `OR` block; both `Conventions Digest` citations linked. `+Review` left undeclared by decision — its loop lives in the engagement, not in step re-entry. **The installed saddler is whatever the last `agent-tools` release shipped** — edits in this repo are not live until a release is cut. Either cut one first, or run the audit by reading `docs/drafthorse/drafthorse-spec-check.md` directly and applying its checks by hand. Findings sort into three piles: a defect in the migrated document, a defect in the checker, or a gap in the framework. Fix at the level that owns it.
- [ ] Tune and re-run until it converges. Whatever the pilot teaches about the migration shape is what the sweep then applies.

Wave 5 — the remaining load-bearing repairs:

- [ ] [plan-load-bearing-slots.md](plan-load-bearing-slots.md) run to its definition of done across the sites wave 4 did not take — git-box, versioning, the three git verb skills, git-robot. Per-site user approval; no silent behaviour choices.

Wave 5b — condition blocks to lists. Its own wave, not folded into the sweep:

- [ ] Ninety prose condition blocks across nine documents: `versioning/SKILL.md` 20, `agent-switch` 10, `agent-commit` 8, `agent-push` 6, `course-researcher` 8, `doc-reviewer` 8, `breaking-change-detector` 6, `git-robot` 6. `drafthorse/SKILL.md`'s 18 are done — the pilot converted them.
- [ ] Not mechanical. Each prose block splits into several conditions, and every split is a judgment about what counts as one look. The pilot's `+Gather Requirements` went from one sentence to six conditions.
- [ ] Two vocabulary rules the pilot settled, applied throughout: a start condition names the artifact's state and lets the approval behind it be implied (`the step map is complete`), while the producing step's finished conditions state the substantive criteria first and the user's approval last.

Wave 6 — corpus sweep, ONE atomic pass:

- [ ] Per step, one edit: new preamble, slot removed, directive written, function declared, error-step vocabulary, and the start condition trimmed of its de-hold clause per [#45](https://github.com/dilberryhoundog/agent-library/issues/45). Splitting this leaves mixed dialects. Every document except the two the pilot already migrated.
- [ ] Saddler run over the swept corpus, now as a genuine gate.

Wave 6b — richer reference, leaner template. Harvest folded into the sweep above, since each document is read once anyway:

- [ ] [plan-step-shape-examples.md](plan-step-shape-examples.md) — machinery example per catalogue entry, lifted from documents as the sweep migrates them. Error and success blocks move out of `SKILL-template.md` into the reference. Template returns to a skeleton.

Wave 7 — releases:

- [ ] `agent-tools`, `chat-tools`, `dev-tools`, `classroom` all carry affected documents. Cut via `/dev-tools:versioning`.
- [ ] Predecessor branch left a classroom release uncut. Check whether it still stands before cutting a new one.

## Contended files

- `steps.md` — 4 plans → one session.
- `notation.md` — 2 plans → one session.
- Both templates — touched by every plan → wave 2 only, less the two load-bearing slots wave 2b owns.
- `versioning/SKILL.md`, `drafthorse/SKILL.md`, `git-box/SKILL.md`, the three git verb skills, `git-robot.md` — condition and invariant repairs in wave 2b, vocabulary in wave 3. Two passes, different machinery.
- spec-check + saddler — written once in wave 3 against the finished framework, never edited per-plan. The saddler is regenerated from the spec-check, never hand-edited.

## Rules for executing agents

- Framework holds authority. Where the spec-check or a saddler finding disagrees with a framework doc, the CHECK is wrong. Never edit a framework doc, skill, or template to silence a finding.
- Saddler findings carry no authority until wave 3 regenerates it. From wave 4 they do — but they sort into three piles, and only one of them is a defect in the audited document.
- Read each file, edit per verified site. Scripts measure only — inventories, counts, proving a set empty. Never the edit.
- Two preambles answer one grep. The four classroom handovers take the variant; a corpus-wide match offers them the universal text.
- Report new problems found mid-plan. Never improvise fixes outside a plan's scope.
- An uncited `README.md` in a `references/` folder is not dead weight. The checker's **No dead weight** test flags it; ignore that finding rather than citing the file or deleting it.
