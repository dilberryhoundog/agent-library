# References

References are the data segment — context a step delivers to the agent. A reference holds the constants, maps, formats, and facts the steps act on (data by preference, not hard law — see the *references carry data* convention). The steps do the timing — a step's job is to put the right context in front of the agent at the right time and place, citing the reference inline at the moment of use (see the *cite references at the moment of use* convention).

References fall on one axis: **static** (context that sits in or next to the document) versus **dynamic** (Claude-native functionality that produces context at runtime).

## Static references

Context that physically lives in the document.

- **Internal** — compact, always-relevant context, held inline in the References section; a step cites it directly. (See the *inline vs external* convention for when context stays inline.)
- **External** — expansive, sometimes-relevant context, held in a separate file and loaded only when a step's logic calls for it. Keeps the document legible by deferring the bulk until it is reached.

## Dynamic references

Claude-native functionality that produces context at runtime rather than storing it in the document. The family shares one shape: the step invokes a native capability and folds the result back in as context. The set is open — the unifying trait is runtime-produced context, not a fixed list.

- **Data load** — pull live state in as source of truth (e.g. the output of a shell command).
- **External call** — route out to another skill or tool, which loads its own context and permissions, then returns. (The grants-transfer mechanism is described under frontmatter in [scaffold.md](scaffold.md).)
- **Agents** — delegate to a sub-agent that returns its result as context.
- **Hooks** — harness-triggered behaviour that feeds the document.
- **Handover fold-in** — cite a `type: handover` document *as a handover doc*, folding its steps into the run as sub-steps of the citing master step (see [handover.md](handover.md)). Unlike an external call, it does not route out to an isolated context and return a value — its steps, references, and invariants come into play inside this run, and the master step reads the result from the resulting state.
