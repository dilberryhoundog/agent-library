# Plan: "Utilities" Umbrella Term

Status: Ready. Sources: concept 13. Decision in [new-concepts-discussion.md](new-concepts-discussion.md) §13, settled here.

## Decision

"Utilities" is KEPT and becomes the single collective noun. The house metaphor (utilities are the active systems of the house — power, water, internet — as distinct from the structure) is the reasoning that settled the word and stays on the record in the discussion doc, but it is **NOT written into scaffold.md**: AMENDED in the scaffold.md session, reversing "the metaphor MUST appear as the definition sentence". Explaining the word to a reader who is about to read a list of five plainly-named utilities tells them what the list already shows, and the feared "optional tools" misreading does not survive contact with that list. The definition sentence is: *"The document's utilities are intuitive so that they need not be expressed to a new reader."*

Three points settled:

- **Five utilities, not six.** Handover is NOT a peer utility — it is a **dynamic reference**, which is already the framework's written position: `references.md` lists "Handover fold-in" alongside data load, external call, agents, and hooks; `notation.md` gives "Handover Reference" a citation form beside internal and external. The sixth utility came only from the `extensions/rules/DraftHorse.md` stub's list, and that stub is shelved with [plan-drafthorse-rule.md](plan-drafthorse-rule.md). The count asymmetry (handovers having no body location) was an artefact of a document that will not be built; it dissolves. Known strain, accepted and not new: a handover is work, and the *references carry data* convention says references hold data — but that convention is explicitly "conceptual guidance, not a hard restriction", and the whole dynamic family stretches it the same way (an agent call and a hook are not data either; the unifying trait is runtime-produced context). This is the same seam as the shared-worker gap the saddler already false-positives on.
- **"Segment" is dropped.** Once utilities are not defined by where they live — frontmatter above the line, three in the body, invariants with no divider of its own — the word has no job. It never named the same set as "utilities" anyway (invariants has no divider), which is the source of the confusion. `references.md` has already migrated ("References is the data utility").
- **No `#### References` machinery heading.** Considered and rejected: its motivating problem (handovers having nowhere to live) is gone; it inverts the settled *cite references at the moment of use* convention; it would make a sixth machinery heading against the atomic five-heading migration keyed on by every skill, the spec-check, and the saddler; and its "must load these references" line restates preamble bullet 6 per-step (a no-op by the framework's own rule).

## Work

- [x] `docs/drafthorse/framework/scaffold.md` — DONE. Opening paragraph: definition sentence (see the amendment above — no metaphor), "five parts" → five utilities. Second paragraph deleted wholesale (it existed only to assign the segment words). Heading/list alignment: `## DraftHorse Utilities` now sits over a list the prose agrees with. Per-utility prose dropped its segment nouns: `## Frontmatter — the declaration segment` → `## Frontmatter`, the References section's "The data segment." opener, and the list entries.
- [x] `docs/drafthorse/framework/notation.md` — DONE (notation session). "the segment dividers of the scaffold" → the scaffold's dividers.
- [x] `docs/drafthorse/framework/conventions.md` — DONE (conventions session). "the data segment holds…" → the References utility holds.
- `docs/drafthorse/framework/handover.md` — line 12: "the Steps segment" → the Steps utility.
- Stale-term sweep (call-sites report §1): `docs/drafthorse/template/SKILL.md` (lines 2, 26), `extensions/skills/drafthorse/assets/SKILL-template.md` (lines 2, 26), `extensions/skills/drafthorse/SKILL.md` (lines 24, 28). spec-check/saddler occurrences (five-parts at :23/:22, segment nouns and `Segment dividers` at :39/:38, plus the audit-step prose) are owned by [plan-spec-check-saddler.md](plan-spec-check-saddler.md).
- DO NOT sweep `extensions/skills/versioning/SKILL.md:178` — "resolve the `../` segments" is path segments, an unrelated sense.
- `extensions/rules/DraftHorse.md` stub's utilities list — on hold with [plan-drafthorse-rule.md](plan-drafthorse-rule.md); ignore.

## Dependencies

- UNBLOCKS the references.md opening noun — [plan-reference-notation.md](plan-reference-notation.md) parked it pending this; "References is the data utility" is already correct and needs no change.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (terminology in the checks; the five-parts and segment-divider strings are keyed on there).
- Split across sessions by contended file: scaffold.md is uncontended and carries the bulk (its own session), but the one-line de-segmenting edits belong to their file's wave-1 group — notation.md:22 to the notation.md session, conventions.md:32 to the conventions.md session, handover.md:12 to the handover.md session. The template/SKILL.md sweep rides wave 3.
