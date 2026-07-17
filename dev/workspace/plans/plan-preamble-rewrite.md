# Plan: Steps Preamble Rewrite

Status: Ready. Sources: TODO 12 working notes (SKILL-template.md:43 draft). Context in [todos-discussion.md](todos-discussion.md) §12.

## Decision

The rules doc is shelved; the self-describing direction won: the preamble (plus machinery headings) IS the operator's manual every document carries. The draft at `extensions/skills/drafthorse/assets/SKILL-template.md:43` is adopted with a grammar pass, the parent/child vocabulary, and two bullets deliberately not carried over. Final text:

```markdown
> Steps are universal and standalone.
>
>- All their work, instructions and rules are self-contained.
>- Invoke a step any time its *start* conditions are met.
>- A step is completed only when all its *finished* conditions are met.
>- A step that cannot be completed falls to the error drain step.
>- A handover folds in as child steps of the parent step; flow control always belongs to the parent step.
>- References are inline, using Markdown link styling. Always load a cited reference.
>- Multiple active steps, looping back, and dormant steps are all valid patterns.
```

Settled points behind it:

- **Exit rule dropped** — the old preamble's "Keep going until you finish a step that ends the skill" is not carried: the exit step's own finished conditions are the stopping rule. Risk accepted: the preamble now states no termination rule; the acceptance test (wave 4, saddler against a migrated skill) is where this shows up if it was wrong.
- **Routing bullet dropped** — the old preamble's "*Do this next* guidance points the way onward; a step's own start condition is what admits it" is not carried: the renamed `#### Suggested next actions:` heading is self-describing. No preamble bullet names a machinery heading, so [plan-machinery-headings.md](plan-machinery-headings.md) does not touch this text.
- **Reference bullet kept, universal** — the preamble is copied into handovers and agent docs, so the bullet says "References", never "Skill references". "Markdown link styling" is the one fact true of all three citation forms (internal anchor, external path, handover path) per notation.md; the three-form taxonomy stays in references.md.
- **"active" over "in play"** — the fork is accepted rather than swept: the preamble says "active" for cold readers, the framework keeps "in play" as its term, and the `## In play` section carries the synonym so the word is reachable.
- **Form** — quote block, as the live preamble already is. The draft's code fence was only its TODO-comment container.

## Work

- `docs/drafthorse/framework/steps.md` — "The steps preamble" section holds the canonical copy (single source; templates and skills copy it): replace with the final text above.
- `docs/drafthorse/framework/steps.md` — `## In play` section (line ~11) gains the synonym: in play is **also known as active**.
- `docs/drafthorse/framework/steps.md` — **step usage patterns catalogue**: name and describe the common patterns the preamble's last bullet points at, mirroring the error-step disposition catalogue in [plan-half-applied-dispositions.md](plan-half-applied-dispositions.md). Three to open the catalogue, framed on one axis — how many times a step fires in a run:
  - **Multiple active steps** — more than one step in play at once (a supervisory step spanning the steps that run inside it; an error step catching before its producer finishes).
  - **Looping back** — a step that fires more than once: a start condition that holds again. Not a special structure (existing prose at steps.md:137).
  - **Dormant** — a step that doesn't fire in a run; its start condition never holds. Define here, against the in-play/active span, rather than as a floating Terms entry.
  - The catalogue is open — add patterns as they are identified, as the disposition catalogue does.
- `extensions/skills/drafthorse/assets/SKILL-template.md` — remove the TODO draft block (line 43); carry the final preamble.
- Copy-sweep — 21 sites carry the preamble verbatim: both templates, drafthorse/classroom/versioning/git-box/agent-commit/agent-push/agent-switch SKILL.md, classroom's references, the agent docs (git-robot, doc-reviewer, course-researcher, breaking-change-detector), spec-check and saddler. Grep the live lead sentence (`is in play from when its`) for the closing inventory.

## Dependencies

- BLOCKS the copy-sweep: propagates in the migration wave with [plan-machinery-headings.md](plan-machinery-headings.md) / [plan-parent-child-vocab.md](plan-parent-child-vocab.md).
- Coupled to [plan-handover-template.md](plan-handover-template.md) — the handover variant preamble must stay visibly derived from the final text above; that plan is now unblocked.
- spec-check/saddler preamble sites are owned by [plan-spec-check-saddler.md](plan-spec-check-saddler.md).
