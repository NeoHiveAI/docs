---
description: "Connect Claude Code to a hive and install the NeoHive plugin."
---

# Claude Code

Register the hive as an MCP server, install the plugin, and check that Claude Code can call NeoHive's tools.

**You need:** a running NeoHive with a hive, and Claude Code with plugin support.

{% stepper %}
{% step %}
## Add the MCP server

Open the hive in the dashboard, go to **Install Instructions**, and pick **Claude Code**. Run the first command in your normal terminal, outside Claude Code:

```bash
claude mcp add <name> '<hive-url>' \
  --scope user \
  --transport http \
  --header 'x-mcp-client: claude-code'
```

Add `--scope user` if you copy the command from the dashboard, which leaves it out. Without it, Claude Code saves the server for the current folder only, and the plugin's automatic recall cannot find it.

Keep the URL directly after the name. After a flag, Claude Code reads it as a header value and cannot reach the server. The dashboard's copy ends with `&& claude mcp get <name>`, which prints the saved entry.
{% endstep %}

{% step %}
## Install the plugin

Start Claude Code in your project and run these inside the session:

```text
/plugin marketplace add NeoHiveAI/NeoHiveClaude
/plugin install neohive@neohive-claude
/reload-plugins
```

Without `/reload-plugins`, the next step fails with an unknown command. The plugin adds no MCP server, which is why step 1 comes first. It adds:

| Part | What it does |
|---|---|
| Rules file | Installs `~/.claude/rules/neohive.md` at session start. It tells Claude when to call `memory_context`, `memory_recall`, and `memory_store`. |
| Prompt hook | Adds relevant memories to the context on every prompt you send. |
| Glob and Grep reminder | Suggests `memory_recall` before a broad file search in an indexed project. |
| `explore-neohive` subagent | Searches NeoHive before reading files. |
| Skills | `/neohive:getting-started`, `/neohive:load-context`, `/neohive:capture-session-learnings`, and others. See [Slash commands](../../reference/slash-commands.md). |
{% endstep %}

{% step %}
## Run the setup wizard

```text
/neohive:getting-started
```

The wizard checks the hive is reachable, offers to write a hive summary into your project's `CLAUDE.md`, and can move existing `CLAUDE.md`, `AGENTS.md`, and `.claude/rules` content into NeoHive. It asks before each write.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** Claude Code can reach the hive.

Ask Claude Code: `List my NeoHive indexes.` It calls `list_indexes` and lists the hive's indexes. The dashboard's **Install Instructions** panel also marks **Claude Code** as connected.

If the tool is missing, run `claude mcp get <name>` and compare the URL with the dashboard. Then see [Agent can't connect](../../troubleshooting/connection.md).
{% endhint %}

<details>

<summary>Optional: make the prompt hook find the hive, or turn it off</summary>

The prompt hook reads servers named with `neohive` from your project's `.mcp.json` or the user-wide list in `~/.claude.json`. The dashboard's command saves the server for the current folder only, which the hook skips. Add `--scope user` (every project) or `--scope project` (writes `.mcp.json`) to the command.

To turn the hook off, set `NEOHIVE_HOOK_DISABLED=1` before you start Claude Code.

</details>

## Next step

[Your first session](../first-session.md)
