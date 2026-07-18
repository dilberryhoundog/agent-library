# Plan: Frontmatter Stamp (harness-format)

Status: Ready. Sources: new decision (this session). Recorded in [todos-discussion.md](todos-discussion.md) §12 decision, [new-concepts-discussion.md](new-concepts-discussion.md) §3 amendment.

## Decision

Every DraftHorse document carries `harness-format: DraftHorse` in frontmatter; handovers carry `harness-format: DraftHorse, Handover` (one searchable key: main format + subtype, comma-separated; extensible to future subtypes). Casing is exactly `DraftHorse` — the saddler string-matches it. On a handover it is the SOLE frontmatter (replaces `type: handover`); on a skill it coexists with the harness fields (name, description, allowed-tools, invocation flags).

## Work

- [x] `docs/drafthorse/framework/scaffold.md` — DONE (scaffold.md session; the index had left this item unassigned to any wave-1 group, and it collided with [plan-config-wiring.md](plan-config-wiring.md) over the same "concerns" sentence). Resolution: the stamp IS a frontmatter concern, so the count stays four while the membership changes — format stamp, identity, permissions, invocation surface. Config wiring is gone from the list. The stamp bullet leads the section and carries the coexists-with-harness-fields line as a `**DO NOT**` invariant. scaffold.md's handover paragraph also corrected: `type: handover` → the stamp.
- [ ] `docs/drafthorse/framework/handover.md` — `type: handover` prose replaced by the stamp at FOUR sites, not one: the opening line (:3), the Frontmatter section (:42), and the embedded-work carve-out (:71) which keys the saddler's data-not-work exemption off the field name.
- [ ] `docs/drafthorse/framework/README.md:19` — INVENTORY GAP (found in the scaffold.md session; no wave-1 session owns this file): the Handover entry describes "a `type: handover` document". Take it in the handover.md session.
- Templates: `SKILL-template.md` frontmatter gains the stamp; `HANDOVER-template.md` already carries it.
- Apply the stamp to every existing DraftHorse document in the repo: drafthorse SKILL.md, classroom SKILL.md + its four handovers (replacing `type: handover`), versioning SKILL.md, git-box SKILL.md, agent-commit/push/switch, and any other DraftHorse-format skills — inventory via grep for the segment dividers (`# --- STEPS ---`).

## Dependencies

- Execute WITH [plan-handover-location.md](plan-handover-location.md) (the handover files are being renamed/moved in the same pass — stamp them then).
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (checks: every audited doc stamped; handover stamp/suffix/location three-signal agreement).
