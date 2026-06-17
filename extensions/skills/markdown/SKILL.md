---
name: markdown
description: Produce a durable, agent-agnostic markdown document — skill, spec, README, CLAUDE.md, rule, or guide — through a user-controlled scaffold. Catalogue the conversation into a toggleable chat summary, propose a heading structure with tuning comments, write the prose, then strip the scaffolding. Use after a requirements discussion when about to create or draft any markdown document.
---

# Markdown

Build a markdown document through one file — the scaffold — that begins as a structured catalogue of the conversation and is shaped, phase by phase, into the finished document.

## Agent Invariants

- **Expand, never transcribe.** Each `+` item is a flag pointing at something the conversation said. Write by recovering that conversation and expanding it into full prose; never copy an item's own wording into the document.
- **Write in scope.** Under any heading, draw only on the items placed beneath it.
- **Place every item.** Each `+` item must appear somewhere in the scaffold; reuse one under more than one heading when the document needs it.
- **Say it once.** Never repeat under a lower section what a higher section already states.
- **Meta comment leads.** The first comment under each heading is its meta comment, marked `===META===`; it fixes that section's depth and format.
- **Headings carry no toggles.** The user adds, removes, and reorders headings by hand.
- **Strip last.** Write first and strip last, so the prose can be checked against the comments it came from.

## Agent-agnostic documents

Write the document to be agent-agnostic: resolvable by any agent, any model, in any future session, from the file alone. The reader will not have the conversation that produced it, so anything that lived only in the chat and never reached the file is invisible to them — write so the file stands without it.

## The scaffold

The scaffold is the single file in play from start to finish: it opens as a catalogue of the conversation and becomes the finished document. It moves through four phases in order:

1. **Chat summary** — catalogue the conversation as toggleable items.
2. **Doc summary** — propose the headings and attach comments to each.
3. **Write** — expand the comments into prose.
4. **Strip** — remove the scaffolding, leaving the document.

### Phase 1 — Chat summary

The chat summary is a catalogue of everything the conversation surfaced, written as an HTML comment at the top of the scaffold — hidden frontmatter that never renders and is removed at the strip. Put each point on its own line under one of five sections, and include a section only when the conversation gave it real content:

- **conversation** — what the user and the agent each said.
- **agent context** — inclusions the agent proposes that were never raised: recommended, possible, edge cases.
- **meta** — steering, decisions, and constraints.
- **language** — terms to define or avoid, and notes on style.
- **audience** — who reads the document, and to what end.

Prefix every line with a toggle. `+` marks content the document will talk about; `-` marks content that mattered in the conversation but stays out of the document. Set the toggles on the first pass, then let the user flip them. In the language section, a `+` term is one to define and a `-` term is one to avoid. List each point once — never repeat under a lower section what a higher section already covers. Lean toward `-` for most of the meta section: steering is usually direction for the agent, not content, and importing it into the document tends to degrade it.

### Phase 2 — Doc summary

With the chat summary settled, propose the document's structure: lay out the headings the `+` items imply, then attach comments under each heading. Two kinds of comment do the work:

- A **meta comment** comes first under a heading and is marked `===META===`. It sets that section's prose depth and format — for example, `<!-- ===META=== one short paragraph; no list -->`.
- An **item comment** carries a single `+` item from the chat summary, copied verbatim, one per line — for example, `<!-- + emit JSON Lines, not a single JSON array -->`.

Place every `+` item under some heading, reusing one under more than one heading when the document needs it. Wrap coined terms in `:colons:` — for instance `:scaffold:` — so they stand out while scanning the comments. Put no `+`/`-` toggles on headings; the user adds, removes, and reorders headings by hand. Gather the conversation's hard must-do and must-avoid rules into an **Agent Invariants** heading near the top, restating them even where they also appear under a phase.

### Phase 3 — Write

Write one heading at a time. Treat each item comment as a flag, not a sentence: return to what the conversation said about it and expand that into prose at the depth and format the meta comment asks for — never paste the item's own wording into the document. Draw only on the items under the heading being written, and leave every comment in place; this phase adds prose, nothing else.

### Phase 4 — Strip

With the prose written, take the scaffolding out — but offer the review first.

1. Offer to review each section against the original chat summary items, calling out any inconsistency: a `+` item that never reached the prose, or prose that drifted from what its items flagged.

After the review — or straight away if the user declines it — offer three ways to remove every comment. The chat-summary block and all item and meta comments are HTML comments, so a single pattern clears them all:

2. In an editor, enable regex search, find `<!--[\s\S]*?-->`, and replace with nothing.
3. On the command line: `perl -0pi -e 's/<!--.*?-->\n?//gs' path/to/document.md`
4. Or offer to run that command directly.

What remains is the clean, comment-free document.

## Example

See `references/example.md` for a complete scaffold, stopped at the end of Phase 2, to imitate.
