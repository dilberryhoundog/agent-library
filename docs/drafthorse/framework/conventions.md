# Conventions

<!-- +DRAFT:
Drafthorse conventions. agent harness document overlay. conventions underpin the spec.
-->
This collection of Conventions set the scene for drafthorse. Laws and idioms co-existing together, all equal. How much anyone weighs is decided in use, not ranked here.

<!-- +DRAFT: 
 drafthorse is for building. Leveraging markdown creating structure and organisation. Agent execution becomes natural and easy. Careful initial work creates longterm value.
-->

- **Building is difficult, so execution is easy** — DraftHorse is a builder's spec. It leverages standard markdown notation, but structures and organises it so that document execution is natural and easy for an agent. Careful crafting of a skill or executable document during creation ensures the longevity and efficiency of the tool over its lifetime.

<!-- +DRAFT: 
Self contained execution absent of drafthorse knowledge. 
Leans heavily on:
  - exisiting markdown notation.
  - consistent shape and formatting
  - seperation of concerns for harness documents
  - self documenting
-->

<!-- +++ -->

- **Single source of truth, everywhere** — every unit (invariant, step, reference, term) is standalone; no meaning or context is duplicated across units. One fact, one home, so a change is a one-place edit. (Exception: documents that never share context at run time — an orchestrator skill and its sub-agent — repeat what each needs; that duplication is deliberate and load-bearing.)

<!-- +DRAFT: 
Steps activate with start conditions. Release with finish conditions. next step found with start conditions. No routing needed. Stepping stones similarity. Steps mechansim is open.
  - loop back through alternative branches
  - Unlimited span. some steps longer than others. multiple active steps
  - dormant steps. activate irregularly when state matches
  - Support steps. handle specific states. reduces burden on other steps
  - Handover steps. Call in child steps when active. resolves child with finish conditions. child global scope not necessary. Parent handles.
-->

- **Stepping stones** — Every step watches its own start condition for when it activates. A step then releases on its finished condition, the next step catches the agent using its start condition. There is no need for interstep routing, imagine the agent is stepping across a river on stepping stones. *Suggested next actions* is an optional pointer, showing the agent where to look next if necessary. This mechanism is deliberately open. it means...
    - An agent can loop back through the skill re-running different branches, as long as the conditions hold.
    - A step can span longer than others. Multiple steps can be in play at once.
    - Steps can be dormant, activating only to handle specific states that might not always be present.
    - A step can support others (eg activating to catch a failure another step cannot resolve), leaving that step to focus on its jobs instead of handling every state it might produce.
    - A step can handover to another executable document when it activates and then resolve the conditions for when the handover finishes.

<!-- +DRAFT: Preserve (previous steps conventions)
- **Steps are universal** — every step watches its own start condition at all times, so steps need not chain and more than one can be in play at once. A child step repeats while its controlling step is still in play; an error step starts before the step that produced the error has finished, or knows of it; a step whose start condition never comes true lies dormant, covering the rare case or the branch without disturbing the run.
- **Conditions carry routing** — a step releases on its finished condition, the next catches on its start; no interstep routing exists; *Suggested next actions* is an optional pointer, not the mechanism. 
-->

<!-- +DRAFT: 
Error step handles problems. known and unkown. lean and simple steps become job focused. Error step handles the remainder. resolves skill if other steps condition fails
  - Unrecoverable; unfinished, destructive, problem states. immediate exit and fix with user. clean slate; restart skill; skill not needed.
  - Recoverable; pre-known, non-destructive states. Error step guides internal resolution. 
-->

- **The error step** — Steps claim their conditions: coverage is subtractive, not enumerative. The Error step helps the agent resolve the skill, if the other steps don't handle the current state. It does this two ways...
    - **Hard bail and clean up** — This is for the unrecoverable errors with; unfinished, destructive or problem states. The agent is instructed to interactively fix the problem with the user ending the skill or execution. The skill can then be safely re-run or be no longer required after the agent has fixed the state.
    - **Claim the remainder** — The error step can guide the agent on how to resolve the skill if no other step handles the recoverable state. The remainder needs to be actively described to distinguish it from the Hard bail.

