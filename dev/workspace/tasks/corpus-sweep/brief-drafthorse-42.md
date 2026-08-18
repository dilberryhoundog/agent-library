# Target: extensions/skills/drafthorse/SKILL.md — issue #42 items only

This document is the migrated pilot — its preamble, slots, conditions, functions and vocabulary are DONE. Do not re-run the common checklist over it (checklist items A–J do not apply). The work is issue #42's four items, resolved with the recommended policies below. Read the issue's framing in `dev/workspace/tasks/corpus-sweep/` context: Mode is captured but never consumed; the conversion write convention is unstated; the executor document is undefined; gate marking was ambiguous.

## Item 1 + 2 — wire Mode to behaviour; state the conversion write convention

Mode stays captured. Name its concrete deltas at the steps that own them:

- `+Gather Requirements`, Establish list, **Destination** bullet: in conversion mode, capture the source path and the output path separately where they differ (the common case: they are the same path).
- `+Draft the Skill`, engagement: add the write convention — in conversion mode, never overwrite the source before acceptance: write the draft to a sibling path (`<destination>.draft.md`), leaving the original intact as source material until the build completes.
- `+Deliver`, engagement: in conversion mode, on acceptance the draft replaces the original at the destination and the sibling draft file is removed.
- `+Deliver`, finished conditions: add `- in conversion mode, the accepted document stands at the destination and no sibling draft remains` (state-shaped, checkable; reads as a no-op for new builds — acceptable because the mode qualifier scopes it).

Keep the touch light: three engagement sentences and one condition. No new steps, no new references.

## Item 3 — define the executor document

- `# --- TERMS ---`: add `- **Executor Document** — A document invoked only by another agent as part of a fixed pipeline (\`user-invocable: false\`); its description warns off general usage, and its reporting step may fold in the error step's role per the executor exception.`
- `+Gather Requirements`, Establish list, **Invocation surface** bullet: gloss executor-only inline so the surface can be selected correctly — e.g. "executor-only (an executor document: invoked only by another agent as part of a fixed pipeline)".

## Item 4 — gate marking: verify, minimal or no edit

The wave-4 migration named the approval in every gate's finished conditions (Collect References, Fill Reference Gaps, Map the Steps, Set Invariants, Deliver), and `condition-writing.md` establishes the compound-gate form as the marker. Walk the eight steps and confirm no gate ambiguity remains (the old doubt: `+Fill Reference Gaps` vs `+Draft the Skill`). If the ambiguity is closed, record that with no edit; if a residual doubt survives, flag it — do not invent a marker scheme.

## Guard

`+Draft the Skill`'s existing instruction "Copy [SKILL Template](assets/SKILL-template.md) to the destination and fill it" must remain coherent with the conversion convention — in conversion mode the copy target is the sibling draft path. Fold that into the same engagement sentence; do not restructure the step.

## Output

Changes and flags per the common brief's output shape (kind: engagement | gate | termination | other as fits). No exemplar.
