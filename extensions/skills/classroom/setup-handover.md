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

=== dynamic — run from the project root, on a root with no prior classroom config ===

```bash
cp -a "${CLAUDE_PLUGIN_ROOT}/templates/." .
```

## Warm the PDF Engine

=== dynamic — optional pre-install ===

```bash
bash "${CLAUDE_PLUGIN_ROOT}/scripts/install-deps.sh"
```

# --- STEPS ---

Handover holds child steps of a parent step. Marked `## +<Child Step Name>`. Same step rules apply, plus these. Parent step reads success from the state child steps leave behind. All child steps finished or inactive — return to the parent step and continue. Parent document covers error handling, unless an optional child error step is present. Global invariants hold across the parent step's span. Step invariants confine to their own child step.

## +Copy the Init Payload

Lay the project skeleton down at the root.

#### Start this step when these are true:

- the user's consent to set up a classroom in the current working directory is confirmed
- no filled classroom config from a prior setup exists at the root

#### Step finished when these are true:

- the payload's whole contents are present at the project root
- every pre-existing config file is preserved rather than overwritten

#### Step invariants:

**NEVER** overwrite a pre-existing config file at the project root — `CLAUDE.md`, `global-requirements.md`, anything in `students/`, or the `.claude/` rules. Copy only what is absent; merge the classroom config block into an existing `CLAUDE.md`.

### Copy, Preserving Any Existing Config:

On a bare root, run the [Copy the Payload](#copy-the-payload) command from the project root; it brings the `templates/` contents (including the hidden `.claude/`) into place. Where any payload file already exists at the root, copy only the absent pieces instead — never the whole payload over existing files — and merge the classroom config block from `${CLAUDE_PLUGIN_ROOT}/templates/CLAUDE.md` into an existing `CLAUDE.md`. The [Init Payload](#init-payload) reference names the source and the fallback when `${CLAUDE_PLUGIN_ROOT}` is not substituted.

## +Configure the Project

Turn the copied skeleton into this family's actual config.

#### Start this step when these are true:

- the payload is present at the root
- its config files still hold unfilled bracket prompts or starter placeholders

#### Step finished when these are true:

- `CLAUDE.md`'s bracketed fields (family/classroom name, working-outputs location) are filled from the user and their resolved prompts deleted
- `global-requirements.md` is filled with the user, or explicitly flagged to them as a starter to complete before the first build
- the optional pre-install of the PDF dependency has been offered and the user's answer taken

### Fill the Config:

Fill `CLAUDE.md`'s bracketed fields from a short interview, leaving the learner roster and status notes to populate as work happens. Then fill `global-requirements.md` with the user — its constants (spelling, page size, cost rule, worldview defaults) are read on every build, so they should be real before any document is produced; if the user defers, say plainly that it is an unfinished starter. Learners are added later, not now: when one is needed, read [Template](references/students/_template.md) for the fields and write `students/<name>.md`. Finally, offer the optional pre-install of the PDF dependency — it makes the first conversion fast — and take the user's yes or no.

## +Warm the PDF Engine

Optionally pre-install the PDF dependency so the first conversion is fast.

**Dormant step** — Skippable, activates only when its state arises.

#### Start this step when these are true:

- the project is configured
- the user has accepted the offer to pre-install the PDF dependency

#### Step finished when these are true:

- the dependency is installed via the [Warm the PDF Engine](#warm-the-pdf-engine) command

### Pre-install:

Run the [Warm the PDF Engine](#warm-the-pdf-engine) command. Where it is not run, the `classroom-pdf` MCP server installs its own dependency on first use instead.
