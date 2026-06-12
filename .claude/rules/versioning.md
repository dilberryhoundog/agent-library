# Versioning Config

Read by the versioning skill (dev-tools plugin). Defines this repository's versioned units.

## Units

### chat-tools
- paths: plugins/chat-tools
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
- paths: plugins/dev-tools
- manifest: plugins/dev-tools/.claude-plugin/plugin.json (field: version)
- changelog: plugins/dev-tools/CHANGELOG.md
- tag: dev-tools/v{version}
- github-release: yes

### agent-library (repository-level unit)
- paths: `. ':!plugins'` (git pathspec: everything except the plugins directory)
- manifest: none (tags are source of truth)
- changelog: CHANGELOG.md
- tag: v{version}
- github-release: yes

## Notes

- The marketplace listing in `.claude-plugin/marketplace.json` is independent of
  versioning: a plugin may be versioned here without being listed there (and vice versa
  for plugins hosted in other repositories). Versions live only in each plugin's
  `plugin.json`.
