---
description: "Connect Codex to a Hive and install the NeoHive plugin."
---

# Codex

To connect Codex, you add your [Hive](../../concepts/glossary.md#hive) (your team's NeoHive workspace) to the Codex [MCP](../../concepts/glossary.md#mcp) configuration file. Then you install the plugin and check that Codex can call NeoHive's tools.

Before you start, you need a running NeoHive server that has a Hive, and a version of the Codex CLI that supports plugins.

{% stepper %}
{% step %}
## Add the MCP server

To add the Hive to Codex, do the following:

1. Open the Hive in the dashboard.
2. Go to **Install Instructions**. If the panel is collapsed, click **Install** or **Reinstall** to open it.
3. Select **Codex**.
4. Copy the block into `~/.codex/config.toml`. To use the Hive in one project only, copy the block into `.codex/config.toml` in that project instead.

The block looks like this:

```toml
[mcp_servers.<name>]
url = "http://localhost:3577/hives/<hive-id>/mcp"
http_headers = { "x-mcp-client" = "codex" }
```
{% endstep %}

{% step %}
## Install the plugin

Add the NeoHive marketplace from your terminal:

```bash
codex plugin marketplace add NeoHiveAI/NeoHiveCodex
```

After you add the marketplace, do the following:

1. Start Codex.
2. Enter `/plugins`.
3. Install **NeoHive** from the list.
4. To load the plugin's skills, start a new Codex session.

The plugin adds a set of skills. The tools that the skills call, such as `memory_recall`, come from the MCP server, which is why you added the server first.
{% endstep %}

{% step %}
## Run the setup skill

Ask Codex to run the NeoHive `getting-started` skill. The skill checks that the Hive is reachable. Next, the skill offers to write a Hive summary and NeoHive rules into your project's `AGENTS.md`. The rules tell Codex when to call `memory_context`, `memory_recall`, and `memory_store`. You can also use the skill to move existing rules files (`CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, and `.codex/rules`) into NeoHive.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** Codex can reach the Hive.

Ask Codex: `List my NeoHive Indexes.` Codex calls `list_indexes` and lists the [Indexes](../../concepts/glossary.md#index), or content stores, in the Hive. The dashboard's **Install Instructions** panel also marks **Codex** as connected.

If the `list_indexes` tool is missing, compare the `url` in your `config.toml` with the dashboard. Then see [Agent can't connect](../../troubleshooting/connection.md).
{% endhint %}

## Next step

Codex is connected, so you can skip the pages for other agents. Continue with [Your first session](../first-session.md).
