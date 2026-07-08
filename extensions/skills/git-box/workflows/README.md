# Git Box Workflows

This folder holds the git-box skill's workflow templates: proven briefs, parameterised for reuse. The skill's `+Check Workflows` step loads a template when the `Workflow Map` (in SKILL.md) points to it; the map row and the template file ship together with the skill.

This README is the guide for resolving a workflow-proposal issue into a template. Proposals arrive as issues carrying a sanitised brief that succeeded in a live run (uploaded by the skill's `+Save a Workflow` step); the resolver — any agent or maintainer working in this repository — does the conversion below.

## Resolving a proposal

1. **Verify the evidence.** The proposal's brief must have succeeded in a live run. A brief that merely looks useful is not a workflow.
2. **Create the template** at `workflows/<name>.md` per the shape below.
3. **Add the map row** to the `Workflow Map` table in SKILL.md: workflow name, type (the short request phrase the map matches on), reference (`workflows/<name>.md`), procedure map (e.g. `COMMIT(new), PUSH`).
4. **Close the proposal issue** once the change ships in a release — the release is what propagates the workflow to every installation.

## Template shape

Three parts, nothing more:

```markdown
# <workflow-name>

<one-line purpose: the request this workflow serves.>

## Brief template

```txt
<the templated brief>
```
```

- Name is kebab-case and matches the file name and the map row.
- The one-liner is the whole description — the brief is self-explaining; no trigger lists, no fill-in guides. Matching burden lives in the map; once loaded, the suitability test is the fill itself (a placeholder that cannot be filled correctly means the template does not suit).

## Converting a brief into the template

- **Work from the proposal's brief verbatim** — the text that actually ran, not a reconstruction of its intent.
- **Parameterise only request-specific data**: file paths, message intent, issue numbers, branch names become `<placeholders>`. Every placeholder must be fillable from a future run's gathered context.
- **Remove run-specific lines** — one-off warnings, situational notes that served that run alone. This is the only editing allowed; record anything removed in the proposal issue before closing it.
- **Never generalise beyond the run.** The template is the brief that succeeded, parameterised — not an improved or extended version. A shape the run did not prove (extra procedures, different actions) is a different workflow, awaiting its own successful run.
