# Plan: Handover Location and Naming

Status: Ready. Sources: concept 3. Decision in [new-concepts-discussion.md](new-concepts-discussion.md) §3 (amended).

## Decision

Root folder (sibling to the main skill file) + `-handover` file suffix. `type: handover` is superseded by the stamp `harness-format: DraftHorse, Handover` (owned by [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md)). A handover carries three agreeing signals — stamp subtype, `-handover` suffix, root location; a mismatch between any two is a spec-check defect.

## Work

- `docs/drafthorse/framework/handover.md` — resolve the self-contradiction: line 3 (`handovers/` folder) rewritten to the decided convention; "Handover Location and Naming" section (line 34–38) cleaned (fix "intiutive", "but however", lowercase "right" defects in the rewrite); line 71 references/-carve-out retires (kept only as a legacy note if desired).
- `docs/drafthorse/framework/notation.md` — handover citation example path updated to the root + suffix form (e.g. `[Substeps — Handover](substeps-handover.md)`).
- **Migration** of every existing handover (call-sites report §3 has the full inventory): classroom's four (`references/setup.md`, `mark-review.md`, `media-processing.md`, `deliver-without-renderer.md`) → root + `-handover` suffix, all citations updated (classroom SKILL.md lines 109/149/219/240 + Term 351); drafthorse skill docs (`SKILL.md:32/178/247`, `references/step-splitting.md:22`, `references/collecting-references.md:45`) updated to the new convention.

## Dependencies

- Execute WITH [plan-frontmatter-stamp.md](plan-frontmatter-stamp.md) and [plan-handover-citation.md](plan-handover-citation.md) — same files, same migration pass; doing them separately would touch every handover twice.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (three-signal agreement check; discovery by `*-handover.md` glob + citation collection).
- classroom is an independently versioned plugin — the migration is a content change to its skill; flag for a classroom release when this lands.
