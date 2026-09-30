---
description: "Every action the NeoHive plugin takes on its own in Claude Code, when it fires, and the switch that turns it off."
---

# What the plugin does automatically

In Claude Code, the plugin runs hooks: small scripts that Claude Code starts at set moments. They give your agent context without you asking.

<figure><img src="../.gitbook/assets/results-plugin-automation.svg" alt="Timeline of one Claude Code session. SessionStart installs or updates the rules file and reminds the agent to call memory_context. UserPromptSubmit recalls with the first 400 characters of each prompt and adds the top five matches, off with NEOHIVE_HOOK_DISABLED=1. PreToolUse on Glob or Grep adds a reminder to try memory_recall first, off with NEOHIVE_PRETOOL_DISABLED=1. PostToolUse writes each NeoHive tool call to a session log under ~/.claude/neohive/sessions/, off with NEOHIVE_HOOK_DISABLED=1. At session end nothing runs; you run /neohive:capture-session-learnings."><figcaption></figcaption></figure>

## The hooks

| Hook | Fires when | What it does | Turn it off |
|---|---|---|---|
| `SessionStart` | A session opens | Copies the rules file to `~/.claude/rules/neohive.md` if it is missing or its version differs from the plugin's copy, then shows a reminder to call `memory_context` | No switch |
| `UserPromptSubmit` | You send a prompt | Sends the first 400 characters to `memory_recall` and adds the top 5 matches to your agent's context | `NEOHIVE_HOOK_DISABLED=1` |
| `PreToolUse` | Your agent runs `Glob` or `Grep` | Adds a reminder to try `memory_recall` first, then lets the search run | `NEOHIVE_PRETOOL_DISABLED=1` |
| `PostToolUse` | Your agent calls a NeoHive tool | Logs the call to `~/.claude/neohive/sessions/<session-id>.jsonl`. The prompt hook writes its own recalls to the same log. Your agent never reads this log | `NEOHIVE_HOOK_DISABLED=1` |

To use a switch, set it to `1` in the environment Claude Code runs in (for example, your shell profile), then start a new session. Every hook except `SessionStart` needs `python3` on your `PATH` and does nothing without it. All switches are listed in [Environment variables](../reference/environment-variables.md).

## When the prompt recall adds nothing

| Cause | Detail |
|---|---|
| Short prompt | Under 10 characters, such as `yes, go` |
| Slash command | The prompt starts with `/` |
| No NeoHive server found | The hook reads only `.mcp.json` in the current folder and the top level of `~/.claude.json`, and only a server whose name contains `neohive` and that has a `url` |
| Slow answer | The hook stops waiting after 8 seconds and sends your prompt without extra context |
| Nothing matched | No context is added |

{% hint style="warning" %}
The **Install Instructions** command runs `claude mcp add` without `--scope`, so Claude Code saves the server at local scope. The prompt hook does not read local scope. Tool calls still work, but no context is added per prompt. Add `--scope user` or `--scope project` to the command to fix this.
{% endhint %}

Added context appears under `NeoHive auto-context` and is cut at 4,000 characters. If `NEOHIVE_TOKEN` is set, the hook sends it as a bearer token.

## The Glob and Grep reminder

The reminder fires only when a `.mcp.json` in the current folder, or a folder above it, lists a NeoHive server. Set `NEOHIVE_PRETOOL_STRICT=1` to block the search instead. Your agent then sees the reminder as the reason.

## The explore-neohive subagent

A subagent is a helper agent your agent hands a task to. The plugin ships one named `explore-neohive`. It searches memory first and reads files only after memory points at them. The plugin's rules tell your agent to use it instead of the built-in `Explore` subagent for questions like "where is X handled?".

## What you run yourself

| Action | Command |
|---|---|
| Save the session's learnings | `/neohive:capture-session-learnings` |
| Rewrite each prompt with a small model before recall (opt-in) | `/neohive:enable-smart-prompts` |

Smart prompts adds a second prompt hook. The default hook keeps running too, unless you turn it off. Smart prompts needs the `claude` CLI, `python3`, `curl` and `ANTHROPIC_API_KEY`. You choose its off switch during setup; the suggested name is `NEOHIVE_SMART_DISABLED`. Every other plugin command is on [Slash commands](../reference/slash-commands.md).

## In Codex and Cursor

These plugins ship no hooks, so nothing runs per prompt, at session start, or before a search. The plugin's rules file does that job instead.

| Agent | Rules file | What replaces the hooks |
|---|---|---|
| Codex | `rules/neohive.md` in the plugin | The rules tell your agent to call `memory_context` first and to check memory before searching files |
| Cursor | `rules/neohive.mdc` in the plugin, set to always apply | The same instructions, loaded in every chat |

In both, `enable-smart-prompts` writes the helper script but does not register it, because the skill has no documented prompt hook to register it with in either agent. You wire it up yourself.

## Next step

Continue to [Common mistakes to avoid](common-mistakes.md).
