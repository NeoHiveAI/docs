---
description: "Where NeoHive stores the GitHub and GitLab tokens it uses to reach your data sources, how it protects them, and which other secrets it keeps."
---

# Credentials and secrets

NeoHive needs a token or an SSH key to read your repositories. NeoHive keeps that secret so it can sync on its own, without asking you again. Read this page before a security review, before you back up NeoHive, or when you decide which scopes to give a token. It shows where each secret lives, who can read it, and what to do when you remove one.

<figure><img src="../.gitbook/assets/security-credentials.svg" alt="You add a token on the Data Sources page. Your provider checks the token. NeoHive stores the token encrypted in its database. For an HTTPS connection, the clone's git config holds the token unencrypted. The database and the clone are both in the neohive-data volume."><figcaption></figcaption></figure>

Each data source on the **Data Sources** page (`http://localhost:3577/sources`) can have several **connections**, for example one GitHub token for each organization. Each connection holds one secret: a personal access token or an SSH private key.

| What | Where it lives | How it is protected |
|---|---|---|
| Each connection's token or SSH key | NeoHive's database in the `neohive-data` volume | NeoHive encrypts it with AES-256-GCM. The dashboard and API never show it |
| The encryption key | `/app/data/.encryption_key` in the same volume. NeoHive creates the file on first start, unless you set `MEMVEC_ENCRYPTION_KEY` | Only the file's owner can read the file that NeoHive creates. If you start the container yourself, you can pass your own 64-hex-character key in `MEMVEC_ENCRYPTION_KEY` instead. NeoHive then uses that key and ignores the file |
| The token, for HTTPS clones | The clone's git config under `/app/data/repos/` | NeoHive does not encrypt it |
| An SSH key during a git command | A temporary file inside the container | Only the file's owner can read it. NeoHive deletes the file when the command ends |

{% hint style="warning" %}
**Anyone who can read the `neohive-data` volume, or a backup of it, can read your tokens.** The volume holds the encrypted tokens, the key that decrypts them, and the plain token in each HTTPS clone. Protect backups as carefully as the tokens themselves. Give each token read-only scopes.
{% endhint %}

## Check, rotate, or remove a connection

NeoHive checks each new token with the provider. If the provider rejects the token, NeoHive does not save the connection. If NeoHive cannot reach the provider, NeoHive saves the connection as **Unvalidated**. In the service's **Manage** dialog, each connection then shows **Valid**, **Invalid**, or **Unvalidated**. A connection becomes **Invalid** later if the provider stops accepting its token. To check, rotate, or remove a connection, follow the steps in [Check or remove a connection](../admin/data-sources.md#check-or-remove-a-connection).

Deleting a connection removes only NeoHive's encrypted copy of that connection's token. The service's other connections are not affected. An existing clone still holds the token in its git config, so also revoke the token with the provider.

{% hint style="danger" %}
**Keep the encryption key with the data.** If `/app/data/.encryption_key` is lost, NeoHive starts anyway and creates a new key. If `MEMVEC_ENCRYPTION_KEY` changes, NeoHive uses the new key. Either way, NeoHive cannot decrypt the stored connections. The connections stay on the **Data Sources** page, but every check and sync through them fails. You then need to add every connection again.
{% endhint %}

## Other secrets

NeoHive keeps two more secrets outside the connections:

| Secret | Where it lives | How it is protected |
|---|---|---|
| Your license key | The container's environment, set by the installer. A key you change in the dashboard is saved in NeoHive's database | NeoHive does not encrypt it. Anyone who can run `docker inspect` on the host, or read the volume, can read it |
| The webhook secret | The `MEMVEC_WEBHOOK_SECRET` variable on the container, if you set it | NeoHive does not store it in the database. See [Webhook refresh endpoint](../reference/webhooks.md) |
