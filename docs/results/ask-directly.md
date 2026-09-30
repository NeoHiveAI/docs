---
description: "Ask your agent outright what your hive knows, instead of waiting for it to search on its own."
---

# Ask for context directly

Ask what the hive knows before any code is written. Your agent then starts from your team's decisions and gotchas.

| You want | Ask something like | Your agent calls |
|---|---|---|
| What the team knows before you start | `Before we start, what do we know about the auth flow in the gateway?` | `memory_context` |
| Whether a problem has been seen before | `Have we hit flaky failures in the batch processor before? What fixed them?` | `memory_recall` |
| The rules for an area | `What conventions do we follow for error handling in the API layer?` | `memory_recall`, limited to conventions |
| How some code works | `How does the retry logic in the billing webhook work?` | `memory_recall`, then reads the files it points to |
| Which indexes it can search | `List my NeoHive indexes.` | `list_indexes` |

## Narrow the ask

By default your agent searches every index in the hive. Each detail you add narrows where it looks.

<figure><img src="../.gitbook/assets/results-ask-directly.svg" alt="Three narrowing levels. A plain question searches every index in the hive. Naming a kind of memory, such as conventions, sets the types filter on memory_recall. Naming an index sets the index parameter."><figcaption></figcaption></figure>

| Say | Your agent narrows the search to |
|---|---|
| "conventions", "rules", "what must we always do" | Directives and conventions |
| "have we hit this before", "known gotchas" | Insights and error patterns |
| "why did we choose" | Decisions |
| "search only the payments index" | One index. Your agent finds its ID with `list_indexes` |

The full list of kinds is on [Memory types](../reference/memory-types.md).

{% hint style="info" %}
If the first answer misses, ask again with different words. Two phrasings of the same idea often return different memories.
{% endhint %}

## Next step

Continue to [Write prompts that retrieve well](prompting.md).
