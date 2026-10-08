---
description: >-
  NeoHive gives your coding agents your codebase and your team's knowledge,
  from a server you run yourself.
---

# Welcome

Your coding agents forget your project between sessions. NeoHive remembers it for them. NeoHive is a self-hosted memory that your team's coding agents share, holding your codebase and your team's knowledge. NeoHive works with Claude Code, Cursor, Codex, and any other agent that supports [MCP](concepts/glossary.md#mcp). For a fuller introduction, see [What is NeoHive?](get-started/what-is-neohive.md).

## The problem

Your coding agent does not know your code. It does not know your conventions, the library you moved off last quarter, or that a function it called does not exist. Each session starts with no knowledge of your project, and you spend the time correcting the agent.

You can paste code into the chat, but you have to do it every time. The agent can also read only a limited amount of text at once (its context window). A context file, for example `CLAUDE.md` or `AGENTS.md`, can grow to thousands of lines. The agent loads the whole file whether the task needs it or not.

## What NeoHive does

NeoHive indexes your repositories and documents, and stores what your team teaches the agent. When the agent asks, NeoHive returns the relevant parts. Your content lives in a [Hive](concepts/glossary.md#hive), a workspace for your team. Each Hive holds [Indexes](concepts/glossary.md#index), the stores for your code, documents, files, and [Memories](concepts/glossary.md#memory). Agents connect to the Hive over MCP.

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><i class="fa-magnifying-glass">:magnifying-glass:</i></td><td><strong>Knows your codebase</strong></td><td>NeoHive indexes your repositories, so your agent finds code by what it does, not by guessing file names.</td><td><a href="concepts/retrieval.md">concepts/retrieval.md</a></td></tr><tr><td><i class="fa-file-lines">:file-lines:</i></td><td><strong>Reads your documents</strong></td><td>Upload specs, runbooks, and PDFs to a Files Index. Your agent recalls them the same way it recalls code.</td><td><a href="context/documents.md">context/documents.md</a></td></tr><tr><td><i class="fa-arrows-rotate">:arrows-rotate:</i></td><td><strong>Stays up to date</strong></td><td>NeoHive syncs your repositories on a schedule. Each sync indexes only the files that changed.</td><td><a href="context/repositories/sync.md">context/repositories/sync.md</a></td></tr><tr><td><i class="fa-book-open">:book-open:</i></td><td><strong>Keeps your team's knowledge</strong></td><td>NeoHive stores conventions, decisions, and debugging lessons as Memories. Everyone's agent can recall what one person teaches.</td><td><a href="context/team-knowledge.md">context/team-knowledge.md</a></td></tr><tr><td><i class="fa-puzzle-piece">:puzzle-piece:</i></td><td><strong>Works with every agent</strong></td><td>Claude Code, Cursor, and Codex have plugins. Claude Desktop and any other MCP app connect to the same Hive.</td><td><a href="get-started/connect/README.md">get-started/connect/README.md</a></td></tr><tr><td><i class="fa-laptop">:laptop:</i></td><td><strong>Runs on your machine</strong></td><td>NeoHive keeps your code, documents, Memories, and queries on the machine it runs on. NeoHive sends none of that content to an outside service.</td><td><a href="security/local-only.md">security/local-only.md</a></td></tr></tbody></table>

## Built for teams

A Hive is shared, so what one person teaches their agent helps the whole team. When you correct your agent or explain a convention, the agent saves that lesson as a Memory in the Hive. Every teammate's agent reads from the same Hive, so each agent recalls that Memory, whichever tool the teammate uses. The Memory stays in the Hive, so a teammate who joins next month gets the lesson on their first day.

## Start here

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><i class="fa-rocket">:rocket:</i></td><td><strong>Quickstart</strong></td><td>Install NeoHive and get your first answer from your own code.</td><td><a href="get-started/quickstart.md">get-started/quickstart.md</a></td></tr><tr><td><i class="fa-comments">:comments:</i></td><td><strong>Your first session</strong></td><td>Ask about your code, teach one convention, and see the convention come back next session.</td><td><a href="get-started/first-session.md">get-started/first-session.md</a></td></tr><tr><td><i class="fa-diagram-project">:diagram-project:</i></td><td><strong>How NeoHive works</strong></td><td>Learn about Hives, Indexes, and how your agent reaches them.</td><td><a href="concepts/how-it-works.md">concepts/how-it-works.md</a></td></tr><tr><td><i class="fa-code-branch">:code-branch:</i></td><td><strong>Add a code repository</strong></td><td>Connect your GitHub or GitLab repositories.</td><td><a href="context/repositories/README.md">context/repositories/README.md</a></td></tr><tr><td><i class="fa-file-import">:file-import:</i></td><td><strong>Migrate from CLAUDE.md</strong></td><td>Bring your existing context files into NeoHive.</td><td><a href="context/migrate.md">context/migrate.md</a></td></tr><tr><td><i class="fa-graduation-cap">:graduation-cap:</i></td><td><strong>Teach your agent as you work</strong></td><td>Correct your agent once, and every teammate's agent remembers it.</td><td><a href="results/teach.md">results/teach.md</a></td></tr></tbody></table>
