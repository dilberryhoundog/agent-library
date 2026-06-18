---
name: pattern-extractor
description: Extract and document reusable patterns from OSS codebases. This skill should be used when analyzing production-quality open source codebases to identify, catalog, and document architectural patterns, best practices, and reusable code structures for reference in personal projects.
---

# Pattern Extractor

## Overview

This skill guides the extraction of reusable patterns from open source codebases into well-structured documentation. It establishes a conversational workflow that ensures patterns are genuinely useful rather than cargo-culted, with clear adaptation guidance for different contexts.

## When to Use

- Analyzing a new OSS codebase to understand its architecture
- Documenting patterns discovered during code exploration
- Building a pattern library for reference in personal projects
- Creating a workspace for systematic pattern extraction

## Workflow

### Phase 1: Workspace Setup

Before extracting patterns, establish a workspace structure within the codebase.

**Create workspace directory:**
```
dev/
├── patterns/
│   └── README.md           # Pattern index and backlog
└── workspace/
    ├── context/            # Discoveries, resources
    ├── history/            # Chat transcripts
    ├── plans/              # PRD, architecture docs
    ├── CLAUDE.md           # Workspace-specific instructions
    └── WORKSPACE.md        # Configuration (merge strategy, etc.)
```

**Initialize CLAUDE.md with:**
1. Application overview (2-3 sentences on what the app does)
2. Tech stack summary
3. Pattern extraction instructions
4. Pattern index table (starts empty, grows as patterns are extracted)

See `references/workspace_template.md` for complete templates.

### Phase 2: Pattern Discovery

**Conversational approach:** Before diving into extraction, discuss each pattern to ensure it's worth documenting.

**Discovery questions to explore:**
1. What problem does this pattern solve?
2. What makes this implementation interesting or non-obvious?
3. Is this pattern specific to this codebase, or genuinely reusable?
4. What's the minimum viable version vs. the full implementation?
5. What would need to change to adapt this to a different context?

**Identify patterns by looking for:**
- Concerns/modules with cohesive responsibilities
- Custom middleware or framework extensions
- Non-trivial model relationships
- Controller organization patterns
- View/partial conventions
- Background job architectures
- Authentication/authorization structures

### Phase 3: Pattern Extraction

Once a pattern is deemed worth extracting, document it following this structure:

**Pattern document structure:**
```markdown
# Pattern Name

## Overview
- Problem it solves (2-3 sentences)
- Core insight (the key idea that makes it work)

## Key Files
| File | Purpose |
|------|---------|
| path/to/file.rb | Brief description |

## Architecture
- ASCII diagram showing relationships
- Mermaid diagram for complex flows (optional)

## Implementation
- Complete, working code with annotations
- Key design decisions explained inline

## Usage Examples
- 3-5 examples showing the pattern in action
- Include edge cases

## Adaptation Notes
- Minimum viable implementation
- What to skip for simpler apps
- Alternative approaches
- Prerequisites and dependencies
```

See `references/pattern_template.md` for a complete template.

### Phase 4: Index Updates

After extracting each pattern:

1. **Update CLAUDE.md pattern index table** - Add row with pattern name, summary, and link
2. **Add quick reference** - Code snippet showing the pattern's essence
3. **Update README.md in patterns/** - Add to categorized list, mark as completed

**Pattern index format in CLAUDE.md:**
```markdown
### Category Name

| Pattern | Summary | Detail |
|---------|---------|--------|
| **Name** | One-line description | [link.md](dev/patterns/link.md) |

**Quick reference - Pattern essence:**
\`\`\`ruby
# 3-10 lines showing the core concept
\`\`\`
```

## Pattern Categories

Common categories to organize patterns:

- **Authentication & Sessions** - Login, sessions, magic links
- **Multi-Tenancy** - Account isolation, tenant resolution
- **Controller Patterns** - Auth concerns, resource scoping, caching
- **Model Patterns** - Concerns, callbacks, associations
- **View & Frontend** - Layouts, partials, Stimulus, Turbo
- **Background Jobs** - Queue config, job patterns
- **Infrastructure** - Database extensions, search, caching

## Quality Standards

**Good patterns include:**
- Complete, copy-pasteable code (not snippets)
- The "why" not just the "how"
- Dependencies and prerequisites clearly stated
- Adaptation guidance for different contexts
- ASCII diagrams for relationships

**Avoid:**
- Over-abstracting simple patterns
- Including patterns too specific to the source codebase
- Documenting obvious Rails conventions
- Cargo-culting without understanding

## Resources

This skill includes reference templates:

### references/
- `pattern_template.md` - Complete pattern document template
- `workspace_template.md` - Workspace setup files template

To use these templates, read the relevant file and adapt it to the specific codebase and pattern being documented.
