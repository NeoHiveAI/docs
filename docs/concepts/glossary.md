---
description: "Definitions of the NeoHive terms and the less common technical terms used in these docs, in alphabetical order."
---

# Glossary

This page defines the terms that these docs use, in alphabetical order. It includes NeoHive's own terms, such as Hive and Index, and technical terms that may be new to you. To find a term, use the page outline or your browser's search. Older names for some terms are listed in [Older names](#older-names) at the end of the page.

## A

### Agent

An AI coding assistant, such as Claude Code, Cursor, or Codex. Your agent connects to a [Hive](#hive) and calls NeoHive's tools to read and store context. See [Connect your agent](../get-started/connect/README.md).

### Allowlist

The list of file patterns that a [Code Index](#code-index) or [Documentation Index](#documentation-index) includes. When the Allowlist is set, NeoHive indexes only the files that match it. Related: [Blocklist](#blocklist). See [Choose which files are included](../context/repositories/file-patterns.md).

### API

Application programming interface, the requests that a program accepts from other programs. NeoHive's webhook refresh endpoint is an API. See [Webhook refresh endpoint](../reference/webhooks.md).

### Archive

The action that moves a [Hive](#hive) to the **Archived** section of the dashboard home screen. NeoHive deletes an archived Hive after a set number of days. Until then, you can restore the Hive with its Indexes and Memories. See [Manage Hives and Indexes](../admin/manage.md).

## B

### Blocklist

The list of file patterns that a [Code Index](#code-index) or [Documentation Index](#documentation-index) leaves out. The Blocklist wins over the Allowlist: NeoHive never indexes a file that matches the Blocklist, even when the file also matches the [Allowlist](#allowlist).

## C

### Chunk

A section of an indexed file, such as a function, or a heading and its text. When part of a chunk matches a search, [recall](#recall) returns the whole chunk.

### CI

Continuous integration, a system that builds and tests your code on every push or merge, such as GitHub Actions. A CI pipeline can call the [webhook](#webhook) to sync an Index. See [Webhook refresh endpoint](../reference/webhooks.md).

### CLI

Command-line interface, a program that you run by typing commands in a terminal, such as `claude` or `codex`.

### Code Index

An [Index](#index) that holds source code from a GitHub or GitLab repository. [Sync](#sync) keeps a Code Index up to date. See [Add a code repository](../context/repositories/README.md).

### Connection

A saved GitHub or GitLab credential on the **Data Sources** page. NeoHive uses a connection to clone private repositories. The credential is a [personal access token](#personal-access-token-pat) or an SSH key. See [Data sources and credentials](../admin/data-sources.md).

### Container

The Docker container named `neohive` that runs NeoHive on your machine. The container serves the [dashboard](#dashboard) and every [MCP endpoint](#mcp-endpoint). See [How NeoHive works](how-it-works.md).

### CPU

Central processing unit, the main processor in every computer. NeoHive runs its [embedding model](#embedding-model) on the CPU when no supported GPU is available. See [GPU and CPU](../admin/gpu-cpu.md).

## D

### Dashboard

The NeoHive web interface at `http://localhost:3577`. In the dashboard, you create Hives, add Indexes, manage connections, and test queries. See [Dashboard tour](../admin/dashboard.md).

### Documentation Index

An [Index](#index) that holds docs from a GitHub or GitLab repository. [Sync](#sync) keeps a Documentation Index up to date.

## E

### Embedding

A list of numbers that captures what a piece of text means. NeoHive compares embeddings to find text with a similar meaning, even when the words differ.

### Embedding model

The model that turns text into [embeddings](#embedding). The embedding model runs on your machine, and each [Index](#index) has its own. See [GPU and CPU](../admin/gpu-cpu.md).

## F

### Files Index

An [Index](#index) that holds Markdown, text, and PDF files that you add with **File Upload**. See [Add documents and PDFs](../context/documents.md).

## G

### GPU

Graphics processing unit, a processor that runs many calculations at the same time. A GPU makes indexing faster. See [GPU and CPU](../admin/gpu-cpu.md).

## H

### Hive

A workspace in NeoHive for one codebase or team. A Hive holds [Indexes](#index) and has one [MCP endpoint](#mcp-endpoint). Every agent connected to the same Hive sees the same context. See [Hives, Indexes, and Memories](hives-indexes-memories.md).

Do not confuse a Hive with an Index. Older releases used the word "Hive" for what is now an Index. See [Older names](#older-names).

### Hook

A script that the Claude Code [plugin](#plugin) runs at a fixed point, such as when a session starts or when you send a prompt. The Cursor and Codex plugins have no hooks. See [What the plugin does automatically](../results/plugin-automation.md).

### HTTP and HTTPS

Hypertext Transfer Protocol, the rules that browsers and servers use to exchange data. HTTPS is the encrypted version of HTTP. NeoHive serves plain HTTP on port `3577`. See [Exposing NeoHive beyond your network](../security/network.md).

## I

### Importance

A number from `1` (trivial) to `10` (critical) on each [Memory](#memory). A Memory with a higher importance ranks higher in [recall](#recall). See [Memory types](../reference/memory-types.md).

### Index

One store of searchable content inside a [Hive](#hive). An Index is a [Code Index](#code-index), [Documentation Index](#documentation-index), [Files Index](#files-index), or [Knowledge Index](#knowledge-index), or a [Shared Index](#shared-index) from another Hive. Each Index has its own storage and [embedding model](#embedding-model).

Written in lowercase, "index" is the verb: NeoHive indexes a file when it splits the file into [chunks](#chunk) and stores their embeddings in an Index.

## K

### Knowledge Index

The [Index](#index) that your agents write [Memories](#memory) to. NeoHive creates one Knowledge Index with each Hive, and you cannot add a second one or share it. See [Capture team knowledge](../context/team-knowledge.md).

## L

### License seat

The right to run NeoHive on one machine at a time. The machine that runs NeoHive holds the seat. Stopping NeoHive cleanly frees the seat for another machine. See [Licensing](../admin/licensing.md).

## M

### MCP

Model Context Protocol, the open standard that your agent uses to call NeoHive's tools.

### MCP endpoint

The address that an agent connects to for one [Hive](#hive): `http://localhost:3577/hives/<hive-id>/mcp`. See [MCP tools](../reference/mcp-tools.md).

### mcp-remote

An npm package that forwards a local command to an MCP endpoint. Apps that only run local commands, such as Claude Desktop, use `mcp-remote` to reach NeoHive. See [Claude Desktop and other MCP apps](../get-started/connect/desktop-apps.md).

### Memory

One stored piece of knowledge in a [Knowledge Index](#knowledge-index), such as a convention, a decision, or a correction. Your agent stores a Memory with `memory_store`.

Written in lowercase, "memory" means the general capability, as in "the plugin tells your agent when to use memory".

### Memory type

The label on a [Memory](#memory), such as `directive`, `convention`, or `error_pattern`. The type decides which section of the recall reply the Memory appears in. See [Memory types](../reference/memory-types.md).

### Metal worker

A program that runs embedding on the GPU of an Apple Silicon Mac. Docker on a Mac cannot reach the GPU, so the installer runs the Metal worker directly on macOS, outside the [container](#container). See [GPU and CPU](../admin/gpu-cpu.md).

## O

### OCR

Optical character recognition, which reads the text in an image, such as a scanned PDF page. See [Supported file types](../reference/file-types.md).

## P

### Personal access token (PAT)

A token that you create with GitHub or GitLab to give NeoHive read access to a repository. You save the token as a [connection](#connection). See [Credentials and secrets](../security/credentials.md).

### Playground

A dashboard screen where you run the same read-only tools that your agent calls, and see exactly what each tool returns. See [Test queries in the Playground](../admin/playground.md).

### Plugin

The NeoHive package for Claude Code, Cursor, or Codex. The plugin adds a [rules file](#rules-file), [skills](#skill), and the `explore-neohive` [subagent](#subagent). In Claude Code, the plugin also adds [hooks](#hook). See [What the plugin does automatically](../results/plugin-automation.md).

## R

### Recall

Asking a [Hive](#hive) for context. Your agent recalls with `memory_recall`, or with `memory_context` at the start of a task. See [How retrieval works](retrieval.md).

### Rules file

A file of instructions that the [plugin](#plugin) installs for your agent. The rules file tells your agent when to call `memory_context`, `memory_recall`, and `memory_store`.

## S

### Session

One conversation with your agent, from your first prompt until you close it. See [A session, start to finish](../results/a-session.md).

### Shared Index

A Code, Documentation, or Files [Index](#index) that another Hive owns, added to your Hive without a copy. Your agents recall from a Shared Index but never write Memories to it. See [Manage Hives and Indexes](../admin/manage.md).

### Skill

A named task that the [plugin](#plugin) adds to your agent, such as `load-context` or `capture-session-learnings`. In Claude Code, you run a skill as a [slash command](#slash-command). In Cursor and Codex, you ask your agent to run the skill by name.

### Slash command

A command that you type in Claude Code, starting with `/`, such as `/neohive:load-context`. See [Slash commands](../reference/slash-commands.md).

### SSH

Secure Shell, a secure way to connect to another computer, such as a Git server. An SSH key proves your identity to GitHub or GitLab without a password. See [Data sources and credentials](../admin/data-sources.md).

### Subagent

A helper agent that your agent hands a task to. The NeoHive plugin includes one subagent, `explore-neohive`, which searches NeoHive before it reads files. See [What the plugin does automatically](../results/plugin-automation.md).

### Sync

The process in which NeoHive fetches the latest commits of a repository and indexes the changed files again. A sync runs on a schedule, or when you select **Trigger sync**. See [Keep a repository up to date](../context/repositories/sync.md).

## U

### URL

Uniform Resource Locator, the address of a web page or service, such as `http://localhost:3577`.

## V

### Volume

The Docker volume named `neohive-data` that holds everything NeoHive stores, including every Hive, Index, and Memory. Removing the container keeps the volume. See [Backups and restore](../admin/backups.md).

### VPN

Virtual private network, which connects your computer to a private network over the internet. A company VPN is one way to give teammates access to NeoHive. See [Access and sharing](../admin/access.md).

## W

### Webhook

An address on your Hive that a continuous integration (CI) pipeline calls to send changed files to NeoHive. NeoHive indexes those files immediately, without waiting for the next sync. See [Webhook refresh endpoint](../reference/webhooks.md).

## Older names

What used to be a **project** is now a **Hive**, and what used to be a **Hive** is now an **Index**. Older configs and scripts keep working through aliases. Use the current names in new configs and scripts.

| You may see | Current name | Still accepted |
|---|---|---|
| Project | Hive | Not applicable, dashboard label only |
| Hive, meaning one store of context | Index | Not applicable, dashboard label only |
| `list_hives` tool | `list_indexes` | Yes, as a deprecated alias |
| `hive` parameter on `memory_recall`, `memory_context`, and `memory_stats` | `index` | Yes, as a deprecated alias |
| `/projects/<id>/mcp` | `/hives/<id>/mcp` | Yes |
| `/projects/<id>/webhook/refresh` | `/hives/<id>/webhook/refresh` | Yes |

{% hint style="warning" %}
Guides written before the rename say "Hive" where they mean an Index. When an older guide tells you to choose a Hive for a query, choose an Index instead.
{% endhint %}
