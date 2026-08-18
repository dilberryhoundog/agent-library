# Target: extensions/skills/classroom/SKILL.md

The largest corpus document — 13 steps, 8 slots (all HINT per the slot audit), roughly 10 de-hold-shaped start clauses, 4 handover parent steps. Condition blocks are already lists — item G is verification only. Do NOT edit the handover files; a sibling agent owns them.

## De-hold judgment

Sweep every step's start condition against the three classes in the common brief. Known shapes seen: "no classroom context is confirmed for the current working directory", "the learner is not yet established", "no review has yet been delivered for it", "its subject matter has not been gathered", "the build's structure has not been aligned with the user", "the course and lesson shapes have not been chosen" — judge each. A first-gate clause that reads as de-hold of the step's own finish (class 1) is trimmed; a per-item discriminator on a genuinely re-entrant step (per-unit build loops, per-document render loops — class 2) is kept with `**Looping step**` declared; a run-ended/intent guard ("the run is a build", "the run's intent is to mark completed work") is neither — keep those, they are routing state. Record every site with before/after and judgment. Expect roughly 10 trims; report the true count.

## Slots

All 8 are HINT per the audit — but verify each before deleting: the routing it names must be carried by conditions elsewhere. The known safe case: the error-step slot "Resume the step the user chose, or end the skill" is HINT here because `+Conclude` claims the user-ended run explicitly. A slot whose fact turns out uncarried gets flagged, not deleted — stop on that site and record it.

## Functions

Judge every step against the catalogue:

- The success exit (`+Conclude` or equivalent) — `**Success step**`; ensure its finished conditions state the run's completion.
- The error step — `**Error step**`.
- Handover parent steps (the four that fold in `setup`, `media-processing`, `mark-review`, `deliver-without-renderer` handovers) — `**Handover step** — Manages the invocation and resolution of a handover document.`
- Per-item build/render loops — `**Looping step**`.
- Mark-vs-build intent divergence — where one step's work is the choice between divergent run shapes, `**Routing step**`; where the intent arrives with the invocation and steps merely claim it in start conditions, no routing step exists — judge, don't force.
- Steps for rare states — `**Dormant step**` where genuinely skippable on most runs.

## Vocabulary, preamble, citations

- Universal preamble swap (this is the skill document — NOT the handover variant).
- "error drain"/"problem step" → error-step vocabulary; verify zero after (grep hits exist beyond the preamble in this file).
- Handover citations must be the exact form `[Name — Handover](name-handover.md)` — verify, fix any bare link.
- Reference citations to links where code-spans cite References headings or external files.

## Cross-check (flag only)

The document gates on user approvals. Check the error step's engagement for withdrawn-approval handling; flag its absence or presence — do not add it uninvited.

## Exemplar

Nominate two: **Handover step** (the cleanest migrated parent step) and **Routing step** if one exists after your judgment (else say none).
