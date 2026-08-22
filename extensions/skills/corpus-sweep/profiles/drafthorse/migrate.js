export const meta = {
  name: 'corpus-sweep-drafthorse-migrate',
  description: 'Migrate assigned DraftHorse corpus documents to the upgraded spec',
  phases: [
    { title: 'Migrate', detail: 'one worktree-isolated agent per assignment; each commits its own branch' },
    { title: 'Verify', detail: 'cheap read-only check of each migration against its brief' },
  ],
}

// args — supplied by the skill, which parses manifest.yml (workflow scripts have no filesystem access):
//   { root, sweep, briefsDir, base, assignments: [{name, brief, tier, files, audit_as}] }
//
// Authority documents are named inside each brief, not passed here — only high-tier
// briefs carry them. See the skill's Tiers reference.

const A = args
const TIER = {
  high:       { model: 'opus',   effort: 'high' },
  standard:   { model: 'sonnet', effort: 'medium' },
  mechanical: { model: 'haiku',  effort: 'low' },
}
const tierOf = function (name) { return TIER[name] || TIER.standard }

const CHANGE = {
  type: 'object',
  required: ['assignment', 'branch', 'commit', 'files', 'changes', 'flags'],
  properties: {
    assignment: { type: 'string' },
    branch: { type: 'string', description: 'Branch the agent created and committed on' },
    commit: { type: 'string', description: 'Full sha of the single commit holding this assignment' },
    files: { type: 'array', items: { type: 'string' }, description: 'Every file the commit touches' },
    changes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['site', 'kind', 'summary'],
        properties: {
          site: { type: 'string', description: 'Step or section the change lands on' },
          kind: { type: 'string', description: 'Class of change, from the brief checklist' },
          summary: { type: 'string' },
          before: { type: 'string', description: 'Decisive old fragment' },
          after: { type: 'string', description: 'Decisive new fragment' },
          judgment: { type: 'string', description: 'Why, where a call was made' },
        },
      },
    },
    flags: { type: 'array', items: { type: 'string' }, description: 'Out-of-scope defects and hesitations — reported, never fixed' },
    exemplars: {
      type: 'array',
      items: {
        type: 'object',
        required: ['shape', 'snippet'],
        properties: { shape: { type: 'string' }, snippet: { type: 'string' } },
      },
    },
    verification: { type: 'string', description: 'Self-checks run and their results' },
  },
}

const VERDICT = {
  type: 'object',
  required: ['assignment', 'verdict', 'checks'],
  properties: {
    assignment: { type: 'string' },
    verdict: { type: 'string', description: 'conform | deviate' },
    checks: {
      type: 'array',
      items: {
        type: 'object',
        required: ['item', 'result'],
        properties: {
          item: { type: 'string', description: 'Checklist letter or fixed text checked' },
          result: { type: 'string', description: 'applied | missing | wrong' },
          detail: { type: 'string' },
        },
      },
    },
    stray_files: { type: 'array', items: { type: 'string' }, description: 'Files touched that the assignment does not own' },
  },
}

function migratePrompt(a) {
  return 'You are migrating DraftHorse corpus documents in the repository at ' + A.root + '. ' +
    'You are running in your own git worktree — your edits are isolated from every other agent.\n\n' +
    'Read ' + A.briefsDir + '/brief-common.md first, then your assignment brief ' + A.briefsDir + '/' + a.brief + '. ' +
    'Follow both exactly, and read nothing they do not name: read what their Read-first section lists, ' +
    'then your target file(s) whole, then apply the checklist with the Edit tool, site by site.\n\n' +
    'Your assignment owns exactly these files: ' + a.files.join(', ') + '. Edit no other file.\n\n' +
    'When your edits are complete:\n' +
    '1. Create a branch in your worktree named sweep/' + A.sweep + '/' + a.name + '\n' +
    '2. Stage only your assigned files and commit them as one commit, subject line: migrate(' + a.name + ')\n' +
    '3. Record the branch name, the full commit sha, and the commit\'s changed-file list in your result\n\n' +
    'Do not push. Do not open a pull request. Do not touch any branch but your own.\n' +
    'Before committing, verify your own work: grep your targets for the retired strings the briefs name, re-read every edited region, and record the results.\n' +
    'Return only the structured result object; it is data for an orchestrator, not a message to a human.'
}

function verifyPrompt(a, m) {
  return 'Read-only conformance check over one migrated DraftHorse assignment in ' + A.root + '. Edit nothing.\n\n' +
    'Read ' + A.briefsDir + '/brief-common.md and ' + A.briefsDir + '/' + a.brief + '. ' +
    'Then read the migration as committed: git show ' + m.commit + ' and git diff ' + A.base + '..' + m.commit + '\n\n' +
    'For every checklist item and every fixed text the briefs name, decide whether it was applied, missed, or applied wrongly. ' +
    'Compare the commit\'s changed-file list against the files the assignment owns (' + a.files.join(', ') + ') and report any file outside that set as a stray. ' +
    'Judge the edits against the briefs, not against your own preference for how the documents should read.\n' +
    'Return only the structured result object.'
}

log('Migrating ' + A.assignments.length + ' assignments, worktree-isolated, then verifying each')

const results = await pipeline(
  A.assignments,

  function (a) {
    return agent(migratePrompt(a), Object.assign(
      { label: 'migrate:' + a.name, phase: 'Migrate', schema: CHANGE, isolation: 'worktree' },
      tierOf(a.tier)
    ))
  },

  function (m, a) {
    if (!m) { return null }
    return agent(verifyPrompt(a, m), Object.assign(
      { label: 'verify:' + a.name, phase: 'Verify', schema: VERDICT },
      TIER.mechanical
    )).then(function (v) { return { migration: m, verification: v } })
  }
)

const ok = results.filter(Boolean)
const clean = ok.filter(function (r) { return r.verification && r.verification.verdict === 'conform' })
const missing = A.assignments
  .filter(function (a) { return !ok.some(function (r) { return r.migration.assignment === a.name }) })
  .map(function (a) { return a.name })

log('Migrated ' + ok.length + '/' + A.assignments.length + '; ' + clean.length + ' verified conform')
if (missing.length) { log('Unfinished, re-run these: ' + missing.join(', ')) }

return { results: ok, clean: clean.length, unfinished: missing }
