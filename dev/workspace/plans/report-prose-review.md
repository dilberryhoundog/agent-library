# Report: Prose Review (before vs after)

Verdict on the editing sweep: many individual rewrites read clearer, but the sweep is unfinished and internally inconsistent — live TODO comments in spec docs, commented-out conventions, a truncated sentence, a reversed invariant, and a three-way handover-location contradiction with no consumers migrated. Blocking items: conventions.md's mid-refactor state, the handover-location decision, and the steps.md:301 reversal.

## Broken linkages (most severe)

**Handover location is self-contradictory across three statements and contradicts all real usage:**

- handover.md:3 — "reside in a `handovers/` folder inside the `skills/` folder".
- handover.md:36-38 — "`<skill>/setup-handover.md` … sibling to the main skill file … NOT in the `references/` folder"; naming = append `-handover`.
- handover.md:71 (unchanged) — the embedded-work carve-out still says "Step-shaped work living in a `references/` file … type: handover".
- notation.md:220 (new) — cites `[Substeps — Handover](handovers/substeps.md)` (matches line 3, contradicts line 36).
- classroom/SKILL.md:109, 149, 219, 240 and the Term at :351 — every real handover is cited from `references/`, matching none of the new rules.

handover.md alone now gives `handovers/` vs root-sibling `-handover` vs `references/`. The canonical spec no longer states one location and no consumer was updated.

**Terms ":" prefix dropped in classroom but not in the notation spec:** classroom/SKILL.md:347-351 removed the leading ": " from every Terms entry, but notation.md:213 still declares the ":" prefix for Terms. Classroom Terms now violate the notation spec — accidental or unpropagated.

## conventions.md — WORSE / broken mid-refactor

- :56 — opening paragraph lost "flat, open bucket" and "Each entry is a rule paired with the test that makes it actionable" (its own format description); also the lowercase "how much" grammar slip.
- :60 — "Conditions are checkable/exhaustive" lost its actionable test.
- :66-67 and :79-80 — "Steps are standalone" and "Gates are compound" are commented out of the live doc; Gates is referenced elsewhere. Looks accidental, not finished trimming.
- :82-83 — "error step claims the remainder" duplicated, one with the test, one without.
- :102-104 — "Remove no-ops" and "Improve over time" commented out; only the latter gets a live replacement (Dynamic Improvement, :112).
- Unresolved `<!-- TODO -->` blocks at :62, :69, :78, :94, :106 now sit inside the spec.

## steps.md — MIXED, one likely-unintended reversal

- :301 — **constraint reversed**: start-condition guidance changed "Excludes half-applied states" → "**Handles** half-applied states", contradicting the still-present rule at :338 ("must **exclude** half-applied states") and the convention's name. Flag as unintended.
- :306 — lost "nothing else" (the own-step-only constraint).
- :374 — gate rewrite dropped "never mere presentation" and the rubber-stamp/launder guard; clearer mechanics but loses the failure guard. Mixed.
- :277, :290-292 — prose expansions on in-play and ordering are clearer. Better.
- :285 / :332 — recasts "do this next" from routing authority to "breadcrumbs / direction finder for lost agents" — genuine semantic softening of the slot; confirm intent.
- TODO comments left at :334, :343.

## notation.md — MIXED (net better coverage)

- New References and Condition-links (AND/OR) subsections document previously-unstated notation. Better.
- :191-194 — lost the sharp thesis "bold + CAPS = a rule the agent must obey" and "the only executable marking" → weaker "an executable marking".
- :220 — participates in the handover-location contradiction.

## handover.md — MIXED plus defects

- Added "Common use cases" (:137-141) and "Document Reviews" (:163-165) — real content, better coverage.
- Cut "The name is the thesis" and the originating-case example (strong onboarding material) — defensible trim.
- Spelling/grammar in a spec doc: :36 "intiutive"; :165 "reviwer"; :170 "self contained".
- :159 (and scaffold.md:265) — new claim that handover identity/permissions are "inherited from the main invoking skill" — a stronger, new assertion vs the old "none needed because reached only by a step". Verify it is true and intended.

## scaffold.md — MIXED

- :242 — heading "The five parts" → "DraftHorse Utilities" but the list still enumerates five parts; the heading no longer names its content.
- :257 — **truncated sentence**: "This also ensure grants" (unfinished, plus grammar).
- :260-262 — the Config-wiring bullet is commented out; the concept is now missing from the live scaffold.

## references.md — minor regression

- :229 — "References are the data segment" → "References is the data utility": number disagreement, and drops the scaffold's own term "segment" for "utility".

## drafthorse-spec-check.md — no substantive change

Only added TODO planning comments (:9, :20, :41) and a bolded, line-split Verdict rule (:31-33). The TODOs confirm the handover-audit and new-convention checks are not yet written.

## New stub files — placeholders only, but staged

- extensions/rules/DraftHorse.md — TODO comments only, no content.
- docs/drafthorse/framework/environments.md — TODO comments only, no content.

## durable-documents.md — BETTER

New "Sharp Language" section (:48-52) is consistent with the four-defect frame. Minor: "Instruct the How, do not explain the Why" is a mild Negative Mirror by the file's own definition — acceptable as emphasis.

## SKILL-template.md — BETTER

Added AND/OR condition-list examples (:61-63, :70-72) matching the new notation; "Delete" → "Omit" consistency fix (:79). Aligned.

## classroom/SKILL.md — MIXED

- House Geometry → Page Geometry rename is consistent (:62, :64, :350); Classroom Signal is now a working anchor link (:105 → #classroom-signal exists). Better.
- The Terms ":" prefix removal (above) is the one regression.
