---
description: "Remove NeoHive with the uninstall script, and choose whether your data goes with it."
---

# Uninstalling

Run the uninstaller. It lists what it found on this machine, asks once, then removes it.

```sh
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/uninstall.sh)
```

It removes:

* The `neohive` container. It is stopped gracefully before it is removed, so the gateway hands back its license seat.
* The cached license key at `~/.cache/neohive/license-key`.
* On an Apple Silicon Mac, the Metal embedding worker and its watchdog. Both launchd agents are unloaded before their files are deleted, so the watchdog cannot restart the worker on the way out.

It keeps, so that reinstalling picks up where you left off:

* The `neohive-data` volume, which holds your hives, memories, and indexes.
* The license-seat fingerprint at `~/.cache/neohive/machine-id`. The seat itself is released when the container stops, so keeping the file means a reinstall reuses the same seat instead of taking a new one.

To see the plan without changing anything, add `--dry-run`:

```sh
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/uninstall.sh) --dry-run
```

## Delete your data as well

{% hint style="warning" %}
`--purge-data` permanently deletes the `neohive-data` volume, all of `~/.cache/neohive` including the fingerprint, and `~/.neohive` (the worker's downloaded models and logs). There is no undo, and reinstalling downloads the models again.
{% endhint %}

```sh
bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/uninstall.sh) --purge-data
```

Before it deletes anything, the script offers to run a backup, then asks you to type the volume name to confirm. If the name does not match, it says so and finishes without touching the volume, so your data is still there.

The backup offer only appears while the container is still running. If you have already removed the container, back up the volume by hand first (see [Updating](../config/updating.md#backing-up-your-data)).

Add `--yes` to skip every question. That is for scripted use, and with `--purge-data` it deletes your data without asking.

## Finish in your editor

The script prints these at the end and cannot do them for you, because they live in your editor's own configuration rather than on the NeoHive install.

In Claude Code, remove the plugin:

```
/plugin uninstall neohive@neohive-claude
```

Then remove any MCP connections the plugin left behind:

```
claude mcp list
claude mcp remove <neohive-entry>
```

Repeat for each entry. For Cursor or Codex, delete the NeoHive entries from your MCP configuration file, such as `.mcp.json`.

## Removing it by hand

If you cannot reach the script, the container and its cached key come off with plain Docker commands:

```sh
docker rm -f neohive
rm -f ~/.cache/neohive/license-key
```

{% hint style="warning" %}
This next one permanently deletes your hives, memories, and indexes. Only run it if you are sure.
{% endhint %}

```sh
docker volume rm neohive-data
```

On an Apple Silicon Mac, the Metal worker needs its watchdog unloaded first, or it comes straight back:

```sh
launchctl bootout gui/$(id -u)/com.neohive.metal-worker-watchdog
launchctl bootout gui/$(id -u)/com.neohive.metal-worker
rm -f ~/Library/LaunchAgents/com.neohive.metal-worker*.plist
rm -rf ~/.neohive/metal-worker
```

Then finish in your editor as above.

## Still stuck?

Contact the NeoHive team at `support@neohive.ai` with the output of the uninstaller and the result of `docker ps -a` and `docker volume ls`.
