# Agent Can't Connect

If your coding agent can't reach NeoHive, work through these checks in order.

## Is NeoHive running?

Check that the container is up:

```sh
docker ps | grep neohive
```

If it's not listed, start it:

```sh
docker start neohive
```

If it won't start, check the logs:

```sh
docker logs neohive --tail 50
```

## Is the health endpoint responding?

```sh
curl http://localhost:3577/health
```

You should see `{"status":"ok"}`. If not, NeoHive isn't ready yet. Check the container logs.

## Is port 3577 available?

If another service is using port 3577, NeoHive can't bind to it. Either stop the conflicting service or change NeoHive's port:

```sh
NEOHIVE_PORT=4577 bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

Then update your agent's MCP configuration to use the new port.

## Is the MCP URL correct?

Each project has its own MCP endpoint. The URL looks like:

```
http://localhost:3577/hiveminds/<project-id>/mcp
```

You can find the correct URL in the NeoHive dashboard under your project's **Connect** section. Make sure the URL in your agent's MCP configuration matches exactly.

## Plugin not finding slash commands?

If you installed the NeoHive plugin but slash commands like `/neohive:getting-started` aren't available, reload your plugins:

```
/reload-plugins
```

Then try the command again.

## Still stuck?

Contact the NeoHive team at `support@neohive.ai` with the output of `docker logs neohive --tail 100`.
