---
description: "Connect Codex to a hive and install the NeoHive plugin."
---

# Codex

Add the hive to Codex's MCP config, install the plugin, and check that Codex can call NeoHive's tools.

**You need:** a running NeoHive with a hive, and the Codex CLI with plugin support.

{% stepper %}
{% step %}
## Add the MCP server

Open the hive in the dashboard, go to **Install Instructions**, and pick **Codex**. Copy the block into `~/.codex/config.toml`, or into `.codex/config.toml` in your project to use it there only:

```toml
[mcp_servers.<name>]
url = "http://localhost:3577/hives/<hive-id>/mcp"
http_headers = { "x-mcp-client" = "codex" }
```

The dashboard's copy names that key `headers`. Codex reads `http_headers`, so rename it when you paste.

Codex connects to the URL directly, so it needs no bridge.
{% endstep %}

{% step %}
## Install the plugin

Add the NeoHive marketplace from your terminal:

```bash
codex plugin marketplace add NeoHiveAI/NeoHiveCodex
```

Start Codex, enter `/plugins`, and install **NeoHive** from the list. Then start a new Codex session so the plugin's skills load.

The plugin adds a rules file that tells Codex when to call `memory_context`, `memory_recall`, and `memory_store`, plus a set of skills. It does not add an MCP server, which is why step 1 comes first.
{% endstep %}

{% step %}
## Run the setup skill

Ask Codex to run the NeoHive `getting-started` skill. It checks the hive is reachable, offers to write a hive summary into your project's `AGENTS.md`, and can move existing rules files (`CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, `.codex/rules`) into NeoHive.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** Codex can reach the hive.

Ask Codex: `List my NeoHive indexes.` It calls `list_indexes` and lists the hive's indexes. The dashboard's **Install Instructions** panel also marks **Codex** as connected.

If the tool is missing, compare the `url` in your `config.toml` with the dashboard. Then see [Agent can't connect](../../troubleshooting/connection.md).
{% endhint %}

## Next step

[Your first session](../first-session.md)
