---
description: "NeoHive's slash commands, MCP tools, and environment variables."
---

# Reference

## Slash commands

Available in your agent after installing the NeoHive plugin. Run them directly in your agent session.

| Command | What it does |
|---------|-------------|
| `/neohive:getting-started` | First-time setup wizard. Verifies the MCP connection, creates a project, and optionally migrates existing context files. Run once per machine. |
| `/neohive:load-context` | Pre-loads relevant context for your current task. Run at the start of a session, or when switching tasks mid-session. |
| `/neohive:capture-session-learnings` | Scans the current conversation and stores corrections, conventions, decisions, and insights. Also runs at session end via the plugin hook. |
| `/neohive:migrate-memory` | Imports knowledge from `CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, and `.claude/rules`. See [Migrating away from Markdown](migration.md). |
| `/neohive:generate-claude-md` | Generates a NeoHive topology block in your project's `CLAUDE.md`. Re-run when hives are added or renamed. |
| `/neohive:design-codebase-docs` | Guides you through defining a documentation standard for your codebase, saves it to NeoHive, and generates sample pages to validate it. |
| `/neohive:enable-smart-prompts` | Installs a hook that rewrites your prompts with a small model before searching NeoHive, improving recall relevance. |

{% hint style="info" %}
The `/neohive:` prefix is Claude Code's syntax. In Codex and Cursor you invoke the same skills by name (for example, run the `load-context` skill) without the prefix. The topology command also differs by agent: Claude Code writes `CLAUDE.md` with `generate-claude-md`, Codex writes `AGENTS.md` with `generate-agents-md`, and Cursor writes a project rule with `generate-cursor-rules`.
{% endhint %}

## MCP tools

The plugin's rules and hooks call these tools under the hood, and any MCP-capable agent can use them directly.

| Tool | What it does |
|------|-------------|
| `memory_recall` | Semantic search across the project's hives; returns the most relevant code and knowledge. |
| `memory_context` | Loads directives, conventions, and task-relevant knowledge at the start of a session or task. |
| `memory_store` | Saves a new memory — a convention, decision, insight, or correction — to a knowledge hive. |
| `memory_forget` | Removes or supersedes an outdated memory. |
| `memory_stats` | Reports counts and statistics for the project's stored memories. |
| `list_hives` | Lists the hives available in the current project. |

## Environment variables

Set these before running the installer or launching your agent.

| Variable | Purpose |
|----------|---------|
| `NEOHIVE_LICENSE_FILE` | Path to your license file, used during install. See [Licensing](config/licensing.md). |
| `NEOHIVE_ROTATE_LICENSE` | Set to `1` to rotate to a replacement license during install. |
| `NEOHIVE_BACKEND` | Force a compute backend, e.g. `cpu`. See [GPU vs CPU](config/gpu.md). |
| `NEOHIVE_PORT` | Change the port NeoHive binds to (default `3577`). |
| `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS` | Raise the per-document PDF processing timeout for large PDFs. See [Repository Sync Issues](troubleshooting/sync.md). |
| `NEOHIVE_TOKEN` | Bearer token your agent sends when your NeoHive deployment sits behind an authenticating proxy you run (for example a reverse proxy or VPN gateway). A standard local install needs no token. |
| `NEOHIVE_MCP_HINTS` | Set to `0` to suppress the recall/context hint appended to tool responses. |
