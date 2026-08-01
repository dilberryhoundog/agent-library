# References

References is the data utility — context a step delivers to the agent. A reference holds the constants, maps, formats, and facts the steps act on (data by preference, not hard law — see the *references carry data* convention). References interlink with steps — a step's job is to put the right context in front of the agent at the right time and place, citing the reference inline at the moment of use (see the *cite references at the moment of use* convention). Every kind of reference has one legal citation form; [Notation](notation.md) gives them.

References fall on one axis: **static** (context that sits in or next to the document) versus **dynamic** (Claude-native functionality that produces context at runtime).

## Static references

Context that physically lives in the document.

- **Internal** — compact, always-relevant context, held inline in the References section; a step cites it directly. (See the *inline vs external* convention for when context stays inline.)
- **External** — expansive, sometimes-relevant context, held in a separate file and loaded only when a step's logic calls for it. Keeps the document legible by deferring the bulk until it is reached.

## Dynamic references

Claude-native functionality that produces context at runtime rather than storing it in the document. The family shares one trait: the context does not exist until the run, and arrives from outside the prose. How it arrives varies — the step invokes some members and folds the result back in; others are substituted before the agent reads a word. The set is open — runtime-produced context is the whole of the membership test.

- **Data load** — pull live state in as source of truth (e.g. the output of a shell command).
- **User configuration** — values the user supplied when the document's package was enabled, substituted into the prose before the run begins. The step reads a resolved value and never reaches for configuration, so the document stays readable cold: what the reader sees is what the agent got. **NEVER** write a step that receives a secret as resolved prose — a secret is reachable only by a subprocess, never by the document.
- **External call** — route out to another skill or tool, which loads its own context and permissions, then returns. (The grants-transfer mechanism is described under frontmatter in [Scaffold](scaffold.md).)
- **Agents** — delegate to a sub-agent that returns its result as context.
- **Hooks** — harness-triggered behaviour that feeds the document.
- **Handover fold-in** — cite a `harness-format: DraftHorse, Handover` document *as a handover doc*, folding its steps into the run as child steps of the citing parent step (see [Handover](handover.md)). Unlike an external call, it does not route out to an isolated context and return a value — its steps, references, and invariants come into play inside this run, and the parent step reads the result from the resulting state.
