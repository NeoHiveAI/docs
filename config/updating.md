# Updating

To update NeoHive, re-run the install command:

```sh
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

The installer pulls the latest image and restarts the container. Your data is preserved — all projects, hives, and indexed knowledge are stored in a Docker volume (`neohive-data`) that persists across upgrades.

## Update notifications

The NeoHive dashboard shows a banner when a new version is available. The banner includes release highlights and a link to the full changelog. You can also click **Check now** to manually check for updates.

The banner is informational only — it won't update automatically. You still need to re-run the installer to apply the update.
