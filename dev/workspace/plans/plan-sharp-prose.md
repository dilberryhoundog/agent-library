# Plan: Sharp Prose Convention

Status: DONE. Sources: concept 7, TODO 4. Decisions in [new-concepts-discussion.md](new-concepts-discussion.md) §7, [todos-discussion.md](todos-discussion.md) §4.

## Decision

The TODO block's own bullets ARE the convention — promoted as written, four defects named in conventions.md directly. No two-sentence pointer version; see [new-concepts-discussion.md](new-concepts-discussion.md) §7 for the landed text and the rejection. Preferred, not absolute: a one-clause consequence that makes a rule checkable is a test, not a Why violation. The convention resolves into rules; rules sit outside the SSoT convention (SSoT applies within DraftHorse documents, not where runtime artifacts reflect the docs), so naming the defects here is not duplication.

## Work

- `docs/drafthorse/framework/conventions.md` — DONE. TODO block promoted to the `Sharp Prose` bullet with its defect list as sub-bullets (italics, not bold); `Remove no-ops` deleted as absorbed by the *No-op* bullet; spelling/grammar polished (`guardrails`, "have been given adequate", `session-specific`, DraftHorse casing).
- `extensions/rules/durable-documents.md` — "Sharp Language" section is already committed and stays as is; no work.

## Dependencies

- Contends on conventions.md — framework-docs session grouping in the index.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (Sharp Prose check).
