# Steps

A step is an **atomic, bounded, standalone unit of work** that breaks a task or outcome into a piece the agent can complete in one pass. Sized to encompass all the work the agent can manage at once; Steps are listed in a conceptual order, but don't have to be necessarily executed in that order, the steps conditions guide the entry and the exit of the steps.

A step knows nothing about any other step, except where its *Suggested next actions* guidance subtly points. It describes the state it starts from and the state it leaves behind, in plain English and in **state terms, never step terms** ("a report has arrived", not "after the previous step").
Chaining is emergent: a step releases on its finished condition and the next catches on its start; no interstep routing exists. This keeps steps light — no hand-holding narration — and keeps every routing fact in exactly one home.

Responsibility is strictly divided: **start conditions carry the routing** (a step set is correct when the start conditions cover the skill's possible states, with an error step claiming the remainder), and **finished conditions carry only their own step's completion criteria**.
The optional **Suggested next actions** slot is a direction finder for lost agents. A breadcrumbs feature, loosely describing next steps possibilities; it is a pointer, not the mechanism.

## In play

A step is **in play** — also known as **active** — from when its start condition activates, until its finished condition is met. As soon as the start condition is met, a step can begin, it doesn't need to wait for others to finish. This means steps can begin, while others have started but not yet completed. (eg an error step catching errors on other steps).
Multiple steps can also be in play at once: a long-running or supervisory step (a dispatcher looping over items, a step awaiting a background agent) stays open while intermediate steps start and finish inside its span, and its invariants remain in force the whole time.
Sharply written conditions are what make steps atomic and uniquely scoped.

## The steps preamble

Every DraftHorse document opens its steps section with a short boilerplate, teaching the reading model to an agent that has never seen the format. A skill, agent (or other compatible) document takes the universal preamble:

```markdown
> Steps are universal and standalone.
>
>- All their work, instructions and rules are self-contained.
>- Invoke a step any time its *start* conditions are met.
>- A step is completed only when all its *finished* conditions are met.
>- A step that cannot be completed falls to the error drain step.
>- A handover folds in as child steps of the parent step; flow control always belongs to the parent step.
>- References are inline, using Markdown link styling. Always load a cited reference.
>- Multiple active steps, looping back, and dormant steps are all valid patterns.
```

The preamble is universal in nature, so it can be copied verbatim into any skill or agent document, without needing customisation.

A handover takes the **handover-variant** preamble instead, given in [Handover](handover.md). Its reading model differs — child steps hand flow control back to the parent step, and there is no error drain to fall to — so putting the universal preamble in a handover routes a failed step to a drain that does not exist.

## Step anatomy

The H4 headings are the framework's machinery — the step's contract, read without engaging. The H3 opens the engagement — the work itself. Contract first, work below.

```markdown
## +Step Name

One-line statement of what this step does — the step's identity when scanning.

#### Start this step when these are true:

The state that makes this the right work, in state terms.

#### Step finished when these are true:

This step's own completion criteria — checkable and exhaustive.

#### Agent decision:

Optional. A choice that governs the step's scope or shape, which the agent resolves. Omit when the step's scope is fixed.

#### Suggested next actions:

Optional prose guidance onward: the happy-path pointer, a loop back to an earlier step, a bail on failure, or the skill's exit. Omit when the dovetail is obvious.

#### Step invariants:

Rules in force while the step is in play, in the bold-caps invariant form. Omit when none.

### <Heading Named for the Work>:

The engagement, written as prose. Reference pointers are cited inline at the moment they matter. Structure the work with H4 sub-headings of its own when it has distinct parts.

#### <Engagement sub heading>

Separate the engagement into distinct sections, if necessary, to help the agent differentiate varied context.
```

The `+` prefix marks a heading as a step node, distinguishing steps from reference and term headings. The machinery headings are fixed and self-describing; the engagement heading is the step's own — name it for the work (its generic name is Engagement).

## Conditions

Every step ends on its **step finished when these are true** condition. The condition must be **checkable** — the agent can tell done from not-done — and **exhaustive** — it encompasses all the work ("every chosen unit released, declined, or reported nothing-to-release", not "the releases are done").
A vague condition invites premature completion; because conditions carry the routing, a weak one is the equivalent of a broken edge.
A finished condition doesn't route. It states when the step is done, nothing more. The agent decides what to do next from other steps' *start* conditions, and the *Suggested next actions* slot.

## Agent decision

The optional slot for **run state the document could not decide in advance, resolved by the agent's judgment while the step is in play**. Two things get decided here: the step's **scope** — what it targets — and its **shape** — how it runs, including how many times and which reference it loads.

Use it where run state decides the step's extent. Example: the invocation names one item, so the step targets that item; the invocation names nothing, so the step surveys every item and asks the user which to act on. Three limits keep the slot from becoming a dumping ground:

- It carries no work — the engagement does that.
- It carries no routing between steps — start conditions do that.
- It resolves to a fact the step's own finished condition depends on.

A choice that carries work is engagement prose. A choice that routes is a start condition under the wrong heading.

An Agent decision must resolve to a **named fact**. "A decision was made" never satisfies a finished condition — name what was decided, and let the finished condition depend on that.

A genuine bounded fork inside the work — both branches the step's own business, neither changing what the step targets — stays in the engagement as plain prose.

## Suggested next actions

The routing-hint slot, and the one sanctioned home for cross-step reference. Written as prose; not always needed — omit when the next step's start condition picks up the completion state unaided.

Use when:

- Handing over control back to a parent step,
- A loop instruction ("return to the first step for the next item"),
- The exit of a finishing step ("end the skill and return to the user")
- A bail that keeps a step from hanging on unmeetable completion conditions ("if errors are present, report them in the problem step; otherwise move on").

It points; it never restates the destination's conditions — those stay authoritative in the destination's own start condition.

## User gates

A **gate** is a step whose completion requires the user's approval of an artifact the step produced. Gates are compound (see [Conventions](conventions.md)): the agent writes the artifact's own completion criteria into the step's finished conditions alongside the approval.

Approval is state, and it is revocable: revising an approved artifact un-approves it and everything downstream of it, so the owning step's start condition holds again. Gate-shaped start conditions ("X is approved and Y has not been approved") depend on this rule.

## Exit steps and the error step

A skill ends through its **exit steps** — terminal steps whose completion ends the run. A document typically carries two:

- A **success exit** whose start condition is "all the work is finished" (stated exhaustively), and whose engagement reports the outcome.
- An **error step** whose start condition is "something has gone wrong, or a situation has arisen that no other step covers", and whose completion is "the user has been informed and has decided how to continue".

The error step is what makes coverage subtractive rather than enumerative: steps claim their conditions, and the error step claims the remainder, so no state is unhandled by construction. Its engagement should surface what happened, where it arose, what state things are now in, the options available (either manual repair for a clean re-run or finish off the skill manually).

### Dispositions

The error step's engagement pairs each general error class with its disposition. **Hard exit and repair** is the default posture for destructive errors. The catalogue is open — add dispositions as they are identified.

- **Half-applied state** — step failed partway and its work is neither undone nor complete. Report the error to the user, exit the skill, advise manual fixing, and suggest an issue to inform the skill repair agent (see the *Dynamic Improvement* convention in [Conventions](conventions.md)). Never re-run the step over its own partial work.
- **Failed permissions** — a tool call, file, or service the step needs was denied. Report what was denied and what it was needed for, then stop and let the user grant access or end the run; suggest an issue to inform the skill repair agent. Never route around a denial with a different tool or path.
- **Insufficient references** — a cited reference is missing, unreadable, or doesn't cover the case at hand. Report the gap and exit; suggest an issue to inform the skill repair agent. Never invent the missing content.

<!-- PROPOSED REPLACEMENT for the whole `### Dispositions` section above. Aligns with the two-mode error step convention. Changes: the preamble's "default posture for destructive errors" scoping is dropped (three of three catalogued classes hard-bail, and none of them are destructive); the two conventions modes become the dispositions, and each class names which one it takes; "suggest an issue" is stated once instead of three times; the classes shrink to what each must report; a working step is explicitly barred from carrying a disposition of its own. Delete this comment and replace the section when approved.
-->

```md
### Dispositions

The error step's engagement pairs each error class with its disposition. Two dispositions cover every class, and every class names which one it takes. A working step carries no disposition of its own — a step that cannot finish falls here.

**Hard bail and clean up** — the state is unrecoverable inside the run: work left unfinished, something destructive, or a state the document cannot name. Clean up the mess this run made interactively with the user, after ending the skill — temporary artifacts, unstaged partial work ~~— then end the skill~~. Report what happened, where it arose, what state things are in now, and the two ways forward: repair the state and re-run for a clean pass, or finish the remaining work by hand. The cleanup never completes the run's own work, and no step re-runs over its own partial work.

**Claim the remainder** — the state is recoverable and the document names it. The error step does what the failing step could not, the run completes, and the report surfaces what went wrong.

Large dispositions can be handled with an issue raised against the skill's repository, so the gap is repaired upstream rather than worked around each run (see the *Dynamic Improvement* convention in [Conventions](conventions.md)).

The class catalogue is open — add classes as they are identified. Each names its disposition and what it must report.

- **Half-applied state** — hard bail. A step failed partway and its work is neither undone nor complete. Report which artifacts were applied and which were not, and the commands that would complete or undo them.
- **Failed permissions** — hard bail. A tool call, file, or service the step needs was denied. Report what was denied and what it was needed for. Never route around a denial with a different tool or path.
- **Insufficient references** — hard bail. A cited reference is missing, unreadable, or doesn't cover the case at hand. Report which reference fell short and how. Never invent the missing content.
- **Named recoverable failure** — claim the remainder. A failure the document describes in advance, which stops the working step but not the run. Report what failed and what the error step did in its place.
```

### Exceptions

**Executor exception**: an executor document whose reporting step already surfaces failures, refusals, and no-ops may fold the error drain into that step instead of carrying a separate error step — the reporting step's start condition must then claim the remainder explicitly ("…or a failure has ended the run").

**Handover exception**: a handover document (see [Handover](handover.md)) requires neither exit step. Its steps run as child steps of the parent step that folded them in: control returns to the parent step when no handover step is left in play, and a failure falls to the parent document's problem step — so a handover needs no success exit that ends a run it does not own, and no error drain the parent already provides.

## Step usage patterns

These are identified patterns of use that steps allow. The catalogue is open — add patterns as they are identified.

### Multiple active steps

More than one step in play at once: a supervisory step spanning the steps that run inside it, or an error step catching before its producer finishes.

### Looping back

A step that fires more than once. A loop is not a special structure — it is a start condition that holds again, often inside the span of a supervisory step that stays in play across the iterations. A per-item step whose start condition is "an item awaits processing" simply re-engages for each item; the success exit's start condition ("every item processed") is what ends the loop. Where the loop is worth signposting, the *Suggested next actions* slot carries the instruction.

### Dormant

A step that doesn't fire: its start condition never activates in a run, so it is never in play. Dormant steps cover the rare case or the branch that this run didn't take.
