# Workspace Setup Templates

Templates for setting up a pattern extraction workspace in an OSS codebase.

---

## Directory Structure

Create this structure at the repository root:

```
dev/
├── patterns/
│   └── README.md
└── workspace/
    ├── context/
    │   └── tree.md          # Directory tree output
    ├── history/             # Chat transcripts (optional)
    ├── plans/
    │   └── prd.md           # Pattern extraction goals
    ├── research/            # Research artifacts
    ├── CLAUDE.md
    └── WORKSPACE.md
```

---

## CLAUDE.md Template

```markdown
# [App Name] - Modern Rails Pattern Reference

This file provides guidance to AI coding agents and serves as a pattern index for this production-grade Rails application.

## Application Overview

[2-3 sentences describing what the app does, its core domain concepts, and key differentiators]

## Tech Stack

- **Rails [version]** with [key frameworks]
- **Database:** [type]
- **Background Jobs:** [system]
- **Frontend:** [approach - Hotwire/React/etc]
- **[Other notable tech]**

---

## Pattern Extraction Instructions

Take a conversational approach ensuring extraction of what's actually useful rather than cargo-culting patterns.

When ready to dive into a specific pattern:
1. Discuss what makes it interesting/useful
2. Explore the actual implementation
3. Decide what's worth extracting vs. what's too app-specific
4. Write description in CLAUDE.md and detailed extraction in dev/patterns/

## Pattern Index

Each pattern below links to detailed documentation in `dev/patterns/`.

### [Category Name]

| Pattern | Summary | Detail |
|---------|---------|--------|
| **Pattern Name** | One-line description | [filename.md](dev/patterns/filename.md) |

**Quick reference - [Pattern Name]:**
\`\`\`ruby
# 3-10 lines showing the pattern essence
\`\`\`

---

[Add more categories as patterns are extracted]
```

---

## dev/patterns/README.md Template

```markdown
# Rails Pattern Extractions

Detailed pattern documentation extracted from the [App Name] codebase.

## Document Structure

Each pattern file contains:
1. **Overview** - What the pattern does and why
2. **Key Files** - Source files to reference
3. **Implementation** - Complete code with annotations
4. **Usage Examples** - How the pattern is used
5. **Adaptation Notes** - How to modify for your own apps

## Extracted Patterns

- [pattern-name.md](pattern-name.md) - Brief description

## Pattern Backlog

Patterns identified but not yet extracted:

### Category A
- `potential-pattern.md` - Brief note on what it does

### Category B
- `another-pattern.md` - Brief note

---

## Quick Start

1. Browse patterns in root `CLAUDE.md` for quick reference
2. Read detailed file here when implementing
3. Check `Key Files` section for original source code

## Contributing

When extracting new patterns:
- Include complete, working code (not snippets)
- Explain the "why" not just the "how"
- Note any dependencies or prerequisites
- Add adaptation guidance for different contexts
```

---

## WORKSPACE.md Template

```markdown
## Workspace Configuration

This file guides the operational constraints applicable to this workspace.

### Track Issues

- [ ] Track GitHub issues
    - <!-- Add issue numbers if applicable -->

### Merge Strategy

- [x] Squash merge
- [ ] Rebase merge
- [ ] Merge commit

### Post-Merge

- [ ] Delete branch after merge
- [x] Archive workspace upon merge

### Workflow Type

- [ ] Quick (direct implementation)
- [ ] Single plan (plan once, execute)
- [x] Multi-stage plan (iterative planning)

### Testing

- [ ] Requires testing
```

---

## dev/workspace/CLAUDE.md Template

```markdown
# CLAUDE.md

This file provides guidance when working in this workspace.

## Guidance

Workspaces are the primary source of truth. Prioritize searching workspace knowledge before focusing on the codebase.

- **/context** - Discoveries, resources, contextual information
- **/history** - Conversation transcripts
- **/plans** - Structured planning documents
- **/research** - Research artifacts

# Workspace

**Branch:** `[branch-name]`
**Started:** `[date]`
**Status:**

- [x] In Progress
- [ ] Discard
- [ ] Complete

## Purpose

[Brief description of the workspace goal]

## Discoveries

- [Notable finding 1]
- [Notable finding 2]
```

---

## Initialization Commands

To set up the workspace:

```bash
# Create directory structure
mkdir -p dev/patterns dev/workspace/{context,history,plans,research}

# Create initial files
touch dev/patterns/README.md
touch dev/workspace/CLAUDE.md
touch dev/workspace/WORKSPACE.md

# Generate tree for context
tree -L 3 --dirsfirst app config db lib test > dev/workspace/context/tree.md
```

---

## Branch Naming Convention

For pattern extraction workspaces:
```
docs/extract-[framework]-patterns
docs/[app-name]-patterns
study/[app-name]-architecture
```

Examples:
- `docs/extract-rails-patterns`
- `docs/fizzy-patterns`
- `study/hey-architecture`