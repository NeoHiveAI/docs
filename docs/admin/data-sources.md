---
description: "Add, check, and remove the GitHub and GitLab connections that NeoHive uses to sync Code and Documentation Indexes."
---

# Data sources and credentials

This page explains how to add a GitHub or GitLab connection, check that it still works, and replace it without stopping sync.

A connection is a saved login that lets NeoHive read repositories from one account. Code and Documentation Indexes sync through a connection. An Index is one store of searchable context inside a Hive, the workspace your agent connects to. For more terms, see the [NeoHive glossary](../concepts/glossary.md).

To see your connections, open **Data Sources** at the bottom of the sidebar, or go to `http://localhost:3577/sources`.

<figure><img src="../.gitbook/assets/admin-data-sources.svg" alt="A GitHub or GitLab account gives a token to a connection that you save on Data Sources. Each connection shows its credential type, personal access token (PAT) or SSH key. Each connection also shows its state: Valid, Invalid, or Unvalidated. Several Code and Documentation Indexes can sync through one connection. You choose the connection under Connection on each Index's Sync Settings tab. If you delete the connection, those Indexes keep their Memories and show a No connection badge, and they stop syncing."><figcaption></figcaption></figure>

| Service | Use it for | Credential |
|---|---|---|
| **GitHub** | Repositories on `github.com` | Personal access token (PAT) or SSH private key |
| **GitLab** | Repositories on `gitlab.com` or your own GitLab server | Personal access token or SSH private key |
| **Jira** | You cannot connect Jira. The card shows **Coming soon** | None |

## Add a connection

To add a connection, do the following:

{% stepper %}
{% step %}
## Open the form

On the **GitHub** or **GitLab** card under **Available**, select **Install**. If you are adding an Index, you can instead select **Add a new connection** from the **Connection** list.
{% endstep %}

{% step %}
## Fill in the form

| Field | What to enter |
|---|---|
| **GitLab Base URL** | This field is for GitLab only. Enter your server address, such as `https://gitlab.example.com`. Leave the field blank for `gitlab.com` |
| **Name** | Enter a label, such as `Acme GitHub`. You can use each name only once for each service |
| **PAT** or **SSH** | Paste a **Personal Access Token**, or switch to **SSH** and paste an **SSH Private Key** |

**Create a PAT** opens your provider's token page with the required scopes already selected. Scopes are the permissions the token grants. On GitHub, the scope is `repo`. On GitLab, the scopes are `read_api` and `read_repository`.
{% endstep %}

{% step %}
## Save the connection

Select **Save connection**. NeoHive checks the token with the service first. If the service rejects the token, NeoHive does not save it. If you already saved the same token or account, the form warns you. To keep both, select **Add anyway**.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** the service now appears under **Connected**, and **Manage** lists your connection as **Valid**.
{% endhint %}

## Check or remove a connection

To check a connection, select **Manage** on its card under **Connected**. The connection shows one of the following states:

| State | Meaning |
|---|---|
| **Valid** | The last check passed |
| **Invalid** | The service rejected the credential. Replace the credential |
| **Unvalidated** | NeoHive saved the connection but has not checked it yet. To check now, select **Validate** |

**Bound Indexes** lists the Indexes in your current Hive that sync through the connection. **Delete** removes the connection.

{% hint style="warning" %}
When you delete a connection, every Index that syncs through the connection stops syncing. The Indexes keep their Memories and show a **No connection** badge.
{% endhint %}

To replace a token without a gap in syncing, do the following:

1. Add a new connection with the new token.
2. On each affected Index, open the **Sync Settings** tab.
3. Under **Connection**, select the new connection.
4. Select **Save settings**.
5. Delete the old connection.

The Indexes now sync through the new connection.

To learn how NeoHive stores these secrets, see [Credentials and secrets](../security/credentials.md).

## Next step

To decide who can reach your NeoHive instance, continue to [Access and sharing](access.md).
