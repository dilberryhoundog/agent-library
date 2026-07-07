---
name: agent-commit
description: Execute the commit procedure using this skill. Specialised skill for `Git Robot`, not for general agent usage.
user-invocable: false
allowed-tools: Bash(git add *), Bash(git status *), Bash(git diff *), Bash(git commit *), Bash(git branch *), Bash(git restore --staged *)
---

# Commit

Craft the commit(s) for the working tree. The grouping intent lives in the `COMMIT` procedure of the `Brief` you already hold; turn the actual changes into one or more well-formed conventional commits that match that intent.

# Agent Invariants

**DO NOT** use this skill unless you are a `Git Robot` Agent.
**NEVER** use `git add -A`, `git add .`, or `git commit -a` — they sweep in unrelated work.
**NEVER** use heredocs or command substitution (`$(cat <<EOF …)`) to build a commit message — they defeat the permission grant and prompt the user. Write multi-line messages with repeated `-m` flags: one for the subject, one per body paragraph.
**ALWAYS** `git add <file>` before committing, regardless of whether the file is already staged or not.

# --- REFERENCES ---

## Current Git state

These overviews show _what_ changed and how much — enough to plan the grouping. Pull the actual diff content per group in the `+Read Procedure` step; do not rely on the file names alone.

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

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.

## +Read Procedure

Load the current COMMIT procedure and the real diffs it covers.

#### Start this step when:

A `COMMIT` procedure from the `Brief` awaits processing, and no earlier no-op or refusal has ended the run.

#### Step finished when:

The procedure's directive and its expanded diffs are read, and the action to run is decided — a `new` action, an `amend` action, or a no-op (nothing in the procedure's scope to commit — clean tree, or every changed file outside the directive's scope; or an `amend` that follows a `new`, or a second `amend`, in the same brief). Never invent or force an empty commit.

#### Do this next:

A decided `new` action moves to creating new commits; a decided `amend` action moves to amending; a no-op moves to reporting the result.

#### Invariants:

**ALWAYS** use the `Expanded Diffs` to write the commit message. Do not guess from filenames or procedure details.

### Review Against the Tree:

From the `Brief` read the current `COMMIT` procedure. Review it against the `Current Git State`.

#### Expanded Diffs:

Read the full diff for the files in the current group only — not the whole tree. This is the content you write the message from.

```Bash
# Diff unstaged files
git diff <paths>

# Diff staged files
git diff --cached <paths>
```

## +Commit New

Create one or more new commits from the working tree, grouped per the procedure's directive.

#### Start this step when:

The current procedure is `COMMIT(new)` and its commits have not been made.

#### Step finished when:

Every commit for the current procedure is made and recorded.

#### Do this next:

When further `COMMIT` procedures remain in the `Brief`, return to reading the next one; otherwise move to reporting the result.

### Commit Splitting:

Map the procedure's directive onto the real changes from the `Expanded Diffs`. A directive may name a count ("3 commits"), a scope filter ("housekeeping, leave the rest"), or a free description. When unclear on how to manage the diff, fall back to the `Splitting heuristics`. Prefer fewer, cohesive commits — 1–4 per logical unit — and commit dependencies first so history stays bisectable. Your goal is a logical grouping of changes across every file in the procedure.

#### Commit:

- Check `git diff --cached --name-only` for pre-staged files outside the current group; unstage each with `git restore --staged <file>` — the change itself is preserved for a later group or procedure. Note every unstaged path for the `Result`.
- Stage each file in the group with `git add <file>` (re-stage if already staged)
- Confirm with `git status --short` that the intended files are staged with a clean working tree.
- Run the `Breaking changes` check
- Commit the changes with `git commit -m <message>` (write the message per `Commit message format`)

Move to the next grouping, following the same procedure, until all the required files are committed. Remember each commit's short hash and subject as a `Result` to fold into the final report.

## +Commit Amend

Fold the in-scope changes into the previous commit, or reword its message, per the procedure's task overview.

#### Start this step when:

The current procedure is `COMMIT(amend)` and the amend has not been made.

#### Step finished when:

The amend is complete and recorded, or refused and the refusal recorded.

#### Do this next:

A completed amend with further `COMMIT` procedures remaining returns to reading the next one; a refusal, or no procedures remaining, moves to reporting the result.

### Check for Push:

Determine whether `HEAD` has already reached the remote — amending a pushed commit rewrites shared history.

```Bash
# Lists remote branches that already contain HEAD. Output = pushed; empty = local-only.
git branch -r --contains HEAD
```

Treat any non-empty result (or an explicit upstream match) as **pushed = true**. If the branch has no upstream and no remote contains `HEAD`, treat as **pushed = false**.

#### Decision:

Two conditions refuse the amend: the directive suggests changes to more than one previous commit (amend is a single-commit action; splitting is not supported), or the `Check for Push` reveals the commit has been pushed. Either way, amend nothing and record the refusal for the result.

#### Commit:

- Check `git diff --cached --name-only` for pre-staged files outside the current group; unstage each with `git restore --staged <file>` — the change itself is preserved for a later group or procedure. Note every unstaged path for the `Result`.
- Stage each file in the group with `git add <file>` (re-stage if already staged)
- Confirm with `git status --short` that the intended files are staged with a clean working tree.
- Amend with `git commit --amend`, rewriting the message to stay within `Commit message format`
- Run the `Breaking changes` check, against the combined change.

## +Result

Emit the outcome back to git-robot so it can render the `COMMIT` Output Directive in its report.

#### Start this step when:

Every `COMMIT` procedure in the `Brief` has been processed, or a no-op or refusal has ended the run.

#### Step finished when:

The result lines are emitted.

#### Do this next:

The skill is over, hand control back to git-robot.

#### Invariants:

**DO NOT** add prose beyond the commit lines, any no-op or skip note, and any unstaged out-of-scope paths.

### Result:

Return one line per commit completed — short hash and subject only, no body:

```txt
<short-hash> - <subject>
```

Include errors and failures:

```txt
<error or failure message>
```

Include any pre-staged files that were unstaged as out-of-scope, one line each:

```txt
unstaged (out of scope): <path>
```

# --- TERMS ---

Terms used in this skill:

**None at this time**
