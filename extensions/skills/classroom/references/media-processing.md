---
type: handover
---

# Media Processing (Handover)

Supply verified, fallback-backed media links for the concepts in a build that includes media. A handover doc — an invoking step calls this whenever a build needs media (currently video), and this hands back a per-concept set of durable, live-verified links (or a clean no-media outcome) for that step to place into the documents. Tool grants come from the calling skill.

Dead links are a common failure mode for media-based lessons, and a dead link mid-lesson on patchy signal has no quick fix — which is why every link is verified live and never stands alone.

# Agent Invariants

**NEVER** invent a URL or assume one from memory — every link is confirmed against a live search before it is handed back.
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

> A step is in play from when its *start* condition applies until its *finished* conditions are fully met; multiple steps can be in play at once.
>
>- Fully meet a step's *step finished when* conditions before considering it done.
>- *Do this next* guidance, when present, points the way onward; a step's own start condition is what admits it.
>- If a step cannot be completed, move to the step that handles the condition/error.
>- Steps loop back and stay in play while others run, this is intended. Keep going until you finish a step that ends the skill.

## +Assemble and Verify Links

For each concept, build a small set of durable candidate links and prove each one live.

#### Start this step when:

A build needs media for one or more concepts, and those concepts do not yet have verified links.

#### Step finished when:

Every concept has either 2–3 live-verified links in preferred-durable form, or is marked *no suitable media* after a real search turned up nothing usable — with no unverified or invented link left in the set.

### Build and Prove the Set:

For each concept, draw 2–3 candidate links favouring the `Durable Link Forms` order, preferring the channels in the `Vetted Channel Database` (large, stable, rarely delete content). Verify each candidate with a real web search or fetch to confirm the channel/episode exists and is current, and drop any that fail. If a concept has no suitable media after a genuine search, mark it *no suitable media* rather than forcing a weak link — the invoking step's format decides how a no-media lesson reads.

## +Confirm Coverage and Hand Back

Report the verified set and hand it back to the caller.

#### Start this step when:

Every concept that needs media has verified links or is marked *no suitable media*.

#### Step finished when:

The verified per-concept link set and the standing note have been handed back to the invoking step.

#### Do this next:

Return to the invoking step with the outcome.

### Report and Hand Back:

Hand back to the invoking step the outcome **media links verified** — for each concept, its 2–3 live-verified links (or the *no suitable media* mark), together with the `Standing Note for a Media Library Page` to place on any delivered media library page — so the invoking step can insert them into the documents.

## +Handle a Problem

Surface anything the other steps don't cover, and hand a failure outcome back.

#### Start this step when:

Something has gone wrong, or a situation has arisen that no other step covers — live search is unavailable, so no link can be verified.

#### Step finished when:

The user has been informed of what happened, and the failure outcome has been handed back to the invoking step.

#### Do this next:

Return to the invoking step with the outcome.

### Surface the Problem:

Tell the user plainly what happened and which concepts are affected. Hand back to the invoking step the outcome **links not verified**, naming the reason, so it can decide whether to retry, defer the media, or continue without it.
