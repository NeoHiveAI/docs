---
description: "Step-by-step checks when your coding agent can't reach NeoHive."
---

# Agent Can't Connect

If your coding agent can't reach NeoHive, work through these checks in order.

1. **Is NeoHive running?**

   ```sh
   docker ps | grep neohive
   ```

   If it's not listed, start it. If it won't start, check the logs:

   ```sh
   docker start neohive
   docker logs neohive --tail 50
   ```

2. **Is the health endpoint responding?**

   ```sh
   curl http://localhost:3577/health
   ```

   You should see `{"status":"ok"}`. If not, NeoHive isn't ready yet. Check the container logs.

3. **Is port 3577 free?**

   If another service holds port 3577, NeoHive can't bind to it. Stop the conflicting service, or move NeoHive to another port:

   ```sh
   NEOHIVE_PORT=4577 bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
   ```

   Then update your agent's MCP configuration to use the new port.

4. **Is the MCP URL correct?**

   Each project has its own endpoint, like `http://localhost:3577/hiveminds/<project-id>/mcp`. Find the exact URL in the dashboard under your project's **Connect** section, and make sure your agent's MCP config matches it exactly.

5. **Plugin slash commands missing?**

   If `/neohive:*` commands aren't available after installing the plugin, reload plugins and try again:

   ```
   /reload-plugins
   ```

{% hint style="info" %}
The first request after a project has been idle can take a moment. NeoHive auto-suspends idle projects to free memory and wakes them on demand. That's expected, not a failure.
{% endhint %}

## Still stuck?

Contact the NeoHive team at `support@neohive.ai` with the output of `docker logs neohive --tail 100`.
