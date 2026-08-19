# Corpus Sweep — Common Migration Brief

One migration pass over one assigned DraftHorse document (or document group). The framework changed; the corpus did not. This brief carries the shared rules; the per-file brief carries the sites and decisions specific to your target.

## Read first, in order

1. `docs/drafthorse/framework/steps.md` — step anatomy, the function catalogue summary, dispositions, both preambles.
2. `extensions/skills/drafthorse/references/step-functions.md` — the six shapes and their fixed declaration strings.
3. `extensions/skills/drafthorse/references/condition-writing.md` — condition rules (list form, one look per item, start/finished division).
4. `extensions/skills/drafthorse/SKILL.md` — the migrated pilot. The worked reference for every shape below: directive lines, declared functions, condition list granularity, OR blocks, the error step's withdrawn-approval remainder.

Then read your target file(s) whole. Edit with the Edit tool, site by site. Never edit via script or sed. Never edit any file outside your assignment. Framework docs under `docs/drafthorse/framework/` are frozen — where your target disagrees with the framework, the target changes; where the migration seems to demand a framework change, flag it instead.

## Fixed texts — byte-exact

Universal preamble. Replaces the old quote-block preamble (the `> Steps are universal and standalone.` block plus its bullet list) directly under `# --- STEPS ---`, as a plain paragraph:

Steps are universal and standalone. Marked `## +<Step Name>`. Work, instructions, rules — self-contained. Invoke a step whenever its start conditions match. Step completes only when its finished conditions match. Multiple steps activate at once. Call every cited reference. References use markdown link notation.

Handover-variant preamble (handover documents ONLY — never a skill or agent document):

Handover holds child steps of a parent step. Marked `## +<Child Step Name>`. Same step rules apply, plus these. Parent step reads success from the state child steps leave behind. All child steps finished or inactive — return to the parent step and continue. Parent document covers error handling, unless an optional child error step is present. Global invariants hold across the parent step's span. Step invariants confine to their own child step.

Function declaration strings — on their own line directly below the step's directive, above the machinery headings. One function per step. An ordinary working step declares nothing, and that is the common case:

- `**Error step** — Handles recovery and bails.`
- `**Success step** — Resolves the run's done state and exits.`
- `**Looping step** — Re-runnable, taking a different branch each pass.`
- `**Routing step** — Chooses between divergent branches.`
- `**Dormant step** — Skippable, activates only when its state arises.`
- `**Handover step** — Manages the invocation and resolution of a handover document.`

A reporting step that folds in the error step per the executor exception adapts the Error tail, following the checker's own worked model: `**Error step** — folded into this reporting step per the executor exception, so its start condition claims the failed run alongside the completed one.` (adjust the trailing clause to what the step actually claims).

## Checklist, applied per step in one pass

- **A. Preamble** — swap the old quote-block preamble for the fixed paragraph above. Byte-exact.
- **B. Slots** — delete every `#### Suggested next actions:` block (heading plus its prose). Before each deletion, confirm the routing or fact the slot carries is already expressed by conditions elsewhere in the document. Where the per-file brief names the slot LOAD-BEARING, apply the named repair in the same pass — never delete a load-bearing slot without its repair landing.
- **C. Directive** — every step opens with a single line naming the agent's task on entering the step. Most existing openers qualify; sharpen only a line that describes the step rather than tasking the agent. Do not rewrite lines that already work.
- **D. Function** — declare the function where a step performs a catalogued shape; use the fixed string. Do not force a declaration onto an ordinary working step.
- **E. De-hold** — see the judgment section below. Every trim recorded with before/after and the judgment made.
- **F. Vocabulary** — "error drain step", "error drain", "the drain", "problem step" all become "error step" (or read naturally around it). Step headings (`+Handle a Problem`, `+Help`, `+Result`, `+Report`) stay as they are.
- **G. Condition lists** — every start/finished block is a markdown list, one condition per item, lowercase clauses in the pilot's style. One item = one look: if deciding an item means checking two separate things, split it. Alternative entry/exit states use `**OR these are true:**` on its own line between lists, exact wording. The splits are judgment, not mechanics — mirror the pilot's granularity, and preserve the meaning of the prose you convert. Never invent new conditions while converting; where prose carried an instruction rather than a state, move the instruction to the engagement (or flag it).
- **H. Citations** — a citation of a References-section entry or heading becomes a markdown link to its anchor (`[Bump Mapping](#bump-mapping)`); an external file citation becomes a relative link with derived text (`[Config Template](references/config-template.md)`). `=== label ===` mini-headings carry no anchor — citations of those stay as code-spans. Terms (glossary entries) are not references — leave code-span mentions of Terms alone.
- **I. Gates compound** — a finished condition resting on approval alone gains the artifact's own substantive criteria, stated before the approval.
- **J. Termination** — a success exit's finished conditions state the run's completion (`- the skill is complete`, or the document's equivalent). An executor/reporting exit states its emission as the final message text where the per-file brief says so.
- **K. Withdrawn approval** — where the document gates on user approvals, check whether the error step says anything about a withdrawn approval (the pilot's `+Handle a Problem` engagement is the worked example). Do not add it uninvited — flag its absence.
- **L. Out-of-scope defects** — anything wrong that this checklist does not cover goes in `flags`, verbatim location and problem. Report, never improvise a fix.

## De-hold judgment

Issue #45 retired the De-hold rule: a start condition no longer carries a negated copy of its own finished condition. A step is a span — it ends when its finished conditions are met, and the agent has the transcript. Judge each negative start clause into one of three classes:

1. **Pure de-hold** — a one-shot step whose clause negates its own finished state ("context has not yet been gathered", "the report has not yet been presented"). DELETE the clause; keep the durable-state clauses. Where deletion leaves the start condition empty, the remaining durable state (invocation, an upstream artifact's existence) is the condition.
2. **Per-item loop discriminator** — a re-entrant step whose clause tracks remaining items ("a unit has commits in range but no verdict is recorded for it", "an action not yet run"). KEEP it — this is the sanctioned loop shape — and declare `**Looping step**`. Rephrasing to awaits-form ("a unit awaits its verdict") is permitted where it reads better; splitting stays one look per item.
3. **Run-ended guard** — a clause claiming the dovetail of an ended run ("and no refusal has ended the run"). KEEP it; it is routing another step's recorded outcome, not the step's own finish.

The clause usually hides a real dependency: the fix is to name the state it stood in for, never to bolt the negation back on. Where a step genuinely must not re-run over its own partial work, that is a half-applied disposition at the error step, not a start-condition clause — flag any site where safety seems to depend on the deleted clause.

## Register

Match the target document's existing prose register. Fixed strings byte-exact. Condition items lowercase, terse, state-shaped, as in the pilot. Do not add commentary, rationale, or comments to the documents.

## Output

Return ONLY the structured object the schema demands. Every edit is one change entry: `site` (step or section name), `kind` (preamble | slot-removed | slot-repair | de-hold-trim | de-hold-kept | function | directive | vocabulary | condition-list | citation | gate | termination | invariant | engagement | other), `summary` (one sentence), `before`/`after` (the decisive fragment, not whole blocks — for condition-list conversions give the full old prose and the full new list), `judgment` (why, where a call was made). `flags` carries out-of-scope findings and every hesitation worth the reviewer's eyes. `exemplar` carries the shape(s) your per-file brief nominates: the shape name and the verbatim migrated machinery block (heading through conditions), for the step-shape examples reference.
