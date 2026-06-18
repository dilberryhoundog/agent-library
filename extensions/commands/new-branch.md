Prepares a repository and starts a new branch.

## Usage

```
/new-branch [branch-name]
```

## Command Script

```bash
#!/bin/bash

# New Branch Setup Command
# Usage: /new-branch [branch-name]

BRANCH_NAME="$ARGUMENTS"

# If no branch name provided, ask user or AI can suggest one
if [ -z "$BRANCH_NAME" ]; then
    echo "🤔 No branch name provided."
    echo "Please describe what you're working on, and I'll suggest a branch name."
    echo "Or provide a branch name directly:"
    echo "Usage: /new-branch <branch-name>"
    exit 1
fi

echo "🚀 Preparing repository for new branch: $BRANCH_NAME"

# Fetch latest changes from remote
echo "📡 Fetching latest changes..."
git fetch origin

# Switch to main branch
echo "🔄 Switching to main branch..."
git checkout main

# Pull latest changes
echo "⬇️ Pulling latest changes..."
git pull origin main

# Create and switch to new feature branch
echo "🌿 Creating new branch: $BRANCH_NAME"
git checkout -b $BRANCH_NAME

echo "✅ Repository prepared and switched to branch: $BRANCH_NAME"
echo "💡 You can now start working on your feature!"
```

## What This Command Does

1. **Validates Input**: Prompts for branch name if not provided
2. **Fetch Updates**: Gets latest changes from remote
3. **Switch to Main**: Switches to the main branch
4. **Pull Latest**: Ensures local main is up to date
5. **Create Branch**: Creates and switches to new branch

## Example Usage

```bash
/new-branch user-authentication
/new-branch fix-payment-bug
/new-branch add-dark-mode
```

## Implementation Notes

- Uses `$ARGUMENTS` as the branch name parameter
- Always uses main branch as base
- Provides clear status messages throughout the process
- Follows git best practices for branch creation
