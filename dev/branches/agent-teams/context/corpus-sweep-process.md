# DraftHorse Corpus Sweep — Process Record

Reconstructed from the executed sweep on branch `drafthorse-corpus-sweep`. Source material: the session transcript `dev/branches/drafthorse-corpus-sweep/history/1480a71f_drafthorse-corpus-sweep-executed.txt`, the 16 briefs under that archive's `tasks/corpus-sweep/`, the two workflow scripts in `.claude/workflows/`, and the result JSON under that archive's `reviews/`.

This record is the evidence base for a generic corpus-sweep skill. It states what the run actually did, what it cost, and where it broke.

## The arc

Eight phases ran, in order. Only two of them were workflows.

1. **Kickoff.** The user named the trigger (spec, skill and checker upgraded; corpus did not follow), pointed at a plan index and a set of GitHub issues, asked for a new branch, and specified the review surface up front — a single HTML file supporting approve, comment, and copy.
2. **Scope mining.** Main loop read the plan index, resolved which waves were outstanding, fetched the issues, and verified corpus state on `main` by grepping for retired strings. This established what changed in the spec and therefore what the corpus owed.
3. **Inventory.** Enumerated the stamped documents and grouped them into assignments — single files, and sets where a parent document owns handovers.
4. **Brief authoring.** Main loop wrote one shared brief plus one per assignment: 16 files, 571 lines. This is where the judgment was pre-decided, and it is the reason cheaper agents were viable downstream.
5. **Migration workflow.** One agent per assignment, all in a single `parallel()` barrier. Each read the shared brief, then its own, then its targets whole; edited site by site; self-verified with greps; returned a structured change record.
6. **Harvest and audit workflow.** A one-off harvest agent ran concurrently with read-only spec-check audits, one per document set. The audit of the framework's own skill set was sequenced after the harvest so it saw post-harvest state.
7. **Triage and repair.** Main loop folded audit findings into two piles: clear-cut repairs applied directly (~30), and judgment calls escalated to the user.
8. **Review artifact.** An HTML page carrying 18 decision cards plus 8 repair summaries, each with approve / comment / copy affordances. The user returned verdicts as a markdown block; main loop applied them.

## Model tiering

The run started with every agent inheriting the session model — Fable at xhigh — because ultracode was active and the session directive put correctness above token cost. It ended after the user intervened on usage credits.

Measured cost: the migration workflow burned 1,047,757 subagent tokens on its first partial run and 886,617 on the resume. The audit workflow burned 514,383 before the session limit stopped it, with more on resume.

The policy the run converged on, in the assistant's own words at the time:

- Spend the strong model where judgment concentrates: brief authoring, the hardest four or five documents, and above all the verify pass.
- Cheaper to migrate on Sonnet and audit on a strong model than the reverse.
- Mechanical fan-out — greps, inventories, citation conversion — takes `sonnet` or `haiku` at `effort: 'low'`.
- With briefs as tight as these, roughly 8 of 13 assignments were Sonnet-safe. Strong-model-worthy regardless: the largest document, the document whose fixes interact, the checker plus its agent, and any assignment carrying design work.
- Counter-evidence held on record: an auditor running Sonnet once held a check verbatim and still missed it. Set-level semantic judgment degrades before anything else does.

The final tiering applied to the audits: single-file executor audits on `sonnet` at `medium` effort; the two multi-document sets on `opus` at `high`.

**The scripts do not encode this policy.** The migration script carries no model or effort override at all — a cold re-run pays full session-model price for all 13 agents. The audit script carries the corrected tiers on seven entries, but three sit bare under a comment explaining they keep their original shape so a resume replays them from cache. Bare means inherit the session model. On a fresh run those three silently go to the most expensive tier. The fossil misleads.

## Failure modes

**Partial edits from failed agents.** Five of thirteen migration agents died mid-run — three connection drops, two session limits. Their half-applied edits stayed in the working tree. Recovery required identifying the failed agents' target files and running `git checkout --` on each before resuming, so the replacement agents read a true before-state. Nothing in the workflow tracked which files belonged to which assignment; the mapping was reconstructed by hand.

**Session limits mid-workflow.** Hit twice, in both workflows. Recovery was `resumeFromRunId` with an unchanged script, so completed agents replayed from cache.

**Resume blocked by the safety classifier.** The `scriptPath` form of the resume was refused; retrying with the identical script inline plus `resumeFromRunId` worked.

**Safety classifier unavailable.** One migration agent's work came back with a note that the reviewing classifier could not be reached. That agent's full diff was reviewed by hand before its edits were trusted.

**An accidental benefit.** Because migration agents re-ran over files their predecessors had already edited, the second pass byte-verified every hunk against the brief rather than re-editing it. The interruption bought a free verification pass.

## What is reusable and what is not

**`brief-audit.md` is near-generic already.** Its procedure is a single instruction — read the spec-check document in full and execute its steps against the named set, findings only, never edit. The only sweep-specific content is a list of known sanctioned shapes that would otherwise produce false findings. That list is the per-sweep parameter.

**`brief-common.md` splits roughly in half.** The reusable spine: read-first ordering with the pilot document last as the worked reference; edit with the Edit tool site by site, never by script; framework documents are frozen, so where a target disagrees the target changes; out-of-scope defects go to `flags`, reported and never fixed; register matches the target and fixed strings are byte-exact; a structured output contract with per-change `site` / `kind` / `summary` / `before` / `after` / `judgment`. The sweep-specific payload: the fixed replacement texts, the lettered checklist, and the judgment section covering the one rule that changed.

**Per-file briefs are wholly per-sweep,** but share a shape: the target path, the sites the checklist lands on, decisions pre-made for that document, any load-bearing slot flagged with its required repair, and the exemplar shapes that document is nominated to supply.

**The workflow scripts are structurally reusable.** Their fan-out, schemas, phase layout, and the sequencing of one audit behind the harvest all survive generalisation. What must come out: the hardcoded target lists, the hardcoded brief filenames, and the absent-or-fossilised model tiers.

## Techniques worth keeping

- **The pilot document as worked reference.** Every brief pointed at one already-migrated document as the exemplar for every shape. Cheaper and more reliable than describing the target shape in prose.
- **Self-verification inside the agent.** Each migration agent grepped its own targets for the retired strings its brief named, and reported the results as part of its structured return.
- **Audit independence.** Auditors were read-only, worked from a cold read against the checker document, and never saw the migration briefs. Findings were judged against the document as shipped, not against the intent.
- **Sanctioned-shapes list.** Feeding auditors a short list of known false positives kept their findings signal-dense.
- **The cold-read experiment.** One contested question — whether a step needed an explicit declaration to be understood — was settled by handing the step to a fresh Sonnet agent and seeing whether it was confused. Cheap, and it answered a design question no amount of argument had.
- **The decision artifact.** Judgment calls left the agent as cards in a single reviewable page rather than as inline questions. The user answered a batch; the agent applied the batch.

## Open design questions for the skill

- Where briefs come from: authored in the main loop as they were, or generated by an agent per target. Brief tightness is what bought the model downtier, so generating them cheaply may cost more than it saves.
- Whether the two workflows stay separate assets invoked by the skill, or fold into one script with a mode flag.
- How assignment-to-file ownership gets recorded so a failed agent's partial edits can be reset mechanically instead of by hand.
- Whether worktree isolation is worth its cost here, given migration agents edit disjoint file sets by construction.
