---
description: "Plain definitions of the terms NeoHive uses, and the older names you may still see in existing configs."
---

# Glossary

You get one line per NeoHive term, plus a map from older names to current ones.

| Term | Meaning |
|---|---|
| **Hive** | A workspace in NeoHive. It holds indexes and has one MCP endpoint that your agents connect to. See [Hives, indexes and memories](hives-indexes-memories.md). |
| **Index** | One store of context inside a hive: a Code, Documentation, Files or Knowledge index, or a Shared Index. Each has its own storage and embedding model. |
| **Code index** | Source code from a GitHub or GitLab repository, kept up to date by sync. |
| **Documentation index** | Docs from a GitHub or GitLab repository, kept up to date by sync. |
| **Files index** | Markdown, text and PDF files you add with **File Upload**. |
| **Knowledge index** | The index your agents write to. Every hive has exactly one, created with the hive. |
| **Shared Index** | An index another hive set up, added to your hive without a copy. Your agents recall from it but never write memories to it. |
| **Memory** | One stored piece of knowledge in a Knowledge index, such as a convention or a decision. |
| **Memory type** | The label on a memory, such as `directive`, `convention` or `error_pattern`. See [Memory types](../reference/memory-types.md). |
| **Chunk** | A section of an indexed file, such as a function or a heading and its text. When part of a section matches, recall returns the whole section. |
| **Embedding** | A list of numbers that captures what a piece of text means. NeoHive compares embeddings to find text with a similar meaning, even when the words differ. |
| **Embedding model** | The model that turns text into embeddings. It runs on your machine. Each index has its own. |
| **Recall** | Asking a hive for context. Your agent recalls with `memory_recall`, or with `memory_context` at the start of a task. See [How retrieval works](retrieval.md). |
| **Sync** | NeoHive fetching the latest commits of a repository and indexing again the files that changed. |
| **Connection** | A saved GitHub or GitLab login on the **Data Sources** page, used to clone private repositories. See [Credentials and secrets](../security/credentials.md). |
| **MCP** | Model Context Protocol, the open standard your agent uses to call NeoHive's tools. |
| **MCP endpoint** | The address of one hive, `http://localhost:3577/hives/<hive-id>/mcp`. |
| **Plugin** | The NeoHive package for Claude Code, Cursor or Codex. It adds rules that tell your agent when to use memory, and in Claude Code adds hooks. |
| **Hook** | A script the Claude Code plugin runs at a fixed point, such as when a session starts or when you send a prompt. See [How NeoHive works](how-it-works.md). |

## Older names

What used to be a **project** is now a **hive**, and what used to be a **hive** is now an **index**. Older configs and scripts keep working through aliases. Use the current names in new ones.

| You may see | Current name | Still accepted |
|---|---|---|
| Project | Hive | Not applicable, dashboard label only |
| Hive, meaning one store of context | Index | Not applicable, dashboard label only |
| `list_hives` tool | `list_indexes` | Yes, as a deprecated alias |
| `hive` parameter on `memory_recall`, `memory_context`, `memory_stats` | `index` | Yes, as a deprecated alias |
| `/projects/<id>/mcp` | `/hives/<id>/mcp` | Yes |
| `/projects/<id>/webhook/refresh` | `/hives/<id>/webhook/refresh` | Yes |

{% hint style="warning" %}
Guides written before the rename say "hive" where they mean an index. When one tells you to pick a hive for a query, pick an index.
{% endhint %}

## Next step

Put context into your hive. Start with [What to add, and where](../context/what-to-add.md).
