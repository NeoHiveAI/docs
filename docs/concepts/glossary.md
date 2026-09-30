---
description: "Plain definitions of the terms NeoHive uses, and the older names you may still see in existing configs."
---

# Glossary

You get one line per NeoHive term, plus a map from older names to current ones.

| Term | Meaning |
|---|---|
| **Hive** | A workspace in NeoHive. It holds Indexes and has one MCP endpoint that your agents connect to. See [Hives, Indexes and Memories](hives-indexes-memories.md). |
| **Index** | One store of context inside a Hive: a Code, Documentation, Files or Knowledge Index, or a Shared Index. Each has its own storage and embedding model. |
| **Code Index** | Source code from a GitHub or GitLab repository, kept up to date by sync. |
| **Documentation Index** | Docs from a GitHub or GitLab repository, kept up to date by sync. |
| **Files Index** | Markdown, text and PDF files you add with **File Upload**. |
| **Knowledge Index** | The Index your agents write to. Every Hive has exactly one, created with the Hive. |
| **Shared Index** | A Code, Documentation or Files Index that another Hive owns, added to your Hive without a copy. Your agents recall from it but never write Memories to it. |
| **Memory** | One stored piece of knowledge in a Knowledge Index, such as a convention or a decision. |
| **Memory type** | The label on a Memory, such as `directive`, `convention` or `error_pattern`. See [Memory types](../reference/memory-types.md). |
| **Chunk** | A section of an indexed file, such as a function or a heading and its text. When part of a section matches, recall returns the whole section. |
| **Embedding** | A list of numbers that captures what a piece of text means. NeoHive compares embeddings to find text with a similar meaning, even when the words differ. |
| **Embedding model** | The model that turns text into embeddings. It runs on your machine. Each Index has its own. |
| **Recall** | Asking a Hive for context. Your agent recalls with `memory_recall`, or with `memory_context` at the start of a task. See [How retrieval works](retrieval.md). |
| **Sync** | NeoHive fetching the latest commits of a repository and indexing again the files that changed. |
| **Connection** | A saved GitHub or GitLab login on the **Data Sources** page, used to clone private repositories. See [Credentials and secrets](../security/credentials.md). |
| **MCP** | Model Context Protocol, the open standard your agent uses to call NeoHive's tools. |
| **MCP endpoint** | The address of one Hive, `http://localhost:3577/hives/<hive-id>/mcp`. |
| **Plugin** | The NeoHive package for Claude Code, Cursor or Codex. It adds rules that tell your agent when to use memory, and in Claude Code adds hooks. |
| **Hook** | A script the Claude Code plugin runs at a fixed point, such as when a session starts or when you send a prompt. See [How NeoHive works](how-it-works.md). |

## Older names

What used to be a **project** is now a **Hive**, and what used to be a **Hive** is now an **Index**. Older configs and scripts keep working through aliases. Use the current names in new ones.

| You may see | Current name | Still accepted |
|---|---|---|
| Project | Hive | Not applicable, dashboard label only |
| Hive, meaning one store of context | Index | Not applicable, dashboard label only |
| `list_hives` tool | `list_indexes` | Yes, as a deprecated alias |
| `hive` parameter on `memory_recall`, `memory_context`, `memory_stats` | `index` | Yes, as a deprecated alias |
| `/projects/<id>/mcp` | `/hives/<id>/mcp` | Yes |
| `/projects/<id>/webhook/refresh` | `/hives/<id>/webhook/refresh` | Yes |

{% hint style="warning" %}
Guides written before the rename say "Hive" where they mean an Index. When one tells you to pick a Hive for a query, pick an Index.
{% endhint %}

## Next step

Put context into your Hive. Start with [What to add, and where](../context/what-to-add.md).
