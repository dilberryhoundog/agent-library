# commit-and-push

Commit the working tree's current changes as a scoped conventional commit, then push the branch to origin.

## Brief template

```txt
--> COMMIT(new)
- Stage exactly: <files>. Nothing else.
- One commit: <message intent — what changed and why, in prose>. When an issue applies, append a final body line reading exactly: Refs #<issue>.

--> PUSH
- Push <branch> to origin after the commit succeeds.
```
