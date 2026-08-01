# Git Box — Planning Doc

Scope: `extensions/skills/git-box/SKILL.md`, `extensions/agents/git-robot.md`, and deletion of `extensions/skills/git-box/SKILL.md.deprecated`.

Depends on: `drafthorse-plan.md` decisions 1 (jump token `**-> +STEP**`), 2 (Return = non-success, Proceed = success), 4 (`#### Step Invariants`), 5 (Message deprecated → THEN). All resolved — this plan is execution-ready.

## Proposed Changes

1. **Fix the self-contradicting global invariant** — SKILL.md:13 reads "**NEVER** call the git-robot agent directly. Wait for user to enter the skill command themselves." Read literally, this forbids the skill's own `+CALL AGENT` step. The intent is that the main agent must not invoke git-robot outside this skill's flow. Fix: reword to something like "**NEVER** invoke the git-robot agent except from the `+CALL AGENT` step of this skill; do not invoke it ad hoc from the main chat." (Note: this invariant is really guidance for the agent *before* the skill loads, which only works if the agent has the skill in context — worth confirming the invariant is doing real work at all; if not, cut it as a no-op.)

2. **Fix the allowed-tools skill pattern** — SKILL.md:6 grants `Skill(agent *)` but the verb skills are named `agent-commit`, `agent-push`, `agent-switch`; the space-separated pattern likely fails to match. Fix: `Skill(agent-*)` or the three names explicitly. Verify the working syntax against the harness's permission-pattern rules before committing.

3. **Resolve dangling branches** — DONE (user fix, verified): `+PRESENT REPORT` now carries a proper End slot resolving the old THEN-less IF, and `+GATHER CONTEXT`'s Returns carry THENs with the Proceed closing the clarification loop ("directly or from user clarifications"). Two residuals for the notation sweep (proposal 7): the new End slot uses `**END**:` with a colon (convention is bare `**END**`), and `+CALL AGENT`'s Return still uses `**Message**:`.

4. **Promote the workflow logic to a primary step** — RULED per user guidance and drafthorse-plan proposal 7 (reference logic is conceptual guidance, not a hard restriction): "Issue Creation" (SKILL.md:88-94) stays in References as written. The workflow-selection logic ("Use a Workflow", SKILL.md:70-78) becomes a new primary step between `+GATHER CONTEXT` and `+FORMULATE BRIEF` that checks the Workflow Map and redirects when a suitable workflow is found; the Workflow Map table itself stays in References as data.

5. **De-duplicate shared Terms with git-robot.md** — STRUCK per drafthorse-plan proposal 8's rejection: the orchestrator and the sub-agent never share context, so the duplicated Terms are deliberate and stay. Only the shared "wich" typo is fixed (proposal 6).

6. **Typos** — "effectivly" → "effectively" (SKILL.md:32), "wich" → "which" (SKILL.md:269 and git-robot.md:198), "infront" → "in front" (git-robot.md:68), "pre-formated" → "pre-formatted" (SKILL.md:134).

7. **Notation sweep** — apply the canonical jump token to every Proceed/Return edge (currently prose form, e.g. SKILL.md:126, 164, 190), rename step-scoped `#### Agent Invariants` headings to the chosen name, normalise `**END**:` (SKILL.md:242, 258) to the canonical END form, and replace `**Message**:` (SKILL.md:118, 121, 182, 185) per the Message-token decision. Sweep git-robot.md with the same rulings (it is a DraftHorse document: same scaffold, steps, terms).

8. **git-robot.md branch check** — while sweeping, close its own loose edge: `+DISPATCH` Proceed (git-robot.md:124) reads "loaded successfully **OR** doesn't block later procedures", which permits proceeding to `+EXECUTE` on a *failed* load; the intent is "loaded successfully, OR failed but non-blocking → skip to next dispatch". Fix: split into two explicit edges (success → `+EXECUTE`; non-blocking failure → record the failure and return to `+DISPATCH` for the next procedure).

9. **Delete SKILL.md.deprecated** — DONE (user deleted, verified).

## Decisions

1. **Workflow Map scaffolding** — RESOLVED: (a) keep; the workflow logic is promoted to a primary step (proposal 4) and the upload loop populates the map over time.

2. **git-robot.md sweep scope** — RESOLVED: (a) include git-robot.md in this pass.

3. **Markdown table in Workflow Map** — RESOLVED: keep the table as is.

## Guidance

> Add any further direction below; it will be honoured over the recommendations above.

- The global invariant's purpose is because the skill will sit in the session context from the initial user invocation. This attempts to prevent the main agent from calling the sub agent directly once they know that it exists. It could probably be rewritten, so that this distinction is more explicit.
- workflow logic: this should be a primary step, that redirects if a suitable workflow is found. place between gather context and formulate brief.
- #2 is the standard pattern outlined in claude docs, a quick check might suffice
- #3 I have atempted a fix, can you check
- #4 & #5 addressed in DraftHorse-plan.md
- #6 & #7 yes sweep these.
- #8 yes do this fix.
- #9 deleted
