# Plan: Config Wiring

Status: Ready. Sources: TODO 6. Deferral recorded in [todos-discussion.md](todos-discussion.md) §6; settled here.

## Decision

**Config wiring is not a frontmatter concept.** The premise the TODO was built on — "frontmatter is merely where the wiring is declared" — is false. Established from `docs/claude_docs/plugin_reference.md` (the authoritative reference vendored in this repo):

- User configuration is declared in **`plugin.json`** (`userConfig`), a file that is not a DraftHorse document. Claude Code prompts the user for the values when the plugin is enabled (line 528).
- `${user_config.*}` substitutes in **MCP and LSP server configs, hook commands, and monitor commands**; non-sensitive values also substitute in **skill and agent content** — the body (line 561). **Frontmatter substitution is documented nowhere, on any surface.**
- So the mechanism gives no reason to file it under frontmatter. The bullet's murk ("user configuration is fed into the document's *commands*") is a conflation: a SKILL.md has no command field; hook and MCP configs do. Config-substitutes-into-commands (true of hooks/MCP) was collapsed with skills-have-frontmatter, and the result filed under the skill's frontmatter.

**It is a dynamic reference.** Substitution lands in skill content — the body, where References and Steps live. That is runtime-produced context arriving in the document, which is references.md's dynamic family. New entry, named **"User configuration"** (named for what it brings in, matching data load / agents / hooks).

**Agnostic split**: the principle lives in the framework (config resolves before prose runs; a step receives a resolved value and never reaches for configuration), the `${user_config.*}` syntax and harness specifics live in surfaces.md — the doc [plan-surfaces-doc.md](plan-surfaces-doc.md) stands up for exactly this.

**Sensitive values are a framework principle**: substitution into skill/agent content is non-sensitive only. A secret goes to the system keychain and is reachable only by a plugin subprocess (MCP server, hook) via `${user_config.*}` in its config or the exported `CLAUDE_PLUGIN_OPTION_<KEY>` env var. Stated in the framework as: **a step never receives a secret as resolved prose**. The keychain/env-var specifics go to surfaces.md.

**The spec-check twin bullet (drafthorse-spec-check.md:60) is deleted.** Not deferred as a wording question: it sits under `Frontmatter Checks` and audits frontmatter for something that provably is not in frontmatter. Wave 4 decides only whether any References-side check replaces it. (Note the current asymmetry: scaffold.md's bullet is commented out while the spec-check's twin is LIVE — the saddler is auditing against a rule the framework does not state.)

## NEW problem found (report, do not improvise)

`references.md`'s dynamic-family description contradicts itself, and it is what made this concept hard to place:

- Shape sentence: "The family shares one shape: **the step invokes** a native capability and folds the result back in as context." That is *pull*, and it is **false for Data load** — a `!`command`` block is substituted by the harness before the agent reads any prose; the step invokes nothing. It is equally false for User configuration.
- The very next sentence is the accurate one: "the unifying trait is **runtime-produced context**, not a fixed list."

Recommendation: fix the shape sentence to match the trait sentence, so the family is defined by runtime-produced context rather than by an invocation shape only some members have. Belongs to the same references.md pass.

## Work

- `docs/drafthorse/framework/scaffold.md` — DELETE the commented-out "Config wiring" bullet and its TODO wrapper (line ~23); "Four concerns live here" becomes three (identity, permissions, invocation surface). Runs in the scaffold.md session with [plan-utilities-term.md](plan-utilities-term.md).
- `docs/drafthorse/framework/references.md` — add the **User configuration** dynamic-reference entry; fix the dynamic-family shape sentence (above). Runs in the notation.md session, which already owns references.md via [plan-reference-notation.md](plan-reference-notation.md).
- `docs/drafthorse/framework/environments.md` → surfaces.md — the `${user_config.*}` syntax, the four substitution surfaces, the sensitive/keychain/`CLAUDE_PLUGIN_OPTION_*` specifics, and the plugin-only caveat (a standalone skill outside a plugin has no userConfig). Owned by [plan-surfaces-doc.md](plan-surfaces-doc.md), wave 2.
- `docs/drafthorse/drafthorse-spec-check.md` — delete the line-60 bullet. Wave 4 only, via [plan-spec-check-saddler.md](plan-spec-check-saddler.md); never edited per-plan.

## Dependencies

- Feeds [plan-surfaces-doc.md](plan-surfaces-doc.md) (wave 2) — surfaces.md is the home for the mechanism.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (wave 4) — bullet deletion; replacement check optional.
- references.md edits must not collide with [plan-reference-notation.md](plan-reference-notation.md) — same file, same session.
- Field note (not framework work): nothing in this repo uses `userConfig` — no plugin.json here declares one. The capability is being documented, not a pattern in service. The first candidate use is issue #33's PAT-authenticated issue opener; the auth avenue is recorded at https://github.com/dilberryhoundog/agent-library/issues/33#issuecomment-5002310493.
