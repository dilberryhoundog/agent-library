# Plan: Sharp Prose Convention

Status: Ready. Sources: concept 7, TODO 4. Decisions in [new-concepts-discussion.md](new-concepts-discussion.md) §7, [todos-discussion.md](todos-discussion.md) §4.

## Decision

Preferred, not absolute. Two sentences in conventions.md: the DraftHorse-specific claim (guardrails replace justification — instruct the How, the conditions carry the Why; a one-clause consequence that makes a rule checkable is legitimate, not a Why violation) plus a pointer to durable-documents.md for the defect catalogue. No re-listing of the four defects. The convention resolves into rules; rules sit outside the SSoT convention (SSoT applies within DraftHorse documents, not where runtime artifacts reflect the docs).

## Work

- `docs/drafthorse/framework/conventions.md` — replace the `<!-- TODO: Replace with "Sharp Prose" -->` block (line 38, including the scratch defect list and "Remove no-ops" bullet) with the two-sentence convention.
- `extensions/rules/durable-documents.md` — "Sharp Language" section is already committed and stays as is; no work.

## Dependencies

- Contends on conventions.md — framework-docs session grouping in the index.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (Sharp Prose check).
