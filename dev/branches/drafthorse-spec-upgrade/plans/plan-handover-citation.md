# Plan: Handover Citation Notation (" — Handover")

Status: Ready. Sources: concept 4. Decision in [new-concepts-discussion.md](new-concepts-discussion.md) §4.

## Decision

The exclusive legal citation form for handovers: link text ends " — Handover" (exact em-dash spacing, mechanically greppable). Example: `[Substeps — Handover](substeps-handover.md)`. A bare link to a handover file is a defect.

## Work

- `docs/drafthorse/framework/notation.md` — the Handover Reference entry stays; declare exclusivity ("the only legal citation form") and add one sentence on what the agent does on encountering it (or point at the preamble line that says it).
- Update every existing citation to the form (call-sites report §4 inventory): drafthorse `SKILL.md:178` (the citation instruction itself), classroom SKILL.md's four citations + Term, `references/step-splitting.md:22`, and the Terms entries defining Handover Doc in both skills.
- The "fold in a handover doc" preamble line keeps prose form — the notation governs citations, not the preamble.

## Dependencies

- Execute WITH [plan-handover-location.md](plan-handover-location.md) (same citation sites; the link paths change in the same edit).
- Vocabulary in updated prose uses parent/child per [plan-parent-child-vocab.md](plan-parent-child-vocab.md).
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (check: every handover citation carries the suffix form; bare links flagged).
