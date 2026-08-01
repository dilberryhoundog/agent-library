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

**ALWAYS** write the document agent-agnostic: resolvable by any agent in any future session, no session-specific context, no pointers to files that will not exist where the skill is installed.
**NEVER** proceed past a gate without the user's approval of that phase's artifact.
**DO NOT** invent requirements or source material — what the user has not provided, ask for.

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
- **Steps are standalone** — a step suggests another step only in its *suggested next actions* slot; conditions are written in state terms, never step terms; finished conditions carry only their own step's completion criteria.
- **Gates are compound** — approval *and* the artifact's own substantive conditions, never approval alone; a rubber-stamp must not launder a defective artifact.
- **The error step claims the remainder** — one step whose start condition is "no other step covers this", so every state the document can reach is handled by construction (executor documents may fold the drain into their reporting step, stated in its start condition). It catches what the other steps could not know about in advance and hands control back to the user with the agent's recommendation — including half-applied state, where it reports what was and was not applied and ends the run. That is what keeps the rest of the document lean.
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
- [Condition Writing](references/condition-writing.md) — writing conditions and *suggested next actions* guidance that carry the routing.

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

## +Gather Requirements

Establish what is being built, for whom, and from what.

#### Start this step when these are true:

The skill has been invoked and the requirements are not yet established.

#### Step finished when these are true:

Purpose, mode, invocation surface, scope, destination, and the locations of all source material are established with the user — asked for, not assumed.

### Establish:

Work out with the user, from `$ARGUMENTS` and the conversation:

- **Purpose** — the one- or two-line statement of what the document is for.
- **Mode** — a new build, or a conversion of an existing document (the path to it).
- **Invocation surface** — model-invoked, user-invoked, or executor-only; this shapes the description and frontmatter.
- **Scope** — what the skill covers and what it deliberately refuses.
- **Destination** — where the finished document lives.
- **Source material** — the reference terrain: existing documents, commands, formats, examples, live state the steps will need.

## +Collect References

Harvest and classify the data the steps will operate on, and mine it for hidden work.

#### Start this step when these are true:

Requirements are established and the reference set has not been approved.

#### Step finished when these are true:

The user has approved the reference set and step-candidate list — and the set stands on its own merits: every piece of source material harvested and classified, every needed-but-missing reference recorded as a gap, every extracted candidate naming its source, and nothing procedural left unaudited inside a reference.

### Harvest and Audit:

Follow [Collecting References](references/collecting-references.md) — it carries the harvest, the classification axes, the embedded-work audit that fills the **step candidates** list, and how a needed-but-missing reference is recorded as a **gap** rather than produced here.

#### Present and Hand Over:

Present the classified reference set and the step candidates to the user. This is the hand-over point: ask for anything that seems missing, and take in whatever further material the user supplies (re-running the harvest on it).

## +Fill Reference Gaps

Produce the references that do not exist yet, so the steps have a complete set to operate on.

#### Start this step when these are true:

The reference set is approved, and a reference the document needs is recorded as an unfilled gap — however late it surfaced.

#### Step finished when these are true:

Every recorded gap exists in usable form and the reference set is complete and approved by the user.

### Produce:

