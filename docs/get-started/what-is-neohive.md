---
description: "What NeoHive is, who it is for, and what leaves your machine."
---

# What is NeoHive?

NeoHive gives your coding agent your code and your team's knowledge, from a server you run yourself.

<figure><img src="../.gitbook/assets/get-started-what-is-neohive.svg" alt="Two panels compare an agent without and with NeoHive. Without NeoHive, the agent guesses a style, and you correct the agent every session. With NeoHive, the agent recalls your code and the snake_case convention from your Hive, and uses the right style on the first try."><figcaption></figcaption></figure>

## The parts

| Part | What it is |
|---|---|
| **Server** | A Docker container on your machine or a shared host. The dashboard runs at `http://localhost:3577`. |
| **Hive** | A workspace for one team or product. Each Hive has one MCP (Model Context Protocol) endpoint that agents connect to. |
| **Index** | One content store in a Hive. A **Code** or **Documentation** Index comes from a GitHub or GitLab repository. You upload files to a **Files** Index. Every Hive also has one **Knowledge** Index, which holds its Memories. A **Shared Index** is an Index that another Hive already set up. |
| **Memory** | One stored convention, decision, or lesson. Agents save a Memory with `memory_store` and get the Memory back with `memory_recall` or `memory_context`. |
| **Plugin** | Rules and skills for Claude Code, Cursor, or Codex. The plugin tells the agent when to use NeoHive, so you do not have to ask. |

## Who NeoHive is for

NeoHive is for developers and teams who use coding agents every day. Any agent that supports MCP (the standard way agents call outside tools) can connect.

NeoHive helps teams most. A convention that one person teaches comes back for everyone on the same Hive.

## What leaves your machine

Your code, documents, and Memories are stored and searched inside the container. NeoHive does not send them to the NeoHive team or to a model provider.

The NeoHive server makes some outbound calls. The server checks your license, downloads its embedding model, and checks for updates. It also sends usage numbers that contain none of your content. Finally, it clones the repositories you connect. [What stays on your machine](../security/local-only.md) lists each call. Your agent's model provider still sees what NeoHive returns to the agent.

## Next step

[Quickstart](quickstart.md)
