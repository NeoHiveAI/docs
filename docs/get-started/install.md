---
description: "Install NeoHive, create your first Hive, and connect your agent. Each step ends with a check you can run."
---

# Install NeoHive

Three steps, each ending with a check, take you from nothing to an agent that answers from your own code.

<figure><img src="../.gitbook/assets/get-started-install.svg" alt="The install flow: run the installer in your terminal, which starts NeoHive on localhost port 3577. Then the dashboard setup has three steps: Name Hive, Configure first Index from GitHub, GitLab or File Upload, and Install for your AI tools until setup shows Connected."><figcaption></figcaption></figure>

**You need:**

* Docker 20 or later, installed and running on Linux, macOS, or Windows with WSL2.
* Port `3577` free on the machine.
* The license file the NeoHive team sent you (`license.key` or `license.json`).

{% stepper %}
{% step %}
## Install

Run the installer from the folder that holds your license file. It reads the license, then starts NeoHive in a Docker container named `neohive`. If it cannot find the license file, it asks for the path.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

It ends by printing two dashboard addresses, `On this machine` and `From another host`. Use the second on a shared server.

<details>

<summary>Optional: point to the license file, use another port, or force the CPU backend</summary>

Pass the license file path up front:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh) \
  --license-file /path/to/license.key
```

Setting `NEOHIVE_LICENSE_FILE=/path/to/license.key` before the command does the same.

If port `3577` is taken, set `NEOHIVE_PORT=3600` (or any free port) before the command. Then use that port wherever these docs say `3577`.

The installer detects your GPU (CUDA, ROCm, or Vulkan) and uses the CPU when it finds none. On an arm64 machine, including an Apple Silicon Mac, it skips GPU detection and always uses the CPU backend. On an Apple Silicon Mac, it also sets up a small native worker that runs on the Metal GPU. If the installer picks a backend that fails, run it again with the CPU backend:

```bash
NEOHIVE_BACKEND=cpu bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

</details>

{% hint style="success" %}
**Check:** NeoHive is running.

```bash
curl http://localhost:3577/health
```

The reply contains `"status":"ok"`. If it does not, run `docker logs neohive --tail 50` and see [Common errors](../troubleshooting/common-errors.md).
{% endhint %}
{% endstep %}

{% step %}
## Create your Hive

1. Open the dashboard and click **I Understand** to accept the license.
2. Click **Get Started**, then **Start setup**.
3. Under **Hive name**, type a name and click **Continue**.
4. Under **Where does your data live?**, pick the first source for the Hive, fill in its details, and click **Continue**.

| Source | Content you can pick | What you need |
|---|---|---|
| **GitHub** | **Code** or **Documentation** from a repository | A personal access token with `repo` scope |
| **GitLab** | **Code** or **Documentation** from a repository | A token with `read_api` and `read_repository` scope |
| **File Upload** | `.md`, `.markdown`, `.txt`, and `.pdf` files, up to 10 MB each | The files |

A **Jira** card is marked **Coming soon** and cannot be picked yet. Every Hive also gets a **Knowledge** Index for what your agent learns. You can add more Indexes later from the Hive page. [What to add, and where](../context/what-to-add.md) helps you choose.

{% hint style="success" %}
**Check:** the Index is ready.

Open the Index from the Hive page. For a repository, its **Sync history** shows the first sync as finished. If the sync failed, see [Repository sync issues](../troubleshooting/sync.md).
{% endhint %}
{% endstep %}

{% step %}
## Connect your agent

Setup ends with **Install for your AI tools**. The Hive page's **Install Instructions** panel shows the same commands later. For Claude Code, run the first command in your terminal and the rest inside Claude Code:

```bash
claude mcp add <name> '<hive-url>' \
  --scope user \
  --transport http \
  --header 'x-mcp-client: claude-code'
```

The dashboard's copy leaves out `--scope user`. Add it, or the plugin's automatic recall cannot find the Hive. [Claude Code](connect/claude-code.md) explains why.

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
