# Plan: Parent/Child Vocabulary

Status: Ready. Sources: new decision (this session). Recorded in [todos-discussion.md](todos-discussion.md) §12 decision.

## Decision

Parent/child replaces master/sub-step everywhere: a **parent step** folds in **child steps** (a handover) or invokes a **child skill** (fresh context, own grants). "Master step" and "sub-steps" retire wholesale. "Child steps" (handover) vs "Child Skills" (separate skill) is a deliberate near-pair — same relation, different surface; surfaces.md states the distinction once.

## Work

Rename sweep — every occurrence of "master step"/"master document"/"sub-steps" (call-sites: handover.md throughout, steps.md preamble + anatomy + Handover exception, references.md:22 Handover fold-in, conventions.md:33 "A handover fits its master step", scaffold.md handover paragraph, both templates, drafthorse SKILL.md + its references, classroom SKILL.md preamble copies, and the preamble line replicated in every DraftHorse skill and agent doc — grep `master step` and `sub-steps` repo-wide for the closing inventory).

- Convention rename: "A handover fits its master step" → "A handover fits its parent step".
- spec-check/saddler occurrences are owned by [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (regeneration).

## Dependencies

- Pure string migration but semantically coupled to [plan-preamble-rewrite.md](plan-preamble-rewrite.md) (the preamble's handover line is one of the renamed sites — don't sweep the preamble separately; let the preamble rewrite land the new line, then sweep the copies).
- Execute in the migration wave WITH [plan-machinery-headings.md](plan-machinery-headings.md) — same blast radius, one atomic pass over the same files.
- [plan-surfaces-doc.md](plan-surfaces-doc.md) states the child-steps/Child-Skills distinction.
