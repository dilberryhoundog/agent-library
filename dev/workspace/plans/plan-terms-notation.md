# Plan: Terms `:` Notation Deprecated

Status: Ready (framework items DONE in the notation session). Sources: concept 16 — raised while executing [plan-reference-notation.md](plan-reference-notation.md) §17. Decision in [new-concepts-discussion.md](new-concepts-discussion.md) §16.

## Decision

The `:` term-definition form is deprecated. `: **Term**: <meaning>` becomes `- **Term** — <meaning>` — a standard bolded list entry, the same shape every other named list entry in a DraftHorse document takes. Title Case term names are unaffected and stay mandated, on Terms and References entries alike; only the `:` notation drops.

[plan-reference-notation.md](plan-reference-notation.md) §17 is VOID — it asks to restore the prefix in classroom on a false premise (classroom carries the prefix like every other skill; there was no outlier and no regression). classroom is a de-prefixing site like the rest.

## Work

Framework — DONE in the notation.md session:

- [x] `docs/drafthorse/framework/notation.md` — the `:` prefix entry replaced by the bolded-list entry form; Title Case line untouched.
- [x] `docs/drafthorse/framework/scaffold.md:43` — "defined with the `:` form" → "defined as bolded list entries". Taken here rather than in the scaffold.md session because the link sweep was already editing that exact line; the scaffold session has no remaining terms work.

Migration — wave 3, rides the atomic sweep ([plan-machinery-headings.md](plan-machinery-headings.md) + [plan-parent-child-vocab.md](plan-parent-child-vocab.md)); same files, one pass:

- [ ] `docs/drafthorse/template/SKILL.md` + `extensions/skills/drafthorse/assets/SKILL-template.md` — the two `: **<Term>**: <meaning>` example lines and the Terms comment ("Title Case names, `:` form" → "Title Case names, bolded list entries").
- [ ] `extensions/skills/classroom/SKILL.md` — six term entries.
- [ ] `extensions/skills/versioning/SKILL.md` — three term entries.
- [ ] `extensions/skills/git-box/SKILL.md` — six term entries.
- [ ] `extensions/skills/git/agent-{commit,push,switch}/SKILL.md` — term entries in each.
- [ ] Closing inventory: `grep -rn '^: \*\*' docs extensions` returns nothing.

Verification — wave 4, via [plan-spec-check-saddler.md](plan-spec-check-saddler.md):

- [ ] `docs/drafthorse/drafthorse-spec-check.md:51` — **Terms form** check re-keyed: term entries are bolded list entries with Title Case names (drop "use the `:` definition prefix"). The saddler line (:50) follows by regeneration, never by hand.

## Dependencies

- Wave-3 skill sweep — the term entries sit in the same files as the heading and vocab migrations; splitting them leaves mixed dialects for no gain.
- classroom is independently versioned: its wave-3 edits warrant a release flag, not a release.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (Terms form check).
- VOIDS [plan-reference-notation.md](plan-reference-notation.md) §17.
