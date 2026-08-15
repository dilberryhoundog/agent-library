# Conventions

These conventions are an overlay on the agent harness document. They underpin the spec.

- **Building is difficult, so execution is easy** — DraftHorse is a builder's spec. It leverages standard markdown notation, but structures and organises it so that document execution is natural and easy for an agent. Careful crafting of a skill or executable document during creation ensures the longevity and efficiency of the tool over its lifetime.

- **Executable without DraftHorse knowledge** — an agent runs the document cold, holding nothing but the document and its own markdown literacy. Four things carry that weight...
    - **Existing markdown notation** — the document invents no syntax of its own; headings, lists, links and emphasis do the structural work.
    - **Consistent shape** — every document is formatted alike, so an agent that has run one runs the next without relearning.
    - **Separation of concerns** — each utility of a harness document answers one kind of question, and holds nothing belonging to another.
    - **Self documenting** — the structure announces what it is. Machinery headings, step names and term lists tell the reader how to read them.

- **Single source of truth, everywhere** — every unit (invariant, step, reference, term) is standalone; no meaning or context is duplicated across units. One fact, one home, so a change is a one-place edit. (Exception: documents that never share context at run time — an orchestrator skill and its sub-agent — repeat what each needs; that duplication is deliberate and load-bearing.)

- **Stepping stones** — Every step watches its own start condition for when it activates. A step then releases on its finished condition, the next step catches the agent using its start condition. There is no need for interstep routing, imagine the agent is stepping across a river on stepping stones. This mechanism is deliberately open. it means...
    - An agent can loop back through the skill re-running different branches, as long as the conditions hold.
    - A step can span longer than others. Multiple steps can be in play at once.
    - Steps can be dormant, activating only to handle specific states that might not always be present.
    - A step can support others (eg activating to catch a failure another step cannot resolve), leaving that step to focus on its jobs instead of handling every state it might produce.
    - A step can handover to another executable document when it activates and then resolve the conditions for when the handover finishes.

- **The error step** — Steps claim their conditions: coverage is subtractive, not enumerative. The Error step helps the agent resolve the skill, if the other steps don't handle the current state. It does this two ways...
    - **Hard bail and clean up** — This is for the unrecoverable errors with; unfinished, destructive or problem states. The agent is instructed to interactively fix the problem with the user ending the skill or execution. The skill can then be safely re-run or be no longer required after the agent has fixed the state.
    - **Claim the remainder** — The error step can guide the agent on how to resolve the skill if no other step handles the recoverable state. The remainder needs to be actively described to distinguish it from the Hard bail.

    The test for subtractive coverage: does the document carry a step whose start condition is "no other step covers this"?

- **References all data, no work** — the References utility holds constants, maps, formats, and facts; the work the agent conducts belongs in steps instead. The interpreter is an agent, so small self-contained logic inside a reference still executes — but when a reference grows ordered actions or branching, that content is asking to be a step. Consider these when building references...
    - **Inline vs external** — compact and always-relevant context goes inline in the main document; expansive and sometimes-relevant context goes external, called in on demand.
    - **Naming, not Explaining** — markdown headings are references too, callable as internal link targets: a heading explaining or duplicating itself makes an unlinkable anchor. Keep every heading a short, uniquely named (within the document). Explain the heading in a short line directly under it if you need to.
    - **Cite references at the moment of use** — a reference matters at a moment, not at a step. Point at it inside the sentence that needs it, or inside conditions to make it binding ("…every rule in X applied").
    - **Cite with links or harness tools** — every citation is a markdown link or a harness tool call. An agent reads markdown natively, so a linked reference resolves without further instruction.

- **Sharp Prose** — Agent decision burden is reduced using DraftHorse. Keep prose sharp and to the point. Do not use:
    - *Why* — Agents don't need to know "why" they need to do something if they have been given adequate DraftHorse guardrails / funnels.
    - *Unreachable Meanings* — Context evident in the current session, but confusing outside. Future readers cannot reach the session-specific meanings.
    - *Negative mirrors* — a negative restated after a positive affirmation. Says the same thing but in reverse.
    - *No-op* — Restating what an agent already does by default. Sharp prose changes behaviour.

- **Dynamic Improvement** — Encourage agents using the skill to directly upload issues to the `agent-library` repo. A later reviewing and repair agent can integrate fixes from usage "live in the wild". Agents should reveal their troubles, not propose solutions.
