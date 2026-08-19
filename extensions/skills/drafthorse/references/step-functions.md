# Step Functions

The catalogue of step shapes. A step declares its function on a bolded line beneath its directive, so a reading agent knows how to interact with the step, before it reads the conditions.

```markdown
## +Build Each Unit

Build one unit's documents and return for the next.

**Looping step** — Re-runnable, taking a different branch each pass.
```

Steps can leave this blank. An undeclared step is an ordinary working step, and that is the common case.

A step declares **one** function. Fitting several functions into the step dilutes its purpose: Multiple functions in a single step is a smell.

## The directive

A step's directive is a small single line description. It is agent guidance, give them a small prompt for what their task actually is when interacting with the step.

## The functions

### Error step

`**Error step** — Handles recovery and bails.`

Claims the remainder of the document's coverage — every state no other step's start condition claims. Handles destructives and accounts for half-applied state.

Conventionally headed `+Handle a Problem`.

The prebuilt block — copy it whole into the draft. Keep the start condition generic: that claim is what makes coverage subtractive.

```markdown
## +Handle a Problem

Surface anything the other steps don't cover, and decide with the user how to continue.

**Error step** — Handles recovery and bails.

#### Start this step when these are true:

- something has gone wrong, or a situation has arisen that no other step covers

#### Step finished when these are true:

- the user has been informed of what happened and what state things are now in
- the user has decided how to continue

### Surface the Problem:

Tell the user plainly what happened, where it arose, what state things are now in (half-applied states also), and what the options are.
```

The folded variant, the **executor exception**: an executor document whose reporting step already surfaces failures, refusals, and no-ops may fold the error step's role into that step instead of carrying the standalone block. The declaration adapts its tail, an OR block in the start condition claims the ended run alongside the completed one, and the finished condition terminates on the final message.

```markdown
## +Result

Emit the run's outcomes back to the invoking agent.

**Error step** — folded into this reporting step per the executor exception, so its start condition claims the ended run alongside the completed one.

#### Start this step when these are true:

- every action in the procedure has run

**OR these are true:**

- a refusal, failure, conflict, or no-op has ended the run early

#### Step finished when these are true:

- the result lines are emitted as the final message text
- the skill is complete
```

### Looping step

`**Looping step** — Re-runnable, taking a different branch each pass.`

A loop is a start condition that holds again — a step whose condition reads "an item awaits processing" re-engages for each item, and no loop syntax exists. Declaring the function tells the reading agent to expect repeat entry rather than treating a second pass as an error. Often runs inside the span of a supervisory step that stays in play across the iterations.

One shape of the machinery — the per-item discriminator ("no verdict recorded **for it**") is the re-holding condition that is the loop, and the finished condition ends it for that item:

```markdown
## +Breaking Changes

Set the bump floor by scanning for changes that break users of the unit.

**Looping step** — Re-runnable, taking a different branch each pass.

#### Start this step when these are true:

- a chosen unit has commits in range
- no breaking-change verdict is recorded for it

#### Step finished when these are true:

- the scan has run, been skipped, or failed for the unit
- a scan that ran has its verdict, its bump floor, and any uncertain findings recorded
- a scan that was skipped or failed has that outcome and its reason recorded in place of a floor
```

### Routing step

`**Routing step** — Chooses between divergent branches.`

Its work is the choice. What it decides sends the run down paths that differ in substance.

The shape is rare — divergence usually lives in start conditions. Where the choice itself is the work, the machinery is an `#### Agent decision:` resolving to a named fact, and a finished condition that depends on that fact (placeholder text):

```markdown
## +<Step Name>

<The directive — the choice this step resolves is its work.>

**Routing step** — Chooses between divergent branches.

#### Start this step when these are true:

- <the state that opens the fork — more than one branch still possible>

#### Step finished when these are true:

- <the named fact> is recorded

#### Agent decision:

<What the choice weighs and the named fact it resolves to. "A decision was made" satisfies no finished condition — name what was decided.>
```

### Dormant step

`**Dormant step** — Skippable, activates only when its state arises.`

Covers the rare case or the branch a run did not take. Its start condition simply never activates on most runs, and a run that never enters it is a run behaving correctly.

One shape of the machinery — a start condition most runs never meet, here with an OR block naming a second activating state (trimmed to head and start conditions):

```markdown
## +Setup

Create or repair the repository's versioning config with the user.

**Dormant step** — Skippable, activates only when its state arises.

#### Start this step when these are true:

- no versioning config exists in this repository

**OR these are true:**

- a config exists
- a requested unit is not defined in it, or the requested unit's definition is wrong — its paths no longer resolve, or are not tracked by git
```

### Handover step

`**Handover step** — Manages the invocation and resolution of a handover document.`

The parent step that folds a handover's child steps into the run, owns the logic around them, and reads success from the state the handover leaves behind rather than from a handed-back outcome.

One shape of the machinery — the finished condition reads the state the handover leaves behind, never a handed-back outcome:

```markdown
## +Mark Completed Work

Grade completed work the user has supplied and get a review delivered.

**Handover step** — Manages the invocation and resolution of a handover document.

#### Start this step when these are true:

- the run's intent is to mark completed work the user has supplied

#### Step finished when these are true:

- a review has been produced for the supplied work
- its saved location is known
```

### Success step

`**Success step** — Resolves the run's done state and exits.`

Start conditions handle done state. Exits successfully and always. Its finished conditions say the run is complete.

The prebuilt block — copy it into the draft and adjust the name and conditions to the run. The start condition states the run's done state exhaustively ("every item processed, declined, or reported empty"), the finished list ends on `- the skill is complete`, and the engagement (not shown) summarises the run's outcome for the user.

```markdown
## +Conclude

End the run on a plain success and hand the conversation back.

**Success step** — Resolves the run's done state and exits.

#### Start this step when these are true:

- the report has been presented
- the run's outcome is recorded as a full success

#### Step finished when these are true:

- the user has the conversation back
- the skill is complete
```

## Declaring functions

Choose a function from the list above that best suits the shape of the step. Place the function string on the line below the directive. 
