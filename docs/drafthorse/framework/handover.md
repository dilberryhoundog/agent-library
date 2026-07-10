# Handover Documents

A **handover** is a standard DraftHorse document — invariants, references, steps, terms — carrying `type: handover` as its whole frontmatter, extracted from a parent document so that heavy, optional, or side-branching work does not bloat the parent's ordinary read. It is not a new primitive; it is a **document variant**, built from the same scaffold, notation, steps, and references as any skill, with the deltas this file names.

The name is the thesis. Where the skill is the harness the agent pulls in, a handover is a set of **sub-steps**: a bundle of steps, references, and invariants that a step — the **master step** — folds into the run at the moment it is needed, then the run carries on. A skill cites it inline like any reference; citing it *as a handover doc* is the progressive-disclosure trigger that tells the agent to follow the link and execute what it finds.

## Why extract one

Progressive disclosure is the whole point: a SKILL.md stays lean and pulls in supporting material only when a step reaches for it. A reference does this for **data**. A handover does it for **work** — step-shaped work that is too heavy to sit inline in the Steps segment, yet runs only sometimes, so folding it into the main flow would make every ordinary read pay for a path most runs never take.

The originating case: a five-step project bootstrap — a nested conditional, an interview, a judgment call — that runs once per project. Left in the skill's Steps it bloats every build; mis-filed as a reference it is embedded work masquerading as data. Extracted as a handover it is neither: a self-contained sub-procedure the one master step folds in when, and only when, a project needs setting up.

## The sub-step model

A handover is folded into the master document's run, not called across a boundary. Its steps run as **sub-steps of the master step**, and its references and invariants **come into play for the run** as if written into that step — with these consequences:

- **Globals join the master's global set.** A handover's Agent Invariants are in force for the whole run once it is folded in, alongside the master document's. They must therefore be *compatible everywhere*: no global may repeat one the master already states, and none may conflict with another anywhere in the set. Globals a handover adds that are its own (a contract it guarantees, a floor its work needs) are legitimate; duplicated or contradictory globals are the defect.
- **The master's references are citable.** The handover's own references are cited by its steps at their moment of use, as always. And because the handover runs inside the master document's context, it may cite the master's **ambient references by name** — a reference the master holds is in context, so the handover *cites it, never restates it* (single source of truth). Restating a convention the master already owns is the defect; naming it is correct. The direction is one-way: the master document never cites a handover's internal references, because they are not in context until the handover is folded in.
- **Tool grants come from the master.** A handover carries no `allowed-tools` and never widens the permission surface. Everything its steps do must already be covered by the master document's grants — the grants transfer to whatever executes the handover. A handover that needs a tool the master lacks is a defect in the pairing, surfaced against the master's permission set.
- **The master step owns the logic.** This is the load-bearing rule. A handover routes no success or failure of its own and hands back no named outcome. The master step reads success from the **resulting state** — its own finished condition observes what the handover left behind ("the classroom signal is now present") — and a failure **falls to the master document's problem step**, whose start condition claims it like any other unhandled situation. Everything the extraction leaves behind — deciding what to do on success, on failure, on a user's refusal — is the master step's business, stated once, in the master document.
- **The work fits inside the master step.** A handover's whole body of work must sit within the master step's start and finished criteria: the master step's start condition is what admits the fold-in, and its finished condition is what reads the state the handover leaves behind. The flow starts at the master step, runs the handover's steps, and ends back at the master step — nowhere else.

The model is a set of sub-steps, not a function call: there is no formal call/return signature, no parameter list, no return value. State flows through the shared context, and the master step's own conditions read it.

**One level only.** A handover must not fold in another handover. Work deep enough to want nesting has outgrown a handover — it belongs in its own skill, reached as an external call.

## Frontmatter — `type: handover` and nothing else

A handover's frontmatter is the single line `type: handover`. It carries no `name`, `description`, `allowed-tools`, or invocation surface — a handover is never reached by the user or by an autonomous model decision; it is reached only by a step that cites it. That one line is the **tell**: it is what flips a spec review into handover-audit mode, and what cues a citing agent that this file is followed and executed, not read as data.

With no `name`/`description`, identity moves into the body as an **identity paragraph**: a `# Title (Handover)` heading and one short paragraph stating what the handover does, when a master step folds it in, and — for the cold reader — that its steps/references/invariants come into play for the run, it leans on the master's grants and references, and it routes no success or failure of its own.

## Standalone

A handover **never names its master.** It is written to be folded into *any* step that needs its work, so it cannot know which one. It may lean on master-supplied references, but by *role or name*, not by pointing at the master document. This is what keeps it reusable and keeps a spec reviewer able to audit it on its own terms.

## Steps inside a handover

Step anatomy, conditions, and in-play semantics are unchanged (see [steps.md](steps.md)), and a handover opens its steps section with the same universal preamble as any document — the preamble's handover line is what tells a cold reader that exits and errors belong to the master step. Two differences follow from the sub-step model:

- **No required exit steps.** A skill needs a success exit (whose completion ends the run) and an error drain. A handover needs neither: when no handover step is left in play, control simply returns to the master step, and a failure falls to the master document's problem step. A handover *may* carry a local problem step to surface something to the user mid-work, but it owes the master no handback and needs no terminal success step whose only job is to report an outcome.
- **Conditions read the work, not a handback.** The last working step finishes on its own completion state; it does not add a step whose sole purpose is to name and return an outcome. The master step reads that state through its own finished condition.

## Extraction smells

The heuristic for a convert flow (and a spec reviewer's embedded-work audit) deciding whether a reference or a lump of steps is handover-shaped. No single smell decides it; they are weighed together:

- **Largish** — enough work that it likely wants breaking into several sub-steps of its own.
- **Optional** — off the main happy path; invoked only on certain runs.
- **Side-branching** — a detour off the main flow rather than a link in its chain.
- **Many invariants bound to the one body of work** — a cluster of rules all governing the same self-contained slice.
- **Minimal, distinct tool grants** — needs only a small, self-contained slice of the tool surface.

**Carve-out to the embedded-work check.** Step-shaped work living in a `references/` file is normally a defect (work masquerading as data). It is *not* a defect when the file declares `type: handover` — that file is a handover doc, audited as one, not as a reference.
