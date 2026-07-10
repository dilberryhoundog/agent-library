# Steps

A step is an **atomic, bounded, standalone unit of work** that breaks a task or outcome into a piece the agent can complete in one pass. Sized to encompass all the work the agent can manage at once; listed in the usual execution order as a reading aid, not a boundary.

A step knows nothing about any other step, except where its *do this next* guidance explicitly points. It describes the state it starts from and the state it leaves behind, in plain English and in **state terms, never step terms** ("a report has arrived", not "after the previous step"). Chaining is emergent: one step's completion state dovetails into another's start condition, and the executing agent's judgment is the router. This keeps steps light — no hand-holding narration — and keeps every routing fact in exactly one home.

Responsibility is strictly divided: **start conditions carry the routing** (a step set is correct when the start conditions cover the skill's possible states, with an error step claiming the remainder), **finished conditions carry only their own step's completion criteria**, and the optional **do this next** slot is the only place a step may name another step.

## In play

A step is **in play** from when its start condition is met until its finished condition is met. Multiple steps can be in play at once: a long-running or supervisory step (a dispatcher looping over items, a step awaiting a background agent) stays open while intermediate steps start and finish inside its span, and its invariants remain in force the whole time. Sharp conditions are what make this unambiguous — the set of in-play steps at any moment should be exactly the intended one.

## The steps preamble

Every DraftHorse document opens its steps section with the same short boilerplate, teaching the reading model to an agent that has never seen the format:

```markdown
> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.
>- A step may fold in a handover doc: follow its steps as sub-steps of that master step, which handles their exits and errors; when they are done, keep going with the master step.
```

The preamble is deliberately universal — it names no skill-specific steps, so the same text is copied verbatim into every document.

## Step anatomy

The H4 headings are the framework's machinery — the step's contract, read without engaging. The H3 opens the engagement — the work itself. Contract first, work below.

```markdown
## +Step Name

One-line statement of what this step does — the step's identity when scanning.

#### Start this step when:

The state that makes this the right work, in state terms. Excludes half-applied states.

#### Step finished when:

This step's own completion criteria — checkable and exhaustive, nothing else.

#### Do this next:

Optional prose guidance onward: the happy-path pointer, a loop back to an earlier step, a bail on failure, or the skill's exit. Omit when the dovetail is obvious.

#### Invariants:

Rules in force while the step is in play, in the bold-caps invariant form. Omit when none.

### <Heading Named for the Work>:

The engagement, written as prose. Reference pointers are cited inline at the moment they matter. Structure the work with H4 sub-headings of its own when it has distinct parts.
```

The `+` prefix marks a heading as a step node, distinguishing steps from reference and term headings. The machinery headings are fixed and self-describing; the engagement heading is the step's own — name it for the work (its generic name is Engagement).

## Conditions

Every step ends on its **step finished when** condition. The condition must be **checkable** — the agent can tell done from not-done — and **exhaustive** — it encompasses all the work ("every chosen unit released, declined, or reported nothing-to-release", not "the releases are done"). A vague condition invites premature completion; because conditions carry the routing, a weak one is the equivalent of a broken edge. A finished condition never mentions another step, narrates where the flow goes, or issues instructions — routing belongs to start conditions and *do this next*; work belongs to the engagement.

Start conditions carry a symmetric duty: they must **exclude half-applied states**. A start condition phrased only as "the prerequisite is met" still holds after the step failed partway, inviting a destructive re-run; phrase it to exclude work already partially done ("…and no part of the release has been applied yet"), handing the half-applied state to the error step.

## Do this next

The routing-hint slot, and the one sanctioned home for cross-step reference. Written as prose; not always needed — omit it when the next step's start condition picks up the completion state unaided. Its uses: highlighting the happy path, a loop instruction ("return to the first step for the next item"), the exit of a finishing step ("end the skill and return to the user"), or a bail that keeps a step from hanging on unmeetable completion conditions ("if errors are present, report them in the problem step; otherwise move on"). It points; it never restates the destination's conditions — those stay authoritative in the destination's own start condition.

## User gates

A **gate** is a step whose completion requires the user's approval of an artifact the step produced. Gates are **compound**: the finished condition is the user's approval *and* the artifact's own substantive conditions — never approval alone (a rubber-stamp must not launder a defective artifact) and never mere presentation. Presenting the artifact is part of the engagement.

Approval is state, and it is revocable: revising an approved artifact un-approves it and everything downstream of it, so the owning step's start condition holds again. Gate-shaped start conditions ("X is approved and Y has not been approved") depend on this rule.

## Exit steps and the error step

A skill ends through its **exit steps** — terminal steps whose completion ends the run. A document typically carries two:

- A **success exit** whose start condition is "all the work is finished" (stated exhaustively), and whose engagement reports the outcome.
- An **error step** whose start condition is "something has gone wrong, or a situation has arisen that no other step covers", and whose completion is "the user has been informed and has decided how to continue".

The error step is what makes coverage subtractive rather than enumerative: steps claim their conditions, and the error step claims the remainder, so no state is unhandled by construction. Its engagement should surface what happened, where it arose, what state things are now in (especially anything half-applied), and the options.

**Executor exception**: an executor document whose reporting step already surfaces failures, refusals, and no-ops may fold the error drain into that step instead of carrying a separate error step — the reporting step's start condition must then claim the remainder explicitly ("…or a failure has ended the run").

**Handover exception**: a handover document (see [handover.md](handover.md)) requires neither exit step. Its steps run as sub-steps of the master step that folded them in: control returns to the master step when no handover step is left in play, and a failure falls to the master document's problem step — so a handover needs no success exit that ends a run it does not own, and no error drain the master already provides.

## Loops

A loop is not a special structure — it is a start condition that holds again, often inside the span of a supervisory step that stays in play across the iterations. A per-item step whose start condition is "an item awaits processing" simply re-engages for each item; the success exit's start condition ("every item processed") is what ends the loop. Where the loop is worth signposting, the *do this next* slot carries the instruction.
