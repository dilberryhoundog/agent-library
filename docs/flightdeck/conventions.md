# Conventions

Every flightdeck answers to each of these. Where the sentence that set a rule sharpens it, the sentence follows in quotes.

## The exchange with the person

- **Always a return path** — every readout hands back a return prompt, and a copy control for it is mandatory. "Write a copy script into the doc so I can return here with any changes I want."
- **Comment and approve on every item** — each card takes a verdict and a comment. "Make it interactive so I can comment and approve/deny/change if necessary."
- **Agent recommends, person decides** — a card carries the agent's recommendation; the decision stays with the person.
- **Preserve history; only edits enter the return prompt** — the person's answers survive a revision of the flightdeck, and an answer left untouched stays out of the return prompt. The skill supplies the mechanism that keeps answers across a revision; a flightdeck built without the skill states that answers are not kept.
- **Two audiences per element** — every element is designed twice: what the person sees, what the agent sees.

## Grounding

- **Direct link back to the file in question** — a card about a file carries an active link to it. "User can navigate directly to all files or sites in question, to check original content."
- **Show where the work originates** — branch is always visible on the flightdeck; issue and pull request are visible when they exist.

## The file

- **Single offline local file** — one HTML file, opened from disk, working without a network.
- **Data persisted within the file, editable from the page** — a flightdeck's own data blocks are its store; an instrument edits and saves them from the page, structure included.
- **Export and import are the undo** — import replaces the whole loadout and warns every time; a broken state is restored from an export. No finer guards. "The export/import, as long as it works properly, is the undo protection."
- **Universal single output, copied or written** — one composed output, delivered to the clipboard or to a file, the person choosing which.
- **Report capability** — probe browser features at runtime and say which are available. "Report what this browser can do, rather than claiming Chrome."
- **Remember last location** — a file or folder location is learned from the person's last use of that action; there is no settings page for paths.

## Building

- **Agent writes content only; chrome is shared** — layout, styles and scripts come from the shell, which ships with the FlightDeck skill. An agent without the skill stops and says so; it does not write chrome of its own. "Agent can build artifacts repeatedly with consistent features and styling, focusing on content."
- **Builders optional, mix and match** — compose the builders the task needs.
- **Demos fully customisable, from known parts** — an agent composes a demo from the structure, classes and integration points the skill documents. "Demos fully customisable by the building agent, but the agent should know the available structure, classes and integration points."
- **Seed broad, prune later** — a first version over-includes; trimming follows use. "Easier to remove than add."
- **Prove it with a demo before integrating** — new behaviour is shown working in isolation first.
- **Verify in a browser** — render the flightdeck and look at it before handing it over. The skill gives the command; the server it starts is bounded by `timeout`.
- **Modern web-page prose and layout** — "User facing prose to be universal, helpful, concise and clear, as a modern web page would." Arranged layout with good proportions and spacing; help text on instruments; prompt outputs concise and instructive for the agent.

## Workflow

- **Review gates before building shell or instrument work** — changes to the shell or to an instrument are settled by a review readout, then a mock, then the build, stopping at every gate; a follow-up review carries only what is still live. A readout for one task is built directly.
- **Utilise dev-workspace when available** — scratch and mocks in the workspace; a finished readout lands in the directory its kind names. See [Organisation](organisation.md).
- **Per-repository instance, still standalone** — an instrument may be copied into any repository and runs there with no dependency on this one.
