# Steps Preamble Refactor

Proposal. Not yet applied. Rewrites the steps preamble and the step description slot across every DraftHorse document.

## The change

Three moves, taken together.

**Deprecate *Suggested next actions*.** The slot is a second routing mechanism sitting beside the real one. Conditions carry the routing; the pointer duplicates it in prose, drifts from it, and gives an agent two places to look. Remove the slot from the anatomy, the preamble, and the template.

**Weight the step description.** The one-line purpose statement under `## +Step Name` stops being a scanning label and becomes the step's self-description to the reading agent — what this step does, and how it behaves. It absorbs what the pointer used to carry, stated in the step's own terms rather than as a cross-reference.

**Declare the step's function.** Below the purpose line, the builder names the step's function from a catalogue. Bolded function name, normal text after it. The function tells the reading agent how the step behaves before it reads a single condition.

## Functions

The catalogue a builder chooses from:

- **Error step** — handles recovery and bails.
- **Looping step** — re-runs, taking a different branch each pass.
- **Routing step** — chooses between divergent branches.
- **Dormant step** — activates only when its state arises.
- **Handover step** — manages the invocation and resolution of a handover document.
- **Support step** — catches or manages difficulties belonging to other steps.

A step with no declared function is an ordinary working step.

## What it buys

- **One routing mechanism.** Conditions, and nothing else. No pointer to keep in sync.
- **No guessing from boilerplate.** Today an agent reads a universal preamble and infers what each step is trying to do. The function declaration states it in place.
- **Instructions customised where they apply.** Behaviour that varies per step stops living in shared boilerplate.
- **A lighter preamble.** Lines describing patterns move out to the steps that use them.
- **Higher fidelity.** The step describes itself; the reader stops reconstructing intent.

## Ripple

Large. This touches boilerplate copied verbatim into every document.

- `assets/SKILL-template.md` — the preamble draft lives here; this is the source edit.
- `assets/HANDOVER-template.md` — the handover-variant preamble.
- `docs/drafthorse/framework/steps.md` — preamble text, step anatomy, the *Suggested next actions* section, the step usage patterns catalogue (which the function list partly replaces).
- `docs/drafthorse/framework/notation.md` — the machinery heading list.
- `docs/drafthorse/framework/handover.md` — variant preamble text.
- `extensions/skills/drafthorse/SKILL.md` — the build skill's own steps, plus its instructions for writing conditions and pointers.
- `extensions/skills/drafthorse/references/condition-writing.md` — carries a *Suggested next actions* section.
- `extensions/agents/drafthorse-saddler.md` — the audit checks for the slot and defines its terms.
- Every existing skill and agent document in `extensions/`.

## Open questions

- Where does the function catalogue live so a builder can choose from it — the template, a `steps.md` catalogue, or both?
- Does a step declare one function or several? A handover step that also loops is plausible.
- Do existing documents get retrofitted, or does the function declaration apply to new documents only?
- Does the step usage patterns catalogue in `steps.md` survive alongside the function list, or does the function list replace it?
- What happens to the legitimate uses *Suggested next actions* covered — the loop instruction, the exit of a finishing step, the bail off unmeetable conditions? Each needs a home in the new shape before the slot is removed.

## Related

Terminology settles with this work: **error drain**, **error step**, **problem step**, and `+Handle a Problem` are four names for one thing, and *error drain* sits in the preamble line this refactor rewrites. Choose one set here rather than touching the same boilerplate twice.
