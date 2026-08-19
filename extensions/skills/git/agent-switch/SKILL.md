---
harness-format: DraftHorse
name: agent-switch
description: Execute the switch procedure using this skill. Specialised skill for `Git Robot`, not for general agent usage.
user-invocable: false
allowed-tools: Bash(git switch *), Bash(git stash *), Bash(git status *), Bash(git branch *)
---

# Switch

Move the working tree between branches and manage the stash around that move. The `SWITCH` procedure of the `Brief` you already hold names the actions and their order (`stash`, `switch`, `pop`); this skill runs them in that order and reports what happened to the tree at each step.

# Agent Invariants

**DO NOT** use this skill unless you are a `Git Robot` Agent.

**NEVER** discard uncommitted work. Do not run `git switch` on a dirty tree without an accompanying `stash` action.
**NEVER** use `git stash drop`/`clear` or `git switch --discard-changes`. A dirty switch that was not asked to stash is a refusal, not a forced move.

# --- REFERENCES ---

## Current Git State

These overviews show whether the tree is dirty and what branches exist — enough to run each action safely.

=== Branch + status ===   
!`git status --short --branch`

=== Local branches ===   
!`git branch`

=== Stash list ===   
!`git stash list`

## Actions

A `SWITCH` procedure carries one or more actions, run **in the order written**:

- **stash** — set the dirty working tree aside with `git stash push` before moving. Records a stash entry to restore later.
- **switch** — change to the target branch named in the task overview.
- **pop** — restore the most recent stash entry with `git stash pop` onto the current branch.

A procedure may chain them (`SWITCH(stash, switch, pop)`) or split them across the brief (`SWITCH(stash)` … `SWITCH(pop)`), bracketing other procedures between the stash and the pop.

## Switch Outcomes

The `Result` you return mirrors git's own report. Capture the meaningful state for each action run:

- **Stashed** — record that the tree was set aside (e.g. `stashed 4 files`).
- **Switched** — record the branch moved to (e.g. `-> feature/x`).
- **Popped** — record the restore, and any conflict git reports on pop.
- **Refused** — a dirty `switch` with no `stash` action, or a missing target branch. Record why, do not force.

# --- STEPS ---

Steps are universal and standalone. Marked `## +<Step Name>`. Work, instructions, rules — self-contained. Invoke a step whenever its start conditions match. Step completes only when its finished conditions match. Multiple steps activate at once. Call every cited reference. References use markdown link notation.

## +Read Procedure

Judge the next action against the live tree before running anything.

**Looping step** — Re-runnable, taking a different branch each pass.

#### Start this step when these are true:

- the `SWITCH` procedure holds an action not yet run
- no refusal, failure, or no-op has ended the run

#### Step finished when these are true:

- the next action is judged safe to run

**OR these are true:**

- a refusal is recorded with its reason

**OR these are true:**

- no actions remain in the procedure

### Review the Action:

From the `Brief` read the `SWITCH` procedure and its [Actions](#actions). Review them against the [Current Git State](#current-git-state), to judge tree cleanliness and branch existence. Pick the first/next uncompleted action.

#### Agent decision:

Safety decides whether the action runs at all. A `switch` action on a dirty tree with no `stash` action preceding it (in the procedure, or in an earlier still-open `SWITCH(stash)`) is a refusal — run no actions and record it. A `switch` action naming a target branch that does not exist is likewise a missing-branch refusal.

## +Stash

Set the dirty working tree aside before moving.

#### Start this step when these are true:

- the next safe action is `stash`

#### Step finished when these are true:

- the stash result is recorded

**OR these are true:**

- a command failure is recorded as a refusal

**OR these are true:**

- an already-clean tree is recorded as a no-op

#### Step invariants:

**DO NOT** create an empty stash. Report the no-op instead.

### Run the Stash:

Run `git stash push -u`. Record the stash result.

## +Switch

Change to the target branch named in the task overview.

#### Start this step when these are true:

- the next safe action is `switch`

#### Step finished when these are true:

- the switch result is recorded

**OR these are true:**

- a failure or error is recorded as a refusal note

### Run the Switch:

Run `git switch <branch>`. Record the branch moved to.

## +Pop

Restore the most recent stash entry onto the current branch.

#### Start this step when these are true:

- the next safe action is `pop`

#### Step finished when these are true:

- the pop result is recorded

**OR these are true:**

- a failure, error, or conflict is recorded as a note

#### Step invariants:

**DO NOT** resolve conflicts from the Pop action. Report the conflict instead.

### Run the Pop:

Run `git stash pop`. Record the restore, and any conflict git reports.

## +Result

Emit the outcome/s back to git-robot so it can render the `SWITCH` Output Directive in its report.

**Error step** — folded into this reporting step per the executor exception, so its start condition claims the ended run alongside the completed one.

#### Start this step when these are true:

- every action in the procedure has run

**OR these are true:**

- a refusal, failure, conflict, or no-op has ended the run early

#### Step finished when these are true:

- the result lines are emitted as the final message text
- the skill is complete

#### Step invariants:

**DO NOT** add prose beyond the action lines and any refusal, conflict, or no-op note.

### Result:

Return one line per action run — the action and its resulting state, captured per [Switch Outcomes](#switch-outcomes):

```txt
<action> -> <state>
```

Include refusals, conflicts, and no-ops:

```txt
<refusal, conflict, or no-op note>
```

# --- TERMS ---

Terms used in this skill:

**None at this time**
