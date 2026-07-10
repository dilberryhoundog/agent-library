---
type: handover
---

# Mark and Review (Handover)

Grade a learner's completed or annotated work for a unit and produce a saved review document. A handover doc — a master step folds this in when the user wants completed work marked. Its steps run as sub-steps of that master step, and its references and invariants come into play for the run; it leans on the master document's tool grants and references. It routes no success or failure of its own: the master step reads the saved review from the run to record and present it, and a failure falls to the master document's problem step.

# Agent Invariants

**DO NOT** grade work the user has not actually supplied — mark only the completed or annotated material in hand, and say plainly what was not provided.

# --- REFERENCES ---

## Review Document Template

=== the graded per-unit review layout ===
`templates/documents/review-document.html` — the A4 review shell: per-strand gradings, the evidence behind each grade, strengths, and specific next-step recommendations. Distinct from `templates/documents/competency-report.html`, which is a light end-of-course summary rather than a per-unit graded review. Fill every bracketed field; repeat strand rows as needed; keep the A4 house style (Lexend, clean print).

# --- STEPS ---

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.
>- A step may fold in a handover doc: follow its steps as sub-steps of that master step, which handles their exits and errors; when they are done, keep going with the master step.

## +Assess the Work

Read the learner's work against the unit and grade it strand by strand.

#### Start this step when:

The user has supplied a learner's completed or annotated work for a unit, and it has not yet been assessed.

#### Step finished when:

Every strand of the unit is resolved — graded with the evidence behind it, or marked *work not supplied* where that strand's work is missing — the learner's strengths are identified, and specific next-step recommendations are drawn, all grounded in the supplied work.

### Grade Against the Unit:

Read the supplied work against the unit it belongs to. Enumerate the unit's strands from its scope-and-sequence entry and its lesson documents. For each strand, judge the grading and note the specific evidence behind it; identify what the learner does well; and draw concrete, actionable next-step recommendations. Ground every judgement in the material actually provided — where a strand's work is missing, record that rather than guessing at a grade.

## +Produce and Deliver the Review

Render the assessment into the review document and save it.

#### Start this step when:

The unit has been assessed strand by strand and no review document has been produced from that assessment.

#### Step finished when:

The `templates/documents/review-document.html` shell has been filled with the assessment and delivered as a saved document per the `Document Pipeline`.

### Fill and Save:

Copy the `Review Document Template` shell and fill every bracketed field from the assessment — per-strand gradings and evidence, strengths, and next-step recommendations, repeating strand rows as needed. Then deliver it per the `Document Pipeline`, saving to a suitable project working location.
