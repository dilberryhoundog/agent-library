# Verification checks

Two tiers over a finished page. Run the static tier always; run the runtime tier whenever a browser is available and report a skipped runtime tier with its reason. Repair before hand-over.

Paths below use `P` for the page and `S` for `extensions/skills/artifact-suite/assets`; re-assign both at the head of every Bash call.

## Static tier

Every check S1-S10 is a subcommand of one script. One command runs them all:

```bash
P=dev/workspace/artifacts/<id>.html
S=extensions/skills/artifact-suite/assets
python3 $S/verify.py $P --static
```

It prints `<check> ok` per passing check and exits non-zero on the first failure, naming the check and the reason. A bare shell copy fails S7 on its placeholders by design; run the static tier on a finished page.

- **S1** `<!doctype html>` is line 1 of the file and the shell stamp text `artifact-suite shell v1` is present.
- **S2** all seven marker pairs present exactly once: `@doc-title`, `@page-meta`, `@masthead`, `@template-style`, `@content`, `@sidebar`, `@template-script`.
- **S3** `#page-meta` parses after replacing `<\/` with `</`; carries `id`, `kind`, `rev`, `title`, `provenance`, `prompt`, `next`.
- **S4** every `article.card` has an `id`; card ids unique; none matches `^[a-z]?\d+$`; every `section[id]` id is unique and is not also a card id.
- **S5** every options card has `checked`, `.recommended` and `data-recommended` agreeing; every `.path` element in the markup sits inside a `.ref` or an `a.ref-link`. Script bodies are excluded from the `.path` scan: the engine's own source carries `class="path"` inside string literals.
- **S6** no `<img src>`, `<link href>` or `<script src>` names any host but `fonts.googleapis.com` and `fonts.gstatic.com`; every other absolute URL in the file sits inside `#page-meta` or a `data-url` attribute — no literal `href` anywhere; the path check prints `OK`.
- **S7** exactly one `<title>`, one `<h1>` and one `id="page-meta"` in the file; no placeholder text (`Untitled`, `>{}<`) survives.
- **S8** the file carries exactly one element matching `class="shell"`, `class="shell rail"` or `class="shell board"`, and no other class on it.
- **S9** every spliced `@style`/`@script` part is byte-identical to its source part in `assets/`: a part whose first non-blank line occurs in the page must occur whole.
- **S10** every `article.card` sits inside a `section[id]`; a card outside one gets no table-of-contents entry.

The path check S6 runs is `references/path-check.sh`; S6 fails when the script is missing, exits non-zero, writes to stderr or prints anything but `OK`. It resolves the mirror for every `data-path` carrying `data-branch`, confirms the file exists and the end of `data-lines` lies within its line count, checks a `data-branch` reference with no mirror with `git cat-file -e <branch>:<path>`, and requires every `data-url` to start with `https://`.

## Runtime tier

Serve the repo over localhost and drive the page with Playwright. `file://` is the page's home, but the runtime tier runs over http so `localStorage` is available in every browser build.

```bash
PORT=$(python3 -c 'import socket; s=socket.socket(); s.bind(("127.0.0.1", 0)); print(s.getsockname()[1])')
python3 -m http.server $PORT --bind 127.0.0.1 --directory "$(git rev-parse --show-toplevel)"
```

Pick a free port — concurrent sessions share the machine and the Playwright browser — start the server in the background, record the pid and the port, and `kill` that pid when the tier finishes. The page is then at `http://127.0.0.1:<PORT>/dev/workspace/artifacts/<id>.html`.

Interaction uses `browser_click` and `browser_type`; `browser_evaluate` reads state and injects the failure conditions V12, V12a and V16 require. Five mechanics recur:

- The browser tab is shared. Open every `browser_evaluate` with `if (!/<id>/.test(location.href)) return { WRONG_PAGE: location.href };` and re-navigate when it fires.
- A check that reads a transient message fires the click and reads `#status` from a `setTimeout` inside the same `browser_evaluate` call, resolving a promise after 300-400ms: `copyText` resolves through the clipboard promise, so a synchronous read sees an empty line, and `flash` clears it after 2500ms, so a separate tool call arrives too late.
- View toggles. `#out` holds the prompt only while `#outwrap` is open and empties when it closes; close before re-opening, and read `#out` only while it is open.
- A check that edits the page file and reloads must defeat the browser cache — append a changing query string to the URL (`?v=2`). Without it a reload can serve the previous bytes and the check reads a stale page.
- A check that removes a card from the page file does it with `printf '' | python3 $S/splice.py $P card <cardId>` on a scratch copy, and restores the copy afterwards.

