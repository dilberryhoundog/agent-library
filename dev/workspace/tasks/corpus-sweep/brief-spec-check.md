# Targets: docs/drafthorse/drafthorse-spec-check.md + extensions/agents/drafthorse-saddler.md

Two concerns, then a regeneration. The spec-check's CHECKS sections (References) are settled — do not touch any check content. The work lands on the document's OWN step machinery and its report format, then the saddler is regenerated.

## 1. De-hold trims in the spec-check's own steps

Sweep the seven steps' start conditions per the common brief's three classes. Candidate clauses: "the document set is not yet assembled" (+Assemble), "the frame has not been checked" (+Check the Frame), "the references (inline and external) have not been audited" (+Audit the References), "the steps have not been audited" (+Audit the Steps), "the handovers have not been audited" (+Audit the Handovers), "no scenario-walk has been completed" (+Walk the Scenarios). Each is a negated copy of its own step's finished state on a one-shot step — class 1 unless you find a real dependency hiding in it. The inherited-scope count estimated 2 sites; apply your own judgment per site and report the true count with reasoning. Note: trimming makes the four audit steps' start conditions identical ("the document set is assembled") — deliberate multi-in-play, sanctioned by the preamble; +Walk the Scenarios still waits on the four audits' completion states.

## 2. Issue #39 — set-level checks become a separately-reported pass

The failure on record: set-level judgment degrades into notation pattern-matching; the set-level sweep is a trailing clause of `+Audit the Steps`' engagement ("Then judge the set as a whole: …"), and silence on a set-level check is indistinguishable from a pass. Implement the minimal shape:

- `+Audit the Steps` engagement: pull the trailing set-level sentence into its own `#### Judge the set:` sub-heading. Name the set-level checks it sweeps (negative space claimed; exit steps present and stating their termination; half-applied state bailed rather than resumed; error step whole or explicitly folded; the Document-Wide Checks). Require an explicit verdict per set-level check — silence is not a pass.
- `+Audit the Steps` finished conditions gain: `- every set-level check has an explicit recorded verdict`.
- `## Report Format`: after the SCENARIO-WALK line, add a SET-LEVEL line to the format block — one line per set-level check, pass or the finding it produced. Keep it one line in the format template.

Convention guard: no new rule per state, no new machinery beyond the sub-heading, the finished item, and the report line.

## 3. Regenerate the saddler

Per the spec-check frontmatter `usages:` rule: in `extensions/agents/drafthorse-saddler.md`, keep everything above `# Agent Invariants` (frontmatter and identity paragraph) exactly as it stands; replace everything from `# Agent Invariants` to end-of-file with the spec-check's own content from `# Agent Invariants` to end-of-file, verbatim. Never hand-edit the replaced body.

Verify lockstep: extract both files' bodies from `# Agent Invariants` down and diff them — the diff must be empty. Report the verification result.

## Known quirks — do not "fix"

- The saddler flags `HANDOVER-template.md` as a signal-mismatched handover when auditing the drafthorse skill — expected template-asset false positive.
- The spec-check's own `+Audit the Handovers` and `+Compose the Report` carry adapted declaration tails — deliberate; leave them.

## Exemplar

Nominate: none (the checker is spec, not corpus).
