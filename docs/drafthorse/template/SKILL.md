---
# === FRONTMATTER — the declaration segment ===
name: <skill-name>
description: model-invoked; agent-facing, sells usage + trigger conditions. user-invoked; short user-facing summary.
# --- invocation surface (set the ones that apply, delete the rest) ---
# disable-model-invocation: true   # user-invoked: strips description from agent context
# user-invocable: false            # executor-only: cannot be called by the user directly
# --- permissions (grants transfer to a sub-agent that invokes this skill) ---
# allowed-tools: e.g. Bash(git status *), Skill(...), Agent(...)
---

# <Skill Title>

<!-- One- or two-line statement of what this skill is for and why it exists. The leading concept the agent should carry while running it. -->

# Agent Invariants

<!-- GLOBAL invariants — hold across every step, no exceptions. Bold + CAPS keyword + the rule (open family; DO NOT / ALWAYS / NEVER are the core set). Single source of truth: state once here, never restate per step. -->

**DO NOT** <!-- ... -->
**ALWAYS** <!-- ... -->
**NEVER** <!-- ... -->

# --- REFERENCES ---

<!-- The data segment. Constants, maps, formats, facts — data by preference, no work. Steps cite these inline at the moment of use. Title Case names. -->

## <Reference Name>

<!-- STATIC internal — compact, always-relevant context held inline. -->

=== <label> ===
<!-- constant / map / format / fact -->

## <Reference Name>

<!-- DYNAMIC reference — runtime-produced context (data load / external call / agent / hook), e.g. live state pulled in with a !`command` block. -->

<!-- EXTERNAL static reference — if expansive and only sometimes relevant, push it to a sibling file and point at it here instead of inlining. -->

# --- STEPS ---

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.
>- A step may fold in a handover doc: follow its steps as sub-steps of that master step, which handles their exits and errors; when they are done, keep going with the master step.

<!-- Steps are standalone units listed in the usual execution order (a reading aid, not a boundary). H4 headings are the step's contract — its conditions, any scope decision, its routing hint and its invariants; the H3 opens the work. A step names another step only in its "Do this next:" slot; conditions are written in state terms, never step terms. -->

## +<Step Name>

<!-- One-line statement of what this step does. -->

#### Start this step when:

<!-- The state that makes this the right work, in state terms. Exclude half-applied states — a condition that still holds after the step failed partway invites a destructive re-run. -->

#### Step finished when:

<!-- This step's own completion criteria only — checkable and exhaustive. Could the agent claim this is met while work remains? If yes, sharpen it. No other steps, no routing, no instructions. -->

#### Decision:

<!-- Optional: a choice that governs this step's scope or shape — what it targets, how many times it runs — resolved before the work can be performed. Carries no work and no routing, and resolves to a fact the finished condition depends on. Delete the section when the step's scope is fixed. -->

#### Do this next:

<!-- Optional prose: happy-path pointer, loop back, bail on failure, or skill exit. Points only — never restate the destination's conditions. Delete when the dovetail is obvious. -->

#### Invariants:

<!-- Rules in force while the step is in play. Delete the section if none. -->

### <Heading Named for the Work>:

<!-- The engagement — the work, as prose. Cite references inline at the moment they matter. Structure with H4 sub-headings when the work has distinct parts. -->

## +<Success Exit Step Name>

<!-- Reports the outcome and ends the skill. -->

#### Start this step when:

<!-- All the work is finished — stated exhaustively ("every item processed, declined, or reported empty"). -->

#### Step finished when:

<!-- The summary is presented. The skill is complete. -->

#### Do this next:

End the skill and return to the user.

### <Report>:

<!-- Summarise the run's outcome for the user. -->

## +Handle a Problem

<!-- The error step — the drain that makes coverage subtractive. Keep the start condition generic. -->

Surface anything the other steps don't cover, and decide with the user how to continue.

#### Start this step when:

Something has gone wrong, or a situation has arisen that no other step covers.

#### Step finished when:

The user has been informed and has decided how to continue.

#### Do this next:

Resume the step the user chose, or end the skill.

### Surface the Problem:

Tell the user plainly what happened, where it arose, what state things are now in (especially anything half-applied), and what the options are.

# --- TERMS ---

<!-- Glossary for skill-specific terms the steps and references lean on. Title Case names, `:` form. Delete the section if none. -->

: **<Term>**: <meaning>
: **<Term>**: <meaning>
