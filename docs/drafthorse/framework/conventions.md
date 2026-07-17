# Conventions

The other layers say what the tools are; conventions say how to wield them well. Laws and idioms together, all equal. how much any one weighs is decided in use, not ranked here.

- **Single source of truth, everywhere** — every unit (invariant, step, reference, term) is standalone; no meaning or context is duplicated across units. One fact, one home, so a change is a one-place edit. (Exception: documents that never share context at run time — an orchestrator skill and its sub-agent — repeat what each needs; that duplication is deliberate and load-bearing.)
- **Conditions are checkable and exhaustive** — a step's *start* and *finished* conditions carry the routing, so each must be checkable (not ambiguous) and the finished condition exhaustive (exacting entry and exits, with no gaps).

<!-- TODO: Needs sharpening, not really a sharp definition this quote is more suitable for mining to fix this.

"Steps conditions are the source of truth. They decide when and where to enter and successfully exit the step. Interstep routing is not needed the next step "Start" should catch the agent once they complete the previous steps "finished". "Do this next" is an optional lightweight pointer. not needed for obvious release -> catch step mechanics. "

- **Steps are standalone** — a step names another step only in its *do this next* slot; conditions are written in state terms, never step terms; finished conditions carry only their own step's completion criteria. The test: delete every other step — does this one still read whole?
-->

<!-- TODO: New convention
Steps are universal: Steps are only controlled by their start and finished conditions, this means more than one step can be "In Play" at once. This allows:
- Loopbacks. (sub) steps can be repeated if a controller step is still active (in play)
- Error catching. Error handler step can start, even if error producer step has not finished, or "knows" about the error.
- Inert step unless start condition is met. handles edge / rare cases or branching inside the skill.
-->

- **Start conditions exclude half-applied states** — a start condition that still holds after its step failed partway invites a destructive re-run. Phrase it to exclude work already partially done, handing the half-applied state to the error step. (See [steps.md](steps.md).)

<!-- TODO: Needs sharpening, what does this even mean?
- **Gates are compound** — a step that presents an artifact for approval finishes on the user's approval *and* the artifact's own substantive conditions, never approval alone. The test: could a rubber-stamp launder a defective artifact past this condition?
-->

- **The error step claims the remainder** — coverage is subtractive, not enumerative: steps claim their conditions, and one error step claims everything else, so no state is unhandled by construction. The test: does the document have a step whose start condition is "no other step covers this"? (Executor documents may fold the drain into their reporting step — see [steps.md](steps.md).)
- **The error step claims the remainder** — coverage is subtractive, not enumerative: steps claim their conditions, and one error step claims everything else, so no state is unhandled by construction. (Executor documents may fold the drain into their reporting step — see [steps.md](steps.md).)


- **References carry data, steps carry work** — the data segment holds constants, maps, formats, and facts; the work lives in steps. This is conceptual guidance, not a hard restriction — the interpreter is an agent, so small self-contained logic inside a reference still executes — but when a reference grows ordered actions or branching, that content is asking to be a step.
- **A handover fits its master step** — a handover's work sits wholly inside the start and finished criteria of the master step that folds it in: the start condition admits the fold-in, the finished condition reads the state the handover leaves behind, and the flow ends back at the master step. (See [handover.md](handover.md).)
- **Cite references at the moment of use** — a reference matters at a moment, not at a step. Point at it inside the sentence that needs it ("map each commit using the table in …"), or inside the finished condition to make it binding ("…every rule in X applied").
- **Skill Description is invocation-shaped** — a model-invoked document takes an agent-facing description that sells the usage and states its trigger conditions; a user-invoked document takes a short user-facing summary, kept out of agent context. Write each frontmatter field for whoever actually reads it.
- **Inline vs external references** — compact and always-relevant context goes inline; expansive and sometimes-relevant context goes external.

<!-- TODO: Replace with "Sharp Prose"
Agent decision burden is reduced using drafthorse. Keep prose sharp and to the point. 
Do not use:
- **Why** — Agents don't need to know "why" they need to do something if they have been edaquate drafthorse guidrails / funnels.
- **Unreachable Meanings** — Context evident in the current session, but confusing outside. Future readers cannot reach the session specific meanings.
- **Negative mirrors** — negative restated after a positive affirmation. Says the same thing but in reverse.
- **No-op** — Restating what an agent already does by default. Sharp prose changes behaviour.

- **Remove no-ops** — never restate what the agent already does by default. The test for every line: does it change behaviour? If not, cut it.
-->

<!-- TODO: New convention
**Naming, not Explaining**: All headings should remain short and unique, to enable efficent link text attribution. No explanations in headings, these can go in a short explanatory line directly under the heading. 
Naming not explaining.

-->

- **Dynamic Improvement** — Encourage agents using the skill to directly upload issues to the `agent-library` repo. A later reviewing and repair agent can integrate fixes from usage "live in the wild". Agents should reveal their troubles, not propose solutions.

- **Sub Agents** — Agents operating in side loaded sessions are the optimal drafthorse environment. Keeps main conversation fresh and impactful, with side loaded agents doing light to medium supporting tasks with drafthorse.
