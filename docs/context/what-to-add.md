---
description: "Pick the right Index for each kind of content, and decide how many Hives you need."
---

# What to add, and where

NeoHive can hold your source code, your docs, your other files, and what your team learns. Each kind of content goes in its own kind of [Index](../concepts/glossary.md#index), a searchable store inside NeoHive. Your Indexes live in a [Hive](../concepts/glossary.md#hive), the workspace your agent connects to.

Read this page before you first add content. Read it again when you plan NeoHive for a new product or team. The page shows which Index fits each kind of content. It also shows whether the content belongs in an existing Hive or a new one.

<figure><img src="../.gitbook/assets/context-what-to-add.svg" alt="A decision tree of four questions. Has another Hive already indexed it? Yes: add it as a Shared Index. Is it in a GitHub or GitLab repository? Yes: a Code or Documentation Index. Is it a file you have, such as a PDF? Yes: a Files Index from File Upload. Is it something the team decides or learns? Yes: the Knowledge Index, which every Hive already has."><figcaption></figcaption></figure>

## Pick the Index

To open the **Add an Index** dialog, do the following:

1. Open your Hive in the dashboard at `http://localhost:3577`.
2. Select **+** next to **Indexes**.

The **Add an Index** dialog asks where your data comes from.

| Your content | In the dialog | Index you get |
|---|---|---|
| Source code in a repository | **GitHub** or **GitLab**, then **Code** | A [Code Index](../concepts/glossary.md#code-index), kept in sync with the branch |
| Markdown docs in a repository | **GitHub** or **GitLab**, then **Documentation** | A [Documentation Index](../concepts/glossary.md#documentation-index), kept in sync with the branch |
| Specs, runbooks, or PDFs outside git | **File Upload** | A [Files Index](../concepts/glossary.md#files-index), filled by uploading |
| Conventions and decisions your team makes | Nothing to add | The [Knowledge Index](../concepts/glossary.md#knowledge-index), created with every Hive |
| An Index another Hive already set up | **Shared Index**, under **or reuse an existing Index** | The same Index, searchable from your Hive with no copy and no wait for indexing |

[Add a code repository](repositories/README.md) covers both kinds of repository Index. A Documentation Index indexes every file that its filters allow, not only docs. To limit a Documentation Index to markdown files, give the Index an **Allowlist** such as `**/*.md`. For details, see [Choose which files are included](repositories/file-patterns.md).

The dialog shows Jira as a **Coming soon** card. You cannot add content from Jira.

{% hint style="info" %}
Your agent searches every Index in the Hive with one query. To choose a single Index, your agent uses the descriptions it reads through `list_indexes`. Set each description on the Index's **Index Info** tab. Name the services, domains, and languages that the Index covers.
{% endhint %}

## Decide how many Hives

Each Hive has its own [MCP](../concepts/glossary.md#mcp) endpoint, the address your agent connects to. Each Hive also has its own Knowledge Index, so what your agent learns in one Hive stays in that Hive.

| Situation | Do this |
|---|---|
| One product, one repository | One Hive |
| One product across several repositories | One Hive, one Code Index per repository |
| Unrelated products or teams | One Hive each, so results from one codebase do not outrank results from the other |
| A library several products use | Index the library in one Hive. Then add that Index to the other Hives as a **Shared Index**. |

A [Shared Index](../concepts/glossary.md#shared-index) is one Index that several Hives search, not a copy. For what a Shared Index is and what each Hive can change, see [Shared Index](../concepts/hives-indexes-memories.md#shared-index).
