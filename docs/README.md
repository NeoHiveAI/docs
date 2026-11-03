---
description: >-
  NeoHive gives your coding agents your codebase and your team's knowledge,
  from a server you run yourself.
---

# Welcome

**Coding agents that share what your whole team knows.**

NeoHive is a self-hosted context layer for coding agents: one persistent memory that your team's agents share. NeoHive indexes your repositories and documents and serves context from them to your agents over [MCP](concepts/glossary.md#mcp). As a result, your agents' answers reference your architecture, internal APIs, and conventions rather than generic patterns. Claude Code, Cursor, Codex, and any other agent that supports MCP read the same memory, so your team keeps the tools it already uses. When one person corrects their agent, every agent on your team gets the correction.

Connect your sources once, and NeoHive keeps up as they change. The more your team uses NeoHive, the better it answers. Each agent gets only the context that its task needs. NeoHive runs inside your own network, on machines that you control.

## Start here

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><i class="fa-rocket">:rocket:</i></td><td><strong>Quickstart</strong></td><td>Install NeoHive and get your first answer from your own code.</td><td><a href="get-started/quickstart.md">get-started/quickstart.md</a></td></tr><tr><td><i class="fa-comments">:comments:</i></td><td><strong>Your first session</strong></td><td>Ask about your code, teach one convention, and see the convention come back next session.</td><td><a href="get-started/first-session.md">get-started/first-session.md</a></td></tr><tr><td><i class="fa-diagram-project">:diagram-project:</i></td><td><strong>How NeoHive works</strong></td><td>Learn about Hives, Indexes, and how your agent reaches them.</td><td><a href="concepts/how-it-works.md">concepts/how-it-works.md</a></td></tr><tr><td><i class="fa-code-branch">:code-branch:</i></td><td><strong>Add a code repository</strong></td><td>Connect your GitHub or GitLab repositories.</td><td><a href="context/repositories/README.md">context/repositories/README.md</a></td></tr><tr><td><i class="fa-file-import">:file-import:</i></td><td><strong>Migrate from CLAUDE.md</strong></td><td>Bring your existing context files into NeoHive.</td><td><a href="context/migrate.md">context/migrate.md</a></td></tr><tr><td><i class="fa-graduation-cap">:graduation-cap:</i></td><td><strong>Teach your agent as you work</strong></td><td>Correct your agent once, and every teammate's agent remembers it.</td><td><a href="results/teach.md">results/teach.md</a></td></tr></tbody></table>

## Why it exists

Coding agents fall short on a team in the following ways:

* **Every developer teaches their own agent.** A correction that one person makes in Claude Code doesn't reach a teammate's Cursor.
* **Every agent starts from zero.** Your agent doesn't know your codebase, your conventions, or the library that you moved off last quarter.
* **Context files don't scale.** A `CLAUDE.md` file can grow to thousands of lines, and the agent loads the whole file, even when the task needs only a small part of it.
* **Reasoning is the first thing lost.** Teams rarely write down why they made a decision, but that reason is what the next agent needs most.

NeoHive gives your team one persistent memory that every agent reads from and every teammate adds to. That memory lives in a [Hive](concepts/glossary.md#hive), your team's workspace. A Hive holds [Indexes](concepts/glossary.md#index), which store your code, your documents, and the [Memories](concepts/glossary.md#memory) that your team saves. For more information about the problem and how NeoHive solves it, see [What is NeoHive?](get-started/what-is-neohive.md).

## What NeoHive does

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><i class="fa-magnifying-glass">:magnifying-glass:</i></td><td><strong>Knows your codebase</strong></td><td>NeoHive indexes your repositories, so your agent finds code by what it does, not by guessing file names.</td><td><a href="concepts/retrieval.md">concepts/retrieval.md</a></td></tr><tr><td><i class="fa-file-lines">:file-lines:</i></td><td><strong>Reads your documents</strong></td><td>NeoHive indexes the specs, runbooks, and PDFs you upload to a Files Index, so your agent recalls them like code.</td><td><a href="context/documents.md">context/documents.md</a></td></tr><tr><td><i class="fa-arrows-rotate">:arrows-rotate:</i></td><td><strong>Stays up to date</strong></td><td>NeoHive syncs your repositories on a schedule. Each sync indexes only the files that changed.</td><td><a href="context/repositories/sync.md">context/repositories/sync.md</a></td></tr><tr><td><i class="fa-book-open">:book-open:</i></td><td><strong>Keeps your team's knowledge</strong></td><td>NeoHive stores conventions, decisions, and debugging lessons as Memories. Everyone's agent can recall what one person teaches.</td><td><a href="context/team-knowledge.md">context/team-knowledge.md</a></td></tr><tr><td><i class="fa-puzzle-piece">:puzzle-piece:</i></td><td><strong>Works with every agent</strong></td><td>NeoHive connects to Claude Code, Cursor, and Codex through plugins, and to ChatGPT, Claude Desktop, or any other MCP app directly.</td><td><a href="get-started/connect/README.md">get-started/connect/README.md</a></td></tr><tr><td><i class="fa-laptop">:laptop:</i></td><td><strong>Runs on your machine</strong></td><td>NeoHive keeps your code, documents, Memories, and recall queries on the machine it runs on. NeoHive doesn't send that content to an outside service.</td><td><a href="security/local-only.md">security/local-only.md</a></td></tr></tbody></table>

## Built for teams

A Hive is shared, so what one person teaches their agent helps the whole team:

* **One Hive, every agent.** Your teammates' agents read from the same Hive, whichever tool each teammate uses.
* **Teach once.** When you correct your agent or explain a convention, the agent saves that lesson as a Memory in your Hive. Every teammate's agent then recalls that Memory.
* **Lessons outlast team changes.** The lesson stays in the Hive, so someone who joins next month has it on their first day.
