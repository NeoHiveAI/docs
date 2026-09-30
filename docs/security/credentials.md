---
description: "How NeoHive stores, checks, rotates and removes the GitHub, GitLab and Jira tokens it uses to reach your data sources."
---

# Credentials and secrets

You learn where your data source tokens live, how they are protected, and how to rotate or remove one.

<figure><img src="../.gitbook/assets/security-credentials.svg" alt="A token goes from Data Sources, to a check with GitHub or GitLab, to NeoHive's database encrypted, to the clone's git config unencrypted, all in the neohive-data volume."><figcaption></figcaption></figure>

Each **connection** on the **Data Sources** page (`http://localhost:3577/sources`) holds one secret: a GitHub or GitLab Personal Access Token, a Jira API token or personal access token, or an SSH private key for GitHub or GitLab.

| What | Where it lives | How it is protected |
|---|---|---|
| The token or SSH key | NeoHive's database in the `neohive-data` volume | Encrypted with AES-256-GCM. The dashboard and API never return it |
| The encryption key | `/app/data/.encryption_key` in the same volume, created on first start | Readable only by its owner. If you start the container yourself, you can pass your own 64-hex-character key in `MEMVEC_ENCRYPTION_KEY` instead |
| The token, for HTTPS clones | The clone's git config under `/app/data/repos/` | Not encrypted |
| An SSH key during a git command | A temporary file inside the container | Readable only by its owner, deleted when the command ends |

{% hint style="warning" %}
**Anyone who can read the `neohive-data` volume, or a backup of it, can read your tokens.** The volume holds the encrypted tokens, the key that decrypts them, and the plain token in each HTTPS clone. Protect backups as you would the tokens, and give tokens read-only scopes.
{% endhint %}

## How NeoHive checks a token

NeoHive tests a new token with GitHub, GitLab or your Jira site before saving it. If the provider rejects it, nothing is saved. If the provider cannot be reached, or a Jira connection has no site URL, the connection is saved as **Unvalidated**.

Each connection shows **Valid**, **Invalid** or **Unvalidated**. NeoHive rechecks a connection at most once every 23 hours. To check now, click **Manage** on the service card, then **Validate** on the connection.

## Rotate a token

You cannot edit a connection's secret. Add a new connection and move your Indexes onto it.

{% stepper %}
{% step %}
## Add the new token

Create a new token with the provider, keeping the old one active. On **Data Sources**, add it as a connection.
{% endstep %}

{% step %}
## Move each Index onto it

Open each Index that used the old connection and pick the new one in its **Connection** field. The next sync writes the new token into that clone.
{% endstep %}

{% step %}
## Remove the old one

Delete the old connection on **Data Sources**, then revoke the old token with the provider.
{% endstep %}
{% endstepper %}

## Remove a connection

Click **Manage** on the service card, then **Delete** on the connection. Any Index that used it is flagged "No connection" until you assign another.

Revoke the token with the provider as well. Deleting the connection removes NeoHive's encrypted copy, but an existing clone still holds the token in its git config.

{% hint style="danger" %}
**Keep the encryption key with the data.** If `/app/data/.encryption_key` is lost, or `MEMVEC_ENCRYPTION_KEY` changes, NeoHive cannot decrypt the stored connections. You then have to add every connection again.
{% endhint %}

## Next step

Continue to [Exposing NeoHive beyond your network](network.md).
