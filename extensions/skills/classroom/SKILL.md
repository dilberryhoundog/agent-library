---
name: classroom
description: Build tailored homeschooling lessons, unit studies, workbooks, courses and the accompanying teacher/parent materials. Use this skill whenever the user wants to create, extend, or rebuild any home-education resource. Also useful when continuing or adding to a course already built, or helping review/mark completed materials.
allowed-tools: Task, Read, Write, Edit, Glob, WebSearch, WebFetch, Bash(cp:*), Bash(bash:*), mcp__plugin_classroom_classroom-pdf__html_to_pdf
---

# Classroom

Assemble home-education materials tailored to a specific learner and the family's fixed constraints: unit studies, workbooks, answer keys, scope-and-sequence maps, parent lesson guides, certificates, and reviews. A finished lesson combines five things — the learner's profile, the family's standing requirements, a course shape, a lesson shape, and a document style — drawn from this skill's `templates/` and `references/` and from the family's configuration at the project storage root.

# Agent Invariants

**ALWAYS** use the spelling convention and page size declared in `global-requirements.md` (or a student-file override) on every printable — read the value, never assume it.
**NEVER** add or strip worldview or content framing the user has not asked for — read the student and `global-requirements.md` files and follow them, in both directions.

# --- REFERENCES ---

## Storage Model

<!-- used implicitly via the students/, matter/, and CLAUDE.md paths but never cited by name in a step; cite it at first point of use (e.g. +Confirm Classroom Context) or remove after extended use proves it redundant -->
=== Where each piece lives ===

