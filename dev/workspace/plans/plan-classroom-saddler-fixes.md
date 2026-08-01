# Plan: Classroom Saddler Fixes

Status: **DONE (2026-08-01).** All findings below applied, then verified by three saddler runs through the released `agent-tools` plugin — `revise`/8, `revise`/2, then **`pass`**. Each run's new findings were fixed before the next. Outcomes, deviations, and the borderline items left standing are recorded in the wave-5 entry of [00-INDEX.md](00-INDEX.md). One deviation of note: `vetted-video-channels.md`'s empty `Channel` column was REMOVED rather than populated — the row name is now the search key, since every link is verified live at build time anyway.

Original status: Ready — deferred. Source: the wave-4 saddler acceptance run against `extensions/skills/classroom/SKILL.md` (2026-07). These are findings against the classroom DOCUMENT, not the framework — the framework and checker are settled; classroom was simply the migrated skill the saddler was pointed at, and it surfaced real routing defects. Fix as its own task; classroom is an independently versioned plugin, so this rides its own release.

## Context

The acceptance run returned `revise` with 12 findings + 2 borderline. The checker defects it also surfaced are ALREADY FIXED in `drafthorse-spec-check.md` and the regenerated saddler (finding 9's false positive, the Terms-inheritance contradiction, the `=== block` definition, the half-applied test object, folder-citation dead-weight, error-step fixed-string). What remains below is the document work on classroom itself.

## Routing defects (serious — fix first)

- **Renderer-absent deadlock.** `## +Assemble a Unit's Documents` finished condition requires "each document's HTML written to `source/` and converted to A4 PDF whose conversion report matches the document's intent". When `html_to_pdf` is unavailable — the exact state `deliver-without-renderer-handover.md` exists to serve — no conversion report can exist, so the step never finishes and the fallback delivery satisfies nothing. Fix: make the finished condition read EITHER a matching conversion report OR a print-ready standalone delivered, so the fallback closes the step.
- **Single-lesson stall.** `## +Build and Approve the Sample` start condition ("shapes chosen and, for a build larger than a single lesson, no current sample format approved") never de-holds for a single-lesson build — the sample clause does not apply, so the condition holds forever and the step re-admits itself. The engagement handles it in prose ("For a single-lesson build there is nothing to mass-produce") — engagement work doing a start condition's job. Fix: put the single-lesson exclusion in the start condition.
- **Mark → record contradiction.** `## +Mark Completed Work` finishes on "a review has been produced and saved", but `## +Present and Record State` starts on "deliverables that have not yet been saved and recorded". Saving claimed in two homes; on the mark path the downstream start condition is half-false when it should fire, so the agent can skip recording and lose the CLAUDE.md status update. Fix: let the mark step finish on the review produced + location known, leaving saving to the recording step; or split the recording step's condition so "recorded" alone carries it.

## Dormant / unreachable

- **`+Warm the PDF Engine` (in `setup-handover.md`) is unreachable.** Its start condition waits on "the user has asked to pre-install the PDF dependency", but no step ever offers the option — `+Configure the Project`'s engagement ends without raising it. Fix: have `+Configure the Project` offer the pre-install so the awaited state can arise.

## Reference hygiene

- **`## House Style` — dead weight.** No step cites it; its own inline comment concedes it ("not cited anywhere, remove after extended use and verifiable redundant"). Content already carried by `templates/documents/` shells and the `Document Pipeline` entry. Fix: cite it where `+Assemble a Unit's Documents` fills a shell, or drop it.
- **`## Storage Model` — dead weight.** Never cited by name; comment at line 21 admits it. Steps reach `students/`, `matter/`, `CLAUDE.md` by bare path. Fix: cite `Storage Model` at first use in `+Confirm Classroom Context` or `+Establish Learner and Intent`.
- **`vetted-video-channels.md` — empty data + orphaned action.** The `Channel` column is empty for all eight rows, so the "pre-vetted channel database" the media handover loads carries no channel identifiers. Also its intro claims an action no step owns ("adds new channels here as they prove out"). Fix: populate the Channel column; give the add-back action a home in a step's finished condition or drop the claim.
- **`curriculum-spines.md` — duplicated invocation condition.** Its opening line ("Read this when the user wants to follow, supplement, or avoid gaps…") duplicates the citing step `+Align the Build` verbatim. The invocation condition now lives in two places and will drift. Fix: delete the line from the reference; the citing step is authoritative.

## Prose (sharp-prose findings)

- **Two unresolved authoring comments** at SKILL.md lines ~21 and ~70 ("remove after extended use…") — scaffolding addressed to an ended session, unactionable by a cold agent. Fix: resolve each decision now and delete the comment.
- **`media-processing-handover.md` para 2** — pure why-prose ("Dead links are a common failure mode… which is why every link is verified live"); the two Agent Invariants below already state the guardrails. Fix: delete.
- **`deliver-without-renderer-handover.md` para 2** — why-prose explaining why the procedure exists; keep only the one load-bearing fact (geometry base must be first child of `<head>`), which `The Geometry Base` reference already states. Fix: cut the rest.

## Borderline (reviewer's judgement, optional)

- **`Handover Doc` term** re-teaches framework mechanics the handover-variant preamble already delivers — consider trimming to the citation form + file-location convention.
- **`+Assemble a Unit's Documents` vs `+Build Remaining Units`** read as possibly racing on the same unit; a word in the `+Build Remaining Units` purpose line naming it a spanning supervisor would settle it.

## Dependencies

- Independent of the framework upgrade — do any time after wave 4 closes.
- classroom is its own versioned plugin: these fixes ride a classroom release, separate from the `agent-tools` release that ships the migrated drafthorse skill + saddler.
- Re-run the saddler against classroom after fixing, as the close-out check (through the plugin once `agent-tools` is released, or fresh-file as in the acceptance run).
