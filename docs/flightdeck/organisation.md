# Organisation

Where a flightdeck lives, by profile, and how it reaches its reader. The family name is the slug everywhere: `flightdeck` in paths, skill names and invocations.

## Current state

The layout below is the target. As of 2026-08-26 the only instrument is at `extensions/artifacts/prompt-builder/prompt-builder.html`; the skill is being built under the working name `artifact-suite` in the `artifacts` workspace; `extensions/artifacts/flightdeck/`, `extensions/skills/flightdeck/` and `dev/workspace/flightdecks/` do not exist yet. An agent creating a flightdeck uses the target paths and creates a missing directory.

## Instruments

- Source: `extensions/artifacts/flightdeck/<name>/<name>.html`, with a README beside it. `artifacts` stays the directory; the family name sits beneath it.
- Distribution: symlinked into a plugin like every other asset in this repository; the `chat-tools` plugin is the host for prompt builder and the FlightDeck skill.
- Per repository: an instrument may also be copied into a repository by dev-workspace, and runs there with no dependency on this one.

## Readouts and demos

A readout lands in the dev-workspace directory its kind names. The mapping is binding; new kinds are added to it here.

- review → `dev/workspace/reviews/`
- discovery, research → `dev/workspace/research/`
- plan, interview, options → `dev/workspace/plans/` (an answered interview stays where it was built)
- agent task brief → `dev/workspace/tasks/`
- demo, dashboard, anything with no kind directory → `dev/workspace/flightdecks/`

A readout's file name is its id: `<id>.html`, a kebab slug of its subject. A revision reissues the same file; the skill's mechanism carries the person's answers across. Archiving the workspace (`dev-workspace archive`) snapshots every readout with its context into `dev/branches/<branch>/`.

Where dev-workspace is absent, a readout lands beside the work it reviews and is named the same way.

## Skill and documentation

- Skill: `extensions/skills/flightdeck/`, invoked as `/flightdeck`, symlinked into `chat-tools`.
- Documentation: this folder, `docs/flightdeck/`.

## Delivery

- A flightdeck is a plain HTML document with a doctype, opened from disk. Links are disk-first; `file://` is the primary origin.
- Verification renders it over local http in a real browser, using the command the skill gives; the server is started under `timeout` so it ends on its own, and no kill permission is granted.
- Publishing means shipping through the claude.ai Artifact tool, which wraps a page in its own document skeleton. Preparing a flightdeck for it — removing the doctype and document wrapper — is separate work; until that exists, a flightdeck is not published.
