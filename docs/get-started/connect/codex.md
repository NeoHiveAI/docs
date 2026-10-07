---
description: "Connect Codex to a Hive and install the NeoHive plugin."
---

# Codex

To connect Codex, you add your [Hive](../../concepts/glossary.md#hive) (your team's NeoHive workspace) to the Codex [MCP](../../concepts/glossary.md#mcp) configuration file. Then you install the plugin and check that Codex can call NeoHive's tools.

Before you start, you need a running NeoHive server with a Hive, and a version of the Codex command-line interface (CLI) that supports plugins.

{% stepper %}
{% step %}
## Add the MCP server

To add the Hive to Codex, do the following:

1. Open the Hive in the dashboard, and go to **Install Instructions**.
2. Select **Codex**.
3. Copy the block into `~/.codex/config.toml`. To use the Hive in one project only, copy the block into `.codex/config.toml` in that project instead.
4. Rename the `headers` key to `http_headers`. The dashboard names the key `headers`, but Codex reads `http_headers`.

After you rename the key, the block looks like this:

```toml
[mcp_servers.<name>]
url = "http://localhost:3577/hives/<hive-id>/mcp"
http_headers = { "x-mcp-client" = "codex" }
```

Codex connects to the URL directly, so Codex does not need `mcp-remote` or another program in between.
{% endstep %}

{% step %}
## Install the plugin

Add the NeoHive marketplace from your terminal:

```bash
codex plugin marketplace add NeoHiveAI/NeoHiveCodex
```

After you add the marketplace, do the following:

1. Start Codex, and enter `/plugins`.
2. Install **NeoHive** from the list.
3. To load the plugin's skills, start a new Codex session.

The plugin adds a set of skills and a rules file. The rules file tells Codex when to call `memory_context`, `memory_recall`, and `memory_store`. The plugin does not add an MCP server, which is why step 1 comes first.
{% endstep %}

{% step %}
## Run the setup skill

Ask Codex to run the NeoHive `getting-started` skill. The skill checks that the Hive is reachable and offers to write a Hive summary into your project's `AGENTS.md`. The skill can also move existing rules files (`CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, and `.codex/rules`) into NeoHive.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** Codex can reach the Hive.

Ask Codex: `List my NeoHive Indexes.` Codex calls `list_indexes` and lists the [Indexes](../../concepts/glossary.md#index), or content stores, in the Hive. The dashboard's **Install Instructions** panel also marks **Codex** as connected.

If the `list_indexes` tool is missing, compare the `url` in your `config.toml` with the dashboard. Then see [Agent can't connect](../../troubleshooting/connection.md).
{% endhint %}

## Next step

[Your first session](../first-session.md)
