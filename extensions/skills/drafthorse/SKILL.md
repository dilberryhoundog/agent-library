---
harness-format: DraftHorse
name: drafthorse
display-name: DraftHorse
description: Build a new skill — or convert an existing document — using the DraftHorse framework, through gated phases of references, step map, invariants, and draft.
disable-model-invocation: true
argument-hint: [ skill purpose, or path to a document to convert ]
allowed-tools: Read, Write, Edit, Agent(drafthorse-saddler)
---

# DraftHorse

Build a DraftHorse document: a SKILL.md (or kindred agent document) whose work is broken into standalone steps, each declaring in plain English when it starts and when it is finished, so any agent can execute it cold. This skill walks the build in a deliberate order — references before steps, because steps operate on references — with a user gate at each phase.

# Agent Invariants

**ALWAYS** write the document agent-agnostic: resolvable by any agent in any future session, no session-specific context, no pointers to files that will not exist where the skill is installed. **NEVER** proceed past a gate without the user's approval of that phase's artifact. **DO NOT** invent requirements or source material — what the user has not provided, ask for.

# --- REFERENCES ---

## The Scaffold

Every DraftHorse document has five utilities, in this order:

1. **Frontmatter** — identity (`name`, `description`), invocation surface (`disable-model-invocation`, `user-invocable`), permissions (`allowed-tools`, which transfer to a sub-agent that invokes the skill).
2. **Agent Invariants (global)** — rules that hold across every step, stated once.
3. **References** — the data utility: constants, maps, formats, live-state commands. Data by preference, no work. Inline entries may use the lightweight `=== label ===` form to mark sub-blocks.
4. **Steps** — the working body, opened by the universal steps preamble; standalone steps (contract in H4s, engagement under an H3), closed by a success exit and an error step.
5. **Terms** — the glossary, `- **Term** — meaning` form. Delete when empty.

One variant reuses the whole scaffold: a **handover doc** — a file in the skill's root folder, its name ending `-handover`, whose frontmatter is the single line `harness-format: DraftHorse, Handover`, holding heavy or occasional step-shaped work that a parent step in the main document folds in at its moment of use. The stamp, the `-handover` suffix, and the root location are three agreeing signals. Its deltas from a skill (bare frontmatter, identity paragraph, handover-variant preamble, no exit steps, grants from the parent) are catalogued in [Step Splitting](references/step-splitting.md).

## The Template

[SKILL Template](assets/SKILL-template.md) is the fill-in skeleton for the draft — the scaffold with every part annotated, the steps preamble baked in verbatim, and the error step shipped as real text.

## Conventions Digest

The tests a finished document must pass:

- **Checkable and exhaustive conditions** — could the agent claim a condition is met while work remains? If yes, sharpen it.
- **Steps are standalone** — a step names no other step; conditions are written in state terms, never step terms; finished conditions carry only their own step's completion criteria.
- **Every step opens with a directive** — one line naming the agent's task on entering the step, and the fixed declaration string where the step takes one of the catalogue shapes.
- **Gates are compound** — approval *and* the artifact's own substantive conditions, never approval alone; a rubber-stamp must not launder a defective artifact.
- **The run resolves** — every path ends somewhere stated, by an exit step or by the agent's own handling. The error step claims unresolvable errors, destructive actions and half-applied state.
- **References carry data, steps carry work** — conceptual guidance, not hard law; ordered actions or branching inside a reference is work asking to be a step.
- **Cite references at the moment of use** — inside the sentence that needs them, not as a list at the top of a step.
- **Inline vs external references** — compact and always-relevant context inline; expansive and sometimes-relevant context external.
- **Invocation-shaped description** — model-invoked: agent-facing triggers; user-invoked: short human summary.
- **A handover fits its parent step** — a handover doc's work sits wholly inside the parent step's start and finished criteria: the finished condition reads the state the handover leaves behind, with no handed-back outcome; a failure falls to the main document's error step.
- **Single source of truth** — one meaning, one home (documents that never share run-time context may deliberately repeat).
- **Remove no-ops** — a line the agent already obeys by default is paid-for noise.

## Authoring Guides

Phase-specific judgment, loaded by the step that needs it:

