# Step Functions

The catalogue of step shapes. A step declares its function on a bolded line beneath its description, so a reading agent knows how the step behaves before it reads a condition.

```markdown
## +Build Each Unit

Builds one unit's documents and returns for the next.

**Looping step** — re-engages per unit until the chosen set is exhausted.
```

Most steps declare nothing. An undeclared step is an ordinary working step, and that is the common case.

A step declares **one** function. Several dilute the declaration: a step that looks like it carries two is a step wanting a split.

## The six functions

### Error step

Handles recovery and bails.

Claims the remainder of the document's coverage — every state no other step's start condition claims. Its engagement surfaces what happened, where it arose, what state things are in now, and what the user can do about it. Every document carries one, with two exceptions: an executor whose reporting step claims the remainder in its own start condition, and a handover, whose parent document provides it.

Conventionally headed `+Handle a Problem`.

### Looping step

Re-runs, taking a different branch each pass.

A loop is a start condition that holds again — a step whose condition reads "an item awaits processing" re-engages for each item, and no loop syntax exists. Declaring the function tells the reading agent to expect repeat entry rather than treating a second pass as an error. Often runs inside the span of a supervisory step that stays in play across the iterations.

### Routing step

Chooses between divergent branches.

Its work is the choice. What it decides sends the run down paths that differ in substance.

### Dormant step

Activates only when its state arises.

Covers the rare case or the branch a run did not take. Its start condition simply never activates on most runs, and a run that never enters it is a run behaving correctly.

### Handover step

Manages the invocation and resolution of a handover document.

The parent step that folds a handover's child steps into the run, owns the logic around them, and reads success from the state the handover leaves behind rather than from a handed-back outcome.

### Support step

Catches or manages difficulties belonging to other steps.

Takes on a named difficulty another step produces, resolves it, and leaves the run to continue. Distinct from the error step, which claims what no step named and ends the run.

## Declaring one

Name the function, then say in prose how this particular step takes that shape. The catalogue name carries the general behaviour; the prose carries what is true of this step alone.

Write the description above it with weight. It is the step's self-description to a reading agent — what the step does and how it behaves — rather than a scanning label.
