# Notation

Notation is the small set of markings DraftHorse layers on top of plain markdown. A DraftHorse document is written to be read cold — an agent that has never seen the framework should follow it from the document alone — so the notation carries no control flow; it only marks *what kind of thing* a piece of text is. The steps preamble (see [Steps](steps.md)) teaches the one reading rule inside every document itself.

## Bold Capitals

**Invariant Keywords** — an executable marking in the notation.

- `**DO NOT** / **ALWAYS** / **NEVER** …` → rule — the invariant form: a bolded imperative keyword followed by the rule it enforces. The keyword family is open (`**ENSURE**`, `**USE**`, and kin are valid); `DO NOT` / `ALWAYS` / `NEVER` are the core set.

## Condition Lists

- A condition block is a markdown list, and every condition is its own list item.
- A condition list is implicitly conjunctive — every condition in the list holds. `**AND**` is implied, not written.
- `**OR these are true:**` — the sole separator, standing on its own line between two condition lists. Each list ANDs within itself; either list satisfied on its own satisfies the block. No precedence rules exist.

```
#### Start this step when these are true:

- a report has arrived
- no verdict is recorded

**OR these are true:**

- a repair was requested
- the report is unchanged
```

## Structural markings

Not executable — these organise and name things.

- `## +Step Name` — a step node: `+` prefix, Title Case, H2. The `+` distinguishes steps from reference and term headings.
- `**Step function** — the step's function description` — a declared step function: a bolded catalogue name on its own line beneath the step's directive, followed by the catalogue's fixed string. Optional; an undeclared step is an ordinary working step (see [Steps](steps.md)).
- `#### Start this step when these are true:` / `#### Step finished when these are true:` / `#### Agent decision:` / `#### Step invariants:` — the machinery headings, always H4, in this order (the last two optional): the step's contract, read without engaging (see [Steps](steps.md)).
- `###` — the engagement heading: one H3 named for the work opens the step's body; the work may structure itself with H4 sub-headings of its own.
- `# --- REFERENCES --- / # --- STEPS --- / # --- TERMS ---` — the scaffold's dividers (see [Scaffold](scaffold.md)).
- `=== Mini Heading ===` — a lightweight in-block label, lighter than a `####`.
- `**Bold**` — Keywords, List Item headings, Terms, Invariants.
- `- **Term** — definition` — a term entry in the Terms section: a standard bolded list entry, the same shape every other named list entry in a DraftHorse document takes.
- Title Case — References and Terms entries are named in Title Case.

## References

Every citation is a link, and its text is derived rather than invented — so a citation resolves mechanically, and a stale one is visible on its own line.

- **Internal References** — `[Reference Name](#reference-name)`. Link text is the reference's heading text; the anchor is that text lowercased, dashes for spaces. Anchor links are why headings stay short and unique (see the *naming, not explaining* convention).
- **External References** — `[Condition Writing](references/condition-writing.md)`. Link text is derived from the filename: extension stripped, dashes and underscores become spaces, each word capitalised — except where the filename carries deliberate casing of its own (`SKILL-template.md` cites as `[SKILL Template]`), which is kept.
- **Folder References** — `[Documents](templates/documents/)`. A step that lists a folder and picks from it cites the folder itself, trailing slash included; the link text is the folder name derived the same way.
- **Relative Paths** — the target is the path from the citing document to the cited one, written exactly as the reader must resolve it. A document nested below the skill root reaches back with `../` (`[Vetted Video Channels](../../references/vetted-video-channels.md)` from `templates/lesson-structures/`). A skill-root-relative path written from a nested file is a broken link.
- **Handover References** — `[Substeps — Handover](substeps-handover.md)`. The external form with ` — Handover` appended to the link text, em-dash spacing exact. This is the only legal way to cite a handover: the suffix is what tells the agent the document holds child steps to fold into the run, not data to read (the steps preamble carries the reading rule). A bare link to a handover file is a defect.
