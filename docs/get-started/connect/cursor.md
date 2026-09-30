---
description: "Connect Cursor to a hive and install the NeoHive plugin."
---

# Cursor

Add the hive to Cursor's MCP config, install the plugin, and check that Cursor can call NeoHive's tools.

**You need:** a running NeoHive with a hive, Cursor, and `git`.

{% stepper %}
{% step %}
## Add the MCP server

Open the hive in the dashboard, go to **Install Instructions**, and pick **Cursor**. Copy the JSON into `.cursor/mcp.json` in your project, or into `~/.cursor/mcp.json` to use the hive in every project:

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

If the file already has an `mcpServers` block, add the entry inside it. Cursor connects to the URL directly, so it needs no bridge.
{% endstep %}

{% step %}
## Install the plugin

Clone the plugin and link it into Cursor's local plugins folder:

```bash
git clone https://github.com/NeoHiveAI/NeoHiveCursor.git
mkdir -p ~/.cursor/plugins/local
ln -s "$(pwd)/NeoHiveCursor" ~/.cursor/plugins/local/neohive
```

Restart Cursor. The plugin adds an always-on rule, `rules/neohive.mdc`, that tells Cursor when to call `memory_context`, `memory_recall`, and `memory_store`, plus a set of skills. It does not add an MCP server, which is why step 1 comes first.
{% endstep %}

{% step %}
## Run the setup skill

Ask Cursor to run the `getting-started` skill. It checks the hive is reachable, offers to write a hive summary rule to `.cursor/rules/neohive-topology.mdc`, and can move existing rules files (`CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, and similar) into NeoHive.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** Cursor can reach the hive.

Ask Cursor: `List my NeoHive indexes.` It calls `list_indexes` and lists the hive's indexes. The dashboard's **Install Instructions** panel also marks **Cursor** as connected.

If the tool is missing, compare the `url` in your `mcp.json` with the dashboard. Then see [Agent can't connect](../../troubleshooting/connection.md).
{% endhint %}

## Next step

[Your first session](../first-session.md)
