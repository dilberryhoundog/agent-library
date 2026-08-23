# dev-workspace Sweep — Findings, Profile Dropped

Recorded 2026-08-21. A dev-workspace profile for `corpus-sweep` was probed and dropped: `dev-workspace init --update` already refreshes the template payload from the plugin, so a sweep would duplicate a shipped command. The probe was written and never executed. These findings outlived it.

Writing the probe surfaced eight things. Six are decisions still owed. Two overturn assumptions made before the CLI was inspected.

## Overturned

**`dev-workspace init --check` is not a conformance check.** It verifies environment setup — workspace protection, the config merge driver, local git ignores, the `tree` binary — and exits clean regardless of how stale the template files are. It reports nothing about template content. The audit authority for this corpus is therefore a **diff against the installed plugin's template payload**, not a command. Any design that named `init --check` as the audit authority was wrong.

**`dev-workspace init --update` already does the mechanical half.** It refreshes the scaffold from plugin templates, overwriting changed template files while preserving repository content, on the parent branch. A sweep that only copies files is redundant with a command that already ships. The sweep earns its place on the other half: the files where repository content and template content are interleaved, the repositories where a reviewed pull request is wanted instead of a local overwrite, and doing it across every repository at once rather than one at a time by hand.

That is a narrower job than the DraftHorse sweep, and it should be built as the narrower job.

## Structural differences from the DraftHorse profile

**No worktree isolation, anywhere.** `isolation: 'worktree'` clones the repository the workflow runs in — the sweep repository — which is not where the work happens. Each target is a separate repository and is already its own working tree. Isolation is free and automatic here, and the option must stay off.

**Assignments cannot be prebuilt.** The DraftHorse corpus is a fixed list of documents in one repository. This corpus is whichever repositories on a machine carry an installation, which changes. Discovery runs per sweep and fills `assignments` before either workflow can fan out.

**No version stamp exists anywhere.** Neither `workspace-config.yml` nor any scaffolded file records which template version a repository is on. Drift can only be established by diffing content against the canonical payload. A version field in the config would make discovery cheap and make "which repositories are behind" answerable without reading every file — worth raising against dev-workspace itself.

**Agents work outside the sweep repository.** Every agent operates on an absolute path elsewhere on disk. This is the profile's main hazard and the reason for the preflight phase: a target repository may hold someone's uncommitted work, sit on a feature branch, or already carry the sweep branch name.

## Decisions owed before a first run

1. **Which repositories are in scope.** Discovery needs a root to scan and a rule for what counts as an installation. A scan for `dev/workspace/workspace-config.yml` under a projects root is the obvious rule; the root itself has to be configured or asked for.

2. **Push and pull requests.** The DraftHorse profile has the main loop push once and open two pull requests, because everything lands on one branch in one repository. Here every repository needs its own push and its own pull request. Either the main loop visits each repository in turn after the workflow returns, or agents push their own — which reverses a settled decision and puts network and `gh` authentication in every agent. The main loop visiting each is slower and safer; nothing yet decides it.

3. **What a merge-class file's judgment actually is.** `.claude/CLAUDE.md`, `settings.json`, and `workspace-config.yml` carry repository content interleaved with template content. The probe instructs an agent to apply what canonical changed and preserve what the repository added. Whether that is reliably decidable — particularly for `settings.json`, where the merge is structural rather than textual — is unknown until it is tried on a real drift.

4. **Whether `audit.js` should exist at all.** The verify phase already diffs each migration against canonical, and canonical-diff is a mechanical comparison rather than a semantic judgment. A separate audit pass would repeat it. The DraftHorse profile needs two passes because its audit applies a checker document with set-level reasoning that no diff can perform; this corpus has no equivalent. Proposal: this profile ships migrate-and-verify only, and the skill treats the audit phase as satisfied by verification when a profile declares `audit_mode: canonical-diff`.

5. **Blocked repositories.** The probe skips any repository whose preflight fails and reports why. Whether a blocked repository should be retried later, queued for the user, or simply reported once is undecided.

6. **Rollback.** A migration that goes wrong is contained to one repository's branch, so recovery is deleting that branch. Nothing yet says who notices, or when.

## What this profile shares with DraftHorse unchanged

Tier names and their resolved models. The structured-return contract. Briefs authored in the main loop and approved before agents run. The verification pass. Preflight before mutation. Agents never push. One commit per assignment, carrying only the files that assignment owns.
