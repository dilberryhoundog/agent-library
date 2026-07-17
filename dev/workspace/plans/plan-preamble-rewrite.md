# Plan: Steps Preamble Rewrite

Status: **Further discussion needed** — direction approved, wording not final. Sources: TODO 12 working notes (SKILL-template.md:43 draft). Context in [todos-discussion.md](todos-discussion.md) §12.

## Context handover

The rules doc is shelved; the self-describing direction won: the preamble (plus machinery headings) IS the operator's manual every document carries. A denser draft preamble exists in a TODO comment at `extensions/skills/drafthorse/assets/SKILL-template.md:43`, teaching more than the current one: self-containment, invoke-on-start-conditions, error drain, handover flow control, the three reference citation forms, multi-in-play/loopback/dormant patterns.

## Points to resolve (highlighted per discussion)

- "Handovers are slave steps" → parent/child vocabulary ("child steps of the parent step; flow control belongs to the parent step") — master/slave and master/sub-step are both retired.
- Grammar/tightening pass over the draft bullets (e.g. "Completed only when all finishing conditions are met" missing terminal punctuation; "Multiple steps activation" → "Multiple active steps").
- Form: the live preamble is a `>` quote block; the draft is a code fence — presumably adopts the quote form.
- Absorb the machinery renames: the preamble must name the slots by their new headings (*Suggested next actions*, etc.).
- Decide the final bullet set: current draft adds reference-notation and error-drain lines the old preamble lacked; confirm nothing from the old preamble is lost that matters (e.g. "fully meet finished conditions before considering done" survives as "Completed only when…").
- The preamble stays deliberately universal — no skill-specific content — and is copied verbatim into every document; the handover variant (HANDOVER-template) must stay visibly derived from it.

## Dependencies

- BLOCKS the copy-sweep: every DraftHorse document carries a verbatim preamble copy; once final, the new text propagates in the migration wave (with [plan-machinery-headings.md](plan-machinery-headings.md) / [plan-parent-child-vocab.md](plan-parent-child-vocab.md)).
- steps.md's "The steps preamble" section holds the canonical copy — single source; the templates and skills copy it.
- Coupled to [plan-handover-template.md](plan-handover-template.md) (variant preamble must derive from the final universal one).
