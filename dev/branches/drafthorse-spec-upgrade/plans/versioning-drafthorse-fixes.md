# Versioning SKILL.md — DraftHorse Fix Plan

Target: `extensions/skills/versioning/SKILL.md`. Line numbers are against the current file. Tick or untick each box; leave a comment under any item you want adjusted.

---

## Fix 1 — Routing gap: unselected units stall `+Finish`

**Where:** `:101` (+Dispatch finished), `:161` (+Range finished), `:357` (+Finish start), `:369` (+Finish engagement)

**What:** Make the user's `+Range` selection the set `+Finish` answers to, and give unchosen units a recorded disposition so nothing is left dangling.

- `+Range` finished gains an item: unchosen surveyed units are recorded as **not selected**.
- `+Finish` start becomes: every *chosen* unit released-and-verified, declined, or "nothing to release" — plus no surveyed unit still awaiting the user's choice.
- `+Finish` engagement (`:369`) gains a clause: list surveyed-but-unselected units in the summary with their pending commit counts.

`+Dispatch` keeps "every unit when the invocation was bare" — that is the *survey* set, and `+Range` narrows it to the *chosen* set.

- [x] fix this problem

---

## Fix 2 — Condition blocks become markdown lists

**Where:** every step, both machinery blocks — `:95-97`, `:99-101`, `:115-117`, `:119-121`, `:135-137`, `:139-141`, `:155-157`, `:159-161`, `:227-229`, `:231-233`, `:253-255`, `:257-259`, `:274-276`, `:278-280`, `:333-335`, `:337-339`, `:355-357`, `:359-361`, `:375-377`, `:379-381`

**What:** Rewrite each prose block as a bulleted list. Proposed content below — this rewrite absorbs Fixes 1, 3, 4 and 7 where they land in the same block.

### +Dispatch

Start:

- the skill has been invoked
- the requested unit(s) are not yet identified

Finished:

