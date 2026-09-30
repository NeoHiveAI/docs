---
description: "The shortest path from nothing to a coding agent that answers from your own repository."
---

# Quickstart

One path, no options: NeoHive, one GitHub repository, and Claude Code. For checks after each step and other agents, use [Install NeoHive](install.md).

**You need:**

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
{% endstep %}

{% step %}
## Create a Hive with your repository

Open `http://localhost:3577`. Click **I Understand** on the license, then **Get Started** and **Start setup**.

1. Under **Hive name**, type a name and click **Continue**.
2. Under **Where does your data live?**, pick **GitHub** and keep **Code** selected.
3. Paste your token and click **Fetch repositories**.
4. Choose your repository and click **Continue**.

Indexing starts in the background.
{% endstep %}

{% step %}
## Connect Claude Code

Setup now shows **Install for your AI tools** with **Claude** selected.

1. Copy the command it shows and add `--scope user` directly after the quoted Hive URL. Run it in your terminal. Without `--scope user`, the plugin's automatic recall cannot find the Hive.
2. Start Claude Code in your repository.
3. When setup shows **Connected**, click **Open** followed by your Hive's name.
4. Inside Claude Code, install the plugin and run its setup:

```text
/plugin marketplace add NeoHiveAI/NeoHiveClaude
/plugin install neohive@neohive-claude
/reload-plugins
/neohive:getting-started
```
{% endstep %}

{% step %}
## Ask about your code

When indexing finishes, ask something only your code can answer:

```text
How does the authentication middleware work?
```

Claude Code calls `memory_recall` and answers with real paths from your repository.
{% endstep %}
{% endstepper %}

## Next step

[Your first session](first-session.md)
