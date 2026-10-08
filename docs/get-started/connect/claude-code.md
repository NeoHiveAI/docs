---
description: "Connect Claude Code to a Hive and install the NeoHive plugin."
---

# Claude Code

To connect Claude Code, you register your [Hive](../../concepts/glossary.md#hive) (your team's NeoHive workspace) as an [MCP](../../concepts/glossary.md#mcp) server. Then you install the plugin and check that Claude Code can call NeoHive's tools.

Before you start, you need a running NeoHive server with a Hive, and a version of Claude Code that supports plugins.

{% stepper %}
{% step %}
## Add the MCP server

To add the Hive as an MCP server, do the following:

1. Open the Hive in the dashboard, and go to **Install Instructions**.
2. Select **Claude Code**.
3. Copy the first command.
4. Add `--scope user` directly after the URL.
5. Run the command in your normal terminal, outside Claude Code.

The command with `--scope user` added looks like this:

```bash
claude mcp add <name> '<hive-url>' \
  --scope user \
  --transport http \
  --header 'x-mcp-client: claude-code'
```

The command that the dashboard shows leaves out `--scope user`. Without `--scope user`, Claude Code saves the server for the current folder only. The plugin's prompt hook then cannot find the server.

The prompt hook reads servers from the user-wide list in `~/.claude.json` and from your project's `.mcp.json`. To write the server to `.mcp.json` instead, use `--scope project`. Your team can commit `.mcp.json` to the repository. The file also turns on the plugin's Glob and Grep reminder.

Keep the URL directly after the name. If the URL comes after a flag, Claude Code reads the URL as a header value and cannot reach the server. The command that the dashboard shows ends with `&& claude mcp get <name>`, which prints the saved entry.
{% endstep %}

{% step %}
## Install the plugin

To install the plugin, start Claude Code in your project, and then run the following commands:

```text
/plugin marketplace add NeoHiveAI/NeoHiveClaude
/plugin install neohive@neohive-claude
/reload-plugins
```

If you skip `/reload-plugins`, the next step fails with an unknown command error. The plugin does not add an MCP server, which is why step 1 comes first. The plugin adds the following parts:

| Part | What it does |
|---|---|
| Rules file | Installs `~/.claude/rules/neohive.md` at session start. The file tells Claude Code when to call `memory_context`, `memory_recall`, and `memory_store`. |
| Prompt hook | Adds relevant [Memories](../../concepts/glossary.md#memory) to the context when you send a prompt. |
| Glob and Grep reminder | Suggests `memory_recall` before a broad file search. |
| `explore-neohive` subagent | Searches NeoHive before reading files. |
| Skills | `/neohive:getting-started`, `/neohive:load-context`, `/neohive:capture-session-learnings`, and others. See [Slash commands](../../reference/slash-commands.md). |

[What the plugin does automatically](../../results/plugin-automation.md) explains when each part runs and how to turn each hook off. It also says when the prompt hook skips a prompt.
{% endstep %}

{% step %}
## Run the setup wizard

Run the following command inside Claude Code:

```text
/neohive:getting-started
```

The wizard checks that the Hive is reachable and offers to write a Hive summary into your project's `CLAUDE.md`. The wizard can also move existing `CLAUDE.md`, `AGENTS.md`, and `.claude/rules` content into NeoHive. The wizard asks before each write.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** Claude Code can reach the Hive.

Ask Claude Code: `List my NeoHive Indexes.` Claude Code calls `list_indexes` and lists the [Indexes](../../concepts/glossary.md#index), or content stores, in the Hive. The dashboard's **Install Instructions** panel also marks **Claude Code** as connected.

If the `list_indexes` tool is missing, run `claude mcp get <name>` and compare the URL with the dashboard. Then see [Agent can't connect](../../troubleshooting/connection.md).
{% endhint %}

## Next step

[Your first session](../first-session.md)
