# Plan: Preamble as Prose

Status: PART APPLIED. Source: issue #38, `filebox/steps-preamble-changes.md`; draft notation at `assets/SKILL-template.draft.md:45`.

## Decision

Steps preamble drops the quote block and bullet list. Becomes a plain paragraph in telegraphic register, directly under the `# --- STEPS ---` divider. Draft notation expands clause for clause. Nothing added.

Universal preamble, final text:

```markdown
Steps universal and standalone. Marked `## +<Step Name>`. Work, instructions, rules — self-contained. Invoke a step whenever its start conditions match. Step completes only when its finished conditions match. Multiple steps activate at once. Call every cited reference. References use markdown link notation.
```

Handover-variant preamble, final text:

```markdown
Handover holds child steps of a parent step. Marked `## +<Child Step Name>`. Same step rules apply, plus these. Parent step reads success from the state child steps leave behind. All child steps finished or inactive — return to the parent step and continue. Parent document covers error handling, unless an optional child problem step is present. Global invariants hold across the parent step's span. Step invariants confine to their own child step.
```

Settled points:

- **Two bullets dropped, not lost.** Old list carried "falls to the error drain step" and "multiple active steps, looping back, and dormant steps are all valid patterns". The step's own face absorbs both — error step describes itself where it stands, declared function states looping and dormancy per step (see [plan-step-functions.md](plan-step-functions.md)).
- **Handover bullet dropped from the universal text.** A handover states its own model. The universal document need not describe a document it may never load.
- **Variant points rather than repeats.** "Same step rules apply, plus these" reaches — a handover loads only through a parent carrying the universal preamble. Binds the two texts: edit one, check the pointer still covers its claim.
- **Invocation clause drops from the variant.** "Same step rules apply" covers it.
- **`## +<Step Name>` marking enters the preamble.** Absent from every previous version. A cold reader needs it before the first step.

## Work

- [x] `extensions/skills/drafthorse/assets/SKILL-template.md` — universal preamble replaced.
- [x] `extensions/skills/drafthorse/assets/HANDOVER-template.md` — variant preamble replaced.
- [x] `docs/drafthorse/framework/steps.md` — canonical copy in `## The steps preamble` replaced; variant paragraph rewritten. Old justification argued the variant exists because the universal preamble routes failures to an error drain — clause now gone, so the argument rests on what the variant adds.
- [x] `docs/drafthorse/framework/handover.md:58` — same correction, same reason.
- [ ] Copy-sweep: 16 documents across `extensions/` still carry the retired bullet list. Rides the corpus sweep, never alone.
- [ ] `assets/SKILL-template.draft.md` — decide whether the file survives now that its draft is spent.

## Hazards

- **Two preambles answer one grep.** The four classroom handovers respond to corpus-wide preamble searches and take the variant, not the universal text. A prior sweep gave them the wrong one; it had to be undone.
- **Prose drifts where a bullet list did not.** Pick one invariant sentence as the sweep handle. Keep it byte-exact across every site.

## Dependencies

- Corpus knowingly out of step with the framework until the sweep runs. `extensions/` carries the old bullet list; `steps.md` carries the new paragraph.
