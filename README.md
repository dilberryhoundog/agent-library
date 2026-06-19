# Agent Library

A self-contained toolchain for Claude assets — authored, packaged, and delivered from one place.

## Purpose

Claude assets — skills, agents, commands, and more — tend to scatter across every working directory you run Claude in. Spread out like that, they're impossible to maintain and impossible to deliver. This repository solves that: it stores, packages, and delivers those assets through Claude's official plugin framework, so a single source of truth feeds every Claude installation you work with.

## Marketplace Compatibility

This marketplace is compatible with both **Claude Code** and **Co-work**.
Some plugins are more suited to one of the two platforms. If you come across any compatibility issues, please report them with an issue.

## Quickstart

Installing is the same idea on both platforms — register this marketplace, then install whatever you want from it. Only the navigation differs.

**In Claude Code**

1. Run `/plugins`.
2. Open the **Marketplaces** tab and choose **Add marketplace**.
3. Use the green **Code** button above to copy the URL.
4. Paste this repository's URL into the marketplace dialog.

**In Co-work** (Mac or Windows app)

1. Open the **Cowork** tab, then **Customise**.
2. Add a **Personal plugin** → **Create plugin** → **Add marketplace**.
3. Use the green **Code** button above to copy the URL.
4. Paste this repository's URL into the marketplace dialog.

**Then, on either platform:** open the **Plugins** tab and install any — or all — of the plugins on offer. Plugins update themselves as new versions ship.

## The three core components

Plugins are bundled and delivered using an integrated toolchain: assets are authored, packaged into plugins, and delivered through a marketplace. Three components carry that flow.

### Custom plugin marketplace

Plugins are delivered and updated through Claude's official marketplace mechanism — a single install serves both Claude Code and Co-work, and keeps installed plugins current automatically as their versions change. The marketplace serves general use plugins from this repository — covering categories such as productivity, git, and developer workflow — all reachable under the one install.

### Plugin packaging

Plugins are packaged using Claude's official plugin format to bundle loose assets into coherent, versioned collections ready for delivery. Assets are symlinked into the plugin rather than copied, so the source of truth stays with the asset itself — lifting the maintenance burden off the plugin.

### Agent tools collection

A central home where Claude tools accumulate and get refactored over time, instead of living scattered across the directories where they were first written. This is where the assets that flow into packaging and delivery originate. Assets can be shared across multiple plugins, so it makes sense to maintain them here.

## Toolchain advantages

An integrated toolchain — assets → packaging → delivery — yields:

- **A single source of truth** for Claude assets.
- **Easy versioning and updating** of everything installed.
- **Clean working directories**, since each project's `.claude/` stays minimal.
- **Cross-platform reach**, working across Claude platforms.
- **Conceptually packaged assets** — pull them in where they're needed, leave them out where they're not.
