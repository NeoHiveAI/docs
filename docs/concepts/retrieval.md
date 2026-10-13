---
description: "What happens between your agent asking a question and NeoHive answering it, and the parts you control."
---

# How retrieval works

Recall is how your agent gets context from NeoHive while it works. The agent describes what it needs, and NeoHive returns the matching code, docs, and [Memories](glossary.md#memory). You cannot change how NeoHive ranks the results, but you can change what your agent asks and where it looks. Knowing what one recall does shows you which of those choices improve the results.

<figure><img src="../.gitbook/assets/concepts-retrieval.svg" alt="Three steps. Your agent calls memory_recall with a plain description. Every Index in the Hive finds matches: Code, Documentation, Files, Knowledge, and any Shared Index. One list comes back with whole sections from code, Memories, and docs."><figcaption></figcaption></figure>

## What one recall does

Your agent does not search for file names or read files from top to bottom. Instead, your agent describes what it needs, in plain words. NeoHive finds the text that matches the meaning of that description, and the text that contains its exact words. So a function name or an error code in the query finds the text that contains it.

NeoHive searches every [Index](glossary.md#index) in your [Hive](glossary.md#hive), including any [Shared Index](glossary.md#shared-index), and returns one ranked list. A Memory's importance, from `1` to `10`, raises its rank. Each result shows its id, type, importance, how many times it has been recalled, its tags, and the text.

When part of a document matches, NeoHive returns the whole section under that heading, so your agent has enough text to act on. When part of a code file matches, NeoHive returns the whole file. For a code file longer than about 8,000 characters, NeoHive returns the first 200 lines, with a note that names the file and its length. Each section appears once in the list, even when several parts of it match.

## Two ways to ask

| Tool | Use it for |
|---|---|
| `memory_context` | The start of a task. `memory_context` returns the directives and conventions that match the task you describe, and then other Memories and indexed content that match the task. |
| `memory_recall` | A specific question in the middle of a task. |

Both tools search every Index in the Hive unless you name one Index. In Claude Code, the plugin also calls `memory_recall` with each prompt you send, as [What the plugin does automatically](../results/plugin-automation.md) explains. To see what a recall returns before your agent does, run the same tools in the [Playground](../admin/playground.md).

## What you control

NeoHive sets the order of results. You control recall through what you ask and where you look. These parameters of `memory_recall` change what recall returns:

- To find more of what you need, pass up to five phrasings of the same need in `queries`. Different phrasings match different text.
- To search one Index only, set `index`. The search is faster and more focused when you know which Index holds the answer.
- To get only certain kinds of result, list them in `types`, such as `directive` and `convention`. NeoHive also gives each section of code and docs a type, so those sections can match too.
- To get more or fewer results, set `limit`. The default is 10.

[MCP tools](../reference/mcp-tools.md) lists every parameter, with its default and limits.

Search the whole Hive first to see which Index answers best. Then repeat the query with `index` set to that Index.

The phrasing of a query matters. `GitHub Actions concurrency limit workaround` finds more than `how do I fix GitHub Actions`. [Write prompts that retrieve well](../results/prompting.md) covers phrasing in more detail.

{% hint style="warning" %}
How NeoHive orders results is internal and can change between releases. Do not write rules or prompts that depend on a particular order. The way you phrase the query is the part you can rely on.
{% endhint %}
