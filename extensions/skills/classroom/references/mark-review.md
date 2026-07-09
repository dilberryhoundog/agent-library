---
type: handover
---

# Mark and Review (Handover)

Grade a learner's completed or annotated work for a unit and produce a saved review document. A handover doc — an invoking step calls this when the user wants completed work marked, and this hands back a delivered review for that step to record and present. Tool grants come from the calling skill.

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

## +Assess the Work

Read the learner's work against the unit and grade it strand by strand.

#### Start this step when:

The user has supplied a learner's completed or annotated work for a unit, and it has not yet been assessed.

#### Step finished when:

Every strand of the unit is resolved — graded with the evidence behind it, or marked *work not supplied* where that strand's work is missing — the learner's strengths are identified, and specific next-step recommendations are drawn, all grounded in the supplied work.

### Grade Against the Unit:

Read the supplied work against the unit it belongs to. A unit's **strands** are the learning areas it covers (its subject or skill areas) — enumerate them from the unit's scope-and-sequence entry and its lesson documents. For each strand, judge the grading and note the specific evidence behind it; identify what the learner does well; and draw concrete, actionable next-step recommendations. Ground every judgement in the material actually provided — where a strand's work is missing, record that rather than guessing at a grade.

## +Produce and Deliver the Review

Render the assessment into the review document and save it.

#### Start this step when:

The unit has been assessed strand by strand and no review document has been produced from that assessment.

#### Step finished when:

The `templates/documents/review-document.html` shell has been filled with the assessment and delivered as a saved document (HTML source retained, converted to A4 PDF), following the same document pipeline as any other classroom build.

### Fill and Save:

Copy the `Review Document Template` shell and fill every bracketed field from the assessment — per-strand gradings and evidence, strengths, and next-step recommendations, repeating strand rows as needed. Deliver it the same way as any other classroom document: write the HTML to a `source/` folder, convert that saved file to A4 PDF with the `classroom-pdf` server's `html_to_pdf` tool (or, if it is unavailable, deliver paste-ready HTML for the user to print to PDF at A4), and save to a suitable project working location.

## +Hand Back the Review

Report the delivered review and hand it back to the caller.

#### Start this step when:

The review document has been produced and saved.

#### Step finished when:

The saved review's location has been handed back to the invoking step.

#### Do this next:

Return to the invoking step with the outcome.

### Report and Hand Back:

Hand back to the invoking step the outcome **review delivered** — the saved review document and its location — so the invoking step can record it and present it to the user.

## +Handle a Problem

Surface anything the other steps don't cover, and hand a failure outcome back.

#### Start this step when:

Something has gone wrong, or a situation has arisen that no other step covers — the supplied work cannot be matched to a unit, or the review cannot be produced or converted.

#### Step finished when:

The user has been informed of what happened, and the failure outcome has been handed back to the invoking step.

#### Do this next:

Return to the invoking step with the outcome.

### Surface the Problem:

Tell the user plainly what happened and what state the review is in. Hand back to the invoking step the outcome **review not delivered**, naming the reason, so it can decide whether to retry, request more of the work, or continue.
