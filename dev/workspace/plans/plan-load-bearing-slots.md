# Plan: Load-Bearing Slot Sites

Status: OPEN — sites inventoried by audit, none verified, none approved. Source: the slot audit recorded in [plan-slot-removal.md](plan-slot-removal.md).

## Why this plan exists

[plan-slot-removal.md](plan-slot-removal.md) assumed the `#### Suggested next actions:` slot was a redundant hint everywhere, with four sanctioned uses each having a planned replacement. The audit disproved that. Thirteen slots carry instruction no condition, invariant, or engagement in their document expresses. Deleting them destroys routing silently.

That is document repair, not vocabulary migration. It needs its own approval cycle, because each site is a behaviour decision about a shipped skill rather than a mechanical substitution.

Two sites carry a second, worse property: the slot is the only exit an abandoned run has. Two more sit in the templates as shipped text, which is how the defect propagated into three skills.

## Scope

Eleven load-bearing sites plus one ambiguous site. Nothing else. The hint sites belong to [plan-slot-removal.md](plan-slot-removal.md) and the corpus sweep.

### Gap 1 — termination lives in the slot

Seven sites. The exit step's finished conditions never say the run is over; the slot says it instead.

- `extensions/skills/git-box/SKILL.md:233` — `+Present Report`. Sharpest case: git-box has no success exit at all. On a full success not worth saving as a workflow, no start condition holds and no finished condition ends the run.
- `extensions/skills/drafthorse/SKILL.md:214` — `+Deliver`. Finished condition covers user acceptance, never completion. No later step exists.
- `extensions/skills/git/agent-commit/SKILL.md:240` — `+Result`. Handback to git-robot stated only in the slot.
- `extensions/skills/git/agent-push/SKILL.md:116` — `+Result`. Same line, same gap.
- `extensions/skills/git/agent-switch/SKILL.md:170` — `+Result`. Same line, same gap.
- `extensions/skills/drafthorse/assets/SKILL-template.md:114` — success exit, shipped as real text.
- `extensions/skills/drafthorse/assets/SKILL-template.md:137` — error step, shipped as real text.

The two shipped template lines are the origin. Every document generated from the template inherited an exit whose termination fact sits in the slot. Repair the template first; the derivative sites then follow one pattern.

### Gap 2 — serialisation discipline

One site. `extensions/skills/versioning/SKILL.md:167` — `+Range`, carrying "Release the chosen units one at a time, in the order chosen."

`+Breaking Changes` starts on a condition simultaneously true for every chosen unit, and the preamble sanctions several steps in play. Nothing else in the document prevents interleaved unit releases or fixes the order to the user's chosen order. The fact is ordering, which conditions cannot express — it wants an invariant.

Fits none of the four sanctioned uses. No planned replacement exists.

### Gap 3 — the error step is the only exit an abandoned run has

Two sites, both reading "Resume the step the user chose, or end the skill."

- `extensions/skills/versioning/SKILL.md:383` — `+Handle a Problem`. Resume is covered by re-holding start conditions. `+Finish` starts on every requested unit being released, declined, or reported empty; a run abandoned mid-release satisfies none.
- `extensions/skills/drafthorse/SKILL.md:234` — `+Handle a Problem`. Same termination gap, plus a second orphan fact: the un-approval cascade, which every gate-shaped start condition in that skill silently depends on and which the document states nowhere else. The framework carries it, but a skill must be cold-readable.

`extensions/skills/classroom/SKILL.md:396` carries the identical sentence and is safe. Its `+Conclude` claims the user-ended run explicitly. The difference is real and worth reading before writing versioning's and drafthorse's replacements — classroom already models the fix.

### Site 13 — a behaviour question, not a repair

`extensions/skills/git/agent-switch/SKILL.md:102` — `+Stash`. The slot's no-op clause is the only thing stopping a clean-tree stash no-op from continuing into an unstashed switch. `+Result` starts on refusal, failure, or conflict; a no-op is none of the three.

Two defensible behaviours. Either `+Result` claims the no-op and the run ends, or a no-op should not end the run and `+Read Procedure` correctly re-holds. Decide the behaviour, then write it. Never pick one silently.

