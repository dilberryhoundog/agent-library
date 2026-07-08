---
name: agent-agnostic
description: Write with higher quality and avoid the pitfalls when creating or reviewing documents. Use when writing or reviewing a document (skill, rule, plan, spec, README, CLAUDE.md, code comment).
---

# Agent-Agnostic Documents

Create **agent-agnostic** documents, resolvable by **any agent, in any session**.

- **Any agent** — portable across models. Generic and universal in nature.
- **Any session** — written to transcend the originating session. The reader is a **blind agent**: it has no knowledge of the originating session's context, buzzwords, interpretations, conversational flow, or user guidance.

**The master test:** every passage must be resolvable from the document itself plus the reader's inherent knowledge. Nothing may depend on unstated session context.

## Audience

Understand the intended audience — **Agent** or **Human**. If it is not clear, find out: ask the user, or ask yourself "who am I writing this for?" Calibrate the output to that audience's expected ability to parse and understand the document.

## Type

Is the document executable, instructional, or informational? This guides the language. Executable docs (skill.md, CLAUDE.md, plans) demand the most precision — see _Language as code_ below.

## Common pitfalls

Avoid and consider these areas to improve the quality of your documents.

### Interpretation of the chat flow

Do not copy the chat discourse directly into the document. The job is to **interpret** the discourse into a universally applicable document suitable for a blind agent.

### Self-referencing

Do not reference your own choices and proposals that the user has not approved. Providing your 'reasoning' and 'thinking' is also self-referential.

### Context source

Do not read the whole transcript as one unified source. Agents saturate discourse with the bulk of the output, leaving the user's steering and instructions undervalued as context. Prioritise user discourse over agent discourse.

### Language as code

Commonly documents are de facto code files (executable). Their language should not be ambiguous; each word chosen needs universal meaning, so agnostic agents interpret it identically and execution stays consistent.

### Self-contained instructions

Including the document's own usage instructions in its body ("read this when...") is counterproductive. Those belong **upstream** — in the loader, frontmatter, or index that decides when the document is read — not inside the document.

## Strategies for success

A toolset. Apply any or all of these to help write higher-quality documents — pick what fits the document and the moment.

### Ask questions

Have a quick discussion about any or all of these before creating:

- The audience?
- Whose context source may be more relevant to the document?
- The type — executable, instructional, informational?

### Scaffold

Scaffold the document very concisely, in shorthand. Ask the user if this is what they expected and fold in adjustments. Then expand the scaffold into a high-quality document.

### First draft

In larger or more complex documents, leave your reasoning for including each passage inline as a first draft — in special formatting such as a `<!-- comment -->` under each section or decision. Invite the user to discuss the comments. Once resolved, strip them all.

## Reviewing a document

When auditing an existing document rather than authoring one, the _pitfalls_ above are the lens. Read each passage against the master test and flag anything that relies on unstated session context, copies discourse rather than interpreting it, references the agent's own unapproved reasoning, uses ambiguous language in an executable doc, or embeds its own "read when" usage instructions.

## Common document / prose types

- **Markdown** — the primary language of AI agents and the backbone of agent harnesses; a major use case needing highly structured, agnostic documentation.
- **Code comments** — a frequent trouble area: agents record their choices and reasoning in code without realising the writing is not agnostic. Not a suitable medium for the _Strategies for success_ toolset.
- **Plans** — written right after a session thrashing out the details, but almost always executed later by a blind agent, so they must be fully agnostic.
