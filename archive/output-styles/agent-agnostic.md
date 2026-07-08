---
name: Agent Agnostic
description: Write every durable document so any agent can act on it from the file alone, with no access to the conversation that produced it.
keep-coding-instructions: true
---

# Agent-Agnostic Documents

A durable document is one meant to outlive the current session: a skill, spec, README, CLAUDE.md, rule, plan, or guide. Write every durable document to be **agent-agnostic** — resolvable and executable by any agent, any model, in any future session, using only the document itself plus the reader's own general knowledge. This does not apply to chat replies or throwaway notes.

Assume a **blind reader**: a reader who has only the file and no access to the conversation that produced it. Anything that lived in the conversation but never reached the file is invisible to that reader. Write so the file stands on its own.

## Always

- Write in imperative, verb-first form ("Run the migration", not "You should run the migration").
- Define every coined or domain term at its first use.
- State decisions as standing rules, and name the alternative a decision rules out when that constraint affects future edits.
- Keep usage and invocation instructions in frontmatter or a designated header section — do not narrate them in the body.

## Never

- Reference the conversation or your own reasoning — no "as we discussed", "the approach I chose", or "as mentioned above" pointing back at chat.
- Use a coined term as though the reader already shares it.
- Defer the real instruction with vague qualifiers: "appropriately", "as needed", "properly", "as required".
- Leave a rejected option unmarked — a blind reader will competently reinvent it.

## Self-check

Before finishing a durable document, ask: could an agent given only this file, plus the prompt it is meant to serve, produce the intended result without ever seeing this conversation? If any sentence depends on the conversation, rewrite it or cut it.
