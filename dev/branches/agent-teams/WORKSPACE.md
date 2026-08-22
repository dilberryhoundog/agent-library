# WORKSPACE.md

Branch workspace context for Claude and humans. Not read by the dev-workspace script.

*Load into Claude's context with: `@dev/workspace/WORKSPACE.md`*

## Branch

**Name:** agent-teams
**Started:** 2026-08-19
**Status:**

- [x] In Progress
- [ ] Discard (workspace and branch abandoned)
- [ ] Complete (ready to merge)

Long-lived branch. Every agent-team build lands here so context and prior work accumulate in one workspace.

## Purpose

Build reusable multi-agent team tooling. First job: convert the two one-off DraftHorse corpus workflows in `.claude/workflows/` into a generic corpus sweep tool that survives any future DraftHorse refactor.

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

- The 16 corpus-sweep briefs the current workflows depend on live only in the archive: `dev/branches/drafthorse-corpus-sweep/tasks/corpus-sweep/`. Neither script would run on any other branch.
- The sweep's model-tier history is recorded in `dev/branches/drafthorse-corpus-sweep/history/1480a71f_drafthorse-corpus-sweep-executed.txt`, including the tiering rule of thumb derived after the cost blowout.
