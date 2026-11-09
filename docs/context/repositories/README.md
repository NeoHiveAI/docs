---
description: "Add a GitHub or GitLab repository to a Code or Documentation Index so your agent finds your code and docs by describing what they do."
---

# Add a repository

Connect a repository once, and your agent can find code by describing what the code does, such as `retry handling in the sync engine`, even when the code does not use those words. NeoHive stores the repository in a [Code](../../concepts/glossary.md#code-index) or [Documentation Index](../../concepts/glossary.md#documentation-index) inside your [Hive](../../concepts/glossary.md#hive). Scheduled syncs keep the [Index](../../concepts/glossary.md#index) up to date.

<figure><img src="../../.gitbook/assets/context-repositories.svg" alt="NeoHive reads a GitHub or GitLab repository through a connection, which is a saved token or SSH key. NeoHive stores the code in a Code Index in a searchable form. Your agent finds the code with memory_recall. A sync runs every 4 hours, or when you select Trigger sync, and copies repository changes into the Index."><figcaption></figcaption></figure>

Before you start, you need a Hive and read access to the repository.

To add a repository, do the following:

1. To create a personal access token (PAT) or SSH key for the repository, see [Create a token](connect.md#create-a-token).
2. To save the token or key as a connection, select the repository and branch, and create the Index, see [Connect GitHub or GitLab](connect.md).

After you create the Index, you can also do the following:

* To keep generated code, fixtures, and other unwanted files out of the Index, see [Choose which files are included](file-patterns.md).
* To set the sync schedule, sync on demand, or read the sync history, see [Keep a repository up to date](sync.md).

NeoHive copies and indexes the code on the machine it runs on. NeoHive does not send the code to an outside service. For more information, see [What stays on your machine](../../security/local-only.md).

{% hint style="info" %}
The first sync reads every file, so on a large repository it can take much longer than later syncs, which read only the files that changed. To make indexing faster, run NeoHive on a GPU. For more information, see [GPU and CPU](../../admin/gpu-cpu.md).
{% endhint %}