- **V1** zero console errors and warnings; the `card without id` warning absent.
- **V2** ToC entry count equals `article.card[id]` count; `.respond` count equals `article.card[id]:not([data-answer="none"]):not(.needs-id)` count. Count the entries in the DOM of `#toc-column`: on the bare `.shell` the column is `display: none` at every width and the pill row lists sections only.
- **V3** no hand-written `input[type=radio]` or `textarea` outside the engine's `.respond` and `.loose`, except inside `.options` (options cards) or inside a `.demo` (demo controls, which never carry `data-card`). `#out` is shell furniture and is excluded.
- **V4** every verdict radio group `name` is `v-<cardId>` of its own card. Radios inside a `.demo` are the demo's own and carry their own names.
- **V5** theme: Light then Dark change the computed `--paper` (each direction changes it; a click that matches the system theme leaves the value where it already was); System removes `data-theme` and `artifact-suite.theme`.
- **V6** the pre-paint script is the first `<script>` and precedes `<style>`.
- **V7** choose a verdict, type a multi-line comment, reload: both restore with line breaks.
- **V8** every key left in `localStorage` starts with `artifact-suite.page.<id>` except `artifact-suite.theme`. `capabilityGate` writes and immediately removes `artifact-suite.__probe`; it is a probe, not a stored key.
- **V9** Clear returns a card to unanswered: the stored entry is deleted, the comment empties, the `data-recommended` pre-check is re-applied, and the card leaves the prompt.
- **V10** nothing touched → Copy flashes the nothing-answered message and View shows `_No responses entered._`; one card answered → prompt has the `Source:` line, that card as `**<cardId> · <title>**`, no untouched card, and an `Untouched:` line whose two counts equal the untouched cards with and without `data-recommended`. Either clause drops at zero and the whole line drops when both are zero. Cards carrying `data-answer="none"` count in neither.
- **V11** Accept all records the pre-checked defaults and they appear in the prompt. Run it against a page with at least one untouched `data-recommended` card: a card already touched is skipped, and the flash then reads `0 cards recorded as agreed`.
- **V12** mutate one card's text in the page file, reload: `.changed` on that card only, all other answers intact, and Dismiss clears the strip; answer a card carrying a `details.ref` or an `a.ref-link`, reload without editing: no `.changed` on it. Exit: Dismiss, restore the file, reload, then Clear that card — Dismiss writes the mutated fingerprint into the stored entry, and the reverted card reads as changed until its entry is cleared.
- **V12a** answer two cards, remove one card from the file, reload: `#held-note` reports one held answer, Show lists its id and title, the prompt carries the `Held:` line, and Discard empties it; a card restored under the same id, with its text unchanged since it was answered, carries `.chip.earlier`.
- **V12b** a section carrying `data-loose` gets a `.loose` box; typing in it and copying puts `**<sectionId> · <h2 text>**` after the cards in the prompt.
- **V13** every generated `a[href*="://"]` carries `target="_blank" rel="noopener"` and every in-page `#` anchor carries neither; every chip a ref actually renders has an href with no `undefined`, `null` or empty segment; a plain ref renders Disk, Editor and GitHub and its GitHub href contains `commit`; a `data-branch` ref whose mirror exists resolves under `dev/branches/<branch>/` and shows `.mirror`; a `data-branch` ref with no mirror carries `ref--nodisk` and renders GitHub alone; with `editor: null` no Editor chip is rendered; with `data-origin` set to `web` through `browser_evaluate`, `.ref-disk` and `.ref-editor` are both hidden and GitHub is solid; a `data-url` ref renders `.ref-site` alone; exactly one route chip is solid per ref at either origin. Solid means a computed `background-color` equal to the computed `--accent`; the route chips are `.ref-disk`, `.ref-editor`, `.ref-gh` and `.ref-site` — `.ref-copy` is a button, never a route, and is not counted.
- **V14** at 1440, 1100, 900 and 390px, `scrollWidth <= innerWidth + 1`; in `.shell.rail` below 1040 the column is hidden and the pill row visible.
- **V15** each filter leaves visible exactly the cards carrying that `data-tag`, and sets `hidden` on the matching `#toc-column` rows (`li`); `unanswered` leaves the cards whose entry is absent or `touched: false`. The pressed filter button keeps keyboard focus. The ToC clause is read from the DOM: on the bare `.shell` the column is not displayed.
- **V16** with `navigator.clipboard` removed — `Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true })`, then assert `typeof navigator.clipboard === "undefined"`; a plain `delete` is a silent no-op on the prototype accessor — Copy reports through `#status` without throwing; with `document.execCommand` forced to return false as well, `#outwrap` opens and the message is red; `#status` has `role="status"`. The `capabilityGate` clause — it removes any `[data-needs="fs"]` element when `window.showSaveFilePicker` is absent — is not applicable to a built page or a fixture: the gate reads the function once at boot, and only a scratch copy carrying a script above the engine can delete it first.
- **V16a** scroll so the second section sits in the observer band (roughly a quarter of the viewport from the top), with `scrollTo({ top, behavior: "instant" })` — the shell's smooth scrolling is still moving when a 700ms read fires on a long page: exactly one link in each of `#toc-column` and `#toc-pills` carries `aria-current="true"`, and it names that section. A short last section on a page already scrolled to its end cannot reach the band; shorten the viewport height so the scroll can place it there.
- **V17** on a card carrying `data-recommended`, clicking the already-checked recommended radio marks it touched and puts it in the prompt; loading the page and touching nothing leaves it out.

A check whose feature the page does not carry — V12b on a page with no `data-loose` section, the reference clauses of V13 on a page with no `details.ref`, the `capabilityGate` clause of V16 on any page the skill builds — passes with nothing to test. Record it as not applicable rather than as a pass.

## Fixtures

`tests/fixtures/review-fixture.html`, `interview-fixture.html` and `demo-fixture.html` freeze provenance (`id: "fixture-<kind>"`, `commit: "0000000000000000000000000000000000000000"`, `date: "2000-01-01"`, `branch: "fixture"`) and are the regression suite. After any change to the shell, a template or a block, run both tiers over all three before committing. A fixture that must change to keep passing is a contract change and is re-committed with the shell change.

Between fixtures, and before any check that starts from an empty page, clear the stored document: every local page shares one origin, and a fixture keeps its answers until they are cleared.

The three fixtures cover the checks between them: the review fixture carries the reference block with the reference set, the diff, the quote, the withdrawn card, the options card and a `data-loose` section; the interview fixture carries an answered record and two open questions; the demo fixture carries the inline strip and the board, and pins `editor: null` so V13's Editor clause has a page to run on.
