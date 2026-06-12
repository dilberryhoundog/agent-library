---
name: create-documents
description: Pipeline for producing durable, agent-agnostic documents (skills, plans, specs, READMEs, CLAUDE.md files, rules). This skill should be used after a requirements discussion with a user, when an agent is about to create a new skill, spec, README, CLAUDE.md file, or rule, or when reviewing a plan about to be executed or any existing document.
---

# Create Documents

This skill provides a pipeline for producing durable documents that are agent-agnostic. A document is "agent-agnostic" when it is resolvable and executable by any agent, any model, in any future session, using only the document itself plus the reader's inherent knowledge — never the conversation that produced it.

## Core Problem

A document written directly by the agent that held the requirements conversation inherits that conversation's shorthand, its narrative flow, and the author's own reasoning. Such a document is unresolvable to its real future reader: a "blind agent," defined as a reader with no access to the conversation that produced the document. The blind agent receives only the file. Anything that lived in the conversation and not in the file is invisible to it.

## Core Mechanism

The agent that held the conversation does not write the document. That agent extracts a "brief," defined as a self-contained handoff specification, and a fresh subagent with no access to the conversation transcript writes the document from the brief alone. Writer blindness is mechanical protection: a writer cannot leak conversation context it does not have.

## Tier Routing

Determine the artifact before starting the pipeline. Route by these three cases, in order:

1. Code comments, commit messages, and small edits: do not run the pipeline. A separate standing comment rule covers these.
2. A plan about to be executed, or any document that already exists: do not run the full pipeline. Invoke the `doc-reviewer` agent directly on it. This is review only.
3. A new skill, spec, README, CLAUDE.md file, or rule: run the full pipeline below, starting at Step 1.

## Step 1: Extract the Brief

Build the brief from the conversation. Re-read the user's messages specifically: user discourse is high-trust steering, while the agent's own prior output is low-trust bulk. Weight the brief toward what the user said.

The brief must be fully self-contained. Anything absent from the brief does not exist for the writer. The brief has exactly ten items:

1. **Purpose** — what the document is for.
2. **Audience** — whether the reader is an agent or a human, and the reader's knowledge level.
3. **Type** — one of: executable (a procedure followed step by step), instructional (guidance applied with judgment), or informational (reference material).
4. **Requirements** — stated as requirements the document must satisfy, not as a recap of who said what.
5. **Key decisions** — the decisions made, including the rejected alternative for any decision where that rejected alternative constrains future edits.
6. **Non-goals and rejected alternatives** — what the document must not do and which alternatives were rejected. Without these, the blind writer will competently reinvent rejected ideas.
7. **Vocabulary ledger** — every term coined during the discussion, each either defined or marked do-not-use. Coined terms are the most common leak vector, because the brief itself can smuggle conversation shorthand.
8. **Environmental facts** — file paths, tool names, commands, and target-format conventions. Anything absent here does not exist for the writer.
9. **Concrete examples** — at least one worked example. One good example steers a writer harder than five requirement bullets.
10. **Goal-check** — an executable acceptance test phrased for a blind reader, for example: "An agent given only this document and the prompt '...' should produce ...". This goal-check is handed to the reviewer in Step 3.

Show the brief to the user for sign-off before writing, unless the user has already said to proceed.

## Step 2: Blind Write

Spawn a general subagent through the harness's agent mechanism. The subagent has fresh context and no access to the conversation transcript. Where the harness supports model selection, specify a mid-tier model (Opus or Sonnet class): writing from a complete brief is constrained composition and does not require the strongest available model. Leave the reviewer in Step 3 on the session's default model.

Pass the writer three things:

1. The full brief from Step 1.
2. The file path of one exemplar document of the same type.
3. The style block below, verbatim.

Style block to pass verbatim:

> - Write in imperative, verb-first form, not second person.
> - Define every term introduced at first use.
> - Do not reference the author's own choices or reasoning.
> - Do not include usage instructions in the body; usage instructions belong in frontmatter only.
> - Do not use ambiguous words such as "appropriately", "as needed", or "properly".
> - If any brief item is ambiguous or undefined, return questions instead of producing a draft.

The last style rule is the bounce rule. A "bounce" is the writer returning questions instead of inferring.

Handle a bounce by amending the brief and re-invoking the writer with the amended brief. Never answer a bounce inline: the brief is the single source. Each bounce is a detected contamination — a brief item that relied on conversation context rather than standing on its own.

The documents this pipeline produces are markdown.

## Step 3: Blind Review

Invoke the `doc-reviewer` agent. Pass it two things:

1. The file path of the draft.
2. The goal-check from the brief.

Route the reviewer's findings back to the writer subagent: re-invoke the writer with the brief, the draft, and the findings. Never apply the findings as direct edits. Direct edits by the agent that held the conversation reintroduce the contamination this pipeline exists to prevent.

Loop Step 2 and Step 3 until the reviewer's verdict is pass.

## Post-Extraction Roles

After extracting the brief, the agent that held the conversation has exactly three roles:

1. Courier between writer and reviewer.
2. Brief-amender on bounces.
3. Presenter of the finished document to the user.

The agent that held the conversation does not write the document and does not edit the draft.
