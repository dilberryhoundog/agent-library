# Target: extensions/skills/git-box/SKILL.md

Condition blocks are already lists — checklist item G is verification only. The real work: preamble, five de-hold trims, three slots (one LOAD-BEARING with a structural repair), functions, vocabulary, citations.

## De-hold trims (all pure de-hold — class 1)

- `+Gather Context` start: drop `- context has not yet been gathered`.
- `+Check Workflows` start: drop `- the workflow check has not yet run`.
- `+Formulate Brief` start: drop `- the brief is not yet complete, whether starting fresh or finishing an adopted workflow template` — keep `- the workflow check has completed`.
- `+Call Agent` start: drop `- git-robot has not been invoked with the brief`.
- `+Present Report` start: drop `- the report has not yet been presented`.

## Slots

- `+Present Report` (:233) — LOAD-BEARING, Gap 1: git-box has no success exit; on a plain full success no start condition holds and nothing ends the run. Repair (approved shape): delete the slot AND add a new step `## +Conclude` between `+Present Report` and `+Save a Workflow`:
  - Directive: `End the run on a plain success and hand the conversation back.`
  - Declare `**Success step** — Resolves the run's done state and exits.`
  - Start: `- the report has been presented` / `- the run's outcome is recorded as a full success`
  - Finished: `- the user has the conversation back` / `- the skill is complete`
  - Engagement (`### Conclude:`): one or two lines — nothing failed and nothing needs saving; return to the user.
- `+Save a Workflow` slot — HINT (finished conditions already carry `the skill is complete`). Delete.
- `+Help` slot — HINT (same). Delete.

## Dovetail alignment

`+Present Report` finished records the outcome in three classes (full success / success worth saving as a workflow / a run with failures, errors, or process problems). Align the claiming steps' start conditions to those recorded classes minimally: `+Save a Workflow` starts on the recorded worth-saving class (replace "the request succeeded / the request represents a repeatable workflow" pair with `- the run's outcome is recorded as a success worth saving as a workflow`); `+Help`'s first list aligns to the recorded failures class. Keep `+Help`'s other OR blocks (skill-process misbehaviour; situation no other step covers) unchanged.

## Functions

- `+Conclude` — Success (new, above).
- `+Help` — `**Error step** — Handles recovery and bails.`
- `+Save a Workflow` — `**Dormant step** — Skippable, activates only when its state arises.`
- Others: ordinary — declare nothing. (`+Call Agent` spans a wait but fits no catalogue entry; leave undeclared.)

## Vocabulary and citations

- Old preamble swap (universal text).
- "error drain" appears only in the old preamble — the swap clears it; verify zero after.
- Citations: `Workflow Map` → `[Workflow Map](#workflow-map)`; `Issue Creation` → `[Issue Creation](#issue-creation)` (two sites: `+Save a Workflow`, `+Help`). `Current Git State`? — this document has no such heading; leave anything else alone. Terms (`Brief`, `Request`, `Procedure`) are glossary entries, not references — leave their code-span mentions.
- `+Help` finished condition carries `- the skill is complete` already; keep.

## Exemplar

Nominate: **Success step** (`+Conclude`, as written).
