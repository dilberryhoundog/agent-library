# Classroom Skill — Skeleton

A skill for building home-education materials tailored to one learner: unit studies, workbooks, answer keys, scope-and-sequence maps, parent guides, and completion records. The engine (`SKILL.md` and the parts library) is independent of any particular family; everything specific to a family lives in configuration files that sit at the **project storage root**, not inside the skill, and can be swapped to serve a different one. Each section below is a seed — a purpose statement to be expanded into a working file.

The skill ships inside the **classroom plugin**, which adds the runtime around it: a bundled `classroom-pdf` MCP server (HTML→A4 PDF) with an install script, and an init payload (`templates/` at the plugin root) that is copied to a project root once to bootstrap a classroom — the static `.claude/rules/classroom.md` signal, the agent-maintained `CLAUDE.md` config, the `global-requirements.md` starter, and the `students/` folder. The plugin runtime is documented under "## Plugin runtime" below; the engine and parts library follow.

```
classroom/
├── SKILL.md
├── templates/                          parts the skill copies and fills
│   ├── documents/                      the printable layouts (A4 house style)
│   │   ├── scope-and-sequence.html
│   │   ├── parent-lesson-guide.html
│   │   ├── workbook-a4.html
│   │   ├── answer-key-a4.html
│   │   ├── certificate.html
│   │   ├── competency-report.html
│   │   └── review-document.html        (optional · post-review stage output)
│   ├── lesson-structures/              shape of a single lesson (one file each)
│   ├── course-structures/              how weeks cluster into units (one file each)
│   └── blocks/                         reusable mid-lesson components
│       ├── confidence-stars
│       ├── reflection-page
│       ├── real-world-challenge
│       ├── video-library
│       └── craft-activity
└── references/                         knowledge the skill reads
    ├── setup.md                         first-run bootstrap (read only at setup)
    ├── students/_template.md            field definitions for a learner file
    ├── pedagogy/                        teaching approaches (one per learner profile)
    ├── vetted-video-channels.md         reliable sources + link procedure
    ├── curriculum-spines.md             free curricula usable as a backbone
    └── subject-foundations/            (optional · pre-research stage output)
        └── <one file per researched subject>

<project storage root>/                 created once at setup (see Plugin runtime)
├── CLAUDE.md                            (config) agent-maintained signal/config
├── .claude/rules/classroom.md           static classroom rule (never edited)
├── global-requirements.md               (config) one family's standing constraints
└── students/                            (config) one file per learner
    └── <learner files>
```

---

## SKILL.md

The orchestrator. It holds no learner or family data itself; it reads the configuration files, selects parts from the library, and assembles a finished build. It contains the sections below.

### Overview

States what the skill produces and the one idea that drives it: a build is an assembly of five inputs — the learner's profile, the family's standing requirements, a course shape, a lesson shape, and a document style. Names where each input comes from. Family-agnostic; written to be understood by a reader with no prior context.

### Invariants

The constraints that hold on every build. If a request conflicts with one, the build surfaces the conflict rather than silently overriding it, and the finished build is checked against the list before delivery. Seed set:

1. Use the spelling and page size declared in `global-requirements.md` on every printable (currently Australian English, A4).
2. The student workbook and the answer key are always separate documents; answers never sit in the workbook.
3. Verify every video link with a real search before committing it, prefer links that do not rot (channel page or search-by-title over a hardcoded video ID), and give two to three alternatives per concept. Never invent a URL.
4. For anything larger than one lesson, build the scope & sequence and one complete sample unit, and get explicit approval of the format before producing the rest.
5. Once a format is approved, every later unit matches it exactly — same steps, blocks, layout.
6. Confirm the worldview and content settings per build from the learner and family config, and add no framing the user has not asked for.
7. State scope honestly: a full year is built unit by unit, never implied complete in one pass.

### Build pipeline

The usual order of work, to be followed flexibly rather than as a rigid sequence. Each stage names what it takes in and what it produces.

