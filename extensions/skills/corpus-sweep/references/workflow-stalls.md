# Workflow Stalls

Known failure behaviour of the workflow harness, and what each looks like.

## Resume

A workflow resumes by re-invoking the same script with the prior run identifier. Agents whose prompt and options are unchanged replay from cache at no cost; the rest run live.

## Stalls

- **The file-path form of resume can be refused by the safety classifier.** The identical script passed inline with the same run identifier is accepted.
- **An agent's result can return with a note that its safety review could not be reached.** That result carries no automated review.
- **Usage limits end a run mid-flight.** Completed agents are already cached; the remainder are unrun, not partially run.
- **Connection drops end a single agent mid-flight.** A worktree-isolated agent's partial edits remain in its worktree; a read-only agent leaves nothing.

## Result totals from the executed DraftHorse sweep

For scale when estimating a run: migration spent 1,047,757 subagent tokens on its first partial pass and 886,617 on the resume; the audit spent 514,383 before a limit stopped it, plus its resume.
