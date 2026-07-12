# Notation

Notation is the small set of markings DraftHorse layers on top of plain markdown. A DraftHorse document is written to be read cold — an agent that has never seen the framework should follow it from the document alone — so the notation carries no control flow; it only marks *what kind of thing* a piece of text is. The steps preamble (see [steps.md](steps.md)) teaches the one reading rule inside every document itself.

## The principle: bold + CAPS = a rule the agent must obey

A token written in **bold capitals** is an invariant keyword — a hard rule the agent must hold. Everything else is content the agent reads and acts on with its own judgment. This is the only executable marking in the notation.

- `**DO NOT** / **ALWAYS** / **NEVER** …` → rule — the invariant form: a bolded imperative keyword followed by the rule it enforces. The keyword family is open (`**ENSURE**`, `**USE**`, and kin are valid); `DO NOT` / `ALWAYS` / `NEVER` are the core set.

## Structural markings (not executable — these organise and name)

- `## +Step Name` — a step node: `+` prefix, Title Case, H2. The `+` distinguishes steps from reference and term headings.
- `#### Start this step when:` / `#### Step finished when:` / `#### Decision:` / `#### Do this next:` / `#### Invariants:` — the machinery headings, always H4, in this order (the last three optional): the step's contract, read without engaging (see [steps.md](steps.md)).
- `###` — the engagement heading: one H3 named for the work opens the step's body; the work may structure itself with H4 sub-headings of its own.
- `# --- REFERENCES --- / # --- STEPS --- / # --- TERMS ---` — the segment dividers of the scaffold (see [scaffold.md](scaffold.md)).
- `=== Mini Heading ===` — a lightweight in-block label, lighter than a `####`.
- `:` prefix — a term definition in the Terms section.
- Title Case — References and Terms entries are named in Title Case.
