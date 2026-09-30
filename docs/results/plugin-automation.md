---
description: "Every action the NeoHive plugin takes on its own in Claude Code, when it fires, and the switch that turns it off."
---

# What the plugin does automatically

In Claude Code, the plugin runs hooks, small scripts Claude Code starts at set moments, so your agent gets context without you asking.

<figure><img src="../.gitbook/assets/results-plugin-automation.svg" alt="Timeline of one Claude Code session. SessionStart updates the rules file and reminds the agent to call memory_context. UserPromptSubmit recalls with the first 400 characters of each prompt and adds the top five matches, off with NEOHIVE_HOOK_DISABLED=1. PreToolUse on Glob or Grep adds a reminder to try memory_recall first, off with NEOHIVE_PRETOOL_DISABLED=1. PostToolUse writes each NeoHive tool call to a session log under ~/.claude/neohive/sessions/, off with NEOHIVE_HOOK_DISABLED=1. At session end nothing runs; you run /neohive:capture-session-learnings."><figcaption></figcaption></figure>

Set a switch to `1` in the environment Claude Code runs in, for example your shell profile, then start a new session. The session start hook has no switch. It copies the rules file to `~/.claude/rules/neohive.md` only when the plugin version changes. The other hooks need `python3` on your `PATH` and do nothing without it.

## When the prompt recall is skipped

- **Short prompt:** under 10 characters.
- **Slash command:** the prompt starts with `/`.
- **No NeoHive server found:** the hook reads only project scope (`.mcp.json`) and user scope (the top level of `~/.claude.json`), and only a server whose name contains `neohive`.
- **No answer in time:** the hook stops waiting after 8 seconds and your prompt goes through without extra context.
- **Nothing matched:** no context is added.

{% hint style="warning" %}
The **Install Instructions** command runs `claude mcp add` without `--scope`, so Claude Code saves it at local scope, which neither hook reads. Your agent's tool calls still work, but no context is added per prompt. Add `--scope user` (or `--scope project`) to the command to turn the hooks on.
{% endhint %}

The added text appears under `NeoHive auto-context` and is cut at 4,000 characters. If `NEOHIVE_TOKEN` is set, the hook sends it as a bearer token.

## The Glob and Grep reminder

It fires only when a `.mcp.json` in the current folder, or a folder above it, lists a NeoHive server, so it needs project scope. Set `NEOHIVE_PRETOOL_STRICT=1` to refuse the search instead; your agent sees the reminder as the reason.

## The explore-neohive subagent

The plugin ships a subagent, a helper agent your agent can hand a task to, named `explore-neohive`. It searches memory first and reads files only after memory points at them. The plugin's rules tell your agent to use it instead of the built-in `Explore` subagent for questions like "where is X handled?".

## What you run yourself

| Action | Command |
|---|---|
| Save the session's learnings | `/neohive:capture-session-learnings` |
| Rewrite each prompt with a small model before recall (opt-in) | `/neohive:enable-smart-prompts` |

Smart prompts adds a second prompt hook next to the default one, so both run unless you turn one off. It needs the `claude` CLI, `python3`, `curl` and `ANTHROPIC_API_KEY`. You pick its off switch during setup; the suggested name is `NEOHIVE_SMART_DISABLED`.

{% hint style="info" %}
Codex and Cursor have no hooks. Their plugins install a rule that tells your agent to load context first and check memory before searching files.
{% endhint %}

## Next step

Continue to [Common mistakes to avoid](common-mistakes.md).
