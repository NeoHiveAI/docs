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
Your data is preserved across updates — every project, hive, and indexed knowledge base lives in a Docker volume (`neohive-data`) that persists.
{% endhint %}

## Update notifications

The dashboard shows a banner when a new version is available, with release highlights and a link to the full changelog. You can also click **Check now** to check manually.

The banner is informational — it won't update automatically. You still re-run the installer to apply an update.
