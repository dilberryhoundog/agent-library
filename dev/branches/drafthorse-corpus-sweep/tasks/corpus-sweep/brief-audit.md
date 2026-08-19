# Corpus Sweep — Audit Brief

You are performing the saddler's audit by hand, from a cold read. The installed saddler agent is not used; the authority is `docs/drafthorse/drafthorse-spec-check.md`.

## Procedure

Read `docs/drafthorse/drafthorse-spec-check.md` in full. Execute its steps against the named document set exactly as written: assemble the set (the named document plus every external file it cites, handovers resolved from both glob and citations), check the frame, audit the references, audit the steps (per-step then the set-level pass with an explicit verdict per set-level check), audit the handovers where present, walk the scenarios, compose findings. Findings only — never edit any file. Apply the verdict rule as written.

## Known sanctioned shapes — not findings

- An adapted declaration tail on a folded error step ("**Error step** — folded into this reporting step per the executor exception, …") follows the checker's own model; the fixed catalogue string applies to standalone declarations.
- `dev/`-tree citations do not exist in these documents; if you think you see one, re-read.
- An uncited `README.md` inside a cited `references/` folder is not dead weight — skip that finding.
- The four classroom handovers carry the handover-variant preamble — check them against the variant, not the universal text.
- In the drafthorse skill set: `assets/HANDOVER-template.md` and `assets/SKILL-template.md` are template assets a step instructs copying — the handover-signal-mismatch and embedded-work findings they superficially trigger are known false positives; skip them.

## Report

Return only the structured object: `verdict` (pass | revise), `scenario_walk` (a short account — the runs walked, where routing held or broke), `set_level` (one entry per set-level check with its explicit verdict), `findings` (each: check name, location, problem, fix direction — direction, never rewritten text). Order findings scenario-walk breaks first. Prefer the finding where torn, but do not manufacture findings from the sanctioned shapes above.
