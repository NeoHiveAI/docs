---
description: "Register an app in Microsoft Entra ID, save it as a SharePoint connection, and sync a document library into an Index."
---

# SharePoint

To connect SharePoint, you register an app in Microsoft Entra ID and save its values as a connection in NeoHive. Then you create an [Index](../concepts/glossary.md#index) that syncs one SharePoint document library. After each scheduled sync, the Index shows the files that people added, edited, renamed, moved, or deleted in the library.

Before you start, you need the following:

* A running NeoHive server that has a [Hive](../concepts/glossary.md#hive).
* A Microsoft 365 tenant in Microsoft's global cloud. NeoHive doesn't support SharePoint in GCC High, in DoD, or in Microsoft 365 operated by 21Vianet in China.
* A Microsoft 365 administrator with the Global Administrator or Privileged Role Administrator role. Only these roles can grant admin consent for Microsoft Graph application permissions. For more information, see [Grant tenant-wide admin consent](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/grant-admin-consent).
* Outbound HTTPS from the NeoHive server to `login.microsoftonline.com`, `graph.microsoft.com`, and your SharePoint host, such as `contoso.sharepoint.com`.

{% hint style="warning" %}
**SharePoint permissions don't carry into NeoHive.** NeoHive reads the library as an app, not as each person. Anyone who can use the Hive can read every file synced into it. Sync only a library that everyone with access to the Hive can read.
{% endhint %}

{% stepper %}
{% step %}
## Register an app in Microsoft Entra ID

NeoHive signs in to SharePoint as an app, so scheduled syncs run without anyone signed in. The app needs one Microsoft Graph permission of the **Application** type, either `Sites.Read.All` or `Sites.Selected`.

`Sites.Read.All` lets NeoHive read every site in your Microsoft 365 tenant. `Sites.Selected` limits NeoHive to the sites that you grant to the app, each with the `read` role. For more information about granting a site, see [Overview of Selected permissions](https://learn.microsoft.com/en-us/graph/permissions-selected-overview).

Add only one of the two permissions. If the app has both, `Sites.Read.All` applies. Either way, you grant the app access to whole sites, not to single libraries or folders. To sync only one folder, enter its path when you [create the Index](#create-the-index).

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
10. Copy the secret's **Value**, not its **Secret ID**. Microsoft shows the **Value** only once. The **Value** is about 40 random characters, and the **Secret ID** looks like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
11. Copy the secret's **Expires** date.

{% hint style="success" %}
**Check:** On **API permissions**, the permission's **Type** reads **Application** and its **Status** reads **Granted**. A **Delegated** permission gives NeoHive no access, because NeoHive signs in as the app.
{% endhint %}
{% endstep %}

{% step %}
## Save the connection

To save the app as a connection in NeoHive, do the following:

1. In the dashboard sidebar, click **Data Sources**.
2. On the **SharePoint** card, click **Install**.
3. Enter the values that you copied in these fields:

   | Field | Value |
   |---|---|
   | **Tenant ID** | **Directory (tenant) ID** from the app's **Overview** page |
   | **Client ID** | **Application (client) ID** from the app's **Overview** page |
   | **Client secret** | The secret's **Value** |
   | **Secret expires (optional)** | The secret's **Expires** date. NeoHive warns you 30 days before the secret expires |
   | **Name (optional)** | A label, such as `Contoso SharePoint`. If you leave the name blank, NeoHive uses the app's name. If NeoHive can't read the app's name, it uses your SharePoint address |

4. Click **Save connection**.

NeoHive checks the values with Microsoft before it saves the connection. If Microsoft rejects them, NeoHive doesn't save the connection and shows the reason. For the fix for each message, see [Fix a connection that fails](#fix-a-connection-that-fails).

Each connection works with one Microsoft 365 tenant. To sync libraries from another tenant, save another connection. Each SharePoint connection needs its own name, so NeoHive asks for a different name if another connection already uses it.

If you add or fix a permission after you save the connection, wait a minute, and then click **Validate** on the connection. NeoHive asks Microsoft for a new token, which carries the new permission. For more information about changing a connection later or seeing which Indexes use it, see [Data sources and credentials](../admin/data-sources.md).

{% hint style="success" %}
**Check:** **SharePoint** appears under **Connected**. After you click **Manage**, your connection shows **Valid**. This check confirms only that the app can sign in. To see whether the app can read a site, open the site's Index after its first sync.
{% endhint %}
{% endstep %}

{% step %}
## Create the Index

How you choose the site depends on the app's permission. With `Sites.Read.All`, you select the site from a list of team and communication sites. The list doesn't show OneDrive or the sites that SharePoint keeps for itself. With `Sites.Selected`, NeoHive can open only the sites that you granted, and it can't list them. NeoHive shows **This connection can't list its sites**, and you paste the site's address instead.

To sync one folder instead of the whole library, enter the folder's path in **Folder path (optional)**, such as `Engineering/Specs`. Start the path inside the library: for the **Documents** library, enter `Engineering/Specs`, not `Documents/Engineering/Specs`. You can also paste the folder's address from your browser while the folder is open in SharePoint.

To create the Index, do the following:

1. In the dashboard, open your Hive.
2. Next to **Indexes**, click **+**.
3. Select **SharePoint**.
4. Under **Connection**, select your SharePoint connection.
5. Under **SharePoint site**, select the site. If the connection can't list its sites, paste the address of a site that you granted to the app, such as `https://contoso.sharepoint.com/sites/team-docs`, and then click **Resolve**.
6. Under **Document library**, select the library to sync.
7. Under **Sync interval**, select **Every 15 minutes**, **Every 30 minutes**, **Every hour**, **Every 4 hours**, or **Daily**.
8. Under **Index name**, keep the name that NeoHive fills in from the site name, or enter another name.
9. Click **Create Index**.

NeoHive creates the Index and starts the first sync. The first sync reads the whole library, so it takes longer than later syncs.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** On the Index page, click the **Sync Settings** tab. **Sync history** shows the first run. The **Files** tab lists each file under **Synced files**, with its import status.

If the run fails, see [Fix a connection that fails](#fix-a-connection-that-fails).
{% endhint %}

## What a sync does

On each sync, NeoHive asks SharePoint for the changes since the last sync. NeoHive applies the changes to the Index as follows:

| Change in SharePoint | What NeoHive does |
|---|---|
| A file is added | Downloads and indexes the file |
| A file is edited | Downloads and indexes the file again. NeoHive skips a file whose content didn't change |
| A file or folder is renamed or moved | Updates the file's path. NeoHive removes a file moved out of the chosen folder, and adds a file moved into it |
| A file or folder is deleted | Removes the file, or every file in the folder, from the Index |

NeoHive syncs the same file types that you can upload. For the list and the size limit, see [Supported file types](../reference/file-types.md). NeoHive converts older Word (`.doc`) and PowerPoint (`.ppt`) files to PDF as it downloads them. NeoHive doesn't sync SharePoint pages, such as news and wiki pages.

NeoHive counts other file types and files over the size limit as skipped. If someone renames a synced file to an unsupported type, or the file grows past the size limit, NeoHive removes the file from the Index. Your agent then can't recall text from a file that the Index no longer holds.

To change or delete a synced file, edit or delete the file in SharePoint. The next sync updates the Index.

## Manage the sync

The Index's **Sync Settings** tab shows the **Service**, the **Source** (the site, library, and folder), the **Sync interval**, and the **Status**. An Index syncs one library, so to sync another library, create another Index.

{% hint style="danger" %}
**Removing the source also removes its synced files from the Index.** The Index itself stays. To sync the library again, create a new Index.
{% endhint %}

The following table shows how to change the sync:

| To do this | Do this |
|---|---|
| Sync now, without waiting for the schedule | Click **Sync now** at the top of the Index page |
| Pause scheduled syncs | Click **Pause**. To start scheduled syncs again, click **Resume**. **Sync now** still works while the source is paused |
| Sync more or less often | Select another option under **Sync interval**. The next sync follows the new interval |
| Stop syncing the library | Under **Remove sync source** on the **Sync Settings** tab, click **Remove source**, and then click **Remove** |

## Replace an expired client secret

A client secret expires on the date that the administrator chose when they created it. If you entered **Secret expires (optional)**, the connection shows a warning 30 days before that date. NeoHive also checks every connection once a day, so NeoHive flags an expired secret within a day.

The replace form has two optional fields. Enter the new expiry date in **New secret expires (optional)**, so the 30-day warning matches the new secret. If the administrator registered a new app instead of adding a secret, paste the new app's **Application (client) ID** into **New client ID (optional)**.

To replace the secret, do the following:

1. In the Microsoft Entra admin center, create a new client secret for the app.
2. Copy the new secret's **Value** and **Expires** date.
3. In the dashboard sidebar, click **Data Sources**.
4. On the **SharePoint** card, click **Manage**.
5. On the connection, click **Replace secret**.
6. Paste the new **Value** into **New client secret**.
7. Click **Replace and validate**.

NeoHive checks the new values with Microsoft before it saves them. If Microsoft rejects them, NeoHive keeps the current values and shows the reason. When the check passes, the connection shows **Valid** again, and the Index's next sync continues from where it stopped.

You can't change the tenant ID. Each Index belongs to a site in one tenant, so a different tenant needs a new connection and a new Index.

## Fix a connection that fails

NeoHive shows an error message at three points: when you save or validate the connection, when you choose a site or library, and when a sync runs. Find the message in the section for the point where you saw it.

### Errors when you save or validate the connection

The following table lists the messages that NeoHive can show when you save or validate the connection:

| Message | Cause | What to do |
|---|---|---|
| `That looks like the Secret ID (a GUID). Copy the secret's Value instead, which is about 40 random characters.` | **Client secret** holds the **Secret ID**, not the **Value** | Create a new secret, and then copy its **Value** |
| `The SharePoint client secret has expired. Paste a new one.` | The secret reached its expiry date | [Replace the client secret](#replace-an-expired-client-secret) |
| `The SharePoint client secret is wrong or was deleted in Entra. Paste a current one.` | Microsoft doesn't recognize the secret. Either **Client secret** holds the **Secret ID**, or someone deleted the secret under **Certificates & secrets** | Create a new secret, and then copy its **Value** |
| `The Entra app has no SharePoint permission with admin consent. In API permissions, add Sites.Read.All or Sites.Selected as an Application permission, then select Grant admin consent.` | Admin consent is missing or was withdrawn, or the permission has the **Delegated** type | Fix the permission as described in [Register an app in Microsoft Entra ID](#register-an-app-in-microsoft-entra-id), wait a minute, and then click **Validate** |
| `The Entra tenant was not found. Check the Tenant ID.` | **Tenant ID** doesn't match a Microsoft 365 tenant | Copy **Directory (tenant) ID** from the app's **Overview** page again |
| `The Entra application was not found. Check the Client ID.` | **Client ID** doesn't match an app in the tenant | Copy **Application (client) ID** from the app's **Overview** page again |

If NeoHive can't reach Microsoft, NeoHive saves the connection as **Unvalidated**. Check that the NeoHive server can reach `login.microsoftonline.com`, `graph.microsoft.com`, and your SharePoint host.

### Errors when you choose a site or library

The following table lists the messages that NeoHive can show when you create the Index:

| Message | Cause | What to do |
|---|---|---|
| `The app registration has no access to that site. Grant it Sites.Read.All, or grant this site under Sites.Selected.` | The app has `Sites.Selected`, and the site isn't granted to the app | Grant the site to the app. For more information, see [Overview of Selected permissions](https://learn.microsoft.com/en-us/graph/permissions-selected-overview) |
| `SharePoint refused the app registration. In Entra, check that Sites.Read.All or Sites.Selected is listed under API permissions with type Application (not Delegated) and status Granted, then try again.` | The permission has the **Delegated** type, or admin consent is missing | Fix the permission as described in [Register an app in Microsoft Entra ID](#register-an-app-in-microsoft-entra-id), wait a minute, and then try again |
| `SharePoint could not find that site or library.` | The pasted address doesn't match a site | Copy the site's address from your browser while the site is open, and then click **Resolve** again |

### Errors during a sync

When a sync fails, the Index's **Sync Settings** tab shows the message. NeoHive tries the sync again at each sync interval, so the source syncs again by itself after you fix the cause. The following table lists the messages:

| Message | Cause | What to do |
|---|---|---|
| `The app registration cannot read "<site> / <library>". Grant it Sites.Read.All, or grant this site under Sites.Selected.` | The app lost access to the site, for example because someone removed its `Sites.Selected` grant | Grant the site to the app again, and then click **Sync now** |
| `NeoHive lost access to "<site> / <library>". The Entra app has no SharePoint permission with admin consent. ...` | Someone withdrew admin consent for the app's permissions. At its next daily check, NeoHive also marks the connection **Invalid** | Grant admin consent again, and then click **Sync now** |
| `SharePoint could not find the library "<library>" on "<site>". It may have been deleted or moved.` | The library no longer exists at that address | Remove the source, and then create a new Index for the library's new location |
| `The folder "<folder>" no longer exists, so its files were removed from the Index. Remove this source, or create a new Index for the folder's new location.` | Someone deleted or moved the folder in **Folder path (optional)** | Remove the source. To keep syncing the folder, create a new Index for its new location |
| `The connection this source uses was deleted. Remove this source, or add a connection and create the Index again.` | Someone deleted the connection on the **Data Sources** page | Remove the source, save a new connection, and then create the Index again |

A file that NeoHive can't download doesn't stop the sync. For example, Microsoft can't convert some older Word files to PDF. NeoHive counts such a file as skipped and tries again the next time the file changes.