- [Collecting References](references/collecting-references.md) — harvesting sources, classifying them, and auditing for embedded work.
- [Step Splitting](references/step-splitting.md) — finding the step edges in a lump of work.
- [Condition Writing](references/condition-writing.md) — writing the conditions that carry the routing.
- [Step Functions](references/step-functions.md) — the catalogue of step shapes, and how a step declares one.

# --- STEPS ---

Steps are universal and standalone. Marked `## +<Step Name>`. Work, instructions, rules — self-contained. Invoke a step whenever its start conditions match. Step completes only when its finished conditions match. Multiple steps activate at once. Call every cited reference. References use markdown link notation.

## +Gather Requirements

Establish what is being built, for whom, and from what.

#### Start this step when these are true:

- the skill has been invoked

#### Step finished when these are true:

- the purpose is established with the user
- the mode is established — a new build, or a conversion of a named document
- the invocation surface is established — model-invoked, user-invoked, or executor-only
- the scope is established, including what the skill refuses
- the destination is established
- every piece of source material is located

### Establish:

Work out with the user, from `$ARGUMENTS` and the conversation:

- **Purpose** — the one- or two-line statement of what the document is for.
- **Mode** — a new build, or a conversion of an existing document (the path to it).
- **Invocation surface** — model-invoked, user-invoked, or executor-only; this shapes the description and frontmatter.
- **Scope** — what the skill covers and what it deliberately refuses.
- **Destination** — where the finished document lives.
- **Source material** — the reference terrain: existing documents, commands, formats, examples, live state the steps will need.

## +Collect References

Harvest and classify the source material, and mine it for hidden work.

#### Start this step when these are true:

- the requirements are established

#### Step finished when these are true:

- every piece of source material is harvested and classified
- every needed-but-missing reference is recorded as a gap
- every extracted step candidate names its source
- no reference holds unaudited procedural content
- the user has approved the reference set and the step-candidate list

### Harvest and Audit:

Follow [Collecting References](references/collecting-references.md) — it carries the harvest, the classification axes, the embedded-work audit that fills the **step candidates** list, and how a needed-but-missing reference is recorded as a **gap** rather than produced here.

#### Present and Hand Over:

Present the classified reference set and the step candidates to the user. This is the hand-over point: ask for anything that seems missing, and take in whatever further material the user supplies (re-running the harvest on it).

## +Fill Reference Gaps

Produce the references that do not exist yet.

**Dormant step** — Skippable, activates only when its state arises.

#### Start this step when these are true:

- the reference set is approved
- a reference the document needs is recorded as an unfilled gap

#### Step finished when these are true:

- every recorded gap has been accounted for and handled
- the reference set is complete
- the user has approved the completed reference set

### Produce:

