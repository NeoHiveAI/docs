---
description: "How NeoHive finds your license, how to check its status, replace it, and move it to another machine."
---

# Licensing

Where the installer looks for your license, how to check it in the dashboard, and how to replace or move it.

NeoHive needs a license file from the NeoHive team: a plain-text `license.key`, or a `license.json` holding the key.

<figure><img src="../.gitbook/assets/admin-licensing.svg" alt="The installer checks, in order, and uses the first it finds: 1 the --license-file flag or -l; 2 the NEOHIVE_LICENSE_FILE variable; 3 a license.json or license.key in the folder you run the installer from; 4 the key cached at ~/.cache/neohive/license-key by an earlier install; 5 a prompt for a file path, in an interactive terminal only. It then checks the key with the licensing service. Accepted keys are cached. Rejected keys clear the cache, and in a terminal you are asked for another file, up to three tries. NEOHIVE_LICENSE_KEY skips all five; NEOHIVE_ROTATE_LICENSE=1 skips 3 and 4."><figcaption></figcaption></figure>

The simplest route is to put the file in the folder you run the installer from. If you downloaded `install.sh` and run it from disk, the installer also looks next to the script. After the first install the key is cached, so updates do not ask again.

The first time you open the dashboard, it shows the **NeoHive Design Partner Licence** agreement. Click **I Understand** to accept it and continue. You can read it again later from **Settings** with **View licence**.

## Check your license status

Go to **Settings** and click **Manage licence** on the **Licence Key** card.

| You see | Meaning |
|---|---|
| **Valid** | Active. Shows days remaining, **Holder**, **Expires**, and **Last validated** |
| **Offline grace** | The licensing service could not be reached. NeoHive keeps running for up to 72 hours, with a countdown |
| **Expired** or **Suspended** | No longer active. Email `hello@neohive.ai` for a new license. Past expiry, NeoHive stops answering requests |

**Check expiry** checks with the licensing service right away.

{% hint style="warning" %}
NeoHive must reach the licensing service over the internet. Offline, it runs on its last good check for up to 72 hours, then stops serving until it can check again.
{% endhint %}

## Replace your license

{% tabs %}
{% tab title="Dashboard" %}
On the **Licence** page, paste the new key under **Update licence key** and click **Update**. NeoHive checks the key before saving it, and keeps it across restarts and updates.
{% endtab %}

{% tab title="Installer" %}
```bash
NEOHIVE_LICENSE_FILE=/path/to/new-license.key \
NEOHIVE_ROTATE_LICENSE=1 \
  bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

`NEOHIVE_ROTATE_LICENSE=1` makes the installer ignore the cached key and read the new file.
{% endtab %}
{% endtabs %}

{% hint style="info" %}
A key saved from the dashboard wins over the one the installer passes in. If you ever used **Update licence key**, replace the license there again.
{% endhint %}

## Move to another machine

A license covers one running machine at a time.

1. **Stop NeoHive on the old machine** with `docker stop neohive`. A clean stop frees the seat at once.
2. **Install on the new machine** with your license file.

If the old machine is gone, its seat frees itself once it stops checking in with the licensing service. Reinstalling on the same machine reuses its seat, because the installer keeps the machine's identity in `~/.cache/neohive/machine-id`.

## Next step

Continue to [GPU and CPU](gpu-cpu.md) to see which hardware backend NeoHive picked and how to change it.
