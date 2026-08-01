---
harness-format: DraftHorse
name: classroom
description: Build tailored homeschooling lessons, unit studies, workbooks, courses and the accompanying teacher/parent materials. Use this skill whenever the user wants to create, extend, or rebuild any home-education resource. Also useful when continuing or adding to a course already built, or helping review/mark completed materials.
allowed-tools: Task, Read, Write, Edit, Glob, WebSearch, WebFetch, Bash(cp:*), Bash(bash:*), mcp__plugin_classroom_classroom-pdf__html_to_pdf
---

# Classroom

Assemble home-education materials tailored to a specific learner and the family's fixed constraints: unit studies, workbooks, answer keys, scope-and-sequence maps, parent lesson guides, certificates, and reviews. A finished lesson combines five things — the learner's profile, the family's standing requirements, a course shape, a lesson shape, and a document style — drawn from this skill's `templates/` and `references/` and from the family's configuration at the project storage root.

# Agent Invariants

**ALWAYS** use the spelling convention and page size declared in `global-requirements.md` (or a student-file override) on every printable — read the value.
**NEVER** add or strip worldview or content framing the user has not asked for — read the student and `global-requirements.md` files and follow them, in both directions.

# --- REFERENCES ---

## Storage Model

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

=== print base ===
The `html_to_pdf` tool injects all page geometry — sheet size, per-sheet margins, page breaks, full-bleed pages — from its own `print-base.css`. Documents carry identity only (colour, type, components) and inherit paging for free.

=== print classes ===

- `block` — on a component that must not split across a page break (a card, a call-out, a question).
- `bleed` — on a page that reaches the paper's edge (a cover, a certificate); capped at one sheet, so it cannot spill a near-empty page carrying its background.
- `annotated` — on a content page wanting the Apple-Pencil annotation band down its outer edge; the band repeats onto continuation sheets and never lands on a cover.

=== overides ===
A document whose geometry must genuinely differ overrides the base — its own rules win because the base is injected first. The available overrides:

| Override             | Effect                                     | How                                                                                                                                            |
|----------------------|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Own `@page`          | This document's sheet size and margins     | Declare `@page { … }` in the document. `templates/documents/certificate.html` is the worked example: `@page { size: A4 landscape; margin: 0 }` |
| `@page annotated`    | The annotation band's sheet margins        | Declare `@page annotated { margin: … }`. Move it together with `--annotation-width` — the strip width and its margin are a pair                |
| `--annotation-width` | The band's strip width (default `34mm`)    | Set on `:root` in the document                                                                                                                 |
| `--annotation-tint`  | The band's wash colour (default `#fffdf2`) | Set on `:root` in the document                                                                                                                 |

Inline SVG diagrams clip at the `viewBox` edge — leave room inside the box for anything drawn or labelled near it.

=== the conversion report ===
Every conversion returns a report with these fields:

- **Print mode** — `standard` when the document inherits the Page Geometry, `customised` when its own `@page` overrides the base (the report also names which properties it overrode).
- **Sheets** — the PDF's page count. The shells lay out one sheet per `.page` box (a `.bleed` is one full-bleed sheet), so a document's intended count is the number of those boxes; a report showing more means content overflowed onto an extra sheet — the failure that is invisible in the HTML.
- **Content box** — the usable area per sheet in the Page Geometry (present in `standard` mode), so how many cards or questions fit is arithmetic rather than trial and error.
- **Flags** — layout facts to weigh: a near-empty or sparse sheet, one whose size is not the expected one, an element wider than the content box (named by its selector, to find in source), or an SVG drawing outside its `viewBox`.

## House Style

=== the printable look, held in the shells ===
Lexend body font, A4, colour-coded annotation margin, dotted write-lines, clean page breaks — carried by the `templates/documents/` shells. Keep new documents consistent with it.

# --- STEPS ---

> Steps are universal and standalone.
>
>- All their work, instructions and rules are self-contained.
>- Invoke a step any time its *start* conditions are met.
>- A step is completed only when all its *finished* conditions are met.
>- A step that cannot be completed falls to the error drain step.
>- A handover folds in as child steps of the parent step; flow control always belongs to the parent step.
>- References are inline, using Markdown link styling. Always load a cited reference.
>- Multiple active steps, looping back, and dormant steps are all valid patterns.

