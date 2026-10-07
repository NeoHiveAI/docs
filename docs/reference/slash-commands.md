---
description: "Every command the NeoHive plugin adds to your agent, and when to run each one."
---

# Slash commands

Look up a NeoHive plugin command before you run it.

| Command | What it does |
|---|---|
| `/neohive:getting-started` | Runs first-time setup. Run it once per machine. The command checks the [MCP](../concepts/glossary.md#mcp) connection and sets up a token if your server needs one. It then writes a topology block into `CLAUDE.md`. Finally, it offers to migrate your context files and to turn on smart prompts. |
| `/neohive:load-context` | Calls `memory_context` with your current task, so rules and related knowledge load before work starts. Run it at the start of a session or when you switch tasks. |
| `/neohive:capture-session-learnings` | Reads the conversation and stores up to five new corrections, conventions, decisions, or pitfalls. It skips any that NeoHive already has. Nothing runs this command automatically, so run it before you close a session. |
| `/neohive:migrate-memory` | Reads `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, your rules folders, and any `CONVENTIONS*.md` or `CONTRIBUTING.md` under `docs/`. The command then imports the project-specific entries. It skips personal preferences and writes nothing until you confirm. |
| `/neohive:generate-claude-md` | Checks which [Indexes](../concepts/glossary.md#index) are in your [Hive](../concepts/glossary.md#hive) and writes a topology block into `./CLAUDE.md`: what each Index holds and where new Memories go. Re-run it after you add, remove, or rename an Index. |
| `/neohive:design-codebase-docs` | Works with you to agree on a documentation standard for your codebase. The command saves the standard to NeoHive and writes two or three sample pages. It does not write the full set of docs. |
| `/neohive:enable-smart-prompts` | Installs a prompt hook that asks a small model (Haiku by default) to turn your prompt into a `memory_recall` query. The hook then adds only the best results. The new hook replaces the default hook, which sends your prompt as written. The hook needs `ANTHROPIC_API_KEY` and the `claude` CLI. Without them, the hook does nothing. |

## In Codex and Cursor

In Codex and Cursor, the same commands are skills. Ask your agent to run the skill by name, for example `load-context`. The following table shows the two things that differ:

| Agent | Topology skill | Writes to | Rules folders `migrate-memory` reads |
|---|---|---|---|
| Claude Code | `generate-claude-md` | `./CLAUDE.md` | `.claude/rules/` |
| Codex | `generate-agents-md` | `./AGENTS.md` | `.codex/rules/`, `.cursor/rules/`, `.claude/rules/` |
| Cursor | `generate-cursor-rules` | `.cursor/rules/neohive-topology.mdc` | `.codex/rules/`, `.cursor/rules/`, `.claude/rules/` |

<details>

<summary>Old command names that still work</summary>

These names redirect to the new commands. A future release will remove them.

| Old name | Use instead |
|---|---|
| `start` | `load-context` |
| `revise-vector-memory` | `capture-session-learnings` |
| `generate-docs` | `design-codebase-docs` |
| `generate-post-submit-hook` | `enable-smart-prompts` (Claude Code and Cursor only) |

</details>

{% hint style="info" %}
If the commands are missing after you install the plugin, run `/reload-plugins` in Claude Code. If they still do not appear, see [Agent can't connect](../troubleshooting/connection.md).
{% endhint %}

## Next step

See [MCP tools](mcp-tools.md) for the tools these commands call.
