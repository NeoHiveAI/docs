---
description: "Choose which files in a repository NeoHive indexes, by using the Allowlist and Blocklist on the Sync Settings tab."
---

# Choose which files are included

Set an **Allowlist** and a **Blocklist** so that the [Index](../../concepts/glossary.md#index) holds the files that answer questions. The two lists also keep out generated code and test fixtures (sample data for tests). An Index is one store of searchable context inside a [Hive](../../concepts/glossary.md#hive), the workspace your agent connects to.

<figure><img src="../../.gitbook/assets/context-file-patterns.svg" alt="Every file on the branch passes three filters in order. The first filter is the built-in skip list, which always removes binaries, images, lock files, and folders such as node_modules and dist. The second filter is the Allowlist: when the Allowlist has patterns, only matching files pass. The third filter is the Blocklist, which removes matching files even when the Allowlist matched them. NeoHive indexes the files that are left."><figcaption></figcaption></figure>

## When to use which

| You want to | Use |
|---|---|
| Include the whole repository but leave out generated code, fixtures, or snapshots | **Blocklist** only |
| Include only one part, such as `src/**` and `docs/**` | **Allowlist** only |
| Include only one part but leave out its tests | Both |
| Limit a [Documentation Index](../../concepts/glossary.md#documentation-index) to docs | **Allowlist** with `**/*.md` |

A typical Blocklist looks like this:

```text
**/__fixtures__/**
**/*.snap
docs/generated/**
```

Write one pattern per line. A pattern is a file path from the repository root, and it can use wildcards such as `*`. A single `*` does not match across a `/`, so write `**/*.snap` rather than `*.snap`. For wildcards, braces, and more examples, see [File pattern syntax](../../reference/file-patterns.md).

## Set the patterns

To set the patterns, do the following:

1. Open the Index's **Sync Settings** tab. **File filters** is under **Configuration**.
2. Optional: To get a first draft of the patterns from your agent, select **Copy AI prompt**.
3. Optional: Paste the prompt into your agent.
4. Optional: Describe your repository to your agent.
5. Enter one pattern per line in **Allowlist**, **Blocklist**, or both.
6. Select **Save settings**.
7. To apply the new patterns, select **Trigger sync** at the top of the page. Saving does not start a sync.
8. If the **Sync Warning** dialog opens, select **I Understand**.

After a pattern change, the sync reads the whole repository again. NeoHive removes the files that the new patterns leave out and adds the files those patterns now include.

If your agent cannot find a file, check both lists first, because a pattern might filter the file out.
