---
description: "How your agent, the NeoHive plugin, and the NeoHive container fit together, and where each one runs."
---

# How NeoHive works

NeoHive has three parts. Your coding agent asks for context over [MCP](glossary.md#mcp), the NeoHive plugin tells the agent when to ask, and the NeoHive container stores and searches your context. The agent and the plugin run on your computer. The container runs in Docker, on your machine or on a shared server. Knowing where each part runs and how the parts connect helps you set NeoHive up, and helps you find the cause when an agent cannot reach it.

<figure><img src="../.gitbook/assets/how-it-works.svg" alt="The coding agent and its NeoHive plugin call the NeoHive container over MCP. The container holds a Hive with Code, Documentation, Files, and Knowledge Indexes. The container also pulls repositories from GitHub or GitLab and serves the dashboard to your browser."><figcaption></figcaption></figure>

## The three parts

| Part | Where it runs | What it does |
|---|---|---|
| Your agent | Your editor or terminal | Calls NeoHive tools such as `memory_recall` and `memory_store` over MCP. |
| The NeoHive plugin | Inside Claude Code, Cursor, or Codex | Installs a [rules file](glossary.md#rules-file) that tells the agent when to use memory. In Claude Code, the plugin also runs hooks, which are scripts that run at fixed points in a session. |
| The NeoHive container | Docker, on your machine or a shared server | Stores your [Hives](glossary.md#hive) and [Indexes](glossary.md#index), finds the context for each question, and syncs your repositories. |

Your agent never reads NeoHive's files. Your agent asks for context through an MCP tool, and the container replies with matching code, docs, and [Memories](glossary.md#memory). [MCP tools](../reference/mcp-tools.md) lists every tool.

Claude Desktop and other MCP apps have no plugin. They connect to the same MCP endpoint and call the same tools.

## The container

NeoHive is one Docker container named `neohive`. The container serves the dashboard at `http://localhost:3577`, where you manage your Hives in your browser. The same container serves one MCP endpoint for each Hive, at `/hives/<hive-id>/mcp`. Everything the container stores lives in the `neohive-data` Docker volume, which is mounted at `/app/data` inside the container.

A Hive is a workspace for one codebase or team. Each Index in a Hive stores one kind of context, such as your code or your team's Memories. [Hives, Indexes, and Memories](hives-indexes-memories.md) explains the three levels.

## Hooks in Claude Code

In Claude Code, two hooks do most of the work. When a session starts, a hook installs the plugin's rules file. When you send a prompt, a hook sends the prompt to `memory_recall` in the container and adds the results to the agent's context before the agent starts its answer. No hook runs when a session ends. To save what your agent learned in a session, run `/neohive:capture-session-learnings`. [What the plugin does automatically](../results/plugin-automation.md) lists every hook and the switch that turns it off.

The Cursor and Codex plugins have no hooks. Their rules file tells the agent to load context at the start of a session, and to recall context before it searches files.

## Repositories

When you add a repository, the container copies (clones) it from GitHub or GitLab into the `neohive-data` volume. The container then splits each file into [chunks](glossary.md#chunk) and turns each chunk into an embedding, which is a list of numbers that captures what the text means. The container stores the chunks and their embeddings in a [Code](glossary.md#code-index) or [Documentation Index](glossary.md#documentation-index). On later syncs, the container indexes only the files that changed.

NeoHive embeds and searches your content on the machine it runs on. [What stays on your machine](../security/local-only.md) lists every connection the container makes to services outside your machine.
