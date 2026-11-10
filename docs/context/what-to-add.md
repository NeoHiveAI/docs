---
description: "Pick the right Index for each kind of content, and decide how many Hives you need."
---

# What to add, and where

NeoHive can hold your source code, your docs, files such as PDFs and specs, and what your team learns. Each kind of content goes in its own kind of [Index](../concepts/glossary.md#index), a searchable store inside NeoHive. Your Indexes live in a [Hive](../concepts/glossary.md#hive), the workspace your agent connects to.

Choose the Index for each kind of content before you first add it, and decide whether the content needs a Hive of its own. Check both choices again when you plan NeoHive for a new product or team.

<figure><img src="../.gitbook/assets/context-what-to-add.svg" alt="A decision tree of four questions. Has another Hive already indexed it? Yes: add it as a Shared Index. Is it in a GitHub or GitLab repository? Yes: a Code or Documentation Index. Is it a file you have, such as a PDF? Yes: a Files Index from File Upload. Is it something the team decides or learns? Yes: the Knowledge Index, which every Hive already has."><figcaption></figcaption></figure>

## Pick the Index

To open the **Add an Index** dialog, do the following:

1. In the dashboard, open your Hive.
2. Click **+** next to **Indexes**.

The **Add an Index** dialog asks where your data comes from.

| Your content | What to select | Index you get |
|---|---|---|
| Source code in a repository | **GitHub** or **GitLab**, then **Code** | A [Code Index](../concepts/glossary.md#code-index), kept in sync with the branch |
| Markdown docs in a repository | **GitHub** or **GitLab**, then **Documentation** | A [Documentation Index](../concepts/glossary.md#documentation-index), kept in sync with the branch |
| Documents outside git, such as specs, runbooks, PDFs, or Word files | **File Upload** | A [Files Index](../concepts/glossary.md#files-index), filled by uploading |
| An Index another Hive already set up | **Shared Index**, under **or reuse an existing Index** | The same Index, searchable from your Hive with no copy and no wait for indexing |
| Conventions and decisions your team makes | Nothing to select | The [Knowledge Index](../concepts/glossary.md#knowledge-index), created with every Hive |

A Code Index and a Documentation Index both index every file that their filters allow, not only markdown. To keep a Documentation Index to markdown, add `**/*.md` to its **Allowlist**. For more information about the Allowlist, see [Choose which files are included](repositories/file-patterns.md). To add either kind of Index, see [Add a repository](repositories/README.md).

{% hint style="info" %}
Your agent searches every Index in the Hive at once, or picks a single Index by its name and description. On each Index's **Index Info** tab, write a description that names the services, domains, and languages the Index covers.
{% endhint %}

## Decide how many Hives

Each Hive has its own [MCP](../concepts/glossary.md#mcp) endpoint, the address your agent connects to. Each Hive also has its own Knowledge Index, so what your agent learns in one Hive stays in that Hive.

| Situation | Do this |
|---|---|
| One product, one repository | One Hive |
| One product across several repositories | One Hive, one Code Index per repository |
| Unrelated products or teams | A separate Hive for each, so your agent's results for one product do not include code from the other |
| A library several products use | Index the library in one Hive. Then add that Index to the other Hives as a **Shared Index**. |

A [Shared Index](../concepts/glossary.md#shared-index) is one Index that several Hives search, not a copy. For what a Shared Index is and what each Hive can change, see [Shared Index](../concepts/hives-indexes-memories.md#shared-index).
