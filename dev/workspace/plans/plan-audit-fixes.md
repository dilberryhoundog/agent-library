# Plan: Independent-Audit Fixes

Status: DONE (2026-08-01) — every group applied, saddler regenerated, lockstep verified, closing greps clean. Two items resolved differently from the plan as written: root cause A (see below, the carve-out was drift, not a decision) and F9 (the notation rule gained three clauses so the conversion could be checked mechanically). Remaining after this pass: the wave-5 release, and the author's skill-by-skill audit under the corrected spec — `versioning/SKILL.md:276` is a known first finding.

Source: `dev/workspace/reviews/independent-audit.md` (independent audit of the DraftHorse spec-upgrade branch, 2026-07-30). Every finding below was verified against the working tree the same day. These are the sites the wave-1–4 migration sweep did not reach; the migration itself audited clean. Do this on branch `drafthorse-spec-upgrade`, before the wave-5 release.

## How to work this plan

Read each file before editing and edit per verified site — no scripted regex sweeps for the edits (a house rule for this corpus; scripts are for measurement only). The findings group into root causes A–D plus standalone items; fix by group. **Regenerate the saddler ONCE at the very end** (see Closing), never per-edit — the saddler is generated from `drafthorse-spec-check.md` and must never be hand-edited.

## Decisions of record (already made — do not re-litigate)

- **F9 citation form: CONVERT the documents, do not soften the rule.** External-reference citations become Markdown links (`[Step-splitting](references/step-splitting.md)`), matching `notation.md`'s "every citation is a link" and the baked-in preamble line "References are inline, using Markdown link styling." The rule is right; the flagship documents are wrong.
- **F14 spec-check stamp: leave it UNSTAMPED — working as intended.** `drafthorse-spec-check.md` is an authoring source, never executed or installed; stamping it would make the auditor's own master copy discoverable as an auditable document. Its `role:` field justifies carrying the scaffold without being a runtime DraftHorse document. No fix. (Optional: sharpen the `role:` text to name the exception; not required.)
- **F12/F13-README: leave, tracked elsewhere.** `extensions/rules/DraftHorse.md` (TODO-only) is the on-hold [plan-drafthorse-rule.md](plan-drafthorse-rule.md) work — do not fill it here; note only that it should not have shipped empty. `README.md:18`'s agent-body TODO is the open fifth-surface question already logged in [00-INDEX.md](00-INDEX.md) — leave until that is decided.

## Root cause A — half-applied rule reversal not propagated to downstream prose (HIGH)

**RESOLVED, and the plan's own premise was wrong.** This group was written on the belief that the settled rule keeps a narrow carve-out — an exclusion clause where re-running is destructive. It does not. [plan-half-applied-dispositions.md](plan-half-applied-dispositions.md) says "the exclusion rule dies entirely — no start condition carries half-applied exclusions", and `framework/steps.md:131` states the disposition positively: report to the user, exit the skill, advise a manual fix, never re-run a step over its own partial work. The carve-out was invented in wave 4 when the spec-check was drafted; the author's `<!-- Not true… -->` note at `:105` was flagging exactly that drift.

Resolution applied (2026-08-01): half-applied left the `Condition Checks` / start-conditions region entirely — it is not a condition concern — and now lives as one positive rule at the error step. Sites:

- `drafthorse-spec-check.md` — start-conditions bullet and the author note DELETED; new `Half-applied state bails to the user` bullet in `Step-Shape Checks` beside `Exit steps present`, carrying the account-report-end sequence plus the false-positive guard (an exclusion clause demanded of a start condition is a false positive); `+Audit the Steps` engagement rolled back to `start condition (state terms, de-hold)` with the bail added to the set-level judgement.
- `condition-writing.md` — bullet removed from the start-conditions list; the disposition stated once in the routing-patterns list at the end.
- `drafthorse/SKILL.md` — digest bullet removed; the rule folded into the existing `The error step claims the remainder` bullet.
- `SKILL-template.md` — half-applied clause removed from the start-condition comment; the error step's own engagement prose now carries the bail, so a generated skill teaches its reader without DraftHorse training.

Rationale of record, from the author: a bail back to the user is the welcome outcome, not a failure of the skill — the user would rather be told plainly and given a recommendation than have partial state pot-shotted behind the scenes, and repeated bails are the signal that the skill should be refined to handle that path. It also keeps the error step doing what it is for: catching failures it could not know about in advance, so the rest of the document stays lean.

