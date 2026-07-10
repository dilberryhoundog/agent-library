---
type: handover
---

# Classroom Setup (Handover)

Lay the classroom project skeleton down at the current root and fill its config, so ordinary builds have the standing constants and learner files they read. A handover doc — a master step folds this in once it has confirmed the user wants a classroom set up in the current directory. Its steps run as sub-steps of that master step, and its references and invariants come into play for the run; it leans on the master document's tool grants. It routes no success or failure of its own: when its work is done the master step reads the result from the project state, and a failure falls to the master document's problem step.

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
>- A step may fold in a handover doc: follow its steps as sub-steps of that master step, which handles their exits and errors; when they are done, keep going with the master step.

## +Copy the Init Payload

Lay the project skeleton down at the root.

#### Start this step when:

The user's consent to set up a classroom in the current working directory is confirmed, and the init payload has not yet been copied to the root.

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
