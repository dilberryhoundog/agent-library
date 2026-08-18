---
harness-format: DraftHorse
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
**NEVER** resolve tracking state by querying `@{upstream}` — it exits non-zero on a branch that has no upstream, which fails this skill at load before any push permission is granted. Read tracking from `Branch + tracking`.

# --- REFERENCES ---

## Current Git state

These overviews show where the local branch sits relative to its remote — enough to decide whether a push is needed and whether it can fast-forward.

=== Branch + tracking ===  
!`git status --short --branch`

=== Unpushed commits ===  
!`git log --oneline HEAD --not --remotes=origin`

The first line of `Branch + tracking` carries the tracking state. `## <branch>` on its own means no upstream — the branch has never been pushed. `## <branch>...<remote>/<branch>` means an upstream exists, and a trailing `[ahead N]`, `[behind N]`, or `[ahead N, behind M]` reports the divergence. `Unpushed commits` lists the commits that have not reached `origin`, and is empty when there is nothing to deliver. The list is scoped to `origin` alone: in a fork with both `origin` and `upstream` remotes, a commit already on `upstream` still counts as unpushed until it reaches `origin`.

## Push outcomes

The `Result` you return mirrors git's own report. Capture the meaningful state:

- **Pushed** — commits delivered. Record the branch, the remote, and the ahead count cleared (e.g. `main -> origin/main, 3 commits`).
- **Up to date** — nothing to push. Record the no-op.
- **Upstream set** — first push of a new branch. Record that tracking was established (`--set-upstream`).
- **Rejected** — remote has commits you don't (non-fast-forward). Record the rejection; do not force.

# --- STEPS ---

Steps are universal and standalone. Marked `## +<Step Name>`. Work, instructions, rules — self-contained. Invoke a step whenever its start conditions match. Step completes only when its finished conditions match. Multiple steps activate at once. Call every cited reference. References use markdown link notation.

## +Read Procedure

Decide the push shape from the live branch state.

**Looping step** — Re-runnable, taking a different branch each pass.

#### Start this step when these are true:

- a `PUSH` procedure from the `Brief` awaits processing

#### Step finished when these are true:

- the push shape is decided — unpushed commits with a fast-forwardable remote (or no upstream yet), an up-to-date no-op (empty `Unpushed commits` with an existing upstream), or a rejection (`Branch + tracking` reports the branch behind or diverged from its upstream)

#### Step invariants:

**ENSURE** [Current Git State](#current-git-state) is used to decide the push shape. Do not guess the branch or remote from the procedure text alone.

### Review the State:

From the `Brief` read the `PUSH` procedure. Review it against the [Current Git State](#current-git-state): whether an upstream exists (the `...<remote>/<branch>` form on the `Branch + tracking` line), whether unpushed commits exist, and whether the branch can fast-forward its remote.

## +Push

Deliver the current branch to its remote.

#### Start this step when these are true:

- the push shape is decided
- there are unpushed commits the remote can fast-forward (or the branch has no upstream yet)

#### Step finished when these are true:

- the push has completed or failed
- the outcome is recorded

### Push the Branch:

#### Agent decision:

The upstream decides the command. No upstream (`Branch + tracking` showed `## <branch>` with no `...<remote>/<branch>`): push with `git push -u origin <branch>`, establishing tracking. An existing upstream: push with `git push`.

#### Run:

Push, and record the branch, the remote it pushed to, and the resulting state for the `Result`.

## +Result

Emit the outcome back to git-robot so it can render the `PUSH` Output Directive in its report.

**Error step** — folded into this reporting step per the executor exception, so its start condition claims the resolved-without-pushing run alongside the pushed one.

#### Start this step when these are true:

- the push outcome is recorded

**OR these are true:**

- the procedure resolved without pushing (up to date, rejection, or error)

#### Step finished when these are true:

- the result line is emitted as the final message text
- the skill is complete

#### Step invariants:

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
