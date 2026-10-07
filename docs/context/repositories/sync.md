---
description: "Set how often a Code or Documentation Index syncs, sync it on demand, and read the sync history."
---

# Keep a repository up to date

Choose a sync schedule for a Code or Documentation Index. An Index is one store of searchable context inside a Hive, the workspace your agent connects to. For more terms, see the [NeoHive glossary](../../concepts/glossary.md). To index a change right away, select **Trigger sync**. When something looks wrong, read **Sync history**.

<figure><img src="../../.gitbook/assets/context-sync.svg" alt="A one-day timeline. Scheduled syncs run every 4 hours at 00:00, 04:00, 08:00, and so on. At 10:12 you select Trigger sync, and a sync runs immediately. At 14:36 a continuous integration (CI) pipeline calls the webhook after a merge and sends only the changed files. Only one sync runs per Index at a time."><figcaption></figcaption></figure>

Each sync reads only what changed since the last indexed commit. NeoHive indexes new, modified, and renamed files again, and removes deleted files from the Index.

## Set the schedule

To set the schedule, do the following:

1. Open the Index's **Sync Settings** tab.
2. Under **Configuration**, select a **Sync interval**.
3. Select **Save settings**.

Syncs run at fixed times of day. For example, **Every 4 hours** runs at 00:00, 04:00, 08:00, and so on, and **Daily** runs at 00:00.

| **Sync interval** | Good for |
|---|---|
| **Every 15 minutes**, **Every 30 minutes** | A busy repository where your agent needs changes quickly |
| **Every hour** | Most repositories |
| **Every 4 hours** | The default for a new Index |
| **Daily** | A repository that rarely changes |

You also set the **Branch** and the **Connection** on the same card. **Pause syncing** stops scheduled syncs without deleting anything, and **Resume syncing** starts them again.

If NeoHive was not running when a sync was due, NeoHive syncs that Index as soon as NeoHive starts again.

## Sync now

To sync now, do the following:

1. At the top of the Index page, select **Trigger sync**. A **Sync Warning** says that the sync can slow down the machine.
2. Optional: To skip the warning next time, select **Don't show this again**.
3. Select **I Understand**.

The page header shows the sync progress and a button to cancel the sync.

When some files fail, NeoHive tries them again automatically a little later. If a file keeps failing, NeoHive stops retrying it until you select **Trigger sync**. **Trigger sync** gives the file one more try.

To index changes right after every merge, set up your continuous integration (CI) pipeline to call the webhook with the changed files. The webhook indexes the files it receives immediately. The webhook does not start a sync or add a row to **Sync history**. The webhook also does not apply the **Allowlist** or **Blocklist**. For details, see [Webhook refresh endpoint](../../reference/webhooks.md).

## Read the sync history

**Sync history** appears at the top of the **Sync Settings** tab and lists the newest run first.

| Column | Tells you |
|---|---|
| **Time**, **Duration** | When the run started and how long it took |
| **Status** | `running`, `success`, `failed`, or `cancelled`. `partial`, shown in amber, means that some files failed |
| **Files** | Files added, modified, deleted, and renamed, such as `+12A / ~3M` |
| **Progress**, **Chunks** | Files done out of the total, and pieces added or removed |
| **Commit Range** | The commits between the previous run and this one |
| **Error** | What went wrong. Select the error to read the full message |

If someone renames the branch, for example from `master` to `main`, the sync follows the new name when the match is clear. Otherwise, the page shows **Branch not found on the remote**. In that case, select the correct branch under **Sync a different branch**. For runs that keep failing, see [Repository sync issues](../../troubleshooting/sync.md).

## Next step

Your code is now in a Code Index. Next, add the documents that are not stored in git. Continue to [Add documents and PDFs](../documents.md).
