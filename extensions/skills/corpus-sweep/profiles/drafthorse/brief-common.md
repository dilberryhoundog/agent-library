# {{SWEEP}} — Common Migration Brief

<!-- Template. The skill fills every {{SLOT}} and writes the result to the sweep's working directory as brief-common.md. Delete this comment. -->

One migration pass over one assigned DraftHorse document or document group. The framework changed; the corpus did not. This brief carries the shared rules; your assignment brief carries the sites and decisions specific to your target.

## Read first

{{SPEC_DOCS}}

<!-- Authority documents, numbered, on high-tier assignments only. On a standard or mechanical assignment this slot reads: "This brief is your whole authority. Do not consult the framework documents." A brief that cannot stand on that sentence belongs at high tier. -->

{{WORKED_EXAMPLE}}

<!-- Optional. Where a document has already been migrated to the new shape, name it and say what to take from it. Omit the slot entirely when none exists. -->

Then read your target file(s) whole. Edit with the Edit tool, site by site. Never edit via script or stream editor; scripts are for measurement. Never edit any file outside your assignment. The authority documents above are frozen — where your target disagrees with them, the target changes; where the migration seems to demand an authority change, flag it instead.

## Fixed texts — byte-exact

{{FIXED_TEXTS}}

## Checklist, applied per step in one pass

{{CHECKLIST}}

- **Out-of-scope defects** — anything wrong that this checklist does not cover goes in `flags`, with verbatim location and problem, never a fix.

## Judgment

{{JUDGMENT}}

## Register

Match the target document's existing prose register. Fixed strings byte-exact. Condition items lowercase, terse, state-shaped. Add no commentary, rationale, or comments to the documents.

## Commit

Your edits are isolated in your own git worktree. When the checklist is complete and your self-verification is clean, create the branch your assignment prompt names, stage only your assigned files, and commit them as one commit. Push nothing. Open no pull request.

## Output

Return only the structured object the schema demands. Every edit is one change entry: `site` (step or section name), `kind` (from the checklist above), `summary` (one sentence), `before`/`after` (the decisive fragment, not whole blocks), `judgment` (why, where a call was made). `flags` carries out-of-scope findings and every hesitation worth the reviewer's eyes. `exemplars` carries any shape your assignment brief nominates: the shape name and the verbatim migrated block.
