# Code Comments

A comment states a constraint the code itself cannot show. Nothing else.

Comments outlive the session that wrote them. The next reader — human or agent — has no access to this conversation, the diff, or the review. A comment that narrates any of those is noise the moment the change lands.

Never write a comment that:

- narrates what the change was ("changed to handle the edge case")
- explains what the next line does (the line shows that)
- justifies the change to a reviewer ("this should fix the issue we discussed")
- records the author's reasoning or alternatives considered ("went with a hash here because it felt cleaner")

Legitimate comments state durable facts the code cannot express:

- an external constraint ("API returns 200 with an empty body on timeout — do not treat as success")
- a non-obvious invariant ("callers rely on this list staying sorted")
- a deliberate deviation with its trigger ("O(n²) is fine here; n is bounded at 12 by the schema")

Test before writing any comment: would this sentence still be true and useful to a reader who knows nothing about today's session? If not, delete it.
