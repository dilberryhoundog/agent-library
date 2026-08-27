# Profiles

A profile is the shape a flightdeck takes: how long it lives, whether it holds state, and what it returns. The FlightDeck skill dispatches on profile; a kind (review, interview, options) sits under the readout profile. In speech the kind plus *flightdeck* is enough; the profile word is for documentation and the skill.

## Instrument

A durable flightdeck a person opens repeatedly and operates. It keeps its own state in the file, edits its own data from the page, and ships with a plugin or with dev-workspace. It has no return prompt; its output is whatever it composes (a prompt, a command).

- Lifetime: permanent; versioned with its plugin.
- State: yes — text-db, loadouts, export and import.
- Returns: a composed output, copied or written to file.
- Example: prompt builder.

## Readout

A flightdeck built once for one task, answered card by card, handed back as a return prompt. A revision reissues the same file with the person's answers kept, and the file is disposable once its return prompt has been consumed.

- Lifetime: one task; archived with its workspace.
- State: the person's answers only.
- Returns: the return prompt.
- Kinds: review, discovery, plan, interview, options, issue breakdown. Kinds are open.

## Demo

A flightdeck, or a fragment inside one, that shows some functionality working in isolation. Composed by the building agent from the shell's documented parts.

- Lifetime: until the behaviour it proves is integrated.
- State: none.
- Returns: nothing; the person looks.
