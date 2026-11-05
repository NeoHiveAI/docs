---
description: "Diagnose a Code or Documentation Index that fails to sync, stalls, or leaves files out."
---

# Repository sync issues

A [Code](../concepts/glossary.md#code-index) or [Documentation Index](../concepts/glossary.md#documentation-index) stays current by syncing with its repository on a schedule. When a sync fails, stalls, or leaves files out, the [Index](../concepts/glossary.md#index) falls out of date and your agent recalls older content.

The following diagram shows five checks in order. Each check that fails leads to its fix, and five passing checks mean the Index matches the repository:

<figure><img src="../.gitbook/assets/troubleshooting-sync.svg" alt="Decision tree of five checks: syncing is on, the connection is Valid, the last run succeeded, every file indexed, and the file passes the filters."><figcaption></figcaption></figure>

Open the Index in the dashboard. When a sync has a problem, a message box at the top of the Index page names the problem. The box also says what to do. When a sync stops with an error, the [Hive](../concepts/glossary.md#hive) page shows the same heading with a link to the Index. The Index also shows a red status dot in the Hive's **Indexes** list.

On the **Sync Settings** tab, **Sync history** lists every run with its status. To read a run's error in full, click the text in its **Error** column.

## What the Index page shows

Find the heading of the message box you see. Text in `<angle brackets>` stands for a value that changes, such as a branch name or a count.

### A synced branch is no longer on the remote

Someone renamed or deleted the branch, and NeoHive could not tell which branch replaced it. The Index won't pick up new changes for now, but everything indexed so far is still searchable.

To sync another branch, do the following:

1. Under **Pick a branch to sync instead**, select a branch.
2. Click **Sync this branch**.

The sync starts on the new branch. If the Index still does not sync, click **Re-clone repository**, which clears the local copy and clones the repository again.

NeoHive handles most renamed default branches, such as `master` to `main`, without this box. NeoHive switches the Index to the new branch and keeps syncing. You can also change the branch yourself under **Branch** on the **Sync Settings** tab, and then click **Save settings**. NeoHive then clears the box and starts a sync on the new branch.

### A git command failed

NeoHive could not read the repository. The line under the heading shows git's own reason, such as a failed login or a wrong URL. To check the connection, see [Connections](#connections). After you fix the connection, click **Trigger sync**.

### The connection for this Index was removed

Someone deleted the Index's connection on **Data Sources**. Click **Assign connection**, and then select a connection. If the service has no connection left, the button reads **Add a data source** and opens **Data Sources**.

### Some files could not be indexed, the rest synced

The text under the heading says which case you have:

* **`<n> of <m> files failed to index and will be reindexed automatically.`** You do not need to do anything. NeoHive runs the sync again two minutes later and retries those files. The run shows an amber **partial** badge in **Sync history**.
* **`<n> files could not be indexed after 3 attempts. Trigger a sync to retry.`** The same files failed three syncs in a row, so NeoHive stopped retrying them. In **Sync history**, click the run's error to read the first file's error. Fix the file, or exclude it with the **Blocklist**, and then click **Trigger sync**.

### No files could be indexed, so the sync stopped

Every file in the run failed to index. The box shows the first file's error. If the error names the container or the embedding engine, see [Agent can't connect](connection.md). Then click **Trigger sync**.

### This Index was built with the wrong embedding dimensions

NeoHive cannot repair the Index in place, so you create it again. To rebuild the Index, do the following:

1. Open the **Index Info** tab.
2. Under **Danger Zone**, click **Delete Index**.
3. On the Hive page, click **Add Index**, and create the Index with the same source and embedding model.

### The sync failed

Something else failed, and the box shows the error message. Look up the message in [Common errors](common-errors.md).

Two other states are not errors. If **Sync Settings** shows **Resume syncing**, syncing is paused. To start the scheduled syncs again, click **Resume syncing**. If you see `A sync is already running for this Index`, you clicked **Trigger sync** during a run. Wait for that run to finish.

## Connections

A connection is the saved GitHub or GitLab login that an Index syncs through. To check one, open **Data Sources** and click **Manage** on the service. Each connection shows **Valid**, **Invalid**, or **Unvalidated**. If a token no longer works, every sync that uses the token fails with `A git command failed`. You cannot edit the token of a connection. Instead, add a new connection with a working token, and then assign the new connection to the Index. To replace the token without a gap in syncing, see [Data sources and credentials](../admin/data-sources.md#check-or-remove-a-connection).

## Slow or stalled syncs

The first sync clones the repository and indexes every file, so a large repository takes longer. The Index page shows the sync's progress. Later syncs index only the files that changed. If you change the **File filters**, the next sync checks every file again. If progress stops, read the log:

```bash
docker logs neohive --tail 50
```

## Schedule

If an Index syncs too often or too rarely, change its **Sync interval** on the **Sync Settings** tab. For more information about the intervals you can choose, see [Set the schedule](../context/repositories/sync.md#set-the-schedule). To sync now, click **Trigger sync**, or call the [webhook refresh endpoint](../reference/webhooks.md) from your CI system.

## Files that never appear

A file must pass the built-in skip list, your **Allowlist**, and your **Blocklist**, in that order. The skip list covers binary files, lock files, and dependency folders, and a PDF in a repository counts as binary. For more information about the full skip list, see [Files in a repository](../reference/file-types.md#files-in-a-repository), and for how the Allowlist and Blocklist combine, see [File pattern syntax](../reference/file-patterns.md).

## Still stuck?

To get help, do the following:

1. To collect a diagnostics bundle, run the following command:

   ```bash
   curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/logs.sh | bash
   ```

2. Send the bundle to `hello@neohive.ai` with the name of the repository that fails.

The bundle holds logs and settings with secrets removed. The bundle does not include your [Memories](../concepts/glossary.md#memory), code, or databases.
