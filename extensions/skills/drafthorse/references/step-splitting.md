# Step Splitting

How to find the step edges in a lump of work. A step is an atomic, bounded unit the agent completes in one pass; the map is right when every step has one job, one finished condition, and the set covers the whole task.

## Where the edges are

Cut a step boundary wherever one of these occurs:

- **A user-interaction boundary** — every "wait for the user" (a gate, a clarification, an approval) ends a step: the finished condition is "the user has responded". The work before the wait and the work after it are different steps.
- **A loop body** — per-item work (per unit, per action, per file) is its own step whose start condition re-holds for each item; the loop needs no other structure.
- **A distinct completion state** — when part of the work produces a checkable state the rest builds on (a computed range, a written config, a verified release), that state is a step's finished condition.
- **A permission or context shift** — work that needs different tools, grants, a sub-agent, or freshly loaded external context marks an edge.
- **A judgment shift** — mechanical execution and open judgment sit badly in one step; separate the derivation from the decision.
- **A spanning concern** — steps can be in play concurrently, so a concern that must persist across several pieces of work (an invariant that holds for a whole span, a watch on a background task, an orchestration loop over items) is its own step: it starts before the inner work, stays in play while the inner steps start and finish, and finishes when the span's outcome is met. Its invariants bind for its whole open duration — no duplicating the rule into each inner step.

## Sizing

Prefer fewer, larger steps over many small ones — a step is sized to all the work the agent can manage in one pass, not to one command. Split only at the edges above; a sequence of commands with a single completion state is one step. Two smells: over-splitting — consecutive steps whose start conditions are just "the previous step finished"; and premature closing — a step that finishes only so the next one can start, while its concern still applies (a wait, a held rule, an open loop). The fix for the second is not merging the steps but leaving the spanning step in play.

## Handover extraction

Some step-shaped work belongs in the map but not in the document: heavy or occasional work that would bloat every ordinary read of the skill. Extract it as a **handover doc** — a separate `references/` file whose frontmatter is the single line `type: handover`, holding its own steps, references, and invariants. A **master step** in the main document folds it in at the moment of use ("follow `references/X.md` as a handover doc"), its steps run as sub-steps of that master step, and the run carries on.

The smells that mark a candidate (or a lump of steps) as handover-shaped — no single one decides it; weigh them together:

- **Largish** — enough work that it likely wants breaking into several sub-steps of its own.
- **Optional** — off the main happy path; invoked only on certain runs.
- **Side-branching** — a detour off the main flow rather than a link in its chain.
- **Many invariants bound to the one body of work** — a cluster of rules all governing the same self-contained slice.
- **Minimal, distinct tool grants** — needs only a small, self-contained slice of the tool surface.

Shaping a handover, hold its deltas from a skill:

- **Frontmatter is `type: handover` and nothing else** — no `name`, `description`, `allowed-tools`, or invocation surface. Identity moves into the body: a `# Title (Handover)` heading and one identity paragraph stating what it does, when a master step folds it in, and that it routes no success or failure of its own.
- **No required exit steps** — no success exit, no error drain, no handed-back outcome. Control returns to the master step when no handover step is left in play; a failure falls to the master document's problem step. The master step's own finished condition reads success from the state the handover leaves behind.
- **Never names its master** — written to be folded into any step that needs it; it may cite the master's ambient references by name (never restating them), but the master never cites the handover's internal references.
- **Grants come from the master** — everything the handover's steps do must be covered by the main document's `allowed-tools`.
- **One level only** — a handover must not fold in another handover; work that deep belongs in its own skill, reached as an external call.

## Every map carries

- **A success exit** — a terminal step whose start condition is "all the work is finished", stated exhaustively (every item processed, declined, or reported empty), and whose body reports the outcome.
- **An error step** — start condition "something has gone wrong, or a situation has arisen that no other step covers"; the drain that makes coverage subtractive. Executor documents whose reporting step already surfaces failures may fold the drain into that step instead — state it in the start condition.
- **Purpose lines** — every step opens with a one-line statement of what it does; it is the step's identity when scanning.

## Decisions

A Decision section belongs inside a step only for a genuine bounded choice — the work forks and both forks are this step's business. Written as plain prose: what is being decided, between what, and by what signal. Routing between steps is never a Decision — that is what start conditions (and a step's optional *do this next* guidance) do.

## Placing the references

For each step, name the references it operates on and the moment each is needed — the map should show reference placement before drafting begins (in an illustrative release skill: "the propose step uses the bump-mapping table while deriving, the changelog format while drafting"). A reference no step cites is dead weight; a step citing no reference may be missing its data.
