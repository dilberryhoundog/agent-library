# Terms

The FlightDeck vocabulary. Each entry gives the word and its meaning; where the sentence that coined it says more than the definition, it follows in quotes. Use these words in skills, prompts, file names and prose. When a build needs a word not listed here, add it to `docs/flightdeck/terms.md` in the agent-library repository; where that file is out of reach, define the word at first use in the document being built.

## The family

- **FlightDeck** — the family: shell, conventions, profiles, the skill that builds them, and every document built. One capitalised compound when naming the family or the skill.
- **flightdeck** — any one document in the family, and the trigger word that loads the skill. Lowercase in prose, slugs, paths and invocations. Spoken with its kind in front: review flightdeck, interview flightdeck, demo flightdeck.
- **kind** — the word spoken in front of *flightdeck* that says what the document is for: review, interview, options, demo. A kind belongs to one profile; the kinds named so far are listed under the readout profile below, plus demo.
- **profile** — the shape a flightdeck takes: how long it lives, whether it holds state, what it returns. Three profiles: instrument, readout, demo. Profile words appear in documentation and the skill; in speech the kind plus *flightdeck* is enough. Detail in [Profiles](profiles.md).
- **instrument** — a durable flightdeck a person opens repeatedly and operates; keeps its own state in the file; returns whatever it composes. Prompt builder is one.
- **readout** — a flightdeck built once for one task, answered card by card, returning a return prompt.
- **demo** — a flightdeck, or a fragment placed inside another flightdeck, that shows some functionality working in isolation; holds no state, returns nothing. "Build a demo for me, so I can see it operating."
- **page** — an ordinary word for any document an agent produces. It names no family and triggers nothing.
- **artifact** — a page published through the claude.ai Artifact tool. "Build a review artifact" asks for a shareable published page.

## Structure of a flightdeck

- **shell** — the one HTML file every flightdeck starts from. Carries all the styling, layout and scripting decisions; the agent copies it and adds content.
- **page template** — a per-kind file of content exemplars, styles and scripts. The agent opens the shell copy first and adds the template's parts into it.
- **card** — a unit of decision or review. A flightdeck is answered card by card.
- **return prompt** — the automatically composed prompt the person returns to the agent, carrying their decisions and comments.
- **active link** — a link on a card back to the file or location the card is about, opening the original for checking.
- **mock** — a numbered throwaway version of a flightdeck used to settle design before building; the number is dropped from the file name when the design settles.
- **probe** — a tiny page that reports what the browser can do.
- **text-db** — the JSON data blocks inside a flightdeck's own HTML that hold its options and saved items.

## Kinds of readout

Kinds are open; these are the ones named so far.

- **review** — the agent's work or findings, one card each, answered with a verdict and a comment.
- **discovery** — broad findings from an investigation, for perusal and approval.
- **plan** — proposed structure or fixes, with comment, approval and copy functions.
- **interview** — the agent asks a series of questions, answered in place.
- **options** — choices to pick from, with a recommendation and room for comments.
- **issue breakdown** — core issue, investigation results, additional comments.

## Prompt builder

Prompt builder is the first instrument, at `extensions/artifacts/prompt-builder/prompt-builder.html` in the agent-library repository. Its vocabulary is FlightDeck vocabulary because the instrument is the reference for the profile.

- **prompt builder** — the local HTML instrument that composes Claude Code prompts.
- **builder** — a prompt generation unit that, combined with other builders, produces a complete prompt. Focuses on a single domain.
- **write builder** — a builder where the person types prose.
- **choose builder** — a builder where the person picks from option lists.
- **display key / agent value** — the option model of a choose builder: the person sees a short key on a button; the prompt receives the long value.
- **loadout** — a complete exported set of builder options, keys, values, order and visibility. Importing a loadout replaces the current one whole.
- **recipes** — saved, reusable premade prompts, kept in their own tab.
- **utilities / utility prompt** — a tab of premade housekeeping prompts, including the prompt that instructs an agent to update the instrument itself.
- **launch / claude launcher** — a tab that composes a `claude` terminal command from flags and presets, for pasting into a terminal.
- **edit mode / edit in place** — a mode where the person edits the instrument's own data from the instrument: options, keys, values, order.
- **deliverable / nested deliverables** — an output of an agent run (a review, an implementation plan, an artifact) that a process stage can carry.
- **process chain / stage / user gate** — the ordered stages of an agent run, with gates where the person approves before the next stage.
