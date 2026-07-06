# Verb Skills — Planning Doc

Scope: `extensions/skills/git/agent_commit/SKILL.md`, `extensions/skills/git/agent_push/SKILL.md`, `extensions/skills/git/agent_switch/SKILL.md`. These are the strongest DraftHorse documents in the library; this pass is polish, not restructure.

Depends on: `drafthorse-plan.md` decisions 1 (jump token `**-> +STEP**`), 2 (Return = non-success, Proceed = success; existing verb-skill orientations tolerated), and 4 (`#### Step Invariants`). All resolved — this plan is execution-ready; the remaining work is proposals 2–4.

## Proposed Changes

1. **Remove no-op sections** — DONE/RULED: the empty `#### Agent Invariants` heading in agent_switch `+READ PROCEDURE` is deleted (user fix, verified). The "**None at this time**" Terms sections are deliberate placeholders and stay as is.

2. **Route the amend abort through +RESULT** — agent_commit `+COMMIT amend` Decision (agent_commit/SKILL.md:207-208) says "End all procedures **AND** Report to the main agent the details of your no-op" without a jump, while every other abort path in the three skills converges on `+RESULT`. Fix: `**THEN**: run no further actions, **-> +RESULT** recording the multi-commit or already-pushed refusal` (token per the jump decision).

3. **Typos and slips** —
    - "ammend" → "amend" (agent_commit/SKILL.md:226).
    - agent_commit `+COMMIT amend` Return (line 221) gates on "further `COMMIT(new)` procedures" while `+COMMIT new`'s Return (line 182) gates on "further `COMMIT` procedures"; since `+READ PROCEDURE` already no-ops any amend that follows another commit, both gates can read "further `COMMIT` procedures" for symmetry — the guard logic lives in one place (`+READ PROCEDURE`).
    - agent_switch `+STASH` Proceed (line 103) ends with a dangling colon after "no-op note:". Trim.
    - agent_switch `+READ PROCEDURE` action map (lines 76-78) mixes `-->` and `->` arrows in the stash/switch/pop routing list. Normalise to the canonical jump token.

4. **Notation sweep** — apply the canonical jump token to all prose-form edges ("Proceed to `+RESULT`", "Return back to `+READ PROCEDURE`"), rename step-scoped `#### Agent Invariants` headings to the chosen name, and normalise the `**END**:` form (agent_commit:254, agent_push:110, agent_switch:167) to the canonical END form.

5. **Consistent exit-slot orientation in agent_switch** — STRUCK per user ruling: leave as is. A Proceed edge advances to a next node regardless of whether it carries success or failure; this convention already appears across the verb skills and drafthorse-plan decision 2's resolution tolerates it. No rewiring — only the notation sweep (proposal 4) applies.

## Decisions

1. **Emoji map placement** — agent_commit/SKILL.md:33-81 holds a ~50-line emoji/type map inline. Options: (a) keep inline — it is consulted on every commit, so it passes the "always-relevant" test for internal references, at a real token cost; (~~b) externalise to `agent_commit/references/emoji-map.md`, loaded by `+READ PROCEDURE` — saves context when the skill loads but adds a read on every run, which likely nets zero.~~ Recommendation: (a) keep inline; optionally prune rarely-used rows (e.g. 🎉 begin project, 📄 license, 🌐 i18n) to cut the cost instead.

2. **agent_switch success-edge orientation** — RESOLVED: (b) leave as is; the framework tolerates both orientations (see proposal 5's ruling).

## Guidance

Add any further direction below; it will be honoured over the recommendations above.

- #1 done
- #2 yes fix
- #3 fix typos
- #4 sweep to fix
- #5 Not really, its proceed to a next step, regardless if carrying failure or success. A brief check shows that this convention is used in other verb skills.
