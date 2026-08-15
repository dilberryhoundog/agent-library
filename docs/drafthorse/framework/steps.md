# Steps

A step is an **atomic, bounded, standalone unit of work** that breaks a task or outcome into a piece the agent can complete in one pass. Sized to encompass all the work the agent can manage at once; Steps are listed in a conceptual order, but don't have to be necessarily executed in that order, the steps conditions guide the entry and the exit of the steps.

A step knows nothing about any other step. It describes the state it starts from and the state it leaves behind, in plain English and in **state terms, never step terms** ("a report has arrived", not "after the previous step"). Chaining is emergent: a step releases on its finished condition and the next catches on its start; no interstep routing exists. This keeps steps light — no hand-holding narration — and keeps every routing fact in exactly one home.

Responsibility is strictly divided: **start conditions carry the routing** (a step set is correct when the start conditions cover the skill's possible states, with an error step claiming the remainder), and **finished conditions carry only their own step's completion criteria**.

## In play

A step is **in play** — also known as **active** — from when its start condition activates, until its finished condition is met. As soon as the start condition is met, a step can begin, it doesn't need to wait for others to finish. This means steps can begin, while others have started but not yet completed. (eg an error step catching errors on other steps). Multiple steps can also be in play at once: a long-running or supervisory step (a dispatcher looping over items, a step awaiting a background agent) stays open while intermediate steps start and finish inside its span, and its invariants remain in force the whole time. Sharply written conditions are what make steps atomic and uniquely scoped.

## The steps preamble

Every DraftHorse document opens its steps section with a short boilerplate, teaching the reading model to an agent that has never seen the format. A skill, agent (or other compatible) document takes the universal preamble:

```markdown
Steps are universal and standalone. Marked `## +<Step Name>`. Work, instructions, rules — self-contained. Invoke a step whenever its start conditions match. Step completes only when its finished conditions match. Multiple steps activate at once. Call every cited reference. References use markdown link notation.
```

The preamble is universal in nature, so it can be copied verbatim into any skill or agent document, without needing customisation.

A handover takes the **handover-variant** preamble instead, given in [Handover](handover.md). The variant points back at these same rules, then adds the facts a child step is read against: control returns to the parent step, the parent document owns error handling, and the handover's globals hold across the parent step's span. The universal preamble in a handover leaves all three unstated.

## Step anatomy

A step opens with its head — what it does and how it behaves — then its contract in H4 machinery headings, read without engaging. The H3 opens the engagement — the work itself. Head, contract, work below.

```markdown
## +Step Name

What this step does and how it behaves, told to the agent reading it.

**Step function** — describes the shape this step takes. Omit for an ordinary working step.

#### Start this step when these are true:

The state that makes this the right work, in state terms.

#### Step finished when these are true:

This step's own completion criteria — checkable and exhaustive.

#### Agent decision:

Optional. A choice that governs the step's scope or shape, which the agent resolves. Omit when the step's scope is fixed.

#### Step invariants:

Rules in force while the step is in play, in the bold-caps invariant form. Omit when none.

### <Heading Named for the Work>:

The engagement, written as prose. Reference pointers are cited inline at the moment they matter. Structure the work with H4 sub-headings of its own when it has distinct parts.

#### <Engagement sub heading>

Separate the engagement into distinct sections, if necessary, to help the agent differentiate varied context.
```

The `+` prefix marks a heading as a step node, distinguishing steps from reference and term headings. The machinery headings are fixed and self-describing; the engagement heading is the step's own — name it for the work (its generic name is Engagement).

## Step functions

A step declares its **function** on a bolded line under its description, telling a reading agent how the step behaves before it reads a condition. Most steps declare nothing — an undeclared step is an ordinary working step.

The catalogue is six shapes:

- **Error step** — handles recovery and bails.
- **Looping step** — re-runs, taking a different branch each pass.
- **Routing step** — chooses between divergent branches.
- **Dormant step** — activates only when its state arises.
- **Handover step** — manages the invocation and resolution of a handover document.
- **Support step** — catches or manages difficulties belonging to other steps.

A step declares **one** function. Several dilute the declaration and describe a step wanting a split.

Two shapes are worth stating plainly, because neither is a structure the document builds. A loop is a start condition that holds again — a per-item step whose start condition reads "an item awaits processing" re-engages for each item, and the success exit's own start condition ends the loop. A dormant step covers the rare case or the branch a run did not take; its start condition simply never activates.

## Conditions

Every step ends on its **step finished when these are true** condition. The condition must be **checkable** — the agent can tell done from not-done — and **exhaustive** — it encompasses all the work ("every chosen unit released, declined, or reported nothing-to-release", not "the releases are done"). A vague condition invites premature completion; because conditions carry the routing, a weak one is the equivalent of a broken edge. A finished condition doesn't route. It states when the step is done, nothing more. The agent decides what to do next from other steps' *start* conditions, which are the sole routing mechanism.

## Agent decision

The optional slot for **run state the document could not decide in advance, resolved by the agent's judgment while the step is in play**. Two things get decided here: the step's **scope** — what it targets — and its **shape** — how it runs, including how many times and which reference it loads.

Use it where run state decides the step's extent. Example: the invocation names one item, so the step targets that item; the invocation names nothing, so the step surveys every item and asks the user which to act on. Three limits keep the slot from becoming a dumping ground:

- It carries no work — the engagement does that.
- It carries no routing between steps — start conditions do that.
- It resolves to a fact the step's own finished condition depends on.

A choice that carries work is engagement prose. A choice that routes is a start condition under the wrong heading.

An Agent decision must resolve to a **named fact**. "A decision was made" never satisfies a finished condition — name what was decided, and let the finished condition depend on that.

A genuine bounded fork inside the work — both branches the step's own business, neither changing what the step targets — stays in the engagement as plain prose.

## User gates

A **gate** is a step whose completion requires the user's approval of an artifact the step produced. Gates are compound: the agent writes the artifact's own completion criteria into the step's finished conditions alongside the approval.

Approval is state, and it is revocable: revising an approved artifact un-approves it and everything downstream of it, so the owning step's start condition holds again. Gate-shaped start conditions ("X is approved and Y has not been approved") depend on this rule.

## Exit steps and the error step

A skill ends through its **exit steps** — terminal steps whose completion ends the run. A document typically carries two:

- A **success exit** whose start condition is "all the work is finished" (stated exhaustively), and whose engagement reports the outcome.
- An **error step** whose start condition is "something has gone wrong, or a situation has arisen that no other step covers", and whose completion is "the user has been informed and has decided how to continue".

The error step is what makes coverage subtractive rather than enumerative: steps claim their conditions, and the error step claims the remainder, so no state is unhandled by construction. Its engagement should surface what happened, where it arose, what state things are now in, the options available (either manual repair for a clean re-run or finish off the skill manually).

### Dispositions

The error step's engagement pairs each error class with its disposition. Two dispositions cover every class, and every class names which one it takes. A working step carries no disposition of its own — a step that cannot finish falls here.

**Hard bail and clean up** — the state is unrecoverable inside the run: work left unfinished, something destructive, or a state the document cannot name. Clean up the mess this run made interactively with the user, after ending the skill — temporary artifacts, unstaged partial work. Report what happened, where it arose, what state things are in now, and the two ways forward: repair the state and re-run for a clean pass, or finish the remaining work by hand. The cleanup never completes the run's own work, and no step re-runs over its own partial work.

**Claim the remainder** — the state is recoverable and the document names it. The error step does what the failing step could not, the run completes, and the report surfaces what went wrong.

Large dispositions can be handled with an issue raised against the skill's repository, so the gap is repaired upstream rather than worked around each run (see the *Dynamic Improvement* convention in [Conventions](conventions.md)).

The class catalogue is open — add classes as they are identified. Each names its disposition and what it must report.

- **Half-applied state** — hard bail. A step failed partway and its work is neither undone nor complete. Report which artifacts were applied and which were not, and the commands that would complete or undo them.
- **Failed permissions** — hard bail. A tool call, file, or service the step needs was denied. Report what was denied and what it was needed for. Never route around a denial with a different tool or path.
- **Insufficient references** — hard bail. A cited reference is missing, unreadable, or doesn't cover the case at hand. Report which reference fell short and how. Never invent the missing content.
- **Named recoverable failure** — claim the remainder. A failure the document describes in advance, which stops the working step but not the run. Report what failed and what the error step did in its place.

### Exceptions

**Executor exception**: an executor document whose reporting step already surfaces failures, refusals, and no-ops may fold the error step's role into that step instead of carrying a separate error step — the reporting step's start condition must then claim the remainder explicitly ("…or a failure has ended the run").

**Handover exception**: a handover document (see [Handover](handover.md)) requires neither exit step. Its steps run as child steps of the parent step that folded them in: control returns to the parent step when no handover step is left in play, and a failure falls to the parent document's error step — so a handover needs no success exit that ends a run it does not own, and no error step of its own, the parent's claiming the remainder already.