## +Confirm Classroom Context

Make sure a classroom project is set up here before building anything.

#### Start this step when these are true:

Classroom work has been requested and no classroom context is confirmed for the current working directory.

#### Step finished when these are true:

The classroom signal is confirmed present, or a classroom has just been bootstrapped here, or the user has chosen not to set one up — and in that last case nothing has been written.

#### Suggested next actions:

With a classroom confirmed, establish who the work is for; where the user declined to set one up, conclude the run.

#### Step invariants:

**DO NOT** write into a directory whose classroom context is neither confirmed nor being bootstrapped with the user's consent.

### Confirm or Bootstrap:

Check for the [Classroom Signal](#classroom-signal) in your loaded context. If it is present, a classroom is set up here — proceed. If it is absent, ask the user whether this working directory is the intended classroom project root (they may need to relaunch there), or whether they want to set one up here now.

#### Bootstrap a Classroom:

With their consent to set one up here confirmed, follow [Classroom Setup — Handover](setup-handover.md) to lay down and configure the project. When its steps are done, show the user what now exists at the root, then proceed on the classroom signal now being present. If the user would rather relaunch elsewhere or not set one up, nothing is written and the run has nothing more to build.

## +Establish Learner and Intent

Identify the learner, load their configuration and course state, and settle what this run is for.

#### Start this step when these are true:

A classroom context is confirmed and the learner, their configuration, and the run's intent are not yet established.

#### Step finished when these are true:

The learner is identified; `global-requirements.md`, the learner's `students/` file, and any prior course state in `CLAUDE.md` have been read; and the run's intent — a new build, continuing a course, or marking completed work — is settled with the user.

#### Suggested next actions:

For a mark-work intent, mark the completed work; for a build, gather the subject matter.

### Establish Who and What:

Read the [Storage Model](#storage-model) for where each piece lives. Identify the learner and read the relevant file(s) in the project's `students/`, the project's `global-requirements.md`, and the prior status notes in `CLAUDE.md`; search the earlier conversation for an existing course. Do not ask for anything already held in those files or the conversation. If the learner has no file yet, offer to create one under the project's `students/` using the field definitions in [Template](references/students/_template.md) (with [Example Learner](references/students/example-learner.md) as a worked example of a filled profile). Settle with the user what the run is for — a new build, continuing a course, or marking completed work — so the right work follows.

## +Mark Completed Work

Grade completed work the user has supplied and get a review delivered.

#### Start this step when these are true:

The run's intent is to mark completed work the user has supplied, and no review has yet been delivered for it.

#### Step finished when these are true:

A review has been produced for the supplied work and its saved location is known.

#### Suggested next actions:

Record and present the delivered review.

### Mark the Work:

Follow [Mark and Review — Handover](mark-review-handover.md) to grade the supplied work and produce a saved review document, then carry its saved location onward to be recorded and presented.

## +Collect Subject Matter

Gather the source material the build will draw on and save it as a durable course record.

#### Start this step when these are true:

The run is a build and its subject matter has not been gathered.

#### Step finished when these are true:

Material the user has supplied is saved to the course's `matter/` folder, and optional grounding research has been offered and — if taken — the chosen candidates it returned have been saved there too.

### Gather and Save the Matter:

Take in whatever subject material the user brings and save it to the course's `matter/` folder as a permanent record the later steps read. For a deep or technical subject, or when the user has little material in hand, offer grounding research — or suggest it yourself when the request warrants it. If the user agrees, invoke the `course-researcher` subagent with the subject, the learner's constraints from the student file, the family's sourcing constants from `global-requirements.md` (locale, cost rule), and any matter already supplied; it quarantines the token-heavy searching and returns a structured candidate set (unit candidates, free and purchased material). Present its candidates to the user and, against the learner's profile and the family's requirements, recommend which units and materials to include and why. Leave the final choice to the user, then save what they choose to `matter/`.

## +Align the Build

Agree the structure with the user before producing any documents.

#### Start this step when these are true:

The subject matter is in hand and the build's structure has not been aligned with the user.

#### Step finished when these are true:

The proposed structure has been stated and the few genuinely-undecided points — page features, how weeks cluster, delivery order — have been settled with the user.

### Align Before Building:

State the proposed structure briefly, then ask a few focused questions about anything genuinely undecided. When the user wants to follow, supplement, or avoid gaps against an existing programme, read [Curriculum Spines](references/curriculum-spines.md) and factor it in. Settle this before producing documents — it prevents most rework.

## +Choose Course and Lesson Shapes

Pick the course and lesson shapes by enumerating what actually exists.

#### Start this step when these are true:

The build is aligned and the course and lesson shapes have not been chosen.

#### Step finished when these are true:

The governing shape(s) are chosen with the user — which shape governs which part, and how any wrapper applies — from the shapes present in the template folders.

### Enumerate and Choose:

List [Course Structures](templates/course-structures/) and [Lesson Structures](templates/lesson-structures/), read each file's summary line, and present the ones that fit. Do not work from a memorised list — enumerate every time, so shapes added later are offered automatically.
Shapes are not mutually exclusive: more than one can apply to a single build (a different lesson shape for different strands — say one for literacy, another for science), and a wrapper shape (such as a timed-session template) can layer on top of a content shape rather than replacing it.
Confirm with the user which shape governs which part and how any wrapper applies.

## +Assemble a Unit's Documents

Produce one unit's documents to the governing format — the shared assembly worker, entered whenever any unit needs building.

#### Start this step when these are true:

A unit — the sample or a subsequent one — needs its documents and they are not yet assembled to the governing format.

#### Step finished when these are true:

The unit's documents are built from the chosen shapes, every concept's media verified or marked no-suitable-media, each document's HTML written to `source/` and delivered — either converted to A4 PDF whose conversion report matches the document's intent (sheet count equal to the source's `.page`/`.bleed` boxes, print mode as expected — `standard` unless the document declares its own `@page` — and no unresolved layout flags), or handed over as a print-ready standalone where the renderer cannot run — and the result satisfies the invariants.

#### Step invariants:

**ALWAYS** keep the workbook and answer key as separate documents — answers never appear in the student's workbook (a tiny-font in-line answer only when a student file explicitly allows it for a young learner).

### Assemble the Documents:

List [Documents](templates/documents/) and copy the shells the deliverable calls for, filling them to the [House Style](#house-style) and inserting components from [Blocks](templates/blocks/) where the lesson shape calls for them, sizing each page's content to the usable content box the conversion report states rather than by trial and error. Apply the [Pedagogy](references/pedagogy/) file matching the learner's profile, and the learner's specifics, throughout. When a lesson includes video or other media, follow [Media Processing — Handover](media-processing-handover.md) to source verified media links, then place them and its `Standing Note for a Media Library Page` into the documents.
Produce each document per the `Document Pipeline`. When updating or correcting an existing document, edit its file in `source/` and re-convert rather than rebuilding from the shell. Check the unit against the invariants before it moves on.

## +Deliver Without the Renderer

Deliver a finished document as a print-ready file when the PDF renderer cannot run on this host.

#### Start this step when these are true:

A document's HTML is written to `source/`, the `html_to_pdf` tool is unavailable on this host (absent, or unable to bring up its engine), and the document has no current fallback delivery — none produced yet, or its `source/` HTML has changed since the last standalone was written.

#### Step finished when these are true:

The document has been delivered as a self-contained, print-ready standalone — the injected geometry inlined into a delivery copy, the `source/` HTML left untouched — and the user has been told how to produce the A4 PDF from it.

#### Suggested next actions:

With the document delivered by hand, carry on with the remaining documents, or record what the response produced.

### Deliver by Hand:

Follow [Deliver Without the Renderer — Handover](deliver-without-renderer-handover.md) to inline the geometry base into a print-ready standalone and hand it to the user, leaving the `source/` file as the editable copy for when the renderer returns.

## +Build and Approve the Sample

Produce a sample and get its format approved before mass production.

#### Start this step when these are true:

The shapes are chosen, the build is larger than a single lesson, and no current sample format is approved.

#### Step finished when these are true:

The scope-and-sequence and one complete sample unit are built — each conversion report matching intent (sheet count equal to the source's `.page`/`.bleed` boxes, print mode as expected, no unresolved layout flags) — and the user has explicitly approved the format.

#### Suggested next actions:

With the format approved, build the remaining units.

### Build the Sample:

Produce the scope-and-sequence from [Scope And Sequence](templates/documents/scope-and-sequence.html) and get one complete sample unit built, then present both and get the user's explicit approval of the format.

## +Build Remaining Units

Build the rest of the course to the approved format.

#### Start this step when these are true:

A sample format has been approved and has not since been revised, and units remain unbuilt.

#### Step finished when these are true:

Every remaining unit has been built to the approved format.

#### Suggested next actions:

Present and record what each response produced.

#### Step invariants:

**ALWAYS** match the approved sample's lesson steps, blocks, and layout on every later unit — drift is a defect.

### Build to the Approved Format:

Get each remaining unit built, matching the approved sample exactly. A full course cannot be produced in one response — build unit by unit across responses, presenting and recording progress as you go. A format the user revises after approving it is no longer an approved format.

## +Present and Record State

Save what a response produced, update the project's status, and report honestly.

#### Start this step when these are true:

A build or mark response has produced deliverables that are not yet recorded in the `CLAUDE.md` status notes and presented to the user.

#### Step finished when these are true:

The finished files are saved to the project's working-outputs location, the `CLAUDE.md` status notes reflect what now exists and what remains, and the user has been given an honest done-and-remaining summary.

#### Step invariants:

**NEVER** imply completeness that is not there — a full course is built unit by unit across responses; say plainly what remains.

### Present and Record:

Save the finished files to the working-outputs location recorded in `CLAUDE.md`, present them to the user, and keep the `CLAUDE.md` status notes current so the next session can resume. End with a short list of what is done and what remains.

## +Conclude

Report the run's outcome and end the skill.

#### Start this step when these are true:

The run's intent is fully satisfied — a build built and recorded, work marked and presented, or a setup-only request completed — or the user has chosen to stop (declined setup, or ended the run), and nothing remains to do.

#### Step finished when these are true:

A closing summary has been given and the skill is complete.

#### Suggested next actions:

End the skill and return to the user.

### Report the Outcome:

Summarise what the run produced — the documents, where they were saved, the format decisions and any judgment calls made — and what a next session would pick up.

## +Handle a Problem

Surface anything the other steps don't cover, and decide with the user how to continue.

#### Start this step when these are true:

Something has gone wrong, or a situation has arisen that no other step covers — a missing or corrupt `global-requirements.md`, a failed PDF conversion, a handover doc's work that could not complete, or requirements that contradict a build invariant.

#### Step finished when these are true:

The user has been informed of what happened and what state the build is in, and has decided how to continue.

#### Suggested next actions:

Resume the step the user chose, or end the skill.

### Surface the Problem:

Tell the user plainly what happened, which step it arose in, what state the build is in (especially any half-written documents or a partial course), and what the options are.

# --- TERMS ---

- **Matter** — A course's saved source material, held at `<course>/matter/` — what the user supplied and any grounding research, kept as a permanent record the build reads.
- **Shape** — A course structure or lesson structure chosen from the `templates/course-structures/` and `templates/lesson-structures/` folders; more than one may govern a single build.
- **Page Geometry** — The CSS print geometry the `html_to_pdf` tool injects from `print-base.css`. The base every document inherits unless it declares its own `@page` to override it.
- **Handover Doc** — A standalone document in this skill's root folder, its name ending `-handover` and its frontmatter the single line `harness-format: DraftHorse, Handover`, whose steps a parent step folds into the run as child steps, its references and invariants coming into play for a self-contained portion of the work — lean extraction of heavy, optional, or side-branching work that would otherwise bloat this skill. The parent step owns the logic around it: it reads success from the resulting state and lets any failure fall to the problem step. Cited as `[Name — Handover](name-handover.md)`.
- **Sample** — The scope-and-sequence plus one complete unit, approved for format before the rest of the course is mass-produced.
- **Strand** — A learning area a unit covers — one of its subject or skill areas (literacy, science), enumerated from the unit's scope-and-sequence entry and lesson documents. A build may run a different lesson shape per strand, and a review grades the work strand by strand.
