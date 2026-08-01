# Report: Stale Call Sites and Propagation Gaps

Repo-wide sweep for call sites left stale by the DraftHorse editing sweep, plus places new concepts should have propagated but didn't. Grouped by change; each item is file:line, the stale text, and the suggested update.

## 1. "Utilities" rename — "five parts" / "data segment" lingering

scaffold.md renamed its heading to "DraftHorse Utilities" and references.md now says "data utility", but the old terms survive widely:

- docs/drafthorse/framework/scaffold.md:3 — "the fixed frame every DraftHorse document shares: **five parts**" — stale against its own renamed heading.
- scaffold.md:5 "References is the **data segment**"; :11 "the data segment"; :35 "The **data segment**." — all old term.
- docs/drafthorse/framework/conventions.md:32 — "the **data segment** holds constants…".
- docs/drafthorse/framework/references.md:1 — the rename introduced a grammar break: "**References is** the data utility".
- extensions/skills/drafthorse/SKILL.md:24 "has **five parts**"; :28 "the data segment".
- docs/drafthorse/template/SKILL.md:26 and extensions/skills/drafthorse/assets/SKILL-template.md:26 — "The **data segment**."
- docs/drafthorse/drafthorse-spec-check.md:23 "has **five parts**"; :27 "the data segment"; :204 "Judge the **data segment**".
- extensions/agents/drafthorse-saddler.md:22 "**five parts**"; :26 "the data segment"; :198 "Judge the **data segment**".

Suggested: decide whether "Utilities" replaces "parts"; then replace "five parts" → "utilities" and "data segment" → "data utility" across the set. Note the count is now ambiguous — environments.md sketches Handovers as a sixth utility.

## 2. "Dynamic Improvement" rename

Clean — no surviving "Improve over time" anywhere; the rename at conventions.md:65 is the sole occurrence. Minor propagation gap: the drafthorse SKILL.md "Conventions Digest" (lines 44–51) carries neither the old nor the new convention (low priority; the digest is selective).

## 3. Handover location/naming — three conflicting conventions

