---
description: "Set how often a Code or Documentation Index syncs, sync it on demand, and read the sync history."
---

# Keep it up to date

Pick a sync schedule, click **Trigger sync** when you need a change now, and read **Sync history** when something looks wrong.

<figure><img src="../../.gitbook/assets/context-sync.svg" alt="A one-day timeline. Scheduled syncs run every 4 hours at 00:00, 04:00, 08:00 and so on. At 10:12 you click Trigger sync and a sync runs straight away. At 14:36 CI calls the webhook after a merge and sends only the changed files. Only one sync runs per Index at a time."><figcaption></figcaption></figure>

Each sync reads only what changed since the last indexed commit: new, modified, and renamed files are indexed again, and deleted files are removed.

## Set the schedule

On the Index's **Sync Settings** tab, pick a **Sync interval** under **Configuration** and click **Save settings**. Syncs run at fixed times of day: **Every 4 hours** runs at 00:00, 04:00, 08:00, and so on, and **Daily** runs at 00:00.

| **Sync interval** | Good for |
|---|---|
| **Every 15 minutes**, **Every 30 minutes** | A busy repository where your agent needs changes quickly |
| **Every hour** | Most repositories |
| **Every 4 hours** | The default for a new Index |
| **Daily** | A repository that rarely changes |

The same card sets the **Branch** and the **Connection**. **Pause syncing** stops scheduled syncs without deleting anything, and **Resume syncing** starts them again.

If NeoHive was stopped when a sync was due, it syncs that Index as soon as it starts again.

## Sync now

Click **Trigger sync** at the top of the Index page. A **Sync Warning** says the sync can slow down the machine. Click **I Understand**, and tick **Don't show this again** to skip the warning next time.

Progress shows in the page header, with a button to cancel.

When some files fail, NeoHive retries them on its own a little later. A file that keeps failing is left alone until you click **Trigger sync**, which gives it one more try.

To sync right after every merge, call the webhook from your CI. See [Webhook refresh endpoint](../../reference/webhooks.md).

## Read the sync history

**Sync history** sits at the top of the **Sync Settings** tab, newest run first.

| Column | Tells you |
|---|---|
| **Time**, **Duration** | When the run started and how long it took |
| **Status** | `running`, `success`, `failed`, or `cancelled`. An amber `partial` means some files failed |
| **Files** | Files added, modified, deleted, and renamed, such as `+12A / ~3M` |
| **Progress**, **Chunks** | Files done out of the total, and pieces added or removed |
| **Commit Range** | The commits between the previous run and this one |
| **Error** | What went wrong. Click it to read the full message |

If the branch is renamed, such as `master` to `main`, the sync follows it when the match is clear. Otherwise the page shows **Branch not found on the remote**, and you pick the right one under **Sync a different branch**. For runs that keep failing, see [Repository sync issues](../../troubleshooting/sync.md).

## Next step

Your code is in. Add the documents that do not live in git. Continue to [Add documents and PDFs](../documents.md).
