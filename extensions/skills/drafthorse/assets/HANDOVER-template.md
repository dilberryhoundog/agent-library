---
# === FRONTMATTER — the stamp is the whole declaration ===
# No name, description, permissions, or invocation surface — identity lives in the
# identity paragraph below; grants and invocation come from the parent skill.
harness-format: DraftHorse, Handover
---

# <Handover Title> (Handover)

<!-- The identity paragraph — with no frontmatter identity, this carries it. One short paragraph stating: what this handover does, and when a parent step folds it in. -->

# Agent Invariants

<!-- The handover's OWN globals — in force across the parent step's span, not the whole run: from the parent's side they read as a step invariant on the parent step. Never repeat or conflict with a global the parent document states, or with the parent step's own invariants. Delete the section if none. -->

**DO NOT** <!-- ... -->
**ALWAYS** <!-- ... -->

# --- REFERENCES ---

<!-- The handover's own data — constants, maps, formats, facts its child steps cite at the moment of use. The parent's ambient references are citable BY NAME (cite, never restate); the parent never cites these. Delete the section if none. -->

## <Reference Name>

<!-- STATIC internal — compact, always-relevant context held inline. -->

# --- STEPS ---

Handover holds child steps of a parent step. Marked `## +<Child Step Name>`. Same step rules apply, plus these. Parent step reads success from the state child steps leave behind. All child steps finished or inactive — return to the parent step and continue. Parent document covers error handling, unless an optional child error step is present. Global invariants hold across the parent step's span. Step invariants confine to their own child step.

<!-- Child steps are standard DraftHorse steps: description and optional declared function above the contract (H4 machinery), engagement (H3) below, conditions in state terms. No success exit, no error step — the parent owns both. The last working step finishes on its own completion state; it never names or returns an outcome. -->

## +<Child Step Name>

<!-- The directive — a single line naming the agent's task on entering this step. -->

**<Step function>** <!-- — the fixed declaration string, copied from [Step Functions](../references/step-functions.md). Delete the line for an ordinary working step. Error and success steps never appear in a handover; the parent owns both. -->

#### Start this step when these are true:

<!-- The state that makes this the right work, in state terms. -->

- <condition 1>
- <condition 2>

<!-- optional -->
**OR these are true:**

- <other condition 1>
- <other condition 2>

#### Step finished when these are true:

<!-- This step's own completion criteria only — checkable and exhaustive. -->

- <condition 1>
- <condition 2>

<!-- optional -->
**OR these are true:**

- <other condition 1>
- <other condition 2>

#### Agent decision:

<!-- Optional: a choice governing this step's scope or shape, resolved by the agent before the work is performed. Delete the section when the step's scope is fixed. -->

#### Step invariants:

<!-- Rules in force while this step is in play. Delete the section if none. -->

### <Heading Named for the Work>:

<!-- The engagement — the work, as prose. Cite references inline at the moment they matter. -->

## +<Final Child Step Name>

<!-- The last working step. It finishes on its own completion state — no handback step, no outcome report; the parent step reads the resulting state. -->

#### Start this step when these are true:

- <condition 1>

#### Step finished when these are true:

- <condition 1>

### <Heading Named for the Work>:

<!-- The engagement. -->

<!-- OPTIONAL: a local step surfacing something to the user MID-WORK is allowed — written as an ordinary step (e.g. `## +Surface a Problem`). It owes the parent no handback and claims no remainder; the parent document's error step does that. -->

# --- TERMS ---

<!-- Glossary for handover-specific terms. Title Case names, bolded list-entry form. Terms the parent already defines are ambient — never redefine them. Delete the section if none. -->

- **<Term>** — <meaning>
