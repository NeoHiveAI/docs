---
description: "Update NeoHive by re-running the installer. Your data is preserved."
---

# Updating

To update NeoHive, re-run the install command:

```sh
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

The installer pulls the latest image and restarts the container.

{% hint style="info" %}
Your data is preserved across updates. Every project, hive, and indexed knowledge base lives in a Docker volume (`neohive-data`) that persists.
{% endhint %}

## Update notifications

The dashboard shows a banner when a new version is available, with release highlights and a link to the full changelog. You can also click **Check now** to check manually.

The banner is informational and won't update anything on its own. You still re-run the installer to apply an update.

## Backing up your data

Everything NeoHive stores lives in the `neohive-data` Docker volume: your projects, hives, indexed code, and memories. To back it up, archive the volume with a throwaway container:

```sh
docker run --rm -v neohive-data:/data -v "$PWD":/backup alpine \
  tar czf /backup/neohive-backup.tar.gz -C /data .
```

That writes `neohive-backup.tar.gz` to your current directory. To restore it, recreate the volume and extract the archive into it before starting NeoHive:

```sh
docker run --rm -v neohive-data:/data -v "$PWD":/backup alpine \
  tar xzf /backup/neohive-backup.tar.gz -C /data
```
