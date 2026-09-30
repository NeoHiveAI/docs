---
description: "Pick the right Index for each kind of content, and decide how many Hives you need."
---

# What to add, and where

Find the Index that fits your content, then decide whether it goes in an existing Hive or a new one.

<figure><img src="../.gitbook/assets/context-what-to-add.svg" alt="A decision tree of four questions. Has another Hive already indexed it? Yes: add it as a Shared Index. Is it in a GitHub or GitLab repository? Yes: a Code or Documentation Index. Is it a file you have, such as a PDF? Yes: a Files Index from File Upload. Is it something the team decides or learns? Yes: the Knowledge Index, which every Hive already has."><figcaption></figcaption></figure>

## Pick the Index

Open your Hive in the dashboard at `http://localhost:3577` and click **+** next to **Indexes**. The **Add an Index** dialog asks where your data comes from.

| Your content | In the dialog | Index you get |
|---|---|---|
| Source code in a repository | **GitHub** or **GitLab**, then **Code** | **Code**, kept in sync with the branch |
| Markdown docs in a repository | **GitHub** or **GitLab**, then **Documentation** | **Documentation**, kept in sync with the branch |
| Specs, runbooks, or PDFs outside git | **File Upload** | **Files**, filled by uploading |
| Conventions and decisions your team makes | Nothing to add | **Knowledge**, created with every Hive |
| An Index another Hive already set up | **Shared Index**, under **or reuse an existing Index** | The same Index, searchable here with no copy and no indexing time |

[Add a code repository](repositories/README.md) covers both repository kinds. A Documentation Index still reads every file the filters let through, so give it an **Allowlist** such as `**/*.md` ([Choose which files are included](repositories/file-patterns.md)).

Jira shows as a **Coming soon** card and cannot be added yet.

{% hint style="info" %}
Your agent searches every Index in the Hive with one query. When it wants one Index, it chooses by the descriptions it reads through `list_indexes`. Set each description on the Index's **Index Info** tab and name the services, domains, and languages it covers.
{% endhint %}

## Decide how many Hives

Each Hive has its own MCP endpoint and its own **Knowledge** Index, so what your agent learns in a Hive stays in it.

| Situation | Do this |
|---|---|
| One product, one repository | One Hive |
| One product across several repositories | One Hive, one Code Index per repository |
| Unrelated products or teams | One Hive each, so results from one codebase do not crowd out the other |
| A library several products use | Index it in one Hive, then add it to the others as a **Shared Index** |

A **Shared Index** can be a Code, Documentation, or Files Index, never a **Knowledge** Index. Your agent can recall from it but not write to it. The list shows only active Indexes that your Hive does not already use.

{% hint style="warning" %}
A Shared Index is one Index, not a copy. Anyone who changes its settings or syncs it from any Hive changes it for every Hive that uses it. Only the owning Hive can delete it.
{% endhint %}

## Next step

Most teams start with their code. Continue to [Add a code repository](repositories/README.md).
