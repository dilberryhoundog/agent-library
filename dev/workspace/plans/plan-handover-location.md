# Plan: Handover Location and Naming

Status: Ready. Sources: concept 3. Decision in [new-concepts-discussion.md](new-concepts-discussion.md) §3 (amended).

## Decision

Root folder (sibling to the main skill file) + `-handover` file suffix. `type: handover` is superseded by the stamp `harness-format: DraftHorse, Handover` (owned by [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md)). A handover carries three agreeing signals — stamp subtype, `-handover` suffix, root location; a mismatch between any two is a spec-check defect.

## Work

- [x] `docs/drafthorse/framework/handover.md` — DONE. Self-contradiction resolved (line 3's `handovers/` folder now the root + suffix convention); Location and Naming section rewritten clean, and it now states the three agreeing signals plus a `**NEVER** file a handover in references/` rule. The references/ carve-out is **RETIRED OUTRIGHT**, not kept as a legacy note: the rewritten passage says the embedded-work check has no carve-out, and that a stamped file in `references/` is a handover in the wrong place — its signals disagree — rather than an exempt one. Consequence accepted: classroom's four handovers read as non-conforming until wave 3 migrates them, which is the index's stated posture (framework is authority, skills lag).
- [x] `docs/drafthorse/framework/notation.md` — DONE (notation session). Handover citation example path is the root + suffix form.
- **Migration** of every existing handover (call-sites report §3 has the full inventory): classroom's four (`references/setup.md`, `mark-review.md`, `media-processing.md`, `deliver-without-renderer.md`) → root + `-handover` suffix, all citations updated (classroom SKILL.md lines 109/149/219/240 + Term 351); drafthorse skill docs (`SKILL.md:32/178/247`, `references/step-splitting.md:22`, `references/collecting-references.md:45`) updated to the new convention.

## Dependencies

- Execute WITH [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md) and [plan-handover-citation.md](plan-handover-citation.md) — same files, same migration pass; doing them separately would touch every handover twice.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (three-signal agreement check; discovery by `*-handover.md` glob + citation collection).
- classroom is an independently versioned plugin — the migration is a content change to its skill; flag for a classroom release when this lands.
