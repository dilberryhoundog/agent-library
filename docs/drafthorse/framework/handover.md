# Handover Documents

A **handover** is a standard DraftHorse document — invariants, references, steps, terms — carrying `harness-format: DraftHorse, Handover` as its whole frontmatter. It sits in the skill's root folder, a sibling of the main skill file, its filename ending `-handover`.
Extracted from a parent document so that heavy, optional, or side-branching work does not bloat the parent's ordinary read.
Handovers are a **drafthorse document variant**, built from the same scaffold, notation, steps, and references as any drafthorse skill.

The name describes the process. The main skill is the working location, a handover is a set of **child steps** the agent pulls in to help complete the skill.
Conceptualised as a bundle of steps, references, and invariants that a step — the **parent step** — folds into the run at the moment it is needed, then the run carries on. A skill cites it inline using `Handover notation`; citing it is the progressive-disclosure trigger that tells the agent to follow the link and execute what it finds.

## Why extract one

Progressive disclosure: a SKILL.md stays lean and pulls in supporting material only when a step reaches for it. Work too heavy to sit inline in the Steps utility, or runs only sometimes, so keeping it from the main flow prevents paying tokens for heavy, intermittent work.

Common use cases:

- Setup processes only called once.
- Large branching, the main skill operates as the orchestrator.
- Bulky work items, that is not essential for every run.

## The child-step model

A handover is folded into the parent document's run, not called across a boundary. Its steps run as **child steps of the parent step**, and its references and invariants **come into play for the run** as if written into that step — with these consequences:

- **Globals are scoped to the parent step.** A handover's Agent Invariants are in force across the parent step's span — from the parent document's side, they read as a step invariant on the parent step, and they lapse when it does. They do not bind steps that never touch the handover. Compatibility is therefore a local question: a handover's globals must not repeat or conflict with the parent document's globals, or with the parent step's own invariants — and two handovers folded in at different steps never meet, so they cannot conflict. Globals a handover adds that are its own (a contract it guarantees, a floor its work needs) are legitimate; duplicated or contradictory globals are the defect. A parent that needs a handover's floor for its own later steps states that floor itself rather than inheriting it invisibly.
- **The parent's references are citable.** The handover's own references are cited by its steps at their moment of use, as always. And because the handover runs inside the parent document's context, it may cite the parent's **ambient references by name** — a reference the parent holds is in context, so the handover *cites it, never restates it* (single source of truth). Restating a convention the parent already owns is the defect; naming it is correct. The direction is one-way: the parent document never cites a handover's internal references, because they are not in context until the handover is folded in.
- **Tool grants come from the parent.** A handover carries no `allowed-tools` and never widens the permission surface. Everything its steps do must already be covered by the parent document's grants — the grants transfer to whatever executes the handover. A handover that needs a tool the parent lacks is a defect in the pairing, surfaced against the parent's permission set.
- **The parent step owns the logic.** This is the load-bearing rule. A handover routes no success or failure of its own and hands back no named outcome. The parent step reads success from the **resulting state** — its own finished condition observes what the handover left behind ("the classroom signal is now present") — and a failure **falls to the parent document's problem step**, whose start condition claims it like any other unhandled situation. Everything the extraction leaves behind — deciding what to do on success, on failure, on a user's refusal — is the parent step's business, stated once, in the parent document.
- **The work fits inside the parent step.** A handover's whole body of work must sit within the parent step's start and finished criteria: the parent step's start condition is what admits the fold-in, and its finished condition is what reads the state the handover leaves behind. The flow starts at the parent step, runs the handover's steps, and ends back at the parent step — nowhere else.

The model is a set of child steps, not a function call: there is no formal call/return signature, no parameter list, no return value. State flows through the shared context, and the parent step's own conditions read it.

**One level only.** A handover must not fold in another handover. Work deep enough to want nesting has outgrown a handover — it belongs in its own skill, reached as an external call.

