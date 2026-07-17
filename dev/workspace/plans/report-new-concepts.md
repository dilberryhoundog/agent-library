# Report: New Concepts Audit

Every new concept, term, mechanism, or notation introduced by the uncommitted DraftHorse sweep. Scope note: classroom SKILL.md and certificate.html changes are unrelated release/print work and are excluded here. Most new concepts live inside `<!-- TODO -->` draft blocks, not committed prose; two new files (environments.md, extensions/rules/DraftHorse.md) are pure stubs.

## Concepts

1. **"Steps are universal" / multiple steps in play** — steps governed only by start/finished conditions, so more than one can be in play at once (loopbacks, error catching before the producer finishes, inert steps dormant until start is met). Behaviour committed in steps.md ("In play" section and intro); the named convention exists only in a conventions.md TODO. Half-defined. Restates the existing "In play" section; loopback/inert framing is new.

2. **`**AND**` / `**OR**` condition-link notation** — bold-caps connectors chaining sub-conditions; first bare, rest prepended. Defined in notation.md ("Condition links"), consumed in SKILL-template.md. Thin: no precedence/grouping rule, and the template mixes AND and OR in one list ambiguously. Should also be referenced in steps.md Conditions and in drafthorse-spec-check.md notation checks — currently neither.

3. **Handover location and naming convention — CONFLICT** — handover.md's new "Handover Location and Naming" section asserts two contradictory rules in the same sweep: (a) root-sibling `<skill>/setup-handover.md`, "not in the references/ folder"; (b) a `handovers/substeps.md` subfolder, also used by notation.md's example. Naming: append `-handover`. UNRESOLVED CONTRADICTION; highest priority — concepts 4 and 6 depend on the answer.

4. **Handover-reference notation (" — Handover" suffix)** — cite a handover with link text ending " — Handover": `[Substeps — Handover](handovers/substeps.md)` (notation.md References subsection). Replaces the older vague "cite as handover doc" wording (softened in handover.md). Its path form contradicts concept 3's root-sibling prose.

5. **Internal / external reference notation** — internal `[Name](#anchor)`, external `[File](references/reference.md)` (notation.md). Newly explicit, clear, low risk. Not cross-referenced from references.md.

6. **Handover "Document Reviews" / reviewer handover-walking** — with location/naming/referencing settled, a spec-review agent can walk from the main skill into handover files and audit all surfaces (handover.md "Document Reviews"). The actual review step exists only as TODOs in drafthorse-spec-check.md. Not wired; depends on concept 3.

7. **"Sharp Prose" / "Sharp Language" convention** — sharp direct prose; instruct the How, not the Why; folds together why-omission, unreachable meaning, negative mirror, no-op. COMMITTED as a new section in extensions/rules/durable-documents.md; still a "Replace with Sharp Prose" TODO in conventions.md. Overlaps heavily with durable-documents' four existing defect sections — it restates the doc's own thesis.

8. **"Naming, not Explaining"** — headings short and unique so link-text attribution works; explanation goes in a line under the heading. TODO only in conventions.md, no committed prose. Supports concept 5's anchor links but unwired.

9. **"Dynamic Improvement"** (renamed from "Improve over time") — agents upload issues to the `agent-library` repo; a later repair agent integrates fixes; agents reveal troubles rather than propose solutions. Committed in conventions.md. Hard-codes the repo name into an agnostic framework doc — possibly acceptable as a fixed constant, judgment call.

10. **"Sub Agents" convention** — side-loaded sub-agents are the optimal DraftHorse environment; they keep the main conversation fresh while doing supporting work. Committed as a dangling bold line at the end of conventions.md — not formatted as a `- **…**` list item like its neighbours.

11. **"Child Skills"** — a skill locked to a specific parent (description avoids main-agent triggering), granting unique permissions for branching/tool-heavy work; parent permissions transfer at invocation. NEW TERM defined only in the environments.md stub comment, yet already used in committed scaffold.md prose — which also ends mid-sentence: "This also ensure grants".

12. **Environment taxonomy** (Main Skill File / Sub agent / Child Skills / Handover Documents) — intended catalogue of DraftHorse-compatible harness extensions in the new docs/drafthorse/framework/environments.md, entirely `<!-- -->` stubs. Orphan: zero committed prose, not referenced from any framework file or scaffold index.

13. **"Utilities" umbrella term** — new collective name for scaffold parts/segments: scaffold.md heading "The five parts" → "DraftHorse Utilities"; references.md "data segment" → "data utility"; DraftHorse.md stub lists "Utilities (Agent Invariants, References, Steps, Terms, Handovers)". Terminology drift, half-applied — "utilities", "parts", and "segment" now coexist; scaffold's unchanged prose still says "five parts… data segment"; DraftHorse.md adds Handovers as a peer utility not reflected in scaffold's five parts. No single definition anywhere.

14. **New rule file extensions/rules/DraftHorse.md** — intended agent-facing rule set for navigating/operating a DraftHorse document (utilities + notation). Two stub comments only; not registered, symlinked, or in the marketplace. Orphan.

15. **Decision-slot reframe ("break out of computer mode")** — the Decision slot hands control to the agent to make a judgment when run-state emerges mid-run (steps.md TODO). Conflicts in emphasis with the committed Decision prose directly below it (scope/shape governance) — two framings of the same slot sit adjacent. Note: the `#### Decision:` heading placement itself is deliberate step-scope machinery, not a defect.

## Risks

- **Contradiction — handover file location** (concept 3). Root-sibling vs `handovers/` subfolder both asserted as "the convention" in handover.md and notation.md within this sweep. Concepts 3/4/6 all depend on one answer. Highest priority.
- **Semantic flip — half-applied states.** steps.md's template changed "Excludes half-applied states" → "Handles half-applied states" and a TODO questions whether error steps should absorb them, but the committed convention (conventions.md) and steps.md Conditions prose still say EXCLUDE. The framework now says both.
- **Undefined terms in committed prose:** "Child Skills" (11) used in scaffold.md but defined only in a stub; "Utilities" (13) is a committed heading with no definition.
- **Unwired/orphan concepts:** environments.md (12), DraftHorse.md (14), "Naming, not Explaining" (8), and the handover-audit / convention-mining TODOs in drafthorse-spec-check.md (6) — all TODO or stub, none reachable from the framework index or spec-check flow.
- **conventions.md is mid-refactor:** live TODOs mark existing bullets for deletion ("Steps are standalone", "Gates are compound", the no-op/why bullets) while replacements sit only in comments; the "error step claims the remainder" bullet is duplicated. Committed and draft states are interleaved.
- **Agnostic-standard tension:** "Dynamic Improvement" (9) hard-codes the `agent-library` repo name into an agnostic framework doc.
- **Under-specified notation:** `**AND**`/`**OR**` (2) has no precedence or grouping rule; the template mixes both in one list.
- **Truncated committed sentence:** scaffold.md ends a real (non-TODO) edit with "This also ensure grants" — incomplete prose landed as a live change.
