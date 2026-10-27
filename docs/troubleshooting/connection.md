---
description: "Checks to run, in order, when your coding agent cannot reach NeoHive."
---

# Agent can't connect

Your agent reaches NeoHive through the [MCP](../concepts/glossary.md#mcp) endpoint of a [Hive](../concepts/glossary.md#hive). When the connection breaks, the agent shows a connection error, or the NeoHive tools do not appear.

Four things must work, in this order: the container, the server, the endpoint, and the agent's tools. The checks on this page test each one.

<figure><img src="../.gitbook/assets/troubleshooting-connection.svg" alt="Decision tree with four checks. Is the neohive container running? Does /health say ok? Does the agent's MCP endpoint match Install Instructions? Does the agent see the NeoHive tools? Each no leads to its fix. Four yes answers mean the agent is connected."><figcaption></figcaption></figure>

Run the checks in order. Stop at the first check that fails, and apply its fix. The commands use the default address, `localhost:3577`. If NeoHive runs on another machine or port, use that address instead.

{% stepper %}
{% step %}
## Is the container running?

```bash
docker ps --filter name=neohive
```

The `neohive` container shows a status of `Up`. A status of `Up` followed by `(unhealthy)` means the container runs but NeoHive reports a problem, so go to the next check. If the container is missing, start it and read the log to see why it stopped:

```bash
docker start neohive
docker logs neohive --tail 50
```

If Docker says `No such container`, the container no longer exists. Run the [installer](../get-started/install.md) again. Your data stays in the `neohive-data` volume.

If the start fails with `port is already allocated`, another program is using port `3577`. Stop that program, or install on another port with `NEOHIVE_PORT=4577`. If you change the port, change it in your agent's MCP endpoint too.
{% endstep %}

{% step %}
## Does NeoHive say it is healthy?

```bash
curl http://localhost:3577/health
```

| Reply contains | Meaning | Fix |
|---|---|---|
| `"status":"ok"` | NeoHive is ready. | Go to the next check. |
| `"status":"error"` | NeoHive could not finish starting, or its embedding engine cannot run. | Look up the `error` text in [Common errors](common-errors.md). |
| `"status":"degraded"` | At least one Hive failed its check. | On the dashboard home page, open that Hive's menu and select **Restart**. |

If `curl` reports `Failed to connect`, the container is not running. Go back to the first check.
{% endstep %}

{% step %}
## Is the MCP endpoint right?

Each Hive has its own endpoint, ending in `/hives/<hive-id>/mcp`. To check the endpoint, do the following:

1. Open the Hive in the dashboard.
2. Copy the endpoint from **Install Instructions**.
3. Compare the endpoint with your agent's MCP configuration, character by character. In Claude Code, `claude mcp get <name>` prints the URL.

A wrong Hive id returns `Unknown Hive: <id>`. A wrong port or host returns a connection error. After your agent reaches the Hive, **Install Instructions** shows a `CONNECTED` count.
{% endstep %}

{% step %}
## Does your agent see the tools?

Ask your agent: `List my NeoHive indexes.` Your agent calls `list_indexes` and answers. If the agent does not have the `list_indexes` tool, the agent has not loaded the NeoHive MCP server. Restart the agent after any configuration change.

In Claude Code, the command from **Install Instructions** saves the server in `.mcp.json` in the folder where you ran it, so start Claude Code in that folder. If the `/neohive:` commands are missing, run `/reload-plugins`. For the full setup, see [Claude Code](../get-started/connect/claude-code.md).
{% endstep %}
{% endstepper %}

## Still stuck?

To get help, do the following:

1. Run the following command to collect a diagnostics bundle:

   ```bash
   curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/logs.sh | bash
   ```

2. Send the bundle to `hello@neohive.ai` with a description of what fails.

The bundle holds logs and settings with secrets removed. The bundle never includes your [Memories](../concepts/glossary.md#memory), code, or databases.
