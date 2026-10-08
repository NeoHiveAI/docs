---
description: "The MCP tools each NeoHive Hive exposes, with every parameter, type, and default."
---

# MCP tools

A [Hive](../concepts/glossary.md#hive) is a NeoHive workspace that holds your [Indexes](../concepts/glossary.md#index). This page lists every tool your agent can call on a Hive, the parameters each tool takes, and what each tool returns.

Each Hive serves these tools at its [MCP](../concepts/glossary.md#mcp) endpoint, `http://localhost:3577/hives/<hive-id>/mcp`, over Streamable HTTP.

| Tool | What it does | Writes? |
|---|---|---|
| `list_indexes` | Lists the Hive's Indexes with each one's id, name, type, status, embedding model, and description. | No |
| `memory_recall` | Searches the Hive's Indexes by meaning and keywords and returns the most relevant code, docs, and [Memories](../concepts/glossary.md#memory). | No |
| `memory_context` | Returns the rules closest to your task plus other Memories related to it. | No |
| `memory_stats` | Reports Memory counts by type, the most and least accessed Memories, and the oldest and newest. | No |
| `memory_store` | Saves a new Memory to the Hive's [Knowledge Index](../concepts/glossary.md#knowledge-index). | Yes |
| `memory_forget` | Deactivates a Memory so recall stops returning it. | Yes |

The read tools take an optional `index`. Leave it out to cover every Index in the Hive. The write tools take no `index`: they always write to the Hive's own Knowledge Index, even when you read from a [Shared Index](../concepts/glossary.md#shared-index). You can run the read tools manually in the [Playground](../admin/playground.md).

## memory_recall

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `query` | string | none | One search query. Pass this or `queries`, not both. |
| `queries` | string list | none | One to five phrasings of the same search. NeoHive merges their results into one list. |
| `limit` | integer | `10` | The maximum number of results, from `1` to `50`. |
| `types` | string list | all types | Return only these [Memory types](memory-types.md). |
| `index` | string | all Indexes | The id of one Index to search. |
| `noAccessUpdate` | boolean | `false` | When `true`, the search does not count as a recall. The access count of the Memories it returns stays the same. Use this option for automated callers. |

Each result starts with a heading that contains the Memory's id, such as `### Memory #1 (id: 482, ...)`, then its type, importance, access count, and tags. Pass the `id` to `memory_forget`. NeoHive cuts off a result longer than 8,000 characters and adds a `(truncated, ...)` note.

## memory_context

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `task` | string | required | A description of what you are about to work on, using specific terms. |
| `index` | string | all Indexes | The id of one Index to load from. |

The reply has two sections: `## Directives & Conventions` and `## Task-Relevant Context`. [Memory types](memory-types.md) shows which types appear in each section. If nothing matches, the reply is `No relevant context found. This may be a new topic area.`

## memory_stats

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `index` | string | all Indexes | The id of one Index to report on. |

Without `index`, the reply lists only the total number of Memories and the counts by type for each Index. The most and least accessed Memories and the oldest and newest Memory appear only when you pass `index`.

## memory_store

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `content` | string | required | The knowledge to store, written so it makes sense on its own later. |
| `type` | string | required | One of the [Memory types](memory-types.md). |
| `importance` | integer | `5` | `1` (trivial) to `10` (critical). Higher importance helps a Memory rank higher. |
| `tags` | string list | none | Labels that help later searches find the Memory. |
| `format` | string | `auto` | How to split content of 6,000 characters or more: `auto`, `markdown`, `code`, `DSL`, or `text`. `auto` detects the format. NeoHive stores shorter content whole. |

The reply is `Memory stored successfully (id: <id>, type: <type>, importance: <n>, Index: <index-id>)`. You can search for the Memory immediately.

## memory_forget

| Parameter | Type | Default | Notes |
|---|---|---|---|
| `memory_id` | integer | required | The id of the Memory to deactivate. |
| `reason` | string | none | Why you are retiring the Memory. |
| `superseded_by` | integer | none | The id of the Memory that replaces this one. |

The reply is `Memory #<id> has been deactivated (Index: <index-id>).`, followed by the reason and replacement if you gave them. `memory_forget` deactivates a Memory but does not erase it. Recall stops returning the Memory, but the Memory stays in the database.

## list_indexes

`list_indexes` takes no parameters. Each line of the reply shows the Index id, name, type, status, and embedding model. An Index shared into your Hive shows `shared_from: <owner hive>` and `access: read-only`. You can recall from a Shared Index but not write to it.

<details>

<summary>Deprecated names that still work</summary>

| Deprecated | Use instead |
|---|---|
| `list_hives` tool | `list_indexes` |
| `hive` parameter on `memory_recall`, `memory_context`, `memory_stats` | `index` |

</details>
