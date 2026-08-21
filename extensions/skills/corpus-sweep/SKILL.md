---
harness-format: DraftHorse
name: corpus-sweep
description: Propagate a spec change across a stamped document corpus — migrate every affected document with isolated agents, audit the result, review the judgment calls, and land the work as reviewable pull requests.
disable-model-invocation: true
allowed-tools: Read, Write, Edit, Glob, Workflow, Bash(git *), Bash(gh pr *), Bash(dev-workspace *), Bash(grep *), Bash(comm *), Bash(sort *), Bash(mkdir *)
---

# Corpus Sweep

A framework spec changed and the documents that conform to it did not follow. This skill carries the change across the whole corpus: one isolated agent per document set, working from a brief that has already made the judgment calls, then an independent audit, then a review of what could not be decided in advance.

# Agent Invariants

**ALWAYS** resolve an explicit model and effort for every agent spawned. No agent inherits the session model.

**NEVER** let an agent push, open a pull request, or run any network git operation.

**NEVER** force-push, or rewrite history that has been pushed.

**NEVER** cut a release. Report what landed and hand the releases to the versioning skill.

# --- REFERENCES ---

## Host Bindings

Where a sweep lives. These three entries are the only place this skill touches a repository's own conventions.

=== branch command ===

    dev-workspace new <sweep-name>

=== working directory ===

    dev/workspace/tasks/<sweep-name>/

=== review directory ===

    dev/workspace/reviews/

## Sweep Commands

Angle-bracket placeholders are filled from the loaded profile or the sweep manifest.

=== discover the corpus ===

    grep -rlE "^<stamp_key>: *<stamp_value>" --include='*.md' <search_paths> | sort

Lists every document carrying the profile's stamp. The pattern matches handover documents too, whose stamp carries a trailing variant, so discovery returns them alongside their parents.

The `--include` glob must stay quoted. Unquoted, the shell expands it before `grep` runs and the command fails.

=== preflight ===

    git status --porcelain
    git rev-parse --abbrev-ref HEAD
    git rev-parse HEAD
    git branch --list '<sweep-name>'
    git worktree list

Empty status output means the tree is clean. Empty branch-list output means the name is free.

=== integrate one assignment ===

    git cherry-pick <commit>
    git diff-tree --no-commit-id --name-only -r HEAD | sort

=== assert file ownership ===

    comm -3 <(git diff-tree --no-commit-id --name-only -r HEAD | sort) <(printf '%s\n' <owned-files> | sort)

Empty output means the commit touched exactly the assignment's files. Left-column lines are files the agent touched and does not own. Right-column lines are files it owns and did not touch.

## Tiers

Every agent runs at a named tier. Nothing resolves to the session model.

=== migration tiers ===

- `high` — model `opus`, effort `high`
- `standard` — model `sonnet`, effort `medium`
- `mechanical` — model `haiku`, effort `low`

=== audit tiers ===

Set from an assignment's `audit_as` field, independently of its migration tier.

- `set` — model `opus`, effort `high`
- `single` — model `sonnet`, effort `medium`

=== what earns each migration tier ===

`high` — the largest document in the corpus; a document whose changes interact, where one site's fix changes what a later site should say; a checker document together with the agent that runs it; an assignment carrying design work rather than application of a decided rule; a parent document with its handovers; any assignment whose brief cannot stand without the authority documents.

`standard` — a single document whose brief has pre-decided its judgment calls.

`mechanical` — inventories, retired-string greps, citation conversion, and verification passes.

=== authority documents by tier ===

`high` receives the sweep's authority documents, named in its brief. `standard` and `mechanical` receive their brief and nothing else.

## Profiles

A profile is one corpus's durable policy, in `profiles/<corpus>/`. It holds the discovery stamp and search paths, the grouping rules that turn discovered documents into assignments, the audit authority, tier hints, the sanctioned shapes that suppress known false findings, the two workflow scripts, and the brief templates.

Profiles are built and reviewed ahead of time. This skill selects one; it never authors one.

## Templates

[Manifest Template](assets/manifest-template.yml) is the sweep manifest's shape. [Review Template](assets/review-template.html) is the decision page, with its slots and its card pattern documented in the file.

## Workflow Stalls

