#!/usr/bin/env bash
# Install the classroom-pdf server's runtime dependency (puppeteer + Chromium)
# into the plugin's persistent data directory.
#
# Idempotent: it compares the bundled mcp/package.json against the copy in the
# data dir and only runs npm install when they differ (first run or a plugin
# update that changed the dependency). Safe to call on every SessionStart and
# safe for the MCP server to call as a self-heal.

set -euo pipefail

PLUGIN_ROOT="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
DATA_DIR="${CLAUDE_PLUGIN_DATA:-$HOME/.claude/classroom-data}"

SRC_MANIFEST="$PLUGIN_ROOT/mcp/package.json"
DST_MANIFEST="$DATA_DIR/package.json"

# Chromium downloads here; the .mcp.json points the server at the same path.
export PUPPETEER_CACHE_DIR="${PUPPETEER_CACHE_DIR:-$DATA_DIR/puppeteer}"

mkdir -p "$DATA_DIR"

if diff -q "$SRC_MANIFEST" "$DST_MANIFEST" >/dev/null 2>&1; then
  # Up to date — nothing to do.
  exit 0
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "classroom: npm not found; cannot install the PDF engine. HTML-to-PDF will fall back to manual (Print -> Save as PDF)." >&2
  exit 1
fi

echo "classroom: installing the PDF engine (puppeteer + Chromium) into $DATA_DIR ..." >&2
cp "$SRC_MANIFEST" "$DST_MANIFEST"

# Install into the data dir so node_modules persists across plugin updates.
if (cd "$DATA_DIR" && npm install --no-audit --no-fund >&2); then
  echo "classroom: PDF engine ready." >&2
else
  # Leave no stale manifest behind, so the next run retries the install.
  rm -f "$DST_MANIFEST"
  echo "classroom: PDF engine install failed; will retry next session." >&2
  exit 1
fi
