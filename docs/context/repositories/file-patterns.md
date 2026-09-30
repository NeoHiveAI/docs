---
description: "Choose which files in a repository get indexed, using the Allowlist and Blocklist on the Sync Settings tab."
---

# Choose which files are included

Set an **Allowlist** and a **Blocklist** so the Index holds the files that answer questions, not build output and fixtures.

<figure><img src="../../.gitbook/assets/context-file-patterns.svg" alt="Every file on the branch passes three filters in order. First the built-in skip list, which always removes binaries, images, lock files and folders such as node_modules and dist. Then the Allowlist: when it has patterns, only matching files go on. Then the Blocklist, which removes matching files even if the Allowlist let them through. What is left is indexed."><figcaption></figcaption></figure>

## When to use which

| You want to | Use |
|---|---|
| Index a normal repository but drop generated code, fixtures, or snapshots | **Blocklist** only |
| Index one slice, such as `src/**` and `docs/**` | **Allowlist** only |
| Index a slice but leave out its tests | Both |
| Keep a Documentation Index to docs | **Allowlist** with `**/*.md` |

A typical Blocklist:

```text
**/__fixtures__/**
**/*.snap
docs/generated/**
```

Write one glob pattern per line. Each pattern matches the file's path from the repository root, and a single `*` does not cross a `/`, so write `**/*.snap` rather than `*.snap`. [File pattern syntax](../../reference/file-patterns.md) covers wildcards, braces, and more examples.

## Set the patterns

{% stepper %}
{% step %}
## Open the filters

Open the Index, choose the **Sync Settings** tab, and find **File filters** under **Configuration**.
{% endstep %}

{% step %}
## Enter the patterns

Type one pattern per line into **Allowlist**, **Blocklist**, or both. To get a first draft, click **Copy AI prompt**, paste it into your agent, and describe your repository.
{% endstep %}

{% step %}
## Save and sync

Click **Save settings**, then **Trigger sync** at the top of the page. After a pattern change, the next sync checks every file in the repository against the new filters, not only the changed ones.
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
A new Blocklist pattern stops files from being indexed. It does not remove files the Index already holds. Set the patterns early, before the Index fills with files you do not want.
{% endhint %}

If your agent cannot find a file, check both lists first: the file may be filtered out.

## Next step

With the right files included, keep them current. Continue to [Keep it up to date](sync.md).
