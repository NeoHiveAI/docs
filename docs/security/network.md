---
description: "What protects NeoHive on the network, and what to add before people outside your network can reach it."
---

# Expose NeoHive beyond your network

NeoHive runs as a server, so your agents and your browser reach it over the network on port `3577`, unless you chose another port with `NEOHIVE_PORT` when you installed. The dashboard and the endpoints your agents connect to all use that one port.

What you set up depends on who else needs NeoHive. A teammate on your office network needs one setup, and an agent on a laptop outside that network needs another.

| Who needs to reach NeoHive | What to set up |
|---|---|
| Only you, on this machine | Use the default install. If the host is on a shared network, block port `3577` from other machines |
| Your team, on a trusted network or VPN | Run NeoHive on a host that their machines can reach. See [Access and sharing](../admin/access.md) |
| Anyone outside a trusted network | Follow [Advanced setup](#advanced-setup). Never open port `3577` directly |

## The default install is reachable from your network

The installer publishes port `3577` on every network interface of the host, not only on `localhost`. Any machine that can route to the host can open the dashboard and the MCP endpoints. On an office network, a shared server, or a cloud virtual machine, block the port at your network firewall or cloud security group.

{% hint style="warning" %}
On Linux, Docker writes its own firewall rules for published ports. As a result, a `ufw` rule on the host doesn't block port `3577`. Block the port at the network edge instead.
{% endhint %}

## Advanced setup

For access from outside your network, put a proxy in front of NeoHive, and have each agent send that proxy a credential.

<figure><img src="../.gitbook/assets/security-network.svg" alt="Agents outside send HTTPS with a credential to a reverse proxy or VPN. The proxy checks the credential and forwards plain HTTP to NeoHive on port 3577 inside the trusted network. A direct path to port 3577 is crossed out."><figcaption></figcaption></figure>

### Put a proxy in front

NeoHive serves plain HTTP. For outside access, put a reverse proxy or VPN gateway in front of NeoHive. A reverse proxy is a server that receives each request and forwards it to NeoHive. Cloudflare Access and a company VPN are two examples of such gateways. The proxy checks a credential before any request reaches NeoHive. The proxy also provides the HTTPS certificate. Point your agents at the `https://` address that the proxy exposes, for example `https://neohive.example.com/hives/<hive-id>/mcp`.

### Where the credential is checked

Your proxy checks the credential, not NeoHive. NeoHive itself never reads the `NEOHIVE_TOKEN` variable. The Claude Code plugin's hooks read `NEOHIVE_TOKEN`, and so does the optional smart prompt rewriting in the Claude Code, Cursor, and Codex plugins. Both send the token on to your proxy. The one secret NeoHive checks is the `X-Webhook-Secret` header, on the [webhook refresh endpoint](../reference/webhooks.md).

### Pass the proxy's credential from each agent

Every MCP connection and the Claude Code hooks must send the header your proxy expects. The following examples use a bearer token stored in `NEOHIVE_TOKEN`.

Set `NEOHIVE_TOKEN` to the token your proxy accepts, because NeoHive doesn't create one. To learn where to set `NEOHIVE_TOKEN`, see [Environment variables](../reference/environment-variables.md#agent-plugin).

{% tabs %}
{% tab title="Claude Code" %}
Run the following commands:

```bash
export NEOHIVE_TOKEN="<your-token>"
claude mcp add neohive 'https://neohive.example.com/hives/<hive-id>/mcp' \
  --scope project \
  --transport http \
  --header 'Authorization: Bearer ${NEOHIVE_TOKEN}' \
  --header 'x-mcp-client: claude-code'
```

The single quotes around the header write `${NEOHIVE_TOKEN}` into `.mcp.json` instead of the token itself. Claude Code fills in the token from your environment when it starts, so you can commit `.mcp.json` without the secret. Keep `NEOHIVE_TOKEN` exported where Claude Code runs. The hooks send it as `Authorization: Bearer $NEOHIVE_TOKEN`. The command uses `--scope project` so that the hooks can find the server. For how the hooks find it, see [What the plugin does automatically](../results/plugin-automation.md#when-the-prompt-recall-adds-nothing).
{% endtab %}

{% tab title="Cursor" %}
Add the following entry to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "neohive": {
      "url": "https://neohive.example.com/hives/<hive-id>/mcp",
      "headers": {
        "Authorization": "Bearer ${env:NEOHIVE_TOKEN}",
        "x-mcp-client": "cursor"
      }
    }
  }
}
```

Cursor fills in `${env:NEOHIVE_TOKEN}` from your environment when it loads the file, so `.cursor/mcp.json` holds no secret.
{% endtab %}

{% tab title="Codex" %}
Add the following entry to `~/.codex/config.toml`:

```toml
[mcp_servers.neohive]
url = "https://neohive.example.com/hives/<hive-id>/mcp"
bearer_token_env_var = "NEOHIVE_TOKEN"
http_headers = { "x-mcp-client" = "codex" }
```
{% endtab %}

{% tab title="Claude Desktop" %}
Desktop apps reach NeoHive through the `mcp-remote` bridge. Add each header with `--header`:

```json
{
  "mcpServers": {
    "neohive": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote@latest",
        "https://neohive.example.com/hives/<hive-id>/mcp",
        "--header",
        "Authorization: Bearer <your-token>",
        "--header",
        "x-mcp-client: claude-desktop"
      ]
    }
  }
}
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
The hooks send `NEOHIVE_TOKEN` in the `Authorization` header as their only credential. They don't send the other headers in your MCP configuration. Your proxy might need other headers, such as Cloudflare Access service-token headers. In that case, your agent's own tool calls still work. The automatic recall on each prompt doesn't reach NeoHive.
{% endhint %}
