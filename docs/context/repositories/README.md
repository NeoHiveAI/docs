---
description: "Add a GitHub or GitLab repository to a Code Index so your agent finds your code by describing what it does."
---

# Add a code repository

Connect a repository once, and your agent can find code by describing what the code does. NeoHive stores the code in a [Code Index](../../concepts/glossary.md#code-index), one store of searchable context inside your [Hive](../../concepts/glossary.md#hive), the workspace your agent connects to. Scheduled syncs keep the [Index](../../concepts/glossary.md#index) up to date. For more terms, see the [NeoHive glossary](../../concepts/glossary.md).

<figure><img src="../../.gitbook/assets/context-repositories.svg" alt="NeoHive reads a GitHub or GitLab repository through a connection, which is a saved token or SSH key. NeoHive stores the code in a Code Index in a searchable form. Your agent finds the code with memory_recall. A sync runs every 4 hours, or when you select Trigger sync, and copies repository changes into the Index."><figcaption></figcaption></figure>

Your agent asks `how does the sync engine handle retries?` and gets back the functions that handle retries, even when those words never appear in the file. Code results come back in the same answer as your team's [Memories](../../concepts/glossary.md#memory), such as stored conventions and decisions.

Before you start, you need a Hive, read access to the repository, and a personal access token (PAT) or SSH key for that repository.

| Task | Page |
|---|---|
| Save a connection, select the repository and branch, and create the Index | [Connect GitHub or GitLab](connect.md) |
| Keep generated code, fixtures, and other unwanted files out | [Choose which files are included](file-patterns.md) |
| Set the sync schedule, sync on demand, and read the sync history | [Keep a repository up to date](sync.md) |

NeoHive copies and indexes the code on the machine it runs on, and sends none of it to an outside service. For details, see [What stays on your machine](../../security/local-only.md).

{% hint style="info" %}
The first sync reads every file, so it takes longer than later syncs, which read only the files that changed. A large monorepo (one repository that holds many projects) takes the longest. A GPU makes indexing faster. For details, see [GPU and CPU](../../admin/gpu-cpu.md).
{% endhint %}
