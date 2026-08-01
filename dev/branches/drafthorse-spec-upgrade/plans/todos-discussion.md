# TODOs — Discussion

Each TODO from the sweep as a section: what it asks, assessment, suggestions, and open questions. Reply inline with `<!-- comments -->`. Where a decision from [new-concepts-discussion.md](new-concepts-discussion.md) already settles a TODO, the `### decision` is pre-filled and marked *(inherited)* — correct it if I've inferred wrongly. TODOs still needing your call have no decision section yet.

## 1. conventions.md:8 — mine the conditions quote

What it asks: "Needs sharpening, not really a sharp definition, this quote is more suitable for mining." Wraps raw thinking (conditions are the source of truth; the next step's start catches the agent when the previous finished releases; "Do this next" is optional pointing) plus the struck-through old "Steps are standalone" bullet.

Assessment: the quote contains one convention trying to get out, and it's the sibling of "Steps are universal": universal says a step's conditions are its only control surface; this says the *routing between* steps is nothing but release-and-catch. Together they replace both the quote and the old standalone bullet.

Suggestions: distil to a single bullet — "**Conditions carry routing** — a step releases on its finished condition, the next catches on its start; no interstep routing exists; *Do this next* is an optional pointer, not the mechanism." Fold the standalone/atomic property in as the consequence your concept-1 decision named (the two direct idioms of the entry/exit dynamic can live as one bullet or two adjacent ones).

Questions: one bullet or two — merge routing + standalone into a single "entry/exit dynamic" convention, or keep "Conditions carry routing" and "Steps are universal" as the two named idioms side by side? I lean two: they answer different reviewer questions (is routing leaking into prose? vs is a step waiting on a chain?).

<!-- Two separate idioms is good. -->

### decision

— Two separate idioms, side by side: "**Conditions carry routing**" (release on finished, catch on start; no interstep routing exists; *Suggested next actions* is an optional pointer, never the mechanism) and "**Steps are universal**" (concept-1 decision). The quote and the old standalone bullet are both replaced by the pair.

## 2. conventions.md:15 — new convention "Steps are universal"

What it asks: promote the multi-in-play model (loopbacks, error catching, inert steps) to a named convention.

### decision

*(inherited from concept 1)* — Adopt. Universal = every step is always watching its start condition; steps need not chain. Position as the first steps convention; standalone/atomic and universal written as the two direct idioms of the entry/exit dynamic; affordances listed as consequences. Rewrite freely for sharpness.

## 3. conventions.md:24 — "Gates are compound: what does this even mean?"

What it asks: the convention is kept in spirit but the phrasing is opaque — "finishes on the user's approval *and* the artifact's own substantive conditions".

Assessment: the concept is sound and load-bearing (the spec-check's Condition Checks test for it; steps.md's User gates section restates it). The opaque part is "substantive conditions" — it means "the finished conditions the artifact would need even if no approval were involved". The rubber-stamp test in the current draft is actually the sharpest sentence in it.

Suggestions: rewrite led by the failure it prevents, per your own How-with-checkable-test style: "**Gates are compound** — approval alone never finishes a gate step; the finished condition also carries the artifact's own completion criteria, so a rubber-stamp cannot launder a defective artifact past it." Note this also now composes with the OR-separator decision: a gate's finished list is a plain (implicitly ANDed) list — approval is just one line in it. That framing may be the simplest explanation yet: *approval is a condition, not the condition.*

Questions: happy with "approval is a condition, not the condition" as the lead sentence? And should the convention live only in conventions.md with steps.md's User gates section pointing at it (SSoT), or stay stated in both (they currently both carry it in full)?

<!-- "User approval of artifacts often need additional step conditions to fully dispose of the step. This allows step return, artifact editing post creation etc"  -->

### decision

— Single sharp statement, no test pattern: "**Gates are compound** — a gate's finished conditions state the artifact's own completion criteria alongside the user's approval." The step-return / post-approval-edit behaviour stays in steps.md's User gates section, not in the convention bullet.

## 4. conventions.md:38 — replace defect list with "Sharp Prose"

What it asks: collapse the four durable-document defects + "Remove no-ops" into one Sharp Prose convention.

### decision

*(inherited from concept 7)* — keep as is.

## 5. conventions.md:49 — new convention "Naming, not Explaining"

What it asks: promote short/unique headings with explanation-below to a named convention.

### decision

*(inherited from concept 8)* — Adopt with the mechanism stated (headings are link targets; explaining breaks anchors, duplicating makes them ambiguous). Uniqueness per document. Title stays; trailing echo line goes. Cross-brace with the internal-reference notation (concept 5's link-text conventions).

## 6. scaffold.md:23 — decode the "Config wiring" bullet

What it asks: "Uncertain explanation, decode this to refactor" — the bullet says user configuration is fed into the document's commands directly so a step receives a resolved value.

Assessment: the mechanism behind the murk is known and field-tested: plugin `userConfig` reaches skill-launched scripts via `${user_config.*}` substitution in the SKILL command string — not env vars — so by the time a step runs, the value is already resolved text in front of the agent. The bullet is correct but names no mechanism, which is why it reads as fog.

Suggestions: rewrite concretely: "**Config wiring** — user configuration enters through frontmatter command substitution (`${user_config.*}` in the skill's command), so a step receives a resolved value in its prose rather than reaching for configuration at run time." One caution the other direction: scaffold.md is framework (agent-agnostic) and `${user_config.*}` is Claude-Code-specific syntax — options are (a) name the CC mechanism as the worked example of a general principle, or (b) keep the principle abstract in scaffold.md and put the CC syntax in surfaces.md or the rule. The same identical bullet sits in spec-check line 60 — whatever lands must land in both.

Questions: (a) or (b)? Given the framework's agnostic standard I lean (b) — principle in scaffold.md ("config resolves before prose runs; steps never fetch config"), mechanism named where harness-specifics are allowed. But your agnostic-allows-fixed-constants stance might make (a) acceptable.

<!-- Is this even a front matter concept? seems like command substition for references? lets defer this to a seperate conversation, due to it reaching into spec-check also -->

### decision

— Deferred to its own conversation (it reaches into spec-check too). Working hypothesis for that discussion: config wiring may be a dynamic-reference concept (runtime-substituted context) mis-filed under frontmatter — frontmatter is only where the wiring is declared.

## 7. steps.md:79 — are half-applied-state exclusions necessary?

What it asks: the genuine open design question of the sweep. Given an error step can start before the producer finishes, could error steps absorb half-applied states instead of every start condition excluding them?
Field observation: exclusion clauses are getting unruly and are muddying the bona fide conditions.

Assessment: this is now MORE answerable than when you wrote it, because two of your decisions bear on it directly. "Steps are universal" (error step is always watching, needs no handoff) makes the error-step option mechanically sound: a half-applied state is by definition a state no working step's start condition should claim, which is *exactly* the error step's subtractive remainder — so absorbing half-applied states there isn't a new duty, it's the existing "claims the remainder" convention doing its job. And the OR-separator decision reduces the cost of exclusions where they're still wanted (one clean line in an ANDed list).
The one real danger in dropping the blanket rule: the *destructive re-run*. "The prerequisite is met" still holds after a partial failure; if nothing excludes it, an agent may re-enter the working step and clobber partial work before the error step is noticed. That specific hazard is what the rule was protecting against — the unruliness came from over-applying
it to non-destructive steps.

Suggestions: split the rule by what's at stake. (a) Destructive or non-idempotent steps: keep the exclusion — one clause, "and no part of X has been applied". (b) Everything else: drop the exclusion; half-applied states fall to the error step via the remainder convention, which gets one added sentence ("half-applied states are part of the remainder"). This keeps conditions lean where re-running is harmless and armour where it isn't. The convention renames from "Start conditions exclude half-applied states" to something like "**Half-applied states fall to the error step** — a destructive step additionally excludes partial application in its start condition."

Questions: does the split match your field experience — were the unruly exclusions mostly on steps where a re-run would actually have been harmless? And is agent judgment trustworthy to classify "destructive" at authoring time, or should the spec-check flag every step that mutates state outside the session (files, git, network) as requiring the exclusion?

<!-- 
steps.md has an "the error step" section that we can transfer the **Half-applied states fall to the error step** definition.

we could strengthen the whole convention here. rewrite "the error steps" to include a section for all the general errors it handles and what to do with the error. adding other standard patterns also

- half applied state — Report error to the user, exit the skill, advise to help fix manually, and suggest an issue if appropriate to inform the skill repair agent.
- <other error>

If we do a "hard exit and repair" on most destructive errors, we can keep the skill lean, the repo working, and the skill constantly improving. 

-->

### decision

— The exclusion rule dies entirely; no start condition carries half-applied exclusions. steps.md's error-step section strengthens into a **disposition catalogue**: each general error class paired with its disposition, half-applied states first among them (report the error to the user, exit the skill, advise manual fixing, suggest an issue to inform the skill repair agent — the Dynamic Improvement hook). "Hard exit and repair" is the default posture for destructive errors. Spec-check: the exclusion test is replaced by a disposition check — the error step's engagement covers the common error paths.

## 8. steps.md:87 — refactor Decision to original intention

What it asks: realign the Decision slot with its origin — agent breaks out of computer mode to judge run-emergent state.

### decision

*(inherited from concept 15)* — Keep the discipline, adopt the framing. Three limits verbatim; definition widens to "run state the document could not decide in advance, resolved by the agent's judgment while the step is in play", with scope/shape and reference flip/flop shown as instances. "A decision was made" banned as a finished condition — must resolve to a named fact.

## 9. spec-check.md:9 — incorporate new conventions

What it asks: mine the new/adjusted conventions into checkable tests in the spec-check, then regenerate the saddler usage.

### decision

*(inherited, sequencing)* — Proceed once conventions.md lands (TODOs 1–7 here). Add checks for: conditions-carry-routing, steps-are-universal (multi-in-play legal, chains not required), gates-are-compound (approval is a condition, not the condition), Sharp Prose, Naming-not-Explaining, OR-separator syntax, and whatever TODO 7 decides on half-applied states (note: saddler currently tests FOR exclusion — that check changes or inverts with the decision). Then regenerate drafthorse_saddler.md from the spec-check; never edit the usage directly.

## 10. spec-check.md:65 — new handover location/naming/referencing checks

What it asks: add the new handover conventions to Handover Checks.

### decision

*(inherited from concepts 3/4/6)* — Now unblocked; the conventions exist. Checks to add: file lives in skill root as sibling to the main skill file with `-handover` suffix; `type: handover` frontmatter present and agreeing with suffix+location (mismatch = defect); every citation uses the " — Handover" link form (bare links to handover files = defect); reduced audit profile otherwise full DraftHorse; discovery = glob `*-handover.md` + collect citations, set mismatch flagged; uncited handover = pass but report. The references/-carve-out check (handover.md:71) retires with the migration.

## 11. spec-check.md:234 — new handover audit step

What it asks: add a first-class `## +` audit step executing the Handover Checks, shaped like Test Each Step.

### decision

*(inherited from concept 6)* — Add `## +Audit the Handovers` parallel to the per-step/per-reference steps: start when a handover is discovered (by citation); finished when every Handover Check has been applied to every handover file and findings are recorded. Sequenced after TODO 10's checks exist.

## 12. extensions/rules/DraftHorse.md:1 — stand up the DraftHorse rule set

What it asks: build the consumer-facing operator's manual (utilities, notation, step handling, handover handling, consumer conventions).

### decision

*(inherited from concept 14, partial)* — Build as the operator's manual: consumption knowledge only, structured around the executor's five questions (what's a step / when do I start / when am I done / what's binding / what do I do with a cited link); deliberate duplication licensed (rules sit outside SSoT). Distribution: copied into global or project CLAUDE context, not a plugin default. Preamble stays in documents regardless. Content and scope need a dedicated discussion before writing — deferred, not open here.

<!-- Ive been working on this one...
Made changes to SKILL-template and steps.md trying to integrate the user manual into the step machinery and preamble, making drafthorse self contained. Search terms.
`TODO: Suggested preamble changes`
`TODO: Change the machinery headings`
-->

### decision

— The rule doc is shelved (rules are intentionally redundant); the self-describing direction wins: documents carry their own operator's manual via the preamble + machinery. Settled pieces:

- **Parent/child vocabulary** replaces master/sub-step everywhere: a parent step folds in child steps (handover) or invokes a child skill. Retire "master step" wholesale.
- **Machinery heading renames** adopted: `#### Start this step when these are true:` / `#### Step finished when these are true:` / `#### Agent decision:` / `#### Suggested next actions:` / `#### Step invariants:`. One atomic migration pass — these strings are keyed on by every skill, the templates, spec-check, and saddler.
- **OR separator canonical form**: `**OR these are true:**` between condition-list groups (echoes the heading wording; plain list = implicit AND) — as demonstrated at SKILL-template.md:76.
- **Frontmatter stamp**: `harness-format: DraftHorse, Handover` — one searchable key carrying main format + subtype, comma-separated; replaces `type: handover`; sole frontmatter on handovers; coexists with harness fields on skills. Saddler checks every audited doc is stamped and (for handovers) that stamp, `-handover` suffix, and root location agree.
- **Handover creation template**: `extensions/skills/drafthorse/assets/HANDOVER-template.md` created — stamp, identity paragraph, handover-variant preamble (child-steps contract, no exit/no drain, handback rule), renamed machinery, final step's *Suggested next actions* hands back to the parent step, optional commented-out local problem step. Awaiting fine-tuning.

## 13. environments.md — wire up the surfaces doc

What it asks: build the doc guiding when/how to use the harness extensions DraftHorse runs on.

### decision

*(inherited from concept 12)* — Rename to `surfaces.md` ("DraftHorse Surfaces"). Catalogue format, each entry with a "when to use" appended: Main Skill File, Sub agent (absorbing the concept-10 porting/delivery guidance), Child Skills (git-box as reference implementation), Handover Documents. Hooks/MCP out of scope. Reference from framework README once real.
