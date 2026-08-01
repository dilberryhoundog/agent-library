# User Configuration

How a plugin collects values from the user and delivers them to its components. This is plugin wiring, declared in `plugin.json` — a skill or agent receives the result and declares nothing.

`docs/claude_docs/plugin_reference.md` is the source of truth for this mechanism (see its `userConfig` and variable-substitution sections). That file is vendored upstream material; where it and this page disagree, it wins. This page is the condensed slice that matters when authoring plugins in this repository.

## Declaring

Values are declared in the plugin's `plugin.json` under `userConfig`. Claude Code prompts the user for them when the plugin is enabled.

## Substituting

`${user_config.<key>}` is the substitution form. It resolves in four places:

- MCP server configs
- LSP server configs
- hook commands
- monitor commands

Non-sensitive values additionally resolve in skill and agent **content** — the body, where a document's references and steps live. Frontmatter is not a substitution surface, on any component.

## Sensitive values

A value declared sensitive never reaches document prose. It goes to the system keychain and is reachable only by a plugin subprocess — an MCP server or a hook — through `${user_config.<key>}` in that subprocess's own config, or through the exported `CLAUDE_PLUGIN_OPTION_<KEY>` environment variable.

## Scope

Plugin-only. A standalone skill installed outside a plugin has no `userConfig` to draw on.
