# Surfaces

A surface is where a document's work is delivered. Four surfaces are DraftHorse-compatible. Each entry below carries what the surface is, how it behaves, and what makes work belong on it.

Child steps and child skills share the parent/child relationship and differ only in surface: child steps are folded into the parent's run by a handover, child skills are invoked by a parent step and run in their own context.

## Skill File

The master work location — the document that holds the happy path procedure and routes to everything else.

It is a surface that must be fully resolvable on its own: every other surface is reachable from it, so a reader holding this file can reach the whole procedure. It is the invocable hub, the front door a user or an agent enters.

**Use it for** consistent work needing execution on every run (the happy path), orchestrating larger work patterns, where conversation context is important.

## Sub Agent

The agent file *is* a full-featured DraftHorse document — global invariants, references, steps, and terms, written with agent frontmatter (`tools`, `model`, `background`).

A sub agent runs in its own context and returns a result, which keeps the main chat lean: the procedure's traffic never enters the conversation the user is working in. Because the surface names its own model, a document with strong DraftHorse guardrails can run on a cheaper model than the calling conversation — a document that routes itself needs less of the model's judgment.

**Use it when** the caller wants the result and not the transcript: (token-heavy searching, noisy mechanical output, or an independent judgment returned as a verdict, read-only work)

## Child Skills

A skill locked to a specific parent — a usage pattern, not a document variant. There is no `type: child` and no separate scaffold; a child skill is an ordinary DraftHorse skill written so that only its parent calls it.

The lock is written into the description: state plainly that the skill is not for general use and name what invokes it. Where the harness offers a hard lock, combine it with the field that fits the skill's role — `user-invocable: false` for a skill only a calling agent may enter, `disable-model-invocation: true` for one only the user may open.

A child skill carries its own `allowed-tools`, and those grants arrive at the moment of invocation. This is the surface's purpose: the parent deliberately does not hold the permissions, and each child holds only the narrow set its own procedure needs.

**Use it when** the parent must not hold the grants the work requires.

## Handover Documents

A specialised mixin file. A handover is a `harness-format: DraftHorse, Handover` document whose steps a parent step folds into the run as child steps, sharing the parent's context and inheriting its permissions. Its work sits wholly inside the parent step's start and finished conditions (see [Handover](handover.md)). This is progressive disclosure for steps — conditional or heavy work leaves the parent file without leaving the framework.

**Use it when** the work is conditional, it needs the parent's live context, and it needs no grant the parent lacks:
(first-run setup, an alternate run mode, a fallback when a tool is unavailable, a branch that fires only when the build includes media).
