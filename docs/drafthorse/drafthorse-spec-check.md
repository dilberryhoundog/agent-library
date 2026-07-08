---
description: DraftHorse framework specification checker, instructions in the DraftHorse format to check Drafthorse documents for spec compliance.
update_instructions: This document is the source of truth for checking the DraftHorse specification. It condenses the framework (docs/drafthorse/framework/) and the drafthorse skill's authoring guides into checkable tests. When the framework or the authoring guides change, update the checks here first, then regenerate the usages (mentioned below) from this document — never edit the usages directly, and never let the usages drift ahead of this file.
usages:
  - drafthorse_saddler.md - Keep preamble, replace all the remaining sections.
---

# Agent Invariants

**DO NOT** rewrite or edit the document under review. Produce findings only; the fix direction in a finding is guidance, never applied text.
**ALWAYS** cite the specific check a finding violates, by its check name from the References below.
**ALWAYS** review the whole document set — the named document plus every external reference file it cites. Findings may land on the reference files.

# --- REFERENCES ---

## Scaffold Checks

A DraftHorse document has five parts, always present, always in this order. Check order and presence:

1. **Frontmatter** — the declaration segment, above the body.
2. **Agent Invariants (global)** — rules that hold across every step; stated once, never restated per step. Every global invariant must be a rule that can never lapse (safety floor, hard prohibition, scope refusal); a rule that binds only one step belongs in that step's `#### Invariants:` instead.
3. **References** (`# --- REFERENCES ---`) — the data segment.
4. **Steps** (`# --- STEPS ---`) — the working body, opened by the verbatim steps preamble, closed by its exit steps.
5. **Terms** (`# --- TERMS ---`) — the glossary. Absent only when the document coins no terms.

## Notation Checks

Mechanical form checks — each is pass/fail by inspection:

- **Step nodes** — every step heading is H2, `+` prefixed, Title Case (`## +Step Name`).
- **Machinery headings** — `#### Start this step when:` and `#### Step finished when:` present on every step, in that order; `#### Do this next:` and `#### Invariants:` optional, in that order after them. All H4, exact wording.
- **Engagement heading** — one H3 named for the work opens each step's body, below the machinery; the work may structure itself with H4 sub-headings of its own.
- **Invariant form** — every invariant (global or step-scoped) is a bolded capitalised imperative keyword followed by its rule (`**DO NOT** …`, `**ALWAYS** …`, `**NEVER** …`; the keyword family is open). Bold-caps is the only executable marking; nothing else in the document may masquerade as one.
- **Segment dividers** — exactly `# --- REFERENCES ---`, `# --- STEPS ---`, `# --- TERMS ---`.
- **Preamble verbatim** — the steps section opens with the universal preamble, copied unchanged:

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.

- **In-block labels** — `=== Mini Heading ===` only as a lightweight label inside a block, lighter than an H4.
- **Terms form** — term entries use the `:` definition prefix and Title Case names; references entries are also Title Case.

## Frontmatter Checks

Four concerns live in frontmatter; check each against the document's role:

- **Identity** — `name` present; `description` is invocation-shaped: a model-invoked document sells its usage and states its trigger conditions to an agent; a user-invoked document carries a short human summary kept out of agent context; an executor-only document says so and warns off general usage. Wrong-audience description is a finding.
- **Invocation surface** — `disable-model-invocation` / `user-invocable` match the role. An executor document reachable sideways (model-invocable) is a defect; a front-door document the user must enter is user-invocable.
- **Permissions** — `allowed-tools` (or agent `tools`) match what the steps actually do; grants transfer to a sub-agent that invokes the document, so permissions may be delivered at the step that needs them rather than held globally. A grant no step uses is a finding.
- **Config wiring** — user configuration is resolved into the document's commands directly, so a step receives a value rather than reaching for it.

## Condition Checks

