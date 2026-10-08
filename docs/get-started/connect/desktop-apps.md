---
description: >-
  Connect Claude Desktop, any other MCP app, or an agent with no NeoHive plugin
  to a Hive.
---

# Claude Desktop and other MCP apps

To connect any [MCP](../../reference/glossary.md#mcp) app, give the app the MCP endpoint of your [Hive](../../reference/glossary.md#hive), your team's NeoHive workspace. Apps that only run local commands reach the endpoint through `mcp-remote`, a small Node.js program that forwards requests to the endpoint.

| The app connects by        | Examples                    | What you add                                                                          |
| -------------------------- | --------------------------- | ------------------------------------------------------------------------------------- |
| URL                        | Cursor, Codex, and Windsurf | The endpoint, plus an `x-mcp-client` header if the app takes headers                  |
| Local command only         | Claude Desktop              | An `npx mcp-remote` command that forwards to the endpoint. The command needs Node.js. |
| The provider's own servers | ChatGPT connectors          | A public HTTPS address. The provider's servers cannot reach `localhost`.              |

{% tabs %}
{% tab title="Claude Desktop" %}
To add the Hive to Claude Desktop, do the following:

1. Open the Hive in the dashboard, and go to **Install Instructions**.
2. Select **Claude Desktop**.
3. In Claude Desktop, open **Settings**, then **Developer**, then **Edit Config**.
4. Paste the JSON into `claude_desktop_config.json`.

The JSON looks like this:

```json
{
  "mcpServers": {
    "<name>": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote@latest",
        "http://localhost:3577/hives/<hive-id>/mcp",
        "--header",
        "x-mcp-client: claude-desktop",
        "--allow-http"
      ]
    }
  }
}
```

The file is `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS and `%APPDATA%\Claude\claude_desktop_config.json` on Windows. If the file already has an `mcpServers` block, add the entry inside that block.

To load the new server, do the following:

1. Quit Claude Desktop completely.
2. Open Claude Desktop again.

`--allow-http` lets `mcp-remote` use a plain `http://` address. If you opened the dashboard over `https://`, the dashboard leaves `--allow-http` out.
{% endtab %}

{% tab title="Other MCP apps" %}
**If the app takes a URL**, add the endpoint as a remote or HTTP MCP server in the app's settings. If the app lets you set headers, add the header `x-mcp-client: <app-name>`.

**If the app only runs local commands**, register a server whose command is `npx` with the following arguments. The JSON format in the Claude Desktop tab works in most apps:

```bash
npx -y mcp-remote@latest \
  http://localhost:3577/hives/<hive-id>/mcp \
  --header 'x-mcp-client: <app-name>' \
  --allow-http
```

If the address starts with `https://`, remove `--allow-http`.

**If the app runs on the provider's servers**, put NeoHive behind a public HTTPS address first. See [Exposing NeoHive beyond your network](../../security-and-privacy/network.md).
{% endtab %}

{% tab title="Agents with no plugin" %}
To use NeoHive with an agent that has no plugin, you connect the agent and then adapt one of the NeoHive plugins. Do the following:

1. Connect the agent with the steps in the **Other MCP apps** tab.
2. Clone the plugin closest to your agent: [NeoHiveClaude](https://github.com/NeoHiveAI/NeoHiveClaude), [NeoHiveCursor](https://github.com/NeoHiveAI/NeoHiveCursor), or [NeoHiveCodex](https://github.com/NeoHiveAI/NeoHiveCodex).
3. Open the plugin in your agent.
4. Paste the following prompt:

```
Adapt the NeoHive plugin in this repository for my agent (<name your agent>).

NeoHive is a self-hosted memory that agents reach over MCP. The adapted plugin should:

1. Register NeoHive's MCP endpoint (http://localhost:3577/hives/<hive-id>/mcp, from the Hive's Install Instructions panel in the NeoHive dashboard). If the agent cannot use an HTTP endpoint, wrap it with the mcp-remote npm package.
2. Add rules telling the agent to call memory_context and memory_recall before exploring the codebase, and memory_store to save conventions, decisions, and lessons.
3. Use whatever session hooks the agent supports to load context at the start of a session and save learnings at the end.

Keep the behaviour as close to the original plugin as the agent allows, and list anything it cannot support.
```

To ask for a plugin for your agent, email `hello@neohive.ai`.
{% endtab %}
{% endtabs %}

{% hint style="success" %}
**Check:** the app can reach the Hive.

Ask the app: `List my NeoHive Indexes.` The app calls `list_indexes` and lists the [Indexes](../../reference/glossary.md#index), or content stores, in the Hive.

If the `list_indexes` tool is missing, read the app's MCP log. Claude Desktop writes `mcp*.log` files to `~/Library/Logs/Claude/` on macOS and `%APPDATA%\Claude\logs\` on Windows. Then see [Agent can't connect](../../troubleshooting/connection.md).
{% endhint %}

## Next step

[Your first session](../first-session.md)
