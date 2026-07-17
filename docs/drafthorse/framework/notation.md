# Notation

Notation is the small set of markings DraftHorse layers on top of plain markdown. A DraftHorse document is written to be read cold — an agent that has never seen the framework should follow it from the document alone — so the notation carries no control flow; it only marks *what kind of thing* a piece of text is. The steps preamble (see [steps.md](steps.md)) teaches the one reading rule inside every document itself.

## Bold Capitals

**Invariant Keywords** — an executable marking in the notation.

- `**DO NOT** / **ALWAYS** / **NEVER** …` → rule — the invariant form: a bolded imperative keyword followed by the rule it enforces. The keyword family is open (`**ENSURE**`, `**USE**`, and kin are valid); `DO NOT` / `ALWAYS` / `NEVER` are the core set.

**Condition links**

- `**AND** / **OR**` Chain multiple conditions together. Prepend each sub condition, The first condition is bare

## Structural markings

Not executable — these organise and name things.

- `## +Step Name` — a step node: `+` prefix, Title Case, H2. The `+` distinguishes steps from reference and term headings.
- `#### Start this step when:` / `#### Step finished when:` / `#### Decision:` / `#### Do this next:` / `#### Invariants:` — the machinery headings, always H4, in this order (the last three optional): the step's contract, read without engaging (see [steps.md](steps.md)).
- `###` — the engagement heading: one H3 named for the work opens the step's body; the work may structure itself with H4 sub-headings of its own.
- `# --- REFERENCES --- / # --- STEPS --- / # --- TERMS ---` — the segment dividers of the scaffold (see [scaffold.md](scaffold.md)).
- `=== Mini Heading ===` — a lightweight in-block label, lighter than a `####`.
- `**Bold**` — Keywords, List Item headings, Terms, Invariants.
- `:` prefix — a term definition in the Terms section.
- Title Case — References and Terms entries are named in Title Case.

## References

- **Internal References** — Citing an internal reference is marked using link notation to the reference's heading: [Reference Name](#reference-name)
- **External References** — Citing an external reference is marked using link notation to the document's relative path: [Reference File](references/reference.md)
- **Handover Reference** — Citing a handover reference is marked using link notation to the handover's relative path with ` — Handover` appended: [Substeps — Handover](handovers/substeps.md)
