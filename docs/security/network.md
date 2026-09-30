---
description: "What protects a NeoHive instance on the network, and what to put in front of it before anyone outside a trusted network can reach it."
---

# Exposing NeoHive beyond your network

You learn who can reach your instance, and what each level of access needs.

<figure><img src="../.gitbook/assets/security-network.svg" alt="Agents outside send HTTPS with a credential to a reverse proxy or VPN. The proxy checks the credential and forwards plain HTTP to NeoHive on port 3577 inside the trusted network. A direct path to port 3577 is crossed out."><figcaption></figcaption></figure>

**NeoHive has no user accounts and checks no credentials.** Anyone who can reach port `3577` can read and write every Hive on the instance. Your network is the access control.

| Who needs to reach it | What to set up |
|---|---|
| Only you, on this machine | The default install. Block port `3577` from other machines if the host is on a shared network |
| Your team, on a trusted network or VPN | Run NeoHive on a host they can route to. See [Access and sharing](../admin/access.md) |
| Anyone outside a trusted network | An authenticating reverse proxy that also provides HTTPS. Never open port `3577` directly |

## The default install is reachable from your network

The installer publishes port `3577` on every network interface of the host, not only on `localhost`. Any machine that can route to the host can open the dashboard and MCP endpoints. On an office network, a shared server or a cloud VM, block the port at your network firewall or cloud security group.

{% hint style="warning" %}
On Linux, Docker writes its own firewall rules for published ports, so a `ufw` rule on the host does not block port `3577`. Block it at the network edge instead.
{% endhint %}

## Put a proxy in front

NeoHive serves plain HTTP. For outside access, put a reverse proxy or VPN gateway in front of it, such as Cloudflare Access or your company VPN. It checks a credential before any request reaches NeoHive, and provides the HTTPS certificate. Point your agents at the `https://` address the proxy exposes, for example `https://neohive.example.com/hives/<hive-id>/mcp`.

## What NeoHive checks today

NeoHive checks no token, password or header on any request. The `NEOHIVE_TOKEN` variable is read only by the Claude Code plugin's hooks, which send it on to your proxy. Only the proxy checks the credential.

## Pass the proxy's credential from each agent

Every MCP connection and the Claude Code hooks must send the header your proxy expects. The examples use a bearer token in `NEOHIVE_TOKEN`.

{% tabs %}
{% tab title="Claude Code" %}
```bash
export NEOHIVE_TOKEN="<your-token>"
claude mcp add neohive 'https://neohive.example.com/hives/<hive-id>/mcp' \
  --scope user \
  --transport http \
  --header "Authorization: Bearer $NEOHIVE_TOKEN" \
  --header 'x-mcp-client: claude-code'
```

Keep `NEOHIVE_TOKEN` exported where Claude Code runs. The hooks send it as `Authorization: Bearer $NEOHIVE_TOKEN`, and they find the endpoint only from an MCP server whose name contains `neohive`, in the project's `.mcp.json` or the user-level servers of `~/.claude.json`.
{% endtab %}

{% tab title="Cursor" %}
In `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "neohive": {
      "url": "https://neohive.example.com/hives/<hive-id>/mcp",
      "headers": {
        "Authorization": "Bearer <your-token>",
        "x-mcp-client": "cursor"
      }
    }
  }
}
```
{% endtab %}

{% tab title="Codex" %}
In `~/.codex/config.toml`:

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
The hooks send only the `Authorization` header. If your proxy needs other headers, such as Cloudflare Access service-token headers, your agent's own tool calls still work, but the automatic recall on each prompt does not get through.
{% endhint %}

## Next step

If an agent cannot reach the instance after this change, see [Agent can't connect](../troubleshooting/connection.md).
