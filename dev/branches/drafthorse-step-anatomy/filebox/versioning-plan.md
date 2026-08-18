# Versioning — Planning Doc

Scope: `extensions/skills/versioning/SKILL.md`, `extensions/skills/versioning/references/release-process.md`, `extensions/skills/versioning/references/setup-instructions.md`; deletion of `extensions/skills/versioning/SKILL.md.backup`. The assets/CHANGELOG-template.md is fine as-is.

Depends on: `drafthorse-plan.md` decisions 1 (jump token `**-> +STEP**`), 3 (framework unchanged; reference files converted in a standalone session), and 4 (`#### Step Invariants`). All resolved — this plan is execution-ready except proposal 6, which is deferred.

## Proposed Changes

1. **Delete the appended old skill body** — DONE (verified): the untracked-files invariant is in `+EXECUTE`, the `<!-- Previous Version -->` appendix is deleted, and `SKILL.md.backup` is moved to a `.deprecated` location.

2. **Fix the +DISPATCH self-contradiction** — the engagement (SKILL.md:42) says "Read `.claude/rules/versioning.md`" while the step invariant (SKILL.md:49) says "**DO NOT** run extra commands or read from the filesystem" — a leftover from git-box where no read was needed. Fix: reword the invariant to "**DO NOT** read any file other than the versioning config, and run no commands — the `Preflight` reference already holds the live git state."

3. **Close the multi-unit dead-end** — after a bare invocation the user may choose several units ("For each chosen unit, `--> +BREAKING CHANGES`", SKILL.md:77-78), but the graph only carries one unit through `+BREAKING CHANGES → +PROPOSE → +USER CONFIRMATION → +EXECUTE → +VERIFY`, and `+VERIFY` terminates. Fix: add a Return edge to `+VERIFY` — when the released unit verified clean and chosen units remain, jump to `+BREAKING CHANGES` for the next unit; the End edge fires only when no units remain. State in `+USER CONFIRMATION`'s multi-unit branch that units are released one at a time, in the order chosen.

4. **Add the user-declines branch** — `+USER CONFIRMATION`'s Decision (SKILL.md:68-80) covers setup, repair, unit choice, and approval, but not the user rejecting the release. Fix: add "**IF**: the user declines the release (or a unit) **THEN**: acknowledge, release nothing for it, and **END** (or continue to the next chosen unit when others remain)."

5. **Add a +SETUP step** — RULED: create the step now, with its logic living in SKILL.md only (propose the step's text to the user before implementing). `+DISPATCH`'s no-config edge jumps to `+SETUP`; the step owns drafting the config and confirming it with the user; its Proceed edge fires when the user approves the written config, jumping to `+PREFLIGHT`. `+USER CONFIRMATION` drops its setup branch. For now the step cites `references/setup-instructions.md` as an external reference for the discovery interview; when the deferred reference refactor (proposal 6) runs, the interview moves into `+SETUP` — leave a marker comment in the step noting this pending move.

6. **Rework the references** — DEFERRED per user ruling: the two reference files get a full DraftHorse conversion in a standalone session; create a planning doc for that session when it starts. The detail below is the starting brief for that doc:
    - `references/release-process.md` is mostly legitimate data (semver meaning, bump-mapping table, changelog format, command sequences, verification checklist) wrapped in imperative fragments. Fix: relocate the imperatives into the steps that own them — "ask the user whether a release is warranted" (when the range holds only non-user-visible commits) into `+PROPOSE`; the first-release baseline behaviour into `+RANGE` (already partly there — dedupe so it lives once); the gh-failure recovery instruction into `+EXECUTE` or `+VERIFY`. What remains is reference data the steps cite: rules, tables, formats, command blocks.
    - `references/setup-instructions.md` is a procedure (interview, placement choice, confirmation) plus data (config template, field rules). Fix: move the procedure into the new `+SETUP` step; reduce the file to the config template, the discovery heuristics as facts (manifest candidates, delegation warning, tag-pattern conventions), and the field rules. Rename to `references/config-template.md` to match its new content (update the SKILL.md citation).
    - Deduplicate the heredoc/temp-file rule, currently stated in both `+EXECUTE`'s invariants (SKILL.md:181) and release-process.md (twice, lines 94-97 and 102-104). Single source: the `+EXECUTE` invariant; the reference's command sequence just uses `-F <file>` without re-explaining.

7. **Notation and heading sweep** — normalise `#### Step invariants` (SKILL.md:47) to the chosen heading casing; convert all backticked `` `--> +STEP` `` jumps to the canonical token; normalise the mixed END forms (`**END**` mid-sentence at SKILL.md:125, 199, 204). Fix the stray list-nested THEN in `+PREFLIGHT`'s Return (SKILL.md:98 — the `**THEN**` line is inside the failure bullet list, misindented).

8. **Frontmatter review** — the skill is `disable-model-invocation: true`, so per the invocation-shaped-description convention the description should be a short user-facing summary; the current one is close but tool-shaped. Fix: trim to e.g. "Cut a semantic-version release for a configured unit — bump, changelog, tag, GitHub release." Keep `argument-hint`. The `model:` override is a decision below.

## Decisions

1. **model: haiku override** — `+PROPOSE` writes user-facing changelog prose and audits bump reasoning, and `+BREAKING CHANGES` exercises judgment about contract surfaces; these are above Haiku's weight class, while the mechanical steps are fine on it. Options: (a) raise to `model: sonnet`; ~~(b) drop the override and inherit the session model; (c) keep haiku for cost.~~ Recommendation: (a) — predictable quality at modest cost; the breaking-change agent already carries the heaviest judgment separately.

2. **Reference rework depth** — RESOLVED: deferred to a standalone session with its own planning doc (see proposal 6); this pass leaves the reference files untouched.

3. **Setup as a step vs a sub-flow** — proposal 5 puts setup in one `+SETUP` step, which will be a large step (interview + draft + confirm). Options: (a) one step, accepting the size; ~~(b) two steps (`+SETUP INTERVIEW` → `+SETUP CONFIRM`).~~ Recommendation: (a) — the work is one pass with one completion criterion (user-approved config on disk); split only if it proves unwieldy in use.

## Guidance

Add any further direction below; it will be honoured over the recommendations above.

- #1 Done
- #2 fix
- #3 fix
- #4 fix
- #5 fix (propose changes before implementing)
- #6 refactor later in an individual session, suggest creating a planning doc
- #7 fix
- #8 fix
