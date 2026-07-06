# DraftHorse v2 — Exploration: Declarative Steps

An exploration of a redesign of the DraftHorse step model, prompted by re-reading `extensions/skills/matt-pocock/write-great-skills` (the framework's inspiration). Status: exploration only — nothing is converted yet; this document exists to make the whole picture judgeable before committing.

## The problem with v1

The v1 step model is an imperative graph: steps are addressable nodes (`## +STEP NAME`), wired together with jump tokens and exit slots (Proceed, Return, End) carrying IF/THEN operator chains. Two failure modes emerged from real use:

- **Verbosity and uniformity** — every step ends in the same routing furniture, so the distinctive content of each step (the actual work) is visually buried. Reading a v1 skill, it is hard to tell where you are; the Proceed/Return/IF/THEN blocks all look the same.
- **Enumerative correctness burden** — the graph is only correct when every edge is identified and wired ("resolve all branches"). Audits found dangling edges in every v1 document, including carefully written ones. Refactoring or creating a skill means re-proving edge coverage every time.
- **The agent must know DraftHorse** — the notation (jump tokens, slot semantics, operators) is a language the executing agent has to have learned. Skills should be self-explanatory: readable unaided by any agent, and writable with much less framework hand-holding.

## The v2 model

The redesign flips the modus from imperative to declarative. There is no routing. Each step is a self-contained unit declaring its own entry and exit conditions in plain English; the executing agent's judgment is the router. Steps are listed loosely in execution order as a readability aid, but order is not a hard boundary — a step engages whenever its entry condition holds.

### Step anatomy

Three fixed parts and one optional part, all plain markdown:

```markdown
## +Step Name

#### Step Criterion:

<the conditions/when under which this step engages>.

#### Invariants:

#### Engagement:

<Engagement — the work, written as prose. Reference pointers are cited inline. Custom Markdown headers are welcome, even the engagement header itself should be replaced>

#### Decision:

<optional, plain prose — what is being decided and between what, when the step contains a genuine bounded choice>.

#### Completion criterion:

<the condition that tells the agent the work is done — checkable and exhaustive>.
```

What this removes from v1: the `+CAPS` node names and `**-> +STEP**` jump token (they existed purely for jump addressing), the Proceed/Return/End/Breakout slots, and the IF/THEN/WHEN/OR/AND operator vocabulary. Decisions are written as natural prose. Step headings become ordinary Title Case.

What survives from v1: the five-part scaffold (frontmatter, global invariants, references, steps, terms), the bold+CAPS invariant form (`**NEVER**`, `**ALWAYS**`, `**DO NOT**` — an open family) at both global and step scope, the references section as the data segment, and the terms glossary.

### References are cited inline, at the moment of use

A reference matters at a moment, not at a step: one step may use a mapping table while deriving and a format while drafting — two moments, two pointers. A structural `References:` header per step would separate each pointer from its moment; the pointer's wording and placement is what decides whether the agent actually loads the material. So: cite at the point of use, inside the engagement ("map each commit using the table in `references/release-process.md`") or inside the completion criterion ("complete when every rule in the Changelog Rules reference has been applied" — which makes the reference binding rather than advisory). The skill-level References section remains the home for inline data; external files remain the home for expansive data.

### The completion criterion is the load-bearing wall

The entry and completion conditions inherit all the weight the wired edges used to carry. This is the one hard rule of the v2 step model, carried over from the inspiration doc: a completion criterion must be **checkable** (the agent can tell done from not-done) and **exhaustive** (it encompasses all the work — "every chosen unit released, declined, or reported nothing-to-release", not "the releases are done"). "Complete when: done" recreates v1's vagueness with less structure; a weak criterion is the v2 equivalent of a dangling edge.

### The error step: subtractive edge coverage

v1's correctness burden was enumerative — wire every edge. v2's is subtractive — steps claim their conditions, and one terminal **error step** claims the remainder:

```markdown
## Handle a Problem

Do this step when: something has gone wrong, or a situation has arisen that no other
step covers.

Surface the problem to the user plainly: what happened, where in the skill it arose,
and what the options are.

Complete when: the user has been informed and has decided how to continue — resuming
another step, or ending the skill.
```

This is the declarative replacement for "resolve all branches", and unlike that rule, it is satisfactory by construction: the drain always exists. The failure mode shifts from "agent falls off an unwired edge silently" to "agent lands in the error step and says so".

### Skill exits are step-based

No document-level End. A skill has one or more **exit steps** — terminal steps whose completion criterion ends the skill (typically one success exit, plus the error step above). A skill with loops simply has a success exit whose entry condition is "all work is finished" (e.g. "do this step when every chosen unit has been released, declined, or reported nothing-to-release").

## Worked before/after — one versioning step

v1 (current `extensions/skills/versioning/SKILL.md`, the `+PROPOSE` step and the slice of the `+USER CONFIRMATION` hub that serves it):

```markdown
## +PROPOSE

Derive and present the proposed bump for the unit.

Map each conventional commit in range to a bump level using the table in `references/release-process.md`. Apply the bump floor from `+BREAKING CHANGES`, which overrides a lower commit-derived bump; report any discrepancy.

Present the commit list, what each commit maps to, the resulting bump (e.g. "2 feat, 1 fix → minor: 1.0.1 → 1.1.0"), and a draft changelog entry written user-facing — what a user of the unit notices, not a git log dump. Always show the reasoning, so the user can audit and learn the mapping.

#### Step Invariants

**ALWAYS** state whether the breaking-change scan ran, was skipped (with the reason), or failed.

#### Proceed

**WHEN**: The proposal — bump, reasoning, and draft changelog — is presented
**THEN**: `--> +USER CONFIRMATION`

## +USER CONFIRMATION (the slice serving +PROPOSE)

**IF**: The user is confirming a version update that you proposed **OR** have requested a change to the bump level or change log entry
**THEN**: `--> +EXECUTE`
```

v2 (the same behaviour, one self-contained step, no hub):

```markdown
## Propose

#### Do this step when:

A unit has commits in range and a breaking-change verdict recorded, but no proposal has been shown to the user yet.

Map each conventional commit in range to a bump level using the table in `references/release-process.md`. Apply the bump floor from the breaking-change scan — it overrides a lower commit-derived bump; report any discrepancy. Present the commit list, what each commit maps to, the resulting bump (e.g. "2 feat, 1 fix → minor: 1.0.1 → 1.1.0"), and a draft changelog entry written user-facing — what a user of the unit notices, not a git log dump. Always show the reasoning, and state whether the breaking-change scan ran, was skipped (with the reason), or failed.

#### Complete when:

The user has seen the bump, the reasoning, and the draft changelog, and has responded — approval or edits mean the release is ready to execute (the user's edits win); a decline means this unit is finished, recorded as declined.
```

The routing hub (`+USER CONFIRMATION`) dissolves entirely under v2 — every step that used to wire through it absorbs its own user-response handling into its completion criterion. Three planned v1 fixes (the multi-unit loop, the user-declines branch, the preflight repair loop) stop existing as fixes: they fall out of entry/completion wording. The multi-unit loop, for example, is just the Breaking Changes entry condition ("a chosen unit has commits in range but no bump floor recorded") holding again for the next unit.

## How the existing implementations fare

- **versioning** — the strongest conversion candidate. Its awkwardness is almost entirely routing overhead (the confirmation hub, the loop edges); v2 removes the cause rather than patching symptoms.
- **git-box** — substantial benefit. The clarification loop, the background-agent wait, and the report→help/workflow fan-out all read better as entry conditions. Its guardrails (brief format, verbatim report, no-mutation invariant) live outside the routing and carry over untouched.
- **verb skills (agent_commit/push/switch) and git-robot** — least helped. They are mechanical executors on smaller models where explicit routing is cheap insurance, and the action loop in agent_switch is where the v1 graph genuinely earns its keep. They can stay v1 indefinitely; the framework can hold both shapes, or they convert last once v2 has proven itself on the orchestrators.

## What this obsoletes in the current plan docs

If v2 is adopted, these settled items across the filebox plans become obsolete or need re-deciding:

- `drafthorse-plan.md` — proposals 4 (jump token), 5 (exit-slot semantics), 9 (END form) and decisions 1, 2 are superseded; proposal 1 (completion philosophy) is absorbed into the v2 steps.md rewrite; proposals 2, 3, 6, 7 and the template rewrite change shape but survive in spirit.
- `git-box-plan.md` — proposal 3's residuals and proposal 7's notation sweep are superseded by a v2 conversion; proposals 1, 2, 4 (workflow step), 6 (typos), 8 survive.
- `verb-skills-plan.md` — unaffected if the verb skills stay v1; proposal 4's sweep targets change if a v1 notation cleanup still happens.
- `versioning-plan.md` — proposals 3, 4 (loop and decline branches) dissolve under v2; proposals 2, 5 (+Setup), 7, 8 survive with v2 shapes; proposal 6 (reference refactor session) is unaffected.

The framework rewrite itself: steps.md is rewritten around the v2 anatomy, error step, and exit steps; notation.md shrinks to the invariant form and structural labels; conventions.md swaps "resolve all branches" for "every step has a checkable entry and a checkable, exhaustive completion" and keeps the rest; scaffold.md and references.md need only light touch-ups; the template is rewritten to the v2 shape (and becomes much shorter).

## Decisions

1. **Adopt v2** — the gating decision. Options: (a) adopt for the framework and both orchestrator skills (versioning first as pilot, then git-box); (b) pilot versioning only, judge, then decide the framework rewrite; (c) stay v1. Recommendation: (b) — convert the skill where the payoff is clearest, live with it briefly, then rewrite the framework from evidence rather than ahead of it.

2. **Verb-skill fate** — options: (a) verb skills and git-robot stay v1 indefinitely (two shapes coexist, framework documents both); (b) convert them too once v2 settles, accepting the loss of explicit routing on small-model executors. Recommendation: (a) for now; revisit with evidence.

3. **Naming the two condition lines** — the exploration uses "Do this step when:" and "Complete when:". Alternatives: "Entry:" / "Exit:", "When:" / "Done when:". Recommendation: keep the long forms — they are self-explanatory to an unaided agent, which is the point.

## Guidance

Add any further direction below; it will be honoured over the recommendations above.

- 