## Handover Location and Naming

A handover file sits in the skill's root folder, a sibling of the main skill file, and its name ends `-handover` — `<skill>/setup-handover.md`. The root placement ranks it as a peer of the skill file and a subtype of it, which is what it is; the suffix makes the whole set discoverable by glob (`*-handover.md`) rather than only through the citations that reach them.

A handover therefore carries **three agreeing signals**: the stamp's `Handover` subtype, the `-handover` suffix, and the root location. A mismatch between any two is a defect.

**NEVER** file a handover in `references/`. That folder holds data; a handover is work, and placing it there mis-signals it as context to consult rather than steps to run.

## Frontmatter

A handover's frontmatter is the single line `harness-format: DraftHorse, Handover` — the stamp names the format and the subtype, and is the document's whole declaration. It carries no `name`, `description`, `allowed-tools`, or harness facing invocation surface — a handover is never reached by the user or by an autonomous model decision; it is reached only by a step that cites it.

With no `name`/`description`, identity moves into the body as an **identity paragraph**: a `# Title (Handover)` heading and one short paragraph stating what the handover does and when a parent step folds it in. The `(Handover)` in the heading is plain identity for whoever has the file open; the three signals are what a spec-check verifies.

## Document Reviews

The location, naming, and referencing conventions of handover documents allow agents reviewing the main skill for spec compliance, to also walk through the handover files. This enables reviewing the skill for drafthorse compliance across all surfaces. Ensure any reviewer agents know the conventions, to enable handover walking.

## Standalone

A handover **never names its parent step.** It is an atomic piece of work, with self-contained DraftHorse utilities. It does operate however under the main skills utilities and is therefore subject to them. This keeps it reusable and keeps a spec reviewer able to audit it on its own terms.

## Steps inside a handover

Step anatomy, conditions, and in-play semantics are unchanged (see [Steps](steps.md)). A handover opens its steps section with the **handover-variant preamble**, not the universal one. The variant points back at the universal rules — a handover only ever loads through a parent that carries them — then states what is true here and nowhere else: child steps of a parent step, control returning to the parent, error handling owned by the parent document, globals holding across the parent step's span. Both preambles are legitimate; a document is read against the one that fits it. [HANDOVER-template.md](../../../extensions/skills/drafthorse/assets/HANDOVER-template.md) carries the canonical variant text and is the creation path for a new handover.

Two differences follow from the child-step model:

- **No required exit steps.** A skill needs a success exit (whose completion ends the run) and an error drain. A handover needs neither: when no handover step is left in play, control simply returns to the parent step, and a failure falls to the parent document's problem step. A handover *may* carry a local problem step to surface something to the user mid-work, but it owes the parent no handback and needs no terminal success step whose only job is to report an outcome.
- **Conditions read the work, not a handback.** The last working step finishes on its own completion state; it does not add a step whose sole purpose is to name and return an outcome from the handover. The parent step reads that state through its own finished condition.

## Extraction smells

The heuristic for a convert flow (and a spec reviewer's embedded-work audit) deciding whether a reference or a lump of steps is handover-shaped. No single smell decides it; they are weighed together:

- **Largish** — enough work that it likely wants breaking into several steps of its own.
- **Optional** — off the main happy path; invoked only on certain runs.
- **Side-branching** — a detour off the main flow rather than a link in its chain.
- **Many invariants bound to the one body of work** — a cluster of rules all governing the same self-contained slice.
- **Minimal, distinct tool grants** — needs only a small, self-contained slice of the tool surface.

**The embedded-work check has no carve-out.** Step-shaped work living in a `references/` file is a defect — work masquerading as data. A handover is the sanctioned way to extract that work, and a handover is never a reference: it is stamped, suffixed, and sits at the root, where it is audited as a handover. A stamped file in `references/` is not an exempt handover; it is a handover in the wrong place, and the mismatch between its signals is the defect.
