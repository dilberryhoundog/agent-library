---
harness-format: DraftHorse
name: git-box
display-name: Git Box
description: Use Git Box to route basic git procedures to a background agent. So that important work can continue in the foreground of the main chat.
disable-model-invocation: true
allowed-tools: Bash(git status *), Agent(git-robot), Skill(dev-tools:agent-commit), Skill(dev-tools:agent-push), Skill(dev-tools:agent-switch), mcp__plugin_github_github__issue_write, mcp__plugin_github_github__search_issues
---

# Git Box

The main agent loop is important, it needs careful management to ensure longevity and quality of the context. Therefore, use this Git Box to route basic git procedures to a background agent. So that important work can continue in the foreground of the main chat, without reducing quality or burning tokens.

# Agent Invariants (Global)

**NEVER** call the git-robot agent directly from the main chat. This skill sits in the session context after its first invocation — even so, git-robot is only ever invoked from the `+Call Agent` step of a run the user started by entering the skill command.

# --- REFERENCES ---

## Git Robot Agent

`Agent(git-robot)`

**=== Receives ===**  
Procedures:  
Agent's internal procedures mapping to a skill to perform basic git procedures.

- `COMMIT`
- `PUSH`
- `SWITCH`

Git context:

- State: (what does the agent do with staged or unstaged changes)
- Task overview: (A launch point for git-robot to write / perform effectively)

**=== Procedure actions ===**

These are the only actions available for usage, use them in order of appearance.

COMMIT:

- `new` - create a new commit
- `amend` - amend the last commit

PUSH:

SWITCH:

- `switch` - switch to a different branch
- `stash` - stash changes
- `pop` - pop stashed changes

**=== Procedure Format ===**

`<PROCEDURE>(action)`

- Call actions in order you would like them called.
- A procedure can have multiple actions (eg `SWITCH(stash, switch, pop)`)
- The same procedure can be called multiple times, (eg `SWITCH(stash), <other procedure>, SWITCH(pop)`)

**=== Examples ===**

- `COMMIT(new)`
- `COMMIT(amend)`
- `PUSH`
- `SWITCH(stash, switch)`

## Workflow Map

Proven briefs saved as reusable workflows. Replace any generic `<placeholder>` with the request-specific information.

| Workflow Name         | Type                      | Reference                          | Procedure Map        |
|-----------------------|---------------------------|------------------------------------|----------------------|
| commit-and-push       | commit and push           | [Commit And Push](workflows/commit-and-push.md)             | COMMIT(new), PUSH    |
| multi-commit-and-push | multiple commits and push | [Multi Commit And Push](workflows/multi-commit-and-push.md) | COMMIT(new)…, PUSH   |

## Issue Creation

If a step requires. Write an issue to `dilberryhoundog/agent-library` repo, with the `Git Box` skill name and the crux of the issue in the subject.
Use the `gh MCP` to create the issue. Also check open issues for previously reported issues using `gh mcp`.

**Errors**: Include the standard error or failure reporting patterns in the body (e.g. problem, reproduction steps, etc)
**Workflows**: Include the `Brief` the main agent sent to the subagent. Also include a small summary outlining why the workflow is needed, and the skill name that invoked the brief.

# --- STEPS ---

Steps are universal and standalone. Marked `## +<Step Name>`. Work, instructions, rules — self-contained. Invoke a step whenever its start conditions match. Step completes only when its finished conditions match. Multiple steps activate at once. Call every cited reference. References use markdown link notation.

## +Gather Context

Collate the request, the git state, and the chat context into a single source of truth.

#### Start this step when these are true:

- the skill has been invoked

#### Step finished when these are true:

- the request is unambiguous
- the request is within scope
- the request carries enough context to write the brief, directly or from the user's clarifications

**OR these are true:**

- the request is out of scope, or cannot be clarified into scope
- the user has been told, and offered main-chat help instead
- the skill is complete

#### Step invariants:

**DO NOT** run extra commands or read from the filesystem — the context below is the whole source of truth.

### Collate:

=== User Request ===  
$ARGUMENTS

=== Git context ===  
!`git status -s -b -u`

=== Chat context ===  
Use your knowledge of the current chat context.

When the request is unclear or ambiguous, ask the user for clarification. When it involves git commands outside the agent's scope (anything beyond the procedures and actions in [Git Robot Agent](#git-robot-agent)), tell the user and offer to help manage the current git state in the main chat instead.

## +Check Workflows

Reuse a proven workflow as the brief when one fits the request.

#### Start this step when these are true:

- context is gathered

#### Step finished when these are true:

- a suitable workflow is adopted as the brief draft
- the workflow check is recorded as complete

**OR these are true:**

- no workflow matched the request, including an empty map
- the brief will be written fresh
- the workflow check is recorded as complete

### Match the Request:

