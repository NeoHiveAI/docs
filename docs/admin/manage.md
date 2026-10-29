---
description: "Archive, restore, delete, move, and share Hives and Indexes from the NeoHive dashboard."
---

# Manage Hives and Indexes

As your work changes, you tidy up your [Hives](../concepts/glossary.md#hive) and [Indexes](../concepts/glossary.md#index): you rename or retire a Hive, move an Index to another Hive, or let two Hives search one Index. You can undo some of these actions but not others, so check the following tables before you act.

A Hive is the workspace your agent connects to, and an Index is one store of searchable context inside a Hive. For more terms, see the [NeoHive glossary](../concepts/glossary.md).

The following actions apply to a whole Hive. You find them in the ⋮ menu on the Hive's card on the home screen, or in the ⋯ menu next to the Hive's name in the sidebar.

| Action | What it does | Can you undo it? |
|---|---|---|
| **Edit** | Renames the Hive or changes its icon | Yes. Edit the Hive again |
| **Archive** | Moves the Hive to the **Archived** section | Yes. Select **Restore** within 30 days |
| **Delete** | Permanently deletes the Hive and everything in it | No |

The following actions apply to one Index.

| Action | Where you find it | Can you undo it? |
|---|---|---|
| **Share Index…** | The Index row's ⋮ menu on the Hive page, or the **Index Info** tab | Yes. Select **Revoke** |
| **Move Index…** | The Index row's ⋮ menu on the Hive page, or the **Index Info** tab | Yes. Move the Index back |
| Add a Shared Index | **+** next to **Indexes** on the Hive page | Yes. Select **Remove from Hive…** |
| **Delete repository** | The **Sync Settings** tab | No |
| **Delete Index** | The **Index Info** tab, under **Danger zone** | No |

## Rename a Hive

To rename a Hive or change its icon, do the following:

1. In the Hive's ⋮ menu on the home screen, or its ⋯ menu in the sidebar, select **Edit**.
2. In **Name**, enter the new name. If another Hive already uses the name, including an archived Hive, the dialog says so and you cannot save.
3. Optional: Under **Icon**, choose a different icon.
4. Select **Save**.

The new name appears on the Hive's card and in the sidebar. Your agents keep working, because each Hive's [MCP](../concepts/glossary.md#mcp) endpoint uses the Hive's ID, not its name. The server name in your agent's configuration still shows the old name, which does not affect how the agent works.

## Archive or delete a Hive

You cannot archive or delete a Hive while another Hive uses one of its Indexes, because the other Hive would lose that Index too. First, either [move the Index](#move-an-index-to-another-hive) to the Hive that uses it, which keeps its access, or [stop sharing it](#stop-sharing-an-index). A Hive that only uses another Hive's Index has no such limit.

<figure><img src="../.gitbook/assets/admin-manage.svg" alt="Archive moves an active Hive to the Archived section, and Restore brings it back. NeoHive permanently deletes an archived Hive after 30 days, or when you select Delete Permanently. Delete on an active Hive, after you type its name, also permanently deletes the Hive. A deleted Hive cannot be restored."><figcaption></figcaption></figure>

### Archive and restore a Hive

Archive a Hive you no longer use but might want back. NeoHive keeps an archived Hive for 30 days, and then deletes it.

To archive a Hive, do the following:

1. In the Hive's ⋮ menu on the home screen, or its ⋯ menu in the sidebar, select **Archive**.
2. In the dialog, select **Archive**.

NeoHive moves the Hive to the **Archived** section at the bottom of the home screen, which shows how many days are left.

To restore an archived Hive, do the following:

1. On the home screen, expand **Archived**.
2. On the Hive, select **Restore**.

The Hive returns to the home screen with its Indexes and [Memories](../concepts/glossary.md#memory).

### Delete a Hive

{% hint style="danger" %}
Deleting a Hive removes every Memory, Index, sync history, and setting in the Hive. You cannot undo the deletion.
{% endhint %}

To delete an active Hive, do the following:

1. In the Hive's ⋮ menu on the home screen, or its ⋯ menu in the sidebar, select **Delete**.
2. Type the Hive's name.
3. Select **Delete permanently**.

To delete an archived Hive before its 30 days are up, do the following:

1. On the home screen, expand **Archived**.
2. On the Hive, select **Delete Permanently**.
3. Select **Confirm**.

## Move an Index to another Hive

To move an Index, do the following:

1. Select **Move Index…** in one of these places:
   - On the Hive page, in the Index row's ⋮ menu.
   - On the Index page, on the **Index Info** tab.
2. Under **Move to**, select a Hive.
3. Select **Move Index**.

Both Hives pause briefly while the data moves, and then they resume on their own. The Index now appears on the other Hive's page.

## Share an Index between Hives

A [Shared Index](../concepts/glossary.md#shared-index) is one Index that several Hives search, so NeoHive indexes a repository only once. One Hive owns the Index, and the other Hives use it.

{% hint style="warning" %}
A Shared Index is one Index, not a copy. A change made from any Hive affects every Hive that uses the Index. For what each Hive can change, see [Shared Index](../concepts/hives-indexes-memories.md#shared-index).
{% endhint %}

You can set up a Shared Index from either Hive:

- From the Hive that owns the Index, share the Index with another Hive.
- From the Hive that wants the Index, add an Index that another Hive owns.

### Share an Index with another Hive

To share an Index from the Hive that owns it, do the following:

1. Select **Share Index…** in one of these places:
   - On the Hive page, in the Index row's ⋮ menu.
   - On the Index page, on the **Index Info** tab.
2. Under **Add a Hive**, select the Hive that should use the Index.
3. Select **Share**.

The Hive appears under **Shared with**, and the Index appears on that Hive's page.

### Add another Hive's Index to your Hive

To add an Index that another Hive owns, do the following:

1. On your Hive page, next to **Indexes**, select **+**.
2. Select **Shared Index**.
3. Select an Index. The list shows only active Indexes that your Hive does not already use.
4. Select **Add shared Index**.

The Index appears in your Hive's **Indexes** list with a **Shared** badge. The owning Hive does not have to approve.

To open the Hive that owns the Index, select **Owner Hive** in the Index row's ⋮ menu, or select **Open in** on the **Index Info** tab.

### Stop sharing an Index

Either Hive can stop sharing the Index. NeoHive deletes nothing when sharing stops: the Index and its Memories stay with the owning Hive.

| You are on | To stop sharing |
|---|---|
| The owning Hive | Open **Share Index…**, and then select **Revoke** next to the Hive |
| The Hive using the Index | In the Index row's ⋮ menu, select **Remove from Hive…** |

The owning Hive cannot delete a Shared Index while another Hive uses it. To delete the Index, stop sharing it with every Hive first.

## Delete an Index

{% hint style="danger" %}
Deleting an Index removes the Index, its sync settings, and all its Memories. You cannot undo the deletion.
{% endhint %}

Only the Hive that owns an Index can delete it. If the Index is shared, stop sharing it with every Hive first. To delete an Index, do the following:

1. Open the Index, and then select the **Index Info** tab.
2. Under **Danger zone**, select **Delete Index**.
3. Select **Delete**.

{% hint style="info" %}
The **Sync Settings** tab of a [Code](../concepts/glossary.md#code-index) or [Documentation Index](../concepts/glossary.md#documentation-index) also has a **Delete repository** button. It stops syncing and permanently deletes the Index's Memories, but keeps the empty Index.
{% endhint %}

## The Knowledge Index stays with its Hive

Every Hive has one [Knowledge Index](../concepts/glossary.md#knowledge-index), where your agent's Memories live. You cannot move, share, rename, or delete the Knowledge Index on its own. The Knowledge Index goes wherever its Hive goes, including into the archive.
