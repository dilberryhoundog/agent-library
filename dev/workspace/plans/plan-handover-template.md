# Plan: Handover Creation Template

Status: **Further discussion needed** — initial scaffold created, awaiting fine-tuning. Sources: this session's 12b decision. The scaffold: `extensions/skills/drafthorse/assets/HANDOVER-template.md`.

## Context handover

The template makes handovers self-describing: a cold invoking agent learns the contract from the document itself. Current scaffold carries: the `harness-format: DraftHorse, Handover` stamp as sole frontmatter (with a comment explaining why nothing else is declared); the identity paragraph slot (`# <Title> (Handover)`); a handover-variant preamble (child steps of the parent step; no exit step, no error drain; failure falls to the parent's problem step; handback when no child step is left in play); renamed machinery headings; the final child step's *Suggested next actions* hands back to the parent step; an optional commented-out local problem step ("Surface a Problem"); References/Terms sections each carrying the one handover rule (parent's are ambient — cite/never restate, never redefine).

## Points to tune (with the user)

- The variant preamble's bullet set — enough contract? too much? must stay visibly derived from the final universal preamble.
- Whether the optional problem step stays as a commented-out block or becomes a one-line pointer.
- Identity-paragraph comment depth — does it say enough for an author writing one cold?
- Whether the framework (handover.md) should point at the template as the canonical creation path.

## Dependencies

- Blocked by [plan-preamble-rewrite.md](plan-preamble-rewrite.md) (variant must derive from the final universal preamble).
- Consistent with [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md), [plan-handover-location.md](plan-handover-location.md) (a template-created file must be born conforming: root location, `-handover` suffix guidance could be added to the template's comments).
- handover.md's Frontmatter/identity-paragraph prose (already written) should agree with the template — verify in the handover.md pass.
