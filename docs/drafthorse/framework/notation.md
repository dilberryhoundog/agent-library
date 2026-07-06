# Notation

Notation is the language DraftHorse layers on top of plain markdown — the small set of tokens a builder learns once to read or write any DraftHorse document. This file teaches *form* only: how each token is written. What the operators *do* is defined in [steps.md](steps.md).

## The principle: bold + CAPS = execution

A token written in **bold capitals** is a machine instruction the agent must obey or act on — a jump, an operator, or an invariant keyword. Everything not in bold capitals is context the agent reads, not executes.

This single rule is what makes a DraftHorse document read as runnable rather than as an essay. The agent scans for the bold-caps tokens to find the control flow and the hard rules, and treats the surrounding prose as the context those instructions act on. Every executable token below is an instance of this principle.

## Tokens

**Executable** (bold + CAPS — the agent acts on these):

- `**-> +STEP**` — a jump to another node; the GOTO that wires the step graph.
- `**IF** / **WHEN** / **THEN** / **END** / **OR** / **AND**` — the operator vocabulary (`OR` and `AND` used inline). Form here; behaviour in [steps.md](steps.md).
- `**DO NOT** / **ALWAYS** / **NEVER** …` → explanation — the invariant form: a bolded action keyword followed by the rule it enforces.

**Structural / label** (not executable — these organise and name):

- `##` / `####` — heading levels: `##` declares a step node; `####` declares an in-step component heading.
- `## +STEP NAME` — a step node declaration: CAPS, `+` prefix, H2.
- `=== Mini Heading ===` — a lightweight in-block label, lighter than a `####`.
- `:` prefix — a term definition in the Terms section.
- Title Case — References and Terms entries are named in Title Case, distinguishing them from the CAPS of step nodes.
