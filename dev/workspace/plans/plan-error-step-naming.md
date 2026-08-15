# Plan: One Name for the Error Step

Status: OPEN — name proposed, not settled. Source: issue #38.

## Decision

**error drain**, **error step**, **problem step**, `+Handle a Problem` — four names, one object. [plan-preamble-prose.md](plan-preamble-prose.md) rewrites the preamble line carrying *error drain*, so the naming settles alongside it rather than touching the same boilerplate twice.

Proposed: **error step** as the noun everywhere. `+Handle a Problem` stays as the conventional heading. *error drain* and *problem step* retire to zero.

Reasoning: *error step* already heads the `steps.md` section defining the object, and matches the function-catalogue entry in [plan-step-functions.md](plan-step-functions.md). *error drain* names a property — coverage runs subtractive, the step claims the remainder — worth stating in prose, not worth a second noun. The heading survives because it names work rather than machinery, as every engagement heading does.

## Work

- `docs/drafthorse/framework/steps.md` — 14 sites, including the dispositions, both exceptions (executor, handover), and the `## Exit steps and the error step` section itself.
- `docs/drafthorse/framework/handover.md` — 3 sites.
- `docs/drafthorse/framework/scaffold.md`, `framework/README.md`, `framework/conventions.md` — single sites each.
- `assets/HANDOVER-template.md:31` — "no success exit, no error drain — the parent owns both".
- `assets/SKILL-template.md` — the `+Handle a Problem` block comment.
- `extensions/skills/drafthorse/SKILL.md` (10 sites), `references/condition-writing.md` (5), `references/step-splitting.md` (3).
- Corpus sweep — skills and agent documents in `extensions/`, plus the four classroom handovers.
- `docs/drafthorse/drafthorse-spec-check.md` (13 sites) and the saddler's Terms. Regenerated last.

## Dependency

- Preamble no longer routes failures anywhere, so the vocabulary lives only in prose. Nothing blocks this beyond deciding the word.
