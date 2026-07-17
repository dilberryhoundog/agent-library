# New Concepts — Discussion

Each new concept from the sweep, judged on value added to the framework (integration state deliberately ignored). Each section: what it is, value verdict, improvement suggestions, and open questions. Reply inline with `<!-- comments -->`.

## 1. Steps are universal

What it is: a step is governed only by its start and finished conditions, so several can be in play at once — enabling loopbacks (sub-steps repeat while a controller stays in play), error catching (the error step starts before the producer finishes), and inert steps (dormant until a rare start condition fires).

Verdict: **high value — promote it.** This is the framework's actual execution model finally named. "In play", loops, the error step's early start, and supervisory steps all silently depend on it; naming it turns four scattered behaviours into one principle they derive from. It also gives the convention list its missing keystone: "conditions carry routing" says how steps connect, "steps are universal" says why nothing else is needed to connect them.

Suggestions: make it the FIRST steps convention, since standalone-ness, subtractive coverage, and loop semantics all follow from it. Phrase the thesis as the mechanism ("the only control surface a step has is its two conditions"), then list the three affordances as consequences, not features. "Universal" is a slightly odd word for this — candidates: "Steps are condition-driven", "Conditions are the only control surface", or keep "universal" but define it in the first clause as you do now.

Questions: does "universal" mean "universally active/eligible" (every step is always watching its start condition)? If so, say that — it's the sharpest one-line version. And should the old "Steps are standalone" bullet fold INTO this convention (standalone-ness is a consequence of condition-only control), or stay separate as the authoring rule while universal is the runtime rule?

<!-- 
Answers: 
- Yes that is what it means, they do not have to be a chain. 
- Thier conditions also make them standalone/atomic these are the two direct idioms from the entry/exit dynamic
Obs: 
- No problem with moving. 
- You are welcome to rewrite with sharpness
-->

### decision

— Adopt. "Universal" = every step is always watching its start condition; steps need not chain. Standalone/atomic and universal are the two direct idioms of the entry/exit dynamic — write them as such. Free to reposition as the first steps convention and rewrite for sharpness.

## 2. `**AND**` / `**OR**` condition links

