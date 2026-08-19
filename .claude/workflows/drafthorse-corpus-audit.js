export const meta = {
  name: 'drafthorse-corpus-audit',
  description: 'Wave 6b harvest, then independent spec-check audits over the migrated corpus',
  phases: [
    { title: 'Harvest', detail: 'step-shape examples into the reference, template slimmed' },
    { title: 'Audit', detail: 'hand audit per document set against drafthorse-spec-check.md' },
  ],
}

const ROOT = '/Users/dylangraham/Projects/agent-library'
const BRIEFS = ROOT + '/dev/workspace/tasks/corpus-sweep'

const AUDIT_SCHEMA = {
  type: 'object',
  required: ['target', 'verdict', 'scenario_walk', 'set_level', 'findings'],
  properties: {
    target: { type: 'string' },
    verdict: { type: 'string', description: 'pass | revise' },
    scenario_walk: { type: 'string' },
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
          fix_direction: { type: 'string' },
        },
      },
    },
  },
}

const CHANGE_SCHEMA = {
  type: 'object',
  required: ['file', 'changes', 'flags'],
  properties: {
    file: { type: 'string' },
    changes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['site', 'kind', 'summary'],
        properties: {
          site: { type: 'string' }, kind: { type: 'string' }, summary: { type: 'string' },
          before: { type: 'string' }, after: { type: 'string' }, judgment: { type: 'string' },
        },
      },
    },
    flags: { type: 'array', items: { type: 'string' } },
    verification: { type: 'string' },
  },
}

// First three keep their original opts shape so their completed results replay from cache.
const AUDITS = [
  ['versioning', 'extensions/skills/versioning/SKILL.md', null, null],
  ['classroom-set', 'extensions/skills/classroom/SKILL.md (with its four handover documents and every cited reference and template)', 'opus', 'high'],
  ['git-box', 'extensions/skills/git-box/SKILL.md', null, null],
  ['agent-commit', 'extensions/skills/git/agent-commit/SKILL.md', 'sonnet', 'medium'],
  ['agent-push', 'extensions/skills/git/agent-push/SKILL.md', null, null],
  ['agent-switch', 'extensions/skills/git/agent-switch/SKILL.md', 'sonnet', 'medium'],
  ['git-robot', 'extensions/agents/git-robot.md', 'sonnet', 'medium'],
  ['doc-reviewer', 'extensions/agents/doc-reviewer.md', 'sonnet', 'medium'],
  ['course-researcher', 'extensions/agents/course-researcher.md', 'sonnet', 'medium'],
  ['breaking-change-detector', 'extensions/agents/breaking-change-detector.md', 'sonnet', 'medium'],
]

function auditPrompt(target) {
  return 'Audit a migrated DraftHorse document set in the repository at ' + ROOT + '. ' +
    'Read ' + BRIEFS + '/brief-audit.md and follow it exactly. ' +
    'Document set under review: ' + target + '. ' +
    'Read-only: never edit any file. Return only the structured result object.'
}

function auditOpts(a) {
  var opts = { label: 'audit:' + a[0], phase: 'Audit', schema: AUDIT_SCHEMA }
  if (a[2]) { opts.model = a[2] }
  if (a[3]) { opts.effort = a[3] }
  return opts
}

log('Starting 6b harvest and 10 corpus audits in parallel')

const harvestPromise = agent(
  'Execute the wave-6b harvest in the repository at ' + ROOT + '. ' +
  'Read ' + BRIEFS + '/brief-6b-harvest.md and follow it exactly. ' +
  'Edit only the three named target files. Do not commit. Return only the structured result object.',
  { label: 'harvest:6b', phase: 'Harvest', schema: CHANGE_SCHEMA }
)

const auditsPromise = parallel(AUDITS.map(function (a) {
  return function () {
    return agent(auditPrompt(a[1]), auditOpts(a))
  }
}))

const harvest = await harvestPromise
log('6b harvest done — auditing the drafthorse skill set against the post-harvest state')

const dhAudit = await agent(
  auditPrompt('extensions/skills/drafthorse/SKILL.md (with its assets templates and references files as the cited set)'),
  { label: 'audit:drafthorse-set', phase: 'Audit', schema: AUDIT_SCHEMA, model: 'opus', effort: 'high' }
)

const audits = (await auditsPromise).filter(Boolean)
if (dhAudit) { audits.push(dhAudit) }

const revises = audits.filter(function (a) { return a.verdict !== 'pass' }).length
log('Audits done: ' + audits.length + ' sets, ' + revises + ' with verdict revise')

return { harvest: harvest, audits: audits }
