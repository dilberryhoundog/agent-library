# Collecting References

How to harvest, classify, and mine the source material before any step is shaped. References come first because steps operate on references — the data has to be on the table before the work can be cut.

## Harvest

Gather every piece of material the document will lean on. Sources to sweep:

- **Existing documents** — in a conversion, the document being converted is the primary ore; also READMEs, config files, rules files, older versions of the same skill.
- **Commands and scripts** — anything the steps will run, including live-state commands whose output the document needs at load (`!`-interpolated blocks).
- **Formats and templates** — message formats, report shapes, file templates, briefs the document must emit or consume.
- **Maps and constants** — lookup tables, emoji maps, naming schemes, tag patterns, path rules.
- **Examples** — worked instances of the task that show the intended shape of the output.
- **The user** — material only they hold: conventions in their head, links, decisions already made. Ask; do not assume.

## Classify

Place each harvested piece on the reference axes:

- **Inline static** — compact and always relevant: lives in the document's References section.
- **External static** — expansive and only sometimes relevant: lives in a sibling file, cited by the step whose moment needs it.
- **Dynamic** — produced at runtime: a live-state command block, a sub-agent call, another skill. Note which step's moment it serves.

When a piece will not be installed alongside the skill (a repo-local doc, a session artifact), it cannot be cited — copy what is needed into the skill's own files or drop it.

## Record the gaps

Not every reference exists yet — many are designed, not found: a dynamic command block that has to be written, a format or template the steps will emit, an external guide still to be authored. Name and classify each of these like any other reference, mark it a **gap**, and note what producing it will take. Collection does not produce them — it only makes the missing pieces visible so the set can be judged whole.

## The embedded-work audit

Mine every piece for work hiding in the data. Work is anything the agent *does* rather than *reads* — the tells:

- **Ordered actions** — "first…, then…, finally…", numbered procedures, command sequences meant to be executed in order.
- **Conditionals** — "if…, otherwise…", "when X, do Y", branching advice.
- **Interaction** — "ask the user", "confirm before", "present and wait".
- **Judgment charges** — "decide whether", "choose between", "verify that".

Extract each hit into the **step candidates** list, phrased as work ("interview the repository to discover its units"), and note which reference it came from. What remains after extraction is the data the reference keeps. A reference that is *all* work after the audit stops being a reference — its content belongs entirely to steps.

Small self-contained logic inside a reference is tolerable (the interpreter is an agent), but every hit above should at least be weighed — the audit exists because unextracted work is the most common conversion defect.

## Output of this phase

Two artifacts: the classified reference set (name, placement, and what each holds), and the step-candidates list (each candidate's work statement and its source). What happens to them — the gate, the hand-over, the re-harvest — is the step's business, not this guide's.
