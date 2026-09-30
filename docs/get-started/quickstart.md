---
description: "The shortest path from nothing to a coding agent that answers from your own repository."
---

# Quickstart

One path, no options: NeoHive, one GitHub repository, and Claude Code. For checks after each step and other agents, use [Install NeoHive](install.md).

**You need:** Docker running on Linux, macOS, or WSL2, your NeoHive license file, Claude Code, and a GitHub personal access token with `repo` scope.

{% stepper %}
{% step %}
## Install NeoHive

Run the installer. When it asks, enter the path to your license file.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```
{% endstep %}

{% step %}
## Create a hive with your repository

Open `http://localhost:3577`. Click **I Understand** on the license, then **Get Started** and **Start setup**.

Type a hive name and click **Continue**. Pick **GitHub**, paste your token, click **Fetch repositories**, choose your repository, and click **Continue**. Indexing starts in the background.
{% endstep %}

{% step %}
## Connect Claude Code

Setup now shows **Install for your AI tools** with **Claude** selected. Copy the command it shows and run it in your terminal.

Start Claude Code in your repository. When setup shows **Connected**, click **Open** with your hive's name. Then install the plugin inside Claude Code:

```text
/plugin marketplace add NeoHiveAI/NeoHiveClaude
/plugin install neohive@neohive-claude
/reload-plugins
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
