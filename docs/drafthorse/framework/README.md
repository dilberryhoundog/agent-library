# DraftHorse — Framework

DraftHorse is a method for writing SKILL.md (and kindred agent documents) as **self-routing procedural documents**: the document's work is broken into self-contained steps, each declaring in plain English when it starts and when it is finished, and the executing agent's own judgment routes between them. The name is the thesis — a draft horse is the harness animal that does the pulling; DraftHorse is the harness that guides an agent through a document. A DraftHorse document requires no knowledge of the framework to execute: it is written to be read cold.

This folder is the **framework**: the normative reference for writing DraftHorse documents. It is a toolbox of primitives, each describing its own place and purpose, so a builder can reach for the right tool with intent rather than copying an example.

## The five layers (read in this order)

1. **[Scaffold](scaffold.md)** — the five frame parts every document is built on. The vessel you fill, shown first.
2. **[Notation](notation.md)** — the small set of markings layered on plain markdown: the invariant form and the structural labels.
3. **[Steps](steps.md)** — the self-contained unit of work: its anatomy, its start/finished conditions, the exit and error steps, and the universal preamble.
4. **[References](references.md)** — how steps reach data: internal, external, data-load, external-call.
5. **[Conventions](conventions.md)** — the bucket of laws and idioms that make a valid document a good one.

## After the framework

Two more parts follow once this framework is fine-tuned, each in its own sibling folder under `docs/drafthorse/`:

- **authoring/** — how to *reach for and compose* these primitives (judgment, not grammar). Built after the framework locks.
- the **skill** — a DraftHorse skill that builds DraftHorse skills, dogfooding the toolbox. Built last.
