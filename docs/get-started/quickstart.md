---
description: "The shortest path from nothing to a coding agent that answers from your own repository."
---

# Quickstart

This page takes one path with no options: NeoHive, one GitHub repository, and Claude Code. To check each step or to connect a different agent, use [Install NeoHive](install.md).

Before you start, you need the following:

* Docker 20 or later, running on Linux, macOS, or Windows with WSL2.
* Your NeoHive license file (`license.key` or `license.json`).
* Claude Code.
* A GitHub personal access token with `repo` scope.

{% stepper %}
{% step %}
## Install NeoHive

Run the installer from the folder that holds your license file. If the installer cannot find the file, it asks for the path.

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
3. Select **Get Started**, and then select **Start setup**.
4. Under **Hive name**, type a name, and then select **Continue**.
5. Under **Where does your data live?**, select **GitHub** and keep **Code** selected.
6. Paste your token, and then select **Fetch repositories**.
7. Select your repository, and then select **Continue**.

NeoHive adds your repository to the Hive as a Code [Index](../concepts/glossary.md#index), a store inside the Hive. NeoHive then starts indexing the repository in the background. Indexing builds a searchable copy of your code.
{% endstep %}

{% step %}
## Connect Claude Code

Setup now shows **Install for your AI tools** with **Claude** selected. To connect Claude Code, do the following:

1. Copy the command that setup shows.
2. Add `--scope user` directly after the quoted Hive URL. Without `--scope user`, the plugin's automatic recall cannot find the Hive.
3. Run the command in your terminal.
4. Start Claude Code in your repository.
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

[Your first session](first-session.md)
