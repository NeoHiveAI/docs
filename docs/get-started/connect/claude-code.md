---
description: "Connect Claude Code to a Hive and install the NeoHive plugin."
---

# Claude Code

To connect Claude Code, you register your [Hive](../../concepts/glossary.md#hive) (your team's NeoHive workspace) as an [MCP](../../concepts/glossary.md#mcp) server. Then you install the plugin and check that Claude Code can call NeoHive's tools.

Before you start, you need a running NeoHive server that has a Hive, and a version of Claude Code that supports plugins.

{% stepper %}
{% step %}
## Add the MCP server

{% hint style="warning" %}
**Keep `--scope project`.** The plugin's prompt hook looks for the NeoHive server in your project's `.mcp.json` file first. With `--scope user`, every project recalls from the first Hive that you added. With no scope, the hook doesn't find the server, and automatic recall does nothing. For more information about scopes, see [MCP installation scopes](https://code.claude.com/docs/en/mcp#mcp-installation-scopes).
{% endhint %}

To add the Hive as an MCP server, do the following:

1. Open the Hive in the dashboard.
2. Go to **Install Instructions**. If the panel is collapsed, click **Install** or **Reinstall** to open it.
3. Select **Claude Code**.
4. Copy the first command.
5. In a terminal outside Claude Code, go to your project's root folder.
6. Run the command there.

The command looks like this:

```bash
claude mcp add <name> '<hive-url>' \
  --scope project \
  --transport http \
  --header 'x-mcp-client: claude-code'
```

If you type the command yourself, put the URL directly after the name. Claude Code reads a URL that comes after a flag as a header value, and then can't reach the server. The dashboard's command ends with `&& claude mcp get <name>`, which prints the saved entry so you can check the order.

Commit `.mcp.json` to the repository, and every teammate who opens the project gets the same Hive.

Keep `neohive` in the server name that the dashboard gives you, because the plugin finds the Hive by that name.

The next time Claude Code starts in the project and asks about the server from `.mcp.json`, approve the server.
{% endstep %}

{% step %}
## Install the plugin

To install the plugin, start Claude Code in your project, and then run the following commands:

```text
/plugin marketplace add NeoHiveAI/NeoHiveClaude
/plugin install neohive@neohive-claude
/reload-plugins
```

If you skip `/reload-plugins`, the next step fails with an unknown command error.

The plugin doesn't add an MCP server, which is why you added the server first. Instead, the plugin adds the following parts:

| Part | What it does |
|---|---|
| Rules file | Installs `~/.claude/rules/neohive.md` at session start. The file tells Claude Code when to call `memory_context`, `memory_recall`, and `memory_store`. |
| Prompt hook | Adds relevant [Memories](../../concepts/glossary.md#memory) to the context when you send a prompt. |
| Glob and Grep reminder | Suggests `memory_recall` before a broad file search. The reminder runs in projects that have the `.mcp.json` file. |
| `explore-neohive` subagent | Searches NeoHive before reading files. |
| Skills | `/neohive:getting-started`, `/neohive:load-context`, `/neohive:capture-session-learnings`, and others. For more information about each command, see [Slash commands](../../reference/slash-commands.md). |

For more information about when each part runs, when the prompt hook skips a prompt, and how to turn each hook off, see [What the plugin does automatically](../../results/plugin-automation.md).
{% endstep %}

{% step %}
## Run the setup wizard

To start the setup wizard, run the following command inside Claude Code:

```text
/neohive:getting-started
```

The wizard checks that the Hive is reachable and offers to write a Hive summary into your project's `CLAUDE.md`. You can also use the wizard to move existing `CLAUDE.md`, `AGENTS.md`, and `.claude/rules` content into NeoHive. Before each write, the wizard asks for your approval.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** Claude Code can reach the Hive.

Ask Claude Code: `List my NeoHive Indexes.` Claude Code calls `list_indexes` and lists the [Indexes](../../concepts/glossary.md#index), or content stores, in the Hive. The dashboard's **Install Instructions** panel also marks **Claude Code** as connected.

If the `list_indexes` tool is missing, run `claude mcp get <name>` and compare the URL with the dashboard. Then see [Agent can't connect](../../troubleshooting/connection.md).
{% endhint %}

## Next step

Claude Code is connected, so you can skip the pages for other agents. Continue with [Your first session](../first-session.md).
