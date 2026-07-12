# Durable Documents

A durable document outlives the session that wrote it — a skill, an agent file, a rule, a reference, CLAUDE.md, a spec, a README. Its reader is any agent or human in any future session, holding nothing but the document and their own knowledge.

Four defects account for most of what goes wrong. Each has a shape you can recognise in your own prose as you write it, an ask that settles it, and a remedy. Write passages that will not offend these defects.

## Unreachable Meaning

A passage that carries meaning the reader cannot reach from the document itself or their own knowledge. Words that arose somewhere the reader cannot access, but the writer thought was evident.

Ask of each passage — what do I need to fully understand this?

- The document itself? my general knowledge? = Pass
- Something not given to me? a term, name, concept, decision, conversation? = Fail

Remedy: give the meaning a home in the document, or drop the coined term and say the thing plainly.

## Negative Mirror

An affirmative instruction immediately followed by a negative opposite the affirmative already entails.

Recognise it by three marks together:

- a positive instruction that stands on its own;
- a negative clause following it (not / don't / never / avoid / rather than / instead of);
- removing the negative clause loses nothing.

"Write in prose, not bullet points" — prose already isn't bullets. Mirror.

Remedy: remove the negative clause and sharpen the positive.

## No-op

An instruction the model already obeys by default; load spent saying nothing.

Ask of each line — absent this line, would I have behaved any differently? If not, it's a no-op.

Remedy: delete the line whole. A weak intensifier ("be thorough") is a no-op wearing stronger clothes; reach for a stronger word, not more words.

## Self Trigger

The document describing when it should be read ("use this when..."). Invocation belongs upstream — frontmatter, a loader, an index.

Ask of each passage — is this addressing someone deciding whether to read, inside a document already being read?

Remedy: move it to the document's invocation surface, or delete it.

---
