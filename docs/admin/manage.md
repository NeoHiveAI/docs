---
description: "Archive, restore, delete, move, and share Hives and Indexes from the NeoHive dashboard."
---

# Manage Hives and Indexes

Which action to use on a Hive or an Index, where to find it, and whether you can undo it.

| Action | Applies to | Where | Undo |
|---|---|---|---|
| **Archive** | Hive | Hive card menu, or the menu next to its name in the sidebar | **Restore**, within 30 days |
| **Delete** | Hive | Same menu | None |
| **Move Index…** | Index | Index row menu on the Hive page, or the **Index Info** tab | Move it back |
| **Share Index…** | Index | Same places | **Revoke** |
| **Shared Index** | Another Hive's Index | **+** on the **Indexes** list | **Remove from Hive…** |
| **Delete Index** | Index | **Index Info** tab, under **Danger zone** | None |

## Archive, restore, or delete a Hive

<figure><img src="../.gitbook/assets/admin-manage.svg" alt="A Hive in use moves to the Archived section with Archive, and back with Restore. After 30 days, or with Delete Permanently, an archived Hive is deleted for good. Delete on an active Hive, after typing its name, also deletes it for good. Indexes have no archive: Move and Share keep the data, Delete Index removes it at once."><figcaption></figcaption></figure>

**Archive** moves the Hive to the **Archived** section at the bottom of the home screen, which counts down the days left. Expand **Archived** and click **Restore** to bring it back with its Indexes and Memories.

**Delete** asks you to type the Hive's name, then **Delete permanently** removes every Memory, Index, sync history, and setting. For an archived Hive, **Delete Permanently** then **Confirm** does the same.

## Move an Index to another Hive

Choose **Move Index…**, pick a Hive under **Move to**, and click **Move Index**. Only running Hives are offered. Both Hives pause briefly while the data moves, then resume on their own.

## Share an Index between Hives

A Shared Index is one Index that several Hives search, so a repository is indexed once. Set one up from either side:

- **Offer it:** on the owning Hive, choose **Share Index…**, pick a Hive under **Add a Hive**, and click **Share**.
- **Take it:** on any Hive, click **+** on **Indexes**, choose **Shared Index**, pick an Index, and click **Add shared Index**. The owning Hive does not have to approve.

{% hint style="warning" %}
Every Hive that uses a Shared Index can sync it, change its embedding model and connection, and delete its Memories. There is one Index, so each change reaches every Hive. Only your agent's own writes stay separate: `memory_store` always writes to the Hive's own Knowledge Index.
{% endhint %}

The borrowing Hive sees a **Shared** badge on the row. **Owner Hive** in the row menu, or **Open in** on **Index Info**, opens the owning Hive.

To end a share, the owner clicks **Revoke** in **Share Index…**, or the borrower chooses **Remove from Hive…**. Neither deletes anything. The owner cannot delete a Shared Index until every share is revoked.

## Delete an Index

**Delete repository** on the **Sync Settings** tab of a Code or Documentation Index stops syncing and deletes its Memories but keeps the empty Index. **Delete Index** removes the Index itself.

## The Knowledge Index stays with its Hive

Every Hive has one Knowledge Index, where your agent's Memories live. You cannot move, share, rename, or delete it on its own. It goes wherever its Hive goes, including into the archive.

## Next step

Continue to [Data sources and credentials](data-sources.md) to connect the accounts your Code and Documentation Indexes sync from.
