# Wave 6b — Step-Shape Examples and Template Extraction

Three targets, one coherent change: the step-shape reference gains a machinery example per catalogue entry, the template loses its shipped error and success blocks, and the build skill's `+Draft the Skill` points the builder at the blocks' new home.

Read first: `docs/drafthorse/framework/steps.md`, `extensions/skills/drafthorse/references/step-functions.md` (current state), `extensions/skills/drafthorse/assets/SKILL-template.md`, `extensions/skills/drafthorse/SKILL.md` (`+Draft the Skill` engagement), and `dev/branches/drafthorse-step-anatomy/plans/plan-step-shape-examples.md` (the plan of record).

## 1. `references/step-functions.md` — an example per entry

Under each of the six catalogue entries, add its machinery example: a fenced markdown block showing the shape's distinguishing machinery (heading, directive, declaration, conditions — engagement only where it is the point, as in the error step). Each example opens with one line stating what it demonstrates, so it reads as one shape's machinery rather than the shape's only form. Use the harvested corpus specimens below — they are already in the migrated dialect; trim to the distinguishing machinery, generalise names only where a corpus-specific term would confuse (prefer keeping them: they read as real).

- **Error step** — ship the full prebuilt block, copied whole from the template's current error step (`+Handle a Problem`: directive, declaration, generic start condition, two finished items, `### Surface the Problem:` engagement text). This block is MOVING here from the template — it must remain copy-paste complete.
- **Success step** — ship a prebuilt block from the template's current success exit (declaration, exhaustive-done start placeholder, finished with `- the skill is complete`), enriched by this corpus specimen:

```markdown
## +Conclude

End the run on a plain success and hand the conversation back.

**Success step** — Resolves the run's done state and exits.

#### Start this step when these are true:

- the report has been presented
- the run's outcome is recorded as a full success

#### Step finished when these are true:

- the user has the conversation back
- the skill is complete
```

- **Looping step** — specimen (versioning):

```markdown
## +Breaking Changes

Set the bump floor by scanning for changes that break users of the unit.

**Looping step** — Re-runnable, taking a different branch each pass.

#### Start this step when these are true:

- a chosen unit has commits in range
- no breaking-change verdict is recorded for it

#### Step finished when these are true:

- the scan has run, been skipped, or failed for the unit
- a scan that ran has its verdict, its bump floor, and any uncertain findings recorded
- a scan that was skipped or failed has that outcome and its reason recorded in place of a floor
```

  The per-item discriminator ("no verdict recorded **for it**") is the teaching point: the re-holding condition is the loop, the finished condition ends it.

- **Routing step** — no corpus specimen exists (the corpus settles divergent intent in ordinary steps' conditions); compose the example with placeholder text per the plan: a step whose work is the choice, an `#### Agent decision:` block resolving to a named fact, and a finished condition depending on that fact. State in its opening line that the shape is rare — divergence usually lives in start conditions.
- **Dormant step** — specimen (versioning `+Setup`): declaration plus a start condition that simply never activates on most runs (the OR block shape is a bonus teaching point). Trim to head + start conditions.
- **Handover step** — specimen (classroom):

```markdown
## +Mark Completed Work

Grade completed work the user has supplied and get a review delivered.

**Handover step** — Manages the invocation and resolution of a handover document.

#### Start this step when these are true:

- the run's intent is to mark completed work the user has supplied

#### Step finished when these are true:

- a review has been produced for the supplied work
- its saved location is known
```

  The teaching point: the finished condition reads the state the handover leaves behind — no handed-back outcome.

Also worth including under the Error step entry, as the folded variant: the executor-exception shape (adapted tail + ended-run OR claim + final-message termination), specimen from agent-switch's `+Result`. Keep it clearly subordinate to the standalone error step.

If a TODO comment sits at the head of the file, delete it on completion; if none exists, note that.

## 2. `assets/SKILL-template.md` — back to a skeleton

Remove the shipped success-exit and error-step blocks (`## +<Success Exit Step Name>` and `## +Handle a Problem` sections, whole). The template keeps: scaffold, dividers, the verbatim preamble, the generic `## +<Step Name>` block with its placeholders and comments, the function-chooser pointer, Terms. Where the removed blocks' comments carried unique guidance (the "keep the start condition generic" note; the exhaustive-done comment), that guidance now lives with the blocks in `step-functions.md` — carry it there, never leave it orphaned in the template. Single source of truth: nothing in the template may retain a copy of either block.

## 3. `extensions/skills/drafthorse/SKILL.md` — the citation holds the weight

`+Draft the Skill`'s engagement currently instructs "Keep the steps preamble verbatim; keep the error step" and cites [Step Functions](references/step-functions.md) for declarations. The template no longer ships the error step, so rewrite minimally: the builder copies the prebuilt error and success blocks from [Step Functions](references/step-functions.md) into the draft (error step mandatory; success exit per the map), and declares functions from the same reference. One or two sentences — do not restructure the step. Also confirm `## The Template` (References section) still describes the template truthfully once the blocks are gone ("the error step shipped as real text" would now be false — correct that line).

## Constraints

- Framework docs and the spec-check are out of scope; if an example would contradict a check, flag it and stop that example.
- Match each file's existing register. No commentary. Do not commit.

## Output

Structured result per the migration schema (changes, flags, verification). No exemplars.
