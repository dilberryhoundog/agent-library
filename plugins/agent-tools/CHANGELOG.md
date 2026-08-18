# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.6.0] - 2026-08-19

### Added

- Step functions — a catalogue of six step shapes (error, success, looping, routing, dormant, handover), each with a fixed declaration string a step copies verbatim. Declared on a bolded line beneath the step's directive, it tells a reading agent how the step behaves before it reads the conditions. The catalogue ships as `references/step-functions.md` and is cited at the moment steps are written.
- `drafthorse-saddler` gains a Step Function Checks group — one test per shape, opening with a sweep for steps performing a catalogued shape without declaring it.

### Changed

- A step opens with a **directive** naming the agent's task on entering it, rather than a description of the step. Both templates and the checker follow; a general description is now a finding.
- The steps preamble is telegraphic prose rather than a blockquote list. Documents built at earlier versions no longer match it verbatim and will report a preamble finding until updated.
- Exit steps are no longer mandatory. `The run resolves` replaces presence with resolution, judged on the scenario walk — an exit step and the agent's own handling are both legitimate.
- Terminology settles on **error step**. *error drain* and *problem step* are retired throughout the skill, the templates and the checker.
- A start condition names an artifact's state and lets the approval behind it be implied ("a complete draft exists" carries both the gate and the work). Naming another step remains forbidden.
- Condition guidance gains a rule that a finished condition covers every outcome the step can end on, so the destinations claiming a failure stay reachable.

### Removed

- `#### Suggested next actions:` is retired; its presence is now a finding. Its work is rehomed — termination into an exit step's finished conditions via the Success declaration, the loop instruction into the loops rule, and the bail into the error step's claimed remainder.
- The **De-hold** rule is retired. A start condition no longer carries a negated copy of its own finished condition, which was one meaning in two homes and blocked an upstream revision from re-opening the work below it.

## [0.5.2] - 2026-08-02

### Changed

- The `**OR these are true:**` separator is defined by what it separates — two condition lists, either one satisfying the block on its own. An "or" inside a single condition that resolves to one observation is no longer swept up as a missing separator.
- The executor exception now requires the folded error drain to claim the remainder as an alternative block in the reporting step's start condition, rather than as an inline prose clause.
- `drafthorse-saddler` conforms to its own condition-block rules — every step's start and finished conditions are lists, with OR blocks on the two steps that admit a genuine alternative path.

### Fixed

- `drafthorse-saddler` no longer reports a finding against a condition whose inline "or" settles with a single look, such as "the handovers have been audited or none are present".

## [0.5.1] - 2026-08-02

### Changed

- `drafthorse-saddler` now checks condition block shape — the conditions to start or finish a step must be a markdown list with one condition per list item; a prose paragraph in either place is a finding.
- `drafthorse-saddler` judges each condition item by observation count: an item bundling two separate observations is two conditions and splits.
- The citation check broadens to heading references — an in-document reference to another section must be a Markdown anchor link (`[Handover Checks](#handover-checks)`) rather than a backticked name.
- The DraftHorse `condition-writing` reference gains guidance on splitting compound conditions into one-observation items.

Documents authored before this release may produce findings on their next audit; the documents themselves are unchanged and still function.

## [0.5.0] - 2026-08-01

### Added

- DraftHorse ships a `HANDOVER-template.md` fill-in scaffold for authoring handover documents, alongside the existing SKILL template.
- Every DraftHorse document now carries a `harness-format: DraftHorse` frontmatter stamp (handovers: `harness-format: DraftHorse, Handover`), replacing the old `type: handover` marker.

### Changed

- DraftHorse machinery headings renamed: `#### Start this step when:` → `#### Start this step when these are true:`, `#### Do this next:` → `#### Suggested next actions:`, `#### Decision:` → `#### Agent decision:`, `#### Invariants:` → `#### Step invariants:`.
- Terms are now written as a bulleted `- **Term** —` list instead of the `: **Term**:` definition form.
- Handover documents are filed at the skill root as `*-handover.md` rather than inside `references/`, and "master step" is now "parent step" throughout.
- `drafthorse-saddler` audits against the upgraded spec — documents authored under 0.4.0 notation will produce findings on their next audit and need revising to the new forms.

## [0.4.0] - 2026-07-13

### Added

- DraftHorse: `#### Decision:` is now a sanctioned optional step-machinery heading, sitting after `#### Step finished when:` and before `#### Do this next:` / `#### Invariants:`. It holds a choice that governs a step's scope or shape — what the step targets, or how many times it runs — resolved before the work can be performed. The SKILL template ships the slot, and `drafthorse-saddler` accepts it instead of reporting it as a notation violation.

### Changed

- DraftHorse: a Decision block is now reserved for scope or shape choices, and must carry no work, carry no routing, and resolve to a fact the step's finished condition depends on. A bounded fork inside the work now belongs in the engagement as plain prose — documents that used a Decision block for such a fork will be flagged on audit.
- The `drafthorse` skill no longer runs command blocks while filling reference gaps; it authors and reasons through them, and asks the user to run a command when its shape is uncertain.

## [0.3.0] - 2026-07-10

### Added

- DraftHorse now supports **handover documents** — a sub-step document type for extracting heavy, optional, or side-branching work into its own `references/` file (marked `type: handover`) that a master step folds in at runtime. The skill guides when to extract a handover and how to write one, and the `drafthorse-saddler` auditor gains a matching set of handover checks. Existing five-part-scaffold documents need no changes.

## [0.2.0] - 2026-07-08

### Added

- drafthorse-saddler agent for auditing DraftHorse specs, invocable as an optional independent-review pass from the drafthorse skill's Review step.

### Fixed

- Trimmed the drafthorse skill's tool grants to only what its steps actually use (dropped unused Grep/Glob).

## [0.1.0] - 2026-07-08

### Added

- First release of agent-tools: tools for building agent harness extensions.
- The DraftHorse builder skill (`/agent-tools:drafthorse`): build a new skill — or
  convert an existing document — through gated phases of references, step map,
  invariants, and draft, producing standalone-step documents any agent can execute cold.
