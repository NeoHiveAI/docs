---
description: "What to check when your agent's NeoHive recall comes back empty or misses what you expected."
---

# Recall isn't finding what I need

Use this page to find out why a recall (a search of your stored knowledge) missed. Then fix the query or the content behind it.

Check the causes in the following table in order. The first two are the quickest to fix.

| Symptom | Likely cause | Fix |
|---|---|---|
| Results are related but not the right ones | The query uses different words from the content | [Rephrase the query](#rephrase-the-query) |
| `No relevant memories found for this query.` | The content was never stored or indexed | [Check the content exists](#check-the-content-exists) |
| A file you know exists never comes back | Your file filters or the built-in skip list exclude it | [Check the file was indexed](#check-the-file-was-indexed) |
| Nothing from a whole repository or [Index](../concepts/glossary.md#index) | Your agent is connected to a different [Hive](../concepts/glossary.md#hive), or the first sync has not finished | [Check the Hive and the sync](#check-the-hive-and-the-sync) |
| Only rules come back, or only one kind of [Memory](../concepts/glossary.md#memory) | The agent passed `types` and narrowed the results | Ask again without naming Memory types |
| A Memory you stored has stopped appearing | Someone ran `memory_forget` on it | Store the knowledge again |

## Rephrase the query

Recall matches by meaning, but words still matter. A Memory about "idempotency keys" might not appear for a query about "duplicate prevention". Ask again with the words you expect in the answer. Write the query as a statement, not a question. For example:

```text
JWT validation in the API gateway auth middleware
```

`memory_recall` accepts up to five phrasings in its `queries` parameter and merges the results. For more examples, see [Write prompts that retrieve well](../results/prompting.md).

## Check the content exists

Run the same query in the dashboard's [Playground](../admin/playground.md) against the Index you expect to hold the answer. If the answer is missing there too, the content is not in the Index. Tell your agent to store the information. For example:

```text
Remember that the staging environment uses a self-signed certificate, so local tests need NODE_TLS_REJECT_UNAUTHORIZED=0.
```

You can recall a stored Memory as soon as `memory_store` replies.

## Check the file was indexed

Open the Index's **Sync Settings** tab and read the **Allowlist** and **Blocklist**. NeoHive never indexes a file outside the Allowlist or inside the Blocklist. NeoHive also always skips some files. For the pattern rules and the files that are always skipped, see [File pattern syntax](../reference/file-patterns.md).

## Check the Hive and the sync

Recall covers only the Hive in your agent's [MCP](../concepts/glossary.md#mcp) endpoint, plus any [Shared Index](../concepts/glossary.md#shared-index) added to that Hive. Compare the endpoint with **Install Instructions** on the Hive you expect.

A new [Code](../concepts/glossary.md#code-index) or [Documentation Index](../concepts/glossary.md#documentation-index) returns nothing until its first sync finishes. The **Sync history** on the Index page shows each run. If a run failed, see [Repository sync issues](sync.md).