What it is: bold-caps connectors chaining sub-conditions in a condition list; first condition bare, each subsequent one prepended with **AND**/**OR**.

Verdict: **medium-high value.** Compound conditions were already happening in prose ("X and Y and no part of Z applied") and getting mushy; explicit connectors make the finished condition machine-checkable by a reviewer and force the author to decide conjunction vs disjunction. Cheap notation, real discipline.

Suggestions: state the semantics, not just the syntax — one line: "a step's condition list is satisfied when the chain evaluates true reading top-to-bottom." Add the mixing rule now, before usage in the wild forces it: simplest is "one connector type per list — a list that needs both AND and OR is two conditions asking to be rewritten," which avoids precedence rules entirely. Give one canonical example in notation.md.

Questions: is mixing AND and OR in one list legal (the SKILL-template currently mixes them)? If yes, what wins — strict top-to-bottom, or AND-binds-tighter? And is **OR** actually needed, or is an OR-condition just two start conditions in disguise (a step can trigger on either state)? If OR only ever appears in start conditions, banning it and allowing multiple start clauses might be sharper.

<!-- Proposal:
A standard `- <condition>` = **AND** (doesn't need stating)
**OR** exists as a list separator.

example:
- <condition>
- <condition>
**OR**
- <condition>

There is also a strong case for banning alltogether. just use the list notation as collective conditions. removes concept to explain and integrate when building. the multi line already helps with mushyness.
-->

### decision

— Ban `**AND**`; keep `**OR**` as a list separator only. A plain `- <condition>` list is implicitly conjunctive; an `**OR**` line between list groups separates alternatives (groups of ANDed conditions, ORed together — no precedence rules needed). *Amended:* the canonical separator form is `**OR these are true:**` (see SKILL-template.md:76), echoing the renamed machinery headings `…when these are true:` so the heading and the list state the same semantics.

## 3. Handover location and naming convention

What it is: a settled home and name for handover files — the sweep asserts both `handovers/` subfolder and root-sibling `<skill>/setup-handover.md` with an appended `-handover` suffix.

Verdict: **high value as a decision, whichever way it lands.** Handover discoverability is the load-bearing prerequisite for concept 6 (reviewers walking handovers) and for the ` — Handover` link notation. Right now handovers hide in `references/` and are only findable via inline citations; a fixed location plus a name suffix makes them findable by glob — that's what turns "review all surfaces" from prose into a checkable procedure.

Suggestions: my recommendation is **root sibling + `-handover` suffix** and drop the `handovers/` folder. Reasons: a skill rarely has more than 2–4 handovers, so a folder adds a hop for no grouping benefit; the suffix alone makes them glob-able (`*-handover.md`); and root-sibling placement visually ranks them as "peers of SKILL.md, subtype of the skill" which matches the sub-step model, while `references/` placement is what currently mis-signals them as data. If you keep the folder instead, the suffix becomes redundant — pick one signal, not two.

Questions: which one is the intent — the file's two statements can't both stand? Should the framework mandate one location (a law) or state a default with the old `references/` + `type: handover` carve-out kept as legal (an idiom)? Mandating is cleaner for reviewers but forces migrating every existing skill (classroom has four handovers in `references/`).

<!-- Answer:
This went through phases. final decision was root folder and `-handover` suffix on the file.
Obs: keep the front matter for humans, change the terms of engagement for agents to suffix + location.
-->

### decision

— Root folder (sibling to the main skill file) + `-handover` file suffix. *Amended:* `type: handover` is superseded by the frontmatter stamp `harness-format: DraftHorse, Handover` (one searchable key: main format + subtype, comma-separated; sole frontmatter on a handover; on skills it coexists with the harness fields). A handover now carries three agreeing signals — stamp subtype, `-handover` suffix, root location — and a mismatch between any two is a spec-check defect. A handover creation template exists at extensions/skills/drafthorse/assets/HANDOVER-template.md.

## 4. Handover reference notation (" — Handover" link suffix)

What it is: cite a handover with link text ending " — Handover": `[Substeps — Handover](handovers/substeps.md)`.

Verdict: **high value.** The citation is the progressive-disclosure trigger — the moment the agent must realise "this is not data to consult, it's sub-steps to execute." The old prose form ("follow references/X.md as a handover doc") worked but was unmarkable; putting the signal in the link text makes it visible at the cite site, greppable, and cold-reader-safe. This is the best small idea in the sweep.

Suggestions: define it as the exclusive legal way to cite a handover, so a reviewer can flag any bare link to a `type: handover` file. Keep the em-dash form exact (spacing included) so it's mechanically greppable. Add one sentence on what the agent does on encountering it, or point to the preamble line that already says it.

Questions: none of substance — only that its example path must agree with whatever concept 3 decides.

<!-- Great suggestions approved -->

### decision

— Adopt as the exclusive legal citation form for handovers: link text ends " — Handover" (exact em-dash spacing, greppable); example path follows the concept-3 root + `-handover` convention.

## 5. Internal / external reference notation

What it is: explicit link forms — internal `[Reference Name](#reference-name)`, external `[Reference File](references/reference.md)`.

Verdict: **medium value, cheap win.** Mostly codifies existing practice, but making anchor links the internal form is genuinely useful: it lets "cite at the moment of use" resolve mechanically (click/jump) rather than by name-matching prose. Together with concept 4 you now have a three-way citation taxonomy (internal / external / handover) that a reviewer can verify link-by-link.

Suggestions: this is where the "Naming, not Explaining" convention (concept 8) earns its keep — say explicitly that anchor links are why headings must stay short and unique, so the two concepts brace each other. Also state whether link text must equal the heading/Term name exactly (I'd say yes — it makes stale links detectable).

Questions: do framework docs' bare-filename links (`[steps.md](steps.md)`) count as conforming external references, or should link text always be descriptive? Fine either way, but the rule should say.
<!-- Answers: file name usable, file type stripped better
Suggestions:
- small why reasoning allowable to connect both concepts
- Internal convention = reference text notation text, lowercase + dash instead of space default for link
- External convention = file type stripped text, uppercase first letter, filename + type for link.
-->

### decision

— Adopt. Internal: link text = the reference's heading text; anchor = lowercase, dashes for spaces. External: link text = filename with extension stripped, first letter uppercased; link target = filename + extension. A small connecting "why" clause is allowed to brace this with Naming-not-Explaining.

## 6. Handover Document Reviews (reviewer handover-walking)

What it is: settled location/naming/referencing lets a spec-review agent walk from the main skill into its handover files and audit every surface of the skill.

Verdict: **high value as a consequence, low as a standalone concept.** It isn't really a new mechanism — it's the payoff of concepts 3+4, and the saddler already wants it (the known false-positive on shared-worker references exists precisely because it can't classify handover files confidently). Worth keeping in handover.md as one sentence of motivation; the real substance belongs in the spec-check as Handover Checks plus an audit step.

Suggestions: specify the walk concretely so it's checkable: discovery rule (glob by the concept-3 convention AND collect ` — Handover` citations, flag any mismatch between the two sets), then apply the existing handover checks per file, then verify each handover is cited by exactly one-or-more master steps. The mismatch check (file exists but never cited / cited but missing) is the highest-value new test and costs one line.

Questions: should an uncited handover file be a defect (dead code) or allowed (a handover staged for a future step)? And do handovers get the FULL document audit (scaffold, notation, conditions) or a reduced profile (no frontmatter/identity/exit-step checks, per the handover exceptions)? I'd assume reduced profile, but the spec should name which checks are waived.

<!-- handover checks:
- location & naming
- reduced profile, but otherwise full drafthorse
- uncited = pass but report.

Suggestions: yes integrate these into their relevant sections
-->

### decision

— Adopt, integrated into the relevant spec-check sections (not a standalone concept). Handover checks: location & naming conformance; reduced audit profile (frontmatter/identity/exit-step checks waived, otherwise full DraftHorse); discovery by glob + citation collection with set-mismatch flagged; uncited handover = pass but report.

## 7. Sharp Prose / Sharp Language

What it is: a named convention for the framework (and a committed section in durable-documents.md): sharp, direct, concise prose; instruct the How, not the Why; subsuming why-omission, unreachable meanings, negative mirrors, no-ops.

Verdict: **medium value in the framework, already-earned value in durable-documents.** The four defects live in durable-documents.md and are excellent; the DraftHorse convention's value is only the bridge — declaring that DraftHorse prose is subject to that rule-set plus the one genuinely DraftHorse-specific claim: agents inside DraftHorse guardrails don't need Why, because the conditions and funnels carry the justification. That last claim is new and good; the rest is a pointer.

Suggestions: write the convention as two sentences — the DraftHorse-specific claim ("guardrails replace justification: inside a DraftHorse document, instruct the How; the conditions carry the Why") plus a citation to durable-documents.md for the defect catalogue. Re-listing the four defects in conventions.md would violate this file's own first convention.

Questions: is "instruct the How, not the Why" absolute? Steps.md itself currently explains Why in several load-bearing places (e.g. why start conditions exclude half-applied states — "invites a destructive re-run"). I'd argue a one-clause consequence attached to a rule is not "explaining why", it's the test that makes the rule checkable — worth saying so, or reviewers will strip the tests out.

<!-- Answer: No not absolute, just prefered, agent often explains why needlessly.
Suggestions: conventions lead to rules placement. it is the resolution of that convention. rules also are outside of the SSoT convention. SSoT applies in Drafthorse, not where runtime reflects the docs.
-->

### decision

— Keeps as is.

## 8. Naming, not Explaining

What it is: headings stay short and unique to enable link-text attribution; explanation goes in a line under the heading, never in the heading.

Verdict: **medium value.** On its own it reads like a style nicety, but paired with concept 5 (anchor-link citations) it's structural: anchors are derived from headings, so long or duplicated headings literally break the citation notation. That linkage is what elevates it from taste to law.

Suggestions: state the mechanism in the convention ("headings are link targets — a heading that explains makes an unlinkable anchor; a duplicated heading makes an ambiguous one"). Give the shape: heading = name, first line under = the explanation. Drop the echo line "Naming not explaining." from the draft — it's a negative mirror of its own title.

Questions: does uniqueness apply per-document (enough for anchors) or across a multi-document set (needed if Terms and cross-doc links share the namespace)? Per-document is the natural rule; say which.

<!-- Answers: uniqness per doc
Suggestions: I love the name. its also not a negative mirror. naming /= explaining
otherwise fixes approved
-->

### decision

— Adopt with the mechanism stated (headings are link targets; explaining breaks anchors, duplicating makes them ambiguous). Uniqueness applies per document. Title stays "Naming, not Explaining"; only the trailing echo line goes.

## 9. Dynamic Improvement

What it is: agents using a skill are encouraged to upload issues directly to the agent-library repo; a later repair agent integrates fixes from live usage. Agents reveal troubles, not propose solutions.

Verdict: **high value, and the most original idea in the sweep.** It closes the loop the framework was missing: DraftHorse documents are supposed to improve from usage, but until now that path was "the user notices and edits". "Reveal troubles, not propose solutions" is exactly right — a mid-run agent has the symptom in front of it but lacks the framework context to fix without breaking conventions; separating symptom-capture from repair matches the whole framework's division-of-labour ethos.

Suggestions: to be executable it needs the mechanics: what an agent files (skill name + step + the condition or passage that misbehaved + what actually happened — a fixed mini-format would make reports repair-agent-ready), when it files (on hitting the error step? any friction?), and how (gh issue with a label?). Consider making the reporting hook live in the skill's error step by convention — the error step already collects exactly the right state. The repo name is fine as a fixed constant; consider putting the report format in a reference so every skill points at one home.

Questions: is this a framework convention (all DraftHorse skills report to agent-library) or a per-skill choice wired into frontmatter/config? Should reporting be a standing instruction in every skill's error step, a global invariant, or left in conventions.md as encouragement? And is the "repair agent" a planned real thing (a saddler sibling) or aspirational for now?

<!-- Answer:
leave it in conventions, and the repair agent is one that investigates and fixes. leave as is.
-->

### decision

— Keep as is, in conventions.md as encouragement. The repair agent is an investigate-and-fix agent; no reporting mechanics or format mandated for now.

## 10. Sub Agents (optimal environment)

What it is: side-loaded sub-agent sessions are the optimal DraftHorse environment — the main conversation stays fresh while sub-agents run DraftHorse skills for light-to-medium supporting work.

Verdict: **medium value, currently under-argued.** The observation is true and worth recording — DraftHorse's guardrails are exactly what makes a cheaper/contextless sub-agent reliable, which the environments.md stub states better ("guardrails enable cheaper model usage") than the committed line does. But as written it's advice about where to RUN skills, which sits oddly in a list of conventions about how to WRITE them.

Suggestions: reframe as an authoring consequence, which earns its place in conventions: "write for the side-loaded reader — assume the executing agent is a fresh sub-agent with no main-conversation context; a document that needs the main chat's context is defective." That's checkable and already implicitly the durability standard. The run-location advice itself belongs in environments.md (concept 12) as the Sub agent entry.

Questions: is the intent authoring guidance (write skills so sub-agents can run them) or operational guidance (users/orchestrators should prefer dispatching skills to sub-agents)? Both are worth having, but they live in different docs.

<!-- Answer: neither in isolation. answers a porting/conversion question. "where should we put this skill when converting to drafthorse" or "what is the best way to deliver this skill?"  -->

### decision

— Not a convention: it answers the porting/delivery question ("where should this work live?"). Merge into the surfaces doc (concept 12) as the Sub agent entry with its when-to-use; remove from conventions.md.

## 11. Child Skills

What it is: a skill locked to a specific parent — its description written so the main agent never triggers it — carrying its own unique permissions for branching or tool-heavy work; the grants apply at the moment of invocation.

Verdict: **high value.** This fills a real gap between handovers and free-standing skills: a handover cannot widen the permission surface (it inherits the master's grants), so tool-heavy extracted work had nowhere to go. Child skills give that work a home with step-scoped permission delivery — permissions arrive at the step that needs them rather than bloating the parent's global grants. It also completes a clean three-tier extraction ladder: handover (same context, same grants) → child skill (new context, own grants, parent-locked) → full skill (independent).

Suggestions: define it by contrast with its two neighbours — a small table-of-differences in prose: context (shared / fresh / fresh), grants (inherited / own / own), invocation (cited by step / called by parent step / any). The description-as-lock trick ("use description to hunt off main agent") deserves explicit statement since it's non-obvious: the description is written to repel autonomous invocation, e.g. "not for general use; invoked by X". Also note the interplay with `disable-model-invocation` — if the harness offers a hard lock, prefer it over the soft description lock, or use both.

Questions: is a child skill a DraftHorse *document variant* (like handover, with its own frontmatter profile) or just a normal skill used in a particular pattern? I read it as the latter — a usage pattern, no new scaffold — worth stating so nobody invents `type: child`. And what marks the parent linkage — only the description, or also a naming convention (`<parent>-<name>`)? Also: your memory and the allowed-tools note say the SKILL-level grants transfer to sub-agents invoking it — is the child-skill permission claim relying on that same mechanism, and has the step-moment transfer been verified in the harness?

<!-- most of this is already live in the git-box skill. Your suggestions ar good. -->

### decision

— Adopt as a usage pattern (no new document variant, no `type: child`). Define by contrast with handover and full skill (context / grants / invocation); state the description-as-lock trick explicitly. git-box is the live reference implementation — source examples and mechanics from it.

## 12. Environments taxonomy (environments.md)

What it is: a new framework doc cataloguing DraftHorse-compatible harness environments — Main Skill File (exclusive work location, fully resolvable, invocable hub), Sub agent (preferred recipient, keeps main chat lean, guardrails enable cheaper models), Child Skills, Handover Documents (specialised mixin, progressive disclosure without divergence).

Verdict: **high value as a doc.** The framework currently describes documents but not the runtime surfaces they execute on, and three of the sweep's concepts (10, 11, and handovers) are all environment claims with no home. One page answering "I have work of shape X — which surface does it run on?" is the missing routing table, and it keeps environment advice out of conventions.md where it doesn't fit.

Suggestions: organise it as a decision guide, not a catalogue: lead each entry with the selection criterion (when this surface is the right home), then its properties (context, grants, invocation, cost). End with the extraction ladder from concept 11 — inline step → handover → child skill → independent skill / sub-agent — since that's the question authors actually face. Keep entries to 3–5 lines each; this doc earns its place by being consultable in one read.

Questions: the four entries mix document types (skill file, handover) with runtime surfaces (sub-agent) — is the doc's axis "where work lives" (files) or "who executes it" (sessions), or deliberately both as "environments"? Worth settling before writing, since it decides whether e.g. "child skill run by a sub-agent" is one entry or a combination. Also: should hooks and MCP tools appear here, or do they stay in references.md's dynamic-references family?

<!-- Answers: they are probably more like surfaces for drafthorse than environments. Hooks and mcp aren't drafthorse compatible.  
Suggestions: Catalogue with a "when to use" appended to each entry.-->

### decision

— Rename to `surfaces.md` ("DraftHorse Surfaces"). Format: catalogue with a "when to use" appended to each entry. Hooks and MCP are out of scope (not DraftHorse-compatible surfaces); they stay in references.md's dynamic-references family. Absorbs concept 10 as the Sub agent entry.

## 13. "Utilities" umbrella term

What it is: a new collective noun for the scaffold's parts — Frontmatter, Agent Invariants, References, Steps, Terms (and per the DraftHorse.md stub, Handovers) become "DraftHorse Utilities", replacing "parts" and "segment".

Verdict: **low-to-medium value — the weakest new concept as it stands.** A single collective term IS worth having (the scaffold currently wobbles between parts/segments/sections), but "utilities" pulls against the scaffold's own metaphor: a utility is something you reach for optionally; frontmatter and steps are mandatory structure — the frame itself, not tools hanging on it. The rename buys consistency only if the word carries the right sense, and the DraftHorse.md stub's version (where Handovers join and Frontmatter drops out) suggests "utilities" is really trying to name a different set: the things an agent OPERATES while running a document, as distinct from the scaffold it READS.

Suggestions: two coherent options. (a) Keep the scaffold as "parts" (or "segments" — pick one) and reserve "Utilities" for the operator-facing set in the DraftHorse.md rule: References, Steps, Terms, Handovers, Invariants — the levers an executing agent works with. This gives both docs a precise word and explains why their lists differ. (b) If one word must rule everywhere, "segments" is more accurate than "utilities" for the scaffold and already half-established. Whichever wins, define it once in scaffold.md's opening line.

Questions: what drew you to "utilities" — is the intended sense "the working machinery an agent uses" (which supports option a) or just "the named parts" (option b)? And is Handovers meant to be promoted to a peer of the five (making six), or does it stay a document variant that appears only in the operator's view?

<!-- Answer: House ownership; power, water, internet all utilities. the "active" part of the house. same with frontmatter, invariants, references, steps, terms, handovers. All distinct active drafthorse sections, coming together in unison. -->

### decision

— Keep "Utilities", defined by the house metaphor: utilities are the active systems of the house (power, water, internet) as distinct from the structure — frontmatter, invariants, references, steps, terms, and handovers are all live systems. The metaphor must appear as the definition sentence in scaffold.md. Open: the count ("five parts" → six utilities with Handovers joining) and the segment-divider asymmetry (handovers have no body segment) — settle when editing scaffold.md.

## 14. DraftHorse rule set (extensions/rules/DraftHorse.md)

What it is: a planned consumer-facing rule — the operator's guide — so an agent handed a DraftHorse document knows how to navigate and run it: utilities overview, notation overview, step-handling dynamics, handover-handling dynamics, consumer conventions.

Verdict: **high value, arguably the most consequential item in the sweep.** The framework docs teach authors; the spec-check teaches auditors; the only thing teaching EXECUTORS today is the steps preamble copied into every document. A rule that loads once per session and carries the full reading model would let the per-document preamble shrink (or eventually vanish), directly serving the cheap-sub-agent goal of concept 10 — the rule is the training, the document is just the track.

Suggestions: hard scope line — this rule must contain only consumption knowledge, and should be written from the executor's five questions: how do I know what's a step / when do I start one / when am I done / what's binding / what do I do with a cited link. Derive it from the framework docs but do NOT link out to them at run time (the executor shouldn't wander into authoring docs mid-run); this is the legitimate deliberate-duplication case your single-source convention already carves out for documents that never share context. Decide the preamble relationship explicitly: the preamble stays (documents must remain cold-readable without the rule — durability), and the rule deepens it.

Questions: distribution — is this a rule shipped in a plugin (which one?) so consuming installations get it, or repo-local? Does it target only agents RUNNING drafthorse skills, or also the main agent deciding whether/where to dispatch one (which would pull in environments.md content)? And should the steps preamble eventually be reducible for skills that can assume the rule is loaded, or is cold-readability non-negotiable?

<!-- 
- rules are not plugin defaults, just copy into global or project claude 
- it is "operators manual"
- build rule doc first, remove preamble later
I like your five questions, and suggestions, needs further discussing
-->

### decision

— *Superseded:* the rule doc is shelved (rules are intentionally redundant). The self-describing direction wins — each document carries its own operator's manual through the preamble and the renamed machinery headings (`…when these are true:` / `Agent decision:` / `Suggested next actions:` / `Step invariants:`), with parent/child vocabulary replacing master/sub-step throughout, and handovers self-describing via HANDOVER-template.md (variant preamble, handback in the final step's Suggested next actions, `harness-format` stamp). extensions/rules/DraftHorse.md stays a stub until a need survives that documents can't carry themselves.

## 15. Decision slot reframe ("break out of computer mode")

What it is: a recorded intent to widen the Decision slot back toward its origin — a moment where control is handed to the agent to judge, when state is undecided at invocation and emerges mid-run (including flip/flopping between references); finishing can be as simple as "a decision is made".

Verdict: **the intent is valuable; the loose version is not.** "Break out of computer mode" is a genuinely good description of what the slot is FOR — it names the moment deterministic condition-following stops and judgment starts, which nothing else in the framework names. But the published three limits (no work, no routing, must resolve to a fact the finished condition depends on) are what stop Decision becoming the junk drawer, and "finished when a decision is made" fails the checkable-conditions convention outright — it's satisfied by any claim.

Suggestions: keep the discipline, adopt the framing. Concretely: keep the three limits verbatim; replace the narrow "scope or shape" definition with the intent-level one ("run state the document could not decide in advance, resolved by the agent's judgment while the step is in play"); then show that scope/shape and reference flip/flop are both instances of it — choosing WHICH reference to load is a shape decision, so the flip/flop case already fits without loosening anything. Add one line banning the degenerate condition: a Decision must resolve to a named fact ("the target set is chosen"), never to "a decision was made".

Questions: is there a real case from usage that the three limits wrongly exclude — a decision that carries no scope/shape consequence but still needs the slot? If yes, that example should drive the rewrite; if no, this is a wording widen, not a semantic one. And should a Decision's outcome be recorded anywhere (in the finished condition's fact, as now) or does the reframe want the agent to be able to decide-and-move-on without a named fact (which I'd push back on)?
 <!-- no real case.
sure keep the discipline, adopt the framing.
-->

### decision

— Keep the discipline, adopt the framing. Three limits stay verbatim; the definition widens to the intent level ("run state the document could not decide in advance, resolved by the agent's judgment while the step is in play") with scope/shape and reference flip/flop shown as instances. A Decision must resolve to a named fact — "a decision was made" is banned as a finished condition. No real excluded case exists, so this is a wording widen, not a semantic one.
