---
description: "Install NeoHive, connect your coding agent, and see it working with your codebase."
---

# Getting Started

<figure><img src="https://github.com/NeoHiveAI/docs/releases/download/docs-media/getting-started.webp" alt="Installing NeoHive"><figcaption></figcaption></figure>

## Requirements

- **Docker 20+**: [Docker Desktop](https://www.docker.com/products/docker-desktop/) on macOS/Windows, or [Docker Engine](https://docs.docker.com/engine/install/) on Linux
- **Port 3577** available on localhost
- **Linux, macOS, or WSL2** (Windows Subsystem for Linux)
- A **NeoHive license file**, provided by the NeoHive team

## Install NeoHive

1. Open a terminal and run the installer:

   ```bash
   bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
   ```

   This pulls down the public install script and prompts for your license key — the key sent to you by the NeoHive team.

   {% hint style="info" %}
   You can supply the license and run the install in one command, either as a flag or an environment variable:

   ```bash
   # Environment variable
   NEOHIVE_LICENSE_FILE=/path/to/license.key \
     bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)

   # Flag
   bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh) --license-file /path/to/license.key
   ```
   {% endhint %}

2. Open the dashboard in your browser.

   NeoHive runs on `localhost:3577`. Open `http://localhost:3577`. If it's running on another machine, use that machine's address instead. See [Access & sharing](config/access.md) for running a shared instance for your team.

3. Create your first project.

   From the dashboard, follow the onboarding flow to create a project and start indexing.

   {% hint style="info" %}
   Once you create your first hive, NeoHive begins processing its contents in the background. You can carry on with the steps below while it works — what comes next depends on which agent you use.
   {% endhint %}

## Connect your agent

{% hint style="success" %}
**Get more out of NeoHive**

However you connect, NeoHive helps most when your agent reaches for it on its own. The plugins set this up for you — but you can also add a short instruction to your agent's rules (`CLAUDE.md`, `AGENTS.md`, or its system prompt) so it stores and recalls knowledge without being asked:

> Use NeoHive to store decisions, conventions, and context worth keeping — any time it makes sense to remember something for later. If more than one hive is connected and you're unsure where a note belongs, check before storing. Retrieve the same way: pull relevant context back from NeoHive before starting work or answering questions in those areas.

Tailor it to what your team cares about — point it at the kinds of decisions and context you most want to keep.
{% endhint %}

{% tabs %}
{% tab title="Claude Code" %}
<figure><img src="https://github.com/NeoHiveAI/docs/releases/download/docs-media/claude-plugin-install.webp" alt="Installing the Claude Code plugin"><figcaption></figcaption></figure>

Open Claude Code in any project:

```bash
cd path/to/project && claude
```

Then install the NeoHive plugin from within Claude Code:

```
/plugin marketplace add NeoHiveAI/NeoHiveClaude
/plugin install neohive@neohive-claude
/reload-plugins
/neohive:getting-started
```

The final command, `/neohive:getting-started`, launches an interactive wizard: it verifies the MCP connection, walks you through creating a project, and optionally migrates any existing `CLAUDE.md` context into NeoHive.
{% endtab %}

{% tab title="Claude App" %}
<figure><img src="https://github.com/NeoHiveAI/docs/releases/download/docs-media/claude-desktop-plugin-install.webp" alt="Installing the Claude App plugin"><figcaption></figcaption></figure>

Like Cursor, the desktop app keeps the plugin and the MCP connection separate — you set up both. Installing the plugin gives you NeoHive's skills (including the `getting-started` wizard); the MCP connection is what puts `memory_recall`, `memory_store`, and the rest within reach of your conversations.

1. **Install the plugin.** In the desktop app, open **Customize → Plugins**. In the popup, click **Add → Marketplace** (top right), enter `NeoHiveAI/NeoHiveClaude` as the marketplace, then click the **+** to install the plugin.

2. **Connect NeoHive's MCP server.** In the NeoHive dashboard, open your project's **Connect** section and copy its MCP endpoint URL. It looks like `http://localhost:3577/hiveminds/<project-id>/mcp`. The Claude desktop app connects to MCP servers through a local command rather than a URL, so wrap the endpoint with [`mcp-remote`](https://www.npmjs.com/package/mcp-remote). It runs as that command and gives the app a streaming HTTP connection to NeoHive:

   ```json
   {
     "mcpServers": {
       "neohive": {
         "command": "npx",
         "args": ["-y", "mcp-remote", "http://localhost:3577/hiveminds/<project-id>/mcp"]
       }
     }
   }
   ```

3. **Restart Claude App**, then run `/neohive:getting-started` to verify the connection and finish setting up your project.
{% endtab %}

{% tab title="Codex" %}
<figure><img src="https://github.com/NeoHiveAI/docs/releases/download/docs-media/codex-plugin-install.webp" alt="Installing the Codex plugin"><figcaption></figcaption></figure>

Add the NeoHive plugin marketplace and install the plugin:

```bash
codex plugin marketplace add NeoHiveAI/NeoHiveCodex
codex plugin add neohive@neohive-codex
```

Then run the `neohive:getting-started` skill from within Codex to verify the MCP connection and set up your project.
{% endtab %}

{% tab title="Cursor" %}
NeoHive isn't on the public Cursor marketplace, so you install it straight from the repo. Cursor keeps the plugin (skills + rules) and the MCP connection separate — you set up both.

1. **Install the plugin.** Clone the [NeoHiveCursor](https://github.com/NeoHiveAI/NeoHiveCursor) repo and link it into Cursor's local plugins folder, then restart Cursor:

   ```bash
   git clone https://github.com/NeoHiveAI/NeoHiveCursor
   ln -s "$(pwd)/NeoHiveCursor" ~/.cursor/plugins/local/neohive
   ```

   Managing a team? A Cursor workspace admin can instead import the repo as a team marketplace — **Dashboard → Plugins → Add Marketplace → Import from Repo** — so everyone installs it from **Customize**.

2. **Connect NeoHive's MCP server.** Open **Cursor Settings → Tools & MCP Servers** and add your endpoint — copy it from the NeoHive dashboard's **Connect** section. The plugin doesn't bundle a server.

3. **Run the `getting-started` skill** to verify the connection, set up auth, generate a project topology rule, and migrate any existing memory.
{% endtab %}

{% tab title="Other agents" %}
NeoHive works with any coding agent that speaks MCP — including Copilot, Windsurf, and ChatGPT. Copy your project's MCP endpoint URL from the dashboard's **Connect** section and point your agent's MCP configuration at it.

We're always adding first-class plugins for new agents — tell us which you'd like to see at `support@neohive.ai`. In the meantime you can bootstrap your own: clone any of our plugin repositories (such as [NeoHiveClaude](https://github.com/NeoHiveAI/NeoHiveClaude)) and hand your agent the prompt below to adapt it to your harness.

```text
Take the NeoHive reference plugin in this repository and adapt it into a plugin/configuration for my agent (<name your agent / harness>).

NeoHive is a local semantic-memory server exposed over the Model Context Protocol (MCP). The adapted plugin should:

1. Register NeoHive's MCP endpoint (http://localhost:3577/hiveminds/<project-id>/mcp; find yours in the dashboard's Connect section). If the agent can't connect to the HTTP endpoint directly, wrap it with the `mcp-remote` npm package.
2. Add rules/instructions telling the agent to call NeoHive's `memory_recall` and `memory_context` tools before exploring the codebase, and `memory_store` to capture new conventions, decisions, and insights.
3. Wire up whatever session hooks the agent supports to load context at the start of a session and capture learnings at the end.

Keep the behaviour of the reference plugin as close as the harness allows, and call out anything it can't support.
```
{% endtab %}
{% endtabs %}

## See it in action

Watch the full walkthrough — from installing NeoHive to giving your agents a shared team memory:

{% embed url="https://www.youtube.com/watch?v=2R2oPXgF2YY" %}

Once you've pointed NeoHive at a repository (see [Indexing Your Codebase](codebase.md)), ask your agent about the code:

* How does the authentication middleware work in this project?
* Where do we handle payment retries?

Your agent pulls the relevant code from NeoHive instead of guessing or asking you to paste files — it's working with your actual codebase now.

You can also teach it things directly:

* Remember that we always use snake_case for database column names in this project.

That gets stored in NeoHive and comes back in future sessions whenever it's relevant — across every agent your team connects, not just the one you told.

## Next steps

<table data-view="cards">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th data-hidden data-card-target data-type="content-ref"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Core Concepts</strong></td>
      <td>Understand projects, hives, and how knowledge is organized.</td>
      <td><a href="concepts.md">concepts</a></td>
    </tr>
    <tr>
      <td><strong>Using NeoHive</strong></td>
      <td>Your day-to-day workflow with your agent.</td>
      <td><a href="usage.md">usage</a></td>
    </tr>
    <tr>
      <td><strong>Indexing Your Codebase</strong></td>
      <td>Connect your GitHub or GitLab repositories.</td>
      <td><a href="codebase.md">codebase</a></td>
    </tr>
  </tbody>
</table>