The conditions carry all the routing a wired graph would; a weak condition is a broken edge. Responsibility is strictly divided: start conditions carry the routing, finished conditions carry only their own step's completion criteria, *do this next* is the only sanctioned cross-step reference.

=== Start conditions ===

- **State terms, never step terms** — "a report has arrived", not "after the previous step". Position-phrasing breaks when a loop or repair path arrives from elsewhere.
- **De-hold** — the condition must stop holding once the step's work is done, or the step re-admits itself forever. Even a first step needs its closing clause ("…and requirements are not yet established").
- **Half-applied states excluded** — a condition that still holds after the step failed partway invites a destructive re-run; the exclusion must be explicit, handing the half-applied state to the error drain.
- **Negative space claimed** — across all steps the start conditions cover every state the document can be in; whatever no step claims must fall to the error step's remainder.
- **Loops are re-holding conditions** — a per-item step's condition simply holds again for the next item; no loop syntax exists. A loop expressed any other way is a finding.
- **In-play overlap deliberate or absent** — sharp conditions make concurrent in-play steps intended (a supervisory span, a background wait); accidental overlap is a defect.

=== Finished conditions ===

- **Checkable** — the agent can tell done from not-done by looking ("the user has responded", not "the user is satisfied").
- **Exhaustive** — encompasses all the work ("every unit released, declined, or reported nothing-to-release", not "the releases are done"). The test: could the agent claim this is met while work remains?
- **Own step only** — never mentions another step, narrates where the flow goes, or issues instructions. Routing stated in two homes drifts.
- **Gates are compound** — a step presenting an artifact for approval finishes on the approval *and* the artifact's own substantive conditions — never approval alone (a rubber-stamp must not launder a defective artifact), never mere presentation. Presenting is engagement work.
- **Approval is revocable state** — revising an approved artifact un-approves it and everything downstream, so the owning step's start condition holds again; gate-shaped start conditions ("X approved and Y not approved") depend on this and must not fight it.

=== Do this next ===

- **Point, don't restate** — names the destination or move; never repeats the destination's conditions, which stay authoritative in its own start condition.
- **Never contradict a start condition** — when the finished condition has failure outcomes, the do-next covers them or stays silent; a happy-path-only pointer that sends an ended run onward is a defect.
- **Omit when obvious** — present only for the happy-path highlight, a loop instruction, a finishing step's exit, or a bail off unmeetable conditions.

## Step-Shape Checks

- **Standalone** — a step names another step only in its *do this next* slot. The test: delete every other step — does this one still read whole?
- **Purpose line** — every step opens with a one-line statement of what it does.
- **Sized to the pass** — a step encompasses all the work the agent can manage at once. Over-splitting smell: consecutive steps whose start conditions are just "the previous step finished". Premature-closing smell: a step that finishes only so the next can start while its concern still applies — the fix is a spanning step left in play, not a merge.
- **Edges at real boundaries** — a boundary is a user-interaction wait, a loop body, a distinct completion state, a permission or context shift, a judgment shift, or a spanning concern. An edge at none of these is over-splitting.
- **Spanning steps** — a concern persisting across several pieces of work is its own step, in play while inner steps start and finish; its invariants bind for its whole open duration and are not duplicated into the inner steps.
- **Decisions** — a Decision section appears only for a genuine bounded fork that is the step's own business, in plain prose. Routing between steps written as a Decision is a defect.
- **Exit steps present** — a success exit whose start condition is the exhaustive all-done state, and an error step whose start condition is "something has gone wrong, or a situation no other step covers" and whose finish is "the user (or caller) informed and the continuation decided". The error step's engagement surfaces what happened, where, the current state (especially anything half-applied), and the options.
- **Executor exception** — an executor document may fold the error drain into its reporting step; the reporting step's start condition must then claim the remainder explicitly ("…or a failure has ended the run"). Folding without the explicit claim is a finding.

## Reference Checks

