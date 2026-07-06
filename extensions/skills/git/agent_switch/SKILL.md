---
name: agent-switch
description: Execute the switch procedure using this skill. Specialised skill for `Git Robot`, not for general agent usage.
user-invocable: false
allowed-tools: Bash(git switch *), Bash(git stash *), Bash(git status *), Bash(git rev-parse *), Bash(git branch *)
---

# Switch

Move the working tree between branches and manage the stash around that move. The `SWITCH` procedure of the `Brief` you already hold names the actions and their order (`stash`, `switch`, `pop`); this skill runs them in that order and reports what happened to the tree at each step.

# Agent Invariants

**DO NOT** use this skill unless you are a `Git Robot` Agent.

**NEVER** discard uncommitted work. Do not run `git switch` on a dirty tree without an accompanying `stash` action.
**NEVER** use `git stash drop`/`clear` or `git switch --discard-changes`. A dirty switch that was not asked to stash is a refusal, not a forced move.

# --- REFERENCES ---

## Current Git state

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

## Switch outcomes

The `Result` you return mirrors git's own report. Capture the meaningful state for each action run:

- **Stashed** — record that the tree was set aside (e.g. `stashed 4 files`).
- **Switched** — record the branch moved to (e.g. `-> feature/x`).
- **Popped** — record the restore, and any conflict git reports on pop.
- **Refused** — a dirty `switch` with no `stash` action, or a missing target branch. Record why, do not force.

# --- STEPS ---

## +READ PROCEDURE

From the `Brief` read the `SWITCH` procedure and its actions. Review them against the `Current Git State`, to judge tree cleanliness and branch existence.

Pick the first/next uncompleted action.

#### Decision

**IF**: The procedure contains a `switch` action on a dirty tree **AND** no `stash` action precedes it in the procedure (or in an earlier still-open `SWITCH(stash)`)  
**THEN**: Run no actions. End with `+RESULT` recording the refusal, so git-robot can surface it.

**IF**: A `switch` action names a target branch that does not exist.  
**THEN**: Run no actions. End with `+RESULT` recording the missing-branch refusal.

#### Proceed

**IF**: The action is safe to run (clean tree, or stash precedes switch, and the target exists)  
**THEN**: Proceed to the relevant section based upon the following map:

- `stash` --> `+STASH`
- `switch` -> `+SWITCH`
- `pop` -> `+POP`

**IF**: No more actions need to be processed
**THEN**: Proceed to `+RESULT`

## +STASH

Set the dirty working tree aside before moving.

Run `git stash push -u`.

Record the stash result.

#### Agent Invariants

**DO NOT** create an empty stash. report the no-op instead

#### Return

**IF**: The action succeeds.
**THEN**: Return back to `+READ PROCEDURE` to continue processing the actions.

#### Proceed

**IF**: An error arises, or the command fails **OR** The working tree is already clean.
**THEN**: Proceed to `+RESULT` with the refusal/no-op note:

## +SWITCH

Change to the target branch named in the task overview.

Run `git switch <branch>`.
Record the branch moved to.

#### Return

**IF**: The action succeeds.
**THEN**: Return back to `+READ PROCEDURE` to continue processing the actions.

#### Proceed

**IF**: Any failure or error arises.
**THEN**: Continue to `+RESULT` and emit the refusal note.

## +POP

Restore the most recent stash entry onto the current branch.

Run `git stash pop`.

#### Agent Invariants

**DO NOT** resolve conflicts from the Pop action. Report the conflict instead.

#### Return

**IF**: The action succeeds.
**THEN**: Return back to `+READ PROCEDURE` to continue processing the actions.

#### Proceed

**IF**: Any failure or error arises.
**THEN**: Continue to `+RESULT` and emit the refusal note.

## +RESULT

Emit the outcome/s back to git-robot so it can render the `SWITCH` Output Directive in its report.

#### Agent Invariants

**DO NOT** add prose beyond the action lines and any refusal or conflict note.

#### Result

Return one line per action run — the action and its resulting state:

```txt
<action> -> <state>
```

Include refusals, conflicts, and no-ops:

```txt
<refusal, conflict, or no-op note>
```

#### Return

**WHEN**: The result lines are emitted
**END**: The skill is over, hand control back to git-robot.

# --- TERMS ---

Terms used in this skill:

**None at this time**
