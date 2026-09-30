---
description: "Diagnose a Code or Documentation Index that fails to sync, stalls, or leaves files out."
---

# Repository sync issues

Find out why a Code or Documentation Index is out of date, and get it syncing again.

<figure><img src="../.gitbook/assets/troubleshooting-sync.svg" alt="Decision tree for a Code or Documentation Index: is syncing turned on, is the connection Valid on Data Sources, did the last run in Sync history succeed, did every file Index, does the missing file pass the filters. Each no leads to its fix; five yes answers mean the Index matches the repository."><figcaption></figcaption></figure>

Open the Index in the dashboard. **Sync history** lists every run with its status and error, and a red or amber box appears at the top of the page when something is wrong.

## What the Index page shows

| You see | Cause | Fix |
|---|---|---|
| **Resume syncing** on **Sync Settings** | Syncing is paused, so no scheduled sync runs. | Click **Resume syncing**. |
| `This Index's connection was removed.` | The connection it used was deleted from **Data Sources**. | Click **Assign connection**, or **Add a data source** if you have none. |
| Red box: **Branch not found on the remote** | The branch was renamed or deleted, and NeoHive could not pick its replacement. | Choose a branch under **Sync a different branch** and click **Sync this branch**. If that fails, click **Force reset to origin**. |
| Red box: **The branch is no longer on the remote** | The branch was renamed or deleted. | Pick an existing branch in **Branch** on the **Sync Settings** tab, click **Save settings**, then click **Trigger sync**. |
| Red box: **A git command failed** | The repository URL is wrong, or the connection cannot read it. | Check the connection on **Data Sources**, then click **Trigger sync**. |
| Red box: **The sync failed** | Any other failure. The box shows the message. | Look the message up in [Common errors](common-errors.md). |
| Red box: **Embedding dimension mismatch. Sorry about this!** | The Index was built with the wrong embedding dimensions and cannot be repaired. | Follow the steps in the box: delete the Index under **Danger Zone** on **Index Info**, then add it again with **Add Index**. |
| Amber `partial` badge, or `... files failed to index and will be reindexed automatically.` | Some files failed, often while the embedding engine restarted. | Wait. NeoHive retries those files on its own two minutes later. |
| Amber box: `... could not be indexed after 3 attempts. Trigger a sync to retry.` | The same files failed three syncs in a row. | Read the file error in **Sync history**, fix the file or filter it out, then click **Trigger sync**. |
| `A sync is already running for this Index` | You clicked **Trigger sync** while a sync was running. | Nothing to fix. Wait for the running sync. |

A renamed default branch, such as `master` to `main`, is usually fixed for you: NeoHive switches the Index to the new branch and carries on.

## Connections

Open **Data Sources** and click **Manage** on the service. Each connection shows **Valid**, **Invalid**, or **Unvalidated**. A token that no longer works makes each sync that uses it fail with **A git command failed**. You cannot edit a token, so add a new connection and assign it to the Index. [Credentials and secrets](../security/credentials.md) shows how.

## Slow or stalled syncs

The first sync clones the repository and indexes every file, so a large monorepo takes a while. The Index page shows its progress. Later syncs index only the files that changed, unless you changed the **File filters**, which makes the next sync re-read everything. If progress stops moving, read the log:

```bash
docker logs neohive --tail 50
```

## Schedule

Each Index syncs on the **Sync interval** set on its **Sync Settings** tab, from **Every 15 minutes** to **Daily**. A repository added from the dashboard starts at **Every 4 hours**. Click **Trigger sync** to sync now, or call the [webhook refresh endpoint](../reference/webhooks.md) from CI.

## Files that never appear

A file must pass the built-in skip list, your **Allowlist**, and your **Blocklist**. PDFs in a repository are always skipped. [File pattern syntax](../reference/file-patterns.md) shows how the three combine.

## Still stuck?

Send a diagnostics bundle to `hello@neohive.ai` with the name of the repository that fails:

```bash
curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/logs.sh | bash
```

## Next step

See [Common errors](common-errors.md) for any other message.
