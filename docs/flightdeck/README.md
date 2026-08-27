# FlightDeck

A **flightdeck** is a single self-contained HTML file an agent builds for a person to operate: read the agent's work, answer it card by card, and hand a prompt back. The family is written **FlightDeck** when named; any one document is a **flightdeck**. The word is also the trigger: "build a review flightdeck" loads the shell and these conventions, where "build a review page" would not.

This folder is the reference for the family: vocabulary, principles, the three profiles, and where a flightdeck lives and how it reaches its reader. The shell's markup, storage and verification belong to the FlightDeck skill, `extensions/skills/flightdeck/`. Until that skill is built, its working name is `artifact-suite` and its plan lives in the `artifacts` workspace.

## Read in this order

1. **[Terms](terms.md)** — the vocabulary.
2. **[Conventions](conventions.md)** — the rules every flightdeck answers to.
3. **[Profiles](profiles.md)** — the three shapes a flightdeck takes: instrument, readout, demo.
4. **[Organisation](organisation.md)** — where each profile lives, which directory a readout lands in, and how a flightdeck is delivered.

## Three sentences that tell the family apart

- "Build a review" — a markdown document.
- "Build a review artifact" — a page published through the claude.ai Artifact tool.
- "Build a review flightdeck" — a local HTML file on the FlightDeck shell, answered in place, returning a prompt.

## What the family is for

These hold for every flightdeck built.

- A flightdeck is a place to work with an agent, standing in for the chat window and for markdown documents.
- A flightdeck is a turn in the conversation: the person can always return to the agent with a prompt that progresses the context.
- An agent builds flightdecks repeatedly with consistent features and styling, and supplies only content.
- An instrument reaches into the agent harness: it composes prompts, launches and resumes sessions, and updates itself.
- A flightdeck is a plain local HTML file. Publishing it is out of scope for the family.