[Workflow Stalls](references/workflow-stalls.md) — the harness's known failure behaviour, how a run resumes, and token totals from a completed sweep for estimating a run.

# --- STEPS ---

Steps are universal and standalone. Marked `## +<Step Name>`. Work, instructions, rules — self-contained. Invoke a step whenever its start conditions match. Step completes only when its finished conditions match. Multiple steps activate at once. Call every cited reference. References use markdown link notation.

## +Open the Sweep

Establish what changed, load the profile that covers it, and create the branch and directory the sweep runs in.

#### Start this step when these are true:

- the skill has been invoked

#### Step finished when these are true:

- the user has stated what changed in the spec and which documents it could reach
- a profile covering the corpus is loaded
- a sweep branch exists
- the sweep's working directory exists

#### Agent decision:

Which corpus this sweep targets. An invocation naming a corpus decides it outright; a bare invocation leaves it to the user, chosen from the profiles present. The choice resolves to the loaded profile.

#### Step invariants:

**NEVER** create the sweep branch from a dirty working tree.

### Establish and Open:

Work out with the user what changed in the spec and which documents could be reached by it. The answer scopes everything downstream, so take it in the user's own terms rather than inferring it from a diff alone.

Where the invocation named no corpus, survey the profiles present and ask the user which is being swept. Load that corpus's policy from [Profiles](#profiles). A corpus with no profile is out of this skill's reach — a profile is a reviewed artifact, not session output.

