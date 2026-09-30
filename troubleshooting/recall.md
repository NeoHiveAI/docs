---
description: "What to check when your agent's NeoHive recall comes back empty or misses what you expected."
---

# Recall isn't finding what I need

Work out why a recall missed, then fix the query or the content behind it.

Check these in order. The first two are the quickest to fix.

| Symptom | Likely cause | Fix |
|---|---|---|
| Results are related but not the right ones | The query uses different words from the content | [Rephrase the query](#rephrase-the-query) |
| `No relevant memories found for this query.` | The content was never stored or indexed | [Check the content exists](#check-the-content-exists) |
| A file you know exists never comes back | Your file filters or the built-in skip list exclude it | [Check the file was indexed](#check-the-file-was-indexed) |
| Nothing from a whole repository or index | Your agent is connected to a different hive, or the first sync has not finished | [Check the hive and the sync](#check-the-hive-and-the-sync) |
| Only rules come back, or only one kind of memory | The agent passed `types` and narrowed the results | Ask again without naming memory types |
| A memory you stored has stopped appearing | Someone ran `memory_forget` on it | Store the knowledge again |

## Rephrase the query

Recall matches by meaning, but words still matter. A memory about "idempotency keys" may not come back for "duplicate prevention". Ask again with the terms you expect in the answer, as a statement rather than a question:

```text
JWT validation in the API gateway auth middleware
```

`memory_recall` takes up to five phrasings in its `queries` parameter and merges the results. [Write prompts that retrieve well](../results/prompting.md) has more examples.

## Check the content exists

Run the same query in the dashboard's [Playground](../admin/playground.md) against the index you expect to hold the answer. If it is missing there too, it was never stored. Tell your agent to store it, for example:

```text
Remember that the staging environment uses a self-signed certificate, so local tests need NODE_TLS_REJECT_UNAUTHORIZED=0.
```

A stored memory can be recalled as soon as `memory_store` replies.

## Check the file was indexed

Open the index's **Sync Settings** tab and read the **Allowlist** and **Blocklist**. A file outside the Allowlist, or inside the Blocklist, is never indexed, and some files are always skipped. [File pattern syntax](../reference/file-patterns.md) lists both.

## Check the hive and the sync

Recall covers only the hive in your agent's MCP endpoint, plus any Shared Index added to it. Compare the endpoint with **Install Instructions** on the hive you expect.

A new Code or Documentation index returns nothing until its first sync finishes. **Sync history** shows each run. A failed run is covered in [Repository sync issues](sync.md).

## Next step

See [Repository sync issues](sync.md) if a repository will not sync.
