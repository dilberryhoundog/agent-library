# Corpus Sweep Tool — Settled Decisions

Round 1 verdicts, returned 2026-08-21 from `dev/workspace/reviews/corpus-sweep-tool-proposal.html`. Round 2 is open — see the end.

## Settled

- **D1 · Skill is a DraftHorse document.** Yes. When the build begins, ask the user to invoke the DraftHorse skill rather than drafting the document freehand.
- **D2 · Home.** Skill in `extensions/skills/`, symlinked into `agent-tools`. Per-sweep working set under `dev/workspace/tasks/<sweep-name>/`. Review page to `dev/workspace/reviews/` — the scaffolded folder — not an ad-hoc `artifacts/`.
- **D3 · Step map as drawn.** Eight working steps, two exits, no handover documents. `+Migrate` and `+Audit` declared Looping; `+Apply Verdicts` declared Dormant; releases excluded from the skill's span.
- **D4 · Manifest as sole interface, YAML.** The skill writes it; both workflows read it; the reset procedure reads its file lists.
- **D5 · Briefs stay main-loop authored,** user-approved before any agent runs.
- **D6 · Two workflow files.** `migrate.js` destructive, `audit.js` read-only — the safety boundary stays visible.
- **D7 · Deliberate verification pass added.** A cheap per-assignment stage that re-reads edited files against the brief and reports mismatches without editing.
- **D8 · Named tiers with defaults, and `high` maps to an explicit model.** `high` resolves to `opus`, never to "inherit the session model". A sweep may be authored in a Fable session, so inheriting would silently reintroduce the cost blowout the tiering exists to prevent. No tier is ever left unset.
- **D9 · Manifest-driven reset before every resume.**
- **D10 · No worktree isolation.** Disjoint file sets per assignment, guaranteed by the manifest.
- **D11 · Review page is a local workspace file,** in `dev/workspace/reviews/`.
- **D12 · Named for DraftHorse with generic seams** — superseded in part, see round 2.

## Round 2 — open

Raised after the round-1 verdicts were returned.

1. **Universality.** Whether the tool covers any spec-driven corpus sweep, motivated by dev-workspace: when that skill changes, every repo carrying its config and rules is left on the old state. Reopens D12.
2. **Git strategy.** Where commits and pull requests happen, and who performs them, so a sweep does not land as one undifferentiated clump.
3. **Change provenance.** Separating briefed migration from unbriefed repairs, so unscoped changes are reviewable on their own rather than mixed into the migration.

## Round 2 — settled

Returned 2026-08-21.

- **Universal skill with prebuilt per-corpus profiles.** The skill holds the pattern; each corpus gets a profile built and reviewed in advance. At sweep time the main loop selects a profile, never authors one. Reverses D12.
- **Worktree per migration agent.** Reverses D10. Conflict was never the risk — unobservable partial failure was. A dead agent's work dies with its worktree, which removes the reset procedure entirely. Audit agents get no worktree; they are read-only and need the integrated corpus.
- **Manifest is per-corpus, not a universal schema.** Loosens D4. A bespoke script needs no `scope:` or `audit.mode:` seams. The four audit modes survive as authoring guidance, not as an enum.
- **Failure recovery is discard-and-rerun.** Supersedes D9. The manifest file list keeps a better job: asserting after integration that a commit touched exactly the files its assignment owns.
- **Integration is local and linear.** Worktrees share one `.git`, so an agent's branch is visible from the main tree with no push or fetch. Main loop cherry-picks each assignment onto the sweep branch — never merges, which would tangle merge commits with work commits and destroy per-commit readability.
- **Agents never push and never touch `gh`.** Main loop pushes once and opens the pull requests.
- **Two pull requests, split by provenance.** Briefed work, then found work, each carrying per-site commits. Per-site granularity lives in the commits; every commit is a self-contained diff.
- **Integration folds into `+Migrate`.** The step is already Looping and the cherry-pick plus file-list assertion is per-assignment work, so the map stays at eight steps.

## Round 3 — settled

- **N1 · Name.** `corpus-sweep`.
- **N2 · Profiles.** Build both — DraftHorse and dev-workspace.
- **N3 · Branch creation.** Use dev-workspace. Both parent repositories have it. Branch creation and working-directory location must be swappable in one place, so the skill can be released publicly without the dependency.
- **N4 · Existing scripts.** Delete `.claude/workflows/drafthorse-corpus-migrate.js` and `.claude/workflows/drafthorse-corpus-audit.js` once the DraftHorse profile lands.
- **N5 · Build order.** References, then profiles, then brief templates, then SKILL.md last — drafted by invoking the DraftHorse skill.
