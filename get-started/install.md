---
description: "Install NeoHive, create your first hive, and connect your agent. Each step ends with a check you can run."
---

# Install NeoHive

Three steps, each ending with a check, take you from nothing to an agent that answers from your own code.

**You need:** Docker installed and running on Linux, macOS, or WSL2, port `3577` free, and the license file the NeoHive team sent you.

{% stepper %}
{% step %}
## Install

Run the installer. It asks for the path to your license file, then starts NeoHive in a Docker container named `neohive`.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

It ends by printing two dashboard addresses, `On this machine` and `From another host`. Use the second on a shared server.

<details>

<summary>Optional: skip the prompt, or use another port</summary>

Pass the license file up front:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh) \
  --license-file /path/to/license.key
```

`NEOHIVE_LICENSE_FILE=/path/to/license.key` does the same, and so does a `license.key` or `license.json` in the current folder.

If port `3577` is taken, set `NEOHIVE_PORT=3600` (or any free port) before the command, and use that port wherever these docs say `3577`.

</details>

{% hint style="success" %}
**Check:** NeoHive is running.

```bash
curl http://localhost:3577/health
```

The reply contains `"status":"ok"`. If not, read `docker logs neohive --tail 50` and see [Common errors](../troubleshooting/common-errors.md).
{% endhint %}
{% endstep %}

{% step %}
## Create your hive

Open the dashboard. Click **I Understand** on the license, then **Get Started** and **Start setup**. Name the hive and click **Continue**.

Under **Where does your data live?**, pick the first source for the hive:

| Source | Content you can pick | What you need |
|---|---|---|
| **GitHub** | **Code** or **Documentation** from a repository | A personal access token with `repo` scope |
| **GitLab** | **Code** or **Documentation** from a repository | A token with `read_api` and `read_repository` scope |
| **File Upload** | `.md`, `.txt`, and `.pdf` files | The files |

Every hive also gets a **Knowledge** index for what your agent learns. Add more indexes later from the hive page; [What to add, and where](../context/what-to-add.md) helps you choose.

{% hint style="success" %}
**Check:** the index is ready.

Open the index from the hive page. For a repository, its **Sync history** shows the first sync as finished. If the sync failed, see [Repository sync issues](../troubleshooting/sync.md).
{% endhint %}
{% endstep %}

{% step %}
## Connect your agent

Setup ends with **Install for your AI tools**; the hive page's **Install Instructions** panel shows the same commands later. For Claude Code, run the first command in your terminal and the rest inside Claude Code:

```bash
claude mcp add <name> '<hive-url>' \
  --scope user \
  --transport http \
  --header 'x-mcp-client: claude-code'
```

```text
/plugin marketplace add NeoHiveAI/NeoHiveClaude
/plugin install neohive@neohive-claude
/reload-plugins
/neohive:getting-started
```

Other agents: [Cursor](connect/cursor.md), [Codex](connect/codex.md), [Claude Desktop and other MCP apps](connect/desktop-apps.md).

{% hint style="success" %}
**Check:** your agent answers from your content.

Ask it something only your content can answer, such as `How does the authentication middleware work?`

It calls `memory_recall` and cites real paths from your repository or files. If the tool is missing, see [Agent can't connect](../troubleshooting/connection.md). If the answer is vague, see [Recall isn't finding what I need](../troubleshooting/recall.md).
{% endhint %}
{% endstep %}
{% endstepper %}

## Next step

[Your first session](first-session.md)
