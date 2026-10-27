---
description: "Every action the NeoHive plugin takes automatically in Claude Code, when it runs, and the switch that turns it off."
---

# What the plugin does automatically

The NeoHive plugin for Claude Code, Cursor, or Codex tells your agent when to use NeoHive, so you do not have to ask each time. In Claude Code, the plugin also runs hooks: small scripts that Claude Code starts at set points in a session, such as when you send a prompt.

Most hooks run without you doing anything, and most have a switch to turn them off. A few steps, such as saving what your agent learned, are still yours to run.

<figure><img src="../.gitbook/assets/results-plugin-automation.svg" alt="Timeline of one Claude Code session. SessionStart installs or updates the rules file and reminds the agent to call memory_context. UserPromptSubmit recalls with the first 400 characters of each prompt and adds the top five matches, off with NEOHIVE_HOOK_DISABLED=1. PreToolUse on Glob or Grep adds a reminder to try memory_recall first, off with NEOHIVE_PRETOOL_DISABLED=1. PostToolUse writes each NeoHive tool call to a session log under ~/.claude/neohive/sessions/, off with NEOHIVE_HOOK_DISABLED=1. At session end nothing runs, and you run /neohive:capture-session-learnings."><figcaption></figcaption></figure>

## The hooks

<table><thead><tr><th width="160">Hook</th><th width="170">Runs when</th><th>What it does</th></tr></thead><tbody>
<tr><td><code>SessionStart</code></td><td>A session opens</td><td>Copies the rules file to <code>~/.claude/rules/neohive.md</code> if the file is missing or its version differs from the plugin's copy. Then shows a reminder to call <code>memory_context</code>. There is no switch to turn it off.</td></tr>
<tr><td><code>UserPromptSubmit</code></td><td>You send a prompt</td><td>Sends the first 400 characters of the prompt to <code>memory_recall</code>. Then adds the top 5 matches to your agent's context. Turn it off with <code>NEOHIVE_HOOK_DISABLED</code>.</td></tr>
<tr><td><code>PreToolUse</code></td><td>Your agent runs <code>Glob</code> or <code>Grep</code></td><td>Adds a reminder to try <code>memory_recall</code> first. Then lets the search run. Turn it off with <code>NEOHIVE_PRETOOL_DISABLED</code>.</td></tr>
<tr><td><code>PostToolUse</code></td><td>Your agent calls a NeoHive tool</td><td>Logs the call to <code>~/.claude/neohive/sessions/&lt;session-id&gt;.jsonl</code>. The prompt hook writes its own recalls to the same log. Your agent never reads this log. Turn it off with <code>NEOHIVE_HOOK_DISABLED</code>.</td></tr>
</tbody></table>

To turn off a hook, do the following:

1. Set the hook's switch to `1`, for example `NEOHIVE_HOOK_DISABLED=1`, in the environment that Claude Code runs in, such as your shell profile.
2. Start a new session.

The hook does not run in the new session.

Every hook except `SessionStart` needs `python3` on your `PATH`, and the prompt hook also needs `curl`. Without those tools, the hooks do nothing. [Environment variables](../reference/environment-variables.md) lists all the switches.

## What the prompt recall counts as

NeoHive treats the prompt hook's recall the same as a recall your agent makes on purpose, and so does the smart prompts hook described later on this page. Each one appears in the **Recent queries** tab of your [Hive](../concepts/glossary.md#hive) page. Each one also adds to the access count of every [Memory](../concepts/glossary.md#memory) it returns, which `memory_recall` shows as **Accessed** and `memory_stats` uses to list the most accessed Memories.

## When the prompt recall adds nothing

The prompt hook adds nothing in these cases:

* **The prompt is short.** It is under 10 characters, such as `yes, go`.
* **The prompt is a slash command.** It starts with `/`.
* **The hook finds no NeoHive server.** The hook reads only `.mcp.json` in the current folder and the top level of `~/.claude.json`. In those files, it uses only a server whose name contains `neohive` and that has a `url`.
* **NeoHive answers slowly.** The hook stops waiting after 8 seconds and sends your prompt without extra context.
* **Nothing matches.** Recall finds no matching context.

{% hint style="warning" %}
The prompt hook finds your Hive through the `.mcp.json` that the **Install Instructions** command writes with `--scope project`, or through a server added with `--scope user`. If you add the server with the default local scope, tool calls still work, but the hook adds no context to your prompts. [Connect Claude Code](../get-started/connect/claude-code.md) explains which scope to use.
{% endhint %}

The hook adds context under `NeoHive auto-context` and cuts it off at 4,000 characters. If `NEOHIVE_TOKEN` is set, the hook sends that token as a bearer token (an access token in the request header).

## The Glob and Grep reminder

`Glob` and `Grep` are the Claude Code tools that find files by name and search text inside files. The reminder asks your agent to try `memory_recall` first. Recall finds code by what it does, not by its file name.

The reminder appears only when a `.mcp.json` file in the current folder, or in a folder above it, lists a NeoHive server. To block the search instead, set `NEOHIVE_PRETOOL_STRICT=1`. Your agent then sees the reminder as the reason for the block.

## The explore-neohive subagent

A subagent is a helper agent your agent hands a task to. The plugin includes one subagent, named `explore-neohive`. `explore-neohive` searches memory first and reads files only after memory points to them. The plugin's rules tell your agent to use `explore-neohive` instead of the built-in `Explore` subagent for questions like "where is X handled?".

## What you run yourself

No hook runs these two commands. You run them yourself.

**Save the session's learnings.** Run `/neohive:capture-session-learnings` before you close the session. The command's own description inside the plugin says that a stop hook runs it, but the plugin registers no such hook.

**Optional: rewrite each prompt before recall.** Run `/neohive:enable-smart-prompts` to add a second prompt hook. The new hook asks a small model (Haiku by default) to rewrite each prompt into a `memory_recall` query. The default hook also keeps running unless you turn it off.

<details>

<summary>What smart prompts needs</summary>

* The `claude` command-line tool, `python3`, and `curl`.
* The `ANTHROPIC_API_KEY` environment variable. If the key or any tool is missing, the new hook adds nothing.
* An off switch, which you name during setup. The suggested name is `NEOHIVE_SMART_DISABLED`.

</details>

[Slash commands](../reference/slash-commands.md) lists every other plugin command.

## In Codex and Cursor

The Codex and Cursor plugins include no hooks, so nothing runs when a session starts, when you send a prompt, or before a search. Each plugin's rules file tells your agent to call `memory_context` first and to check memory before searching files. In Codex, the rules file is `rules/neohive.md` in the plugin. In Cursor, it is `rules/neohive.mdc`, set to always apply, so it loads in every chat.

In Codex and Cursor, `enable-smart-prompts` writes the helper script but does not register it. Neither agent has a documented prompt hook that the skill can register the script with. You need to connect the script yourself.
