# DraftHorse Framework — Planning Doc

Scope: `docs/drafthorse/framework/` (README.md, notation.md, scaffold.md, steps.md, references.md, conventions.md) and `docs/drafthorse/template/SKILL.md`. This document goes first: its decisions cascade into the git-box, verb-skills, and versioning plans, which each carry a "Depends on" pointer back here.

## Proposed Changes

1. **Finish the completion philosophy in steps.md** — (no explicit ruling given; treated as approved as written — veto here if not) `steps.md:9-12` holds a draft HTML comment whose final sentence cuts off ("preventing both premature completion and"). The surrounding prose (lines 14–16) already covers most of it but is rough ("Ensures completion is both checkable and exhaustive" is a fragment). Fix: delete the comment and rewrite the Completion section as two clean paragraphs — (a) every step ends on a checkable, exhaustive criterion; (b) the exit slots (Proceed, Return, End) are the mechanism that encodes the criterion, granting progress only when the success condition holds and routing errors explicitly, which prevents both premature completion and silent failure.

2. **Remove the stray block from the template** — `template/SKILL.md:107-132` repeats a step skeleton after the `# --- TERMS ---` section, outside the document frame. Fix: delete lines 107–132 entirely. If any of its content is wanted (the "Decide between these options:" mini-instruction line in the Decision slot is slightly better than the body's version), merge that one line into the body's Decision comment first.

3. **Unify the step-scoped invariant heading** — the template body uses `#### Agent Invariants` (line 48), the stray block uses `#### Step Invariants` (line 109), scaffold.md/steps.md call the concept "Agent Invariants (step-scoped)", and the versioning skill uses `#### Step Invariants`. Fix: pick one name (see Decisions), state it in notation.md's structural tokens, and use it in the template. Ripple: sweep in the git-box, verb-skills, and versioning plans.

4. **Canonise one jump token** — notation.md defines `**-> +STEP**` but no real document uses it: versioning writes `` `--> +PREFLIGHT` `` (backticks, two dashes), git-box and the verb skills write prose ("Proceed to `+RESULT`"), and the git-box brief format uses `-->` as a procedure prefix, overloading the arrow. Fix: pick one token (see Decisions), define it as the only jump form in notation.md, and demonstrate it in the template. If `-->` is not chosen for jumps, note in notation.md that `-->` remains free for data formats like the brief. Ripple: sweep in all three skill plans.

5. **Redefine the exit-slot semantics to match good usage** — steps.md defines Return as strictly "loops back to or re-enters an earlier node" and Proceed as emitting "a *single* exit", but the strongest real documents (the verb skills) consistently use Return as the abnormal/early-exit path (including forward jumps to a result step and END edges) and Proceed as the success path, sometimes with multiple guarded edges. Fix (pending Decisions): rewrite the three exit-slot entries in steps.md — **Proceed** = the success path forward, one or more guarded edges; **Return** = the non-success path: loop back, bail forward to a terminal/reporting step, or surface to the user; **End** = terminate and hand control back to the caller. Keep the rule that every edge carries a condition. Ripple: the other three plans then fix only genuine violations (dangling edges) rather than rewiring every Return.

6. **Document the invariant keyword family as open, and rule on `**Message**:`** — notation.md lists `DO NOT / ALWAYS / NEVER …` but real documents also use `ENSURE`, `USE`, `ONE`. Fix: state explicitly that the invariant form is an open family — any bolded imperative keyword followed by its rule — with `DO NOT / ALWAYS / NEVER` as the core set. Separately, git-box uses `**Message**:` as a pseudo-operator (a THEN that talks to the user); either canonise it in notation.md as a THEN variant or deprecate it in favour of `**THEN**: inform the user …` (see Decisions).

7. **Resolve the "no logic in references" tension** — RULED: "no logic in references" is conceptual guidance, not a hard restriction — the interpreter is an agent, so small self-contained logic inside a reference still executes correctly. Fix: soften the conventions.md entry to state the preference (references carry data; logic belongs in steps) while acknowledging inline logic is tolerated where it reads naturally. The unconverted external files (versioning's setup-instructions.md, release-process.md) are simply pre-DraftHorse and will be converted in a standalone session — not evidence of a framework gap.

8. **Add a shared-glossary convention for multi-document sets** — REJECTED: the orchestrator skill and the sub-agent never share context (the agent cannot see git-box's Terms at run time), so the duplication is deliberate and load-bearing. No conventions.md entry; each document keeps its own full Terms. Only the shared typo gets fixed (git-box plan proposal 6).

9. **Tidy notation.md's END entry** — END appears as an operator (notation.md, steps.md), a slot name (steps.md), and in the wild as `**END**:` with a colon (git-box) and `**END**` mid-sentence (versioning). Fix: state one written form (recommend `**END**` bare, as the terminal consequence of a WHEN/IF guard) and note that the End slot is the section that houses it.

10. **Template hygiene** — after the above land: the frontmatter `allowed-tools` line mixes a real value with an HTML comment awkwardly (`template/SKILL.md:9`); make it a comment-only placeholder. Ensure the template demonstrates the canonical jump token, the chosen invariant heading, and one example of each exit slot under the new semantics.

## Decisions

1. **Jump token** — options: (a) `**-> +STEP**` per current notation.md; ~~(b) backticked `` `--> +STEP` `` as versioning uses; (c) prose "Proceed to `+STEP`".~~ Recommendation: (a) — it is scannable under the bold+CAPS execution rule, visually distinct from the brief's `-->` data prefix, and already the documented form.

2. **Return/Proceed semantics** — RESOLVED: option (a) — Return = non-success exit including forward bails, Proceed = success path, both may carry multiple guarded edges. The framework tolerates the existing verb-skill orientations (a Proceed edge that carries a failure to the next node is still a valid forward edge); no rewiring sweep, only notation.

3. **External procedure files** — RESOLVED: keep the framework as is; no new primitive. "No logic in references" is conceptual guidance per proposal 7's ruling, and the unconverted files get a DraftHorse conversion in a standalone session (see versioning-plan proposal 6).

4. **Step-scoped invariant heading** — options: (a) `#### Step Invariants`; ~~(b) `#### Agent Invariants`~~. Recommendation: (a) — it distinguishes step scope from the global `# Agent Invariants` section at a glance, which is the whole point of the heading.

5. **`**Message**:` token** — options: (a) deprecate, rewrite as `**THEN**: inform the user …`; ~~(b) canonise as a THEN variant meaning "the consequence is a user-facing message, not a jump".~~ Recommendation: (a) — one consequence operator keeps the vocabulary minimal; the message is just what the THEN does.

6. **Document the invariant keyword family as open**
   Implement the proposed fix.

## Guidance

> Add any further direction below; it will be honoured over the recommendations above.

- External Procedure Files: we haven't diverged from the framework here. these files where just not converted over yet. This work should probably be completed in a standalone session, due to the scale of the work.
- END notation: I have converted versioning to use `**END**` instead of **THEN** to break out of the skill. this will be the convention. we can have this in a specific end slot or other appropriate slot.
- shared glossary: is a good idea but probably too much overhead. I think this is inplace because the agent and the main session skill do not see the same context so we have to repeat.
- #2 done
- #3 'step invariants' make the changes
- #5 good changes, check the other sections changes / planning updates before attempting these changes.
- #10 yes we can circle back after all 4 plans are finished.
