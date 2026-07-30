# Plan: Mechanical Fixes (orphaned defects)

Status: Ready — any session, low risk. Sources: report-grammar-typos.md, report-prose-review.md. Only defects NOT owned by another plan are listed; everything else rides with its owning plan (noted there).

## Work

- [x] `docs/drafthorse/framework/conventions.md:3` — DONE (wave 3). "how much" capitalised; the opening was then rewritten by the user. Bucket-line restoration DECLINED — "laws and idioms co-existing together, all equal" and "not ranked here" already carry the flatness, and the metaphor would do work the plain words do.
- [x] `docs/drafthorse/framework/notation.md:7` — NO ACTION (wave 3, decided). The sharper claim ("the only executable marking") is now FALSE: the same document defines `**OR these are true:**` as the sole condition-list separator, which changes how an agent evaluates a step's conditions and is therefore executable too. Restoring it would contradict notation.md's own condition-list section. "An executable marking" is weaker but true — leave it.
- [x] `docs/drafthorse/framework/handover.md` — ALREADY CONSUMED by the handover.md rewrite. Both typos ("self contained", "reviwer") are gone; line 54 now reads "self-contained" and "reviewer". No edit needed.
- [x] `docs/drafthorse/framework/steps.md` finished-condition constraint — NOT LOST, no restoration needed. The report was reading the anatomy block (a one-line summary at :50, "This step's own completion criteria — checkable and exhaustive"). The full constraint lives in the `## Conditions` prose below it: "A finished condition doesn't route. It states when the step is done, nothing more." Intact.
- [x] `docs/drafthorse/framework/steps.md` gate paragraph — CONFIRMED superseded, no restoration. The Gates decision's single statement stands; the rubber-stamp/launder guard lives in conventions.md and the drafthorse `Conventions Digest`.
- [x] `docs/drafthorse/framework/scaffold.md` permissions bullet — FIXED BY THE USER during the scaffold.md session. The bullet ended mid-sentence ("…rather than held globally. This also ensure grants"); the truncated clause was struck. Found mid-session, owned by no plan.
- ~~`extensions/skills/classroom/SKILL.md` Terms `:` prefix — owned by [plan-reference-notation.md](plan-reference-notation.md); listed here only so it isn't forgotten if that plan defers it.~~ **VOID** — the `:` prefix is deprecated framework-wide, not restored. See [plan-terms-notation.md](plan-terms-notation.md); classroom is a de-prefixing site in wave 3.

## Dependencies

None — but check each item's owning plan hasn't already consumed it before editing (several handover.md/conventions.md defects vanish inside those rewrites).
