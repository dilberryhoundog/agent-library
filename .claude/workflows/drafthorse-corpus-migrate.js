export const meta = {
  name: 'drafthorse-corpus-migrate',
  description: 'Migrate every stamped DraftHorse corpus document to the upgraded spec',
  phases: [
    { title: 'Migrate', detail: 'one agent per corpus document or group, briefs in dev/workspace/tasks/corpus-sweep/' },
  ],
}

const ROOT = '/Users/dylangraham/Projects/agent-library'
const BRIEFS = ROOT + '/dev/workspace/tasks/corpus-sweep'

const TARGETS = [
  ['versioning', 'brief-versioning.md'],
  ['classroom', 'brief-classroom.md'],
  ['classroom-handovers', 'brief-classroom-handovers.md'],
  ['git-box', 'brief-git-box.md'],
  ['agent-commit', 'brief-agent-commit.md'],
  ['agent-push', 'brief-agent-push.md'],
  ['agent-switch', 'brief-agent-switch.md'],
  ['git-robot', 'brief-git-robot.md'],
  ['doc-reviewer', 'brief-doc-reviewer.md'],
  ['course-researcher', 'brief-course-researcher.md'],
  ['breaking-change-detector', 'brief-breaking-change-detector.md'],
  ['spec-check-saddler', 'brief-spec-check.md'],
  ['drafthorse-42', 'brief-drafthorse-42.md'],
]

const SCHEMA = {
  type: 'object',
  required: ['file', 'changes', 'flags'],
  properties: {
    file: { type: 'string', description: 'Target file path(s), comma-separated when several' },
    changes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['site', 'kind', 'summary'],
        properties: {
          site: { type: 'string', description: 'Step or section name the change lands on' },
          kind: { type: 'string', description: 'preamble | slot-removed | slot-repair | de-hold-trim | de-hold-kept | function | directive | vocabulary | condition-list | citation | gate | termination | invariant | engagement | other' },
          summary: { type: 'string' },
          before: { type: 'string', description: 'Decisive old fragment; full old prose for condition-list conversions' },
          after: { type: 'string', description: 'Decisive new fragment; full new list for condition-list conversions' },
          judgment: { type: 'string', description: 'Why, where a call was made' },
        },
      },
    },
    flags: { type: 'array', items: { type: 'string' }, description: 'Out-of-scope defects found, hesitations, and cross-check notes — reported, never fixed' },
    exemplars: {
      type: 'array',
      items: {
        type: 'object',
        required: ['shape', 'snippet'],
        properties: {
          shape: { type: 'string' },
          snippet: { type: 'string', description: 'Verbatim migrated machinery block: heading through conditions' },
        },
      },
    },
    verification: { type: 'string', description: 'Checks run after editing (retired-string greps, lockstep diff) and their results' },
  },
}

log('Migrating ' + TARGETS.length + ' corpus assignments')

const results = await parallel(TARGETS.map(function (t) {
  return function () {
    return agent(
      'You are migrating DraftHorse corpus documents in the repository at ' + ROOT + '. ' +
      'Read ' + BRIEFS + '/brief-common.md first, then your assignment brief ' + BRIEFS + '/' + t[1] + '. ' +
      'Follow both exactly: read the four spec documents the common brief names, read your target file(s) whole, then apply the checklist with the Edit tool, site by site. ' +
      'Edit only your assigned target file(s). Do not commit. Do not write any new files except edits to your targets. ' +
      'After editing, verify your own work (grep your targets for retired strings the briefs name; re-read edited regions) and record the results. ' +
      'Return only the structured result object; it is data for an orchestrator, not a message to a human.',
      { label: 'migrate:' + t[0], phase: 'Migrate', schema: SCHEMA }
    )
  }
}))

const ok = results.filter(Boolean)
log('Completed ' + ok.length + '/' + TARGETS.length + ' assignments')
return { completed: ok.length, total: TARGETS.length, results: ok }
