---
# === FRONTMATTER — the declaration segment ===
name: <skill-name>
description: model-invoked; agent-facing, sells usage + trigger conditions. user-invoked; short user-facing summary.
# --- invocation surface (set the ones that apply, delete the rest) ---
# disable-model-invocation: true   # user-invoked: strips description from agent context
# user-invocable: false            # executor-only: cannot be called by the user directly
# --- permissions (grants transfer to a sub-agent that invokes this skill) ---
allowed-tools: <!-- e.g. Bash(git status *), Skill(...), Agent(...) -->
---

<!-- One- or two-line statement of what this skill is for and why it exists. The leading concept the agent should carry while running it. -->

# Agent Invariants

<!-- GLOBAL invariants — hold across every step, no exceptions. Bold + CAPS keyword + the rule. Single source of truth: state once here, never restate per step. -->

**DO NOT** <!-- ... -->
**ALWAYS** <!-- ... -->
**NEVER** <!-- ... -->

# --- REFERENCES ---

<!-- The data segment. Context only, never logic. Cite from any step/slot. Title Case names. -->

## <Reference Name>

<!-- STATIC internal — compact, always-relevant context held inline. -->

=== <label> ===
<!-- constant / map / format / fact -->

## <Reference Name>

<!-- DYNAMIC reference — runtime-produced context (data load / external call / agent / hook). -->
<!-- e.g. live state pulled in as source of truth, or a route out to another skill/tool. -->

<!-- EXTERNAL static reference — if expansive and only sometimes relevant, push it to a sibling file and point at it here instead of inlining. -->

# --- STEPS ---

<!-- The executable body — the only place logic lives. Each step is an atomic, bounded, ordered unit ending on a checkable, exhaustive completion criterion (the exit edge). Fill only the slots a step needs; delete the rest. -->

## +<FIRST STEP NAME>

<!-- Engagement — the core charge / work to complete. -->

#### Agent Invariants

<!-- STEP-SCOPED rules that bind only inside this step. Delete if none. -->

#### Decision

<!-- Dynamic, multi-way edge. Mini-instruction stating WHAT is decided and BETWEEN WHAT, then the bounded options. Delete if the step has no branch. -->

**IF**: <condition>
**THEN**: <!-- ... -->

**IF**: <condition>
**THEN**: <!-- ... -->

#### Return

<!-- Single edge looping back to an earlier node. Delete if unused. -->

**IF**: <condition>
**THEN**: **-> +<STEP>**

#### Proceed

<!-- Single edge advancing to the next node. Carries the completion criterion. -->

**WHEN**: <completion criterion — checkable and exhaustive>
**THEN**: **-> +<NEXT STEP NAME>**

## +<NEXT STEP NAME>

<!-- Engagement. -->

#### Breakout

<!-- Optional: hand the agent a creative / situationally-dependent stretch. This step launches the agent; a later step catches it. State the charge, the context delivered, and the catch condition. Delete if unused. -->

#### Proceed

**WHEN**: <completion criterion>
**THEN**: **-> +<STEP>**

## +<FINAL STEP NAME>

<!-- Engagement. -->

#### End

<!-- Terminate the step process and return control to the caller. -->

**WHEN**: <completion criterion>
**END**

# --- TERMS ---

<!-- Glossary for skill-specific terms the steps and references lean on. Title Case names, `:` form. Delete the section if none. -->

: **<Term>**: <meaning>
: **<Term>**: <meaning>
