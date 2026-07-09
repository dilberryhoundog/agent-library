# Classroom setup

First-run bootstrap for a classroom project. Read this only when setting up (or repairing) a
project — it is kept out of the always-on context on purpose; the main signal files
(`.claude/rules/classroom.md` and `CLAUDE.md`) carry only a one-line pointer here.

A bootstrapped classroom project has, at its root:

```
CLAUDE.md                     project config/signal (agent-maintained)
.claude/rules/classroom.md    static classroom rule (never edited)
global-requirements.md        the family's standing constants
students/                     one file per learner
```

## When to run this

Run setup when the user wants classroom work but **no classroom context is loaded** (no
`.claude/rules/classroom.md`, no classroom section in `CLAUDE.md`). Before bootstrapping,
confirm two things with the user:

1. **Right directory.** Is the current working directory the folder they want this
   classroom to live in? If they may have launched in the wrong place, have them relaunch in
   the intended project root rather than scattering classroom files where they are.
2. **Go ahead.** Confirm they want to set up a classroom here (and, if not, that they want
   the plugin/skill at all).

## Bootstrap

The init payload is the plugin's `templates/` folder; setup copies its **whole contents** to
the project root. The skill's installation directory is available as `${CLAUDE_PLUGIN_ROOT}`.

1. Copy the payload to the project root (includes the hidden `.claude/` directory):

   ```bash
   cp -a "${CLAUDE_PLUGIN_ROOT}/templates/." .
   ```

   **If a `CLAUDE.md` already exists** at the root, do not overwrite it. Copy everything
   else, then merge the classroom config block from `${CLAUDE_PLUGIN_ROOT}/templates/CLAUDE.md`
   into the existing `CLAUDE.md` instead.

2. **Adjust `CLAUDE.md`.** Fill the bracketed fields (family/classroom name, working-outputs
   location) from a short interview. Leave the learner roster and status notes to populate as
   the work happens. Delete resolved bracket prompts.

3. **Fill `global-requirements.md`** with the user, or note that it is a starter to complete
   before the first build. The skill reads it on every build, so its constants (spelling,
   page size, cost rule, worldview defaults) should be real before producing documents.

4. **(Optional) warm the PDF engine.** The `classroom-pdf` MCP server installs its own
   dependency on first use, but you can pre-install so the first PDF is fast:

   ```bash
   bash "${CLAUDE_PLUGIN_ROOT}/scripts/install-deps.sh"
   ```

5. Confirm setup is done and summarise what exists. From here, normal classroom builds read
   `global-requirements.md` and the relevant `students/` file as usual.

## Notes

- If `${CLAUDE_PLUGIN_ROOT}` is not substituted on this host, locate the installed plugin
  directory (the folder containing this skill plus `templates/` and `mcp/`) and use it as the
  copy source.
- Learners are added later, not at setup: read `references/students/_template.md` for the
  fields and write `students/<name>.md`.
