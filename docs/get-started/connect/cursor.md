---
description: "Connect Cursor to a Hive and install the NeoHive plugin."
---

# Cursor

To connect Cursor, you add your [Hive](../../concepts/glossary.md#hive) (your team's NeoHive workspace) to the Cursor [MCP](../../concepts/glossary.md#mcp) configuration file. Then you install the plugin and check that Cursor can call NeoHive's tools.

Before you start, you need a running NeoHive server that has a Hive, Cursor, and `git`.

{% stepper %}
{% step %}
## Add the MCP server

To add the Hive to Cursor, do the following:

1. Open the Hive in the dashboard.
2. Go to **Install Instructions**.
3. Click **Cursor**.
4. Copy the JSON into `.cursor/mcp.json` in your project. To use the Hive in every project, copy the JSON into `~/.cursor/mcp.json` instead.

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

If the file already has an `mcpServers` block, add the entry inside that block.

Cursor connects to the URL directly, so Cursor doesn't need `mcp-remote` or another program in between.
{% endstep %}

{% step %}
## Install the plugin

To install the plugin, do the following:

1. If you linked the plugin into Cursor's local plugins folder before, delete the link. Cursor skips a link there that points to another place on disk, so the old link never loaded. The link also makes the next step fail with `already exists and is not an empty directory`. To delete the link, run the following command:

   ```bash
   rm ~/.cursor/plugins/local/neohive
   ```
2. Clone the plugin into Cursor's local plugins folder:

   ```bash
   git clone https://github.com/NeoHiveAI/NeoHiveCursor.git \
     ~/.cursor/plugins/local/neohive
   ```

   Clone the plugin into that folder rather than linking to a copy somewhere else, because Cursor ignores a link to a copy outside the folder.
3. Restart Cursor, or run **Developer: Reload Window** from the Command Palette.

{% hint style="info" %}
On Cursor Enterprise, Cursor loads local plugins only after an administrator turns on **Allow Local Plugin Imports**. The setting is off by default.
{% endhint %}

The plugin adds a set of skills and an always-on rule, `rules/neohive.mdc`, which tells Cursor when to call `memory_context`, `memory_recall`, and `memory_store`. Those tools come from the MCP server, not from the plugin, which is why you added the server first.
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

Cursor is connected, so you can skip the pages for other agents. Continue with [Your first session](../first-session.md).
