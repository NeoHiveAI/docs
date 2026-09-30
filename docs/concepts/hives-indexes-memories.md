---
description: "How NeoHive organises your context: a Hive holds Indexes, and an Index holds Memories or chunks of your files."
---

# Hives, Indexes and Memories

You learn the three levels NeoHive uses, and where each piece of your context lands.

<figure><img src="../.gitbook/assets/hives-indexes-memories.svg" alt="A Hive with one MCP endpoint holds Code, Documentation, Files and Knowledge Indexes and a Shared Index. memory_recall searches all of them; memory_store and memory_forget write only to the Hive's own Knowledge Index."><figcaption></figcaption></figure>

## Hives

A Hive is a workspace: it keeps the context for one codebase or team apart from unrelated work. You create Hives in the dashboard at `http://localhost:3577`. Each Hive has one MCP endpoint, `/hives/<hive-id>/mcp`, and every agent connected to it sees the same context.

Put closely related code, such as the services in one monorepo, in one Hive. Keep unrelated codebases in separate Hives.

## Indexes

An Index holds one kind of context inside a Hive. Each Index has its own storage and its own embedding model, the model that turns text into embeddings.

| Index | Filled from | Who writes to it |
|---|---|---|
| **Code** | A GitHub or GitLab repository | NeoHive, on every sync |
| **Documentation** | Docs in a GitHub or GitLab repository | NeoHive, on every sync |
| **Files** | `.md`, `.markdown`, `.txt` and `.pdf` files you add with **File Upload** | NeoHive, on upload |
| **Knowledge** | What your agents learn as you work | Your agents, through `memory_store` |

Every Hive gets one Knowledge Index when you create it. You cannot add a second one.

Your agent never has to pick an Index. One `memory_recall` searches every Index in the Hive and returns code, docs and Memories together.

## Shared Index

A **Shared Index** is a Code, Documentation or Files Index that another Hive owns, added to yours without copying or indexing it again. Recall searches it. Your agents never write to it: `memory_store` and `memory_forget` always go to your own Knowledge Index.

An Index reaches another Hive in one of two ways:

| Who acts | What they do |
|---|---|
| The owning Hive | Clicks **Share Index…** on the Index's **Index Info** tab and adds your Hive |
| Your Hive | Clicks **+** next to **Indexes**, then **Shared Index** under **or reuse an existing Index** |

In the dashboard, a Hive that uses a Shared Index can do almost everything the owner can:

| Action | Owning Hive | Hive using it |
|---|---|---|
| Sync it, change its connection, branch, filters and embedding model | Yes | Yes |
| Delete its repository or files | Yes | Yes |
| Delete the Index, share it further, or move it | Yes | No |
| Stop using it (**Remove from Hive**) | Not applicable | Yes |

{% hint style="warning" %}
There is one Index, not a copy. Every change made from either Hive applies to both. Knowledge Indexes cannot be shared. See [Manage Hives and Indexes](../admin/manage.md).
{% endhint %}

## Memories

A Memory is one stored piece of knowledge in a Knowledge Index: a convention, a decision, a gotcha, a correction. Your agent stores one when you ask it to remember something, or when it finds something worth keeping.

| A Memory has | What it is |
|---|---|
| A type | Such as `directive`, `convention`, `decision` or `error_pattern`, picked by your agent. See [Memory types](../reference/memory-types.md) |
| Tags | Words that help later searches find it |
| An importance | From 1 to 10, default 5 |

When a Memory goes stale, your agent calls `memory_forget`. That deactivates the Memory rather than deleting it, and can name the Memory that replaces it.

Code, Documentation and Files Indexes hold chunks instead of Memories. A chunk is a section of a file, such as a function or a heading and its text.

## Next step

Continue to [How retrieval works](retrieval.md).
