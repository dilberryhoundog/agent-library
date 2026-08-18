# Plan: Declared Step Functions

Status: DECIDED — catalogue and declaration rules settled, edits outstanding. Source: issue #38, `filebox/steps-preamble-changes.md`.

## Decision

Two moves on the step's head, above the machinery headings.

**One-line description gains weight.** Stops being a scanning label. Becomes the step's self-description to the reading agent — what the step does, how it behaves. Absorbs what the retired routing pointer carried (see [plan-slot-removal.md](plan-slot-removal.md)), in the step's own terms.

**Step declares its function.** Below the description: bolded function name, normal text after. Tells the reading agent how the step behaves before it reads a condition. No declared function means an ordinary working step.

Catalogue, SETTLED at six entries. Each description stands as written — it names the step shape well enough for a builder to pick, and no separate discriminating test is authored:

- **Error step** — handles recovery and bails.
- **Looping step** — re-runs, taking a different branch each pass.
- **Routing step** — chooses between divergent branches.
- **Dormant step** — activates only when its state arises.
- **Handover step** — manages the invocation and resolution of a handover document.
- **Support step** — catches or manages difficulties belonging to other steps.

**One function per step.** Several functions dilute the declaration. A handover step handles the handover and nothing else; a looping step is a specialist. A step that appears to carry two functions is a step wanting a split.

**Catalogue home — four sites.** Full definitions in a new `extensions/skills/drafthorse/references/` file. An entry in `docs/drafthorse/framework/steps.md` as the spec's statement of the concept. A light pointer in `assets/SKILL-template.md`, giving a building agent the step shapes to pick from without leaving the file. Instructions in `extensions/skills/drafthorse/SKILL.md` telling a builder to choose.

**Retrofit, sequenced separately.** Framework spec and drafthorse skill land first. The corpus sweep is its own later pass, not part of this plan's execution.

## Open questions

None. Catalogue, multiplicity, home and sequencing all settled.

## Work

- `docs/drafthorse/framework/steps.md` — anatomy gains the description-and-function head; the concept stated as a section, with the six entries; the commented-out usage patterns block (multiple active / looping back / dormant) DELETED rather than revived, its three entries now functions.
- `docs/drafthorse/framework/notation.md` — bolded function line is a structural marking. Needs an entry.
- New `extensions/skills/drafthorse/references/` file — the full catalogue, one entry per function.
- `assets/SKILL-template.md`, `assets/HANDOVER-template.md` — head shape plus a light pointer listing the six shapes.
- `extensions/skills/drafthorse/SKILL.md` — instruct the builder to write a weighted description and choose one function.
- Corpus sweep — every step in `extensions/` gets a rewritten description, plus a function where one applies. Runs as its own pass after the spec and skill land.

## Dependencies

- Paired with [plan-slot-removal.md](plan-slot-removal.md). Description absorbs what the slot carried, so both land in one pass per step.
- The preamble bullet naming looping and dormant patterns already dropped in [plan-preamble-prose.md](plan-preamble-prose.md). Until the catalogue lands, those shapes are stated nowhere.
- Terminology for the error entry belongs to [plan-error-step-naming.md](plan-error-step-naming.md).
