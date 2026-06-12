# Versioning Config

Read by the versioning skill (dev-tools plugin). Defines this repository's versioned units.

Plugins in this repository symlink their skills from the root `skills/` directory, so each
plugin unit owns both its plugin directory and the root directories of its symlinked
skills. When adding a symlinked skill to a plugin, add the skill's root path to that
plugin's unit and exclude it from the repository-level unit.

## Units

### chat-tools
- paths: plugins/chat-tools skills/magic-reply skills/conversation-capture
- manifest: plugins/chat-tools/.claude-plugin/plugin.json (field: version)
- changelog: plugins/chat-tools/CHANGELOG.md
- tag: chat-tools/v{version}
- github-release: yes

### custom-agents
- paths: plugins/custom-agents
- manifest: plugins/custom-agents/.claude-plugin/plugin.json (field: version)
- changelog: plugins/custom-agents/CHANGELOG.md
- tag: custom-agents/v{version}
- github-release: yes

### dev-tools
- paths: plugins/dev-tools skills/versioning
- manifest: plugins/dev-tools/.claude-plugin/plugin.json (field: version)
- changelog: plugins/dev-tools/CHANGELOG.md
- tag: dev-tools/v{version}
- github-release: yes

### agent-library (repository-level unit)
- paths: `. ':!plugins' ':!skills/magic-reply' ':!skills/conversation-capture' ':!skills/versioning'`
  (git pathspec: everything not owned by a plugin unit)
- manifest: none (tags are source of truth)
- changelog: CHANGELOG.md
- tag: v{version}
- github-release: yes

## Notes

- The marketplace listing in `.claude-plugin/marketplace.json` is independent of
  versioning: a plugin may be versioned here without being listed there (and vice versa
  for plugins hosted in other repositories). Versions live only in each plugin's
  `plugin.json`.
