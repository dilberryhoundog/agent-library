# Scaffold

The scaffold is the fixed frame every DraftHorse document shares: five utilities, always present, always in this order. The document's utilities are intuitive so that they need not be expressed to a new reader — frontmatter declares the document, invariants bound it, references feed it, steps run it, terms define it.

## DraftHorse Utilities

1. **Frontmatter** — required by agent harnesses: identity, permissions, invocation surface. Sets up what the document is and what it may do, before any of its prose runs.
2. **Agent Invariants (global)** — rules that hold across the whole document, every step, no exceptions.
3. **References** — constants, maps, formats, context. Patterns (static vs dynamic) are catalogued in [References](references.md).
4. **Steps** — the working body: self-contained units, each declaring when it starts and when it is finished, opened by the steps preamble. The anatomy is catalogued in [Steps](steps.md).
5. **Terms** — the glossary that keeps a multi-document set speaking one language.

## Frontmatter

Frontmatter wires the document before any of its prose runs. Four concerns live here:

- **Format stamp** — `harness-format: DraftHorse`, casing exact. Declares the document a DraftHorse document, and is what a reader or auditor searches on to find them. It sits alongside the harness's own fields rather than replacing any of them; **DO NOT** strip it as a foreign key.
- **Identity** — `name` and `description`. The description is written for the specific audience the document is intended for (see the *invocation-shaped description* convention).
- **Permissions** — `allowed-tools`. Grants transfer at the moment of invocation, so a step that calls a child skill or a sub agent delivers permissions where they are needed rather than holding them globally (see [Surfaces](surfaces.md)).
- **Invocation surface** — `disable-model-invocation` and `user-invocable` decide who is the document's audience: The agent autonomously, the user by chat command, or only a calling agent. This is what enforces an orchestrator/executor split — a front-door document the user enters, executor documents that cannot be called sideways.

A **handover** document (see [Handover](handover.md)) as a variant, carries only `harness-format: DraftHorse, Handover` as its whole frontmatter — the stamp names the format and the subtype, and no identity, permissions, or invocation surface is present because these are all inherited from the main invoking skill.

## Agent Invariants (global)

Rules that bind the entire document. They hold in every step, and they are the document-wide counterpart to the step-scoped `#### Step invariants:` section catalogued in [Steps](steps.md). Global invariants carry the rules that must never lapse — safety floors, hard prohibitions — so they are stated once, at the top, and never restated per step (single source of truth).

## References

References hold context the steps deliver to the agent — constants, maps, formats — and by preference no work (see the *references carry data* convention). Their role in the frame is to *exist as inert data*; steps cite them inline at the moment of use, and the static-vs-dynamic split is catalogued in [References](references.md).

## Steps

The working body; where the document's work lives. The section opens with the steps preamble (the reading model, stated once for cold readers) — the universal one in a skill or agent document, the handover variant in a handover (see [Handover](handover.md)) — followed by the steps in the usual execution order. Each step is a standalone unit — its contract (start condition, finished condition, optional agent decision, suggested next actions and step invariants) above, its engagement below — knowing nothing of the other steps; multiple steps can be in play at once, and the set closes with its exit steps: a success exit and an error step. The anatomy, the conditions, in-play semantics, gates, and the exit/error steps are catalogued in [Steps](steps.md).

## Terms

The glossary. A short definition list giving meaning to the document-specific terms the steps and references lean on, so a multi-document set (orchestrator, executor documents) speaks one vocabulary. Term entries are named in Title Case and defined as bolded list entries (see [Notation](notation.md)).
