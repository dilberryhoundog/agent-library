# Condition Writing

How to write the conditions and the *do this next* guidance that frame every step. Together they carry all the routing a wired graph would — a weak condition is a broken edge. Responsibility is strictly divided: start conditions carry the routing, finished conditions carry only their own step's completion criteria, and *do this next* is the one place a step may name another step.

## Start conditions (`Start this step when:`)

State the situation that makes this step the right work, in terms of observable state — never in step terms.

- **Name the state, not the predecessor** — "a unit has commits in range but no verdict recorded", not "after the range step". Position-phrasing breaks the moment a loop or repair path arrives from elsewhere.
- **De-hold** — the condition must stop holding once the step's work is done, or the step re-admits itself forever. Even a first step needs its closing clause ("the skill has been invoked *and requirements are not yet established*").
- **Exclude half-applied states** — a condition that still holds after the step failed partway invites a destructive re-run. Add the exclusion explicitly ("…and no part of the release has been applied yet") and hand the half-applied state to the error step.
- **Claim the negative space deliberately** — the conditions across all steps should cover every state the skill can be in; whatever no step claims belongs to the error step's "no other step covers this".
- **Loops are re-holding conditions** — a per-item step's condition simply holds again for the next item ("an action not yet run, and no refusal has ended the run"). No loop syntax exists or is needed.
- **In-play overlap is deliberate or absent** — multiple steps may be in play at once (a supervisory step spanning its sub-steps, a background wait spanning the conversation). Sharp conditions make the overlap intended; accidental overlap is a defect.

## Finished conditions (`Step finished when:`)

State what is true when this step's own work is genuinely done — and nothing else.

- **Checkable** — the agent can tell done from not-done by looking. "The user has responded" is checkable; "the user is satisfied" is not.
- **Exhaustive** — it encompasses all the work. "Every chosen unit released, declined, or reported nothing-to-release", not "the releases are done". The test: could the agent claim this is met while work remains?
- **Own step only** — never mention another step, narrate where the flow goes, or issue instructions. Routing lives in the other steps' start conditions and in *do this next*; work lives in the engagement. A routing fact stated in two homes drifts.
- **Gates are compound** — a step that presents something for approval finishes on the user's approval *and* the artifact's own substantive conditions, never on approval alone (a rubber-stamp must not launder a defective artifact) and never on mere presentation. Presenting is part of the engagement.

## Do this next (`Do this next:`)

Optional prose guidance onward — the one sanctioned cross-step reference. Omit it when the next step's start condition picks up the completion state unaided.

- **Point, don't restate** — name the destination or the move; never repeat the destination's conditions, which stay authoritative in its own start condition.
- **Never contradict a start condition** — when the finished condition has failure outcomes, the do-next either covers them ("a recorded failure moves to reporting the result; otherwise…") or stays silent about them; a happy-path-only pointer that sends an ended run onward overrides the destination's own refusal.
- **Its uses** — highlighting the happy path; a loop instruction ("return to the first step for the next item"); the exit of a finishing step ("end the skill and return to the user"); a bail that keeps a step from hanging on unmeetable completion conditions ("if errors are present, report them in the problem step; otherwise move on").

## Worked examples

Illustrations from example skills — the step names belong to those skills, not to a required naming scheme.

- Entry after a gate: "The user has approved X (with any edits applied), and …" — the approval is the state.
- No-op and refusal routing: the detecting step's finished condition records the no-op as its own outcome ("…or the refusal is recorded"); the result/error step's start condition claims the ended run ("…or a refusal has ended the run"). Two conditions dovetail; neither names the other.
- Terminal steps: the success exit starts on the exhaustive all-done state; the error step starts on the generic remainder; both finish by informing the user (or caller), with *do this next* carrying the "end the skill" instruction.
