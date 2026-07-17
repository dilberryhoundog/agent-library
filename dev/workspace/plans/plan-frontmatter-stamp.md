# Plan: Frontmatter Stamp (harness-format)

Status: Ready. Sources: new decision (this session). Recorded in [todos-discussion.md](todos-discussion.md) §12 decision, [new-concepts-discussion.md](new-concepts-discussion.md) §3 amendment.

## Decision

Every DraftHorse document carries `harness-format: DraftHorse` in frontmatter; handovers carry `harness-format: DraftHorse, Handover` (one searchable key: main format + subtype, comma-separated; extensible to future subtypes). Casing is exactly `DraftHorse` — the saddler string-matches it. On a handover it is the SOLE frontmatter (replaces `type: handover`); on a skill it coexists with the harness fields (name, description, allowed-tools, invocation flags).

## Work

- `docs/drafthorse/framework/scaffold.md` — frontmatter section gains the stamp as a declared concern, with one line noting it coexists with harness fields so nobody "cleans it up".
- `docs/drafthorse/framework/handover.md` — Frontmatter section: `type: handover` prose replaced by the stamp.
- Templates: `SKILL-template.md` frontmatter gains the stamp; `HANDOVER-template.md` already carries it.
- Apply the stamp to every existing DraftHorse document in the repo: drafthorse SKILL.md, classroom SKILL.md + its four handovers (replacing `type: handover`), versioning SKILL.md, git-box SKILL.md, agent-commit/push/switch, and any other DraftHorse-format skills — inventory via grep for the segment dividers (`# --- STEPS ---`).

## Dependencies

- Execute WITH [plan-handover-location.md](plan-handover-location.md) (the handover files are being renamed/moved in the same pass — stamp them then).
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (checks: every audited doc stamped; handover stamp/suffix/location three-signal agreement).
