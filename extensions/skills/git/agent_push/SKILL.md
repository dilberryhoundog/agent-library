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

## +READ PROCEDURE

From the `Brief` read the `PUSH` procedure. Review it against the `Current Git State`.

#### Agent Invariants

**ENSURE** `Current Git State` is used to decide the push shape. Do not guess the branch or remote from the procedure text alone.

#### Return

**IF**: `Unpushed commits` is empty **AND** an upstream already exists
**THEN**: Push nothing and proceed to `+RESULT`, recording the up-to-date no-op.

**IF**: The branch is behind or has diverged from its upstream (the local branch cannot fast-forward the remote)  
**THEN**: Do not push. Proceed to `+RESULT` recording the rejection, so git-robot can surface it.

#### Proceed

**IF**: There are unpushed commits **AND** the push can fast-forward (or the branch has no upstream yet)  
**THEN**: Proceed to `+PUSH`.

## +PUSH

Deliver the current branch to its remote.

#### Decision

**IF**: The branch has no upstream (`Upstream` was empty)
**THEN**: Push with `git push -u origin <branch>` (this establishes tracking)

**IF**: An upstream already exists
**THEN**: Push with `git push`.

#### Push Result

Remember the branch, the remote it pushed to, and the resulting state for the `Result` to fold into the final report.

#### Proceed

**WHEN**: push completes **OR** push fails
**THEN**: Proceed to `+RESULT`

## +RESULT

Emit the outcome back to git-robot so it can render the `PUSH` Output Directive in its report.

#### Result

Return a single line — the branch, remote, and resulting state:

```txt
<branch> -> <remote>, <state>
```

Include rejections, errors, and no-ops:

```txt
<rejection, error, or up-to-date note>
```

#### Agent Invariants

**DO NOT** add prose beyond the result line and any no-op or rejection note.

#### Return

**WHEN**: The result line is emitted
**END**: The skill is over, hand control back to git-robot.

# --- TERMS ---

Terms used in this skill:

**None at this time**