<!-- +DRAFT: Preserve
- **The error step claims the remainder** — coverage is subtractive, not enumerative: steps claim their conditions, and one error step claims everything else, so no state is unhandled by construction. The test: does the document have a step whose start condition is "no other step covers this"? (Executor documents may fold the drain into their reporting step — see [Steps](steps.md).) 
-->

<!-- +DRAFT: 
References are static data only. No work or actions.
- Inline = compact and always needed. External = expansive and irregular
- Headings are references. Short unique names not explanation headings. Explanations under the heading.
- Always markdown links or harness tools. agent has natural markdown understanding. 
- call references inline, where needed.
-->

- **References all data, no work** — the References utility holds constants, maps, formats, and facts; the work the agent conducts belongs in steps instead. The interpreter is an agent, so small self-contained logic inside a reference still executes — but when a reference grows ordered actions or branching, that content is asking to be a step. Consider these when building references...
    - **Inline vs external** — compact and always-relevant context goes inline in the main document; expansive and sometimes-relevant context goes external, called in on demand.
    - **Naming, not Explaining** — markdown headings are references too, callable as internal link targets: a heading explaining or duplicating itself makes an unlinkable anchor. Keep every heading a short, uniquely named (within the document). Explain the heading in a short line directly under it if you need to.
    - **Cite references at the moment of use** — a reference matters at a moment, not at a step. Point at it inside the sentence that needs it, or inside conditions to make it binding ("…every rule in X applied").

<!-- +DRAFT: Preserve 
- **References carry data, steps carry work** — the References utility holds constants, maps, formats, and facts; the work lives in steps. This is conceptual guidance, not a hard restriction — the interpreter is an agent, so small self-contained logic inside a reference still executes — but when a reference grows ordered actions or branching, that content is asking to be a step. 
-->

<!-- +DRAFT: Remove (included in `Stepping stones`)
- **A handover fits its parent step** — a handover's work sits wholly inside the start and finished criteria of the parent step that folds it in: the start condition admits the fold-in, the finished condition reads the state the handover leaves behind, and the flow ends back at the parent step. (See [Handover](handover.md).) 
-->
<!-- +++ -->

- **Sharp Prose** — Agent decision burden is reduced using DraftHorse. Keep prose sharp and to the point. Do not use:
    - *Why* — Agents don't need to know "why" they need to do something if they have been given adequate DraftHorse guardrails / funnels.
    - *Unreachable Meanings* — Context evident in the current session, but confusing outside. Future readers cannot reach the session-specific meanings.
    - *Negative mirrors* — a negative restated after a positive affirmation. Says the same thing but in reverse.
    - *No-op* — Restating what an agent already does by default. Sharp prose changes behaviour.

<!-- +DRAFT: Remove (included in references super convention)
- **Naming, not Explaining** — headings are link targets: an explaining heading makes an unlinkable anchor, a duplicated heading an ambiguous one. Keep every heading a short, unique name (unique within its document); the explanation can go in a short line directly under it.
-->
<!-- +++ -->

- **Dynamic Improvement** — Encourage agents using the skill to directly upload issues to the `agent-library` repo. A later reviewing and repair agent can integrate fixes from usage "live in the wild". Agents should reveal their troubles, not propose solutions.

<!-- +DRAFT: Preserve (migrate to instructions)
- **Conditions are checkable and exhaustive** — a step's *start* and *finished* conditions carry the routing, so each must be checkable (not ambiguous) and the finished condition exhaustive (exacting entry and exits, with no gaps).
- **Gates are compound** — a gate's finished conditions state the artifact's own completion criteria alongside the user's approval.
- **Skill Description is invocation-shaped** — a model-invoked document takes an agent-facing description that sells the usage and states its trigger conditions; a user-invoked document takes a short user-facing summary, kept out of agent context. Write each frontmatter field for whoever actually reads it. 
-->

<!-- +DRAFT: Remove
- **Cite references at the moment of use** — a reference matters at a moment, not at a step. Point at it inside the sentence that needs it ("map each commit using the table in …"), or inside the finished condition to make it binding ("…every rule in X applied").
- **Inline vs external references** — compact and always-relevant context goes inline; expansive and sometimes-relevant context goes external. 
-->
