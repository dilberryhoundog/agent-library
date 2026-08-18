# Plan: Step Shape Examples

Status: OPEN — queued behind the corpus sweep. Source: a TODO comment formerly at the head of `extensions/skills/drafthorse/references/step-functions.md`, lifted here and deleted from that file before the `agent-tools` release. It shipped inside a reference a building agent loads, so it read as an instruction to improve the guide rather than as guidance.

Original note, verbatim:

> Improve this reference by including an example of the step machinery, that a step of a particular shape might have. This will take more of the guess work out of the agents process as DraftHorse steps are built.
>
> 2 examples of this might be...
>
> - Routing step example displays the "Agent decision" machinery with placeholder text
> - Error step is prebuilt, these are mostly the same across all instances.
>
> A good strategy to complete this todo would be to search the corpus for instances of steps taking these shapes and reverse engineer their machinery examples.

## Decision

`step-functions.md` names six shapes and defines each in prose. A builder still assembles every step's machinery from scratch.

Give each catalogue entry a machinery example. The builder then **selects and adjusts** rather than **builds**. Two shapes carry most of the value:

- **Error step** — near-identical across every instance. Ships as a prebuilt block, copied whole.
- **Routing step** — shows the `#### Agent decision:` machinery with placeholder text, which is the part builders get wrong.

The other four get an example of their distinguishing machinery: the re-holding start condition of a loop, the transient activation of a dormant step, the fold-in and state-reading conditions of a handover step, the exhaustive done state of a success step.

Paired with the template extraction: the shipped error and success blocks leave `assets/SKILL-template.md` and land here. Template returns to a skeleton. The reference becomes the in-depth guide a builder leans on for the whole step landscape — the same species as `collecting-references.md`, `step-splitting.md` and `condition-writing.md`.

## Sequencing

Runs **after the corpus sweep**, and the reason is the harvest source.

Every document in the corpus is pre-migration until the sweep lands — old preamble, retired slot, retired vocabulary. Reverse-engineering examples from it before then bakes retired forms into the one reference a builder leans on hardest.

Cheapest execution is to fold the harvest into the sweep itself. Each document is read once to migrate it; lift the exemplar on the same pass, already in the new dialect because it was just written. The pilot alone will not serve — one document does not carry all six shapes.

## Work

- `extensions/skills/drafthorse/references/step-functions.md` — a machinery example per entry. Delete the TODO comment on completion.
- `extensions/skills/drafthorse/assets/SKILL-template.md` — error and success blocks removed; the template keeps scaffold, dividers, placeholders and the function chooser pointer.
- `extensions/skills/drafthorse/SKILL.md` — `+Draft the Skill` must cite the reference at the moment the builder writes steps. Shape knowledge outside the template is unreachable without that citation.
- `docs/drafthorse/drafthorse-spec-check.md` + saddler — only if an example contradicts a check. Regenerate if touched.

## Risks

- **Two homes for one artifact.** Once the error block lives here, nothing may copy it back into the template. Single source of truth.
- **Examples drift from checks.** An example is executable-looking text a builder copies; a stale one propagates into every document built from it. Any check change touching step machinery re-reads this file.
- **Examples become the ceiling.** A builder who selects and adjusts may stop thinking. Each example states what it demonstrates, so it reads as one shape's machinery rather than the shape's only form.

## Definition of done

Six entries carry an example. The TODO comment is gone. Error and success blocks live in one home. `+Draft the Skill` cites the reference at the moment of use, and a builder reading only `step-functions.md` can lay out a whole document's step landscape.
