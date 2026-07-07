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

#### Review the Action:

From the `Brief` read the `SWITCH` procedure and its actions. Review them against the `Current Git State`, to judge tree cleanliness and branch existence. Pick the first/next uncompleted action.

#### Decision:

Safety decides whether the action runs at all. A `switch` action on a dirty tree with no `stash` action preceding it (in the procedure, or in an earlier still-open `SWITCH(stash)`) is a refusal — run no actions and record it for `+Result`. A `switch` action naming a target branch that does not exist is likewise a missing-branch refusal.

#### Step finished when:

The next action is judged safe to run (clean tree, or stash precedes switch, and the target exists) — the matching action step (`+Stash`, `+Switch`, `+Pop`) now applies. A refusal, or no actions remaining, belongs to `+Result`.

## +Stash

Set the dirty working tree aside before moving.

#### Start this step when:

The next safe action is `stash`.

#### Invariants:

**DO NOT** create an empty stash. Report the no-op instead.

#### Run:

Run `git stash push -u`. Record the stash result.

#### Step finished when:

The stash result is recorded — `+Read Procedure` applies again for the next action. A command failure, or an already-clean tree, is a no-op or refusal for `+Result`.

## +Switch

Change to the target branch named in the task overview.

#### Start this step when:

The next safe action is `switch`.

#### Run:

Run `git switch <branch>`. Record the branch moved to.

#### Step finished when:

The switch result is recorded — `+Read Procedure` applies again for the next action. Any failure or error is a refusal note for `+Result`.

## +Pop

Restore the most recent stash entry onto the current branch.

#### Start this step when:

The next safe action is `pop`.

#### Invariants:

**DO NOT** resolve conflicts from the Pop action. Report the conflict instead.

#### Run:

Run `git stash pop`. Record the restore, and any conflict git reports.

#### Step finished when:

The pop result is recorded — `+Read Procedure` applies again for the next action. Any failure, error, or conflict is a note for `+Result`.

## +Result

Emit the outcome/s back to git-robot so it can render the `SWITCH` Output Directive in its report.

#### Start this step when:

Every action in the procedure has run, or a refusal, failure, or conflict has ended the run early.

#### Invariants:

**DO NOT** add prose beyond the action lines and any refusal or conflict note.

#### Result:

Return one line per action run — the action and its resulting state:

```txt
<action> -> <state>
```

Include refusals, conflicts, and no-ops:

```txt
<refusal, conflict, or no-op note>
```

#### Step finished when:

The result lines are emitted. The skill is over, hand control back to git-robot.

# --- TERMS ---

Terms used in this skill:

**None at this time**
