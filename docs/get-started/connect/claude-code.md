---
description: "Connect Claude Code to a Hive and install the NeoHive plugin."
---

# Claude Code

To connect Claude Code, you register your [Hive](../../concepts/glossary.md#hive) (your team's NeoHive workspace) as an [MCP](../../concepts/glossary.md#mcp) server. Then you install the plugin and check that Claude Code can call NeoHive's tools.

Before you start, you need a running NeoHive server that has a Hive, and a version of Claude Code that supports plugins.

{% stepper %}
{% step %}
## Add the MCP server

To add the Hive as an MCP server, do the following:

1. Open the Hive in the dashboard.
2. Go to **Install Instructions**.
3. Click **Claude Code**.
4. Copy the first command.
5. In your normal terminal, outside Claude Code, go to your project's root folder.
6. Run the command there.

The command looks like this:

```bash
claude mcp add <name> '<hive-url>' \
  --scope project \
  --transport http \
  --header 'x-mcp-client: claude-code'
```

Keep the URL directly after the name. If the URL comes after a flag, Claude Code reads the URL as a header value and can't reach the server. To confirm the order, read the saved entry: the command that the dashboard shows ends with `&& claude mcp get <name>`, which prints the entry.

{% hint style="warning" %}
**Keep `--scope project`.** The flag saves the server in a `.mcp.json` file in the folder where you run the command. The plugin's prompt hook reads that file first, so automatic recall uses the Hive for this project. With the `--scope user` flag, the hook uses the first NeoHive server it finds. After you add a second Hive, every project then recalls from whichever Hive you added first. With no scope, Claude Code saves the server where the hook never looks, and automatic recall does nothing.
{% endhint %}

Commit `.mcp.json` to the repository, and every teammate who opens the project gets the same Hive. The file also turns on the plugin's Glob and Grep reminder.

The next time Claude Code starts in the project, it asks you to approve the server from `.mcp.json`. Approve the server, or Claude Code doesn't connect to the Hive.
{% endstep %}

{% step %}
## Install the plugin

To install the plugin, start Claude Code in your project, and then run the following commands:

```text
/plugin marketplace add NeoHiveAI/NeoHiveClaude
/plugin install neohive@neohive-claude
/reload-plugins
```

If you skip `/reload-plugins`, the next step fails with an unknown command error. The plugin doesn't add an MCP server, which is why you added the server first. Instead, the plugin adds the following parts:

| Part | What it does |
|---|---|
| Rules file | Installs `~/.claude/rules/neohive.md` at session start. The file tells Claude Code when to call `memory_context`, `memory_recall`, and `memory_store`. |
| Prompt hook | Adds relevant [Memories](../../concepts/glossary.md#memory) to the context when you send a prompt. |
| Glob and Grep reminder | Suggests `memory_recall` before a broad file search. |
| `explore-neohive` subagent | Searches NeoHive before reading files. |
| Skills | `/neohive:getting-started`, `/neohive:load-context`, `/neohive:capture-session-learnings`, and others. See [Slash commands](../../reference/slash-commands.md). |

For more information about when each part runs and how to turn each hook off, see [What the plugin does automatically](../../results/plugin-automation.md). That page also explains when the prompt hook skips a prompt.
{% endstep %}

{% step %}
## Run the setup wizard

To start the setup wizard, run the following command inside Claude Code:

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

Claude Code is connected, so you can skip the pages for other agents. Continue with [Your first session](../first-session.md).