Original finding text, for reference — these were the four downstream sites teaching the retired blanket rule:

- **`docs/drafthorse/drafthorse-spec-check.md:261`** — the `+Audit the Steps` engagement lists "start condition (state terms, de-hold, half-applied exclusion)". This engagement is what the auditing agent actually performs, so it reintroduces the exact false positive the check above it was fixed to remove. Change the parenthetical to reflect that the exclusion is conditional on destructive re-run, and that partial-state disposition is judged at the error step — phrase it consistently with the settled `Half-applied states...` entry in `Condition Checks`.
- **`extensions/agents/drafthorse-saddler.md:258`** — identical stale line. DO NOT hand-edit; it is fixed automatically when the saddler is regenerated from the spec-check at Closing.
- **`docs/drafthorse/drafthorse-spec-check.md:105`** — stray author note `<!-- Not true, destructive re running should also be handled in the exit stpe by bailing out before rerun -->`. It is pointing at this same issue. Resolve the note's substance into the surrounding check prose (destructive re-run is bailed at/handled by the exit step), then delete the comment.
- **`extensions/skills/drafthorse/references/condition-writing.md:29`** — the `- **Exclude half-applied states**` bullet still says "Add the exclusion explicitly ... and hand the half-applied state to the error step" as a blanket rule. `drafthorse/SKILL.md`'s `+Draft the Skill` step loads this guide, so it makes builders author over-specified conditions. Soften to: add the exclusion only where re-running is destructive/non-idempotent; otherwise the error step disposes of partial state.
- **`extensions/skills/drafthorse/SKILL.md:45`** — `Conventions Digest` bullet "Start conditions exclude half-applied states" carries the same blanket claim; align it.
- **`extensions/skills/drafthorse/assets/SKILL-template.md:62`** — author comment "Exclude half-applied states — a condition that still holds after the step failed partway invites a destructive re-run." Soften to the conditional rule.

## Root cause B — "two preambles" not propagated to framework layers 1 and 3 (MEDIUM)

Both sites still assert a single universal preamble copied everywhere, contradicting `handover.md:58` and the spec-check's "Two preambles are legitimate". An author reading `scaffold.md` (layer 1, read before `handover.md`) would put the universal preamble into a handover, causing the error-drain failure the variant exists to prevent.

- **`docs/drafthorse/framework/steps.md:19` and `:33`** — ":19" says "Every DraftHorse document opens its steps section with the same short boilerplate"; ":33" says "the same text is copied verbatim into every document." Qualify: skills and agents take the universal preamble shown; a handover takes the handover-variant preamble (point to [Handover](handover.md)).
- **`docs/drafthorse/framework/scaffold.md:10` and `:34`** — both say the steps section "opens with the universal steps preamble". Qualify the same way — note the handover variant with a pointer.

## Root cause C — template OR-separator ships broken generators (HIGH)

`notation.md` requires `**OR these are true:**` "standing on its own line", exact wording, and the saddler flags any deviation. All four template sites have it indented two spaces (a Markdown list-continuation of the preceding `- <condition 2>` rather than a standalone line) and carry a bare literal `(optional)` that copies through into every generated document. So the shipped templates generate documents that fail the shipped checker.

- **`extensions/skills/drafthorse/assets/SKILL-template.md:66` and `:76`**
- **`extensions/skills/drafthorse/assets/HANDOVER-template.md:49` and `:59`**

Fix at each: dedent `**OR these are true:**` to column 0 (its own line, no leading spaces), and move the `(optional)` marker into an HTML comment (`<!-- optional -->`) so it never copies into a generated skill.

## Root cause D — classroom template dead paths (HIGH — widest blast radius)

The handover rename (`references/setup.md` → `setup-handover.md`) did not reach the `plugins/classroom/templates/` payload, which is copied verbatim into every classroom project root and auto-loads as rules. An agent asked to re-bootstrap follows a dead path.

- **`plugins/classroom/templates/.claude/rules/classroom.md:17`** — `` `references/setup.md` `` → `` `setup-handover.md` `` (confirm the correct relative form the copied rule needs; the handover sits at the skill root, not under `references/`).
- **`plugins/classroom/templates/CLAUDE.md:35`** — "read the skill's `references/setup.md`" → `setup-handover.md`.

## Standalone findings

