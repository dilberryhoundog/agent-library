<!--
TODO: Improve this reference by including an example of the step machinery, that a step of a particular shape might have. 
This will take more of the guess work out of the agents process as DraftHorse steps are built. 
2 examples of this might be...
- Routing step example displays the "Agent decision" machinery with placeholder text
- Error step is prebuilt, these are mostly the same across all instances.

A good strategy to complete this todo would be to search the corpus for instances of steps taking these shapes and reverse engineer their machinery examples.
-->

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

### Looping step

`**Looping step** — Re-runnable, taking a different branch each pass.`

A loop is a start condition that holds again — a step whose condition reads "an item awaits processing" re-engages for each item, and no loop syntax exists. Declaring the function tells the reading agent to expect repeat entry rather than treating a second pass as an error. Often runs inside the span of a supervisory step that stays in play across the iterations.

### Routing step

`**Routing step** — Chooses between divergent branches.`

Its work is the choice. What it decides sends the run down paths that differ in substance.

### Dormant step

`**Dormant step** — Skippable, activates only when its state arises.`

Covers the rare case or the branch a run did not take. Its start condition simply never activates on most runs, and a run that never enters it is a run behaving correctly.

### Handover step

`**Handover step** — Manages the invocation and resolution of a handover document.`

The parent step that folds a handover's child steps into the run, owns the logic around them, and reads success from the state the handover leaves behind rather than from a handed-back outcome.

### Success step

`**Success step** — Resolves the run's done state and exits.`

Start conditions handle done state. Exits successfully and always. Its finished conditions say the run is complete.

## Declaring functions

Choose a function from the list above that best suits the shape of the step. Place the function string on the line below the directive. 
