# Reference

## Slash commands

These commands are available in your agent after installing the NeoHive plugin. Run them directly in your agent session.

| Command | What it does |
|---------|-------------|
| `/neohive:getting-started` | First-time setup wizard. Verifies the MCP connection, creates a project, and optionally migrates existing context files. Run once per machine. |
| `/neohive:load-context` | Pre-loads relevant context for your current task. Run at the start of a session, or when switching tasks mid-session. |
| `/neohive:capture-session-learnings` | Scans the current conversation and stores corrections, conventions, decisions, and insights into NeoHive. Also runs at session end via the plugin hook. |
| `/neohive:migrate-memory` | Imports knowledge from `CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, and `.claude/rules` into NeoHive. See [Migrating from CLAUDE.md](migration.md). |
| `/neohive:generate-claude-md` | Generates a NeoHive topology block in your project's `CLAUDE.md`. Re-run when hives are added or renamed. |
| `/neohive:enable-smart-prompts` | Installs a hook that rewrites your prompts with a small model before searching NeoHive, improving recall relevance. |
