# Plan: Naming, not Explaining

Status: Ready. Sources: concept 8, TODO 5. Decisions in [new-concepts-discussion.md](new-concepts-discussion.md) §8, [todos-discussion.md](todos-discussion.md) §5.

## Decision

Adopt with the mechanism stated: headings are link targets — an explaining heading makes an unlinkable anchor, a duplicated heading an ambiguous one. Shape: heading = name, first line under = explanation. Uniqueness applies per document. Title "Naming, not Explaining" stays; the trailing echo line goes.

## Work

- `docs/drafthorse/framework/conventions.md` — replace the `<!-- TODO: New convention -->` block (line 49) with the finished bullet; fix "efficent" typo in passing (block is being rewritten anyway).
- Cross-brace with the reference notation: the bullet names anchor links as the reason (see [plan-reference-notation.md](plan-reference-notation.md)); a small connecting "why" clause is explicitly allowed here.

## Dependencies

- Contends on conventions.md — framework-docs session grouping in the index.
- Conceptually paired with [plan-reference-notation.md](plan-reference-notation.md); can be executed independently as long as both use the same anchor-derivation wording (lowercase, dashes for spaces).
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (check: heading length/uniqueness).
