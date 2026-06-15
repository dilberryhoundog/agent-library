# Creating Symlinks

Asset sources live under `extensions/` (e.g. `extensions/agents/`, `extensions/skills/`), so a symlink from inside a plugin climbs three levels to the repo root, then descends into `extensions/`.

**File Symlink**

```bash
ln -s ../../../extensions/agents/File.md ./plugins/plugin_name/agents/file.md
```

**Folder Symlink**

```bash
ln -s ../../../extensions/skills/folder ./plugins/plugin_name/skills/folder
```
