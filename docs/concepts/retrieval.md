---
description: "What happens between your agent asking a question and NeoHive answering it, and the parts you control."
---

# How retrieval works

You see what one recall does for your agent, and how you can steer it.

<figure><img src="../.gitbook/assets/concepts-retrieval.svg" alt="Three steps. Your agent calls memory_recall with a plain description. Every Index in the Hive, Code, Documentation, Files, Knowledge and any Shared Index, finds matches. One list comes back with whole sections from code, Memories and docs."><figcaption></figcaption></figure>

Your agent does not grep for file names or read files top to bottom. It describes what it needs, and NeoHive finds context that matches the meaning of that description. An exact function name or error code in the query still finds the text that contains it.

When a small part of a file matches, NeoHive returns the whole section it belongs to, so your agent gets enough text to act on. Results from every Index come back together in one ranked list, so an Index whose matches are weak is outranked by the Indexes that match well.

## Two ways to ask

| Tool | Use it for |
|---|---|
| `memory_context` | The start of a task. It returns the directives and conventions that match the task you describe, plus other Memories and indexed content that match it |
| `memory_recall` | A specific question in the middle of a task |

Both search every Index in the Hive unless you name one.

## What you control

The order of results is automatic. You steer recall through what you ask and where you ask it.

| `memory_recall` parameter | What it does |
|---|---|
| `query` | One search, written as a statement with the words you expect in the answer |
| `queries` | Up to five phrasings of the same need in one call. Different phrasings find more of what you need. Use `query` or `queries`, not both |
| `index` | Searches one Index only. Faster and more focused when you know where the answer lives |
| `types` | Returns only results of the listed types, such as `directive` and `convention`. Sections of code and documents also carry a type, which NeoHive sets when it indexes them, so they can match the filter too |
| `limit` | How many results come back. Default 10, maximum 50 |

Search the whole Hive first to see which Index answers best. Then repeat the query with `index` set to that Index.

Phrasing matters. `GitHub Actions concurrency limit workaround` finds more than `how do I fix GitHub Actions`. [Write prompts that retrieve well](../results/prompting.md) covers this.

{% hint style="warning" %}
How NeoHive orders results is internal and can change between releases. Do not write rules or prompts that depend on a particular order. How you phrase the query is what stays stable.
{% endhint %}

## Next step

Keep the terms straight with the [Glossary](glossary.md).
