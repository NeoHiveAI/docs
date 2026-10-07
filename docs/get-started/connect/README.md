---
description: "Select your agent and connect it to a Hive. Every agent uses the same MCP endpoint from the dashboard."
---

# Connect your agent

Every agent connects to a [Hive](../../concepts/glossary.md#hive), your team's NeoHive workspace. The agent needs the Hive's [MCP](../../concepts/glossary.md#mcp) endpoint, the web address that agents use to reach the Hive. Claude Code, Cursor, and Codex also get a plugin that tells them when to use NeoHive.

<figure><img src="../../.gitbook/assets/get-started-connect.svg" alt="Your agent connects to one Hive through the Hive's MCP endpoint. The endpoint gives the agent the memory tools and reaches the Hive's Code, Documentation, Files, and Knowledge Indexes. A plugin inside the agent tells the agent when to use those tools."><figcaption></figcaption></figure>

| Agent | Page | What you set up |
|---|---|---|
| **Claude Code** | [Claude Code](claude-code.md) | `claude mcp add`, then the NeoHive plugin |
| **Cursor** | [Cursor](cursor.md) | `.cursor/mcp.json`, then the NeoHive plugin |
| **Codex** | [Codex](codex.md) | `~/.codex/config.toml`, then the NeoHive plugin |
| **Claude Desktop** or any other MCP app | [Claude Desktop and other MCP apps](desktop-apps.md) | The endpoint, or `mcp-remote` for apps that only run local commands |

## Where to copy the endpoint

The **Install Instructions** panel stays open on the Hive page until an agent connects. To copy the endpoint, do the following:

1. Open the Hive in the dashboard.
2. If an agent has already connected, select **Install** or **Reinstall** to open the **Install Instructions** panel.
3. Select your agent.

The panel fills in the commands with the Hive's endpoint:

```text
http://localhost:3577/hives/<hive-id>/mcp
```

The host is the address you used to open the dashboard, so a shared server shows its own address. The commands and config files also send an `x-mcp-client` header that names your agent. The panel uses that header to show which agents are connected and when each one last made a request.

Keep `neohive` in the server name the dashboard gives you. The plugins find the Hive by looking for an MCP server whose name contains `neohive`.

## Tell your agent to use NeoHive

The plugins add the following instructions for you. If your agent has no plugin, paste the instructions into your agent's rules file (`CLAUDE.md` or `AGENTS.md`) or system prompt. Then adjust the instructions to match what your team wants to keep:

```text
## NeoHive

- At the start of every session, call `memory_context` with a short description of the task, for example "adding rate limits to the Express gateway". It loads the conventions and decisions that apply.
- Before reading many files to learn how something works, call `memory_recall` with specific terms, for example "payment retry handler". The indexed code often answers it directly.
- When I correct you, set a convention, or point out a gotcha, call `memory_store`. Write one self-contained statement with the terms a later search would use and the reason behind it.
- If more than one Hive is connected and you are unsure which one a Memory belongs in, ask before storing.
```

## Next step

[Claude Code](claude-code.md)
