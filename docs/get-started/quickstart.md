---
description: "The shortest path from nothing to a coding agent that answers from your own repository, with what you should see at every step."
---

# Quickstart

This page takes one path with no options: NeoHive, one GitHub repository, and Claude Code. Each step ends with what you should see, so you know it worked before you move on. To check each step in more detail or to connect a different agent, use [Install NeoHive](install.md).

Before you start, you need the following:

* Docker 20 or later, running on Linux, macOS, or Windows with WSL2.
* A NeoHive license file (`license.key` or `license.json`) from the [NeoHive team](https://www.neohive.ai/download/). Ask for it before you start, so it is ready when the installer runs.
* Claude Code.
* A GitHub personal access token with `repo` scope.

{% hint style="info" %}
If a coding agent is doing the setup for you, give it this page and the following instruction:

```text
Set up NeoHive by following https://docs.neohive.ai/get-started/quickstart. Ask me before you run the installer and before you paste any token.
```
{% endhint %}

{% stepper %}
{% step %}
## Install NeoHive

Run the installer from the folder that holds your license file.

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

**What you should see.** The installer ends with `NeoHive is running.` and the dashboard address:

```text
NeoHive is running.

>> NEXT STEP: open the dashboard to finish onboarding <<

  On this machine:    http://localhost:3577
  From another host:  http://<this-machine-ip>:3577
```

To check from the terminal, run `curl http://localhost:3577/health`. The reply contains `"status":"ok"`.
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

NeoHive adds your repository to the Hive as a [Code Index](../concepts/glossary.md#code-index), a store inside the Hive, and starts indexing it in the background. Indexing builds a searchable copy of your code.

**What you should see.** Open the Hive, then open the Index. **Sync history** shows the first sync, and the sync finishes before the last step on this page. Keep the dashboard open, because setup continues on the next screen.
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
4. When Claude Code asks, approve the NeoHive server.
5. When setup shows **Connected**, select **Open** followed by your Hive's name.
6. Run the following commands inside Claude Code to install the plugin and run its setup:

   ```text
   /plugin marketplace add NeoHiveAI/NeoHiveClaude
   /plugin install neohive@neohive-claude
   /reload-plugins
   /neohive:getting-started
   ```

**What you should see.** Setup shows **Connected** as soon as Claude Code makes its first request, which happens after you approve the server. The plugin's setup wizard then confirms that Claude Code can reach the Hive. If **Connected** does not appear, Claude Code has not connected yet: check that you approved the server, then see the table at the end of this page.
{% endstep %}

{% step %}
## Ask about your code

When the first sync has finished, ask Claude Code a question that only your code can answer. Replace the example with something from your own repository:

```text
How does the authentication middleware work?
```

**What you should see.** Before it answers, Claude Code shows a tool call to `memory_recall`. That line is the proof that the answer came from NeoHive. The answer then names real file paths from your repository, and you did not paste any files into the chat.
{% endstep %}

{% step %}
## Teach it one thing, and see it come back

Tell Claude Code a convention that it cannot work out from the code:

```text
Remember that we always use snake_case for database column names.
```

Claude Code calls `memory_store` and saves the convention as a [Memory](../concepts/glossary.md#memory) in the Hive. Now start a new session, and ask for work the convention applies to:

```text
Add a table for customer invoices.
```

**What you should see.** Claude Code calls `memory_context` or `memory_recall`, gets the convention back, and uses snake_case without you asking. The Memory belongs to the Hive, not to Claude Code, so a teammate who connects Cursor or Codex to the same Hive gets the same convention back.
{% endstep %}
{% endstepper %}

## If something is off

| What you see | Where to look |
|---|---|
| `curl` cannot connect, or the reply is not `"status":"ok"` | Run `docker logs neohive --tail 50`, then see [Common errors](../troubleshooting/common-errors.md). |
| Setup never shows **Connected** | Approve the server when Claude Code asks, then see [Agent can't connect](../troubleshooting/connection.md). |
| Claude Code has no `memory_recall` tool | Run `claude mcp get <name>` and compare the URL with the dashboard, then see [Agent can't connect](../troubleshooting/connection.md). |
| **Sync history** shows an error | See [Repository sync issues](../troubleshooting/sync.md). |
| The answer is vague or names no files | Wait for the first sync to finish, then see [Recall isn't finding what I need](../troubleshooting/recall.md). |

## Next steps

You have installed NeoHive and connected Claude Code, so you can skip **Install NeoHive** and **Connect your agent**.

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><i class="fa-comments">:comments:</i></td><td><strong>Your first session</strong></td><td>A fuller walk through asking, teaching, and recalling.</td><td><a href="first-session.md">first-session.md</a></td></tr><tr><td><i class="fa-file-lines">:file-lines:</i></td><td><strong>Add your documents</strong></td><td>Upload specs, runbooks, and PDFs so your agent recalls them too.</td><td><a href="../context/documents.md">../context/documents.md</a></td></tr><tr><td><i class="fa-file-import">:file-import:</i></td><td><strong>Migrate from CLAUDE.md</strong></td><td>Bring your existing context files into NeoHive.</td><td><a href="../context/migrate.md">../context/migrate.md</a></td></tr><tr><td><i class="fa-users">:users:</i></td><td><strong>Invite your team</strong></td><td>Share the Hive so every teammate's agent recalls the same lessons.</td><td><a href="../results/team-workflows.md">../results/team-workflows.md</a></td></tr></tbody></table>
