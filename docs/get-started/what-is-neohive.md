---
description: "What NeoHive is, who it is for, and what leaves your machine."
---

# What is NeoHive

NeoHive gives your coding agent your code and your team's knowledge, from a server you run yourself.

<figure><img src="../.gitbook/assets/get-started-what-is-neohive.svg" alt="Side by side: without NeoHive the agent guesses a style and you correct it every session; with NeoHive the agent recalls your code and the snake_case convention from your Hive and gets it right first time."><figcaption></figcaption></figure>

## The parts

| Part | What it is |
|---|---|
| **Server** | A Docker container on your machine or a shared host. The dashboard runs at `http://localhost:3577`. |
| **Hive** | A workspace for one team or product. Each Hive has one MCP endpoint that agents connect to. |
| **Index** | One content store in a Hive: a **Code** or **Documentation** Index from a GitHub or GitLab repository, a **Files** Index you upload to, or the Hive's **Knowledge** Index. A **Shared Index** is an Index that another Hive already set up. |
| **Memory** | One stored convention, decision, or lesson. Agents save it with `memory_store` and get it back with `memory_recall` or `memory_context`. |
| **Plugin** | Rules and skills for Claude Code, Cursor, or Codex. The plugin tells the agent when to use NeoHive, so you do not have to ask. |

## Who it is for

Developers and teams who use coding agents every day. Any agent that speaks MCP (Model Context Protocol, the standard way agents call outside tools) can connect.

It helps most with a team: a convention one person teaches comes back for everyone on the same Hive.

## What leaves your machine

Your code, documents, and Memories are stored and searched inside the container. NeoHive does not send them to NeoHive or to a model provider.

The server does call out to check your license, download its embedding model, check for updates, send usage numbers with no content in them, and clone the repositories you connect. [What stays on your machine](../security/local-only.md) lists each call. Your agent's model provider still sees what NeoHive returns to the agent.

## Next step

[Quickstart](quickstart.md)
