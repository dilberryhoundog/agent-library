# Agent-Agnostic Documents

A document is **agent-agnostic** when any reader — any agent, any model, any person, in any future session — can fully resolve and act on it using only the document itself plus their own general knowledge. This page explains why documents produced from conversations routinely fail that test, and the strategies that prevent the failure.

## The problem

Many documents are written immediately after a discussion that shaped their requirements: a skill after a design conversation, a plan after thrashing out an approach, a README after a debugging session. When the author of the document is the same agent that held the discussion, the document inherits the discussion:

- shorthand and coined terms that were only ever defined in the chat
- narrative ordering that mirrors how the discussion unfolded rather than how the material is used
- the author's own reasoning and self-justification, addressed to a conversation partner who will never read the file
- references that only a participant can resolve

The document's real reader is a **blind reader**: a future agent or person who was not present in the originating conversation and receives only the file. Wherever the file leans on context that lived in the chat, the blind reader stalls, guesses, or invents. For documents that function as instructions — skills, plans, rules, specifications — a stall is a misexecution.

## Why code escapes this

Source code written after the same kind of discussion does not degrade this way, and the reason is structural, not disciplinary. Translating requirements into a programming language **forces reinterpretation**: conversation text cannot be pasted into a function body, so the author must extract what matters and re-express it under the language's hard constraints. Prose documents share a language with the conversation. Nothing forces the translation, so transcription — lightly edited conversation — is the path of least resistance.

The strategies below all work the same way: they deliberately recreate, for prose, the forcing functions that code gets for free.

## Two faces of contamination

Session contamination enters a document through two distinct doors:

1. **Insertion** — session content leaking in: coined terms, chat narrative, the author's reasoning, steering language meant for the original agent copied verbatim into an artifact a stranger will read.
2. **Omission** — context withheld: the author skips orientation and framing because their sense of "what goes without saying" was calibrated to the conversation partner, not to the future reader. A writer with no shared context includes the overview material; a writer mid-conversation skips it without noticing.

Insertion can be hunted — coined terms can be searched for, self-reference can be spotted. **Omission is invisible to the author by construction**: no one perceives the absence of something they do not perceive as missing. This asymmetry is why the strongest strategies rely on isolation and external review rather than authorial care.

## Why self-discipline fails

Two mechanisms defeat a well-intentioned author:

- **An author cannot audit its own portability.** Every reference that will strand a blind reader is perfectly resolvable to the author, who carries the session context. The test "could someone else follow this?" returns a false pass when the author runs it on itself.
- **Instructions lose to context.** Telling an agent to "write portably" places a sentence of guidance against an entire context window of transcript. The transcript wins. Constraints on *process* work; appeals to *attitude* do not.

## Strategies

The strategies form a ladder from lightweight to heavyweight. Pick by the document's stakes: everyday documents take the lightweight rungs; durable documents that many future readers will execute justify the full ladder.

### 1. Forced translation: thin summaries

Before writing, compress the conversation into thin, freshly-worded summaries — single-sentence points, no phrases copied from the discussion. The compression is the point: re-expressing each point in new words is the same translation step that protects code. Summarise the user's contributions (requirements, corrections, preferences) **separately** from the agent's contributions, keeping human steering distinguishable from generated bulk, and easy to approve or strike. Capture explicitly the shared understandings that "go without saying" — those are the omission candidates.

### 2. Licensed sources: write from the summary only

Declare the approved summary the **only licensed source** for the writing pass. The conversation above it is no longer source material; the human may continue steering with alteration requests after the summary. A structured summary placed late in the context, with the transcript de-licensed, approximates writer isolation at near-zero cost — recency and structure pull the writer toward it.

### 3. Writer isolation: a fresh agent and a brief

For durable documents, remove the transcript entirely: hand the summary (a *brief*) to a fresh agent that has never seen the conversation. An isolated writer **cannot leak context it does not have** — the protection is mechanical, not behavioral. The isolated writer also fixes omission: with no one to share context with, nothing goes without saying, so the orientation material gets written. A general-purpose agent suffices; the quality lives in the brief, not in writer specialisation.

### 4. Cold review: verification by a blind reader

Verify the draft with a reviewer that genuinely lacks the session context — only such a reader can detect what fails without it. Effective cold review has two parts:

- **Cold execution** — the reviewer attempts to *use* the document as its real reader would, reporting every point where it stalls, guesses, or invents.
- **Defect audit** — the reviewer checks each passage against named defect classes: session residue, transcribed conversation, author self-reference, ambiguous language in executable text, usage instructions embedded in the body, audience mismatch, missing environmental facts.

A dedicated reviewer with these instructions as its permanent role outperforms ad-hoc self-review, and is reusable on any document from any source.

### 5. Closed-loop revision

Route review findings back to the isolated writer (brief + draft + findings), not to the conversation-holding agent. Direct edits by the agent that held the conversation reopen the door the pipeline closed.

## Choosing the weight

- **Comments, commit messages, small edits** — no process; a standing rule suffices: state only durable facts the artifact cannot show, never narrate the session.
- **Everyday documents** — strategies 1 and 2: summarise thinly, get approval, write from the summary only.
- **Durable, repeatedly-executed documents** (skills, rules, specifications, plans handed to others) — strategies 1 through 5: brief, isolated writer, cold review, closed-loop revision.

The common thread across every rung: **never trust the author's sense of what is obvious.** Force the translation, restrict the sources, and let a reader who was not there tell you what is missing.
