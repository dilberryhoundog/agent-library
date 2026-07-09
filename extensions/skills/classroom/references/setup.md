---
type: handover
---

# Classroom Setup (Handover)

Bootstrap a classroom project on first run: copy the init payload to the project root and fill its config, so ordinary builds have the standing constants and learner files they read. A handover doc — an invoking step calls this when no classroom context is loaded, and this hands back a bootstrap outcome for that step to act on. Tool grants come from the calling skill.

# --- REFERENCES ---

## Bootstrapped Project Layout

=== what a set-up project has at its root ===

```
CLAUDE.md                     project config/signal (agent-maintained)
.claude/rules/classroom.md    static classroom rule the skill reads on later builds to detect this project; never edited
global-requirements.md        the family's standing constants (spelling, page size, cost rule, worldview defaults)
students/                     one file per learner
```

## Init Payload

=== source of the payload ===
The plugin's `templates/` folder is the init payload; setup copies its whole contents (including the hidden `.claude/` directory) to the project root. The skill's installation directory is `${CLAUDE_PLUGIN_ROOT}`. If that variable is not substituted on this host, locate the installed plugin directory (the folder holding this skill plus `templates/`, `mcp/`, and `scripts/`) and use it as the copy source.

## Copy the Payload

=== dynamic — run from the project root ===

```bash
cp -a "${CLAUDE_PLUGIN_ROOT}/templates/." .
```

## Warm the PDF Engine

=== dynamic — optional pre-install ===

```bash
bash "${CLAUDE_PLUGIN_ROOT}/scripts/install-deps.sh"
```

# --- STEPS ---

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.

## +Confirm Placement and Consent

Make sure this directory is the right home before writing anything into it.

#### Start this step when:

A bootstrap has been requested and the user has not yet confirmed both the directory and their consent to set up here.

#### Step finished when:

The user has confirmed the current working directory is the folder they want the classroom to live in, and has agreed to set one up here — or has said they want to relaunch elsewhere or not proceed, in which case nothing has been written.

#### Do this next:

With placement and consent confirmed, copy the init payload; if the user declines or wants to relaunch elsewhere, go to the problem step to hand a not-completed outcome back.

### Confirm Two Things:

Ask the user directly. First, **the directory**: is the current working directory the folder they want this classroom to live in? If they may have launched in the wrong place, have them relaunch in the intended project root rather than scattering files where they are. Second, **consent**: confirm they want to set up a classroom here at all. Write nothing until both are answered.

## +Copy the Init Payload

Lay the project skeleton down at the root.

#### Start this step when:

Placement and consent are confirmed, and the init payload has not yet been copied to the root.

#### Step finished when:

The payload's whole contents are present at the project root, with any pre-existing `CLAUDE.md` preserved rather than overwritten.

#### Invariants:

**NEVER** overwrite an existing `CLAUDE.md` at the project root — copy everything else, then merge the classroom config block into it.

### Copy, Preserving Any Existing Config:

Run the `Copy the Payload` command from the project root; it brings the `templates/` contents (including the hidden `.claude/`) into place. When a `CLAUDE.md` already exists at the root, preserve it: copy everything else, then merge the classroom config block from `${CLAUDE_PLUGIN_ROOT}/templates/CLAUDE.md` into it. The `Init Payload` reference names the source and the fallback when `${CLAUDE_PLUGIN_ROOT}` is not substituted.

## +Configure the Project

Turn the copied skeleton into this family's actual config.

#### Start this step when:

The payload is present at the root and its config files still hold unfilled bracket prompts or starter placeholders.

#### Step finished when:

`CLAUDE.md`'s bracketed fields (family/classroom name, working-outputs location) are filled from the user and resolved prompts deleted, and `global-requirements.md` is either filled with the user or explicitly flagged to them as a starter to complete before the first build.

### Fill the Config:

Fill `CLAUDE.md`'s bracketed fields from a short interview, leaving the learner roster and status notes to populate as work happens. Then fill `global-requirements.md` with the user — its constants (spelling, page size, cost rule, worldview defaults) are read on every build, so they should be real before any document is produced; if the user defers, say plainly that it is an unfinished starter. Learners are added later, not now: when one is needed, read `references/students/_template.md` for the fields and write `students/<name>.md`.

## +Warm the PDF Engine

Optionally pre-install the PDF dependency so the first conversion is fast.

#### Start this step when:

The project is configured and the user has asked to pre-install the PDF dependency.

#### Step finished when:

The dependency is installed via the `Warm the PDF Engine` command, or the user has declined and it is left to install itself on first use.

### Pre-install or Skip:

The `classroom-pdf` MCP server installs its own dependency on first use, so this is optional. If the user wants the first PDF to be fast, run the `Warm the PDF Engine` command; otherwise skip it.

## +Confirm Setup Complete

Report what now exists and hand the outcome back to the caller.

#### Start this step when:

The project root is configured — payload copied and config files filled or flagged.

#### Step finished when:

The user has been shown a short summary of what now exists at the root, and the bootstrap outcome has been handed back to the invoking step.

#### Do this next:

Return to the invoking step with the outcome.

### Summarise and Hand Back:

Tell the user the classroom is set up and list what now exists at the root, per the `Bootstrapped Project Layout`. Hand back to the invoking step the outcome **classroom bootstrapped** — `global-requirements.md`, `.claude/rules/classroom.md`, and `students/` now exist at the root, and ordinary builds can read the config as usual — so it can proceed to the build.

## +Handle a Problem

Surface anything the other steps don't cover, and hand a failure outcome back.

#### Start this step when:

A situation has arisen that no other step covers — the user has declined or stopped, the payload source cannot be located, or the copy fails.

#### Step finished when:

The user has been informed of what happened and what state the root is in, and the failure outcome has been handed back to the invoking step.

#### Do this next:

Return to the invoking step with the outcome.

### Surface the Problem:

Tell the user plainly what happened, which part of setup it arose in, and what now exists at the root (especially any partial copy). Hand back to the invoking step the outcome **bootstrap not completed**, naming the reason and what (if anything) was written, so it can decide whether to retry, relocate, or abandon the build.
