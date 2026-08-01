---
harness-format: DraftHorse, Handover
---

# Media Processing (Handover)

Supply verified, fallback-backed media links for the concepts in a build that includes media. A parent step folds this in whenever a build needs media (currently video).

Dead links are a common failure mode for media-based lessons, and a dead link mid-lesson on patchy signal has no quick fix — which is why every link is verified live and never stands alone.

# Agent Invariants

**NEVER** invent a URL or assume one from memory — every link is confirmed against a live search before it is used.
**ALWAYS** supply 2–3 alternatives per concept, so a single dead link is never a dead lesson.

# --- REFERENCES ---

## Durable Link Forms

=== order of preference — least likely to rot first ===
a. A channel home page (e.g. `youtube.com/@Numberblocks`).
b. A search-by-title URL for a specific episode/lesson.
c. A hardcoded `watch?v=` link — only when verified and from a large, stable source. Hardcoded video IDs break most often; never use one as the sole link.

## Vetted Channel Database

=== the growing list of reliable channels, by area ===
`references/vetted-video-channels.md` — pre-vetted channels to prefer when sourcing links. External data that grows over time; load it when building a candidate set.

## Standing Note for a Media Library Page

=== paste onto any delivered media library page ===
Links can shift over time, but the channel name + title will find the media in seconds. Consider pre-downloading a playlist before low-signal stretches.

# --- STEPS ---

> Handovers are child steps of a parent step:
>
>- The parent step reads success from the state the handover leaves behind.
>- Invoke a child step any time its *start* conditions are met.
>- If all child steps are *finished* or inactive, return to the parent step and continue.
>- Error handling is covered by the parent document, unless an optional child problem step is present.
>- Global invariants apply across the whole parent step; step invariants are confined to the child step.

## +Assemble and Verify Links

For each concept, build a small set of durable candidate links and prove each one live.

#### Start this step when these are true:

A build needs media for one or more concepts, and those concepts are not yet resolved — neither verified links nor a *no suitable media* mark against them.

#### Step finished when these are true:

Every concept has either 2–3 live-verified links in preferred-durable form, or is marked *no suitable media* after a real search turned up nothing usable — with no unverified or invented link left in the set.

### Build and Prove the Set:

For each concept, draw 2–3 candidate links favouring the `Durable Link Forms` order, preferring the channels in the `Vetted Channel Database` (large, stable, rarely delete content). Verify each candidate with a real web search or fetch to confirm the channel/episode exists and is current, and drop any that fail. If a concept has no suitable media after a genuine search, mark it *no suitable media* rather than forcing a weak link — the parent step's format decides how a no-media lesson reads.
