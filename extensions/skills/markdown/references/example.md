> Worked example scaffold for the markdown skill. It builds a throwaway README for a
> fictional CLI. Imitate the SHAPE — chat summary, toggles, headings, item and meta
> comments — not the subject matter. Shown at the end of Phase 2 (doc summary), before
> the write. After Phase 3-4 the chat-summary comment and every other comment are
> stripped, leaving a clean README.

<!--
=== CHAT SUMMARY (Phase 1 scaffold — stripped before final) ===
Toggle: + = write into the document (relevant to chat AND doc)
        - = relevant to the chat only, never reaches the final document
Agent sets the first pass; user adjusts. Sections are voluntary — include one
only when real context exists for it.

## conversation
user points
  + CLI named "csv2json" converts CSV on stdin to JSON on stdout
  + install with `pipx install csv2json`
  + --pretty flag indents the output
  + default output is JSON Lines — one object per line
  - user runs it in a nightly cron job
agent points
  + malformed rows are skipped with a warning on stderr
  - suggested a --strict flag, not built

## agent context
recommended
  + list the exit codes — 0 ok, 1 bad input
possible
  - a troubleshooting section
edge cases
  - empty input yields empty output

## meta
user steering
  - keep it short, example-first
decisions
  + emit JSON Lines, not a single JSON array, to stream large files
constraints
  + no network; a pure stdin/stdout filter

## language
vocabulary
  + :record: — one CSV row mapped to one JSON object
  - :filter: — a stdin/stdout program; avoid, say "reads stdin / writes stdout"
style
  - friendly but terse

## audience
agent/human
  - audience is a developer at the terminal
purpose
  - informational — a usage-first README
=== END CHAT SUMMARY ===
-->

# csv2json

<!-- ===META=== one-line tagline naming the tool and what it does -->
<!-- + CLI named "csv2json" converts CSV on stdin to JSON on stdout -->

## Agent Invariants

<!-- ===META=== a terse bulleted list of guarantees the tool always holds; restated from the sections below -->
<!-- + no network; a pure stdin/stdout filter -->
<!-- + malformed rows are skipped with a warning on stderr -->
<!-- + default output is JSON Lines — one object per line -->
<!-- + list the exit codes — 0 ok, 1 bad input -->

## Install

<!-- ===META=== one line, then a fenced command block -->
<!-- + install with `pipx install csv2json` -->

## Usage

<!-- ===META=== short paragraph then a fenced stdin/stdout example; define :record: at first use -->
<!-- + --pretty flag indents the output -->
<!-- + :record: — one CSV row mapped to one JSON object -->
<!-- + malformed rows are skipped with a warning on stderr -->

## Output format

<!-- ===META=== one short paragraph stating the default and the reason -->
<!-- + default output is JSON Lines — one object per line -->
<!-- + emit JSON Lines, not a single JSON array, to stream large files -->

## Exit codes

<!-- ===META=== a short two-row list -->
<!-- + list the exit codes — 0 ok, 1 bad input -->

## Notes

<!-- ===META=== one or two bullets -->
<!-- + no network; a pure stdin/stdout filter -->
