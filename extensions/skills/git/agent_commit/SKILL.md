---
name: agent-commit
description: Execute the commit procedure using this skill. Specialised skill for `Git Robot`, not for general agent usage.
user-invocable: false
allowed-tools: Bash(git add *), Bash(git status *), Bash(git diff *), Bash(git commit *), Bash(git branch *)
---

# Commit

Craft the commit(s) for the working tree. The grouping intent lives in the `COMMIT` procedure of the `Brief` you already hold; turn the actual changes into one or more well-formed conventional commits that match that intent.

# Agent Invariants

**DO NOT** use this skill unless you are a `Git Robot` Agent.
**NEVER** use `git add -A`, `git add .`, or `git commit -a` — they sweep in unrelated work.
**ALWAYS** `git add <file>` before committing, regardless of whether the file is already staged or not.

# --- REFERENCES ---

## Current Git state

These overviews show _what_ changed and how much — enough to plan the grouping. Pull the actual diff content per group in the `+READ PROCEDURE` step; do not rely on the file names alone.

=== Branch + status ===  
!`git status --short --branch`

=== Staged overview ===  
!`git diff --cached --stat`

=== Unstaged overview ===  
!`git diff --stat`

## Emoji map

- ✨ `feat`: new feature
- 🐛 `fix`: bug fix
- 📝 `docs`: documentation
- 💄 `style`: formatting/style
- ♻️ `refactor`: code refactoring
- ⚡️ `perf`: performance
- ✅ `test`: tests
- 🔧 `chore`: tooling/config
- 🗑️ `revert`: revert
- 🚀 `ci`: CI/CD
- 👷 `ci`: CI build system
- 🚨 `fix`: linter/compiler warnings
- 🔒️ `fix`: security
- 🩹 `fix`: minor non-critical fix
- 🥅 `fix`: catch errors
- 🔥 `fix`: remove code/files
- 🚑️ `fix`: critical hotfix
- 👽️ `fix`: external API change
- 💚 `fix`: fix CI build
- 🔇 `fix`: remove logs
- ✏️ `fix`: typos
- 🚚 `refactor`: move/rename resources
- 🏗️ `refactor`: architectural change
- ⚰️ `refactor`: remove dead code
- 🎨 `style`: improve code structure/format
- 👔 `feat`: business logic
- 🏷️ `feat`: types
- 💬 `feat`: text/literals
- 🌐 `feat`: i18n
- 🚸 `feat`: UX/usability
- ♿️ `feat`: accessibility
- 🔊 `feat`: logs
- 🚩 `feat`: feature flags
- 🦺 `feat`: validation
- 🧵 `feat`: concurrency
- 📈 `feat`: analytics/tracking
- 💥 `feat`: introduce breaking changes
- 🔖 `chore`: release/version tags
- 🧑‍💻 `chore`: developer experience
- 🙈 `chore`: gitignore
- 🔀 `chore`: merge branches
- 🎉 `chore`: begin a project
- 🗃️ `chore`: database changes
- 📄 `chore`: license
- 🍱 `chore`: assets
- 💡 `docs`: source-code comments
- 🚧 `wip`: work in progress

## Commit message format

Use `<emoji> <type>: <description>`:

- Conventional type (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `revert`), paired with the matching emoji from the `Emoji map` above.
- Imperative mood, present tense — "add feature", not "added feature".
- First line under 72 characters. Add a body only when the change needs explaining beyond its subject.

#### Breaking changes

Before finalising each message, check the diff for changes that force an existing user to alter something on their side: removed or renamed user-facing names (commands, skills, functions, flags), changed argument/config/file formats, or changed meaning of documented behaviour. When found, mark the type with `!` (e.g. `💥 feat!: rename trigger phrases`) and add a `BREAKING CHANGE: <what breaks and what users must do>` footer to the message body. Additive changes (new things alongside old) are not breaking. When genuinely unsure whether a change breaks consumers, surface it in the `Result` rather than silently guessing — the caller has repo context to judge.

## Splitting heuristics

Split into separate commits when changes cross these boundaries:

- **Different concerns** — unrelated parts of the codebase.
- **Different types** — mixing feature, fix, refactor, docs.
- **Different risk levels** — migrations/security vs. styling/docs.
- **Different audiences** — developer tooling vs. user-facing features.
- **Clear boundaries** — backend vs. frontend, where each works independently.

Keep changes together when they form one cohesive feature, depend on each other to work, or a reviewer needs to see them together to understand the change.

