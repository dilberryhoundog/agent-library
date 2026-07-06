# Steps

A step is an **atomic, bounded, ordered unit of work** that breaks a task or outcome into a piece the agent can complete in one pass. Sized to encompass all the work the agent can manage at once; ordered to produce a flow that progressively orientates toward successful completion.

A step is built from swappable **slots**. Fill the slots the work needs and leave the rest out — start from an empty step and reach only for what the step calls for.

## Completion

<!-- steps philosophy:
must have completion criterion. checkable and exhaustive(comprehensive), to avoid premature completion.
drafthorse enables efficient encoding of completion, inherently checkable and easily exhaustive. preventing both premature completion and 
-->

Every step ends on a **completion criterion** — the condition that tells the agent the work is done. A criterion must be *checkable* (the agent can tell done from not-done) and *exhaustive* (it encompasses all the work).

DraftHorse uses the exits from a step to ensure completion (**Proceed**, **Return**, **End**). Only granting progress upon the success condition being satisfied and handling errors and failures. Ensures completion is both checkable and exhaustive.

## The Node

A step is declared as a node: `## +STEP NAME` (CAPS, `+` prefix, H2). Other steps reach it by its name with the `**-> +STEP**` jump. The nodes and their jumps form an explicit graph — every path through the document is wired, with no fall-through between steps. See [notation.md](notation.md) for the token forms.

## Slots

The slots a step can draw on. Each has a **shape** (its mechanical form) and a **contribution** (the job it does for the step). The catalogue is flat — slots are used where needed, in any combination.

- **Engagement** — Defines the *work* to be completed: Points towards references, Engages the agent with their atomic unit of work.

- **Agent Invariants (step-scoped)** — assert *rules* that bind only inside this step; the step-local counterpart to the global invariants in [scaffold.md](scaffold.md). They define the boundaries and ensures the work doesn't fail.

- **Breakout** — solution finder for dynamic or situationally dependent *work*: agent driven using their inherent knowledge.

- **Decision** — emits a *dynamic, multi-way* edge: Includes a mini-instruction ("choose your path from these…") to define the choice. bounded options that branch, provide the exit or the flow. States what is being decided and between what. Can land within the step or jump out of it, allowing multiple completable outcomes.

- **Proceed** — emits a *single* exit that advances to the next node; flow control carrying a completion criterion.

- **Return** — emits a *single* exit that loops back to or re-enters an earlier node; flow control carrying a completion criterion.

- **End** — terminates the step process and returns control to the caller; flow control carrying a completion criterion.

## Operators

The operators give the slots their control-flow behaviour. Notation gives their form (bold + CAPS); this is what each one does:

- **IF** / **WHEN** — guards: open a condition the agent evaluates before acting.
- **THEN** — consequence: the action or edge taken when the guard holds.
- **OR** / **AND** — inline combinators that join conditions.
- **END** — terminate: close the step process.
