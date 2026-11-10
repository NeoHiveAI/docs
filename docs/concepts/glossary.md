---
description: "Definitions of the NeoHive terms and the less common technical terms used in these docs, in alphabetical order."
---

# Glossary

Each entry defines a NeoHive term, such as Hive or Index, or a less common technical term in these docs. The entries are in alphabetical order. To find a term, use the page outline or your browser's search.

## A

### Agent

An AI coding assistant, such as Claude Code, Cursor, or Codex. Your agent connects to a [Hive](#hive) and calls NeoHive's tools to read and store context. For more information, see [Connect your agent](../get-started/connect/README.md).

### Allowlist

The list of file patterns that a [Code Index](#code-index) or [Documentation Index](#documentation-index) includes. When the Allowlist is set, NeoHive indexes only the files that match it. For the patterns that NeoHive leaves out, see [Blocklist](#blocklist), and for how to set both lists, see [Choose which files are included](../context/repositories/file-patterns.md).

### API

Application programming interface, the requests that a program accepts from other programs. NeoHive's webhook refresh endpoint is an API. For more information, see [Webhook refresh endpoint](../reference/webhooks.md).

### Archive

The action that moves a [Hive](#hive) to the **Archived** section of the dashboard home screen. NeoHive deletes an archived Hive after 30 days. Until then, you can restore the Hive with its Indexes and Memories. For more information, see [Manage Hives and Indexes](../admin/manage.md).

## B

### Blocklist

The list of file patterns that a [Code Index](#code-index) or [Documentation Index](#documentation-index) leaves out. The Blocklist wins over the Allowlist: NeoHive never indexes a file that matches the Blocklist, even when the file also matches the [Allowlist](#allowlist). For more information, see [Choose which files are included](../context/repositories/file-patterns.md).

## C

### Chunk

A section of an indexed file, such as a function, or a heading and its text. Code, Documentation, and Files Indexes hold chunks. For more information, see [Hives, Indexes, and Memories](hives-indexes-memories.md).

### CI

Continuous integration, a system that builds and tests your code on every push or merge, such as GitHub Actions. A CI pipeline can call the [webhook](#webhook) to sync an Index. For more information, see [Webhook refresh endpoint](../reference/webhooks.md).

### CLI

Command-line interface, a program that you run by entering commands in a terminal, such as `claude` or `codex`.

### Code Index

An [Index](#index) that holds source code from a Git repository, such as one on GitHub or GitLab. [Sync](#sync) keeps a Code Index up to date. For more information, see [Add a repository](../context/repositories/README.md).

### Connection

A saved credential for a service, such as GitHub or GitLab, on the **Data Sources** page. NeoHive uses a connection to list, clone, and sync your repositories. The credential is a [personal access token](#personal-access-token-pat) or an SSH key. For more information, see [Data sources and credentials](../admin/data-sources.md).

### Container

The Docker container named `neohive` that runs NeoHive, on your machine or a shared server. The container serves the [dashboard](#dashboard) and every [MCP endpoint](#mcp-endpoint). For more information, see [How NeoHive works](how-it-works.md).

### CPU

Central processing unit, the main processor in every computer. NeoHive runs its [embedding model](#embedding-model) on the CPU when no supported GPU is available. For more information, see [GPU and CPU](../admin/gpu-cpu.md).

## D

### Dashboard

The NeoHive web interface, which opens in your browser at the address the installer prints, `http://localhost:3577` by default. In the dashboard, you create Hives, add Indexes, and manage connections. For more information, see [Dashboard tour](../admin/dashboard.md).

### Documentation Index

An [Index](#index) that holds docs from a Git repository, such as one on GitHub or GitLab. [Sync](#sync) keeps a Documentation Index up to date. For more information, see [Add a repository](../context/repositories/README.md).

## E

### Embedding

A list of numbers that captures what a piece of text means. NeoHive compares embeddings to find text with a similar meaning, even when the words differ.

### Embedding model

The model that turns text into [embeddings](#embedding). The embedding model runs where NeoHive runs, and each [Index](#index) has its own. For more information, see [Embedding models](../admin/embedding-models.md).

## F

### Files Index

An [Index](#index) that holds documents, PDFs, and images that you add with **File Upload**. For more information, see [Add documents and images](../context/documents.md).

## G

### GPU

Graphics processing unit, a processor that runs many calculations at the same time. A GPU makes indexing faster. For more information, see [GPU and CPU](../admin/gpu-cpu.md).

## H

### Hive

A workspace in NeoHive for one codebase or team. A Hive holds [Indexes](#index) and has one [MCP endpoint](#mcp-endpoint). Every agent connected to the same Hive sees the same context. For more information, see [Hives, Indexes, and Memories](hives-indexes-memories.md).

### Hook

A script that the Claude Code [plugin](#plugin) runs at a fixed point, such as when a session starts or when you send a prompt. Only the Claude Code plugin has hooks. For more information, see [What the plugin does automatically](../results/plugin-automation.md).

### HTTP and HTTPS

Hypertext Transfer Protocol, the rules that browsers and servers use to exchange data. HTTPS is the encrypted version of HTTP. NeoHive serves plain HTTP on port `3577` by default. For more information, see [Expose NeoHive beyond your network](../security/network.md).

## I

### Importance

A number from `1` (trivial) to `10` (critical) on each [Memory](#memory) and [chunk](#chunk). A result with a higher importance ranks higher in [recall](#recall). For more information, see [Importance](../reference/memory-types.md#importance).

### Index

One store of searchable content inside a [Hive](#hive). An Index is a [Code Index](#code-index), [Documentation Index](#documentation-index), [Files Index](#files-index), or [Knowledge Index](#knowledge-index), or a [Shared Index](#shared-index) from another Hive. Each Index has its own [embedding model](#embedding-model). For more information, see [Hives, Indexes, and Memories](hives-indexes-memories.md).

Written in lowercase, "index" is the verb: NeoHive indexes a file when it splits the file into [chunks](#chunk) and stores their embeddings in an Index.

## K

### Knowledge Index

The [Index](#index) that your agents write [Memories](#memory) to. NeoHive creates one Knowledge Index with each Hive, and you cannot add a second one or share it. For more information, see [Capture team knowledge](../context/team-knowledge.md).

## L

### License key

The key in your NeoHive license file that activates NeoHive. The installer reads the key from the license file, and you can replace it later. For more information, see [Licensing](../admin/licensing.md).

### License seat

The right to run NeoHive on one machine at a time. The machine that runs NeoHive holds the seat. Stopping NeoHive cleanly frees the seat for another machine. For more information, see [Licensing](../admin/licensing.md).

## M

### MCP

Model Context Protocol, the open standard that your agent uses to call NeoHive's tools.

### MCP endpoint

The address that an agent connects to for one [Hive](#hive). The address ends in `/hives/<hive-id>/mcp`. For more information, see [MCP tools](../reference/mcp-tools.md).

### mcp-remote

An npm package that forwards a local command to an MCP endpoint. Apps that only run local commands, such as Claude Desktop, use `mcp-remote` to reach NeoHive. For more information, see [Claude Desktop and other MCP apps](../get-started/connect/desktop-apps.md).

### Memory

One note that your agent saves in a [Knowledge Index](#knowledge-index), such as a convention, a decision, or a correction. Your agent stores a Memory with `memory_store`. For more information, see [Hives, Indexes, and Memories](hives-indexes-memories.md).

Written in lowercase, "memory" means the general capability, as in "the plugin tells your agent when to use memory".

### Memory type

The label on a [Memory](#memory), such as `directive`, `convention`, or `error_pattern`. The type decides whether `memory_context` returns the Memory, and in which section. For more information, see [Memory types](../reference/memory-types.md).

### Metal worker

A program that runs embedding on the GPU of an Apple Silicon Mac. Docker on a Mac cannot reach the GPU, so the installer runs the Metal worker directly on macOS, outside the [container](#container). For more information, see [GPU and CPU](../admin/gpu-cpu.md).

## O

### OCR

Optical character recognition, which reads the text in an image, such as a scanned PDF page. For more information, see [Supported file types](../reference/file-types.md).

## P

### Personal access token (PAT)

A token that you create on a service, such as GitHub or GitLab, to give NeoHive read access to a repository. You save the token as a [connection](#connection). For more information, see [Credentials and secrets](../security/credentials.md).

### Plugin

The NeoHive package for your agent, such as Claude Code, Cursor, or Codex. The plugin adds a [rules file](#rules-file) and [skills](#skill). In Claude Code, the plugin also adds [hooks](#hook) and the `explore-neohive` [subagent](#subagent). For more information, see [What the plugin does automatically](../results/plugin-automation.md).

## R

### Recall

Asking a [Hive](#hive) for context. Your agent recalls with `memory_recall`, or with `memory_context` at the start of a task. For more information, see [How retrieval works](retrieval.md).

### Rules file

A file of instructions that the [plugin](#plugin) installs for your agent. The rules file tells your agent when to call `memory_context`, `memory_recall`, and `memory_store`. For more information, see [What the plugin does automatically](../results/plugin-automation.md).

## S

### Session

One conversation with your agent, from your first prompt until you close it. For more information, see [A session, start to finish](../results/a-session.md).

### Shared Index

A Code, Documentation, or Files [Index](#index) that another Hive owns, added to your Hive without a copy. Your agents recall from a Shared Index but never write Memories to it. For more information, see [Shared Index](hives-indexes-memories.md#shared-index).

### Skill

A named task that the [plugin](#plugin) adds to your agent, such as `load-context` or `capture-session-learnings`. In Claude Code, you run a skill as a [slash command](#slash-command). In other agents, you ask your agent to run the skill by name. For more information, see [Slash commands](../reference/slash-commands.md).

### Slash command

A command that you enter in your agent's chat, starting with `/`. In Claude Code, the plugin adds the `/neohive:` commands, such as `/neohive:load-context`. For more information, see [Slash commands](../reference/slash-commands.md).

### SSH

Secure Shell, a secure way to connect to another computer, such as a Git server. An SSH key proves your identity to a Git service, such as GitHub or GitLab, without a password. For more information, see [Data sources and credentials](../admin/data-sources.md).

### Subagent

A helper agent that your agent hands a task to. The Claude Code plugin includes one subagent, `explore-neohive`, which searches NeoHive before it reads files. For more information, see [What the plugin does automatically](../results/plugin-automation.md).

### Sync

The process in which NeoHive fetches the latest commits of a repository and indexes the changed files again. A sync runs on a schedule, or when you click **Trigger sync**. For more information, see [Keep a repository up to date](../context/repositories/sync.md).

## U

### URL

Uniform Resource Locator, the address of a web page or service, such as `https://docs.neohive.ai`.

## V

### Volume

The Docker volume named `neohive-data` that holds everything NeoHive stores, including every Hive, Index, and Memory. Removing the container keeps the volume. For more information, see [Backups and restore](../admin/backups.md).

### VPN

Virtual private network, which connects your computer to a private network over the internet. A company VPN is one way to give teammates access to NeoHive. For more information, see [Access and sharing](../admin/access.md).

## W

### Webhook

An address on your Hive that a CI pipeline calls to send changed files to NeoHive. NeoHive indexes those files immediately, without waiting for the next sync. For more information, see [Webhook refresh endpoint](../reference/webhooks.md).