- **Data, not work** — references hold constants, maps, formats, facts; work lives in steps. Small self-contained logic is tolerable (the interpreter is an agent), but a reference with ordered actions or branching is work asking to be a step.
- **Embedded-work tells** — sweep every reference (inline and external) for: ordered actions ("first…, then…", numbered procedures, command sequences); conditionals ("if…, otherwise…", "when X, do Y"); interaction ("ask the user", "confirm before"); judgment charges ("decide whether", "verify that"). Every hit is weighed; unextracted work is the most common conversion defect. A reference that is all work has no business being a reference.
- **Inline vs external** — compact and always-relevant context inline in the References section; expansive and sometimes-relevant context in an external file loaded when a step's logic calls for it. Misplacement either way is a finding.
- **Moment-of-use citation** — a step cites a reference inside the sentence that needs it, or inside a finished condition to make it binding — never as a list at the top of a step. Each external file's citation moment must actually match what the file holds.
- **No dead weight** — a reference no step cites is dead weight; a step citing no reference may be missing its data. Flag both.
- **Installable citations** — every cited path must exist wherever the document is installed; a pointer to a repo-local or session artifact that will not ship with the document is a defect.
- **Dynamic references** — runtime-produced context (data-load commands, external skill/tool calls, sub-agents, hooks) is legitimate; check that each is invoked from a step at its moment, and that live-state commands are safe to run at load.

## Document-Wide Checks

- **Single source of truth** — every unit (invariant, step, reference, term) standalone; no meaning duplicated across units, so a change is a one-place edit. Exception: documents that never share run-time context (an orchestrator and its sub-agent) repeat deliberately — verify the repetition is that case before flagging.
- **No no-ops** — every line must change behaviour; a line the agent already obeys by default is paid-for noise. Apply to invariants especially: few and hard beats many and soft.
- **Cold-readable** — the document requires no framework knowledge to execute; the preamble is its only reading lesson. Anything that leans on DraftHorse jargon the document never defines is a finding.
- **Terms earn their place** — every term is actually leaned on by steps or references; in a multi-document set the terms keep the set speaking one vocabulary.

## Report Format

Findings only — never a rewrite. Return the report as final message text; do not write it to a file.

```
VERDICT: pass | revise

SCENARIO-WALK: <the runs walked and what happened — where routing held, where it broke>

FINDINGS:
1. [<check name>] <location: file, section heading or quoted fragment>
   Problem: <what fails the check, in one or two sentences>
   Fix direction: <what would resolve it — direction, not rewritten text>
```

Verdict rule: any scenario-walk stall or mis-route, or any finding that would cause an executing agent to misexecute (a broken edge, a launderable gate, a destructive re-run, unclaimed state), forces `revise`. Borderline findings alone permit `pass`; on a pass, list the borderline items so the requester can judge. Order findings scenario-walk breaks first, then the rest by reviewer judgment. The cost of a false pass is an agent silently misexecuting a run; the cost of a false finding is one round of revision. Prefer the finding.

# --- STEPS ---

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.

## +Assemble the Document Set

Resolve the document under review and gather everything it cites.

#### Start this step when:

A review has been requested and the document set is not yet assembled.

#### Step finished when:

The named document is read in full, every external file it cites is read or recorded as missing, and the set is confirmed to be a DraftHorse document (segment dividers present) — or the run is recorded as unable to proceed (path unresolvable, or the document is not DraftHorse-shaped).

#### Do this next:

A run that cannot proceed moves straight to composing the report.

### Gather:

Read the named document. Collect every path it cites (external references, assets, templates) and read each; a cited file that does not exist is recorded now as an `Installable citations` finding, not silently skipped. Confirm the document carries the DraftHorse segment dividers — a document without them gets a report saying it is not reviewable against this spec, not a forced audit.

## +Check the Frame

Lint the structure: scaffold order, notation form, frontmatter fit.

#### Start this step when:

The document set is assembled and the frame has not been checked.

