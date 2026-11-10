---
description: "What to check when your agent's NeoHive recall comes back empty or misses what you expected."
---

# Recall isn't finding what I need

A [recall](../concepts/glossary.md#recall) can come back empty or miss what you expected. The cause is usually the query's wording or the stored content.

Find your symptom in the following table:

| Symptom | Likely cause | Fix |
|---|---|---|
| Results are related but not the right ones | The query uses different words from the content | [Rephrase the query](#rephrase-the-query) |
| `No relevant memories found for this query.` | The content was never stored or indexed | [Check the content exists](#check-the-content-exists) |
| A file you know exists never comes back | Your file filters or the built-in skip list exclude it | [Check the file was indexed](#check-the-file-was-indexed) |
| Nothing from a whole repository or [Index](../concepts/glossary.md#index) | Your agent is connected to a different [Hive](../concepts/glossary.md#hive), or the first sync has not finished | [Check the Hive and the sync](#check-the-hive-and-the-sync) |
| The right file comes back, but only its first part | The file is a long code file, and recall returns the top of the file | [Read the rest of a long file](#read-the-rest-of-a-long-file) |
| Only rules come back, or only one kind of [Memory](../concepts/glossary.md#memory) | The agent passed `types` and narrowed the results | Ask again without naming Memory types |
| A Memory you stored has stopped appearing | Someone ran `memory_forget` on it | Store the knowledge again |

## Rephrase the query

Recall matches by meaning, but words still matter. A Memory about "idempotency keys" might not appear for a query about "duplicate prevention". Ask again with the words you expect in the answer. Write the query as a statement, not a question. For example, ask your agent to recall the following:

```text
JWT validation in the API gateway auth middleware
```

Recall also looks for the exact words of the query. That word-for-word match finds only text that contains every word in the query. To find an exact term, such as a function name or an error code, make the term the whole query.

`memory_recall` accepts up to five phrasings in its `queries` parameter and merges the results. For more information about phrasing queries, see [Write prompts that retrieve well](../results/prompting.md).

## Check the content exists

Ask your agent to run the same query on only the Index you expect to hold the answer. Your agent looks up the Index's ID with `list_indexes` and passes it as `index`. If nothing relevant comes back, the content is not in the Index. Tell your agent to store the information, for example with the following prompt:

```text
Remember that the staging environment uses a self-signed certificate, so local tests need NODE_TLS_REJECT_UNAUTHORIZED=0.
```

You can recall a stored Memory as soon as `memory_store` replies.

## Check the file was indexed

Open the Index's **Sync Settings** tab, and read the **Allowlist** and **Blocklist** under **File filters**. NeoHive never indexes a file outside the Allowlist or inside the Blocklist. NeoHive also always skips some files, such as binary files and lock files. For more information about the pattern rules, see [File pattern syntax](../reference/file-patterns.md), and for the files NeoHive always skips, see [Files in a repository](../reference/file-types.md#files-in-a-repository).

## Check the Hive and the sync

Recall covers only the Hive in your agent's [MCP](../concepts/glossary.md#mcp) endpoint, plus any [Shared Index](../concepts/glossary.md#shared-index) added to that Hive. Compare the endpoint with **Install Instructions** on the Hive you expect.

A new [Code](../concepts/glossary.md#code-index) or [Documentation Index](../concepts/glossary.md#documentation-index) returns nothing until its first sync finishes. **Sync history** on the Index's **Sync Settings** tab shows each run. If a run failed, see [Repository sync issues](sync.md).

## Read the rest of a long file

For a long code file, a result shows only the top of the file, up to 200 lines. A heading such as `[auth.ts] (804 lines, truncated to first 200)` shows that the rest of the file is missing. The match that put the file in the results can be further down. The heading names the file, so ask your agent to open that file in your repository. A short code file comes back in full.
