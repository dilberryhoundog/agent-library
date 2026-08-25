# Runtime

The engine is one IIFE at the foot of `assets/shell.html`. It parses `#page-meta`, attaches a response surface to every card, keeps one `localStorage` document per page, fingerprints each card so a changed one is flagged, and composes the return prompt. The agent writes `#page-meta`, the cards and their attributes; the engine writes everything else.

## `#page-meta`

The sole agent-authored data surface: one `<script type="application/json" id="page-meta">` inside the `@page-meta` region. Prose lives in markup, never here. Unknown keys are ignored.

```json
{
  "id": "artifact-suite-investigation", "kind": "review", "rev": 1,
  "title": "Artifact suite — investigation",
  "provenance": { "repo": "https://github.com/dilberryhoundog/agent-library",
    "root": "/Users/dylangraham/Projects/agent-library",
    "self": "dev/workspace/artifacts/artifact-suite-investigation.html",
    "branch": "artifacts", "commit": "b966a43f1c2d4e5a6b7c8d9e0f1a2b3c4d5e6f70",
    "issue": null, "pr": null, "date": "2026-08-24",
    "builtAt": "2026-08-24T03:12:07Z", "editor": "vscode" },
  "prompt": { "heading": "Response — artifact suite investigation" },
  "next": ["Apply every accepted card before writing code."]
}
```

- `id` — kebab slug naming the page's subject; permanent once published; the storage key and the file name.
- `kind` — `review`, `options`, `issue`, `interview` or `demo`; selects the default verdict set and the eyebrow label.
- `rev` — starts at 1; the agent increments it in the same splice that updates `date`, `builtAt` and `commit`. It names which revision an answer belongs to and never decides staleness.
- `title` — equals the `<title>` and the `<h1>`; the prompt heading falls back to it.
- `provenance` — the ten fields in `references/provenance.md`.
- `prompt.heading` — emitted as `## <heading>`, no leading `##`. `next` — strings under `### Next`; may be `[]`.

A missing block, unparseable JSON or absent `id` flashes a red notice and substitutes `{id: "unknown-page", kind: "review", rev: 1, title: document.title, provenance: {}, prompt: {}, next: []}`.

### The `<\/` rule

A literal `</` inside a JSON string ends the enclosing script block, so every `</` in `#page-meta` is written `<\/`, which JSON reads back as `/`. Read the region back with `python3 $S/splice.py $P show page-meta`.

## Card contract

A card is `<article class="card" id="<cardId>" data-tag="integrate">`. The `id` names the subject (`storage-key-scheme`, `ds-1`, `issue-45`), never a position; it keys the stored answer, the radio `name`, the ToC anchor and the deep link, and is permanent. A card without an `id` gets class `needs-id`, a console warning and no surface; an id matching `/^[a-z]?\d+$/i` is warned about and still wired.

| attribute          | form                                             | effect                                                                                          |
|--------------------|--------------------------------------------------|-------------------------------------------------------------------------------------------------|
| `data-tag`         | `integrate`, `yourcall`, `defer`                 | card edge colour, chip match, filter bucket                                                     |
| `data-verdicts`    | pipe-separated labels, `"Agree\|Revise\|Reject"` | verdict options; absent falls back to the kind's default set                                    |
| `data-recommended` | the exact text of one option                     | pre-checks it, gives its label `.recommended` and a `.rec` badge, makes `Accept all` target it  |
| `data-answer`      | `verdict` (default), `options`, `none`           | `options`: the agent wrote the `.option` radios, the engine binds them; `none`: no surface, no restore |

Defaults: `review` `Agree|Revise|Reject`, `issue` `Accept|Amend|Defer`; `options`, `interview` and `demo` are empty, so their answering cards carry `data-verdicts` or `data-answer="options"`. The engine appends `.respond` — `.verdicts` radios named `v-<cardId>`, a textarea, Clear — as the card's last child. A `<section data-loose="<label>">` gets a `.loose` comment box. Three delegated listeners on `document` dispatch on `event.target.closest("[data-card],[data-section],[data-filter],[data-held]")`; a click on an already-checked radio is recorded as a decision.

## Storage document

`artifact-suite.page.<id>` holds the page document; `artifact-suite.theme` holds `"light"` or `"dark"`, absent meaning follow the system. Every local page shares one origin over `file://`, so a duplicate id merges two pages' answers.

The document is `{schema: 1, pageId, rev, savedAt, cards, sections, orphans}`. A card record holds `verdict`, `comment` (raw newlines), `fingerprint`, `answeredAt`, `touched`, `rev`, `title`; a section record `comment`, `touched`, `answeredAt`, `title`; an orphan is either kind of record for an id no longer on the page, a section's carrying `section: true`. Reads and writes are wrapped and fall back to an in-memory map; a save that fails mid-session renders `#storage-note` and flashes a red warning. Writes debounce 200ms.

## Fingerprints, changed cards, held answers

`fingerprintOf(card)` clones the card, removes `.respond`, `.changed`, `.chip.earlier`, `.ref-links`, each reference's `summary`, every `a.ref-link`, any `.demo` and the diff block's generated copy button, then DJB2-hashes the normalised text plus `data-tag` and `data-verdicts`. The hash covers authored prose alone, so it is the same before and after the reference and diff scripts run and re-indenting is not a change.

On restore: equal fingerprint — verdict and comment restored, `.chip.earlier` (`Answered earlier`) appended to the chiprow; different — restored, then the amber `.changed` strip `Changed since you answered (rev <n>).` with Dismiss, which re-fingerprints and clears the strip; no entry — the card stays as authored with `data-recommended` pre-checked. A `data-answer="none"` card reclaims its held record but writes nothing back and stays out of the prompt.

`collectOrphans()` moves every stored card or `data-loose` section id with no match on the page into `orphans`, then renders `#held-note` in `#foot`: `<n> answers held for cards no longer on this page.` with Show and Discard. An id that returns reclaims its record. `acceptAll()` records the recommended verdict on every untouched `data-recommended` card; `clearCard()` resets one card and deletes its entry.

## Return prompt

`composePrompt()` returns `""` when nothing is touched and nothing is held, otherwise:

- `## <prompt.heading or title>`, blank, `Source: <root/self> · branch <b> · <issue url> · <pr url> · rev <n> · built <date>` (empties dropped).
- `Untouched: 4 left at their recommended default, 3 unanswered.` — bare counts; `data-answer="none"` cards count in neither; a zero clause drops, and the line drops at two zeros.
- `Held: <n> answers for cards no longer on this page (<ids>).` when orphans exist.
- `### Decisions`: each touched card in document order as `**<cardId> · <h3 text>**`, `- Verdict: <v>` when set, `- Note: <text>` for one line or `- Note:` with each line indented two spaces and blank lines bare, `- <data-report>: <state>` for a `.demo` inside the card; then touched sections as `**<sectionId> · <h2 text>**`. Omitted when nothing is touched.
- `### Next` with `next` as a `-` list; omitted when empty. Then `Re-open: <location.href>`, decoded on `file:`.

Filtering never affects composition. Copy flashes `Nothing answered yet — nothing to copy.` on an empty prompt; View toggles `#outwrap`, filling `#out` with the prompt or `_No responses entered._` and emptying it on close.

## `window.SUITE`

Block and demo scripts reach `SUITE.copyText(text, onDone)` — the only clipboard path, falling back to `execCommand("copy")` and then to revealing `#out`; `SUITE.flash(msg, bad)` — `#status`, cleared after 2500ms unless `bad`; and `SUITE.meta`, the parsed `#page-meta`, read-only.
