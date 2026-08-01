---
harness-format: DraftHorse, Handover
---

# Classroom Setup (Handover)

Lay the classroom project skeleton down at the current root and fill its config, so ordinary builds have the standing constants and learner files they read. A parent step folds this in once it has confirmed the user wants a classroom set up in the current directory.

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

> Handovers are child steps of a parent step:
>
>- The parent step reads success from the state the handover leaves behind.
>- Invoke a child step any time its *start* conditions are met.
>- If all child steps are *finished* or inactive, return to the parent step and continue.
>- Error handling is covered by the parent document, unless an optional child problem step is present.
>- Global invariants apply across the whole parent step; step invariants are confined to the child step.

## +Copy the Init Payload

Lay the project skeleton down at the root.

#### Start this step when these are true:

The user's consent to set up a classroom in the current working directory is confirmed, and the init payload has not yet been copied to the root.

#### Step finished when these are true:

The payload's whole contents are present at the project root, with any pre-existing `CLAUDE.md` preserved rather than overwritten.

#### Step invariants:

**NEVER** overwrite an existing `CLAUDE.md` at the project root — copy everything else, then merge the classroom config block into it.

### Copy, Preserving Any Existing Config:

Run the `Copy the Payload` command from the project root; it brings the `templates/` contents (including the hidden `.claude/`) into place. When a `CLAUDE.md` already exists at the root, preserve it: copy everything else, then merge the classroom config block from `${CLAUDE_PLUGIN_ROOT}/templates/CLAUDE.md` into it. The `Init Payload` reference names the source and the fallback when `${CLAUDE_PLUGIN_ROOT}` is not substituted.

## +Configure the Project

Turn the copied skeleton into this family's actual config.

#### Start this step when these are true:

The payload is present at the root and its config files still hold unfilled bracket prompts or starter placeholders.

#### Step finished when these are true:

`CLAUDE.md`'s bracketed fields (family/classroom name, working-outputs location) are filled from the user and resolved prompts deleted, `global-requirements.md` is either filled with the user or explicitly flagged to them as a starter to complete before the first build, and the optional pre-install of the PDF dependency has been offered and the user's answer taken.

### Fill the Config:

Fill `CLAUDE.md`'s bracketed fields from a short interview, leaving the learner roster and status notes to populate as work happens. Then fill `global-requirements.md` with the user — its constants (spelling, page size, cost rule, worldview defaults) are read on every build, so they should be real before any document is produced; if the user defers, say plainly that it is an unfinished starter. Learners are added later, not now: when one is needed, read [Template](references/students/_template.md) for the fields and write `students/<name>.md`. Finally, offer the optional pre-install of the PDF dependency — it makes the first conversion fast — and take the user's yes or no.

## +Warm the PDF Engine

Optionally pre-install the PDF dependency so the first conversion is fast.

#### Start this step when these are true:

The project is configured and the user has accepted the offer to pre-install the PDF dependency.

#### Step finished when these are true:

The dependency is installed via the `Warm the PDF Engine` command.

### Pre-install:

Run the `Warm the PDF Engine` command. Where it is not run, the `classroom-pdf` MCP server installs its own dependency on first use instead.
