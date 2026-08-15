# Plan: Declared Step Functions

Status: OPEN — catalogue entries and declaration rules undecided. Source: issue #38, `filebox/steps-preamble-changes.md`.

## Decision

Two moves on the step's head, above the machinery headings.

**One-line description gains weight.** Stops being a scanning label. Becomes the step's self-description to the reading agent — what the step does, how it behaves. Absorbs what the retired routing pointer carried (see [plan-slot-removal.md](plan-slot-removal.md)), in the step's own terms.

**Step declares its function.** Below the description: bolded function name, normal text after. Tells the reading agent how the step behaves before it reads a condition. No declared function means an ordinary working step.

Proposed catalogue, carried from the source proposal, NOT settled:

- **Error step** — handles recovery and bails.
- **Looping step** — re-runs, taking a different branch each pass.
- **Routing step** — chooses between divergent branches.
- **Dormant step** — activates only when its state arises.
- **Handover step** — manages the invocation and resolution of a handover document.
- **Support step** — catches or manages difficulties belonging to other steps.

## Open questions

- **Discriminating tests.** Each entry needs a test separating it from its neighbours, or builders label inconsistently and the checker cannot audit the declaration. Soft boundaries: support against error, routing against an ordinary step carrying two start-condition sets.
- **One function or several.** A handover step that also loops is plausible. Proposed: several allowed, comma-joined on the one bolded line, capped at two by convention rather than rule.
- **Catalogue home.** Proposed: normative definitions in `steps.md`, sibling to the disposition catalogue; compact chooser list as a template comment, so a builder picks without leaving the file.
- **Retrofit or new documents only.** Proposed: retrofit. Half a corpus declaring functions teaches nothing, and mixed dialects are what the single atomic sweep prevents.

## Work

- `docs/drafthorse/framework/steps.md` — anatomy gains the description-and-function head; function catalogue written as a section; the commented-out usage patterns block (multiple active / looping back / dormant) DELETED rather than revived, its three entries now functions.
- `docs/drafthorse/framework/notation.md` — bolded function line is a structural marking. Needs an entry.
- `assets/SKILL-template.md`, `assets/HANDOVER-template.md` — head shape plus chooser list.
- `extensions/skills/drafthorse/SKILL.md` — instruct the builder to write a weighted description and choose a function.
- Corpus sweep — every step in `extensions/` gets a rewritten description, plus a function where one applies.

## Dependencies

- Paired with [plan-slot-removal.md](plan-slot-removal.md). Description absorbs what the slot carried, so both land in one pass per step.
- The preamble bullet naming looping and dormant patterns already dropped in [plan-preamble-prose.md](plan-preamble-prose.md). Until the catalogue lands, those shapes are stated nowhere.
- Terminology for the error entry belongs to [plan-error-step-naming.md](plan-error-step-naming.md).
