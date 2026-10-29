---
description: "How NeoHive finds your license, how to check its status, replace it, and move it to another machine."
---

# Licensing

NeoHive needs a license to run. The installer reads your license when you install NeoHive, and the dashboard shows whether the license is still active. This page shows where the installer looks for your license and how to check its status. It also covers what to do when the license is close to expiring, when you replace it, and when you move NeoHive to another machine.

NeoHive needs a license file from the NeoHive team: a plain-text `license.key`, or a `license.json` holding the key. To get a license file, request one from the [NeoHive team](https://www.neohive.ai/download/). Save the file in the folder you run the installer from, and the installer finds it there.

<figure><img src="../.gitbook/assets/admin-licensing.svg" alt="The installer looks for a license in five sources, in order, and uses the first one it finds. First, the path you pass with --license-file. Second, the path in NEOHIVE_LICENSE_FILE. Third, a license.json or license.key file in the folder you run the installer from. Fourth, the key cached by an earlier install. Fifth, a prompt for a file path, in an interactive terminal only. The installer then checks the key with the licensing service. If the service accepts the key, the installer caches it and carries on. If the service rejects the key, the installer clears the cache and, in a terminal, asks for another file, up to three times."><figcaption></figcaption></figure>

## Where the installer finds your license

The most direct option is to put the file in the folder you run the installer from. After the first install, NeoHive caches the key, so updates do not ask for it again.

The installer uses the first license it finds, in the following order:

1. The path you pass with `--license-file` or `-l`, for example `--license-file ~/Downloads/license.key`.
2. The path in the `NEOHIVE_LICENSE_FILE` variable.
3. A `license.json` or `license.key` in the folder you run the installer from. If you run `install.sh` from disk, the installer also looks next to the script.
4. The key that an earlier install cached at `~/.cache/neohive/license-key`.
5. A prompt for a file path, in an interactive terminal only.

Two variables change this order:

- If `NEOHIVE_LICENSE_KEY` holds a key, the installer uses that key and does not look anywhere in the list.
- If `NEOHIVE_ROTATE_LICENSE=1` is set, the installer skips the license file in the folder you run it from and the cached key. It still reads a path you pass with `--license-file` or `NEOHIVE_LICENSE_FILE`. [Replace your license](#replace-your-license) uses this.

When the installer reads a license from anywhere other than the cache, it replaces the cached key with the new one.

## Accept the license agreement

The first time you open the dashboard, it shows the **NeoHive Design Partner Licence** agreement. The agreement sets the terms for using NeoHive, and your license key is what lets NeoHive run. To accept the agreement and continue, select **I Understand**. To read the agreement again later, go to **Settings** and select **View licence**.

## Check your license status

To check your license status, do the following:

1. Go to **Settings**.
2. On the **Licence Key** card, select **Manage licence**.

The **Licence** page shows one of the following statuses.

| You see | Meaning |
|---|---|
| **Valid** | The license is active. The page shows the days remaining, **Holder**, **Expires**, and **Last validated** |
| **Offline grace** | NeoHive could not reach the licensing service. NeoHive keeps running for up to 72 hours and shows a countdown |
| **Expired** or **Suspended** | The license is no longer active. Request a new license from the [NeoHive team](https://www.neohive.ai/download/). After the license expires, NeoHive stops answering requests |

To check with the licensing service right away, select **Check expiry**.

{% hint style="warning" %}
NeoHive must reach the licensing service over the internet. NeoHive checks the license when it starts and once a day after that. When NeoHive cannot reach the service, it keeps running for 72 hours from its last successful check. The first daily check after those 72 hours stops NeoHive. NeoHive stops serving requests until it can check again.
{% endhint %}

## Replace your license

{% tabs %}
{% tab title="Dashboard" %}
To replace the key in the dashboard, do the following:

1. On the **Licence** page, paste the new key under **Update licence key**.
2. Select **Update**.

NeoHive checks the key before saving it. NeoHive keeps the key across restarts and updates.
{% endtab %}

{% tab title="Installer" %}
To replace the key with the installer, run the installer with the new license file:

```bash
NEOHIVE_LICENSE_FILE=/path/to/new-license.key \
NEOHIVE_ROTATE_LICENSE=1 \
  bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

`NEOHIVE_ROTATE_LICENSE=1` makes the installer ignore the cached key and read the new file. When the install finishes, NeoHive runs with the new key.
{% endtab %}
{% endtabs %}

{% hint style="info" %}
A key saved from the dashboard takes priority over the key the installer passes in. If you ever used **Update licence key**, replace the license in the dashboard again.
{% endhint %}

## Move to another machine

A license covers one running machine at a time, and that machine holds the license's [seat](../concepts/glossary.md#license-seat). To move your Hives and Memories along with the license, follow [Move to a new machine](backups.md#move-to-a-new-machine) instead, which includes these steps.

To move only the license, do the following:

1. On the old machine, stop NeoHive:

   ```bash
   docker stop neohive
   ```

   A clean stop frees the seat immediately.
2. On the new machine, install NeoHive with your license file. Follow [Install NeoHive](../get-started/install.md).

The new machine now holds the seat.

If the old machine is gone, its seat becomes free once the machine stops checking in with the licensing service. Reinstalling on the same machine reuses its seat, because the installer keeps the machine's identity in `~/.cache/neohive/machine-id`.
