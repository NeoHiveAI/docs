---
description: "Register an app in Microsoft Entra ID, save it as a SharePoint connection, and sync a document library into an Index."
---

# SharePoint

To connect SharePoint, you register an app in Microsoft Entra ID and save its values as a connection in NeoHive. Then you create an [Index](../concepts/glossary.md#index) that syncs one SharePoint document library. After each scheduled sync, the Index shows the files that people added, edited, renamed, moved, or deleted in the library.

Before you start, you need the following:

* A running NeoHive server that has a [Hive](../concepts/glossary.md#hive).
* A Microsoft 365 tenant in Microsoft's global cloud. NeoHive doesn't support SharePoint in GCC High, in DoD, or in Microsoft 365 operated by 21Vianet in China.
* A Microsoft 365 admin with the Global Administrator or Privileged Role Administrator role. Only these roles can grant admin consent for Microsoft Graph application permissions. For more information, see [Grant tenant-wide admin consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent).
* Outbound HTTPS from the NeoHive server to `login.microsoftonline.com`, `graph.microsoft.com`, and your SharePoint host, such as `contoso.sharepoint.com`.

{% hint style="warning" %}
**SharePoint permissions don't carry into NeoHive.** NeoHive reads the library as an app, not as each person. Anyone who can use the Hive can read every file synced into it. Sync only a library that everyone with access to the Hive may read.
{% endhint %}

{% stepper %}
{% step %}
## Register an app in Microsoft Entra ID

NeoHive signs in to SharePoint as an app, so scheduled syncs run without anyone signed in. The app needs one Microsoft Graph permission of the **Application** type. Choose one of the following permissions:

| Permission | What NeoHive can read | Extra setup |
|---|---|---|
| `Sites.Read.All` | Every site in your Microsoft 365 tenant | None |
| `Sites.Selected` | Only the sites that you grant to the app | Grant each site to the app with the `read` role. See [Overview of Selected permissions](https://learn.microsoft.com/en-us/graph/permissions-selected-overview) |

Choose `Sites.Selected` to keep NeoHive out of every site that you don't grant. Add only one permission. If the app has both, `Sites.Read.All` applies.

Grant the app access to whole sites, not to single libraries or folders. To sync only one folder, enter it in **Folder path (optional)** when you [create the Index](#create-the-index).

To register the app, do the following in the [Microsoft Entra admin center](https://entra.microsoft.com):

1. Go to **Entra ID** > **App registrations**.
2. Click **New registration**.
3. Select the single tenant option, and then click **Register**. For more information, see [Register an app in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app).
4. On the app's **Overview** page, copy **Directory (tenant) ID** and **Application (client) ID**.
5. Go to **API permissions**, and then click **Add a permission**.
6. Click **Microsoft Graph**, and then click **Application permissions**.
7. Select `Sites.Read.All` or `Sites.Selected`, and then click **Add permissions**.
8. Click **Grant admin consent for** your tenant.
9. Go to **Certificates & secrets** > **Client secrets**, and then click **New client secret**. For more information, see the **Add a client secret** tab in [Add and manage app credentials](https://learn.microsoft.com/en-us/entra/identity-platform/how-to-add-credentials).
10. Copy the secret's **Value** and its **Expires** date. Microsoft shows the value only once.

{% hint style="warning" %}
**Copy the Value column, not the Secret ID column.** The **Secret ID** looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`. The **Value** is about 40 random characters. NeoHive refuses a secret that looks like a Secret ID.
{% endhint %}

On **API permissions**, check that the permission's **Type** reads **Application** and its **Status** reads **Granted**. A **Delegated** permission gives NeoHive no access, because NeoHive signs in as the app.
{% endstep %}

{% step %}
## Save the connection

To save the app as a connection in NeoHive, do the following:

1. In the dashboard, open **Data Sources** at the bottom of the sidebar.
2. On the **SharePoint** card, click **Install**.
3. Fill in the fields with the values that you copied:

   | Field | Value |
   |---|---|
   | **Tenant ID** | **Directory (tenant) ID** from the app's **Overview** page |
   | **Client ID** | **Application (client) ID** from the app's **Overview** page |
   | **Client secret** | The secret's **Value** |
   | **Secret expires (optional)** | The secret's **Expires** date. NeoHive warns you 30 days before the secret expires |
   | **Name (optional)** | A label, such as `Contoso SharePoint`. If you leave it blank, NeoHive uses the app's name, or your SharePoint address when it can't read the app's name |

4. Click **Save connection**.

NeoHive checks the values with Microsoft before it saves the connection. If Microsoft rejects them, NeoHive doesn't save the connection and shows the reason. For each message, see [Fix a connection that fails](#fix-a-connection-that-fails).

A connection reaches one Microsoft 365 tenant. To sync libraries from another tenant, save another connection. Each SharePoint connection needs its own name. If another connection already has the name, NeoHive asks you to enter a different one.

If you add or fix a permission after you save the connection, wait a minute. Then click **Validate** on the connection. NeoHive asks Microsoft for a new token, which carries the new permission.

{% hint style="success" %}
**Check:** **SharePoint** appears under **Connected**, and **Manage** lists your connection as **Valid**. The check confirms that the app can sign in. Whether the app can read a site shows on that site's Index after its first sync.
{% endhint %}
{% endstep %}

{% step %}
## Create the Index

To create the Index, do the following:

1. In the dashboard, open your Hive.
2. Next to **Indexes**, click **+**.
3. Select **SharePoint**.
4. Under **Connection**, select your SharePoint connection.
5. Select the site:
   * With `Sites.Read.All`, select the site from the list. The list shows team and communication sites. It doesn't show OneDrive or the sites that SharePoint keeps for itself.
   * With `Sites.Selected`, NeoHive can open only the sites that you granted, and it can't list them. NeoHive shows **This connection can't list its sites**. Paste the address of a site that you granted to the app, such as `https://contoso.sharepoint.com/sites/team-docs`, and then click **Resolve**.
6. Under **Document library**, select the library to sync.
7. Optional: To sync one folder instead of the whole library, enter it in **Folder path (optional)**, such as `Engineering/Specs`.
   * Start the path inside the library. For the **Documents** library, enter `Engineering/Specs`, not `Documents/Engineering/Specs`.
   * You can also paste the folder's address from your browser while the folder is open in SharePoint.
8. Under **Sync interval**, select **Every hour**, **Every 4 hours**, or **Daily**.
9. Check **Index name**. NeoHive fills it in from the site name.
10. Click **Create Index**.

NeoHive creates the Index and starts the first sync. The first sync reads the whole library, so it takes longer than later syncs.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** NeoHive syncs the library.

Open the Index's **SharePoint** tab. **Recent syncs** shows the first run, and **Synced files** lists each file with its import status.

If the run fails, see [Fix a connection that fails](#fix-a-connection-that-fails).
{% endhint %}

## What a sync does

On each sync, NeoHive asks SharePoint for the changes since the last sync. NeoHive applies the changes to the Index as follows:

| Change in SharePoint | What NeoHive does |
|---|---|
| A file is added | Downloads and indexes the file |
| A file is edited | Downloads and indexes the file again. A file whose content didn't change is skipped |
| A file or folder is renamed or moved | Updates the file's path. A file moved out of the chosen folder is removed, and a file moved into it is added |
| A file or folder is deleted | Removes the file, or every file in the folder, from the Index |

NeoHive syncs the same file types that you can upload. For the list and the size limit, see [Supported file types](../reference/file-types.md). NeoHive converts older Word (`.doc`) and PowerPoint (`.ppt`) files to PDF as it downloads them. Other file types and files over the size limit are counted as skipped. If a synced file is renamed to an unsupported type or grows past the size limit, NeoHive removes it from the Index, so your agent doesn't recall text from a file that the Index no longer holds. SharePoint pages, such as news and wiki pages, aren't synced.

To change or delete a synced file, edit it in SharePoint. The next sync updates the Index.

## Manage the sync

The Index's **SharePoint** tab shows the **Site**, **Library**, **Folder**, **Sync interval**, and **Status**. From the tab, you can do the following:

| To do this | Do this |
|---|---|
| Sync now, without waiting for the schedule | Click **Sync now** |
| Stop scheduled syncs for a while | Click **Pause**. To start them again, click **Resume**. **Sync now** still works while the source is paused |
| Sync more or less often | Select another option under **Sync interval**. The next sync follows the new interval |
| Stop syncing the library | Click **Remove source**, and then click **Remove** |

An Index syncs one library. To sync another library, create another Index.

{% hint style="danger" %}
**Removing the source also removes its synced files from the Index.** The Index itself stays. To sync the library again, create a new Index.
{% endhint %}

## Replace an expired client secret

A client secret expires on the date that the admin chose when they created it. If you entered **Secret expires (optional)**, the connection shows a warning 30 days before that date. NeoHive also checks every connection once a day, so an expired secret is flagged within a day.

To replace the secret, do the following:

1. In the Microsoft Entra admin center, create a new client secret for the app, and copy its **Value** and **Expires** date.
2. In the dashboard, open **Data Sources**.
3. On the **SharePoint** card, click **Manage**.
4. On the connection, click **Replace secret**.
5. Paste the new **Value** into **New client secret**.
6. Optional: Enter the new **Expires** date in **New secret expires (optional)**.
7. Optional: If the admin registered a new app, paste its **Application (client) ID** into **New client ID (optional)**.
8. Click **Replace and validate**.

NeoHive checks the new values with Microsoft before it saves them. If Microsoft rejects them, NeoHive keeps the current values and shows the reason. When the check passes, the connection shows **Valid** again, and the Index's next sync continues from where it stopped.

You can't change the tenant ID. Each Index belongs to a site in one tenant, so a different tenant needs a new connection and a new Index.

## Fix a connection that fails

When you save or validate the connection, NeoHive can show the following messages:

| Message | Cause | What to do |
|---|---|---|
| `The SharePoint client secret has expired. Paste a new one.` | The secret reached its expiry date | [Replace the client secret](#replace-an-expired-client-secret) |
| `The SharePoint client secret is wrong or was deleted in Entra. Paste a current one.` | Microsoft doesn't recognize the secret. The Secret ID was often copied instead of the Value, or the secret was deleted under **Certificates & secrets** | Create a new secret, and then copy its **Value** |
| `The Entra app has no SharePoint permission with admin consent. In API permissions, add Sites.Read.All or Sites.Selected as an Application permission, then select Grant admin consent.` | Admin consent wasn't granted, was withdrawn, or the permission was added as **Delegated** | Fix the permission as described in [Register an app in Microsoft Entra ID](#register-an-app-in-microsoft-entra-id), wait a minute, and then click **Validate** |
| `The Entra tenant was not found. Check the Tenant ID.` | **Tenant ID** doesn't match a Microsoft 365 tenant | Copy **Directory (tenant) ID** from the app's **Overview** page again |
| `The Entra application was not found. Check the Client ID.` | **Client ID** doesn't match an app in the tenant | Copy **Application (client) ID** from the app's **Overview** page again |

When you choose a site or library, NeoHive can show the following messages:

| Message | Cause | What to do |
|---|---|---|
| `The app registration has no access to that site. Grant it Sites.Read.All, or grant this site under Sites.Selected.` | The app has `Sites.Selected`, and the site isn't granted to it | Grant the site to the app. See [Overview of Selected permissions](https://learn.microsoft.com/en-us/graph/permissions-selected-overview) |
| `SharePoint refused the app registration. In Entra, check that Sites.Read.All or Sites.Selected is listed under API permissions with type Application (not Delegated) and status Granted, then try again.` | The permission was added as **Delegated**, or admin consent wasn't granted | Fix the permission as described in [Register an app in Microsoft Entra ID](#register-an-app-in-microsoft-entra-id), wait a minute, and then try again |
| `SharePoint could not find that site or library.` | The pasted address doesn't match a site | Copy the site's address from your browser while the site is open, and then click **Resolve** again |

When a sync fails, the Index's **Sync Settings** tab can show the following messages. The source retries at its sync interval, and syncs again by itself once the cause is fixed:

| Message | Cause | What to do |
|---|---|---|
| `The app registration cannot read "<site> / <library>". Grant it Sites.Read.All, or grant this site under Sites.Selected.` | The app lost access to the site, for example because its `Sites.Selected` grant was removed | Grant the site to the app again, and then click **Sync now** |
| `NeoHive lost access to "<site> / <library>". The Entra app has no SharePoint permission with admin consent. ...` | Admin consent for the app's permissions was withdrawn. The connection is also marked **Invalid** at its next daily check | Grant admin consent again, and then click **Sync now** |
| `SharePoint could not find the library "<library>" on "<site>". It may have been deleted or moved.` | The library no longer exists at that address | Remove the source, and then create a new Index for the library's new location |
| `The folder "<folder>" no longer exists in SharePoint, so its files were removed from the Index. Remove this source, or create a new Index for the folder's new location.` | The folder in **Folder path (optional)** was deleted or moved | Remove the source. To keep syncing the folder, create a new Index for its new location |
| `The SharePoint connection this source uses was deleted. Remove this source, or add a connection and create the Index again.` | The connection was deleted on the **Data Sources** page | Remove the source, save a new connection, and then create the Index again |

A file that NeoHive can't download, such as an older Word file that Microsoft can't convert to PDF, doesn't stop the sync. NeoHive counts the file as skipped and tries again the next time the file changes.

If NeoHive can't reach Microsoft, it saves the connection as **Unvalidated**. Check that the NeoHive server can reach the hosts listed at the start of this page.

## Next step

To change the connection later, or to see which Indexes use it, see [Data sources and credentials](../admin/data-sources.md).