### The ambiguous site

`extensions/agents/git-robot.md:190` — `+Report`, carrying "Finish your turn." The finished condition implies the stop without stating it; no start condition holds afterward, so the agent stops anyway. `extensions/agents/doc-reviewer.md:185` closes the same doubt with "as the final message text".

Adopt doc-reviewer's phrasing. One phrase, no behaviour change, closes the doubt whichever way the slot decision lands.

## Procedure

Four stages. A site does not advance until its current stage closes.

**1. Verify.** Every site above is an audit agent's claim, read once and unconfirmed. Open each file, read the whole owning step and every step its slot names, and confirm the gap is real. A site whose conditions turn out to carry the routing drops to the hint set and leaves this plan. Record each drop.

**2. Recommend.** Per surviving site, write one recommendation: the exact replacement text, the step and machinery heading it lands in, and the shape it takes — finished condition, alternative start block, or invariant. Where two behaviours are defensible, present both and name the trade.

**3. Approve.** The user approves each site individually. A rejected recommendation returns to stage 2. No site is edited on a recommendation the user has not seen.

**4. Apply and prove.** Write the approved change. Then walk the document's routing end to end, including the path the slot used to carry, and confirm the run reaches an exit without it. A document that cannot terminate after the edit is not done.

## Work

- `extensions/skills/drafthorse/assets/SKILL-template.md` — first, before any derivative site. Wave 2 held its two slots out deliberately; they are this plan's opening work.
- `extensions/skills/git-box/SKILL.md` — either a terminating finished block on `+Present Report`, or a success exit step the skill currently lacks. Structural, not a one-line fix.
- `extensions/skills/versioning/SKILL.md` — two sites, `+Range` and `+Handle a Problem`. Different shapes: one invariant, one alternative start block on `+Finish`.
- `extensions/skills/drafthorse/SKILL.md` — two sites, `+Deliver` and `+Handle a Problem`. The second also rehomes the un-approval cascade as a global agent invariant.
- `extensions/skills/git/agent-commit/SKILL.md`, `agent-push/SKILL.md`, `agent-switch/SKILL.md` — the three parallel `+Result` handbacks take one wording. `agent-switch` additionally carries the `+Stash` behaviour call.
- `extensions/agents/git-robot.md` — the ambiguous `+Report` phrasing.

Salvage, owed by [plan-slot-removal.md](plan-slot-removal.md) and tracked here so it is not lost: `extensions/skills/drafthorse/references/condition-writing.md:44`, second bullet. A happy-path-only pointer overriding a destination's own refusal is stated nowhere else in the authoring guides. Rehome before that section is deleted.

## Dependencies

- Blocks [plan-slot-removal.md](plan-slot-removal.md) at these sites alone. The hint sites need nothing from this plan and sweep normally.
- Framework document work is unaffected. `steps.md`, `notation.md`, `conventions.md` carry spec prose about the slot, not slots.
- The template sites gate everything downstream of them.
- **Split across two waves.** `SKILL-template.md`'s two sites and `drafthorse/SKILL.md`'s two run in wave 4, because the pilot document must be complete before the rebuilt saddler audits it. The remaining seven run in wave 5. The procedure below is identical in both.
- Independent of [plan-step-functions.md](plan-step-functions.md) and [plan-error-step-naming.md](plan-error-step-naming.md). Those touch a step's head and its vocabulary; this touches conditions and invariants.

## Definition of done

Every one of the eleven sites verified, recommended, approved, applied, and its document proven to terminate without the slot. The ambiguous site settled. The salvage bullet rehomed.

Until that holds, the corpus sweep may not delete a slot at any site named here. Deleting one early is the exact failure this plan exists to prevent.

## Orientation to issue #38

Issue #38 completes when the step anatomy migration lands whole: the slot retired, functions declared, the error step named once, and the preamble prose swept — with no document left broken by the removal.

This plan owns the last clause. It is a prerequisite of the corpus sweep, not an extension of #38's scope: the work was always implied by retiring the slot, and only became visible once the audit ran. It closes before the sweep, and #38 cannot close before it.
