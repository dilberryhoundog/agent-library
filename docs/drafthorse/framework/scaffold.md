# Scaffold

The scaffold is the fixed frame every DraftHorse document shares: five parts, always present, always in this order. An agent learns the shape once and then reads every DraftHorse document the same way — frontmatter declares the document, invariants bound it, references feed it, steps run it, terms define it.

Four of the parts sit in the body, divided by purpose: References is the data segment (context, no logic), Steps is the executable segment (logic, the only place it lives), and Terms is the glossary. Frontmatter sits above the line as the declaration segment.

## The five parts

1. **Frontmatter** — the declaration segment: identity, permissions, invocation surface, config wiring. Sets up what the document is and what it may do, before any logic.
2. **Agent Invariants (global)** — rules that hold across the whole document, every step, no exceptions.
3. **References** — the data segment: constants, maps, formats, context. Never logic. Patterns (static vs dynamic) are catalogued in [references.md](references.md).
4. **Steps** — the executable body; the only place logic lives. The unit and its slots are catalogued in [steps.md](steps.md).
5. **Terms** — the glossary that keeps a multi-document set speaking one language.

## Frontmatter — the declaration segment

Frontmatter wires the document before any of its prose runs. Four concerns live here:

- **Identity** — `name` and `description`. The description is written for whoever can actually reach the document (see the *invocation-shaped description* convention).
- **Permissions** — `allowed-tools`. A document's grants transfer to a sub-agent that invokes it, so permissions can be delivered at the step that needs them rather than held globally.
- **Invocation surface** — `disable-model-invocation` and `user-invocable` decide who may reach the document: the agent autonomously, the user by name, or only a calling agent. This is what enforces an orchestrator/executor split — a front-door document the user enters, executor documents that cannot be called sideways.
- **Config wiring** — user configuration is fed into the document's commands directly, so a step receives a resolved value rather than reaching for it.

## Agent Invariants (global)

Rules that bind the entire document. They hold in every step regardless of which slots a step uses, and they are the document-wide counterpart to the step-scoped invariants catalogued in [steps.md](steps.md). Global invariants carry the rules that must never lapse — safety floors, hard prohibitions — so they are stated once, at the top, and never restated per step (single source of truth).

## References

The data segment. References hold context the steps deliver to the agent — constants, maps, formats — and never hold logic. Their role in the frame is only to *exist as inert data*; how a step reaches them, and the static-vs-dynamic split, is catalogued in [references.md](references.md).

## Steps

The executable body and the only part that carries logic. Steps are the addressable nodes of the document; everything else exists to serve them. Their anatomy — the node, the slots, the operators — is catalogued in [steps.md](steps.md).

## Terms

The glossary. A short definition list giving meaning to the document-specific terms the steps and references lean on, so a multi-document set (orchestrator, executor, verb documents) speaks one vocabulary. Term entries are named in Title Case and defined with the `:` form (see [notation.md](notation.md)).
