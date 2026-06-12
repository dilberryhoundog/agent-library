---
name: create-documents
description: Pipeline for producing durable documents (skills, plans, specs, READMEs, CLAUDE.md, rules) that are agent-agnostic - executable by any agent in any future session. Use when creating a document after a discussion has shaped its requirements, or when a document must outlive the current session.
---

# Create Documents

Durable documents are agent code: they are executed later, by a blind agent — any model, any session, no access to this conversation. A document written directly from a long discussion inherits the discussion's shorthand, narrative flow, and the author's own reasoning, and becomes unresolvable to its real reader.

The countermeasure is mechanical, not advisory: the agent that holds the conversation does not write the document. It extracts a brief; a fresh subagent that has never seen the conversation writes from the brief alone. Blindness in the writer is the mechanism — a writer cannot leak context it does not have.

## When to use which path

- **Code comments, commit messages, small edits** — no pipeline. Follow the standing comment rule; a comment states a constraint the code cannot show, never narration of the change or the session.
- **Plans about to be executed, or any existing document** — review only. Skip to Step 3 and invoke the `doc-reviewer` agent directly on the document.
- **New skills, specs, READMEs, CLAUDE.md files, rules** — full pipeline below.

## Step 1 — Extract the brief

Build a brief from the conversation. Re-read the user's messages specifically: user discourse is high-trust steering; the agent's own output is low-trust bulk. The brief must be self-contained — the writer has nothing else.

The brief covers:

1. **Purpose** — what the document is for, in one or two sentences.
2. **Audience** — agent or human, and expected knowledge level.
3. **Type** — executable, instructional, or informational. Executable demands the most precision.
4. **Requirements** — every behavior or content item the document must contain. State each as a requirement, not as a recap of who said what.
5. **Key decisions** — what was decided, including over what alternative when that constrains future edits ("X, not Y — Y breaks under Z").
6. **Non-goals and rejected alternatives** — what was considered and excluded. Without this the blind writer will competently reinvent the rejected ideas.
7. **Vocabulary ledger** — every term coined or repurposed during the discussion, either defined for the writer or marked "do not use". Coined terms are the most common leak: the brief itself can smuggle session shorthand into the clean context.
8. **Environmental facts** — file paths, tool names, commands, target-format conventions (e.g. skill frontmatter fields). Anything not in the brief does not exist for the writer.
9. **Examples** — concrete input/output examples surfaced in discussion. One good example steers a writer harder than five requirement bullets.
10. **Goal-check** — an executable acceptance test, phrased for a blind reader: "an agent given only this document and the prompt '...' should produce ...". This is handed to the reviewer in Step 3.

Show the brief to the user for sign-off before writing, unless the user has asked to proceed without review.

## Step 2 — Blind write

Spawn a **general subagent** (fresh context, no transcript access) with:

- the full brief,
- the path of one exemplar document of the same type to imitate (for a skill, a known high-quality SKILL.md),
- the style block below, verbatim.

Style block for the writer prompt:

> Write in imperative form, verb-first, not second person. Define every term you introduce at first use. Do not reference your own choices or reasoning. Do not include usage instructions ("read this when...") in the body — those belong in frontmatter. Every instruction must be executable identically by any agent: no "appropriately", "as needed", "properly". If any brief item is ambiguous or depends on something the brief does not define, do not infer — return your questions instead of a draft.

Handle bounces: when the writer returns questions, answer them by **amending the brief** and re-invoking. Each bounce is a contamination detection — a brief item that relied on session context. Do not answer questions inline in chat and paste the answer; the brief is the single source.

## Step 3 — Blind review

Invoke the `doc-reviewer` agent with the draft's file path and the goal-check from the brief. The reviewer executes the document cold and audits it against the agnostic-document defect classes.

Route findings **back to the writer subagent** — brief + draft + findings — not into direct edits by the conversation-holding agent. Direct edits reintroduce the contamination the pipeline exists to prevent. Repeat write/review until the verdict is `pass`.

The conversation-holding agent's only roles after extraction: courier between writer and reviewer, brief-amender on bounces, and presenting the result to the user.
