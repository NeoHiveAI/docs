---
description: "Connect Cursor to a Hive and install the NeoHive plugin."
---

# Cursor

To connect Cursor, you add your [Hive](../../concepts/glossary.md#hive) (your team's NeoHive workspace) to the Cursor [MCP](../../concepts/glossary.md#mcp) configuration file. Then you install the plugin and check that Cursor can call NeoHive's tools.

Before you start, you need a running NeoHive server with a Hive, Cursor, and `git`.

{% stepper %}
{% step %}
## Add the MCP server

To add the Hive to Cursor, do the following:

1. Open the Hive in the dashboard, and go to **Install Instructions**.
2. Select **Cursor**.
3. Copy the JSON into `.cursor/mcp.json` in your project. To use the Hive in every project, copy the JSON into `~/.cursor/mcp.json` instead.

The JSON looks like this:

```json
{
  "mcpServers": {
    "<name>": {
      "url": "http://localhost:3577/hives/<hive-id>/mcp",
      "headers": {
        "x-mcp-client": "cursor"
      }
    }
  }
}
```

If the file already has an `mcpServers` block, add the entry inside that block. Cursor connects to the URL directly, so Cursor does not need `mcp-remote` or another program in between.
{% endstep %}

{% step %}
## Install the plugin

To install the plugin, clone the plugin and link the plugin into Cursor's local plugins folder:

```bash
git clone https://github.com/NeoHiveAI/NeoHiveCursor.git
mkdir -p ~/.cursor/plugins/local
ln -s "$(pwd)/NeoHiveCursor" ~/.cursor/plugins/local/neohive
```

Then restart Cursor. The plugin adds a set of skills and an always-on rule, `rules/neohive.mdc`. The rule tells Cursor when to call `memory_context`, `memory_recall`, and `memory_store`. The plugin does not add an MCP server, which is why step 1 comes first.
{% endstep %}

{% step %}
## Run the setup skill

Ask Cursor to run the `getting-started` skill. The skill checks that the Hive is reachable and offers to write a Hive summary rule to `.cursor/rules/neohive-topology.mdc`. The skill can also move existing rules files (`CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, and similar files) into NeoHive.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** Cursor can reach the Hive.

Ask Cursor: `List my NeoHive Indexes.` Cursor calls `list_indexes` and lists the [Indexes](../../concepts/glossary.md#index), or content stores, in the Hive. The dashboard's **Install Instructions** panel also marks **Cursor** as connected.

If the `list_indexes` tool is missing, compare the `url` in your `mcp.json` with the dashboard. Then see [Agent can't connect](../../troubleshooting/connection.md).
{% endhint %}

## Next step

[Your first session](../first-session.md)
