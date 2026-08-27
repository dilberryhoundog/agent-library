---
harness-format: DraftHorse, Handover
---

# Media Processing (Handover)

Supply verified, fallback-backed media links for the concepts in a build that includes media. A parent step folds this in whenever a build needs media (currently video).

# --- REFERENCES ---

## Durable Link Forms

=== order of preference — least likely to rot first ===
a. A channel home page (e.g. `youtube.com/@Numberblocks`).
b. A search-by-title URL for a specific episode/lesson.
c. A hardcoded `watch?v=` link — only when verified and from a large, stable source. Hardcoded video IDs break most often; never use one as the sole link.

## Vetted Channel Database

=== the growing list of reliable channels, by area ===
[Vetted Video Channels](references/vetted-video-channels.md) — pre-vetted channels to prefer when sourcing links. External data that grows over time; load it when building a candidate set.

## Standing Note for a Media Library Page

=== paste onto any delivered media library page ===
Links can shift over time, but the channel name + title will find the media in seconds. Consider pre-downloading a playlist before low-signal stretches.

# --- STEPS ---

Handover holds child steps of a parent step. Marked `## +<Child Step Name>`. Same step rules apply, plus these. Parent step reads success from the state child steps leave behind. All child steps finished or inactive — return to the parent step and continue. Parent document covers error handling, unless an optional child error step is present. Global invariants hold across the parent step's span. Step invariants confine to their own child step.

## +Assemble and Verify Links

For each concept, build a small set of durable candidate links and prove each one live.

#### Start this step when these are true:

- a build needs media for one or more concepts

#### Step finished when these are true:

- every concept has either 2–3 live-verified links in preferred-durable form, or is marked *no suitable media* after a real search turned up nothing usable

#### Step invariants:

**NEVER** invent a URL or assume one from memory — every link is confirmed against a live search before it is used.
**NEVER** leave a concept resting on a single link.

### Build and Prove the Set:

For each concept, draw 2–3 candidate links favouring the [Durable Link Forms](#durable-link-forms) order, preferring the channels in the [Vetted Channel Database](#vetted-channel-database) (large, stable, rarely delete content). Verify each candidate with a real web search or fetch to confirm the channel/episode exists and is current, and drop any that fail. If a concept has no suitable media after a genuine search, mark it *no suitable media* rather than forcing a weak link — the parent step's format decides how a no-media lesson reads.
