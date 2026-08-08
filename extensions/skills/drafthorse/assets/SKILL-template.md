---
# === FRONTMATTER ===
harness-format: DraftHorse
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

<!-- The References utility. Constants, maps, formats, facts — data by preference, no work. Steps cite these inline at the moment of use. Title Case names. -->

## <Reference Name>

<!-- STATIC internal — compact, always-relevant context held inline. -->

=== <label> ===
<!-- constant / map / format / fact -->

## <Reference Name>

<!-- DYNAMIC reference — runtime-produced context (data load / external call / agent / hook), e.g. live state pulled in with a !`command` block. -->

<!-- EXTERNAL static reference — if expansive and only sometimes relevant, push it to a sibling file and point at it here instead of inlining. -->

# --- STEPS ---

> Steps are universal and standalone.
>
>- All their work, instructions, and rules are self-contained.
>- Invoke a step any time its *start* conditions are met.
>- A step is completed only when all its *finished* conditions are met.
>- A step that cannot be completed falls to the error drain step.
>- A handover folds in as child steps of the parent step; flow control always belongs to the parent step.
>- References are inline, using Markdown link styling. Always load a cited reference.
>- Multiple active steps, looping back, and dormant steps are all valid patterns.

<!-- Steps are standalone units listed in the usual execution order (a reading aid, not a boundary). H4 headings are the step's contract — its conditions, any scope decision, its routing hint and its invariants; the H3 opens the work. A step names another step only in its "Suggested next actions:" slot; conditions are written in state terms, never step terms. -->

## +<Step Name>

<!-- One-line statement of what this step does. -->

#### Start this step when these are true:

<!-- The state that makes this the right work, in state terms. -->

- <condition 1>
- <condition 2>

<!-- optional -->
**OR these are true:**

- <other condition 1>
- <other condition 2>

#### Step finished when these are true:

<!-- This step's own completion criteria only — checkable and exhaustive. Could the agent claim this is met while work remains? If yes, sharpen it. No other steps, no routing, no instructions. -->

- <condition 1>
- <condition 2>

<!-- optional -->
**OR these are true:**

- <other condition 1>
- <other condition 2>

#### Agent decision:

<!-- Optional: a choice that governs this step's scope or shape — what it targets, how many times it runs — resolved before the work can be performed. Carries no work and no routing, and resolves to a fact the finished condition depends on. Delete the section when the step's scope is fixed. -->

#### Suggested next actions:

<!-- Optional prose: loop back, bail on failure, or skill exit. Points only — never restate the destination's conditions. Omit when the dovetail is obvious. -->

#### Step invariants:

<!-- Rules in force while the step is in play. Delete the section if none. -->

### <Heading Named for the Work>:

<!-- The engagement — the work, as prose. Cite references inline at the moment they matter. Structure with H4 sub-headings when the work has distinct parts. -->

#### <Sub-heading>:

<!-- Separate the engagement into distinct sections, if necessary, to help the agent differentiate varied context. -->

## +<Success Exit Step Name>

<!-- Reports the outcome and ends the skill. -->

#### Start this step when these are true:

<!-- All the work is finished — stated exhaustively ("every item processed, declined, or reported empty"). -->

- <condition 1>

#### Step finished when these are true:

<!-- The summary is presented. -->

- <condition 1>

#### Suggested next actions:

End the skill and return to the user.

### <Report>:

<!-- Summarise the run's outcome for the user. -->

## +Handle a Problem

<!-- The error step — the drain that makes coverage subtractive. Keep the start condition generic. -->

Surface anything the other steps don't cover, and decide with the user how to continue.

#### Start this step when these are true:

- something has gone wrong, or a situation has arisen that no other step covers

#### Step finished when these are true:

- the user has been informed of what happened and what state things are now in
- the user has decided how to continue

#### Suggested next actions:

Resume the step the user chose, or end the skill.

### Surface the Problem:

Tell the user plainly what happened, where it arose, what state things are now in (half-applied states also), and what the options are.

# --- TERMS ---

<!-- Glossary for skill-specific terms the steps and references lean on. Title Case names, bolded list-entry form. Delete the section if none. -->

- **<Term>** — <meaning>
- **<Term>** — <meaning>
