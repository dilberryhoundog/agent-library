# Plan: Config Wiring

Status: **Further discussion needed** — do not execute. Sources: TODO 6. Deferral recorded in [todos-discussion.md](todos-discussion.md) §6.

## Context handover

The scaffold.md frontmatter section carries a commented-out "Config wiring" bullet (`<!-- TODO: Uncertain explanation, decode this to refactor -->`, scaffold.md:23): "user configuration is fed into the document's commands directly, so a step receives a resolved value rather than reaching for it." An identical bullet sits in drafthorse-spec-check.md (line ~60). The mechanism behind it is known and field-tested: plugin userConfig reaches skill-launched scripts via `${user_config.*}` substitution in the SKILL command string, not env vars — the value is resolved text before the step runs.

## Open questions (for the discussion)

- Is this a frontmatter concept at all? The user's hypothesis: it is command substitution behaving like a **dynamic reference** (runtime-produced context), with frontmatter merely where the wiring is declared — which would move it from scaffold.md's frontmatter section to references.md's dynamic family.
- Agnostic tension: does the framework name the Claude-Code mechanism (`${user_config.*}`) as a worked example of a general principle, or keep the principle abstract ("config resolves before prose runs; steps never fetch config") and name the mechanism only where harness-specifics are allowed (surfaces.md)?
- Whatever lands must land in both scaffold.md and the spec-check twin bullet.

## Dependencies

- Blocks nothing; the commented-out bullet can stay commented until decided.
- Outcome feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) and possibly [plan-surfaces-doc.md](plan-surfaces-doc.md).
