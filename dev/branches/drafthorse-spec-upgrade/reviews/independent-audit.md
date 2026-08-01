# Independent Audit — DraftHorse Spec Upgrade

Scope: `git diff main...HEAD` plus the working tree on branch `drafthorse-spec-upgrade`. The bulk of the change is uncommitted.

The change is the DraftHorse spec-vocabulary migration: `master/sub-step` → `parent/child`, `type: handover` → `harness-format: DraftHorse, Handover`, machinery-heading renames, Terms `:` form → bolded list, classroom `references/*.md` handovers moved to `<skill>/*-handover.md`, plus new `surfaces.md`, `HANDOVER-template.md`, and `user-configuration.md`.

The migration itself is clean. No broken relative links in the changed docs, no stale `type: handover`, no stale machinery headings, no `master step`/`sub-step` anywhere, preambles byte-identical across all 12 documents, and no step missing a finished condition. Every finding below is a place the sweep did not reach.

## High

**1. `plugins/classroom/templates/.claude/rules/classroom.md:17`** — Points at the skill's `references/setup.md`, deleted by the rename to `setup-handover.md`. This template is copied verbatim to every classroom project root and auto-loads as a rule; an agent asked to re-bootstrap follows a dead path and has no way to find the setup procedure. Should be `setup-handover.md`.

**2. `plugins/classroom/templates/CLAUDE.md:35`** — Same dead path ("read the skill's `references/setup.md`"), same blast radius — copied into every classroom project.

**3. `extensions/agents/drafthorse-saddler.md:258`** — The `+Audit the Steps` engagement still instructs the auditor: "start condition (state terms, de-hold, half-applied exclusion) … do-this-next … invariants". Line 104 of the same file now states the opposite — "Judged at the error step, not at each start condition … Do not demand an exclusion clause on every start condition; that is a false positive." The engagement is what the executing agent actually performs, so the exact false positive this change was written to remove comes straight back. Also the last two retired slot names in the corpus.

**4. `docs/drafthorse/drafthorse-spec-check.md:261`** — Identical stale paragraph in the authoring source. Its own frontmatter says the saddler is regenerated from this file, so fixing only the saddler reintroduces the defect on the next regeneration. Both must change.

**5. `extensions/skills/drafthorse/assets/SKILL-template.md:66` (and `:76`)** — `  **OR these are true:** (optional)`. Two defects: the literal `(optional)` is bare text, not an HTML comment, so it copies through into every generated skill; and the two-space indent makes it a continuation line of the preceding `- <condition 2>` rather than a standalone separator. `notation.md:14` requires the separator "standing on its own line", exact wording, and `drafthorse-saddler.md:38` makes any deviation a finding. The shipped template therefore generates documents that fail the shipped checker. Same defect at `assets/HANDOVER-template.md:49` and `:59`.

## Medium

**6. `extensions/skills/drafthorse/references/condition-writing.md:29`** — Still teaches "Exclude half-applied states … Add the exclusion explicitly", the rule `conventions.md` and `steps.md` deleted in this same diff. `drafthorse/SKILL.md:181` loads this file when writing the draft, so the authoring skill produces conditions the checker now calls over-specified. Same retired rule at `drafthorse/SKILL.md:45` (Conventions Digest) and `assets/SKILL-template.md:62` (author comment).

**7. `docs/drafthorse/framework/steps.md:19` (and `:33`)** — "Every DraftHorse document opens its steps section with the same short boilerplate" / "the same text is copied verbatim into every document" — contradicted by `handover.md:58` ("the handover-variant preamble, not the universal one") and `drafthorse-saddler.md:40` ("Two preambles are legitimate"). An author following steps.md puts the universal preamble into a handover; that preamble routes an incompletable step to an error drain the handover does not have, which is precisely the failure handover.md cites as the reason for the variant.

**8. `docs/drafthorse/framework/scaffold.md:34` (and `:10`)** — "The section opens with the universal steps preamble" — same contradiction, and scaffold.md is layer 1, read before handover.md.

**9. `docs/drafthorse/framework/notation.md:43`** — "Every citation is a link" plus the mandated `[Reference](references/reference.md)` form, and the new preamble baked into all 12 documents asserts "References are inline, using Markdown link styling." But only handover citations were converted; every external reference citation in the corpus is still a backticked path — `drafthorse/SKILL.md:60-62, 113, 149, 181` and `classroom/SKILL.md:132, 184, 222`. The two flagship documents contradict the rule they carry.

**10. `extensions/agents/drafthorse-saddler.md:85`** — "Reduced audit profile" waives only the frontmatter-identity and exit-step checks, keeping "scaffold order … in full". Scaffold Check 1 (line 25) reads "Carries `harness-format: DraftHorse`, casing exact; a document without the stamp is not a DraftHorse document" — a handover carries `harness-format: DraftHorse, Handover` and has no carve-out there, so every handover trips check 1. Mirrored at `drafthorse-spec-check.md:85`/`:25`.

## Low

**11. `docs/classroom-skeleton.md:142` (also `:182`, `:189`)** — Still documents `references/setup.md` as the setup location, including as a section heading. Repo-internal architecture map, so no runtime effect, but it is the document an agent reads to understand the classroom layout.

**12. `extensions/rules/DraftHorse.md:1`** — New file committed into the shared rules library containing nothing but TODO comments — zero content if anything loads it.

**13. `docs/drafthorse/framework/README.md:20`** — Unresolved `<!-- TODO: Drafthorse is often placed in agent body also… -->` left in a normative framework doc. Same class: `drafthorse-spec-check.md` retains a `<!-- Not true, destructive re running… -->` note absent from its regenerated saddler copy.

**14. `docs/drafthorse/drafthorse-spec-check.md:1`** — Frontmatter carries no `harness-format: DraftHorse` stamp, although its `role` field says "It carries the DraftHorse scaffold because its usages must" and its own Scaffold Check 1 declares a stampless document not a DraftHorse document. The file fails the check it defines.

## Verified Clean

- All relative links in changed docs resolve. Only vendored `docs/claude_docs/` has dead `/en/…` links, pre-existing.
- No `type: handover`, no old machinery headings, no `master step`/`sub-step` anywhere.
- All four classroom handovers stamped, suffixed, root-located, and cited in the new `[Name — Handover](name-handover.md)` form.
- Preambles byte-identical across the corpus.
- Start/finished condition counts balance in every real step.
- `docs/user-configuration.md` matches `plugin_reference.md:561-563` on `${user_config.*}` substitution surfaces and keychain/`CLAUDE_PLUGIN_OPTION_<KEY>` behaviour.
