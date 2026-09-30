---
description: "Connect Claude Desktop, any other MCP app, or an agent with no NeoHive plugin to a hive."
---

# Claude Desktop and other MCP apps

Point any MCP app at the hive's MCP endpoint. Apps that only run local commands reach it through `mcp-remote`, a small Node.js program that forwards to the endpoint.

| The app connects by | Examples | What you add |
|---|---|---|
| URL | Cursor, Codex, Windsurf | The endpoint, plus an `x-mcp-client` header if the app takes headers |
| Local command only | Claude Desktop | An `npx mcp-remote` command that forwards to the endpoint. Needs Node.js. |
| The provider's own servers | ChatGPT connectors | A public HTTPS address. `localhost` cannot be reached from there. |

{% tabs %}
{% tab title="Claude Desktop" %}
Open the hive in the dashboard, go to **Install Instructions**, and pick **Claude Desktop**. In Claude Desktop, open **Settings**, then **Developer**, then **Edit Config**, and paste the JSON into `claude_desktop_config.json`:

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

The file is `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS and `%APPDATA%\Claude\claude_desktop_config.json` on Windows. If it already has an `mcpServers` block, add the entry inside it. Quit Claude Desktop fully and open it again.

`--allow-http` lets `mcp-remote` use a plain `http://` address. The dashboard leaves it out when you opened it over `https://`.
{% endtab %}

{% tab title="Other MCP apps" %}
**If the app takes a URL**, add the endpoint as a remote or HTTP MCP server in its settings. Add the header `x-mcp-client: <app-name>` if it lets you set headers.

**If the app only runs local commands**, register a server whose command is `npx` with these arguments. The JSON shape in the Claude Desktop tab works in most apps:

```bash
npx -y mcp-remote@latest \
  http://localhost:3577/hives/<hive-id>/mcp \
  --header 'x-mcp-client: <app-name>' \
  --allow-http
```

Drop `--allow-http` when the address starts with `https://`.

**If the app runs on the provider's servers**, put NeoHive behind a public HTTPS address first. See [Exposing NeoHive beyond your network](../../security/network.md).
{% endtab %}

{% tab title="Agents with no plugin" %}
Connect the agent with the **Other MCP apps** steps, then adapt one of our plugins. Clone the closest match ([NeoHiveClaude](https://github.com/NeoHiveAI/NeoHiveClaude), [NeoHiveCursor](https://github.com/NeoHiveAI/NeoHiveCursor), or [NeoHiveCodex](https://github.com/NeoHiveAI/NeoHiveCodex)), open it in your agent, and paste:

```text
Adapt the NeoHive plugin in this repository for my agent (<name your agent>).

NeoHive is a local memory server that agents reach over MCP. The adapted plugin should:

1. Register NeoHive's MCP endpoint (http://localhost:3577/hives/<hive-id>/mcp, from the hive's Install Instructions panel in the NeoHive dashboard). If the agent cannot use an HTTP endpoint, wrap it with the mcp-remote npm package.
2. Add rules telling the agent to call memory_context and memory_recall before exploring the codebase, and memory_store to save conventions, decisions, and lessons.
3. Use whatever session hooks the agent supports to load context at the start of a session and save learnings at the end.

Keep the behaviour as close to the original plugin as the agent allows, and list anything it cannot support.
```

Want a plugin for your agent? Tell us at `hello@neohive.ai`.
{% endtab %}
{% endtabs %}

{% hint style="success" %}
**Check:** the app can reach the hive.

Ask the app: `List my NeoHive indexes.` It calls `list_indexes` and lists the hive's indexes.

If the tool is missing, read the app's MCP log. Claude Desktop writes `mcp*.log` files to `~/Library/Logs/Claude/` on macOS and `%APPDATA%\Claude\logs\` on Windows. Then see [Agent can't connect](../../troubleshooting/connection.md).
{% endhint %}

## Next step

[Your first session](../first-session.md)
