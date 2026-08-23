# {{SWEEP}} — Audit Brief

<!-- Template. The skill fills every {{SLOT}}. Auditors receive this content through the audit workflow's prompt; the file is the editable source. Delete this comment. -->

You are performing the spec-check audit by hand, from a cold read. The installed checker agent is not used; the authority is {{AUDIT_AUTHORITY}}.

## Procedure

Read the authority document in full. Execute its steps against the named document set exactly as written: assemble the set (the named documents plus every external file they cite, handovers resolved from both glob and citations), check the frame, audit the references, audit the steps — per-step, then the set-level pass with an explicit verdict per set-level check — audit the handovers where present, walk the scenarios, compose findings. Apply its verdict rule as written.

Findings only. Edit no file.

Do not read the migration briefs. Judge the documents as they now stand, not against what the migration intended. An auditor who knows the intended change stops being an independent reader of the result.

## Known sanctioned shapes — not findings

{{SANCTIONED_SHAPES}}

<!-- From the profile. Suppresses the checker's known blind spots so findings stay signal-dense. Grows as false positives are confirmed. -->

## Report

Return only the structured object: `verdict` (pass | revise), `scenario_walk` (a short account — the runs walked, where routing held or broke), `set_level` (one entry per set-level check with its explicit verdict), `findings` (each: check name, location, problem, fix direction — direction, never rewritten text).

Order findings scenario-walk breaks first. Prefer the finding where torn, but do not manufacture findings from the sanctioned shapes above.
