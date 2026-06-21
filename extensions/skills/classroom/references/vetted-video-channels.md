# Vetted Video Channels & Link Handling

Dead links are a common failure mode for video-based lessons, and a dead link mid-lesson on patchy signal has no quick fix. This file lists reliable channels and the link procedure behind Agent Invariant 3.

## The link-handling procedure (mandatory when a build includes video)

1. **Prefer links that don't rot.** In order of preference: a. a channel home page (e.g. `youtube.com/@Numberblocks`), b. a YouTube search-by-title URL for a specific episode/lesson, c. a hardcoded `watch?v=` link only when verified and from a large, stable channel. Hardcoded video IDs are the most likely to break — avoid them as the sole link.
2. **Always give 2–3 alternatives per concept**, so a dead link is never a dead lesson.
3. **Verify before committing.** Run a real `web_search` / `web_fetch` to confirm the channel/episode exists and is current. Never invent a URL or assume one from memory.
4. **Prefer the channels below** — large subscriber bases, consistent upload history, rarely delete content, generally ad-light within educational content.
5. **Add the standing note** to any video library page: links can shift over time, but the channel name + video title will find it in seconds. Suggest the family pre-download a playlist before low-signal stretches.

## Reliable channels (by area)

Confirm currency at build time; treat the list as a starting point and add to it as new reliable channels prove out.

**Early literacy / phonics**

- Alphablocks (BBC) — animated letters as blocks; sounds, blending, digraphs. Strong fit for LEGO-minded learners since the characters are blocks.
- Mr T's Phonics / Geraldine the Giraffe — puppet-based phonics, gentle pace.

**Early maths / number sense**

- Numberblocks (BBC) — number sense through characters built from blocks.

**Primary–secondary maths**

- Math Antics — clear, single-concept lessons.

**Science / nature**

- SciShow Kids — short, engaging science for primary ages.
- BBC Earth / Nat Geo Wild — documentary clips for nature and zoology (screen content framing against the family's worldview setting).

**Faith / character (when a biblical framing is requested)**

- BibleProject — concept explainers.
- Saddleback Kids — Bible stories for younger children.

| Name                                   | Category                       | Channel | Description                                                                                                                  |
| -------------------------------------- | ------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Alphablocks (BBC)                      | **Early literacy / phonics**   |         | Animated letters as blocks; sounds, blending, digraphs. Strong fit for LEGO-minded learners since the characters are blocks. |
| Mr T's Phonics / Geraldine the Giraffe | **Early literacy / phonics**   |         | Puppet-based phonics, gentle pace.                                                                                           |
| Numberblocks (BBC)                     | **Early maths / number sense** |         | Number sense through characters built from blocks.                                                                           |
| Math Antics                            | **Primary–secondary maths**    |         | Clear, single-concept lessons.                                                                                               |
| SciShow Kids                           | **Science / nature**           |         | Short, engaging science for primary ages.                                                                                    |
| BBC Earth / Nat Geo Wild               | **Science / nature**           |         | Documentary clips for nature and zoology                                                                                     |
| BibleProject                           | **Faith / character**          |         | Concept explainers                                                                                                           |
| Saddleback Kids                        | **Faith / character**          |         | Bible stories for younger children.                                                                                          |

## When no good video exists

Some lessons will not have a suitable video. Omit the watch step cleanly for that lesson rather than forcing a weak link, and match however the approved format handles a no-video lesson.
