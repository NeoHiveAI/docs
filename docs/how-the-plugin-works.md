---
description: "What the NeoHive plugin does automatically in your agent, and the switches that control it."
---

# How the plugin works

Installing the NeoHive plugin does three things: it adds rules that teach your agent when to use memory, it wires up the MCP connection, and in Claude Code it installs a few hooks that pull in context and nudge the agent toward memory on their own. This page covers those automatic behaviors and how to turn each one off.

Everything here is optional. NeoHive works without any of it; the hooks just save you from having to ask for context by hand.

## Automatic context on every prompt

In Claude Code, the plugin looks at each prompt you send, recalls the most relevant memories for it, and adds them to the agent's context before it answers. This is why your agent often already knows the relevant convention or decision without you mentioning it.

To turn it off, set `NEOHIVE_HOOK_DISABLED=1` in the environment where your agent runs.

## Recall before searching

Also in Claude Code, when the agent is about to search files (with glob or grep) inside a project NeoHive has indexed, the plugin reminds it to check memory first, since a single recall often answers the question faster than walking the file tree.

Two switches control this:

| Variable | Effect |
|----------|--------|
| `NEOHIVE_PRETOOL_DISABLED=1` | Turn the reminder off entirely. |
| `NEOHIVE_PRETOOL_STRICT=1` | Make it strict: block the file search and require a memory check first. |

## The explore-neohive subagent

The Claude Code plugin also ships a subagent called `explore-neohive`. It is built to search memory first and only read files once memory has pointed it to the right place, which makes it faster and lighter than the built-in explorer for questions like "where is X handled?" in an indexed project. The plugin's rules tell your agent to reach for it in those cases.

## Smarter prompt rewriting (opt-in)

If you run [`enable-smart-prompts`](reference.md#slash-commands), NeoHive replaces the plain context hook with one that first rewrites your prompt using a small model, so the recall query is sharper than your raw words. It needs the `claude` CLI, `python3`, and an `ANTHROPIC_API_KEY` available in your environment. Turn it off with `NEOHIVE_SMART_DISABLED=1`.

## Codex and Cursor

These automatic behaviors are Claude Code features, because they rely on hooks and subagents that Claude Code provides. In Codex and Cursor, the plugin delivers the same guidance as an always-apply rule instead: the agent is instructed to load context at the start of a session and to check memory before searching, rather than a hook doing it for the agent. The `NEOHIVE_TOKEN` and `NEOHIVE_MCP_HINTS` settings still apply everywhere. See [Reference](reference.md#environment-variables) for the full list.
