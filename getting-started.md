# Getting Started

This guide walks you through installing NeoHive, connecting your coding agent, and seeing it in action.

## Requirements

- **Docker 20+**: [Docker Desktop](https://www.docker.com/products/docker-desktop/) on macOS/Windows, or [Docker Engine](https://docs.docker.com/engine/install/) on Linux
- **Port 3577** available on localhost
- **Linux, macOS, or WSL2** (Windows Subsystem for Linux)
- A **NeoHive license file** provided by the NeoHive team

## Install NeoHive

Open a terminal and run:

```sh
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

The installer will:

1. Detect your hardware (NVIDIA, AMD, Intel GPU, or CPU fallback)
2. Pull the appropriate container image from Docker Hub
3. Start NeoHive on `http://localhost:3577`

### License file

The installer needs a license file. You can provide it in any of these ways:

- **Drop it in the current directory**: place `license.json` or `license.key` where you're running the command, and the installer finds it
- **Pass it explicitly**: `bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh) --license-file /path/to/license.key`
- **Set an environment variable**: `NEOHIVE_LICENSE_FILE=/path/to/license.key`

The license key is cached after first install, so upgrades won't ask for it again.

### Verify

Once the installer finishes, open `http://localhost:3577` in your browser. You should see the NeoHive dashboard.

## Connect your agent

NeoHive ships a plugin for each supported agent. The plugin configures the MCP connection, adds rules that teach your agent when to pull context from NeoHive, and includes hooks that capture learnings at the end of each session.

{% tabs %}
{% tab title="Claude Code" %}
Open Claude Code in any project and run:

```
/plugin marketplace add NeoHiveAi/NeoHiveClaude
```

Then install the plugin:

```
/plugin install neohive@neohive-claude
```

Reload plugins so the new slash commands are available:

```
/reload-plugins
```

Finally, run the setup wizard:

```
/neohive:getting-started
```

The wizard verifies the MCP connection, walks you through creating a project, and optionally migrates any existing `CLAUDE.md` context into NeoHive.
{% endtab %}

{% tab title="Cursor" %}
Install the NeoHive plugin from the [NeoHiveAi/NeoHiveCursor](https://github.com/NeoHiveAi/NeoHiveCursor) repository. Follow the README for Cursor-specific setup steps, then run the getting-started skill from within Cursor.
{% endtab %}

{% tab title="Codex" %}
Install the NeoHive plugin from the [NeoHiveAi/NeoHiveCodex](https://github.com/NeoHiveAi/NeoHiveCodex) repository. Follow the README for Codex-specific setup steps, then run the getting-started skill from within Codex.
{% endtab %}

{% tab title="Other agents" %}
NeoHive works with any coding agent that supports MCP, including Copilot, Windsurf, and ChatGPT. Each project's MCP endpoint URL is shown in the dashboard under the **Connect** section. Point your agent's MCP configuration at that URL to get started.
{% endtab %}
{% endtabs %}

## See it in action

Once your agent is connected, the fastest way to see NeoHive working is to index a repository:

1. Open the NeoHive dashboard at `http://localhost:3577`
2. Navigate to your project and create a **repo hive**
3. Enter your repository URL and credentials
4. Wait for the initial sync to complete (you'll see progress in the dashboard)

Now open a session with your agent and try:

> "How does the authentication middleware work in this project?"

> "Where do we handle payment retries?"

Your agent pulls the relevant code from NeoHive instead of guessing or asking you to paste files. It's working with your actual codebase now.

You can also teach your agent things explicitly:

> "Remember that we always use snake_case for database column names in this project."

This gets stored in NeoHive and will come back in future sessions when it's relevant, across all your agents, not just the one you told.

## Next steps

- [Core Concepts](concepts.md): understand projects, hives, and how knowledge is organized
- [Using NeoHive](usage.md): day-to-day workflow with your agent
- [Indexing Your Codebase](codebase.md): details on connecting repositories
