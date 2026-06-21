# Versioning Config

Read by the versioning skill (dev-tools plugin). Defines this repository's versioned units.

Only plugins are versioned. Repository-root files (docs, rules, marketplace listing) have
no release consumers; their history lives in git alone.

## Path resolution rule

Plugins symlink their skills and agents from the asset library (`extensions/skills/`,
`extensions/agents/`). Git
records content changes against the symlink targets, so compute each unit's paths at
runtime: the plugin directory plus the repo-relative target of every symlink inside it
(`find plugins/<name> -type l`, resolve each with `readlink`). Never filter history by the
plugin directory alone.

## Units

### chat-tools
- paths: plugins/chat-tools plus resolved symlink targets
- manifest: plugins/chat-tools/.claude-plugin/plugin.json (field: version)
- changelog: plugins/chat-tools/CHANGELOG.md
- tag: chat-tools/v{version}
- github-release: yes

### classroom
- paths: plugins/classroom plus resolved symlink targets
- manifest: plugins/classroom/.claude-plugin/plugin.json (field: version)
- changelog: plugins/classroom/CHANGELOG.md
- tag: classroom/v{version}
- github-release: yes

### custom-agents
- paths: plugins/custom-agents plus resolved symlink targets
- manifest: plugins/custom-agents/.claude-plugin/plugin.json (field: version)
- changelog: plugins/custom-agents/CHANGELOG.md
- tag: custom-agents/v{version}
- github-release: yes

### dev-tools
- paths: plugins/dev-tools plus resolved symlink targets
- manifest: plugins/dev-tools/.claude-plugin/plugin.json (field: version)
- changelog: plugins/dev-tools/CHANGELOG.md
- tag: dev-tools/v{version}
- github-release: yes

## Notes

- The marketplace listing in `.claude-plugin/marketplace.json` is independent of
  versioning: a plugin may be versioned here without being listed there (and vice versa
  for plugins hosted in other repositories). Versions live only in each plugin's
  `plugin.json`.
