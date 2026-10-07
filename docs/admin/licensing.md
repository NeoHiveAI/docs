---
description: "How NeoHive finds your license, how to check its status, replace it, and move it to another machine."
---

# Licensing

This page explains where the installer looks for your license, how to check the license in the dashboard, and how to replace or move it.

NeoHive needs a license file from the NeoHive team: a plain-text `license.key`, or a `license.json` holding the key.

<figure><img src="../.gitbook/assets/admin-licensing.svg" alt="The installer checks five places in order and uses the first license it finds. 1: the --license-file or -l flag. 2: the NEOHIVE_LICENSE_FILE variable. 3: a license.json or license.key in the folder you run the installer from. 4: the key that an earlier install cached at ~/.cache/neohive/license-key. 5: a prompt for a file path, in an interactive terminal only. The installer then checks the key with the licensing service. Accepted keys are cached. A rejected key clears the cache. In a terminal, the installer then asks for another file, up to three tries. NEOHIVE_LICENSE_KEY skips all five. NEOHIVE_ROTATE_LICENSE=1 skips 3 and 4."><figcaption></figcaption></figure>

The most direct option is to put the file in the folder you run the installer from. If you downloaded `install.sh` and run it from disk, the installer also looks next to the script. After the first install, NeoHive caches the key, so updates do not ask for it again.

The first time you open the dashboard, it shows the **NeoHive Design Partner Licence** agreement. To accept the agreement and continue, select **I Understand**. To read the agreement again later, go to **Settings** and select **View licence**.

## Check your license status

To check your license status, do the following:

1. Go to **Settings**.
2. On the **Licence Key** card, select **Manage licence**.

The **Licence** page shows one of the following statuses.

| You see | Meaning |
|---|---|
| **Valid** | The license is active. The page shows the days remaining, **Holder**, **Expires**, and **Last validated** |
| **Offline grace** | NeoHive could not reach the licensing service. NeoHive keeps running for up to 72 hours and shows a countdown |
| **Expired** or **Suspended** | The license is no longer active. Email `hello@neohive.ai` for a new license. After the license expires, NeoHive stops answering requests |

To check with the licensing service right away, select **Check expiry**.

{% hint style="warning" %}
NeoHive must reach the licensing service over the internet. When NeoHive is offline, it relies on its last successful check for up to 72 hours. After that, NeoHive stops serving requests until it can check again.
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

A license covers one running machine at a time. That machine holds the license's seat. To move the license, do the following:

1. **Stop NeoHive on the old machine** with `docker stop neohive`. Stopping NeoHive cleanly frees the seat immediately.
2. **Install NeoHive on the new machine** with your license file.

The new machine now holds the seat.

If the old machine is gone, its seat becomes free once the machine stops checking in with the licensing service. Reinstalling on the same machine reuses its seat, because the installer keeps the machine's identity in `~/.cache/neohive/machine-id`.

## Next step

Continue to [GPU and CPU](gpu-cpu.md) to see which hardware backend NeoHive picked and how to change it.
