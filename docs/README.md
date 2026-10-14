---
description: >-
  NeoHive gives your coding agents your codebase and your team's knowledge,
  from a server you run yourself.
---

# Welcome

**Coding agents that share what your whole team knows.**

NeoHive is a self-hosted context layer. Connect your repositories, documents, and team knowledge once, and every agent on your team reads the same memory: Claude Code, Cursor, Codex, or any other agent that supports [MCP](concepts/glossary.md#mcp). Fix something once, and it is fixed for everyone.

The memory keeps itself current as your repositories change, and it gets better the more your team uses it. Each agent gets only the context its task needs, instead of a context file that grows with every lesson. And all of it runs inside your own network, so your code never leaves it.

## Start here

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><i class="fa-rocket">:rocket:</i></td><td><strong>Quickstart</strong></td><td>Install NeoHive and get your first answer from your own code.</td><td><a href="get-started/quickstart.md">get-started/quickstart.md</a></td></tr><tr><td><i class="fa-comments">:comments:</i></td><td><strong>Your first session</strong></td><td>Ask about your code, teach one convention, and see it come back next session.</td><td><a href="get-started/first-session.md">get-started/first-session.md</a></td></tr><tr><td><i class="fa-diagram-project">:diagram-project:</i></td><td><strong>How NeoHive works</strong></td><td>Hives, Indexes, and how your agent reaches them.</td><td><a href="concepts/how-it-works.md">concepts/how-it-works.md</a></td></tr><tr><td><i class="fa-code-branch">:code-branch:</i></td><td><strong>Add a code repository</strong></td><td>Connect your GitHub or GitLab repositories.</td><td><a href="context/repositories/README.md">context/repositories/README.md</a></td></tr><tr><td><i class="fa-file-import">:file-import:</i></td><td><strong>Migrate from CLAUDE.md</strong></td><td>Bring your existing context files into NeoHive.</td><td><a href="context/migrate.md">context/migrate.md</a></td></tr><tr><td><i class="fa-graduation-cap">:graduation-cap:</i></td><td><strong>Teach your agent as you work</strong></td><td>Correct your agent once, and every teammate's agent remembers it.</td><td><a href="results/teach.md">results/teach.md</a></td></tr></tbody></table>

## Why it exists

* **Every agent starts from zero.** It does not know your codebase, your conventions, or the library you moved off last quarter.
* **Every developer teaches their own.** A correction made in one person's Claude Code never reaches a teammate's Cursor.
* **Context files do not scale.** A `CLAUDE.md` grows to thousands of lines, and the agent loads all of it whether the task needs it or not.
* **The reasoning gets lost first.** Why a decision was made is the thing nobody writes down, and the thing the next agent most needs.

NeoHive indexes your repositories and documents, keeps what your team teaches the agent beside the code it applies to, and returns only the parts the current task needs. Your content lives in a [Hive](concepts/glossary.md#hive), your team's workspace. A Hive holds [Indexes](concepts/glossary.md#index), the stores for your code, documents, files, and [Memories](concepts/glossary.md#memory).

## What NeoHive does

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td><i class="fa-magnifying-glass">:magnifying-glass:</i></td><td><strong>Knows your codebase</strong></td><td>NeoHive indexes your repositories, so your agent finds code by what it does, not by guessing file names.</td><td><a href="concepts/retrieval.md">concepts/retrieval.md</a></td></tr><tr><td><i class="fa-file-lines">:file-lines:</i></td><td><strong>Reads your documents</strong></td><td>Upload specs, runbooks, and PDFs to a Files Index. Your agent recalls them the same way it recalls code.</td><td><a href="context/documents.md">context/documents.md</a></td></tr><tr><td><i class="fa-arrows-rotate">:arrows-rotate:</i></td><td><strong>Stays up to date</strong></td><td>NeoHive syncs your repositories on a schedule. Each sync indexes only the files that changed.</td><td><a href="context/repositories/sync.md">context/repositories/sync.md</a></td></tr><tr><td><i class="fa-book-open">:book-open:</i></td><td><strong>Keeps your team's knowledge</strong></td><td>NeoHive stores conventions, decisions, and debugging lessons as Memories. Everyone's agent can recall what one person teaches.</td><td><a href="context/team-knowledge.md">context/team-knowledge.md</a></td></tr><tr><td><i class="fa-puzzle-piece">:puzzle-piece:</i></td><td><strong>Works with every agent</strong></td><td>Claude Code, Cursor, and Codex have plugins. Claude Desktop and any other MCP app connect to the same Hive.</td><td><a href="get-started/connect/README.md">get-started/connect/README.md</a></td></tr><tr><td><i class="fa-laptop">:laptop:</i></td><td><strong>Runs on your machine</strong></td><td>Your code, documents, Memories, and queries stay on the machine NeoHive runs on. None of it goes to an outside service.</td><td><a href="security/local-only.md">security/local-only.md</a></td></tr></tbody></table>

## Built for teams

* **One Hive, every agent.** Each teammate's agent reads from the same Hive, whichever tool they use.
* **Teach once.** When you correct your agent or explain a convention, it saves the lesson as a [Memory](concepts/glossary.md#memory). Every teammate's agent recalls it.
* **Nothing is lost when people change.** A teammate who joins next month gets the same lessons on their first day.
