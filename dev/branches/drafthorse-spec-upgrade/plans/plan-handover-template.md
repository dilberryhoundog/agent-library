# Plan: Handover Creation Template

Status: Ready. Sources: TODO 12b decision, tuned here. The template: `extensions/skills/drafthorse/assets/HANDOVER-template.md`.

## Decision

The template makes handovers self-describing: a cold invoking agent learns the contract from the document itself. Four things settled.

### The handover-variant preamble is real, and the framework must say so

`handover.md` currently asserts (line ~57) that a handover "opens its steps section with the same universal preamble as any document". That is false and must be rewritten. The universal preamble's error bullet ("A step that cannot be completed falls to the error drain step") is a lie inside a handover — there is no error drain; a failure falls to the parent document's problem step. Copying it verbatim plants that lie in every handover.

The unification was defensive, not principled: it was adopted because the spec-check flagged a differing preamble as a defect. The fix is to teach the spec-check two preambles, not to make the documents lie. The framework describes both (universal and handover-variant); the spec-check checks each document against the correct one.

### The variant preamble (final)

Replaces the current quote block (lines 37–42), which is derived from the retired universal preamble and still carries the dropped routing bullet:

```markdown
> Handovers are child steps of a parent step:
>
>- The parent step reads success from the state the handover leaves behind.
>- Invoke a child step any time its *start* conditions are met.
>- If all child steps are *finished* or inactive, return to the parent step and continue.
>- Error handling is covered by the parent document, unless an optional child problem step is present.
>- Global invariants apply across the whole parent step; step invariants are confined to the child step.
```

- "child **problem** step", never "child error step" — the framework distinguishes the error step/error drain (claims the remainder; banned in a handover) from a problem step (surfaces something to the user mid-work; allowed). The template's own optional block is `+Surface a Problem`.
- The "no exit step" rule is deliberately not a bullet: the template shows the shape, and the direct statements carry it.
- Derives visibly from the universal preamble ([plan-preamble-rewrite.md](plan-preamble-rewrite.md)) — bullet 2 is its bullet 2 verbatim.

### Handover globals are scoped to the parent step, NOT the whole run

REVERSES the current rule. `handover.md`'s "Globals join the master's global set… in force for the whole run once it is folded in" is replaced by: a handover's Agent Invariants are in force across the parent step's span — they are, from the parent document's side, a step invariant on the parent step.

Rationale on record:

- The current rule contradicts handover.md's own containment rule ("The flow starts at the master step, runs the handover's steps, and ends back at the master step — nowhere else"). A whole-run global binds steps that never touch the handover.
- The mapping is exact: steps.md defines step invariants as "rules in force while the step is in play"; a handover's globals are in force while its child steps are in play; its child steps run entirely inside the parent step's span. A cold reader who assumes "child global = parent's step invariant" is deriving the correct model — the old convention had to teach them out of the right answer.
- Whole-run scope creates a pointless constraint: two handovers folded in at different steps had to carry mutually compatible globals despite never coexisting. Under step scope that conflict is impossible by construction.
- It rescues the reusability handover.md claims but undermines — a handover leaking globals into its host cannot be dropped into two skills safely, and (per the Standalone rule) it never names its parent, so it cannot know what it would be binding.
- Safety-floor objection rejected: a handover's floor exists for the handover's work; a parent needing that floor for its own later steps must state it itself, rather than inherit it invisibly.
- Deliberate consequence on record: scoping to "the whole parent step" is slightly wider than "the handover's child steps" — it also binds the parent step's own engagement prose before and after the fold-in. Intended; the parent step is one unit.

### Template tuning

- The optional local problem step (lines 100–119) becomes a **one-line pointer** — a short comment saying a local problem step is allowed to surface something mid-work and is written as an ordinary step. Cuts ~20 lines of scaffolding the author usually deletes.
- `handover.md` gains a pointer to this template as the canonical creation path (it currently describes handovers without mentioning the template exists).

## Work

- [x] `extensions/skills/drafthorse/assets/HANDOVER-template.md` — DONE (handover.md session; taken here rather than wave 3 because line 14 was actively teaching the reversed globals rule). Draft comment block promoted to the live quote block, stale quote block deleted, optional problem step collapsed to a one-line pointer, and the globals comment re-scoped to the parent step.
- [x] `docs/drafthorse/framework/handover.md` — DONE. The "same universal preamble" claim rewritten to name the handover variant and say why it exists (the universal error-drain bullet is false inside a handover); the globals bullet re-scoped to the parent step; the HANDOVER-template.md pointer added. Runs in the handover.md session with [plan-handover-location.md](plan-handover-location.md), [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md), [plan-parent-child-vocab.md](plan-parent-child-vocab.md), and the [plan-utilities-term.md](plan-utilities-term.md) de-segmenting line.
- [ ] `extensions/skills/drafthorse/references/step-splitting.md` — **NOTHING TO ALIGN; the premise was wrong.** Checked in the handover.md session: its "Shaping a handover" list (lines 32–38) states five deltas — frontmatter, no exit steps, never names its master, grants, one level only — and **no globals rule at all**. So the whole-run rule was never replicated here and needs no reversal. Two consequences: (a) the globals scope is arguably a missing sixth delta worth stating, but adding it is new content, not an alignment — decide it deliberately rather than smuggling it in here; (b) the section is wave-3 migration territory regardless (`type: handover` ×2, `references/` as the handover location, "master step"/"sub-steps" throughout, and a `#### Decision:` machinery string at line 48). Left untouched this session.
- Any existing handover documents — re-scope globals written under the whole-run rule; sweep in the migration wave.

## Dependencies

- Unblocked by [plan-preamble-rewrite.md](plan-preamble-rewrite.md) (settled) — the variant derives from the final universal text.
- Consistent with [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md) and [plan-handover-location.md](plan-handover-location.md): a template-created file must be born conforming (stamp, root location, `-handover` suffix in the template's comments).
- FEEDS [plan-spec-check-saddler.md](plan-spec-check-saddler.md), two changes:
  - **Two preambles** — the spec-check must check a handover against the variant, not flag the difference as a defect. This is the check that caused the original (wrong) unification.
  - **Globals sweep narrows** — spec-check line 72 ("Globals compatible across the set… sweep the whole set (master plus every folded handover)") is replaced: a handover's globals need only be compatible with the parent's globals and the parent step's invariants. Line 77's "audit mode by entry" note narrows with it.
