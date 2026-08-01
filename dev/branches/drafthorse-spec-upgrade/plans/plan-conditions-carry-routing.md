# Plan: Conditions Carry Routing

Status: Ready. Sources: TODO 1 (the conventions.md:8 mining quote). Decision in [todos-discussion.md](todos-discussion.md) §1.

## Decision

Two separate idioms, side by side with [plan-steps-are-universal.md](plan-steps-are-universal.md). This bullet: "**Conditions carry routing** — a step releases on its finished condition, the next catches on its start; no interstep routing exists; *Suggested next actions* is an optional pointer, never the mechanism." The mined quote and the struck-through "Steps are standalone" bullet are both replaced by the idiom pair.

## Work

- `docs/drafthorse/framework/conventions.md` — delete the TODO block at line 8 (quote + struck bullet); write the finished bullet adjacent to the Steps-are-universal bullet.
- `docs/drafthorse/framework/steps.md` — the intro (lines 5–9) already carries this in prose; align its wording with the convention's final phrasing ("do this next" slot name updates via [plan-machinery-headings.md](plan-machinery-headings.md)).

## Dependencies

- Written in the same session as [plan-steps-are-universal.md](plan-steps-are-universal.md).
- Slot-name references ("Suggested next actions") assume [plan-machinery-headings.md](plan-machinery-headings.md) — write the bullet with the NEW name; the migration plan sweeps stragglers.
- Feeds [plan-spec-check-saddler.md](plan-spec-check-saddler.md) (check: routing leaking into prose or finished conditions).
