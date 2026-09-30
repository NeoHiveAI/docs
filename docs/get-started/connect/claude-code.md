---
description: "Connect Claude Code to a Hive and install the NeoHive plugin."
---

# Claude Code

Register the Hive as an MCP server, install the plugin, and check that Claude Code can call NeoHive's tools.

**You need:** a running NeoHive with a Hive, and Claude Code with plugin support.

{% stepper %}
{% step %}
## Add the MCP server

Open the Hive in the dashboard, go to **Install Instructions**, and pick **Claude Code**. Run the first command in your normal terminal, outside Claude Code, with `--scope user` added after the URL:

```bash
claude mcp add <name> '<hive-url>' \
  --scope user \
  --transport http \
  --header 'x-mcp-client: claude-code'
```

The dashboard's copy leaves out `--scope user`. Without it, Claude Code saves the server for the current folder only, and the plugin's prompt hook cannot find it.

The hook reads servers from the user-wide list in `~/.claude.json` and from your project's `.mcp.json`. Use `--scope project` instead to write the server to `.mcp.json`, which your team can commit and which also turns on the Glob and Grep reminder below.

Keep the URL directly after the name. If the URL comes after a flag, Claude Code reads it as a header value and cannot reach the server. The dashboard's copy ends with `&& claude mcp get <name>`, which prints the saved entry.
{% endstep %}

{% step %}
## Install the plugin

Start Claude Code in your project and run these inside the session:

```text
/plugin marketplace add NeoHiveAI/NeoHiveClaude
/plugin install neohive@neohive-claude
/reload-plugins
```

Without `/reload-plugins`, the next step fails with an unknown command. The plugin adds no MCP server, which is why step 1 comes first. The plugin adds these parts:

| Part | What it does |
|---|---|
| Rules file | Installs `~/.claude/rules/neohive.md` at session start. It tells Claude when to call `memory_context`, `memory_recall`, and `memory_store`. |
| Prompt hook | Adds relevant Memories to the context on every prompt you send. It skips slash commands and prompts shorter than 10 characters. |
| Glob and Grep reminder | Suggests `memory_recall` before a broad file search. It works only in a project whose `.mcp.json` names a NeoHive server. |
| `explore-neohive` subagent | Searches NeoHive before reading files. |
| Skills | `/neohive:getting-started`, `/neohive:load-context`, `/neohive:capture-session-learnings`, and others. See [Slash commands](../../reference/slash-commands.md). |
{% endstep %}

{% step %}
## Run the setup wizard

```text
/neohive:getting-started
```

The wizard checks the Hive is reachable, offers to write a Hive summary into your project's `CLAUDE.md`, and can move existing `CLAUDE.md`, `AGENTS.md`, and `.claude/rules` content into NeoHive. It asks before each write.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** Claude Code can reach the Hive.

Ask Claude Code: `List my NeoHive Indexes.` It calls `list_indexes` and lists the Hive's Indexes. The dashboard's **Install Instructions** panel also marks **Claude Code** as connected.

If the tool is missing, run `claude mcp get <name>` and compare the URL with the dashboard. Then see [Agent can't connect](../../troubleshooting/connection.md).
{% endhint %}

<details>

<summary>Optional: turn off the plugin's hooks</summary>

| To do this | Set before you start Claude Code |
|---|---|
| Turn off the prompt hook | `NEOHIVE_HOOK_DISABLED=1` |
| Turn off the Glob and Grep reminder | `NEOHIVE_PRETOOL_DISABLED=1` |
| Block broad Glob and Grep searches instead of reminding | `NEOHIVE_PRETOOL_STRICT=1` |

</details>

## Next step

[Your first session](../first-session.md)
