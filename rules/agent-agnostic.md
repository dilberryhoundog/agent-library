# Agent Agnostic Documents

Transferable, interpretable, executable by any agent.  
All agents are constrained by sessions. Documentation is written to transcend sessions. A "blind agent" is one that is not aware of the context contained within the originating session.

All documents are to be written agnostically for blind agents, who will have no knowledge of the session's context, buzz words, interpretations, flow, user guidance, etc.

This means all passages and statements need to be resolved from the document itself or the reader's inherent knowledge.

## Audience

The single most important factor for producing quality documentation is to know the intended audience.

- Agent
- Human

FIND OUT the audience. Ask the user or yourself "who am I writing this for"?

Calibrate your output to the audience's expected knowledge level.

## Decide the type

Is the document executable, informational, instructional. This will guide your language.

## Common pitfalls and considerations

Avoid and consider these area's to improve the quality of your documents.

### Interpretation of the chat flow.

Copying the chat discourse directly into the document is often a huge mistake, and will lead to a poor quality document. Your job is to INTERPRET the discourse, into a document suitable for a blind agent.

### Self referencing

An agent referencing its own choices and proposals that have not been "approved" by the user, causes problems. Also their 'reasoning' and 'thinking' can often seep in here also.

### Context Source

Agents saturate discourse with the bulk of the output. This often causes the agent to underweigh the user's input, and also read the context as a whole unified context source. However looking at these context sources through separate lenses will often reveal important and relevant context.

### Language as Code

Agents have documents like claude.md or skill.md (and many others) that are de facto code documents (executable). These should not be of a language that is ambiguous, each word chosen needs to have universal meaning, to enable consistent execution.

### Self contained instructions

Including the document's usage instructions inside the document itself ("read when..."), is counterproductive, instead these instructions should be included upstream of the document and not self-contained inside.

## Strategies for Success

Implement any or all of these to help write higher quality documents.

### Ask Questions

Have a quick discussion about any or all of these before creating...

- The audience?
- Whose context source may be more relevant to the document?
- The type? executable, instructional, informative?

### Scaffolds

Scaffold out a document, very concise, using shorthand. Ask the user if this is what they were expecting, and incorporate any further adjustments into the scaffold. THEN, expand into a high quality document from the scaffold.

### First Draft

In larger or more complex documents leave your "thinking" or "reasoning" for including the passage inside the document as a first draft. Place these in some special formatting (like a `<!-- comment -->`) under each section / decision. Invite the user to discuss the comments. Once happy, the agent can strip all the comments.

## Common document / prose types.

### Markdown

Markdown documents are used for many different purposes as the primary language of ai agents. Building agent harnesses is a major use case, needing highly structured and universal agent agnostic documentation.

### Code Comments

A very common trouble area. Agents inform of their choices and reasoning with the code they have created or changed, but are unaware that their writing is not agent agnostic.
Not a suitable medium for the `strategies for success`

### Plans

Plans also need careful consideration. Often written directly after a chat session thrashing out the details. However plans most definitely will be agent agnostic as they are often executed later.
