---
harness-format: DraftHorse, Handover
---

# Mark and Review (Handover)

Grade a learner's completed or annotated work for a unit and produce a saved review document. A parent step folds this in when the user wants completed work marked.

# Agent Invariants

**DO NOT** grade work the user has not actually supplied — mark only the completed or annotated material in hand, and say plainly what was not provided.

# --- REFERENCES ---

## Review Document Template

=== the graded per-unit review layout ===
[Review Document](templates/documents/review-document.html) — the A4 review shell: per-strand gradings, the evidence behind each grade, strengths, and specific next-step recommendations. Distinct from `templates/documents/competency-report.html`, which is a light end-of-course summary rather than a per-unit graded review. Fill every bracketed field; repeat strand rows as needed; keep the A4 house style (Lexend, clean print).

# --- STEPS ---

> Handovers are child steps of a parent step:
>
>- The parent step reads success from the state the handover leaves behind.
>- Invoke a child step any time its *start* conditions are met.
>- If all child steps are *finished* or inactive, return to the parent step and continue.
>- Error handling is covered by the parent document, unless an optional child problem step is present.
>- Global invariants apply across the whole parent step; step invariants are confined to the child step.

## +Assess the Work

Read the learner's work against the unit and grade it strand by strand.

#### Start this step when these are true:

- the user has supplied a learner's completed or annotated work for a unit
- it has not yet been assessed

#### Step finished when these are true:

- every strand of the unit is resolved — graded with the evidence behind it, or marked *work not supplied* where that strand's work is missing
- the learner's strengths are identified
- specific next-step recommendations are drawn

### Grade Against the Unit:

Read the supplied work against the unit it belongs to. Enumerate the unit's strands from its scope-and-sequence entry and its lesson documents. For each strand, judge the grading and note the specific evidence behind it; identify what the learner does well; and draw concrete, actionable next-step recommendations. Ground every judgement in the material actually provided — where a strand's work is missing, record that rather than guessing at a grade.

## +Produce and Deliver the Review

Render the assessment into the review document and save it.

#### Start this step when these are true:

- the unit has been assessed strand by strand
- no review document has been produced from that assessment

#### Step finished when these are true:

- the `Review Document Template` shell has been filled with the assessment
- it has been delivered as a saved document per the `Document Pipeline`

### Fill and Save:

Copy the `Review Document Template` shell and fill every bracketed field from the assessment — per-strand gradings and evidence, strengths, and next-step recommendations, repeating strand rows as needed. Then deliver it per the `Document Pipeline`, saving to a suitable project working location.
