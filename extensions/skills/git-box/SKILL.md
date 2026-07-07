---
name: git-box
display-name: Git Box
description: Use Git Box to route basic git procedures to a background agent. So that important work can continue in the foreground of the main chat.
disable-model-invocation: true
allowed-tools: Bash(git status *), Agent(git-robot), Skill(agent-commit), Skill(agent-push), Skill(agent-switch)
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

<!-- Currently under construction, awaiting workflow uploads -->

| Workflow Name | Type | Reference | Procedure Map |
|---------------|------|-----------|---------------|
|               |      |           |               |

## Issue Creation

If a step requires. Write an issue to `dilberryhoundog/agent-library` repo, with the `Git Box` skill name and the crux of the issue in the subject.
Use the `gh MCP` to create the issue. Also check open issues for previously reported issues using `gh mcp`.

**Errors**: Include the standard error or failure reporting patterns in the body (e.g. problem, reproduction steps, etc)
**Workflows**: Include the `Brief` the main agent sent to the subagent. Also include a small summary outlining why the workflow is needed, and the skill name that invoked the brief.

# --- STEPS ---

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.

## +Gather Context

Collate the request, the git state, and the chat context into a single source of truth.

#### Start this step when:

The skill has been invoked and context has not yet been gathered.

#### Step finished when:

The request is unambiguous, within scope, and carries enough context to write the brief — directly or from the user's clarifications.

#### Invariants:

**DO NOT** run extra commands or read from the filesystem — the context below is the whole source of truth.

### Collate:

=== User Request ===  
$ARGUMENTS

=== Git context ===  
!`git status -s -b -u`

=== Chat context ===  
Use your knowledge of current chat context.

When the request is unclear or ambiguous, ask the user for clarification. When it involves git commands outside the agent's scope (anything beyond commit / push / switch, stash, pop), tell the user and offer to help manage the current git state in the main chat instead.

## +Check Workflows

Reuse a proven workflow as the brief when one fits the request.

#### Start this step when:

Context is gathered and the workflow check has not yet run.

#### Step finished when:

A suitable workflow is adopted as the brief draft, or none matched (including an empty map) and the brief will be written fresh — either way, the workflow check is recorded as complete.

### Match the Request:

Check the `Workflow Map` reference. When the user's request is similar to a listed workflow, could benefit from one, or names one specifically — view the complete template and confirm it actually suits the request, then silently adopt it as the brief draft, filling the request-specific data as you go.

## +Formulate Brief

Turn the gathered context into a brief for the git-robot agent.

#### Start this step when:

The workflow check has completed and the brief is not yet complete — whether starting fresh or finishing an adopted workflow template.

#### Step finished when:

The brief is formatted per the template and covers the user's whole request.

#### Invariants:

**DO NOT** add any extra prose or context outside the pre-formatted brief.

### Format:

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

#### Decision:

`git-robot` has inbuilt logic to split commits into logical groupings, and the brief can also do the splitting by sending each logical commit as its own procedure. Choose by your confidence in the gathered context — if unsure, send the responsibility down to the subagent. Whichever way, ensure each procedure's task overview is adequate for the agent to execute.

## +Call Agent

Invoke the git-robot agent to execute the brief in the background, and hold the line until it reports back.

#### Start this step when:

A complete brief exists and git-robot has not been invoked with it.

#### Step finished when:

The agent has been invoked, the user informed, and the git-robot report has arrived. An invocation failure is a problem for the `+Help` step.

#### Invariants:

**DO NOT** mutate any files while this step is in play — from invocation until the report arrives.

### Invoke:

`agent("git-robot")` — use the `Brief` as your only message to the agent.

Inform the user the agent is working on their request in the background: the conversation can continue, but no files can be mutated until it reports back. This step stays in play for the whole wait — the conversation may continue around it, but the no-mutation invariant holds until the report arrives.

## +Present Report

Relay the git-robot report to the user verbatim.

#### Start this step when:

The git-robot report has arrived and has not yet been presented.

#### Step finished when:

The report is presented unaltered, and the run's outcome is recorded — full success, success worth saving as a workflow, or a run with failures, errors, or process problems.

#### Do this next:

A full success ends the skill — return to the user. A run worth saving moves to saving the workflow; failures, errors, or process problems move to help.

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

## +Save a Workflow

Save a commonly repeated, successful request as a workflow for consistency and efficiency.

#### Start this step when:

The report has been presented, the request succeeded, and it represents a repeatable workflow.

#### Step finished when:

The workflow issue is created. The skill is complete.

#### Do this next:

End the skill and return to the user.

#### Invariants:

**ENSURE** the uploaded brief is sanitised by using `****` to mask sensitive words, or a `<placeholder>` to provide a general idea of the requested procedure.

### Upload the Workflow:

Upload the brief you successfully used, to create a new workflow. Refer to the `Issue Creation` reference.

## +Help

Handle problems from the run with the user — the step for anything the others don't cover.

#### Start this step when:

The report contains failures or errors, the skill process itself misbehaved (including a failed agent invocation), or a situation has arisen that no other step covers.

#### Step finished when:

The user has been informed and has decided how to continue — fixing together in the main chat, filing an issue, or ending here. The skill is complete.

#### Do this next:

End the skill and return to the user.

### Help the User:

**Skill Process Failures**: Talk with the user about the issues and offer to create an issue — refer to the `Issue Creation` reference.
**Git Errors**: Talk with the user about the git errors and offer to fix or handle them in the main chat. Use care when proceeding with these fixes, making sure the user understands your actions and approves them first. If a git error reveals a way the skill can be improved, offer to create an issue for that too.

# --- TERMS ---

Terms used in this skill:

: **Request**: The responsibility transfer from the user to claude to the subagent and back. Carries summaries of actions required and taken and the result of those actions.
: **Procedure**: An atomic, self-contained, collection of instructions relating to a specific git command. The agent knows how to execute the procedures (including actions). They are formatted in capital letters and represented with <PROCEDURE> in templates.
: **Skill Process**: The agent harness components working in harmony, Includes the skill, the agent, other sub skills called by the agent.
: **Action**: A fine-tuning event on a procedure. Corresponds with similar git commands. They are represented with <action> in templates, and formatted in lowercase.
: **Result**: The outcome of a procedure mostly mirrors the output or error messages directly from the git command.
: **Brief**: The template by which the main agent passes the request to the subagent.