Author each gap in its classified form: write and reason through dynamic command blocks (this skill authors the block, it does not execute it — sanity-check by reading, and where a command's shape is uncertain ask the user to run it and share the output), design the formats and templates the steps will emit or consume, and write any external reference files. Each produced reference keeps the moment-of-use note from its classification.

## +Map the Steps

Shape the steps from the candidates, the requirements, and the references in view.

#### Start this step when these are true:

The reference set is approved with no unfilled gaps, and no step map has been approved.

#### Step finished when these are true:

The user has approved the step map — and the map holds up on its own: every step candidate accounted for, every step atomic with one purpose, edges only at real boundaries (no over-splitting), every reference placed at a moment of use, and the success exit and error step present.

### Shape the Map:

Follow [Step Splitting](references/step-splitting.md). From the step candidates and the requirements, shape the steps: for each, a name, a one-line purpose, the references it operates on and at which moment, and its place in the flow — including loops, genuine bounded decisions, the success exit, and the error step. Weigh any candidate cluster flagged handover-shaped (and any lump the smells fit) against the handover extraction smells in that guide; where they hold, map it as a handover doc with the parent step that folds it in, and offer the extraction to the user with the map. Present the map to the user for tuning.

## +Set Invariants

Bound the document — safety floors global, step-bound rules local.

#### Start this step when these are true:

The step map is approved and no invariant set has been approved.

#### Step finished when these are true:

The user has approved the invariant set — and every invariant in it changes behaviour, sits at its correct scope, and covers each destructive or out-of-scope action the map exposes.

### Derive:

From the scope, the references, and the map: rules that must never lapse anywhere (destructive-action floors, permission walls, scope refusals) become global Agent Invariants; rules that bind only inside one step attach to that step. Prefer few and hard over many and soft — each invariant must change behaviour (`Conventions Digest`: remove no-ops). Present the set — global and per-step — to the user.

## +Draft the Skill

Write the document from the approved parts.

#### Start this step when these are true:

Invariants are approved and no complete draft exists.

#### Step finished when these are true:

The draft is written to the destination with every template placeholder resolved — no comment scaffolding remaining.

### Write:

Copy [SKILL Template](assets/SKILL-template.md) to the destination and fill it: frontmatter per the invocation surface, the purpose statement, the approved invariants, the approved references (placed inline, external, or dynamic as classified), the approved steps in map order. Write every step's conditions and *suggested next actions* guidance per [Condition Writing](references/condition-writing.md). Keep the steps preamble verbatim; keep the error step. Write each handover doc the map calls for from [HANDOVER Template](assets/HANDOVER-template.md) into the skill's root folder as `<name>-handover.md`, per the deltas in [Step Splitting](references/step-splitting.md) — `harness-format: DraftHorse, Handover` frontmatter, identity paragraph, the handover-variant preamble verbatim, no exit steps — and cite it from its parent step in the handover citation form, `[Name — Handover](name-handover.md)`.

## +Review

Walk the draft as a cold reader before the user sees it.

#### Start this step when these are true:

A complete draft exists and has not passed the scenario-walk.

#### Step finished when these are true:

Every scenario routes cleanly, every digest test passes, and the fixes are folded into the draft.

### Scenario-Walk:

Walk every realistic run of the drafted skill — the happy path, each decision branch, each loop iteration, each failure entry. At every point, check that the set of in-play steps is exactly the intended one — every state claimed by a step (or the error drain), no unintended overlap. Then sweep the `Conventions Digest` tests over the whole document. Fix what the walk finds and walk again.

#### Independent Review:

Once the walk converges — nothing left to fix — offer the user an independent spec review by the `drafthorse-saddler` agent, which audits the draft against the full framework specification from a cold session. The offer is the user's to take or decline; this walk has already caught what it can, and saddler exists to catch what a builder saturated with its own intent reads past. On approval, hand it the path to the draft; its findings fold into the draft the same way the walk's do — fix, then walk again whatever the fixes touched. When the agent is not installed, say so plainly and continue on this walk alone.

## +Deliver

Present the reviewed draft for the final gate and hand it over.

#### Start this step when these are true:

The draft has passed the scenario-walk and the user has not yet accepted it.

#### Step finished when these are true:

The user accepts the document — and it still passes the scenario-walk with their edits folded in (re-walk anything an edit touched).

#### Suggested next actions:

End the skill and return to the user.

### Present:

Show the user the draft with a short summary — the steps, the reference placements, the invariants, and any judgment calls made along the way. Iterate their edits directly into the document.

## +Handle a Problem

Surface anything the other steps don't cover, and decide with the user how to continue.

#### Start this step when these are true:

Something has gone wrong, or a situation has arisen that no other step covers — unusable source material, requirements that contradict the framework, a scenario-walk that cannot converge.

#### Step finished when these are true:

The user has been informed and has decided how to continue.

#### Suggested next actions:

Resume the phase the user chose — revising an approved artifact un-approves it and everything downstream of it, so that phase's start condition holds again — or end the build.

### Surface the Problem:

Tell the user plainly what happened, which phase it arose in, what state the build is in, and what the options are.

# --- TERMS ---

Terms used in this skill:

- **Step Candidate** — A piece of work extracted from the reference terrain or the requirements — ordered actions, conditionals, anything the agent does — awaiting shaping into a step.
- **Gap** — A reference the document needs but that does not exist yet — named and classified during collection, produced in `+Fill Reference Gaps`.
- **Mode** — Whether the build creates a new document or converts an existing one.
- **Handover Doc** — A `harness-format: DraftHorse, Handover` document in the skill's root folder, its name ending `-handover`, whose steps a parent step in the main document folds into the run as child steps — the extraction target for heavy, optional, or side-branching work.
- **Parent Step** — The step in the main document that folds a handover doc in, owns the logic around it, and reads success from the state the handover leaves behind.