Run the preflight block in [Sweep Commands](#sweep-commands) and read its output against the invariant above. Then name the sweep and create its branch and directory with the branch command in [Host Bindings](#host-bindings).

## +Build the Manifest

Inventory the corpus as it stands today, cut it to what the change reaches, and record the assignments.

#### Start this step when these are true:

- a profile is loaded
- a sweep branch exists
- the sweep's working directory exists

#### Step finished when these are true:

- every document carrying the profile's stamp is discovered
- every discovered document is grouped into an assignment, or excluded from the sweep with its reason recorded
- every assignment records the files it owns
- every assignment records a proposed tier
- every assignment records its brief filename
- the sweep manifest is written to the working directory

### Inventory and Record:

Run the discover block in [Sweep Commands](#sweep-commands) with the profile's stamp and search paths. Discovery runs every sweep because a corpus changes between sweeps — a document is added, a handover is split off, an agent is converted — and a stored list is stale the moment any of that happens.

Group what the discovery returns by the profile's rules. A parent document takes its handovers into the same assignment; splitting them leaves neither agent able to see the other's decisions. Cited references travel with the document citing them. Declared lockstep pairs bring their unstamped partners along.

Prune to the documents the change can actually reach, and record why each excluded document was excluded. Every assignment costs a full agent, including one whose only conclusion is that nothing needed doing. Where reach is uncertain, keep the document — a wasted agent costs less than a missed migration.

Propose a tier for each assignment against the criteria in [Tiers](#tiers) and the profile's own hints. Write the manifest in the shape of [Manifest Template](assets/manifest-template.yml).

## +Write the Briefs

Write the sweep's briefs from the profile's templates, and put them before the user together with the tiers.

#### Start this step when these are true:

- a sweep manifest is written

#### Step finished when these are true:

- a common brief is written with every slot filled or deliberately left empty
- every assignment named in the manifest has its brief written
- every brief either stands without the authority documents, or its assignment is recorded at `high` tier
- the user has approved the manifest, the briefs, and the tiers

#### Step invariants:

**NEVER** name authority documents in a brief below `high` tier.

### Write and Gate:

Fill the profile's common-brief template. Its spine holds across sweeps; its slots carry what this change requires — the fixed texts, the checklist, the judgment classes where a rule changed, and any shapes to collect back as specimens.

Write one brief per assignment from the assignment template: the files it owns, the sites the checklist lands on, every judgment call already decided, and any removal that would drop a fact nothing else carries paired with the repair that must land in the same pass.

Every judgment moved into a brief is bought once instead of once per agent, and it is what lets an assignment run below the top tier. Test each brief by reading its checklist against its targets and asking whether a competent executor could apply it without making a call the brief has not made. Where the answer is no, either make the call in the brief or raise the assignment to `high` in the manifest. Both settle it; leaving the gap and calling the brief tight does not.

Present the manifest, the briefs and the tiers to the user. Nothing is spawned before they approve.

## +Migrate the Corpus

Run the migration for every assignment still lacking a verified result.

**Looping step** — Re-runnable, taking a different branch each pass.

#### Start this step when these are true:

- the briefs are approved
- an assignment has no verified migration result recorded

#### Step finished when these are true:

- every assignment has a verified migration result recorded, or is recorded as abandoned with its reason

#### Step invariants:

**ALWAYS** spawn migration agents with worktree isolation.

**NEVER** salvage a dead agent's partial edits. Discard its worktree and re-run the assignment from clean state.

### Migrate:

Invoke the profile's migration workflow with the manifest's assignments, resolving each agent's model and effort from [Tiers](#tiers). Each agent works in its own worktree, commits its assignment on its own branch, and returns the branch, the commit, and the files that commit touched. A cheap verification pass follows each migration and reads the commit against the brief.

A dead agent leaves partial edits in its worktree. Discard the worktree and re-enter for that assignment; an agent reading a half-migrated file judges what still needs changing against a state that is neither the original nor the target.

Resume by re-invoking with the prior run identifier so completed agents replay from cache. Where the harness stalls rather than fails, read [Workflow Stalls](references/workflow-stalls.md) before diagnosing. A result returned without its safety review carries no automated check — read that agent's full diff before trusting it.

An assignment that fails repeatedly is abandoned with its reason recorded, rather than retried without limit.

## +Integrate the Migration

Apply each verified assignment to the sweep branch, and prove it touched only what it owns.

**Looping step** — Re-runnable, taking a different branch each pass.

#### Start this step when these are true:

- an assignment has a verified migration result recorded
- that assignment's commit is not applied to the sweep branch

#### Step finished when these are true:

- every verified assignment's commit is applied to the sweep branch, or its result is discarded with its reason recorded
- every applied commit touched exactly the files its assignment owns
- the briefed tip is marked

#### Step invariants:

**NEVER** keep a cherry-picked commit whose changed files are not exactly the files its assignment owns.

### Integrate and Assert:

Apply each assignment with the integrate block in [Sweep Commands](#sweep-commands). Cherry-pick rather than merge: merge commits tangled through the work commits destroy the per-commit readability the whole provenance split depends on.

Run the assert block against the applied commit. Left-column output means the agent worked outside its brief — discard the commit and its result, so that assignment stands unmigrated again. Right-column output means it skipped work its brief assigned; read its returned result before deciding whether that was reasoned or accidental.

When every assignment is applied, mark the briefed tip. It is the boundary between briefed work and found work, and the two pull requests are cut against it.

## +Audit the Corpus

Run independent audits over the integrated corpus.

**Looping step** — Re-runnable, taking a different branch each pass.

#### Start this step when these are true:

- the briefed tip is marked
- an assignment's commit is applied to the sweep branch
- that assignment has no audit verdict recorded

#### Step finished when these are true:

- every assignment whose commit is applied has an audit verdict recorded, or is recorded as unaudited with its reason

### Audit:

Invoke the profile's audit workflow against the integrated sweep branch, resolving each auditor's model and effort from the audit tiers in [Tiers](#tiers). Auditors are read-only and take no worktree: set-level checks span documents, so an auditor needs the whole migrated corpus in one tree.

Auditors work from the profile's audit authority and never read the migration briefs. An auditor that knows the intended change stops being an independent reader of the result.

Hand every auditor the profile's sanctioned shapes. They suppress the authority's known blind spots so that findings stay worth reading.

## +Triage the Findings

Sort every finding into a repair to apply now or a decision to put to the user.

#### Start this step when these are true:

- every applied assignment has an audit verdict recorded, or is recorded as unaudited

#### Step finished when these are true:

- every audit finding and every migration flag is recorded as a repair or as a decision card
- every recorded repair is applied and committed

#### Step invariants:

**NEVER** apply a repair that changes what an approved brief decided. That is a decision card.

### Sort and Repair:

Read every audit finding and every flag the migration agents raised. A finding matching one of the profile's sanctioned shapes is dismissed, not repaired.

A finding is a repair when its fix is the only reasonable one and it changes nothing the user approved. Everything else is a decision card: the finding, what is proposed, what the alternative costs.

Apply the repairs and commit them past the briefed tip. These commits are found work — nothing in them was scoped before the sweep began, and keeping them the far side of the tip is what lets a reader tell the two apart.

## +Review the Judgment Calls

Put the sweep's outcome and its open decisions in front of the user, and wait.

#### Start this step when these are true:

- every finding is recorded as a repair or as a decision card
- every recorded repair is applied

#### Step finished when these are true:

- a review page is written to the review directory
- the review page carries every decision card
- the review page carries everything that landed without a decision
- the user has returned verdicts, or has accepted a sweep with no decision outstanding

### Compose and Present:

Fill [Review Template](assets/review-template.html) and write it to the review directory named in [Host Bindings](#host-bindings). Its card pattern is documented in the file; a card whose radio name and textarea attributes disagree drops silently out of the copied text.

Carry what landed without a decision alongside the cards. A page showing only open questions hides the applied repairs, and the reader cannot tell decided work from undecided.

This step runs on every sweep, including one that produced no cards. It is the only gate between the corpus and open pull requests.

## +Apply the Verdicts

Fold the user's returned decisions into the corpus.

**Dormant step** — Skippable, activates only when its state arises.

#### Start this step when these are true:

- the user has returned verdicts
- a returned verdict asks for a change

#### Step finished when these are true:

- every returned verdict is applied and committed, or declined with its reason recorded

### Apply:

Apply each verdict the user approved, committing past the briefed tip with the rest of the found work. Where a verdict asks for something outside this sweep's scope, record it and say so rather than widening the sweep to fit.

## +Land the Sweep

Push the sweep, open its pull requests, and report what landed.

**Success step** — Resolves the run's done state and exits.

#### Start this step when these are true:

- the user has responded to the review
- every verdict asking for a change is applied or declined

#### Step finished when these are true:

- the sweep branch is pushed
- a pull request carrying the briefed commits is open
- a pull request carrying the found commits is open, or no found commits exist
- the user has been told what landed and what remains
- the skill is complete

#### Step invariants:

**NEVER** open a pull request mixing briefed and found commits.

### Land and Report:

Push the sweep branch. Open one pull request for the commits up to the briefed tip and, where found work exists, a second for the commits past it stacked on the first.

Report the sweep: the assignments migrated, anything abandoned or excluded and why, the audit verdicts, the repairs applied, and the decisions the user returned. Name the releases the change now requires and hand them to the versioning skill; this skill does not cut them.

## +Handle a Problem

Surface anything the other steps don't cover, and decide with the user how to continue.

**Error step** — Handles recovery and bails.

#### Start this step when these are true:

- something has gone wrong, or a situation has arisen that no other step covers

#### Step finished when these are true:

- the user has been informed of what happened and what state the sweep is in
- the user has decided how to continue

### Surface the Problem:

Tell the user plainly what happened, where it arose, and what state the sweep is in — including any half-applied state: worktrees still on disk, commits already on the sweep branch, branches pushed, pull requests open.

Where the problem is a withdrawn approval, claim the remainder: return to the phase the user chose and revoke every approval after it. Otherwise end the sweep, leaving the branch in place for inspection.

# --- TERMS ---

- **Corpus** — the set of documents conforming to one spec, recognised by a stamp in their frontmatter.
- **Handover** — a document holding step-shaped work that a step in a parent document folds in at its moment of use. It carries the corpus stamp with a trailing variant, so discovery returns it, and it belongs to the same assignment as the parent that folds it in.
- **Profile** — one corpus's durable policy: its discovery stamp, grouping rules, audit authority, tier hints, sanctioned shapes, workflow scripts, and brief templates.
- **Assignment** — one agent's share of a sweep: the files it owns, its tier, and its brief.
- **Sweep Manifest** — the assignment table, built at the start of a sweep and discarded at the end.
- **Tier** — a named model-and-effort pairing an agent runs at.
- **Briefed Work** — changes approved before any agent ran: the migrations, and anything else the briefs scoped.
- **Found Work** — changes arising from the sweep itself: audit repairs, and the verdicts the user returned.
- **Briefed Tip** — the commit marking the boundary between briefed and found work, and the base the second pull request is cut against.
- **Decision Card** — a finding the skill will not settle alone, carried to the user in the review page with what is proposed and what the alternative costs.