#### Step finished when:

Every test in `Scaffold Checks`, `Notation Checks`, and `Frontmatter Checks` has been applied to the document and each failure recorded as a finding.

### Lint:

Sweep the document top to bottom against the three check groups. These are mechanical pass/fail inspections — check the preamble word for word, the machinery headings' exact text and order, the invariant form of every bold-caps token, the frontmatter fields against the document's actual role.

## +Audit the References

Judge the data segment: placement, citation, and hidden work.

#### Start this step when:

The document set is assembled and the references (inline and external) have not been audited.

#### Step finished when:

Every test in `Reference Checks` has been applied to every reference in the set — every embedded-work tell weighed, every citation's moment verified against what the cited file holds, dead weight and missing data flagged — and each failure recorded as a finding.

### Sweep the Data:

Work through the References segment entry by entry, then each external file. The embedded-work sweep is the heart of this step: hunt the tells in every piece, and weigh each hit — is this inert data an agent reads, or work an agent does? Cross-check citations both ways: from each step out to what it cites, and from each reference back to the step moments that use it.

## +Audit the Steps

Judge every step's contract and shape against the condition and step-shape checks.

#### Start this step when:

The document set is assembled and the steps have not been audited.

#### Step finished when:

Every test in `Condition Checks` and `Step-Shape Checks` has been applied to every step — including the exit steps and the error drain — and each failure recorded as a finding.

### Test Each Step:

Take the steps one at a time: purpose line, start condition (state terms, de-hold, half-applied exclusion), finished condition (checkable, exhaustive, own-step-only, compound if a gate), do-this-next (points without restating, contradicts nothing), invariants (behaviour-changing, correctly scoped), standalone test, sizing smells. Then judge the set as a whole: negative space claimed, exit steps present, error drain whole or explicitly folded, and the `Document-Wide Checks` swept over everything.

## +Walk the Scenarios

Run the document in the head: every realistic path, watching the in-play set.

#### Start this step when:

The frame, references, and steps have all been audited and no scenario-walk has been completed.

#### Step finished when:

Every realistic run is walked — the happy path, each decision branch, each loop iteration, each gate refusal and revocation, each failure entry — and at every point the set of in-play steps has been compared against the intended one, with every stall, mis-route, unclaimed state, and unintended overlap recorded as a finding.

### Walk:

Simulate executing the document cold, as an agent with no framework knowledge. At each state transition ask: which start conditions hold now, which steps are in play, is that exactly the intended set? Push on the ugly paths — a gate rejected twice, a revision after approval, a failure mid-loop, an item that fits no step. Where the walk stalls or two readings are possible, that is a finding even if every static check passed.

## +Compose the Report

Present the audit's outcome — the exit for clean runs, defective documents, and unreviewable requests alike.

#### Start this step when:

The scenario-walk is complete and all findings are recorded, or a failure (unresolvable path, a document that is not DraftHorse-shaped) has ended the run.

#### Step finished when:

A report in the `Report Format` — verdict, scenario-walk account, every recorded finding with its check name and fix direction — is returned as the final message; an ended run's report states plainly why the review could not proceed.

#### Do this next:

Finish the review and return to the caller.

### Compose:

Assemble every finding recorded across the audit steps, deduplicate (one defect, one finding — cite the single best location), order per the `Report Format` rule, choose the verdict by its rule, and return the report as message text.

# --- TERMS ---

Terms used in this checker:

: **Document Set**: The named document under review plus every external file it cites — the whole unit findings may land on.
: **Check**: A single named test from the References above; every finding cites the check it fails.
: **Finding**: One defect: its check name, its location in the set, the problem, and a fix direction — never rewritten text.
: **Error Drain**: The step (or fold into a reporting step) whose start condition claims every state no other step covers, making coverage subtractive.
: **In-Play Set**: The steps whose start conditions have held and whose finished conditions have not yet been met, at a given moment of a run.