# --- STEPS ---

## +READ PROCEDURE

From the `Brief` read the current `COMMIT` procedure.
Review against the `Current Git State`.

#### Expanded Diffs

Read the full diff for the files in the current group only — not the whole tree. This is the content you write the message from.

```Bash
# Diff unstaged files
git diff <paths>

# Diff staged files
git diff --cached <paths>
```

#### Agent Invariants

**USE** the `Expanded Diffs` to write the commit message. Do not guess from filenames or procedure details.

#### Return

**IF**: There is nothing in the procedure's scope to commit (clean tree, or every changed file falls outside the directive's scope)
**THEN**: Commit nothing and proceed to `+RESULT`, recording the no-op. Never invent or force an empty commit.

**IF**: an `amend` action comes after `new` or multiple `amend` actions in the same `brief`.
**THEN**: Commit nothing and proceed to `+RESULT`, recording the no-op.

#### Proceed

**IF**: The procedure action is `COMMIT(new)`
**THEN**: Proceed to `+COMMIT new`

**IF**: The procedure action is `COMMIT(amend)`
**THEN**: Proceed to `+COMMIT amend`

## +COMMIT new

Create one or more new commits from the working tree, grouped per the procedure's directive (git state, task overview).

#### Commit Splitting

Map each procedure's directive onto the real changes from the `Expanded Diffs`.
A directive may...

- Name a count ("3 commits")
- A scope filter ("housekeeping, leave the rest")
- A free description.

When unclear on how to manage the diff:
Fall back to the `Splitting heuristics`.

Prefer fewer, cohesive commits — 1–4 per logical unit.
Commit dependencies first so history stays bisectable.

Your goal is to have a logical grouping of changes across every file in the procedure.

#### Commit

- Stage each file in the group with `git add <file>` (re-stage if already staged)
- Confirm with `git status --short` that the intended files are staged with a clean working tree.
- run the `Breaking changes` check
- Commit the changes with `git commit -m <message>` (write the message per `Commit message format`)

Move to the next grouping, following the same procedure, until all the required files are committed.

#### Results

Remember each commit's short hash and subject as a `Result` to fold into the final report.

#### Return

**IF**: There are further `COMMIT` procedures in the `Brief`
**THEN**: Return to `+READ PROCEDURE` for the next procedure.

#### Proceed

**WHEN**: Every commit for the current procedure is made **AND** no `COMMIT` procedures remain after this one
**THEN**: Proceed to `+RESULT`.

## +COMMIT amend

Fold the in-scope changes into the previous commit, or reword its message, per the procedure's task overview.

#### Check for Push

Determine whether `HEAD` has already reached the remote — amending a pushed commit rewrites shared history.

```Bash
# Lists remote branches that already contain HEAD. Output = pushed; empty = local-only.
git branch -r --contains HEAD
```

Treat any non-empty result (or an explicit upstream match) as **pushed = true**. If the branch has no upstream and no remote contains `HEAD`, treat as **pushed = false**.

#### Decision

**IF**: The directive suggests changes to more than one previous commit. **OR** The `Check for Push` reveals the commit has been pushed to the remote branch.
**THEN**: End all procedures **AND** Report to the main agent the details of your no-op.

#### Commit

> Amend is a single commit only, splitting etc is not supported.

- Stage each file in the group with `git add <file>` (re-stage if already staged)
- Confirm with `git status --short` that the intended files are staged with a clean working tree.
- Amend with `git commit --amend`, rewriting the message to stay within `Commit message format`
- run the `Breaking changes` check, against the combined change.

#### Return

**IF**: There are further `COMMIT(new)` procedures in the `Brief`
**THEN**: Return to `+READ PROCEDURE` for the next procedure.

#### Proceed

**IF**: The ammend is complete **AND** no `COMMIT(new)` procedures remain
**THEN**: Proceed to `+RESULT`.

## +RESULT

Emit the outcome back to git-robot so it can render the `COMMIT` Output Directive in its report.

#### Result

Return one line per commit completed — short hash and subject only, no body:

```txt
<short-hash> - <subject>
```

Include errors and failures:

```txt
<error or failure message>
```

#### Agent Invariants

**DO NOT** add prose beyond the commit lines and any no-op or skip note.

#### Return

**WHEN**: The result lines are emitted
**END**: The skill is over, hand control back to git-robot.

# --- TERMS ---

Terms used in this skill:

**None at this time**
