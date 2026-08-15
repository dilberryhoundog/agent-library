# Condition Writing

How to write the conditions that frame every step. They carry all the routing a wired graph would — a weak condition is a broken edge. Responsibility is strictly divided: start conditions carry the routing, finished conditions carry only their own step's completion criteria, and a step names no other step.

## Writing the list

A condition list is implicitly conjunctive — every grouped condition holds. `**AND**` is implicit by just be one of many conditions. Where a step admits genuinely alternative states, close the list and open another with `**OR these are true:**` on its own line between them: each list ANDs within itself, and the list groups OR against each other.

```
#### Start this step when these are true:

- a report has arrived
- no verdict is recorded

**OR these are true:**

- a repair was requested
- the report is unchanged
```

Split conditions down until each item answers to a single look. One item, one observation, one true-or-false verdict — if deciding an item means checking two separate things about the world, it is two conditions. "A report has arrived and no verdict is recorded" reads as one sentence but takes two looks, so it is two items; "the report is unchanged" takes one look and stands alone.

Reach for the separator sparingly. Two alternative entry states often mean two steps, each with a sharp condition of its own — split before separating.

## Start conditions (`Start this step when these are true:`)

State the situation that makes this step the right work, in terms of observable state — never in step terms.

- **Name the state, not the predecessor** — "a unit has commits in range but no verdict recorded", not "after the range step". Position-phrasing breaks the moment a loop or repair path arrives from elsewhere.
- **De-hold** — the condition must stop holding once the step's work is done, or the step re-admits itself forever. Even a first step needs its closing clause ("the skill has been invoked *and requirements are not yet established*").
- **Claim the negative space deliberately** — the conditions across all steps should cover every state the skill can be in; whatever no step claims belongs to the error step's "no other step covers this".
- **Loops are re-holding conditions** — a per-item step's condition simply holds again for the next item ("an action not yet run, and no refusal has ended the run"). No loop syntax exists or is needed.
- **In-play overlap is deliberate or absent** — multiple steps may be in play at once (a supervisory step spanning its inner steps, a background wait spanning the conversation). Sharp conditions make the overlap intended; accidental overlap is a defect.

## Finished conditions (`Step finished when these are true:`)

State what is true when this step's own work is genuinely done — and nothing else.

- **Checkable** — the agent can tell done from not-done by looking. "The user has responded" is checkable; "the user is satisfied" is not.
- **Exhaustive** — it encompasses all the work. "Every chosen unit released, declined, or reported nothing-to-release", not "the releases are done". The test: could the agent claim this is met while work remains?
- **Own step only** — never mention another step, narrate where the flow goes, or issue instructions. Routing lives in the other steps' start conditions; work lives in the engagement. A routing fact stated in two homes drifts.
- **Cover every outcome the step can end on** — a step whose finished condition admits failure outcomes states them, so the destinations that claim a failure are reachable. A happy-path-only account of a step's completion sends an ended run onward and overrides the refusal the destination would have made.
- **Gates are compound** — a step that presents something for approval finishes on the user's approval *and* the artifact's own substantive conditions, never on approval alone (a rubber-stamp must not launder a defective artifact) and never on mere presentation. Presenting is part of the engagement.

## Worked examples

Illustrations from example skills — the step names belong to those skills, not to a required naming scheme.

- Entry after a gate: "The user has approved X (with any edits applied), and …" — the approval is the state.
- No-op and refusal routing: the detecting step's finished condition records the no-op as its own outcome ("…or the refusal is recorded"); the result/error step's start condition claims the ended run ("…or a refusal has ended the run"). Two conditions dovetail; neither names the other.
- Terminal steps: the success exit starts on the exhaustive all-done state; the error step starts on the generic remainder; both finish by informing the user (or caller), and each states the run's completion in its own finished condition — an exit step that never says the skill is complete leaves the run with nowhere to stop.
- Half-applied state: a step that fails partway hands its partial work to the error step, which reports what was and was not applied, recommends a fix, and ends the run.