- New-A (subfolder): handover.md:3 "reside in a **`handovers/` folder** inside the `skills/` folder"; notation.md:32 example `handovers/substeps.md` (subfolder, and no `-handover` suffix — also contradicts New-B's naming).
- New-B (root sibling + suffix): handover.md:36 "**`<skill>/setup-handover.md`** … in the root folder as a sibling, not in `references/`"; handover.md:38 "append **`-handover`** to the file name."
- handover.md:3 and :36 are mutually exclusive — the primary contradiction; resolve before propagating anything.
- Old (`references/`) — every consumer still uses it: drafthorse/SKILL.md:32, :178, :247 (Term); references/step-splitting.md:22; references/collecting-references.md:45; handover.md:71 (its own carve-out); drafthorse-spec-check.md:121, :184 and drafthorse-saddler.md:117, :178 (audit logic keyed on `references/` + `type: handover`); classroom/SKILL.md:109, :149, :219, :240, :351; and all four classroom handover files physically live in `references/`.

Suggested: pick one convention in handover.md, then mass-propagate (relocate and rename the classroom handovers; fix the notation.md example). Propagation gap: handover.md:118's new "Document Reviews" section expects reviewers to walk handover files by these conventions, but the saddler (:178) and spec-check (:184) still discover handovers only via inline `references/` citations — neither knows `handovers/` or `-handover`. Your TODOs at spec-check.md:65 and :234 flag this as unbuilt.

## 4. Handover reference notation (" — Handover" link text)

New form (notation.md:32): `[Substeps — Handover](path)`. No existing citation uses it — all use prose "follow `references/X.md` as a handover doc": drafthorse/SKILL.md:178; classroom/SKILL.md:109, :149, :219, :240; Terms at drafthorse/SKILL.md:247 and classroom/SKILL.md:351. Every preamble copy of "A step may fold in a **handover doc**…" (template/SKILL.md:49, spec-check :48/:164, saddler :47/:158, doc-reviewer :111, breaking-change-detector :134, classroom references, versioning :86) describes folding without the new link notation. Suggested: if the " — Handover" link form is canonical, update the citation instruction in drafthorse/SKILL.md:178, step-splitting.md:22, the classroom citations, and the Terms. Large blast radius.

## 5. `**AND**` / `**OR**` condition-link notation

Defined at notation.md:14, demonstrated at SKILL-template.md:61-63 and :69-71 — and used nowhere else. Real compound conditions still prose-chain: drafthorse/SKILL.md:106, :142; classroom/SKILL.md throughout; versioning/SKILL.md:273. references/condition-writing.md — the conditions authoring guide and natural home — never mentions AND/OR. Minor drift: SKILL-template.md:60's comment still carries the "Could the agent claim this is met while work remains?" test that conventions.md/steps.md dropped. Suggested: add AND/OR to condition-writing.md and reference it from the saddler/spec-check Condition Checks.

## 6. Half-applied states — "Handles" vs "Exclude" (split verdict)

- Says HANDLE (new): steps.md:44 — "Start this step when: … **Handles half-applied states**."
- Says EXCLUDE (old, ~11 sites): steps.md:83 (same file — "must **exclude half-applied states**", a direct contradiction of :44); conventions.md:22; template/SKILL.md:59; SKILL-template.md:59; drafthorse/SKILL.md:44; references/condition-writing.md:11; spec-check.md:87, :232; saddler.md:83, :226; versioning/SKILL.md:273.

The steps.md:80-81 TODO questions whether half-applied states should move to error steps, so :44 is unresolved thinking rather than a settled rename. Note saddler.md:83 actively tests for exclusion — if "Handles" wins, that check inverts. Confirm direction before propagating; currently one contradictory line vs ~11 sites.

## 7. "Child Skills" — used in prose, defined only in a stub

- scaffold.md:20 committed prose uses "**child skills**" ("…if a DraftHorse step invokes child skills these permissions transfer…") and the sentence is unfinished: "This also ensure grants".
- The term is defined only inside an HTML-comment TODO block at environments.md:17, and is absent from the utilities list in extensions/rules/DraftHorse.md:5 and from environments.md live text; scaffold.md:19's Permissions bullet uses the older "sub-agent that invokes it" framing for the same mechanism.

Suggested: promote "Child Skills" to a defined concept in environments.md and thread it into the utilities list, or drop the term for the existing "sub-agent that invokes it" framing. Finish the dangling sentence either way.

## 8. Terms ":" prefix — classroom is the lone outlier

notation.md:31 still mandates the "`:` prefix — a term definition in the Terms section." classroom/SKILL.md:349-354 now uses bare `**Term**:` for all six entries. Everything else keeps the colon: drafthorse/SKILL.md:244-248, spec-check :278-282, saddler :268-272, template/SKILL.md:127-128, SKILL-template.md:135-136, breaking-change-detector :211-214, git-robot :223-232, doc-reviewer :198-200, course-researcher :121-125, git-box/SKILL.md:307-312, versioning :395-397. Suggested: classroom is most likely stale — restore the ":" there; or if bare is the new convention, update notation.md:31 and all eleven conformers.

## 9. Internal/external reference notation

- Conforms: classroom/SKILL.md:105 now uses the internal anchor form `[Classroom Signal](#classroom-signal)`.
- Candidates, not hard failures: framework cross-doc links use bare filename link text (`[steps.md](steps.md)` etc.) throughout scaffold.md, conventions.md, steps.md, references.md, while the new external example uses descriptive text (`[Reference File](references/reference.md)`). These predate the rule — judgment call whether to conform them.

## 10. "house geometry" → "page geometry"

Fully swept, clean. No surviving "house geometry"; classroom/SKILL.md:62, :64, and the Term at :351 all updated, still pointing consistently at print-base.css.

## Cross-cutting propagation gaps

1. Steps-are-universal / multiple-in-play semantics (conventions.md TODO, steps.md:42-45) are not reflected in the saddler/spec-check "In-Play Set" checks (saddler :272, spec-check :282) nor in condition-writing.md; "Walk the Scenarios" (spec-check :240) watches the in-play set but never tests intentional multi-in-play (an error step starting before its producer finishes).
2. "Sub Agents as optimal environment" (conventions.md:67) and the environments.md stub have no downstream references; framework/README.md should list environments.md once it's real.
3. extensions/rules/DraftHorse.md — the intended consumer-facing rule that would carry these renames — is a two-line stub.
4. Many TODO/HTML-comment blocks are now embedded in shipped framework docs (conventions.md:15-63, scaffold.md:213-215, steps.md:80-81/:96-101, spec-check :9-11/:65-66/:234, DraftHorse.md, environments.md). Anything propagated from them is provisional until the notes resolve.

## Resolve-first contradictions

1. Handover location/naming — handover.md self-contradicts (line 3 subfolder vs line 36 root sibling), notation.md picks a third variant, and 100% of consumers use `references/`. Nothing propagates until one convention wins.
2. Half-applied "Handles" vs "Exclude" — one template line vs ~11 sites plus an active saddler check; likely an in-progress edit.
3. Terms ":" prefix — classroom lone divergent vs eleven conformers plus notation.md.
