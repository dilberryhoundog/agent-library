---
# === FRONTMATTER — the stamp is the whole declaration ===
# No name, description, permissions, or invocation surface — identity lives in the
# identity paragraph below; grants and invocation come from the parent skill.
harness-format: DraftHorse, Handover
---

# <Handover Title> (Handover)

<!-- The identity paragraph — with no frontmatter identity, this carries it. One short paragraph stating: what this handover does, and when a parent step folds it in. -->

# Agent Invariants

<!-- The handover's OWN globals — in force for the whole run once folded in, alongside the parent document's. Must be compatible everywhere: never repeat a global the parent already states, never conflict with one. Delete the section if none. -->

**DO NOT** <!-- ... -->
**ALWAYS** <!-- ... -->

# --- REFERENCES ---

<!-- The handover's own data — constants, maps, formats, facts its child steps cite at the moment of use. The parent's ambient references are citable BY NAME (cite, never restate); the parent never cites these. Delete the section if none. -->

## <Reference Name>

<!-- STATIC internal — compact, always-relevant context held inline. -->

# --- STEPS ---

> This document is a handover: its steps run as child steps of the parent step that folded it in; a step is in play from when its *start* condition applies until its *finished* conditions are fully met, and multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Suggested next actions* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- There is no exit step and no error drain here: a failure falls to the parent document's problem step.
>- When no child step is left in play, return to the parent step and continue — the parent step's own conditions read the state this work leaves behind.

<!-- Child steps are standard DraftHorse steps: contract (H4 machinery) above, engagement (H3) below, conditions in state terms. No success exit, no error drain — the parent owns both. The last working step finishes on its own completion state; it never names or returns an outcome. -->

## +<Child Step Name>

<!-- One-line statement of what this step does. -->

#### Start this step when these are true:

<!-- The state that makes this the right work, in state terms. -->

- <condition 1>
- <condition 2>

#### Step finished when these are true:

<!-- This step's own completion criteria only — checkable and exhaustive. -->

- <condition 1>
- <condition 2>

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

#### Suggested next actions:

The handover's work is complete — return to the parent step and continue.

### <Heading Named for the Work>:

<!-- The engagement. -->

<!-- OPTIONAL local problem step — only to surface something to the user MID-WORK. It owes the parent no handback and drains no errors (the parent's problem step does that). Delete unless genuinely needed.

## +Surface a Problem

#### Start this step when these are true:

- Something mid-work needs the user's input before the child steps can continue.

#### Step finished when these are true:

- The user has been informed and has decided how to continue.

#### Suggested next actions:

Resume the child step the user chose, or return to the parent step.

### Surface the Problem:

Tell the user plainly what happened and what the options are.
-->

# --- TERMS ---

<!-- Glossary for handover-specific terms. Title Case names, `:` form. Terms the parent already defines are ambient — never redefine them. Delete the section if none. -->

: **<Term>**: <meaning>