Author each gap in its classified form: write and reason through dynamic command blocks (this skill authors the block, it does not execute it — sanity-check by reading, and where a command's shape is uncertain ask the user to run it and share the output), design the formats and templates the steps will emit or consume, and write any external reference files. Each produced reference keeps the moment-of-use note from its classification.

## +Map the Steps

Shape the steps from the candidates, the requirements, and the references in view.

#### Start this step when these are true:

- the reference set is complete

#### Step finished when these are true:

- every step candidate is accounted for
- every step is atomic, with one purpose
- every edge sits at a real boundary
- every reference is placed at a moment of use
- the success exit and the error step are present
- the user has approved the step map

### Shape the Map:

Follow [Step Splitting](references/step-splitting.md). From the step candidates and the requirements, shape the steps: for each, a name, a one-line purpose, the references it operates on and at which moment, and its place in the flow — including loops, genuine bounded decisions, the success exit, and the error step. Weigh any candidate cluster flagged handover-shaped (and any lump the smells fit) against the handover extraction smells in that guide; where they hold, map it as a handover doc with the parent step that folds it in, and offer the extraction to the user with the map. Present the map to the user for tuning.

## +Set Invariants

Bound the document — safety floors global, step-bound rules local.

#### Start this step when these are true:

- the step map is complete

#### Step finished when these are true:

- every invariant changes behaviour
- every invariant sits at its correct scope
- every destructive or out-of-scope action the map exposes is covered
- the user has approved the invariant set

### Derive:

From the scope, the references, and the map: rules that must never lapse anywhere (destructive-action floors, permission walls, scope refusals) become global Agent Invariants; rules that bind only inside one step attach to that step. Prefer few and hard over many and soft — each invariant must change behaviour ([Conventions Digest](#conventions-digest): remove no-ops). Present the set — global and per-step — to the user.

## +Draft the Skill

Write the document from the approved parts.

#### Start this step when these are true:

- the invariant set is complete

#### Step finished when these are true:

- the draft is written to the destination
- every template placeholder is resolved
- no comment scaffolding remains

### Write:

Copy [SKILL Template](assets/SKILL-template.md) to the destination and fill it: frontmatter per the invocation surface, the purpose statement, the approved invariants, the approved references (placed inline, external, or dynamic as classified), the approved steps in map order. Write every step's conditions per [Condition Writing](references/condition-writing.md). Open each step with its directive, and declare its function where one of the shapes in [Step Functions](references/step-functions.md) fits — copy the fixed string, one function, or none for an ordinary working step. Keep the steps preamble verbatim; keep the error step. Write each handover doc the map calls for from [HANDOVER Template](assets/HANDOVER-template.md) into the skill's root folder as `<name>-handover.md`, per the deltas in [Step Splitting](references/step-splitting.md) — `harness-format: DraftHorse, Handover` frontmatter, identity paragraph, the handover-variant preamble verbatim, no exit steps —
and cite it from its parent step in the handover citation form, `[Name — Handover](name-handover.md)`.

## +Review

Walk the draft as a cold reader before the user sees it.

#### Start this step when these are true:

- a complete draft exists

#### Step finished when these are true:

- every scenario routes cleanly
- every Conventions Digest test passes
- any approved fix the scenario-walk found is folded into the draft

### Scenario-Walk:

Walk every realistic run of the drafted skill — the happy path, each decision branch, each loop iteration, each failure entry. At every point, check that the set of in-play steps is exactly the intended one — every state claimed by a step (or the error step), no unintended overlap. Then sweep the [Conventions Digest](#conventions-digest) tests over the whole document. Fix what the walk finds and walk again.

#### Independent Review:

Once the walk converges — nothing left to fix — offer the user an independent spec review by the `drafthorse-saddler` agent, which audits the draft against the full framework specification from a cold session. The offer is the user's to take or decline; this walk has already caught what it can, and saddler exists to catch what a builder saturated with its own intent reads past. On approval, hand it the path to the draft; its findings fold into the draft the same way the walk's do — fix, then walk again whatever the fixes touched. When the agent is not installed, say so plainly and continue on this walk alone.

## +Deliver

Present the reviewed draft for the final gate and hand it over.

**Success step** — Resolves the run's done state and exits.

#### Start this step when these are true:

- the draft has passed the scenario-walk

#### Step finished when these are true:

- the user accepts the document
- the document still passes the scenario-walk with the user's edits folded in
- the build is complete

### Present:

Show the user the draft with a short summary — the steps, the reference placements, the invariants, and any judgment calls made along the way. Iterate their edits directly into the document.

## +Handle a Problem

Surface anything the other steps don't cover, and decide with the user how to continue.

**Error step** — Handles recovery and bails.

#### Start this step when these are true:

- something has failed or errored

**OR these are true:**

- a situation has arisen that no other step covers

#### Step finished when these are true:

- the user has been informed of what happened and what state the build is in
- the user has decided how to continue

### Surface the Problem:

Tell the user plainly what happened, which phase it arose in, what state the build is in, and what the options are.

Where the problem is a withdrawn approval, claim the remainder: restart from the phase the user chose and revoke every approval after it. Otherwise end the build.

# --- TERMS ---

Terms used in this skill:

- **Step Candidate** — A piece of work extracted from the reference terrain or the requirements — ordered actions, conditionals, anything the agent does — awaiting shaping into a step.
- **Gap** — A reference the document needs but that does not exist yet — named and classified during collection, produced in `+Fill Reference Gaps`.
- **Mode** — Whether the build creates a new document or converts an existing one.
- **Handover Doc** — A `harness-format: DraftHorse, Handover` document in the skill's root folder, its name ending `-handover`, whose steps a parent step in the main document folds into the run as child steps — the extraction target for heavy, optional, or side-branching work.
- **Parent Step** — The step in the main document that folds a handover doc in, owns the logic around it, and reads success from the state the handover leaves behind.
