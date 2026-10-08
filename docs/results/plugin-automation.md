---
description: "Every action the NeoHive plugin takes automatically in Claude Code, when it runs, and the switch that turns it off."
---

# What the plugin does automatically

The NeoHive plugin is a package for Claude Code, Cursor, or Codex. The plugin tells your agent when to use NeoHive, so you do not have to ask each time.

In Claude Code, the plugin runs hooks. Hooks are small scripts that Claude Code starts at set points in a session. The hooks give your agent context without you asking for it. For example, one hook adds matching context to each prompt you send.

Read this page to see what runs in your sessions and how to turn each part off. The page lists each hook, when it runs, and its off switch. The page also covers the commands you run yourself, and how Codex and Cursor differ.

<figure><img src="../.gitbook/assets/results-plugin-automation.svg" alt="Timeline of one Claude Code session. SessionStart installs or updates the rules file and reminds the agent to call memory_context. UserPromptSubmit recalls with the first 400 characters of each prompt and adds the top five matches, off with NEOHIVE_HOOK_DISABLED=1. PreToolUse on Glob or Grep adds a reminder to try memory_recall first, off with NEOHIVE_PRETOOL_DISABLED=1. PostToolUse writes each NeoHive tool call to a session log under ~/.claude/neohive/sessions/, off with NEOHIVE_HOOK_DISABLED=1. At session end nothing runs; you run /neohive:capture-session-learnings."><figcaption></figcaption></figure>

## The hooks

| Hook | Runs when | What it does | Turn it off |
|---|---|---|---|
| `SessionStart` | A session opens | Copies the rules file to `~/.claude/rules/neohive.md` if the file is missing or its version differs from the plugin's copy. Then shows a reminder to call `memory_context`. | No switch |
| `UserPromptSubmit` | You send a prompt | Sends the first 400 characters of the prompt to `memory_recall`. Then adds the top 5 matches to your agent's context. | `NEOHIVE_HOOK_DISABLED=1` |
| `PreToolUse` | Your agent runs `Glob` or `Grep` | Adds a reminder to try `memory_recall` first. Then lets the search run. | `NEOHIVE_PRETOOL_DISABLED=1` |
| `PostToolUse` | Your agent calls a NeoHive tool | Logs the call to `~/.claude/neohive/sessions/<session-id>.jsonl`. The prompt hook writes its own recalls to the same log. Your agent never reads this log. | `NEOHIVE_HOOK_DISABLED=1` |

To turn off a hook, do the following:

1. Set the hook's switch to `1` in the environment that Claude Code runs in, such as your shell profile.
2. Start a new session.

The hook does not run in the new session.

Every hook except `SessionStart` needs `python3` on your `PATH`. Without `python3`, those hooks do nothing. [Environment variables](../reference/environment-variables.md) lists all the switches.

## When the prompt recall adds nothing

| Cause | Detail |
|---|---|
| Short prompt | The prompt is under 10 characters, such as `yes, go`. |
| Slash command | The prompt starts with `/`. |
| No NeoHive server found | The hook reads only `.mcp.json` in the current folder and the top level of `~/.claude.json`. In those files, the hook uses only a server whose name contains `neohive` and that has a `url`. |
| Slow answer | The hook stops waiting after 8 seconds and sends your prompt without extra context. |
| Nothing matched | Recall finds no matching context, so the hook adds nothing. |

{% hint style="warning" %}
The prompt hook finds your Hive through the `.mcp.json` that the **Install Instructions** command writes with `--scope project`. If you add the server without a scope, tool calls still work, but the hook adds no context to your prompts. [Connect Claude Code](../get-started/connect/claude-code.md) explains which scope to use.
{% endhint %}

The hook adds context under `NeoHive auto-context` and cuts it off at 4,000 characters. If `NEOHIVE_TOKEN` is set, the hook sends that token as a bearer token (an access token in the request header).

## The Glob and Grep reminder

`Glob` and `Grep` are the Claude Code tools that find files by name and search text inside files. The reminder asks your agent to try `memory_recall` first. Recall finds code by what it does, not by its file name.

The reminder appears only when a `.mcp.json` file in the current folder, or in a folder above it, lists a NeoHive server. To block the search instead, set `NEOHIVE_PRETOOL_STRICT=1`. Your agent then sees the reminder as the reason for the block.

## The explore-neohive subagent

A subagent is a helper agent your agent hands a task to. The plugin includes one subagent, named `explore-neohive`. `explore-neohive` searches memory first and reads files only after memory points to them. The plugin's rules tell your agent to use `explore-neohive` instead of the built-in `Explore` subagent for questions like "where is X handled?".

## What you run yourself

| Action | Command |
|---|---|
| Save the session's learnings | `/neohive:capture-session-learnings` |
| Rewrite each prompt with a small model before recall (optional) | `/neohive:enable-smart-prompts` |

Smart prompts adds a second prompt hook. The new hook asks a small model (Haiku by default) to rewrite each prompt into a `memory_recall` query. The default hook also keeps running unless you turn it off. Smart prompts needs the `claude` command-line tool, `python3`, `curl`, and the `ANTHROPIC_API_KEY` environment variable. Without `claude` or `ANTHROPIC_API_KEY`, the new hook adds nothing. You choose the name of its off switch during setup. The suggested name is `NEOHIVE_SMART_DISABLED`. [Slash commands](../reference/slash-commands.md) lists every other plugin command.

## In Codex and Cursor

The Codex and Cursor plugins include no hooks. Nothing runs automatically when a session starts, when you send a prompt, or before a search. Each plugin's rules file gives your agent instructions instead.

| Agent | Rules file | What replaces the hooks |
|---|---|---|
| Codex | `rules/neohive.md` in the plugin | The rules tell your agent to call `memory_context` first and to check memory before searching files. |
| Cursor | `rules/neohive.mdc` in the plugin, set to always apply | The rules hold the same instructions and load in every chat. |

In Codex and Cursor, `enable-smart-prompts` writes the helper script but does not register it. Neither agent has a documented prompt hook that the skill can register the script with. You need to connect the script yourself.
