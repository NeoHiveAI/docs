---
description: "What happens between your agent asking a question and NeoHive answering it, and the parts you control."
---

# How retrieval works

Recall is how your agent gets context from NeoHive while it works. The agent asks in plain words, and NeoHive answers from every Index at once: the matching code, docs, and [Memories](glossary.md#memory), in one list.

<figure><img src="../.gitbook/assets/concepts-retrieval.svg" alt="Three steps. Your agent asks with a plain description. Every Index in the Hive finds matches: Code, Documentation, Files, Knowledge, and any Shared Index. One list comes back with whole sections from code, Memories, and docs."><figcaption></figcaption></figure>

## What one recall does

Your agent describes what it needs in plain words, and NeoHive does the rest:

* **Matches meaning and exact words.** NeoHive finds the text that matches the meaning of the description, and the text that contains its exact words. So a function name or an error code in the query finds the text that contains it.
* **Includes Shared Indexes.** Any [Shared Index](glossary.md#shared-index) is searched with the rest, and one ranked list comes back. A Memory's importance, from `1` to `10`, raises its rank.
* **Returns whole sections.** When part of a document matches, NeoHive returns the whole section under that heading, so your agent has enough text to act on. When part of a code file matches, NeoHive returns the whole file. For a code file longer than about 8,000 characters, NeoHive returns the first 200 lines, with a note that names the file and its length.
* **Lists each section once**, even when several parts of it match.

Each result shows its id, type, importance, how many times it has been recalled, its tags, and the text.

## Two ways to ask

* **`memory_context`, at the start of a task.** It returns the directives and conventions that match the task you describe, and then other Memories and indexed content that match the task.
* **`memory_recall`, for a specific question in the middle of a task.**

Both tools search every Index unless you name one. In Claude Code, the plugin also calls `memory_recall` with each prompt you send. See [What the plugin does automatically](../results/plugin-automation.md).

## What you control

NeoHive sets the order. You set what to ask and where to look:

| To | Set |
|---|---|
| Find more of what you need | `queries`, with up to five phrasings of the same need. Different phrasings match different text. |
| Search one Index only | `index`. The search is faster and more focused when you know which Index holds the answer. |
| Get only certain kinds of result | `types`, such as `directive` and `convention`. NeoHive also gives each section of code and docs a type, so those sections can match too. |
| Get more or fewer results | `limit`. The default is 10. |

[MCP tools](../reference/mcp-tools.md) lists every parameter, with its default and limits.

When you do not know which Index holds the answer, search the whole Hive first to see which Index answers best. Then repeat the query with `index` set to that Index.

**Phrasing matters.** Specific terms find more than a general question:

{% columns %}
{% column %}
**Finds more**

```text
GitHub Actions concurrency limit workaround
```
{% endcolumn %}

{% column %}
**Finds less**

```text
how do I fix GitHub Actions
```
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
How NeoHive orders results is internal and can change between releases. Do not write rules or prompts that depend on a particular order. The way you phrase the query is the part you can rely on.
{% endhint %}

## Put it into practice

If your repositories and documents are already added, you can skip **Add your context** and go to [Write prompts that retrieve well](../results/prompting.md).
