---
description: "How NeoHive stores, checks, replaces, and removes the GitHub, GitLab, and Jira tokens it uses to reach your data sources."
---

# Credentials and secrets

This page explains where NeoHive stores your data source tokens and how it protects them. It also explains how to rotate (replace) or remove a token.

<figure><img src="../.gitbook/assets/security-credentials.svg" alt="You add a token on the Data Sources page. GitHub or GitLab checks the token. NeoHive stores the token encrypted in its database. The clone's git config holds the token unencrypted. The database and the clone are both in the neohive-data volume."><figcaption></figcaption></figure>

Each **connection** on the **Data Sources** page (`http://localhost:3577/sources`) holds one secret. The secret is one of the following:

- A GitHub or GitLab personal access token.
- A Jira API token or personal access token.
- An SSH private key for GitHub or GitLab.

| What | Where it lives | How it is protected |
|---|---|---|
| The token or SSH key | NeoHive's database in the `neohive-data` volume | NeoHive encrypts it with AES-256-GCM. The dashboard and API never show it |
| The encryption key | `/app/data/.encryption_key` in the same volume, created on first start | Only the file's owner can read it. If you start the container yourself, you can pass your own 64-hex-character key in `MEMVEC_ENCRYPTION_KEY` instead |
| The token, for HTTPS clones | The clone's git config under `/app/data/repos/` | NeoHive does not encrypt it |
| An SSH key during a git command | A temporary file inside the container | Only the file's owner can read it. NeoHive deletes the file when the command ends |

{% hint style="warning" %}
**Anyone who can read the `neohive-data` volume, or a backup of it, can read your tokens.** The volume holds the encrypted tokens, the key that decrypts them, and the plain token in each HTTPS clone. Protect backups as carefully as the tokens themselves. Give each token read-only scopes.
{% endhint %}

## How NeoHive checks a token

NeoHive tests a new token with GitHub, GitLab, or your Jira site before saving it. If the provider rejects the token, NeoHive does not save it. NeoHive saves the connection as **Unvalidated** in two cases: the provider cannot be reached, or a Jira connection has no site URL.

Each connection shows **Valid**, **Invalid**, or **Unvalidated**. NeoHive rechecks a connection at most once every 23 hours. To check a connection now, do the following:

1. On the service card, select **Manage**.
2. On the connection, select **Validate**.

The connection shows its new status.

## Rotate a token

You cannot edit a connection's secret. To rotate a token, add a new connection. Then move each [Index](../concepts/glossary.md#index) (one store of context inside a Hive) onto the new connection.

{% stepper %}
{% step %}
## Add the new token

Create a new token with the provider, and keep the old token active. On **Data Sources**, add the new token as a connection.
{% endstep %}

{% step %}
## Move each Index to the new connection

Open each Index that used the old connection. In the Index's **Connection** field, select the new connection. The next sync writes the new token into that Index's clone.
{% endstep %}

{% step %}
## Remove the old connection

On **Data Sources**, delete the old connection. Then revoke the old token with the provider.
{% endstep %}
{% endstepper %}

From their next sync, your Indexes use the new token.

## Remove a connection

To remove a connection, do the following:

1. On the service card, select **Manage**.
2. On the connection, select **Delete**.
3. Revoke the token with the provider.

Any Index that used the connection shows "No connection" until you assign another connection. Revoking the token matters because deleting the connection removes only NeoHive's encrypted copy. An existing clone still holds the token in its git config.

{% hint style="danger" %}
**Keep the encryption key with the data.** If `/app/data/.encryption_key` is lost, or `MEMVEC_ENCRYPTION_KEY` changes, NeoHive cannot decrypt the stored connections. You then need to add every connection again.
{% endhint %}

## Next step

Continue to [Exposing NeoHive beyond your network](network.md).
