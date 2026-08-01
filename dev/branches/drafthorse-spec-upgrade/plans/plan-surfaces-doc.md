# Plan: Surfaces Doc (surfaces.md)

Status: Ready. Sources: concepts 10 + 12, TODO 13. Decisions in [new-concepts-discussion.md](new-concepts-discussion.md) §10/§12, [todos-discussion.md](todos-discussion.md) §13.

## Decision

Rename `docs/drafthorse/framework/environments.md` → `surfaces.md`, titled "DraftHorse Surfaces". Catalogue format — each entry with a "when to use" appended. Entries: Main Skill File, Sub agent, Child Skills, Handover Documents. Hooks and MCP are out of scope (not DraftHorse-compatible surfaces; they stay in references.md's dynamic family). Answers the porting/delivery question: "where should this work live when converting to DraftHorse / what is the best way to deliver this skill?"

## Work

- `git mv` environments.md → surfaces.md; replace the stub comments with the catalogue. Seed content from the stubs: Main Skill File (exclusive work location, fully resolvable, invocable hub), Sub agent (preferred recipient; keeps main chat lean; guardrails enable cheaper models — absorbs the concept-10 guidance), Child Skills (parent-locked via description, own grants for branching/tool-heavy work — see [plan-child-skills.md](plan-child-skills.md)), Handover Documents (specialised mixin; progressive disclosure without divergence).
- State the child-steps vs Child-Skills distinction once (same parent/child relation, different surface).
- Optionally close with the extraction ladder: inline step → handover → child skill → independent skill/sub-agent.
- `docs/drafthorse/framework/conventions.md` — REMOVE the "Sub Agents" trailing bullet (line 57, including its "impactfull" typo) — its content moves here.
- `docs/drafthorse/framework/README.md` — list surfaces.md in the framework index.

## Dependencies

- Absorbs content from the conventions.md session (coordinate the Sub Agents removal with the other conventions plans — same file).
- [plan-child-skills.md](plan-child-skills.md) writes the Child Skills entry's substance — same session recommended.
- Not blocked by any discussion item; can lead the new-docs wave.
