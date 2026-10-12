---
description: "The shortest path from nothing to a coding agent that answers from your own repository."
---

# Quickstart

This page takes one path with no options: NeoHive, one GitHub repository, and Claude Code. To check each step or to connect a different agent, use [Install NeoHive](install.md).

Before you start, you need the following:

* Docker 20 or later, running on Linux, macOS, or Windows with WSL2.
* A NeoHive license file (`license.key` or `license.json`) from the [NeoHive team](https://www.neohive.ai/download/).
* Claude Code.
* A GitHub personal access token with `repo` scope.

{% stepper %}
{% step %}
## Install NeoHive

Run the installer from the folder that holds your license file.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

When the installer finishes, it prints the dashboard address.
{% endstep %}

{% step %}
## Create a Hive with your repository

A [Hive](../concepts/glossary.md#hive) is a workspace for your team, with one address that agents connect to. To create the Hive, do the following:

1. Open `http://localhost:3577`.
2. To accept the license, select **I Understand**.
3. Select **Get Started**.
4. Select **Start setup**.
5. Under **Hive name**, type a name.
6. Select **Continue**.
7. Under **Where does your data live?**, select **GitHub** and keep **Code** selected.
8. Paste your token.
9. Select **Fetch repositories**.
10. Select your repository.
11. Select **Continue**.

NeoHive adds your repository to the Hive as a [Code Index](../concepts/glossary.md#code-index), a store inside the Hive. NeoHive then starts indexing the repository in the background. Indexing builds a searchable copy of your code.
{% endstep %}

{% step %}
## Connect Claude Code

Setup now shows **Install for your AI tools** with **Claude** selected. To connect Claude Code, do the following:

1. In your terminal, go to your repository's root folder.
2. Run the command that setup shows. The command looks like this:

   ```bash
   claude mcp add <name> '<hive-url>' \
     --scope project \
     --transport http \
     --header 'x-mcp-client: claude-code'
   ```
3. Start Claude Code in your repository.
4. When Claude Code asks, approve the NeoHive server. Setup shows **Connected** only after Claude Code connects, and Claude Code does not connect until you approve the server.
5. When setup shows **Connected**, select **Open** followed by your Hive's name.
6. To install the plugin and run its setup, run the following commands inside Claude Code:

```text
/plugin marketplace add NeoHiveAI/NeoHiveClaude
/plugin install neohive@neohive-claude
/reload-plugins
/neohive:getting-started
```

The setup wizard checks that Claude Code can reach the Hive.
{% endstep %}

{% step %}
## Ask about your code

When indexing finishes, ask Claude Code a question that only your code can answer:

```text
How does the authentication middleware work?
```

Claude Code calls `memory_recall` and answers with real paths from your repository.
{% endstep %}
{% endstepper %}

## Next step

You have installed NeoHive and connected Claude Code, so you can skip **Install NeoHive** and **Connect your agent**. Continue with [Your first session](first-session.md).
