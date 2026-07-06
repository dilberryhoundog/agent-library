# DraftHorse — Framework

DraftHorse is a method for writing SKILL.md (and kindred agent documents) as **procedural documents**: an agent reads the document and executes it like a state machine, rather than interpreting it like prose. The name is the thesis — a draft horse is the harness animal that does the pulling; DraftHorse is the harness that guides an agent through a document.

This folder is the **framework**: the normative reference for the DraftHorse language. It is a toolbox of primitives, each describing its own place and purpose, so a builder can reach for the right tool with intent rather than copying an example.

## The five layers (read in this order)

1. **[Scaffold](scaffold.md)** — the five frame parts every document is built on. The vessel you fill, shown first.
2. **[Notation](notation.md)** — the language and tokens (outside markdown) used to write everything else.
3. **[Steps](steps.md)** — the executable unit and its swappable slots. The bite sized units of work.
4. **[References](references.md)** — how steps reach data: internal, external, data-load, external-call.
5. **[Conventions](conventions.md)** — the bucket of laws and idioms that make a valid document a good one.

## After the framework

Two more parts follow once this framework is fine-tuned, each in its own sibling folder under `docs/drafthorse/`:

- **authoring/** — how to *reach for and compose* these primitives (judgment, not grammar). Built after the framework locks.
- the **skill** — a DraftHorse skill that builds DraftHorse skills, dogfooding the toolbox. Built last.
