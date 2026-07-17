# Report: TODO Review

13 TODOs across 6 changed files, each with context, interpretation, assessment, and a recommendation. durable-documents.md, classroom files, and SKILL-template.md carry no TODO markers.

## docs/drafthorse/framework/conventions.md

**1. Line 8 — "Needs sharpening, not really a sharp definition this quote is more suitable for mining to fix this."** Sits after "Conditions are checkable and exhaustive", wrapping a quoted block of raw thinking (conditions are the source of truth; the next step's `start` catches the agent when the previous `finished` releases; "Do this next" is optional) plus a struck-through old "Steps are standalone" bullet. Assessment: valid — the quote is raw ore, and it overlaps the live "Steps are standalone" bullet. Recommendation: distil to one sharp convention — "**Conditions carry routing** — a step releases on its `finished`, the next catches on its `start`; `Do this next` is an optional pointer, never the mechanism." Delete the quote; fold the struck bullet in.

**2. Line 15 — "New convention" (Steps are universal).** Wraps a proposed convention: steps are controlled only by start/finished conditions, so more than one can be in play at once — enabling loopbacks, error catching before the producer finishes, and inert edge/branch steps. Assessment: valid — the model already appears in scaffold.md and the steps preamble but has no convention home. Recommendation: promote to a bullet "**Steps are universal** — a step is governed only by its start and finished conditions, so several can be in play at once," with the three affordances as a sub-list. Coupled with TODO 7.

**3. Line 24 — "Needs sharpening, what does this even mean?" (Gates are compound).** Wraps: an approval step finishes on approval AND the artifact's substantive conditions, never approval alone. Assessment: concept sound, phrasing opaque; referenced by the spec-check's Condition Checks. Recommendation: keep, rewrite concretely — a bare approval can wave through a broken artifact, so a gate's finished condition must include the artifact's own quality checks.

**4. Line 38 — "Replace with Sharp Prose".** Wraps a scratch block enumerating the four durable-doc defects plus a "Remove no-ops" bullet. Assessment: valid, but re-listing the defects duplicates durable-documents.md (also in this changeset) — a single-source-of-truth violation against convention 1 of this very file. Recommendation: make "**Sharp Prose**" short and point at durable-documents.md rather than re-list: "instruct the How, not the Why; every line must change agent behaviour. See durable-documents.md."

**5. Line 49 — "New convention" (Naming, not Explaining).** Headings short and unique for link-text; explanations go in a line beneath, not in the heading. Assessment: valid and consistent — inline cross-refs depend on short linkable anchors. Recommendation: promote to a bullet; drop the redundant trailing "Naming not explaining." restatement.

Non-TODO defects noticed here: lines 28/29 duplicate the "error step claims the remainder" bullet.

## docs/drafthorse/framework/scaffold.md

**6. Line 23 — "Uncertain explanation, decode this to refactor".** Wraps the frontmatter "Config wiring" bullet ("user configuration is fed into the document's commands directly…"). Assessment: the concept is correct — user config reaches skill-launched scripts via `${user_config.*}` substitution in the SKILL command, not env vars — but the bullet omits the mechanism, hence the murk. The preceding bullet (line 20) also ends mid-sentence: "This also ensure grants". Recommendation: rewrite concretely citing `${user_config.*}` substitution so the step receives a pre-resolved value; keep in sync with the identical bullet at spec-check line 60; fix the dangling line-20 sentence.

## docs/drafthorse/framework/steps.md

**7. Line 79 — "discuss if this is necessary?"** Before "Start conditions exclude half-applied states". Questions whether the rule is worth it, since an error step can start before the producer finishes — could error steps absorb half-applied states instead? Notes finished conditions getting "unruly" in the wild. Assessment: GENUINE OPEN DESIGN QUESTION, coupled to TODO 2; the current rule bloats start conditions, and "Steps are universal" strengthens the error-step option. Recommendation: your decision — lean: keep a lightweight de-hold in start conditions only for destructive-re-run protection; let the error step claim general half-applied cleanup, documented explicitly.

**8. Line 87 — "Refactor to align with orignal intention" (Decision).** Records the original intent: a slot for the agent to "break out of computer mode" and decide when state is undecided at invocation but emerges during the run (including flip/flop between references). The published text frames Decision narrowly as "scope or shape". Assessment: real divergence, but the current three limits (no work, no routing, must resolve to a fact the finished condition depends on) deliberately stop Decision becoming a dumping ground. Recommendation: your decision — lean: keep the disciplined definition but widen one example to cover the reference flip/flop case (choosing which reference to load IS a scope/shape decision), reconciling both without loosening the guardrails.

## docs/drafthorse/drafthorse-spec-check.md

**9. Line 9 — "Incorporate new conventions into this document".** Mine the new/adjusted conventions into checkable tests. Assessment: valid and correctly sequenced — the frontmatter's `update_instructions` mandate exactly this flow — but BLOCKED on TODOs 1–5. Recommendation: after conventions.md finalises, add checks for conditions-carry-routing, steps-are-universal, gates-are-compound, Sharp Prose, and Naming-not-Explaining; then regenerate drafthorse_saddler.md — never edit the usage directly.

**10. Line 65 — "Include new handover review, location, naming, referencing conventions".** Opens Handover Checks; existing checks cover structure/semantics but not location, naming, or referencing. Assessment: valid gap, and connected to the known spec gap where reused extracted work in references/ is mis-flagged — but the actual new conventions are NOT written anywhere in the changeset (handover.md contradicts itself on location). Recommendation: blocked on you supplying the settled conventions; then add them as Handover Checks bullets plus the audit step (TODO 11).

**11. Line 234 — "New handover audit step".** In the STEPS body after "Test Each Step"; comment notes "similar shape to the steps and references checks." Assessment: valid and structurally consistent — Handover Checks currently have no executing step. Depends on TODO 10. Recommendation: add `## +Audit the Handovers` shaped like Test Each Step (start: a handover is cited; finished: every Handover Check applied to every handover file, findings recorded).

## extensions/rules/DraftHorse.md

**12. Line 1 — "Stand Up a new DraftHorse rule set."** Near-empty stub; goal: a consuming ruleset so "an agent knows exactly how to navigate and operate a DraftHorse document," with placeholder sections Utilities (Agent Invariants, References, Steps, Terms, Handovers) and Notation. Assessment: valid net-new authoring, but it overlaps the framework docs (authoring) and spec-check (auditing) — its distinction must be the operator's guide. Recommendation: user-driven build; keep it agent-agnostic and point at the framework docs rather than duplicate them.

## docs/drafthorse/framework/environments.md

**13. (whole file)** — stub TODO comments sketching the environment taxonomy (Main Skill File / Sub agent / Child Skills / Handover Documents). Assessment: net-new authoring, orphaned — not referenced from any framework file. Recommendation: user-driven build alongside TODO 12; "Child Skills" is already used in committed scaffold.md prose, so this file (or scaffold.md) must define it.

## Cross-cutting

- Dependency chain: conventions.md TODOs 1–5 are the root; spec-check 9 depends on them; 10 → 11 form a handover sub-chain; DraftHorse.md 12 and environments.md 13 are independent net-new work.
- Two are genuine open design questions wanting your decision, not wording fixes: steps.md 7 and 8 (both coupled to convention 2). Should not be resolved unilaterally.
- Two need input absent from the changeset: 10 (the settled handover conventions) and 12 (the ruleset content).
- Non-TODO defects found while reading: conventions.md duplicate bullet (lines 28/29); scaffold.md mid-sentence truncation at line 20.
