---
description: "How NeoHive organizes your context: a Hive holds Indexes, and an Index holds Memories or chunks of your files."
---

# Hives, Indexes, and Memories

One Hive is one shared memory: every agent connected to the Hive sees the same context, in every tool. NeoHive organizes that context in three levels:

* A **Hive** is a workspace for one codebase or team.
* An **Index** stores one kind of content inside a Hive, such as your code.
* A **Memory** is one lesson that your agent stores, such as a convention.

For more information about which Index to use for each kind of content, see [What to add, and where](../context/what-to-add.md). The following diagram shows one Hive and its Indexes:

<figure><img src="../.gitbook/assets/hives-indexes-memories.svg" alt="A Hive holds Code, Documentation, Files, and Knowledge Indexes and a Shared Index. Recall searches them all. Memory writes go only to the Knowledge Index."><figcaption></figcaption></figure>

## Hives

A Hive keeps the context for one codebase or team separate from unrelated work. Each Hive has one [MCP](glossary.md#mcp) endpoint, and every agent connected to that endpoint shares the Hive's context. A convention that one teammate teaches comes back for everyone. Put closely related code, such as the services in one monorepo, in one Hive. Keep unrelated codebases in separate Hives.

## Indexes

An Index holds one kind of content inside a Hive, with its own storage and its own [embedding model](glossary.md#embedding-model). The following table shows each kind of Index:

| Index | What it holds | Who writes to it |
|---|---|---|
| **Code** | The source code of a GitHub or GitLab repository | NeoHive, on every sync |
| **Documentation** | The docs in a GitHub or GitLab repository | NeoHive, on every sync |
| **Files** | Documents, PDFs, and images that you add with **File Upload** | NeoHive, on each upload |
| **Knowledge** | What your agents learn as you work | Your agents, through `memory_store` |

NeoHive creates one Knowledge Index with each Hive, and you cannot add a second one.

Your agent does not need to choose an Index. One `memory_recall` call searches every Index in the Hive and returns code, docs, and Memories together. For more information about what one recall does, see [How retrieval works](retrieval.md).

## Shared Index

A Shared Index is a Code, Documentation, or Files Index that another Hive owns. NeoHive adds the Shared Index to your Hive without copying the Index or indexing its files again.

Recall searches the Shared Index, but your agents do not write to the Shared Index. `memory_store` and `memory_forget` write only to your own Knowledge Index. You cannot share a Knowledge Index. You can share an Index from the Hive that owns the Index, or add another Hive's Index from your own Hive. To share or add an Index, see [Share an Index between Hives](../admin/manage.md#share-an-index-between-hives).

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

A Memory is one stored piece of knowledge in a Knowledge Index. Examples are a convention, a decision, a correction, or a problem to watch out for. A Memory also keeps the reasoning behind a choice, so teammates can find that reasoning later.

Your agent stores a Memory when the agent finds something worth keeping on its own. The agent also stores a Memory when you ask the agent to remember something, for example:

> Remember that we always use snake_case for database column names.

Each Memory has:

* A type, a label such as `directive`, `convention`, `decision`, or `error_pattern`. Your agent chooses the type. For more information about each type, see [Memory types](../reference/memory-types.md).
* Tags, words that help later searches find the Memory.
* An importance, a number from `1` to `10`. The default is `5`, and a higher number helps the Memory rank higher in recall.

When a Memory is out of date, your agent calls `memory_forget`. `memory_forget` deactivates the Memory instead of deleting the Memory, so recall stops returning that Memory. The call can also name the newer Memory that replaces the old one. To tell your agent that a Memory is out of date, see [Teach your agent as you work](../results/teach.md).

Code, Documentation, and Files Indexes hold [chunks](glossary.md#chunk) instead of Memories. A chunk is a section of a file, such as a function, or a heading and its text. NeoHive gives each chunk a type and an importance too. A rule written in a README can then come back from recall like a Memory.
