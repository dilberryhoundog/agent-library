---
name: git-box
display-name: Git Box
description: Use Git Box to route basic git procedures to a background agent. So that important work can continue in the foreground of the main chat.
disable-model-invocation: true
allowed-tools: Bash(git status *), Agent(git-robot), Skill(agent *)
---

The main agent loop is important, it needs careful management to ensure longevity and quality of the context. Therefore, use this Git Box to route basic git procedures to a background agent. So that important work can continue in the foreground of the main chat, without reducing quality or burning tokens.

# Agent Invariants

**NEVER** call the git-robot agent directly. Wait for user to enter the skill command themselves.

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
- Task overview: (A launch point for git-robot to write / perform effectivly )

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

## Workflow Templates

Workflows listed here are available to use as your brief. Replace any generic `<placeholder>` with the actual information you need.

#### Use a Workflow

Check the `Workflow Map` for workflows

**IF**: The user’s request is similar to a workflow listed, or the request could benefit from the workflow, or the user specifically requests a workflow.
**THEN**: Reference the Workflow, check that it is indeed suitable for the request, by viewing the complete template.

**IF**: The workflow is suitable for the request.
**THEN**: Silently fill in your brief using the workflow template, filling the request-specific data as you go.

#### Workflow Map

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

## +GATHER CONTEXT

Receive and collate all the context available to you. This is your source of truth.

=== User Request ===  
$ARGUMENTS

=== Git context ===  
!`git status -s -b -u`

=== Chat context ===  
Use your knowledge of current chat context.

#### Agent Invariants

**DO NOT** run extra commands or read from the filesystem.

#### Return

**IF**: The request is unclear or ambiguous.  
**Message**: - inform the user that the request is unclear and ask for clarification

**IF**: The request involves git commands outside of the agents scope.  
**Message**: - inform the user that the request involves git commands outside the agent’s scope and ask to help manage the current git state

#### Proceed

**IF**: Agent has enough context to formulate the brief
**THEN**: Proceed to `+FORMULATE BRIEF` step.

## +FORMULATE BRIEF

Using available context, formulate a brief for the git-robot agent.

#### Agent Invariants

**DO NOT** Add any extra prose or context outside the pre-formated brief.

#### Format

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

#### Decision

`git-robot` has inbuilt logic to split commits into logical groupings.
The agent can also do this by sending through each logical commit as a single procedure.
The choice is made from your confidence in the gathered context. If unsure, send down the responsibility to the subagent.
Whichever choice is made, ensure the task overview of each is adequate for the agent to execute.

#### Proceed

**WHEN**: The brief has been formulated, to cover the user's request.
**THEN**: Proceed to `+CALL AGENT` step.

## +CALL AGENT

Invoke the `git-robot` agent to execute the planned procedures.

`agent("git-robot")`

Use the `Brief` as your only message to the agent.

#### Agent Invariants

**DO NOT** Mutate any files, while the agent is executing the request in the background.
**ENSURE** You return to this step after the Agent finishes executing the request.

#### Return

**IF**: The agent was unable to invoke the agent.  
**Message**: - Inform the user of the agent invocation problem, suggest a fix and an alternative method.

**IF**: The agent invoked successfully.  
**Message**: - Inform the user of the successful invocation and that the agent is working on their request in the background. The user and you can proceed with the conversation, but cannot mutate any files.

#### Proceed

**WHEN**: The `git-robot` agent has finished executing the request and the agent has a valid conversation turn.
**THEN**: Proceed to `+PRESENT REPORT` step.

## +PRESENT REPORT

The `git-robot` agent will present a summary of their tasks completed.

#### Present Findings

The `git-robot` report already arrives split into `Successful Procedures`, `Failures and Errors`, and `Additional Notes`. Present those sections to the user verbatim — do not re-sort or re-bucket the directive lines. Carry the `Additional Notes` content through unchanged; it is where git-robot surfaces difficulties, so never drop it.

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

#### Return

**IF**: The report is enough to satisfy the user's request and the skill process succeeded without problems.

#### Proceed

**IF**: The request succeeded and represents a repeatable workflow.
**THEN**: Proceed to `+WORKFLOW` step.

**IF**: The request succeeded but the skill process had problems **OR** The request succeeded but the results included errors or failures.
**THEN**: Proceed to `+HELP` step.

## +HELP

The main agent is available to help the user handle some issues that may arise during the skill process.

#### Help the user

**Skill Process Failures**: Talk with the user about the issues after the request and offer to create an issue. Refer to `Issue Creation` below.
**Git Errors**: Talk with the user about the git errors and offer to fix or handle them in the main chat. Use care when proceeding with these fixes, making sure the user understands your actions and approves them first.
Also if the git error reveals a way the skill can be improved or fixed, offer to create an issue.
Refer to `Issue Creation` below.

#### Return

**END**: Return to the main chat loop, to help the user.

## +WORKFLOW

Save commonly repeated, successful requests as a workflow, refer to them to ensure consistency and efficiency.

#### Agent Invariants

**ENSURE** The uploaded brief is sanitised by using `****` to mask sensitive words. Or use a `<placeholder>` to provide a general idea of the requested procedure.

#### Upload a Workflow

Upload the brief you successfully used, to create a new workflow. Refer to `Issue Creation` below.

#### Return

**END**: Return to the main chat loop, to upload the workflow.

# --- TERMS ---

Terms used in this skill:

: **Request**: The responsibility transfer from the user to claude to the subagent and back. Carries summaries of actions required and taken and the result of those actions.
: **Procedure**: An atomic, self-contained, collection of instructions relating to a specific git command. The agent knows how to execute the procedures (including actions). They are formatted in capital letters and represented with <PROCEDURE> in templates.
: **Skill Process**: The agent harness components working in harmony, Includes the skill, the agent, other sub skills called by the agent.
: **Action**: A fine-tuning event on a procedure. Corresponds with similar git commands. They are represented with <action> in templates, and formatted in lowercase.
: **Result**: The outcome of a procedure mostly mirrors the output or error messages directly from the git command.
: **Brief**: The template by wich the main agent passes the request to the subagent.