- **(optional) Research** — in: subject + learner profile. out: a subject foundation (field scope, key concepts, sequencing options, candidate verified resources) saved to `references/subject-foundations/`. Run when a subject needs grounding before building; the build then reads the foundation.
- **Recover context** — in: who the build is for. out: the loaded learner file(s), `global-requirements.md`, and any existing course found in prior conversations. No re-asking for information already held.
- **Align** — in: the loaded context. out: a brief proposed structure plus a few focused questions on anything genuinely undecided, settled before any document is produced.
- **Choose shapes** — in: the request. out: a course shape and a lesson shape, chosen by enumerating `course-structures/` and `lesson-structures/`, reading each file's summary line, and offering the fits — never from a list memorised here.
- **Assemble** — in: the chosen shapes + config. out: the filled documents, built from `documents/` shells with `blocks/` inserted and the relevant `pedagogy/` applied throughout.
- **Verify & present** — in: the built documents. out: files checked against the Invariants, saved, presented, with a short done / remaining recap.
- **(optional) Review** — in: completed/annotated student work + the unit. out: a review document (per-strand gradings, evidence, recommendations) emitted from `documents/review-document.html`. Run after a unit is handed in.

### Component map

A one-line pointer to each library and config file with the trigger for reading it (e.g. read `vetted-video-channels.md` whenever a build includes video; read the matching `pedagogy/` file for the learner's profile). This is the only place that records reading order; the files themselves do not instruct when to read them.

### Configuration

The parameters that change from build to build, and where they are set: the learner (a `students/` file), the subject, total duration, lesson length and cadence, how weeks cluster (the course shape), worldview and excluded content, resources the family already owns, and whether an existing spine is used. Family constants come from `global-requirements.md`; learner specifics from the student file. Swapping these files retargets the skill without touching the engine.

### Extending

How the skill grows. Adding a course shape, lesson shape, document, or block is just dropping a new file into the matching folder; the enumerate-and-offer step picks it up with no edit here. The Research and Review stages are built into the pipeline as optional stages, so no separate extension mechanism is needed.

---

## templates/

The parts the skill copies and fills. Nothing here is read for instruction at run time except the structure files' summary lines; these are raw material for the finished build.

### templates/documents/

The printable layouts, all sharing one A4 house style (a readable body font such as Lexend, A4 dimensions, a colour-coded outer annotation margin for Apple Pencil use, dotted write-lines, large labelled drawing boxes, checkbox/circle answers, and clean page breaks). New documents stay consistent with that style.

**`scope-and-sequence.html`** — the map of the whole study: every unit, its weeks, the concept cluster covered, and key activities. Built and approved first, before mass production.

**`parent-lesson-guide.html`** — how to run each week: prep, supplies, timing, what to watch for, and where the answers are. The open-and-go companion to the workbook.

**`workbook-a4.html`** — what the learner works in. The flagship layout; one filled lesson per the chosen lesson shape, repeated. Holds no answers.

**`answer-key-a4.html`** — parent-only, a separate document, numbered to match the workbook exactly, with worked solutions for procedural questions and notes on where open-ended answers earn full marks.

**`certificate.html`** — a completion certificate awarded at the end of a course or unit.

**`competency-report.html`** — an end-of-course summary of what the learner can now do, by strand, with a level and comment; a records-friendly snapshot.

**`review-document.html`** *(optional · post-review stage)* — the richer graded review emitted by the Review stage: per-strand gradings, evidence, strengths, and specific next-step recommendations.

### templates/lesson-structures/

The shape of a single lesson — one file per shape, each opening with a one-line summary so the engine can enumerate and offer it. Seed shape: a five-step lesson (short video first, then a visual worked example before any reading, guided skeleton notes, varied-format practice with a working space, and a confidence / reflection close), with optional per-lesson add-ons such as a real-world challenge or a craft activity.

### templates/course-structures/

How weeks cluster into units — one file per shape, each opening with a one-line summary for enumeration. Seed shapes: themes-plus-capstone (fixed week-blocks per topic, ending in one larger project), spiral units (short concept-cluster units that deliberately revisit earlier skills in new contexts), and spine-plus-companion (a free existing curriculum as backbone with a custom companion filling its gaps).

### templates/blocks/

Reusable components that recur inside lessons regardless of subject, dropped into documents where a lesson shape calls for them.

**`confidence-stars`** — a low-stakes 1–5 self-rating closing each lesson.

**`reflection-page`** — an end-of-unit page of skeleton prompts (understand now / still tricky / a question I have / how I learn best) that gives the learner ownership and shows the parent where to slow down.

**`real-world-challenge`** — a boxed task applying the lesson's concept to daily life, the hands-on bridge from page to world.

**`video-library`** — a card grid of vetted video links following the link procedure, with a standing note that a moved link is found by channel + title.

**`craft-activity`** — a make-something block with an embedded materials list and single-step instructions.

---

## references/

Knowledge the skill reads. The family's configuration no longer lives here — it sits at the project storage root (see "## Plugin runtime"). These files are generic engine knowledge.

### references/setup.md

First-run bootstrap for a classroom project: confirm the working directory, copy the plugin's init payload to the project root, fill `CLAUDE.md` and `global-requirements.md`, optionally warm the PDF engine. Read only at setup or repair, never on a normal build, so it does not sit in always-on context.

### references/students/_template.md

Defines a learner file's fields (identity, learning profile and what helps it stick, interests and hooks, current levels and goals, format preferences, worldview/content settings, resources on hand, prior-build history). The skill reads it to know the shape when creating a learner file; the resulting learner instances live at the project storage root under `students/`, not here.

### references/pedagogy/

Teaching approaches — one file per learner profile, applied to every lesson for a matching learner. Seed profile: dyslexic + kinetic learners (scaffold patchy foundations, multi-sensory spiral repetition, visual before verbal, reduced text load, varied question formats, hands-on manipulatives, structured note-taking, and emotional scaffolding).

### references/vetted-video-channels.md

Channels known to be reliable, grouped by area, plus the full link-handling procedure behind Invariant 3 and guidance for lessons where no good video exists. Read whenever a build includes video.

### references/curriculum-spines.md

Existing curricula that can serve as a free backbone, with a custom companion built on top to fill gaps for the learner. Records, per spine, what it covers, whether it is free, its lesson format, and what the companion typically adds. Read when the user wants to follow or supplement an existing programme.

### references/subject-foundations/  *(optional · pre-research stage)*

Where the optional Research stage saves its output — one file per researched subject, holding the field scope, key concepts, sequencing options, and candidate verified resources. The build reads the matching foundation so research is done once per subject and reused across that subject's units.

---

## Plugin runtime

The skill is distributed as the **classroom plugin**, which wraps the engine in everything needed to run inside a project folder in Claude Code or cowork. These files live at the plugin root, alongside the symlinked skill — not inside the skill.

### classroom-pdf MCP server  (`mcp/`, `.mcp.json`)

A minimal, dependency-light MCP server exposing one tool, `html_to_pdf`, which renders a finished HTML document to a faithful A4 PDF with headless Chromium. It speaks newline-delimited JSON-RPC over stdio with no SDK dependency; Puppeteer is its only runtime dependency and is loaded lazily from the plugin's persistent data directory, self-healing (running the install script) if absent. This makes the always-available PDF path automated, replacing the old per-host capability probe.

### install script  (`scripts/install-deps.sh`)

Installs Puppeteer + Chromium into `${CLAUDE_PLUGIN_DATA}` (persisting across plugin updates). Idempotent via a manifest diff: it runs only on first use or when the bundled dependency changes. Safe to call on every session and as the server's self-heal.

### init payload  (`templates/` at the plugin root)

The project scaffold, copied wholesale to a project root once to bootstrap a classroom (see `references/setup.md`). It contains the project's configuration and signal files — distinct from the skill's internal `templates/` of document/lesson/course parts:

- **`CLAUDE.md`** — the agent-maintained, all-in-one signal/config for the project: storage map, learner roster, working-outputs location, PDF note, status/resume log. Auto-loads every session; the agent keeps it current.
- **`.claude/rules/classroom.md`** — the static classroom rule: identifies the project as a classroom and names the skill and the PDF tool. Auto-loads every session; never edited.
- **`global-requirements.md`** *(config)* — the family's standing constraints starter (setting and practical limits, spelling and page size, cost rules, the separate-answer-key rule, the annotation workflow, worldview defaults, the standard deliverable set, shared learning preferences). The family fills it in; swap it to serve a different family.
- **`students/`** *(config)* — the per-learner configuration layer at the storage root; one file per learner, created from the skill's `references/students/_template.md`.

The split is deliberate: static classroom context lives in the rule, the mutable resolved config lives in `CLAUDE.md`, both auto-load, and the verbose setup detail stays one hop away in `references/setup.md`.
