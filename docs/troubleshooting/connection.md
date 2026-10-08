---
description: Checks to run, in order, when your coding agent cannot reach NeoHive.
---

# Agent can't connect

Your agent reaches NeoHive through the [MCP](../reference/glossary.md#mcp) endpoint of a [Hive](../reference/glossary.md#hive). The endpoint is a web address, such as `http://localhost:3577/hives/<hive-id>/mcp`.

The connection depends on several parts in turn. The NeoHive container must be running, and the server must be healthy. The Hive must answer, and your agent must use the right endpoint. Finally, your agent must load the NeoHive tools. If any one part fails, your agent cannot use NeoHive. The agent shows a connection error, or the NeoHive tools do not appear.

Use the checks on this page to find which part breaks, and then fix that part.

<figure><img src="../.gitbook/assets/troubleshooting-connection.svg" alt="Decision tree with five checks. Is the neohive container running? Does /health say ok? Does list_indexes work in the Playground? Does the agent&#x27;s MCP endpoint match Install Instructions? Does the agent see the NeoHive tools? Each no leads to its fix. Five yes answers mean the agent is connected."><figcaption></figcaption></figure>

Run the checks in order. Stop at the first check that fails, and apply its fix.

{% stepper %}
{% step %}
## Is the container running?

```bash
docker ps --filter name=neohive
```

The `neohive` container shows a status of `Up`. If the container is missing, start it and read the log to see why it stopped:

```bash
docker start neohive
docker logs neohive --tail 50
```

The message `No such container` means the container no longer exists. Run the [installer](../get-started/install.md) again. Your data stays in the `neohive-data` volume. If the start fails with `port is already allocated`, another program is using port `3577`. Stop that program, or install on another port with `NEOHIVE_PORT=4577`. If you change the port, also change the port in your agent's MCP endpoint.
{% endstep %}

{% step %}
## Does NeoHive say it is healthy?

```bash
curl http://localhost:3577/health
```

| Reply contains        | Meaning                                                                | Fix                                                                       |
| --------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `"status":"ok"`       | NeoHive is ready.                                                      | Go to the next check.                                                     |
| `"status":"error"`    | NeoHive could not finish starting, or its embedding engine cannot run. | Look up the `error` text in [Common errors](common-errors.md).            |
| `"status":"degraded"` | At least one Hive failed its check.                                    | On the dashboard home page, open that Hive's menu and select **Restart**. |
{% endstep %}

{% step %}
## Does the Hive answer without your agent?

To test the Hive from the dashboard, do the following:

1. Open **Playground** in the dashboard.
2. Under **Hive**, select your Hive.
3. Set **Tool** to `list_indexes`.
4. Select **Run**.

If you see a list of [Indexes](../reference/glossary.md#index), the Hive works. The problem is then between the Hive and your agent. If you see an error, the Hive itself is broken. Select **Restart** on the Hive, and then run the check again.
{% endstep %}

{% step %}
## Is the MCP endpoint right?

Each Hive has its own endpoint, `http://localhost:3577/hives/<hive-id>/mcp`. To check the endpoint, do the following:

1. Open the Hive in the dashboard.
2. Copy the endpoint from **Install Instructions**.
3. Compare the endpoint with your agent's MCP configuration, character by character.

A wrong Hive id returns `Unknown Hive: <id>`. A wrong port or host returns a connection error. After your agent reaches the Hive, **Install Instructions** shows a `CONNECTED` count.
{% endstep %}

{% step %}
## Does your agent see the tools?

Ask your agent: `List my NeoHive indexes.` Your agent calls `list_indexes` and answers. If the agent does not have the `list_indexes` tool, the agent has not loaded the NeoHive MCP server. Restart the agent after any configuration change. In Claude Code, if the `/neohive:` commands are missing, run `/reload-plugins`.
{% endstep %}
{% endstepper %}

## Still stuck?

To get help, do the following:

1.  Run the following command to collect a diagnostics bundle:

    ```bash
    curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/logs.sh | bash
    ```
2. Send the bundle to `hello@neohive.ai` with a description of what fails.

The bundle holds logs and settings with secrets removed. The bundle never includes your [Memories](../reference/glossary.md#memory), code, or databases.

## Next step

If your agent connects but recall misses what you expect, see [Recall isn't finding what I need](recall.md).
