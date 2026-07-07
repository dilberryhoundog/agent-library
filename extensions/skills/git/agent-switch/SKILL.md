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

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.

## +Read Procedure

Judge the next action against the live tree before running anything.

#### Start this step when:

The `SWITCH` procedure holds an action not yet run, and no refusal or failure has ended the run.

#### Step finished when:

The next action is judged either safe to run (clean tree, or stash precedes switch, and the target exists) or a refusal (recorded with its reason) — or no actions remain.

#### Do this next:

A safe `stash`, `switch`, or `pop` action moves to running that action; a refusal, or no actions remaining, moves to reporting the result.

### Review the Action:

From the `Brief` read the `SWITCH` procedure and its actions. Review them against the `Current Git State`, to judge tree cleanliness and branch existence. Pick the first/next uncompleted action.

#### Decision:

Safety decides whether the action runs at all. A `switch` action on a dirty tree with no `stash` action preceding it (in the procedure, or in an earlier still-open `SWITCH(stash)`) is a refusal — run no actions and record it. A `switch` action naming a target branch that does not exist is likewise a missing-branch refusal.

## +Stash

Set the dirty working tree aside before moving.

#### Start this step when:

The next safe action is `stash`.

#### Step finished when:

The stash result is recorded, or a command failure or an already-clean tree is recorded as a no-op or refusal.

#### Do this next:

Return to judging the next action.

#### Invariants:

**DO NOT** create an empty stash. Report the no-op instead.

### Run:

Run `git stash push -u`. Record the stash result.

## +Switch

Change to the target branch named in the task overview.

#### Start this step when:

The next safe action is `switch`.

#### Step finished when:

The switch result is recorded, or a failure or error is recorded as a refusal note.

#### Do this next:

Return to judging the next action.

### Run:

Run `git switch <branch>`. Record the branch moved to.

## +Pop

Restore the most recent stash entry onto the current branch.

#### Start this step when:

The next safe action is `pop`.

#### Step finished when:

The pop result is recorded, or a failure, error, or conflict is recorded as a note.

#### Do this next:

Return to judging the next action.

#### Invariants:

**DO NOT** resolve conflicts from the Pop action. Report the conflict instead.

### Run:

Run `git stash pop`. Record the restore, and any conflict git reports.

## +Result

Emit the outcome/s back to git-robot so it can render the `SWITCH` Output Directive in its report.

#### Start this step when:

Every action in the procedure has run, or a refusal, failure, or conflict has ended the run early.

#### Step finished when:

The result lines are emitted.

#### Do this next:

The skill is over, hand control back to git-robot.

#### Invariants:

**DO NOT** add prose beyond the action lines and any refusal or conflict note.

### Result:

Return one line per action run — the action and its resulting state:

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
