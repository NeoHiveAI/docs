---
description: >-
  NeoHive gives your coding agents your codebase and your team's knowledge,
  from a server you run yourself.
---

# Welcome

NeoHive gives your coding agents your codebase and your team's knowledge. NeoHive works with Claude Code, Cursor, Codex, and any other agent that supports MCP (Model Context Protocol, the standard way agents call outside tools). NeoHive runs in a Docker container on your own machine or a shared server.

## The problem

Your coding agent does not know your code. It does not know your conventions, the library you moved off last quarter, or that a function it called does not exist. Each session starts with no knowledge of your project, and you spend the time correcting the agent.

You can paste code into the chat, but you have to do it every time. The agent can also read only a limited amount of text at once (its context window). A `CLAUDE.md` file can grow to thousands of lines, and the agent loads the whole file whether the task needs it or not.

## What NeoHive does

NeoHive indexes your repositories and documents, and stores what your team teaches the agent. When the agent asks, NeoHive returns the relevant parts. Your content lives in a [Hive](concepts/glossary.md#hive), a workspace for your team. Each Hive holds Indexes, the stores for your code, documents, files, and Memories. Agents connect to the Hive over MCP.

<table data-view="cards"><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td><i class="fa-magnifying-glass">:magnifying-glass:</i></td><td><strong>Knows your codebase</strong></td><td>NeoHive indexes your repositories, so your agent finds code by what it does, not by guessing file names.</td></tr><tr><td><i class="fa-book-open">:book-open:</i></td><td><strong>Keeps your team's knowledge</strong></td><td>NeoHive stores conventions, decisions, and debugging lessons as Memories. Everyone's agent can recall what one person teaches.</td></tr><tr><td><i class="fa-puzzle-piece">:puzzle-piece:</i></td><td><strong>Works with every agent</strong></td><td>Claude Code, Cursor, and Codex have plugins. Claude Desktop and any other MCP app connect to the same Hive.</td></tr><tr><td><i class="fa-laptop">:laptop:</i></td><td><strong>Runs on your machine</strong></td><td>Your code, queries, and Memories stay in the container. <a href="security/local-only.md">See every outbound call NeoHive makes</a>.</td></tr></tbody></table>

## Built for teams

Everyone connected to the same Hive shares its Memories. When one person corrects their agent or explains a convention, the agent saves that lesson as a Memory. The next person's agent recalls the Memory in whichever tool they use. A teammate who joins next month gets that context on their first day.

## Start here

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Quickstart</strong></td><td>Install NeoHive and get your first answer from your own code.</td><td><a href="get-started/quickstart.md">get-started/quickstart.md</a></td></tr><tr><td><strong>How NeoHive works</strong></td><td>Learn about Hives, Indexes, and how your agent reaches them.</td><td><a href="concepts/how-it-works.md">concepts/how-it-works.md</a></td></tr><tr><td><strong>Add a code repository</strong></td><td>Connect your GitHub or GitLab repositories.</td><td><a href="context/repositories/README.md">context/repositories/README.md</a></td></tr><tr><td><strong>Migrate from CLAUDE.md</strong></td><td>Bring your existing context files into NeoHive.</td><td><a href="context/migrate.md">context/migrate.md</a></td></tr></tbody></table>
