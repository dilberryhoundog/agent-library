# Plan: Child Skills

Status: Ready. Sources: concept 11. Decision in [new-concepts-discussion.md](new-concepts-discussion.md) §11.

## Decision

A usage pattern, not a new document variant — no `type: child`, no new scaffold. A skill locked to a specific parent: its description written to repel autonomous invocation (description-as-lock, stated explicitly, e.g. "not for general use; invoked by X"; prefer/combine `disable-model-invocation` where the harness offers the hard lock); own grants for branching or tool-heavy work; grants apply at the moment of invocation. Defined by contrast with its neighbours: handover (shared context, inherited grants, cited by step) / child skill (fresh context, own grants, called by parent step) / full skill (independent). git-box is the live reference implementation — source examples and mechanics from it.

## Work

- `docs/drafthorse/framework/surfaces.md` — write the Child Skills entry (substance of this plan; see [plan-surfaces-doc.md](plan-surfaces-doc.md)).
- `docs/drafthorse/framework/scaffold.md` — Permissions bullet (line 20): finish the truncated sentence ("This also ensure grants" — complete or delete), fix the comma splice, and align the "child skills" mention with the surfaces.md definition (scaffold keeps one line + pointer; surfaces owns the concept).
- Verify the grants-transfer claims against git-box's actual frontmatter/flow before writing them as framework fact.

## Dependencies

- Executed inside [plan-surfaces-doc.md](plan-surfaces-doc.md)'s session (the entry IS the definition home).
- The scaffold.md Permissions fix is independent and small — can ride with any scaffold.md-touching session.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) only indirectly (no new checks decided).
