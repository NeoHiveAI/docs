---
description: "Update NeoHive to the latest release by re-running the installer. Your Hives and Memories are kept."
---

# Update NeoHive

Update to the latest release with the command you installed with. Your Hives, Indexes, and Memories stay in place.

<figure><img src="../.gitbook/assets/admin-updating.svg" alt="Re-running the installer: 1 read the license, reusing the cached key; 2 check the license with the licensing service; 3 detect hardware again; 4 pull the latest image for your hardware; 5 stop the old container, which frees its license seat and waits up to 30 seconds; 6 start the new container on the same neohive-data volume and print what is new."><figcaption></figcaption></figure>

## Know when an update is out

The bell at the top right opens **NeoHive updates**. When a release is out, it names your version and the new one, with release highlights and **View full changelog**. A dot also appears on the NeoHive logo in the sidebar.

The dashboard checks on its own; the refresh button in the panel checks right away. It only tells you about an update and never installs one.

## Run the update

{% stepper %}
{% step %}
## Take a backup

See [Backups and restore](backups.md).
{% endstep %}

{% step %}
## Re-run the installer

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

The installer reuses your cached license key unless you give it a license another way. A license passed with `--license-file`, set in `NEOHIVE_LICENSE_FILE` or `NEOHIVE_LICENSE_KEY`, or found as a `license.key` or `license.json` in the current folder or next to `install.sh` is used instead of the cached key. On Apple Silicon it also updates the Metal embedding worker and keeps downloaded models.
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
A repository sync still running when the old container stops is cut off. It runs again on its next schedule, or click **Trigger sync** on the Index.
{% endhint %}

## Repeat the settings you installed with

The installer does not remember options from last time. Set any you used again:

| Variable | Why you set it |
|---|---|
| `NEOHIVE_PORT` | NeoHive runs on a port other than `3577` |
| `NEOHIVE_BACKEND` | You forced a backend. See [GPU and CPU](gpu-cpu.md) |
| `NEOHIVE_METAL_WORKER`, `NEOHIVE_METAL_WORKER_PORT` | You turned off or moved the Apple Silicon worker |
| `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS`, `NEOHIVE_PDF_WARMUP_TIMEOUT_MS`, `NEOHIVE_CHUNKER_TIMEOUT_MS` | You gave large files more time |

For example:

```bash
NEOHIVE_PORT=4000 \
NEOHIVE_BACKEND=cpu \
  bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

Every variable is on [Environment variables](../reference/environment-variables.md).

{% hint style="success" %}
**Check:** NeoHive is back.

```bash
curl http://localhost:3577/health
```

The reply contains `"status":"ok"`. The version at the bottom of the sidebar shows the new release.
{% endhint %}

## Next step

Continue to [Licensing](licensing.md) to see how the installer finds your license and how to replace it.
