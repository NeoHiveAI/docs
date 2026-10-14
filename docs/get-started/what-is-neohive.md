---
description: "What NeoHive is, what its parts are, and who it's for."
---

# What is NeoHive?

NeoHive is a self-hosted memory that your team's coding agents, such as Claude Code, Cursor, and Codex, share. It isn't an agent itself. It gives your agents your code and your team's knowledge, from a server you run yourself.

Without it, your agent starts every session knowing nothing about your project. Your agent doesn't know how your code is organized or which conventions your team follows, and it doesn't remember what you told it yesterday. You end up explaining the same things and correcting the same mistakes.

NeoHive keeps that context in a [Hive](../concepts/glossary.md#hive), a workspace for one codebase or team. NeoHive copies your repositories and documents into [Indexes](../concepts/glossary.md#index), the searchable stores inside a Hive, so the agent finds code by what it does, not by its file name. What your team teaches the agent, such as a convention or a bug fix, becomes a [Memory](../concepts/glossary.md#memory).

NeoHive gives the agent only the context that the current task needs. When the agent needs context, it asks NeoHive through [MCP](../concepts/glossary.md#mcp) and gets back only the parts that match. It doesn't load a whole context file of thousands of lines, so more of its context window, the text it can read at once, stays free for your actual work.

You run NeoHive yourself, so your code, documents, and Memories stay on a machine you control. For the details, see [What stays on your machine](../security/local-only.md). NeoHive runs in a Docker container, on your own machine or on a shared server for your team, and the same container serves a dashboard where you manage your Hives and their content in your browser. [How NeoHive works](../concepts/how-it-works.md) shows how these parts fit together.

<figure><img src="../.gitbook/assets/get-started-what-is-neohive.svg" alt="Two panels compare an agent without and with NeoHive. Without NeoHive, the agent guesses a style, and you correct the agent every session. With NeoHive, the agent recalls your code and the snake_case convention from your Hive, and uses the right style on the first try."><figcaption></figcaption></figure>

## The parts

NeoHive is made of the following parts. For the full explanation of Hives, Indexes, Memories, and the kinds of Index, see [Hives, Indexes, and Memories](../concepts/hives-indexes-memories.md).

| Part | What it is |
|---|---|
| **Server** | A Docker container on your machine or a shared server. The dashboard runs at `http://localhost:3577`. |
| **Hive** | A workspace for one codebase or team. Each Hive has one MCP endpoint that agents connect to. |
| **Index** | A searchable store inside a Hive. Each Index holds one kind of content, such as your code, your docs, or your team's Memories. |
| **Memory** | One lesson your team teaches the agent, such as a convention, a decision, or the fix for a bug. NeoHive keeps each Memory, so any agent connected to the Hive can use the lesson in a later session. |
| **Plugin** | Rules and skills for Claude Code, Cursor, or Codex. The plugin tells the agent when to use NeoHive, so you don't have to ask. |

<figure><img src="../.gitbook/assets/get-started-what-is-neohive-parts.svg" alt="The parts of NeoHive and how they nest. Your coding agent, such as Claude Code, Cursor, or Codex, runs the NeoHive plugin and calls a Hive over MCP. The server is a Docker container that serves the dashboard at localhost:3577 and holds your Hives. Each Hive holds Code, Documentation, Files, and Knowledge Indexes, and the Knowledge Index holds Memories."><figcaption></figcaption></figure>

## Who NeoHive is for

NeoHive is for anyone who works with an AI agent. You don't need to be a developer to use NeoHive. Claude Code, Cursor, and Codex each have a NeoHive plugin. Claude Desktop and any other app that supports MCP can connect too. One person sets up the NeoHive server, and everyone else connects their agent to it, as [Connect your agent](connect/README.md) explains.

NeoHive helps teams most, because everyone connected to the same Hive shares its Memories. A convention that one person teaches comes back for every teammate's agent, whichever tool they use. A teammate who joins later gets that knowledge on their first day. [Team workflows](../results/team-workflows.md) shows how teams set this up.

Developers get the most from NeoHive when a coding agent works in a codebase it doesn't know. NeoHive also helps when you correct the same mistakes again and again. If you work alone, run NeoHive on your own machine. Your agent then remembers your project from one session to the next.
