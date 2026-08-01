# Report: Grammar and Typos

Review of uncommitted DraftHorse sweep changes. Genuine errors only, grouped by file; each finding is file:line, the problematic text, and the correction. Findings anchor to the working-tree files.

## docs/drafthorse/framework/conventions.md

- conventions.md:3 — "all equal. how much any one weighs is decided in use" — lowercase sentence start after a period. Fix: "…all equal. How much any one weighs…".
- conventions.md:28-29 — **Duplicate bullet.** "**The error step claims the remainder**" appears twice: line 28 (original, with the "The test: …" clause) and line 29 (reworded, no test clause). Delete one.
- conventions.md:57 — "Keeps main conversation fresh and impactfull" — typo: impactfull → impactful.
- (TODO scratch) inside `<!-- TODO -->` blocks: "edaquate drafthorse guidrails" → "adequate … guardrails"; "efficent link text" → "efficient".

## docs/drafthorse/framework/handover.md

- handover.md:36 — "storing handover files. right next to the main skill file." — lowercase start after a period. Fix: join with a comma or capitalise "Right".
- handover.md:36 — "but however intiutive for agents" — typo: intiutive → intuitive; "but however" is redundant, keep one.
- handover.md:48 — "Ensure any reviwer agents know the conventions" — typo: reviwer → reviewer.

## docs/drafthorse/framework/scaffold.md

- scaffold.md:20 — "…held globally. This also ensure grants" — sentence ends unfinished with no object; also "ensure" → "ensures". Complete or delete the fragment.
- scaffold.md:20 — "transfer to a sub-agent that invokes it, if a DraftHorse step invokes child skills these permissions transfer…" — comma splice; needs a period or semicolon before "if".

## docs/drafthorse/framework/steps.md

- steps.md:14 — "Also Multiple steps can be in play at once" — "Multiple" wrongly capitalised mid-sentence. Fix: "Multiple steps can also be in play at once".

## docs/drafthorse/framework/notation.md

- notation.md:13 — "Prepend each sub condition, The first condition is bare" — comma splice plus wrongly-capitalised "The"; no period after "bare". Fix: "Prepend each sub condition. The first condition is bare."

## docs/drafthorse/framework/references.md

- references.md:1 — "References is the data utility" — subject/verb disagreement. Fix: "References are the data utility" (or "A reference is…").

## extensions/skills/classroom/SKILL.md

- Terms section (Matter, Shape, Page Geometry, Handover Doc, Sample, Strand) — the leading ":" prefix was stripped from every term definition (": **Matter**:" → "**Matter**:"), but notation.md still specifies the ":" prefix for Terms entries. If deliberate, notation.md must change too; otherwise restore the prefix.

## Files with no errors in changed passages

- docs/drafthorse/drafthorse-spec-check.md — the Verdict-rule reflow is clean; added TODO blocks are intentional scratch.
- extensions/rules/durable-documents.md — new "Sharp Language" section is clean.
- docs/drafthorse/framework/environments.md — TODO scratch only.
- extensions/skills/classroom/templates/documents/certificate.html — reindentation plus "house geometry" → "page geometry" comment rename; markup valid.
- extensions/rules/DraftHorse.md — TODO scaffolding only. One scratch note if it survives: the comment "<!-- Utilities (Agents Invariants, References, Steps, Terms, Handovers -->" has an unclosed "(" and "Agents Invariants" should be "Agent Invariants".

## Must-fix shortlist (shipped prose)

conventions.md:3, conventions.md:28-29 (duplicate bullet), conventions.md:57 (impactfull), handover.md:36 (intiutive, "but however", lowercase "right"), handover.md:48 (reviwer), scaffold.md:20 (unfinished sentence, ensure→ensures), steps.md:14 ("Also Multiple"), notation.md:13 (comma splice), references.md:1 ("References is").
