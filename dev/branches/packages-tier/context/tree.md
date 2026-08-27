---
name: workspace overview
description: Core workspace and project structure
---

dev/workspace
├── artifacts
│   └── .keep
├── context
│   ├── .keep
│   └── tree.md
├── filebox
│   └── README.txt
├── history
│   └── .keep
├── plans
│   ├── .keep
│   ├── architectural.md
│   └── prd.md
├── prompts
│   ├── prompt-builder
│   ├── .keep
│   ├── discover_prompt.md
│   ├── README.md
│   └── research_prompt.md
├── research
│   └── .keep
├── reviews
│   └── .keep
├── tasks
│   └── .keep
├── README.md
├── workspace-config.yml
└── WORKSPACE.md
.claude-plugin
└── marketplace.json
docs
├── claude_docs
│   ├── create_plugins.md
│   ├── marketplaces.md
│   ├── plugin_reference.md
│   ├── plugin_versions.md
│   └── skills_extend.md
├── agnostic-documents.md
├── classroom-skeleton.md
├── create_symlink.md
└── user-configuration.md
extensions
├── agents
│   ├── breaking-change-detector.md
│   ├── doc-reviewer.md
│   ├── git-robot.md
│   ├── readme.md
│   └── telegraphic-converter.md
├── artifacts
├── output-styles
│   ├── sharp.md
│   └── telegraphic-register.md
├── rules
│   ├── code-comments.md
│   ├── durable-documents.md
│   └── STYLE.md
└── skills
    ├── corpus-sweep
    │   ├── assets
    │   │   ├── manifest-template.yml
    │   │   └── review-template.html
    │   ├── profiles
    │   │   └── drafthorse
    │   │       ├── audit.js
    │   │       ├── brief-assignment.md
    │   │       ├── brief-audit.md
    │   │       ├── brief-common.md
    │   │       ├── migrate.js
    │   │       └── profile.yml
    │   ├── references
    │   │   └── workflow-stalls.md
    │   └── SKILL.md
    ├── git
    │   ├── agent-commit
    │   │   └── SKILL.md
    │   ├── agent-push
    │   │   └── SKILL.md
    │   └── agent-switch
    │       └── SKILL.md
    ├── git-box
    │   ├── workflows
    │   │   ├── commit-and-push.md
    │   │   ├── multi-commit-and-push.md
    │   │   └── README.md
    │   └── SKILL.md
    ├── magic-reply
    │   ├── references
    │   │   ├── check-working.txt
    │   │   ├── claude-space.txt
    │   │   ├── show-chat-summary.txt
    │   │   ├── show-context.txt
    │   │   ├── show-difficulties.txt
    │   │   ├── show-options.txt
    │   │   ├── show-strategy.txt
    │   │   └── show-working.txt
    │   └── SKILL.md
    ├── markdown
    │   ├── references
    │   │   └── example.md
    │   └── SKILL.md
    └── versioning
        ├── assets
        │   └── CHANGELOG-template.md
        ├── references
        │   └── config-template.md
        └── SKILL.md