- the versioning config has been read
- the requested unit(s) are identified in the config from the [Request](#request), or every unit in the config when the invocation was bare

<!-- setup captures these conditions. if a user has been involved this step can finish when the above is satisfied anyway -->
~~**OR these are true:**~~

~~- no versioning config exists, or the named unit is absent from it~~
~~- that state has been named to the user~~

### +Setup

Start:

- no versioning config exists in this repository

**OR these are true:**

- a config exists
- a requested unit is not defined in it, or the requested unit's definition is wrong — its paths no longer resolve, or are not tracked by git

Finished:

- a config covering every requested unit is on disk
- the user has approved it

### +Preflight

Start:

- the requested unit(s) are identified in a config
- the release preconditions have not been verified this run

**OR these are true:**

- a precondition failed and has since been repaired

Finished:

- the working tree carries no modified or staged files
- the local branch is the remote default branch
- `gh` is authenticated, where any targeted unit enables `github-release`

### +Range

Start:

- the release preconditions have been verified this run
- a targeted unit does not yet have a computed commit range

Finished:

- every targeted unit has a computed commit range
- every targeted unit has a recorded current version — from its last matching tag, or its candidate baseline when it is a first release
- a targeted unit with no commits in range is recorded "nothing to release"
- after a bare invocation, the user has chosen which surveyed unit(s) to release
- after a bare invocation, every unchosen surveyed unit is recorded as not selected

### +Breaking Changes

Start:

- a chosen unit has commits in range
- no breaking-change verdict is recorded for it

Finished:

- the scan has run, been skipped, or failed for the unit
- a scan that ran has its verdict, its bump floor, and any uncertain findings recorded
- a scan that was skipped or failed has that outcome and its reason recorded in place of a floor

### +Propose

Start:

- a unit has commits in range
- a breaking-change verdict is recorded for it
- neither an approval nor a decline stands for it — an approval since revised or withdrawn leaves the unit unapproved

Finished:

- the proposed bump is derived from the commits in range per [Bump Mapping](#bump-mapping), with the breaking-change floor applied
- any uncertain findings from the scan have been put to the user
- the user has seen the bump, the reasoning, and the draft changelog
- the user has responded — approval or edits recorded with their final bump and changelog text, or a decline recorded and the unit finished

### +Execute

Start:

- the user has approved a proposed bump and changelog for the unit, with any edits applied
- no part of that release — commit, tag, push, GitHub release — has been applied yet

**OR these are true:**

- the user has approved a proposed bump and changelog for the unit, with any edits applied
- a release that stopped partway has been surfaced to the user
- the user has decided to complete it from where it stopped

Finished:

- the manifest carries the new version, or the unit's manifest is `none`
- the changelog carries the new version's entry
- the release commit is made
- the annotated tag exists
- commit and tag are pushed
- the GitHub release is published, where the config enables it

### +Verify

Start:

- a unit's release has been executed
- its version locations have not yet been checked for agreement

Finished:

- every version location has been checked against the released version
- the unit is reported released, or a mismatch is recorded

### +Finish

Start:

- every chosen unit has been released and verified, declined, or reported "nothing to release"
- no surveyed unit is still awaiting the user's choice

Finished:

- the run summary has been presented to the user

### +Handle a Problem

Start:

- something has gone wrong, or a situation has arisen that no other step covers — a verification mismatch, a failed command mid-release, an unresolvable config, an unexpected repository state

Finished:

- the user has been informed of what happened and what state the repository is now in
- the user has decided how to continue

- [x] fix this problem

---

## Fix 3 — Split bundled conditions

**Where:** `:139-141` (+Preflight finished), `:159-161` (+Range finished)

**What:** `+Preflight` finished splits into three items (tree clean / branch is remote default / `gh` authenticated). `+Range` finished splits into five (range computed / current version recorded / nothing-to-release recorded / user chose / unchosen recorded). Both are written out under Fix 2 — this box exists so you can reject the splitting independently of the list conversion.

The trailing "every precondition confirmed against the reference, not assumed" is dropped from the finished condition: it restates the engagement's own instruction at `:149` and is not a checkable state.

- [x] fix this problem

---

## Fix 4 — `+Execute` stops handling its own half-applied state

**Where:** `:274-276` (start condition), `:288` (invariant), `:315-327` (`#### Completing a release that stopped partway`)

**Convention:** half-applied state has exactly one disposition — the error drain reports what was and was not applied, recommends a manual fix, and ends the run. A step never resumes over its own partial work. Sources: `conventions.md:10`, `steps.md:131`, `condition-writing.md:59`, `drafthorse-saddler.md:136`.

`+Execute` currently violates this in three places at once. This is a deletion, not a rewrite — there is no OR fork to separate, because the second branch should not exist.

**What:**

- **Start condition `:274-276`** — keep only the fresh-release list. Delete the resume branch and the trailing `+Handle a Problem` sentence. Supersedes the `+Execute` OR fork written under Fix 2:

    - the user has approved a proposed bump and changelog for the unit, with any edits applied
    - no part of that release — commit, tag, push, GitHub release — has been applied yet

  This de-holds on its own: once any artifact is applied the second item is false, so a half-applied release can never re-admit the step.

- **Invariant `:288`** — trim to the safety half, drop the resume licence: "**NEVER** re-apply an artifact that already exists. A release commit, an annotated tag, a pushed ref, and a published GitHub release are all durable." Delete "completing a release applies only the artifacts that are missing".

- **Engagement `:315-327`** — delete `#### Completing a release that stopped partway` whole: the prose, the inventory bash block, and the "rewrite the notes file" line.

- **Move the inventory to the drain** — the four inventory commands are still needed, but as *accounting for the user*, not as a resume plan. They move into `+Handle a Problem`'s engagement (see Fix 11).

**Consequence to check on the walk:** a mid-release failure now leaves `+Execute` unable to meet its finished condition, and the preamble routes it to the error drain. That is the intended path.

- [x] fix this problem

---

## Fix 5 — Citations become links

**Where:** `:73`, `:77`, `:101`, `:105`, `:129`, `:149`, `:263`, `:313`, `:346`

**What:** Convert each internal reference citation to its heading anchor, and each external file citation to a relative link with derived text.

- `:73` — `` `Preflight` `` → `[Preflight](#preflight)`
- `:77` — `` `assets/CHANGELOG-template.md` `` → `[CHANGELOG Template](assets/CHANGELOG-template.md)`
- `:101` — `` `Request` `` → `[Request](#request)`
- `:105` — `` `Preflight` `` → `[Preflight](#preflight)`
- `:129` — `` `references/config-template.md` `` → `[Config Template](references/config-template.md)`
- `:149` — `` `Preflight` `` → `[Preflight](#preflight)`
- `:263` — `` `Bump Mapping` `` → `[Bump Mapping](#bump-mapping)`; `` `Semver` `` → `[Semver](#semver)`; `` `Changelog Rules` `` → `[Changelog Rules](#changelog-rules)`
- `:295` — `` `Changelog Rules` `` inside the bash block → `[Changelog Rules](#changelog-rules)`
- `:313` — `` `assets/CHANGELOG-template.md` `` → `[CHANGELOG Template](assets/CHANGELOG-template.md)`
- `:346` — `` `Preflight` `` → `[Preflight](#preflight)`

The `=== Mini Heading ===` labels cited at `:149` (`Git Status`, `Branch`, `GitHub Authenticated`) and `:73`/`:346` (`Today's Date`) stay as code-spans — mini headings carry no anchor, so a link would be broken.

- [x] fix this problem

---

## Fix 6 — Drop the duplicated approval gate

**Where:** `:21`

**What:** Delete the global invariant "**NEVER** update a unit's release artifacts — manifest, changelog, commit, tag, push — before the user has explicitly approved the proposed bump and changelog for that unit." `+Execute`'s start condition is the mechanism that enforces it, and the rule stated in two homes drifts.

Alternative if you'd rather keep a global backstop: narrow it to what the start condition cannot close — "**NEVER** apply a release artifact outside `+Execute`."

- [x] fix this problem

---

## Fix 7 — `+Propose` gate becomes compound

**Where:** `:257-259`

**What:** Add the proposal's own completeness criteria alongside the user's response, so a rubber-stamp cannot pass a malformed proposal: bump derived per the mapping with the breaking-change floor applied, and uncertain findings put to the user. Written out under Fix 2.

- [x] fix this problem

---

## Borderline 8 — Why-prose in the pathspec invariant

**Where:** `:20`

**What:** Drop the closing rationale sentence "A variable expands unsplit in zsh, reaching git as a single pathspec that matches nothing." The rule holds without it.

Counter-argument for leaving it: this one is a footgun an agent will otherwise re-invent, and the rationale is what stops the agent "optimising" the literal paths back into a variable.

- [ ] fix this problem

---

## Borderline 9 — Near-restatement in the staging invariant

**Where:** `:287`

**What:** Trim "**NEVER** stage untracked files that are not the manifest or changelog; untracked files may exist but do not enter the release commit." to the clause before the semicolon.

- [x] fix this problem

---

## Fix 10 — `+Range` path errors stop being handled in-step

**Where:** `:217-221` (`#### Path errors`), `:161` (+Range finished)

**What:** The engagement's disposition for a failed `git ls-files --error-unmatch` is "leave the unit without a computed range" — but the finished condition requires every targeted unit to have one, so the step silently becomes uncompletable and only reaches the user through the preamble's fall-to-drain. The disposition is stated in the step; the convention puts it in the drain.

Keep the diagnostic half of `#### Path errors` — the explanation that `git log` ignores a pathspec matching nothing, and that verifying paths first is what tells a wrong path from a quiet unit. That is how-to-work guidance and belongs in the engagement.

Cut the disposition half — "leave the unit without a computed range" — and replace it with the reporting the drain needs: which path git rejected, and how it was resolved (symlink target converted wrongly, stale target, config path that no longer exists). The step then simply cannot finish, and `+Handle a Problem` picks it up on "an unresolvable config" with the diagnosis already in hand.

Add "an unresolvable unit path" to `+Handle a Problem`'s start-condition examples at `:377`.

- [ ] fix this problem

---

## Fix 11 — `+Handle a Problem` gets the half-applied disposition

**Where:** `:383-385` (suggested next actions), `:387-389` (engagement)

**What:** The drain is now the single home for half-applied state, and it currently isn't equipped for it.

- **Suggested next actions `:385`** — "Resume the step the user chose, or end the skill" invites re-entry into `+Execute` over its own partial work, which is what Fix 4 just removed. Rewrite: "Resume the step the user chose. A half-applied release is not resumable — end the skill and leave the repair to the user."

- **Engagement `:387-389`** — gains a `#### Half-applied release` sub-heading carrying the disposition and the inventory block moved out of `+Execute`:

    - take the inventory first — `git log --oneline -1`, `git tag -l '<tag>'`, `git ls-remote --tags origin 'refs/tags/<tag>'`, `gh release view <tag>`, plus reading the manifest and changelog for the version
    - report to the user exactly which artifacts exist and which do not
    - name the manual commands that would complete it, without running them
    - end the run; suggest an issue against this skill so the gap is recorded

  The existing line "A pushed commit and tag are durable even when a later step failed — never retry by re-tagging" folds into this sub-heading.

`#### Github release failure` at `:391-393` already follows this shape and stays as-is.

- [ ] fix this problem

---

## Fix 12 — Clean-run recovery: no working step handles its own failure

**Convention:** the error step carries every failure disposition, in one of two modes (`conventions.md`, *The error step*):

- **Hard bail and clean up** — unrecoverable: unfinished, destructive, or a state the document cannot name. Clean up the mess the run made, end the skill. The user repairs across following turns, then re-runs for a clean pass or finds the skill no longer needed.
- **Claim the remainder** — recoverable and named in advance. The error step does what the failing step could not, the run completes, and the report surfaces what went wrong.

A working step carries neither. It does its job; a state it cannot resolve falls to the error step.

This supersedes the narrower half-applied rule in Fixes 4, 10 and 11 — those stay correct, this widens the same principle to every failure class. It is the load-bearing simplification in this plan; take it and several other items shrink.

**Which mode each versioning failure takes:**

- Half-applied release, unresolvable unit paths, failed preconditions — hard bail.
- GitHub release failure after a successful push (`:391-393`) — claim the remainder: the tag is durable, the run completes, the report tells the user to publish manually. This one already had the right shape.

**The dividing line it draws:** a step may do work the skill owns; it may not restore the world to the state the skill requires. `+Setup` authors the versioning config — that is the skill's own artifact, collaborative work, and it stays. `+Preflight` repairing a dirty tree or a wrong branch is fixing the *user's repository* — outside the skill's remit, and it goes.

**What it deletes:**

- **`+Preflight` start `:137`** — drop the whole `**OR these are true:** — a precondition failed and has since been repaired` branch. Supersedes the `+Preflight` block written under Fix 2.
- **`+Preflight` engagement `:149`** — "Report any failing precondition to the user and offer to fix it with them; after a fix, verify again" becomes "Report any failing precondition to the user." The step then cannot finish and drains.
- **`+Propose` start `:255`** — drop "including a unit whose approval has since been revised or withdrawn, which leaves it unapproved and awaiting a fresh proposal". It is a no-op restatement: a withdrawn approval *is* no approval standing, which the preceding clause already covers.
- **`+Execute`** — already covered by Fix 4; this policy is the reason, not just the half-applied convention.
- **`+Range`** — already covered by Fix 10.
- **`+Handle a Problem` suggested next actions `:385`** — "Resume the step the user chose, or end the skill" becomes "End the skill. The user repairs the state, then re-runs for a clean pass." Simplifies the Fix 11 wording, which still hedged toward resumption. Keep the GitHub-release remainder case as-is; it completes the run rather than bailing.

**What it adds:** one Agent Invariant, replacing the resume machinery spread across four steps:

> **NEVER** resume a failed run. Report what happened and what state the repository is in, end the skill, and let the user repair and re-invoke.

**Cost, stated honestly:** restart cost here is near zero. Everything before `+Execute` is read-only or recomputation — `+Preflight` reads live state, `+Range` recomputes from git in a second. The only work lost is the `+Propose` conversation for units already approved this run, and a failure at or after `+Execute` ends the release anyway. A skill with expensive irreversible pre-work would weigh this differently; this one does not.

**Upstream status.** This convention is now settled in `conventions.md` (*The error step*), so this fix implements it rather than proposing it. The corresponding spec propagation — `steps.md` dispositions, the digest, the template, saddler's check — is tracked separately and does not block these edits.

- [x] adopt clean-run recovery

---

# Upstream — the source of two of these

These three sit outside the versioning unit. Fix 13 is applied. Fixes 14 and 15 are tracked with the wider spec-alignment work and do not block the versioning edits above.

## Fix 13 — `SKILL-template.md` writes condition blocks as prose

**Where:** `extensions/skills/drafthorse/assets/SKILL-template.md:110-116` (success exit), `:132-138` (error step)

**What:** The template's working-step blocks (`:60-77`) are correctly lists, but the two shipped exit steps are prose. Versioning copied the error step verbatim and the prose habit spread across all ten of its steps — Fix 2 is the downstream symptom.

Convert both exit steps' condition blocks to list form in the template. The error step's shipped text becomes:

Start:

- something has gone wrong, or a situation has arisen that no other step covers

Finished:

- the user has been informed of what happened and what state things are now in
- the user has decided how to continue

Same repair applies to `drafthorse/SKILL.md`'s own steps, which are prose throughout — the build skill is its own worst example. Scope that as a separate pass.

- [x] APPLIED — both exit steps in `SKILL-template.md` now carry list-form condition blocks.

---

## Fix 14 — `SKILL-template.md`'s error step ships no disposition

**Where:** `extensions/skills/drafthorse/assets/SKILL-template.md:144-146`

**What:** The template's error engagement says "what state things are now in (half-applied states also)" — it names the state but never states the disposition. The full rule lives only in `steps.md:131`, which a drafting agent following the skill need not open. A new document can therefore grow a per-step resume path and still pass the template, which is exactly how `+Execute` came about.

Add the disposition to the template's error step engagement as shipped text:

> A half-applied state — a step that failed partway, its work neither undone nor complete — has one disposition. Account for what was applied and what was not, report it with a recommended manual fix, and end the run. **NEVER** re-run a step over its own partial work.

- [ ] fix this problem

---

## Fix 15 — the build skill enforces the disposition

**Where:** `extensions/skills/drafthorse/SKILL.md:46` (Conventions Digest), `:180` (+Draft the Skill), `:196` (+Review scenario-walk)

**What:** Three touches, cheapest first. Take any subset.

- **Digest `:46`** — the entry buries the rule in a subordinate clause of a long sentence about coverage. Split it into its own test so the walk at `:196` can sweep it as a discrete check: "**Half-applied state bails to the user** — a step that fails partway never resumes over its own partial work; the error step accounts for what was and was not applied, recommends a manual fix, and ends the run. A resume path, an inventory-and-continue engagement, or a half-applied clause in any step's start condition is the disposition in the wrong home."

- **`+Draft the Skill` `:180`** — after "keep the error step", add: "no working step handles its own failure — every failure disposition belongs to the error step."

- **`+Review` `:196`** — the walk instruction says "each failure entry"; sharpen to name the check: "at each failure entry, confirm the failing step simply cannot finish and the drain claims it — no step carries a resume path or a half-applied clause of its own."

The digest split is the load-bearing one: it converts a clause an agent reads past into a test the walk executes, and it mirrors the check saddler already holds at `drafthorse-saddler.md:136` so builder and auditor test the same thing.

- [ ] fix this problem

---

## Not changing

- `#### Agent decision:` at `:163-165` — machinery heading, correct placement and order.
- `#### First release` / `#### Github release failure` H4 sub-headings inside engagements — valid engagement structure.
- `+Breaking Changes` recording a skipped or failed scan and continuing (`:233`, `:247`) — a recorded outcome the finished condition covers exhaustively, not an error handled in-step. Nothing is applied, nothing is left partial.
- `+Verify` recording a mismatch (`:339`) and `+Handle a Problem` claiming "a verification mismatch" (`:377`) — a correct dovetail; neither names the other.
- Frontmatter, scaffold dividers, Terms section — all conform.
