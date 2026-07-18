# Plan: Half-Applied States → Error-Step Disposition Catalogue

Status: Ready. Sources: TODO 7. Decision in [todos-discussion.md](todos-discussion.md) §7.

## Decision

The exclusion rule dies entirely — no start condition carries half-applied exclusions. steps.md's error-step section strengthens into a **disposition catalogue**: each general error class paired with its disposition. Half-applied states first: report the error to the user, exit the skill, advise manual fixing, suggest an issue to inform the skill repair agent (the Dynamic Improvement hook). "Hard exit and repair" is the default posture for destructive errors.

## Work

- `docs/drafthorse/framework/conventions.md` — delete the "Start conditions exclude half-applied states" bullet (line 22); the error-step convention bullet ("claims the remainder", currently DUPLICATED at lines 28–29 — keep one) gains "half-applied states are part of the remainder".
- `docs/drafthorse/framework/steps.md` — delete the exclusion paragraph (line 83) and the TODO above it (line 79); resolve the step-anatomy template line ("Handles half-applied states", line 47) by removing the clause entirely; rewrite "Exit steps and the error step" with the disposition catalogue (half-applied disposition as above; add other standard patterns as identified).
- `extensions/skills/drafthorse/assets/SKILL-template.md` — remove the exclusion guidance comment (line 72); align the error-step scaffold with the catalogue.
- Stale "exclude half-applied" call sites across drafthorse SKILL.md, condition-writing.md, versioning SKILL.md — see report-call-sites.md §6 for the full list (its `template/SKILL.md` entry is void — that file was DELETED, §17); spec-check/saddler sites are owned by [plan-spec-check-saddler.md](plan-spec-check-saddler.md).

## Dependencies

- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md): the saddler's exclusion test (saddler.md:83) is REPLACED by a disposition check (error step's engagement covers the common error paths).
- Touches the same conventions.md/steps.md region as the other conventions plans — framework-docs session grouping in the index.
- The "suggest an issue" disposition leans on the Dynamic Improvement convention (settled, no work — see index).
