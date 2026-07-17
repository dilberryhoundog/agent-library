# Plan: Internal / External Reference Notation

Status: Ready. Sources: concept 5. Decision in [new-concepts-discussion.md](new-concepts-discussion.md) §5.

## Decision

Internal: link text = the reference's heading text; anchor = lowercase, dashes for spaces — `[Reference Name](#reference-name)`. External: link text = filename with extension stripped, first letter uppercased; target = filename + extension — `[Reference](references/reference.md)`. A small connecting "why" clause is allowed to brace this with the Naming-not-Explaining convention.

## Work

- `docs/drafthorse/framework/notation.md` — finalise the References subsection with both conventions stated as above (link-text derivation rules explicit).
- `docs/drafthorse/framework/references.md` — add a cross-reference to the notation (currently absent, call-sites gap); fix the "References is the data utility" number-agreement defect in passing (noun confirmed by [plan-utilities-term.md](plan-utilities-term.md): "data utility" stands, no change needed).
- `docs/drafthorse/framework/references.md` — TWO items owned by [plan-config-wiring.md](plan-config-wiring.md) land in this same pass; read that plan before editing this file:
  - Add the **User configuration** dynamic-reference entry.
  - FIX the dynamic-family shape sentence — "The family shares one shape: the step invokes a native capability and folds the result back in as context" is *pull*, and is false for **Data load** as well as for User configuration (a `!`command`` block is harness-substituted before the agent reads any prose; the step invokes nothing). The next sentence is the accurate one: the unifying trait is runtime-produced context. Define the family by the trait, not by an invocation shape only some members have.
- Framework docs' bare-filename cross-links (`[steps.md](steps.md)` style throughout scaffold/conventions/steps/references) — per the decided external convention these become `[Steps](steps.md)` etc.; sweep them (call-sites §9 inventory).
- classroom Terms `:` prefix regression (call-sites §8): notation.md still mandates the `:` prefix and classroom is the lone outlier — restore the prefix in classroom SKILL.md's Terms entries as part of this notation pass.

## Dependencies

- Paired with [plan-naming-not-explaining.md](plan-naming-not-explaining.md) (same anchor-derivation wording).
- The references.md opening-noun fix waits on [plan-utilities-term.md](plan-utilities-term.md) (discussion) — do the grammar fix, leave the noun as "data utility" until that lands.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (citation-form checks).