- **Project storage root** — the family's configuration, created once at setup: `global-requirements.md` (standing constants — spelling, page size, cost rule, worldview defaults), `students/` (one file per learner), `CLAUDE.md` (project config + status notes), `.claude/rules/classroom.md` (the static rule that emits the signal below).
- **This skill** — the reusable library: `templates/` (course/lesson shapes, document shells, blocks) and `references/` (this file's siblings).
- **Plugin root** — `${CLAUDE_PLUGIN_ROOT}/templates/` (the setup init payload), plus `mcp/` and `scripts/`.
- **Per course** — `<course>/matter/` (saved source material) and the working-outputs location recorded in `CLAUDE.md` (delivered documents).

## Classroom Signal

=== the marker that a classroom is set up here ===
`**CLASSROOM SKILL COMPATIBLE**` — emitted into the loaded context by `.claude/rules/classroom.md` at the project storage root. Its presence means a classroom project exists in the current working directory; its absence means none is set up here.

## Document Pipeline

=== how every document is produced ===
Documents are authored as HTML and delivered as A4 PDF. Write each document's HTML into a `source/` folder beside where its PDF is delivered, with matching filenames (`unit-04/source/workbook.html` beside `unit-04/workbook.pdf`), then convert by passing that saved file's path as `htmlPath` to the `html_to_pdf` tool (classroom-pdf MCP server) — never from an inline string, since the saved file is the copy every later session edits.
If the tool is unavailable on this host, still write the HTML to `source/`, deliver paste-ready HTML, and tell the user to convert in the browser (Print → Save as PDF, A4, margins off).

## House Style

<!-- not cited anywhere, remove after extended use and verifiable redundant -->
=== the printable look, held in the shells ===
Lexend body font, A4, colour-coded annotation margin, dotted write-lines, clean page breaks — carried by the `templates/documents/` shells. Keep new documents consistent with it.

# --- STEPS ---

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.
>- A step may fold in a handover doc: follow its steps as sub-steps of that master step, which handles their exits and errors; when they are done, keep going with the master step.

## +Confirm Classroom Context

Make sure a classroom project is set up here before building anything.

#### Start this step when:

Classroom work has been requested and no classroom context is confirmed for the current working directory.

#### Step finished when:

The classroom signal is confirmed present, or a classroom has just been bootstrapped here, or the user has chosen not to set one up — and in that last case nothing has been written.

#### Do this next:

With a classroom confirmed, establish who the work is for.

#### Invariants:

**DO NOT** write build or config files into a directory whose classroom context is unconfirmed.

### Confirm or Bootstrap:

Check for the `Classroom Signal` in your loaded context. If it is present, a classroom is set up here — proceed. If it is absent, do not assume the current folder is the classroom or scatter files into it: ask the user whether this working directory is the intended classroom project root (they may need to relaunch there), or whether they want to set one up here now.

#### Bootstrap a Classroom:

With their consent to set one up here confirmed, follow `references/setup.md` as a handover doc to lay down and configure the project. When its steps are done, show the user what now exists at the root, then proceed on the classroom signal now being present. If the user would rather relaunch elsewhere or not set one up, nothing is written and the run has nothing more to build.

## +Establish Learner and Intent

Identify the learner, load their configuration and course state, and settle what this run is for.

#### Start this step when:

A classroom context is confirmed and the learner, their configuration, and the run's intent are not yet established.

#### Step finished when:

The learner is identified; `global-requirements.md`, the learner's `students/` file, and any prior course state in `CLAUDE.md` have been read; and the run's intent — a new build, continuing a course, or marking completed work — is settled with the user.

#### Do this next:

For a mark-work intent, mark the completed work; for a build, gather the subject matter.

### Establish Who and What:

Identify the learner and read the relevant file(s) in the project's `students/`, the project's `global-requirements.md`, and the prior status notes in `CLAUDE.md`; search the earlier conversation for an existing course. Do not ask for anything already held in those files or the conversation. If the learner has no file yet, offer to create one under the project's `students/` using the field definitions in `references/students/_template.md` (with `references/students/example-learner.md` as a worked example of a filled profile). Settle with the user what the run is for — a new build, continuing a course, or marking completed work — so the right work follows.

## +Mark Completed Work

Grade completed work the user has supplied and get a review delivered.

#### Start this step when:

The run's intent is to mark completed work the user has supplied, and no review has yet been delivered for it.

#### Step finished when:

A review has been produced and saved for the supplied work.

#### Do this next:

Record and present the delivered review.

### Mark the Work:

Follow `references/mark-review.md` as a handover doc to grade the supplied work and produce a saved review document, then carry its saved location onward to be recorded and presented.

## +Collect Subject Matter

Gather the source material the build will draw on and save it as a durable course record.

#### Start this step when:

The run is a build and its subject matter has not been gathered.

#### Step finished when:

Material the user has supplied is saved to the course's `matter/` folder, and optional grounding research has been offered and — if taken — the chosen candidates it returned have been saved there too.

### Gather and Save the Matter:

Take in whatever subject material the user brings and save it to the course's `matter/` folder as a permanent record the later steps read. For a deep or technical subject, or when the user has little material in hand, offer grounding research — or suggest it yourself when the request warrants it. If the user agrees, invoke the `course-researcher` subagent with the subject, the learner's constraints from the student file, the family's sourcing constants from `global-requirements.md` (locale, cost rule), and any matter already supplied; it quarantines the token-heavy searching and returns a structured candidate set (unit candidates, free and purchased material). Present its candidates to the user and, against the learner's profile and the family's requirements, recommend which units and materials to include and why. Leave the final choice to the user, then save what they choose to `matter/`.

## +Align the Build

Agree the structure with the user before producing any documents.

#### Start this step when:

The subject matter is in hand and the build's structure has not been aligned with the user.

#### Step finished when:

The proposed structure has been stated and the few genuinely-undecided points — page features, how weeks cluster, delivery order — have been settled with the user.

### Align Before Building:

State the proposed structure briefly, then ask a few focused questions about anything genuinely undecided. When the user wants to follow, supplement, or avoid gaps against an existing programme, read `references/curriculum-spines.md` and factor it in. Settle this before producing documents — it prevents most rework.

## +Choose Course and Lesson Shapes

Pick the course and lesson shapes by enumerating what actually exists.

#### Start this step when:

The build is aligned and the course and lesson shapes have not been chosen.

#### Step finished when:

The governing shape(s) are chosen with the user — which shape governs which part, and how any wrapper applies — from the shapes present in the template folders.

### Enumerate and Choose:

List `templates/course-structures/` and `templates/lesson-structures/`, read each file's summary line, and present the ones that fit. Do not work from a memorised list — enumerate every time, so shapes added later are offered automatically.
Shapes are not mutually exclusive: more than one can apply to a single build (a different lesson shape for different strands — say one for literacy, another for science), and a wrapper shape (such as a timed-session template) can layer on top of a content shape rather than replacing it.
Confirm with the user which shape governs which part and how any wrapper applies.

## +Assemble a Unit's Documents

Produce one unit's documents to the governing format — the shared assembly worker, entered whenever any unit needs building.

#### Start this step when:

A unit — the sample or a subsequent one — needs its documents, they are not yet assembled to the governing format, and the unit is not left half-built by a prior failed attempt (which the error step claims first).

#### Step finished when:

The unit's documents are built from the chosen shapes, every concept's media verified or marked no-suitable-media, each document's HTML written to `source/` and converted to A4 PDF, and the result checked against the invariants.

#### Invariants:

**ALWAYS** keep the workbook and answer key as separate documents — answers never appear in the student's workbook (a tiny-font in-line answer only when a student file explicitly allows it for a young learner).

### Assemble the Documents:

List `templates/documents/` and copy the shells the deliverable calls for, filling them and inserting components from `templates/blocks/` where the lesson shape calls for them. Apply the `references/pedagogy/` file matching the learner's profile, and the learner's specifics, throughout. When a lesson includes video or other media, follow `references/media-processing.md` as a handover doc to source verified media links, then place them and its `Standing Note for a Media Library Page` into the documents.
Produce each document per the `Document Pipeline`. When updating or correcting an existing document, edit its file in `source/` and re-convert rather than rebuilding from the shell. Check the unit against the invariants before it moves on.

## +Build and Approve the Sample

Produce a sample and get its format approved before mass production.

#### Start this step when:

The shapes are chosen and, for a build larger than a single lesson, no current sample format is approved.

#### Step finished when:

The scope-and-sequence and one complete sample unit are built, and the user has explicitly approved the format.

#### Do this next:

With the format approved, build the remaining units.

### Build the Sample:

Produce the scope-and-sequence (`templates/documents/scope-and-sequence.html`) and get one complete sample unit built, then present both and get the user's explicit approval of the format. A format error is cheap to fix at unit 1 and expensive at unit 40, so do not move on without that approval. For a single-lesson build there is nothing to mass-produce: the one lesson is the deliverable.

## +Build Remaining Units

Build the rest of the course to the approved format.

#### Start this step when:

A sample format has been approved and has not since been revised, and units remain unbuilt.

#### Step finished when:

Every remaining unit has been built to the approved format.

#### Do this next:

Present and record what each response produced.

#### Invariants:

**ALWAYS** match the approved sample's lesson steps, blocks, and layout on every later unit — drift is a defect.

### Build to the Approved Format:

Get each remaining unit built, matching the approved sample exactly. A full course cannot be produced in one response — build unit by unit across responses, presenting and recording progress as you go. If the user revises the format after approving it, the approval no longer holds: return to the sample so the new format is approved before building continues.

## +Present and Record State

Save what a response produced, update the project's status, and report honestly.

#### Start this step when:

A build or mark response has produced deliverables that have not yet been saved and recorded.

#### Step finished when:

The finished files are saved to the project's working-outputs location, the `CLAUDE.md` status notes reflect what now exists and what remains, and the user has been given an honest done-and-remaining summary.

#### Invariants:

**NEVER** imply completeness that is not there — a full course is built unit by unit across responses; say plainly what remains.

### Present and Record:

Save the finished files to the working-outputs location recorded in `CLAUDE.md`, present them to the user, and keep the `CLAUDE.md` status notes current so the next session can resume. End with a short list of what is done and what remains.

## +Conclude

Report the run's outcome and end the skill.

#### Start this step when:

The run's intent is fully satisfied — a build built and recorded, work marked and presented, or a setup-only request completed — or the user has chosen to stop (declined setup, or ended the run), and nothing remains to do.

#### Step finished when:

A closing summary has been given and the skill is complete.

#### Do this next:

End the skill and return to the user.

### Report the Outcome:

Summarise what the run produced — the documents, where they were saved, the format decisions and any judgment calls made — and what a next session would pick up.

## +Handle a Problem

Surface anything the other steps don't cover, and decide with the user how to continue.

#### Start this step when:

Something has gone wrong, or a situation has arisen that no other step covers — a missing or corrupt `global-requirements.md`, a failed PDF conversion, a handover doc's work that could not complete, or requirements that contradict a build invariant.

#### Step finished when:

The user has been informed of what happened and what state the build is in, and has decided how to continue.

#### Do this next:

Resume the step the user chose, or end the skill.

### Surface the Problem:

Tell the user plainly what happened, which step it arose in, what state the build is in (especially any half-written documents or a partial course), and what the options are.

# --- TERMS ---

: **Matter**: A course's saved source material, held at `<course>/matter/` — what the user supplied and any grounding research, kept as a permanent record the build reads.
: **Shape**: A course structure or lesson structure chosen from the `templates/course-structures/` and `templates/lesson-structures/` folders; more than one may govern a single build.
: **Handover Doc**: A standalone document (in `references/`, marked `type: handover`) whose steps a master step folds into the run as sub-steps, its references and invariants coming into play for a self-contained portion of the work — lean extraction of heavy, optional, or side-branching work that would otherwise bloat this skill. The master step owns the logic around it: it reads success from the resulting state and lets any failure fall to the problem step. Cited as "follow `references/X.md` as a handover doc".
: **Sample**: The scope-and-sequence plus one complete unit, approved for format before the rest of the course is mass-produced.
: **Strand**: A learning area a unit covers — one of its subject or skill areas (literacy, science), enumerated from the unit's scope-and-sequence entry and lesson documents. A build may run a different lesson shape per strand, and a review grades the work strand by strand.
