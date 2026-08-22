export const meta = {
  name: 'corpus-sweep-drafthorse-audit',
  description: 'Independent spec-check audits over the integrated DraftHorse corpus',
  phases: [
    { title: 'Audit', detail: 'one read-only agent per document set, against the spec-check' },
  ],
}

// Runs against the integrated sweep branch in the main working tree, after every
// assignment has been cherry-picked. Auditors are read-only and take no worktree:
// set-level checks span documents, so an auditor needs the whole migrated corpus.
//
// args — supplied by the skill from the sweep manifest:
//   { root, sweep, briefsDir, assignments }
//
// The audit procedure, the authority, and the sanctioned shapes live in the filled
// brief-audit.md in briefsDir. Auditors read it, as migration agents read theirs —
// one source, so the two cannot drift.

const A = args
const AUDIT_TIER = {
  set:    { model: 'opus',   effort: 'high' },
  single: { model: 'sonnet', effort: 'medium' },
}

const AUDIT = {
  type: 'object',
  required: ['target', 'verdict', 'scenario_walk', 'set_level', 'findings'],
  properties: {
    target: { type: 'string' },
    verdict: { type: 'string', description: 'pass | revise' },
    scenario_walk: { type: 'string', description: 'The runs walked, where routing held or broke' },
    set_level: {
      type: 'array',
      items: {
        type: 'object',
        required: ['check', 'verdict'],
        properties: { check: { type: 'string' }, verdict: { type: 'string' } },
      },
    },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        required: ['check', 'location', 'problem', 'fix_direction'],
        properties: {
          check: { type: 'string' },
          location: { type: 'string' },
          problem: { type: 'string' },
          fix_direction: { type: 'string', description: 'Direction only, never rewritten text' },
        },
      },
    },
  },
}

function auditPrompt(a) {
  return 'Audit a migrated DraftHorse document set in the repository at ' + A.root + '. Read-only: edit nothing.\n\n' +
    'Read ' + A.briefsDir + '/brief-audit.md and follow it exactly. It names the authority document, ' +
    'the procedure to execute against the set, and the sanctioned shapes you must not report as findings.\n\n' +
    'Document set under review: ' + a.files.join(', ') + '\n\n' +
    'Read no migration brief. Judge the documents as they now stand, not against what the migration intended.\n' +
    'Return only the structured result object.'
}

log('Auditing ' + A.assignments.length + ' document sets')

const audits = (await parallel(A.assignments.map(function (a) {
  return function () {
    return agent(auditPrompt(a), Object.assign(
      { label: 'audit:' + a.name, phase: 'Audit', schema: AUDIT },
      AUDIT_TIER[a.audit_as] || AUDIT_TIER.single
    ))
  }
}))).filter(Boolean)

const revises = audits.filter(function (x) { return x.verdict !== 'pass' })
const findings = audits.reduce(function (n, x) { return n + (x.findings || []).length }, 0)

log('Audits done: ' + audits.length + ' sets, ' + revises.length + ' revise, ' + findings + ' findings')

return { audits: audits, revise: revises.map(function (x) { return x.target }), findings: findings }
