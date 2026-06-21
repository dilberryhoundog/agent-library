---
name: classroom
description: Build tailored homeschooling lessons, unit studies, workbooks, courses and the accompanying teacher/parent materials. Use this skill whenever the user wants to create, extend, or rebuild any home-education resource. Also useful when continuing or adding to a course already built, or helping review/mark completed materials.
---

# Classroom

Build home-education materials tailored to a specific learner and the family's fixed constraints: unit studies, workbooks, answer keys, scope-and-sequence maps, parent lesson guides, certificates, and reports.

This skill is an assembler. A finished lesson combines five things: the learner's profile, the family's standing requirements, a course shape (how weeks cluster into units), a lesson shape (how one lesson runs), and a document style (the printable layout). The shapes and layouts live in this skill's `templates/` and `references/`; the family's configuration (standing requirements and learner files) lives at the **project storage root**, set up once per classroom. This file explains how to combine them; it does not hardcode the options.

## Before you build: confirm this is a classroom

A build draws on a classroom project's configuration — `global-requirements.md` and the
`students/` files at the project storage root. Before starting any build, confirm that
configuration is present:

- **If classroom signal is loaded** (A `**CLASSROOM SKILL COMPATIBLE**` signal appears in your loaded context), proceed.
- **If no classroom context is visible**, do not assume the current folder is the classroom
  and do not scatter files. Stop and ask the user: is the working directory the intended
  classroom project root (they may need to relaunch there), or would they like to set up a
  classroom here? To bootstrap one, follow `references/setup.md`. Only build once a classroom
  context exists.

## Agent Invariants

These hold on every build. If a request conflicts with one, raise the conflict with the user rather than quietly overriding it. Re-check the finished build against this list before presenting.

1. **Ensure correct spelling and page size.** Use the spelling convention and page size declared in the project's `global-requirements.md` (at the storage root) on every printable, unless a student file overrides it. Read the value — do not assume one.
2. **Workbook and answer key are separate documents.** Answers never appear in the student's workbook. A tiny-font answer beneath a question is acceptable only when a student file explicitly allows it for a young learner.
3. **Verify video links and always supply a fallback.** A dead link breaks a lesson, often on patchy signal with no quick fix. Prefer links that don't rot — a channel home page or a search-by-title URL over a hardcoded video ID — give 2–3 alternatives per concept, and confirm each with a real search before committing. Never invent a URL. Full procedure:`references/vetted-video-channels.md`.
4. **Build and approve a sample before mass production.** For anything larger than one lesson, produce the scope & sequence and one complete sample unit, then get the user's explicit approval of the format before building the rest. A format error is cheap to fix at unit 1 and expensive at unit 40.
5. **Match the approved format once set.** After approval, every later unit uses the same lesson steps, blocks, and layout. Drift is a defect.
6. **Confirm worldview and content settings per build.** A study may be requested from a specific worldview (e.g. a biblical framing) or may exclude certain framing (e.g. climate-change messaging). Read the student and global-requirements files and follow them; add no framing the user has not asked for, in either direction.
7. **State scope honestly.** A full year cannot be produced in one response. Say so, then build unit by unit. Do not imply completeness that is not there.

## How a build comes together

This is the usual shape of the work, not a fixed pipeline. Skip, repeat, or reorder phases as the request needs — forcing every request through one pipeline produces worse materials.

**Establish who and what this is for.** Identify the learner and check whether a course is already underway: read the relevant learner file(s) in the project's `students/`, read the project's `global-requirements.md`, and search prior conversations (and the `CLAUDE.md` status notes) for an existing course. Do not ask the user for information already held in those files or earlier conversations. If the learner has no file yet, offer to create one in `students/` using the field definitions in this skill's `references/students/_template.md`.

**Research the subject first (optional).** For a deep or technical subject, offer to research it before building — or suggest it yourself when the request clearly warrants grounding. If the user agrees, produce a subject foundation (field scope, key concepts, sensible sequencing, candidate-verified resources) and save it to a suitable project working location, then read it through the rest of the build so the research is done once and reused across that subject's units.

**Align before building.** State the proposed structure briefly, then ask a few focused questions about anything genuinely undecided (page features, how weeks cluster, delivery order). Do this before producing documents; it prevents most rework.

**Choose the course and lesson shapes by enumeration.** The available shapes are whatever files exist in `templates/course-structures/` and `templates/lesson-structures/`. List those directories, read each file's summary line, present the ones that fit, and build with the user's choice. Do not work from a list memorised here — enumerate every time, so shapes added later are offered automatically. Shapes are not mutually exclusive: more than one can apply to a single build — a different lesson shape for different parts of a course (e.g. one for the literacy strand, another for the science strand), and a wrapper shape (such as a timed-session template) layered on top of a content shape rather than replacing it. Confirm with the user which shape governs which part, and how any wrapper applies.

**Assemble the documents.** Copy the relevant shell from `templates/documents/` and fill it. Insert reusable components from `templates/blocks/` where the lesson shape calls for them. Apply the relevant `references/pedagogy/` file and the learner's specifics throughout.

**Verify and present.** Check the build against the Agent Invariants. Save finished files to a suitable project working location, present them, and end with a short list of what is done and what remains, so the next session can resume (keep the `CLAUDE.md` status notes current). Documents are authored as HTML; deliver each as an A4 PDF by converting with the `html_to_pdf` tool from the **classroom-pdf** MCP server. If that tool is unavailable on this host, deliver paste-ready HTML and tell the user to convert in the browser (Print → Save as PDF, A4, margins off).

**Mark and review completed work (optional).** If the user requests, review the learner's completed or annotated work. produce a review from `templates/documents/review-document.html` — per-strand gradings, evidence, strengths, and specific next-step recommendations — and save it to a suitable project working location.

## The pieces and when to read each

`references/setup.md` — first-run bootstrap for a classroom project (copy the init payload to the project root, fill the config). Read only when setting up or repairing a project, not on every build.

`global-requirements.md` _(project storage root)_ — the family's standing constants. Read at the start of every build. Lives in the project, not in this skill; it is created during setup.

`students/` _(project storage root)_ — one file per learner; the configuration layer. Read the file(s) for the learner this build serves. The field definitions live in this skill's `references/students/_template.md`; use them to add a learner file under the project's `students/`.

`references/pedagogy/` — teaching approaches. Read the file matching the learner's profile and apply it to every lesson.

`references/vetted-video-channels.md` — reliable channels and the link procedure behind Invariant 3. Read whenever a build includes video.

`references/curriculum-spines.md` — existing curricula usable as a free backbone. Read when the user wants to follow or supplement an existing programme.

`templates/course-structures/` and `templates/lesson-structures/` — the shapes of a unit study and of a single lesson. Enumerate and offer (see above).

`templates/documents/` — the printable layouts. The house style (Lexend body font, A4, colour-coded annotation margin, dotted write-lines, clean page breaks) lives in these files; keep new documents consistent with it.

`templates/blocks/` — reusable mid-lesson components. Insert into documents as needed.

When something recurs across builds, add it as a new file in the appropriate folder rather than expanding this one.

## Extending the skill

To add a course shape, lesson shape, document, or block, drop a new file into the matching `templates/` folder, starting it with a note inside a block summary.

Detect if the user is guiding the creation of a newly shaped lesson or course and offer to create the appropriate `templates/` file. Follow any existing conventions in existing template files.
