# WORKSPACE.md

Branch workspace context for Claude and humans. Not read by the dev-workspace script.

*Load into Claude's context with: `@dev/workspace/WORKSPACE.md`*

## Branch

**Name:** artifacts
**Started:** 2026-08-19
**Status:**

- [x] In Progress
- [ ] Discard (workspace and branch abandoned)
- [ ] Complete (ready to merge)

Long-lived branch. Stays open across sessions; merges to main in increments rather than closing out.

## Purpose

Explore and build Claude Code Artifacts — published HTML and Markdown pages, their design patterns, runtime capabilities, and any skills, agents, or plugin assets this repository grows to support them. Assets land in `extensions/artifacts/`.

## Workflow

- [ ] Quick (direct implementation)
- [ ] Single plan (plan once, execute)
- [x] Multi-stage plan (iterative planning)

## Track Issues

- [ ] Track GitHub issues
    - <!-- Add issue numbers: #123, #456 -->

## Testing

- [ ] Requires testing
  > Update relevant tests as per testing strategy. All tests must pass before PR.

## Plans

If selected please read the file at the start of the session before starting work

- [ ] `dev/workspace/plans/prd.md`
- [ ] `dev/workspace/plans/architecture.md`
- [ ] `dev/workspace/context/discover.md`

## Discoveries

- %% Claude: record discoveries here as you work %%
- 2026-08-23 prompt-builder: `claude --effort` accepts only low/medium/high/xhigh/max; ultracode is its own boolean flag `--ultracode` (absent from `claude --help`, documented at code.claude.com/docs/en/settings-reference#ultracode). Presets use it; `ultracode` is also a prompt keyword, kept as an Execution strategy option.
- 2026-08-23 prompt-builder: browser edits are an overlay on the file's JSON blocks, fingerprinted against the file (`prompt-builder.base` in localStorage). A file edited on disk (e.g. by the "Update this tool" prompt) wins on reload and the overlay is discarded with a notice.
- 2026-08-23 prompt-builder: verify in a browser over http (Playwright blocks `file:`); `python3 -m http.server` from the repo root works, add a cache-busting query when reloading after edits.
