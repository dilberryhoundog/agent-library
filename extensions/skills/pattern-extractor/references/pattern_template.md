# Pattern Template

Use this template when documenting a pattern. Copy and adapt as needed.

---

# [Pattern Name]

## Overview

[2-3 sentences describing what the pattern does and the problem it solves]

**Problem it solves:** [Describe the specific pain points this pattern addresses]

**Core insight:** [The key idea that makes this pattern work - often the non-obvious part]

## Key Files

| File                   | Purpose                |
|------------------------|------------------------|
| `path/to/main_file.rb` | Primary implementation |
| `path/to/concern.rb`   | Supporting behavior    |
| `path/to/config.rb`    | Configuration          |

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     Component A                          │
├──────────────────────────────────────────────────────────┤
│  Subcomponent 1        Subcomponent 2                    │
│  - detail              - detail                          │
└──────────────────────────────────────────────────────────┘
                         │
                         │ relationship description
                         ▼
┌──────────────────────────────────────────────────────────┐
│                     Component B                          │
└──────────────────────────────────────────────────────────┘
```

### Relationship Diagram

```
ComponentA (identifier)
    │
    ├── ComponentB ────► ComponentC
    │   - attribute
    │
    └── ComponentD
        - attribute
```

## Implementation

### Primary Component

[Brief description of this component's responsibility]

```ruby
# path/to/file.rb
class PrimaryComponent < ApplicationRecord
  # Key design decision: [explain why this approach was chosen]

  include ConcernA, ConcernB

  belongs_to :parent
  has_many :children

  def key_method
    # Implementation with inline comments explaining non-obvious parts
  end
end
```

**Key design decisions:**
- `decision_1` - [explanation]
- `decision_2` - [explanation]

### Supporting Concern

```ruby
# path/to/concern.rb
module SupportingConcern
  extend ActiveSupport::Concern

  included do
    # Class-level configuration
  end

  def concern_method
    # Implementation
  end
end
```

### Configuration/Middleware (if applicable)

```ruby
# config/initializers/feature.rb
# [explanation of what this configures]
```

## Database Schema

```ruby
# Only if the pattern involves specific table structures
create_table "table_name", id: :uuid do |t|
  t.string "column_name", null: false
  t.uuid "foreign_key_id"
  t.timestamps
  t.index ["column_name"], unique: true
end
```

## Usage Examples

### Basic Usage

```ruby
# Simple case
component = Component.create!(attribute: value)
component.do_something
```

### With Options

```ruby
# More complex case with options
component = Component.create!(
  attribute: value,
  option: true
)
```

### In a Controller

```ruby
# How it's typically used in request handling
def action
  @component = Component.find(params[:id])
  head :forbidden unless @component.accessible_by?(Current.user)
end
```

### Edge Cases

```ruby
# Handling special situations
# [describe the edge case]
```

## Adaptation Notes

### Minimum Viable Implementation

For simpler apps, you can skip:
- [Feature/file that can be omitted]
- [Another optional component]

Minimum required:
- [Essential file/component]
- [Another essential piece]

### Alternative Approaches

Instead of [approach in this pattern], you could:
- **Alternative A:** [description] - good when [use case]
- **Alternative B:** [description] - good when [use case]

### Customization Points

The pattern is easily extensible:

```ruby
# Example of extending the pattern
class Extended < Base
  # Add custom behavior here
end
```

### Prerequisites

Before implementing this pattern, ensure you have:
- [ ] Dependency A configured
- [ ] Dependency B installed
- [ ] Understanding of concept X

### Related Patterns

This pattern works well with:
- [Related Pattern A](related-pattern-a.md) - for [use case]
- [Related Pattern B](related-pattern-b.md) - for [use case]
