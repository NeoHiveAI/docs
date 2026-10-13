---
description: "How NeoHive organizes your context: a Hive holds Indexes, and an Index holds Memories or chunks of your files."
---

# Hives, Indexes, and Memories

NeoHive organizes everything your agent can recall in three levels. A Hive is a workspace for one codebase or team. Each Index in a Hive stores one kind of content, such as your code. A Memory is one lesson that your agent stores, such as a convention.

The levels decide what your agent searches and where the agent saves what it learns. This page explains each level, what each kind of Index holds, and what happens when two Hives use one Index. For which Index to use for each kind of content, see [What to add, and where](../context/what-to-add.md).

<figure><img src="../.gitbook/assets/hives-indexes-memories.svg" alt="A Hive with one MCP endpoint holds Code, Documentation, Files, and Knowledge Indexes, plus a Shared Index. memory_recall searches all of them; memory_store and memory_forget write only to the Hive's own Knowledge Index."><figcaption></figcaption></figure>

## Hives

A Hive is a workspace that keeps the context for one codebase or team separate from unrelated work. You create Hives in the dashboard at `http://localhost:3577`. Each Hive has one [MCP](glossary.md#mcp) endpoint, `/hives/<hive-id>/mcp`, and every agent connected to that endpoint sees the same context.

Put closely related code, such as the services in one monorepo, in one Hive. Keep unrelated codebases in separate Hives.

## Indexes

An Index holds one kind of content inside a Hive. Each Index has its own storage and its own embedding model. An embedding model turns text into embeddings, which are lists of numbers that capture what the text means.

| Index | What it holds | Who writes to it |
|---|---|---|
| **Code** | The source code of a GitHub or GitLab repository | NeoHive, on every sync |
| **Documentation** | The docs in a GitHub or GitLab repository | NeoHive, on every sync |
| **Files** | `.md`, `.markdown`, `.txt`, and `.pdf` files that you add with **File Upload** | NeoHive, on each upload |
| **Knowledge** | What your agents learn as you work | Your agents, through `memory_store` |

NeoHive creates one Knowledge Index with each Hive. You cannot add a second one.

Your agent does not need to choose an Index. One `memory_recall` call searches every Index in the Hive and returns code, docs, and Memories together. [How retrieval works](retrieval.md) explains what one recall does.

## Shared Index

A Shared Index is a Code, Documentation, or Files Index that another Hive owns. NeoHive adds the Shared Index to your Hive without copying it or indexing its files again. Recall searches the Shared Index, but your agents never write to it. `memory_store` and `memory_forget` always write to your own Knowledge Index. You cannot share a Knowledge Index.

You can share an Index from the Hive that owns it, or add another Hive's Index from your own Hive. For the steps, see [Share an Index between Hives](../admin/manage.md#share-an-index-between-hives).

A Hive that uses a Shared Index can change almost everything that the owning Hive can change:

| Action | Owning Hive | Hive that uses the Index |
|---|---|---|
| Sync the Index, or change its connection, branch, file patterns, and embedding model | Yes | Yes |
| Delete repositories or files from the Index | Yes | Yes |
| Delete the Index | Yes, after every other Hive stops using it | No |
| Share the Index with another Hive, or move it | Yes | No |
| Stop using the Index (**Remove from Hive**) | Not applicable | Yes |

{% hint style="warning" %}
Both Hives use the same Index, not a copy. A change made from either Hive applies to both.
{% endhint %}

## Memories

A Memory is one stored piece of knowledge in a Knowledge Index, such as a convention, a decision, a correction, or a problem to watch out for. Your agent stores a Memory when you ask it to remember something, and when it finds something worth keeping on its own.

| Each Memory has | What it is |
|---|---|
| A type | A label such as `directive`, `convention`, `decision`, or `error_pattern`. Your agent chooses the type. [Memory types](../reference/memory-types.md) lists every type. |
| Tags | Words that help later searches find the Memory. |
| An importance | A number from `1` to `10`. The default is `5`, and a higher number helps the Memory rank higher in recall. |

When a Memory is out of date, your agent calls `memory_forget`. `memory_forget` deactivates the Memory instead of deleting it, so recall stops returning it. The call can also name the newer Memory that replaces the old one. [Teach your agent as you work](../results/teach.md) shows what to say to your agent.

Code, Documentation, and Files Indexes hold chunks instead of Memories. A chunk is a section of a file, such as a function, or a heading and its text. NeoHive gives each chunk a type and an importance too, so a rule written in a README can come back from recall like a Memory does.
