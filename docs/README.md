---
description: >-
  NeoHive gives your coding agents your codebase and your team's knowledge,
  from a server you run yourself.
---

# Welcome

NeoHive gives Claude Code, Cursor, Codex, and any other MCP agent your codebase and your team's knowledge. It runs in a Docker container on your own machine.

## The problem

Your coding agent does not know your code. It does not know your conventions, the library you moved off last quarter, or that the function it just called does not exist. Every session starts from zero, and you spend the time correcting it.

Pasting code into the chat is manual every time and limited by the context window. A `CLAUDE.md` file that grows to thousands of lines gets loaded whole, whether the task needs it or not.

## What NeoHive does

NeoHive indexes your repositories and documents, stores what your team teaches the agent, and returns the relevant parts when the agent asks. Agents connect to it over MCP (Model Context Protocol, the standard way agents call outside tools).

<table data-view="cards"><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td><i class="fa-magnifying-glass">:magnifying-glass:</i></td><td><strong>Knows your codebase</strong></td><td>Indexes your repositories so your agent finds code by what it does, not by guessing file names.</td></tr><tr><td><i class="fa-book-open">:book-open:</i></td><td><strong>Keeps your team's knowledge</strong></td><td>Conventions, decisions, and debugging lessons are stored as memories. What one person teaches, everyone's agent can recall.</td></tr><tr><td><i class="fa-puzzle-piece">:puzzle-piece:</i></td><td><strong>Works with every agent</strong></td><td>Claude Code, Cursor, and Codex have plugins. Claude Desktop and any other MCP app connect to the same hive.</td></tr><tr><td><i class="fa-laptop">:laptop:</i></td><td><strong>Runs on your machine</strong></td><td>Your code, queries, and memories stay in the container. <a href="security/local-only.md">See every outbound call it makes</a>.</td></tr></tbody></table>

## Built for teams

Everyone connected to the same hive shares its memories. When one person corrects their agent or explains a convention, the next person's agent recalls it, in whichever tool they use. A teammate who joins next month gets that context on day one.

## Start here

<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><strong>Quickstart</strong></td><td>Install NeoHive and get your first answer from your own code.</td><td><a href="get-started/quickstart.md">get-started/quickstart.md</a></td></tr><tr><td><strong>How NeoHive works</strong></td><td>Hives, indexes, and how your agent reaches them.</td><td><a href="concepts/how-it-works.md">concepts/how-it-works.md</a></td></tr><tr><td><strong>Add a code repository</strong></td><td>Connect your GitHub or GitLab repositories.</td><td><a href="context/repositories/README.md">context/repositories/README.md</a></td></tr><tr><td><strong>Migrate from CLAUDE.md</strong></td><td>Bring your existing context files into NeoHive.</td><td><a href="context/migrate.md">context/migrate.md</a></td></tr></tbody></table>