packages
├── classroom
│   ├── .claude-plugin
│   │   └── plugin.json
│   ├── agents
│   │   └── course-researcher.md
│   ├── mcp
│   │   ├── test
│   │   │   ├── fixtures
│   │   │   │   ├── annotation-band.html
│   │   │   │   ├── band-with-cover.html
│   │   │   │   ├── bleed-cover.html
│   │   │   │   ├── bleed-then-content.html
│   │   │   │   ├── bleed-wide.html
│   │   │   │   ├── block-unbreakable.html
│   │   │   │   ├── content-long.html
│   │   │   │   ├── content-short.html
│   │   │   │   ├── overflow-wide.html
│   │   │   │   ├── override-landscape.html
│   │   │   │   ├── pages-ten.html
│   │   │   │   ├── pages-three.html
│   │   │   │   ├── svg-overflow.html
│   │   │   │   └── table-long.html
│   │   │   ├── README.md
│   │   │   └── run-tests.js
│   │   ├── css-inspect.js
│   │   ├── package.json
│   │   ├── pdf-inspect.js
│   │   ├── print-base.css
│   │   └── server.js
│   ├── scripts
│   │   └── install-deps.sh
│   ├── skills
│   │   └── classroom
│   │       ├── references
│   │       │   ├── pedagogy
│   │       │   │   └── dyslexia-kinetic.md
│   │       │   ├── students
│   │       │   │   ├── _template.md
│   │       │   │   └── example-learner.md
│   │       │   ├── curriculum-spines.md
│   │       │   └── vetted-video-channels.md
│   │       ├── templates
│   │       │   ├── blocks
│   │       │   │   ├── confidence-stars.html
│   │       │   │   ├── craft-activity.html
│   │       │   │   ├── real-world-challenge.html
│   │       │   │   ├── reflection-page.html
│   │       │   │   └── video-library-page.html
│   │       │   ├── course-structures
│   │       │   │   ├── spine-plus-companion.md
│   │       │   │   ├── spiral-units.md
│   │       │   │   └── weeks-per-theme-plus-capstone.md
│   │       │   ├── documents
│   │       │   │   ├── answer-key-a4.html
│   │       │   │   ├── certificate.html
│   │       │   │   ├── competency-report.html
│   │       │   │   ├── parent-lesson-guide.html
│   │       │   │   ├── review-document.html
│   │       │   │   ├── scope-and-sequence.html
│   │       │   │   └── workbook-a4.html
│   │       │   └── lesson-structures
│   │       │       ├── early-learner-multisensory.md
│   │       │       ├── explore-investigate.md
│   │       │       ├── studio-practice.md
│   │       │       ├── timed-session.md
│   │       │       └── watch-concept-notes-practice-reflect.md
│   │       ├── deliver-without-renderer-handover.md
│   │       ├── mark-review-handover.md
│   │       ├── media-processing-handover.md
│   │       ├── setup-handover.md
│   │       └── SKILL.md
│   ├── templates
│   │   ├── .claude
│   │   │   └── rules
│   │   │       ├── classroom-signal.md
│   │   │       └── classroom.md
│   │   ├── students
│   │   │   └── README.md
│   │   ├── CLAUDE.md
│   │   └── global-requirements.md
│   ├── .mcp.json
│   └── CHANGELOG.md
└── drafthorse
    ├── .claude-plugin
    │   └── plugin.json
    ├── agents
    │   └── drafthorse-saddler.md
    ├── docs
    │   ├── framework
    │   │   ├── conventions.md
    │   │   ├── handover.md
    │   │   ├── notation.md
    │   │   ├── README.md
    │   │   ├── references.md
    │   │   ├── scaffold.md
    │   │   ├── steps.md
    │   │   └── surfaces.md
    │   └── drafthorse-spec-check.md
    ├── rules
    │   └── DraftHorse.md
    ├── skills
    │   └── drafthorse
    │       ├── assets
    │       │   ├── HANDOVER-template.md
    │       │   └── SKILL-template.md
    │       ├── references
    │       │   ├── collecting-references.md
    │       │   ├── condition-writing.md
    │       │   ├── README.md
    │       │   ├── step-functions.md
    │       │   └── step-splitting.md
    │       └── SKILL.md
    ├── CHANGELOG.md
    └── README.md
plugins
├── agent-tools
│   ├── .claude-plugin
│   │   └── plugin.json
│   ├── skills
│   │   └── corpus-sweep -> ../../../extensions/skills/corpus-sweep
│   └── CHANGELOG.md
├── chat-tools
│   ├── .claude-plugin
│   │   └── plugin.json
│   ├── agents
│   │   └── doc-reviewer.md -> ../../../extensions/agents/doc-reviewer.md
│   ├── skills
│   │   ├── magic-reply -> ../../../extensions/skills/magic-reply
│   │   └── markdown -> ../../../extensions/skills/markdown
│   └── CHANGELOG.md
└── dev-tools
    ├── .claude-plugin
    │   └── plugin.json
    ├── agents
    │   ├── breaking-change-detector.md -> ../../../extensions/agents/breaking-change-detector.md
    │   └── git-robot.md -> ../../../extensions/agents/git-robot.md
    ├── skills
    │   ├── agent-commit -> ../../../extensions/skills/git/agent-commit
    │   ├── agent-push -> ../../../extensions/skills/git/agent-push
    │   ├── agent-switch -> ../../../extensions/skills/git/agent-switch
    │   ├── git-box -> ../../../extensions/skills/git-box
    │   └── versioning -> ../../../extensions/skills/versioning
    └── CHANGELOG.md

90 directories, 161 files