Check the [Workflow Map](#workflow-map) reference. When the user's request is similar to a listed workflow, could benefit from one, or names one specifically — load the referenced `workflows/` template and silently adopt it as the brief draft, filling the request-specific data as you go. The suitability test is the fill itself: when every `<placeholder>` can be filled correctly from the gathered context the template suits; when one cannot, bail and write the brief fresh.

## +Formulate Brief

Turn the gathered context into a brief for the git-robot agent.

#### Start this step when these are true:

- the workflow check has completed

#### Step finished when these are true:

- the brief is formatted per the template
- the brief covers the user's whole request

#### Agent decision:

`git-robot` has inbuilt logic to split commits into logical groupings, and the brief can also do the splitting by sending each logical commit as its own procedure. Choose by your confidence in the gathered context — if unsure, send the responsibility down to the subagent.

#### Step invariants:

**DO NOT** add any extra prose or context outside the pre-formatted brief.

### Format:

Write each procedure from the [Git Robot Agent](#git-robot-agent) reference, and ensure each procedure's task overview is adequate for the agent to execute.

- Place each procedure on a new line with an `-->` prefix.
- Nest state and task overview under the procedure in a list format.
- Leave a blank line between each procedure.

=== Template ===

```txt
--> <PROCEDURE>(action)
- <state management>
- task overview

--> <next procedure>(action)
- <state management>
- task overview
```

## +Call Agent

Invoke the git-robot agent to execute the brief in the background, and hold the line until it reports back.

#### Start this step when these are true:

- a complete brief exists

#### Step finished when these are true:

- the agent has been invoked
- the user has been informed
- the git-robot report has arrived

**OR these are true:**

- the invocation failed or was aborted
- the failure is recorded

#### Step invariants:

**DO NOT** mutate any files while this step is in play — from invocation until the report arrives or the invocation fails.

### Invoke:

`agent("git-robot")` — use the `Brief` as your only message to the agent.

Inform the user the agent is working on their request in the background: the conversation can continue, but no files can be mutated until it reports back. This step stays in play for the whole wait — the conversation may continue around it, but the no-mutation invariant holds until the report arrives.

## +Present Report

Relay the git-robot report to the user verbatim.

#### Start this step when these are true:

- the git-robot report has arrived

#### Step finished when these are true:

- the report is presented unaltered
- the run's outcome is recorded — full success, success worth saving as a workflow, or a run with failures, errors, or process problems

### Present Findings:

The report already arrives split into `Successful Procedures`, `Failures and Errors`, and `Additional Notes`. Present those sections to the user verbatim — do not re-sort or re-bucket the directive lines. Carry the `Additional Notes` content through unchanged; it is where git-robot surfaces difficulties, so never drop it.

=== Report ===

```txt
GIT BOX REPORT

Successful Procedures:
✅ <PROCEDURE> -> <RESULT>
✅ <PROCEDURE> -> <RESULT>

Failures and Errors:
🚫 <PROCEDURE> -> <RESULT>
🚫 <Error> -> <RESULT>

Additional Notes:
<git-robot's notes, or "none">
```

## +Conclude

End the run on a plain success and hand the conversation back.

**Success step** — Resolves the run's done state and exits.

#### Start this step when these are true:

- the report has been presented
- the run's outcome is recorded as a full success

#### Step finished when these are true:

- the user has the conversation back
- the skill is complete

### Conclude:

Nothing failed and nothing needs saving — return the conversation to the user.

## +Save a Workflow

Save a commonly repeated, successful request as a workflow for consistency and efficiency.

**Dormant step** — Skippable, activates only when its state arises.

#### Start this step when these are true:

- the report has been presented
- the run's outcome is recorded as a success worth saving as a workflow

#### Step finished when these are true:

- the workflow issue is created
- the skill is complete

#### Step invariants:

**ENSURE** the uploaded brief is sanitised by using `****` to mask sensitive words, or a `<placeholder>` to provide a general idea of the requested procedure. The brief will be publicly viewable on github.
**DO NOT** convert the brief into a template — upload it as it ran.

### Upload the Workflow:

Create the proposal issue per the [Issue Creation](#issue-creation) reference, carrying the brief exactly as it was sent to git-robot (sanitised only) and the meta that marks it a workflow proposal:

**Title**:

```txt
WORKFLOW PROPOSAL: Git-Box - <request summary>
```

**Body**:

```txt
=== WORKFLOW PROPOSAL ===
<repeatability reason>

=== Brief ===
"<insert brief here>"

```

#### Further processing:

The issue resolver converts the brief into a `workflows/` template and updates the [Workflow Map](#workflow-map); the next release propagates it to every installation.

## +Help

Handle problems from the run with the user — the step for anything the others don't cover.

**Error step** — Handles recovery and bails.

#### Start this step when these are true:

- the run's outcome is recorded as a run with failures, errors, or process problems

**OR these are true:**

- the skill process itself misbehaved, including a failed agent invocation

**OR these are true:**

- a situation has arisen that no other step covers

#### Step finished when these are true:

- the user has been informed
- the user has decided how to continue — fixing together in the main chat, filing an issue, or ending here
- the skill is complete

### Help the User:

**Skill Process Failures**: Talk with the user about the issues and offer to create an issue — refer to the [Issue Creation](#issue-creation) reference.
**Git Errors**: Talk with the user about the git errors and offer to fix or handle them in the main chat. Use care when proceeding with these fixes, making sure the user understands your actions and approves them first. If a git error reveals a way the skill can be improved, offer to create an issue for that too.

# --- TERMS ---

Terms used in this skill:

- **Request** — The responsibility transfer from the user to claude to the subagent and back. Carries summaries of actions required and taken and the result of those actions.
- **Procedure** — An atomic, self-contained, collection of instructions relating to a specific git command. The agent knows how to execute the procedures (including actions). They are formatted in capital letters and represented with <PROCEDURE> in templates.
- **Skill Process** — The agent harness components working in harmony, Includes the skill, the agent, other sub skills called by the agent.
- **Action** — A fine-tuning event on a procedure. Corresponds with similar git commands. They are represented with <action> in templates, and formatted in lowercase.
- **Result** — The outcome of a procedure mostly mirrors the output or error messages directly from the git command.
- **Brief** — The template by which the main agent passes the request to the subagent.
