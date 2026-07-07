---
name: agent-push
description: Execute the push procedure using this skill. Specialised skill for `Git Robot`, not for general agent usage.
user-invocable: false
allowed-tools: Bash(git push *), Bash(git status *), Bash(git rev-parse *), Bash(git branch *), Bash(git log *)
---

# Push

Publish the current branch's commits to its remote. The `PUSH` procedure of the `Brief` you already hold carries the intent; this skill takes the branch as it stands and pushes it safely, setting an upstream when one is missing.

# Agent Invariants

**DO NOT** use this skill unless you are a `Git Robot` Agent.
**NEVER** use force flags when pushing (`--force`, `--force-with-lease`)

# --- REFERENCES ---

## Current Git state

These overviews show where the local branch sits relative to its remote — enough to decide whether a push is needed and whether it can fast-forward.

=== Branch + tracking ===  
!`git status --short --branch`

=== Upstream ===  
!`git rev-parse --abbrev-ref --symbolic-full-name @{upstream} 2>/dev/null`

=== Unpushed commits ===  
!`git log @{upstream}..HEAD --oneline 2>/dev/null`

## Push outcomes

The `Result` you return mirrors git's own report. Capture the meaningful state:

- **Pushed** — commits delivered. Record the branch, the remote, and the ahead count cleared (e.g. `main -> origin/main, 3 commits`).
- **Up to date** — nothing to push. Record the no-op.
- **Upstream set** — first push of a new branch. Record that tracking was established (`--set-upstream`).
- **Rejected** — remote has commits you don't (non-fast-forward). Record the rejection; do not force.

# --- STEPS ---

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.

## +Read Procedure

Decide the push shape from the live branch state.

#### Start this step when:

A `PUSH` procedure from the `Brief` awaits processing.

#### Step finished when:

The push shape is decided — unpushed commits with a fast-forwardable remote (or no upstream yet), an up-to-date no-op (empty `Unpushed commits` with an existing upstream), or a rejection (a branch behind or diverged from its upstream).

#### Do this next:

Unpushed commits with a fast-forwardable remote (or no upstream) move to pushing; a no-op or rejection moves to reporting the result — do not push a rejected branch.

#### Invariants:

**ENSURE** `Current Git State` is used to decide the push shape. Do not guess the branch or remote from the procedure text alone.

### Review the State:

From the `Brief` read the `PUSH` procedure. Review it against the `Current Git State`: whether an upstream exists, whether unpushed commits exist, and whether the branch can fast-forward its remote.

## +Push

Deliver the current branch to its remote.

#### Start this step when:

The push shape is decided and there are unpushed commits the remote can fast-forward (or the branch has no upstream yet), and no push has been attempted.

#### Step finished when:

The push has completed or failed, and the outcome is recorded.

#### Do this next:

Move to reporting the result.

### Push the Branch:

#### Decision:

The upstream decides the command. No upstream (`Upstream` was empty): push with `git push -u origin <branch>`, establishing tracking. An existing upstream: push with `git push`.

#### Run:

Push, and record the branch, the remote it pushed to, and the resulting state for the `Result`.

## +Result

Emit the outcome back to git-robot so it can render the `PUSH` Output Directive in its report.

#### Start this step when:

The push outcome is recorded, or the procedure resolved without pushing (up to date, rejection, or error).

#### Step finished when:

The result line is emitted.

#### Do this next:

The skill is over, hand control back to git-robot.

#### Invariants:

**DO NOT** add prose beyond the result line and any no-op or rejection note.

### Result:

Return a single line — the branch, remote, and resulting state:

```txt
<branch> -> <remote>, <state>
```

Include rejections, errors, and no-ops:

```txt
<rejection, error, or up-to-date note>
```

# --- TERMS ---

Terms used in this skill:

**None at this time**
