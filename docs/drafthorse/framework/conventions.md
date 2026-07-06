# Conventions

The other layers say what the tools are; conventions say how to wield them well. This is a flat, open bucket — laws and idioms together, all equal. More may be added over time, and how much any one weighs is decided in use, not ranked here. Each entry is a rule paired with the test that makes it actionable.

- **Single source of truth, everywhere** — every unit (global or step invariant, step, reference, term) is standalone; no meaning or context is duplicated across units. One fact, one home, so a change is a one-place edit.
- **Every step has a completion criterion** — a step is not done until its exit condition is met and stated. No step trails off. (See [steps.md](steps.md).)
- **Resolve all branches** — identify and close every path through the document, including error and failure handling. No dangling edge.
- **No logic in References** — the data segment carries context only; logic lives in steps.
- **Description is invocation-shaped** — a model-invoked document takes an agent-facing description that sells the usage and states its trigger conditions; a user-invoked document takes a short user-facing summary, kept out of agent context. Write each frontmatter field for whoever actually reads it.
- **Inline vs external references** — compact and always-relevant context goes inline; expansive and sometimes-relevant context goes external.
- **Remove no-ops** — never restate what the agent already does by default. The test for every line: does it change behaviour? If not, cut it.
- **Improve over time** — when a document reveals a gap mid-run, drop an issue on the repo to fix it in real time.
