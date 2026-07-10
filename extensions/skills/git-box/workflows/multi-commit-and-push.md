# multi-commit-and-push

Split the working tree into multiple scoped commits — each staging only its own files — then push the branch to origin once every commit succeeds.

## Brief template

```txt
--> COMMIT(new)
- Stage exactly: <files>. Nothing else.
- One commit: <message intent — what changed and why, in prose>. When an issue applies, append a final body line reading exactly: Refs #<issue>.

--> COMMIT(new)
- Stage exactly: <files>. Nothing else.
- One commit: <message intent — what changed and why, in prose>. When an issue applies, append a final body line reading exactly: Refs #<issue>.

(repeat the COMMIT(new) block once per logical commit — two, three, or more)

--> PUSH
- Push <branch> to origin after every commit succeeds.
```