- **F10 (MEDIUM) — handover trips Scaffold Check 1.** `drafthorse-spec-check.md:25` (and mirrored saddler:25 via regeneration): Check 1 demands the line `harness-format: DraftHorse` "casing exact", with no carve-out, while the `Reduced audit profile` keeps scaffold checks "in full" — so a handover's `harness-format: DraftHorse, Handover` fails a literal match. Reword Check 1 to accept the `, Handover` subtype (e.g. "carries `harness-format: DraftHorse`, optionally with a `, <Subtype>` suffix; casing exact"). Spec-check only — saddler follows on regeneration.
- **F9 — DONE, and the notation rule was extended to make it executable.** Converting exposed three gaps in `notation.md`'s External References rule, all settled by the author and now written into `notation.md` and mirrored as two `Notation Checks` entries. (1) **Link text is Title Case** — extension stripped, dashes *and underscores* to spaces, each word capitalised, matching the Title Case rule above it and the `[Media Processing — Handover]` form already shipped; deliberate filename casing is kept, so `SKILL-template.md` cites as `[SKILL Template]` and `_template.md` as `[Template]`. The literal "first letter uppercased" reading would have produced `[Collecting-references]`. (2) **Folders are legal link targets** — `[Documents](templates/documents/)`, trailing slash included, for a step that lists a folder and picks from it. (3) **Relative paths resolve from the citing file** — a nested document reaches back with `../`; a skill-root-relative path written from a nested file is a broken link and now a finding. Converted: `drafthorse/SKILL.md` (11 sites) and `classroom/SKILL.md` (7 sites, including the folder citations). Every link verified to resolve on disk.

  Deliberately NOT converted (author's call — leave for now): `versioning/SKILL.md:129`, `markdown/SKILL.md:74`, `media-processing-handover.md:28`, and the four classroom template parts under `templates/{lesson,course}-structures/` whose skill-root-relative paths are exactly what the new `../` check exists to catch. The auditor will surface them when each skill is audited individually.

- **F9 (MEDIUM) — external citations to link form.** *(original finding text)* Convert every backticked external-reference path to the `[Name](path)` link form. Known sites (grep to confirm the full set before declaring done — `grep -rn '`references/' extensions/skills` and check `docs`): `extensions/skills/drafthorse/SKILL.md` (~:33, :60, :61, :62, :113, :149, :181) and `extensions/skills/classroom/SKILL.md` (~:132, :184, :222). Link text is the filename with extension stripped and first letter uppercased, per `notation.md`'s External References rule. Do NOT touch handover citations (already in `[Name — Handover](name-handover.md)` form) or bare inline mentions inside prose that are not citations-of-use — convert the citation sites a step actually loads from.
- **F11 (LOW) — `docs/classroom-skeleton.md`** (`:28`, `:142` heading, `:182`, `:189`) still documents `references/setup.md`. Repo-internal map, no runtime effect. Update to `setup-handover.md` for accuracy.

## Closing (mandatory, in order)

1. **Regenerate the saddler** from the spec-check: keep the saddler's frontmatter + identity paragraph (everything up to `# Agent Invariants`, including its `harness-format: DraftHorse` stamp), replace everything from `# Agent Invariants` onward with the spec-check's body from `# Agent Invariants` onward. This is what fixes saddler:258, :25, and any other mirrored line — never hand-edit the saddler.
2. **Verify lockstep:** `diff <(sed -n '/^# Agent Invariants/,$p' extensions/agents/drafthorse-saddler.md) <(sed -n '/^# Agent Invariants/,$p' docs/drafthorse/drafthorse-spec-check.md)` returns nothing.
3. **Re-grep the corpus:** no `references/setup.md` in `plugins/` or `docs/classroom-skeleton.md`; no indented `  **OR these are true:**` in the templates; no `(optional)` bare text in the templates; every `+Audit the Steps` engagement and half-applied guide aligned. 
4. **Optional but recommended:** re-run the saddler acceptance test (fresh-file method, reading `extensions/agents/drafthorse-saddler.md` directly, since the plugin is not yet released) against a migrated skill to confirm no new checker defect was introduced.

## Dependencies

- Precedes wave-5 release ([00-INDEX.md](00-INDEX.md)) — these are corpus correctness fixes that should ship WITH the migration, not after.
- Independent of [plan-classroom-saddler-fixes.md](plan-classroom-saddler-fixes.md) (those are classroom-document routing defects; these are migration-sweep misses). F1/F2/F11 touch classroom but are path renames, not routing.
- The grants-transfer open question ([plan-spec-check-saddler.md](plan-spec-check-saddler.md)) is untouched here.
