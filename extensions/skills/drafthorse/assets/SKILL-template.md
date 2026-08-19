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

Steps are universal and standalone. Marked `## +<Step Name>`. Work, instructions, rules — self-contained. Invoke a step whenever its start conditions match. Step completes only when its finished conditions match. Multiple steps activate at once. Call every cited reference. References use markdown link notation.

<!-- Steps are standalone units listed in the usual execution order (a reading aid, not a boundary). A step opens with its directive and optional declared function; H4 headings are its contract — conditions, any scope decision, its invariants; the H3 opens the work. A step names no other step; conditions are written in state terms, never step terms. -->

## +<Step Name>

<!-- The directive — a single line naming the agent's task on entering this step. -->

**<Step function>** <!-- — the fixed declaration string, copied from [Step Functions](../references/step-functions.md). Delete the line for an ordinary working step. -->

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

#### Step invariants:

<!-- Rules in force while the step is in play. Delete the section if none. -->

### <Heading Named for the Work>:

<!-- The engagement — the work, as prose. Cite references inline at the moment they matter. Structure with H4 sub-headings when the work has distinct parts. -->

#### <Sub-heading>:

<!-- Separate the engagement into distinct sections, if necessary, to help the agent differentiate varied context. -->

# --- TERMS ---

<!-- Glossary for skill-specific terms the steps and references lean on. Title Case names, bolded list-entry form. Delete the section if none. -->

- **<Term>** — <meaning>
- **<Term>** — <meaning>
