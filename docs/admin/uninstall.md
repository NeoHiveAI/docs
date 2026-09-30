---
description: "Remove NeoHive from a machine, keeping or deleting your data, and disconnect your agents."
---

# Uninstall

Remove NeoHive from this machine, choose whether your data goes with it, and clean up your agents.

The uninstall script lists what it found, asks once, then removes what the installer put on this machine. Your data stays unless you pass `--purge-data`.

<figure><img src="../.gitbook/assets/admin-uninstall.svg" alt="Removed by uninstall.sh: the neohive container, stopped cleanly to free the license seat; ~/.cache/neohive/license-key; the Metal worker on Apple Silicon. Kept, and removed only with --purge-data: the neohive-data volume with every Hive, Index and Memory; ~/.cache/neohive/machine-id; ~/.neohive models and logs. Removed by hand, using steps the script prints: the agent plugin and each NeoHive MCP entry, one per hive."><figcaption></figcaption></figure>

{% stepper %}
{% step %}
## Preview the plan

`--dry-run` prints what would be removed and changes nothing.

```bash
curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/uninstall.sh \
  | bash -s -- --dry-run
```
{% endstep %}

{% step %}
## Remove NeoHive

{% tabs %}
{% tab title="Keep my data" %}
```bash
curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/uninstall.sh | bash
```

A later install finds your Hives as you left them.
{% endtab %}

{% tab title="Delete everything" %}
```bash
curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/uninstall.sh \
  | bash -s -- --purge-data
```

This also deletes the data volume, `~/.neohive`, and all of `~/.cache/neohive`. If NeoHive is running, the script offers a backup first. Then you type the volume name before it deletes anything. If the name you type does not match, the script still removes NeoHive but keeps the data volume, `~/.neohive`, and `~/.cache/neohive/machine-id`.

{% hint style="danger" %}
Deleting the volume removes every Hive, Index, and Memory for good. Only a backup brings them back. See [Backups and restore](backups.md).
{% endhint %}
{% endtab %}
{% endtabs %}

`--yes` skips the questions, for scripts only. With `--purge-data`, `--yes` also skips the backup offer and the typed volume name, so the volume is deleted without asking.
{% endstep %}

{% step %}
## Remove the agent plugin

The script cannot reach your editors, so it ends by printing the Claude Code steps. In a Claude Code session:

```text
/plugin uninstall neohive@neohive-claude
```

For Cursor, delete the `~/.cursor/plugins/local/neohive` link. For Codex, delete the `NeoHiveCodex` folder you cloned.
{% endstep %}

{% step %}
## Remove the MCP entries

Removing the plugin can leave the MCP entries behind. In Claude Code, list them and remove each NeoHive entry, one per Hive:

```bash
claude mcp list
claude mcp remove <neohive-entry>
```

For other agents, delete the NeoHive entries from their MCP config file: `.cursor/mcp.json` in your project or `~/.cursor/mcp.json` for Cursor, `~/.codex/config.toml` for Codex, `claude_desktop_config.json` for Claude Desktop.
{% endstep %}
{% endstepper %}

{% hint style="success" %}
**Check:** NeoHive is gone.

```bash
docker ps -a --filter name=neohive
```

The list is empty, and `claude mcp list` shows no NeoHive entries.
{% endhint %}

{% hint style="warning" %}
Do not use `docker rm -f neohive` as a shortcut. It kills the container without a clean stop, so the license seat stays taken until the licensing service notices the machine has gone quiet.
{% endhint %}

## Next step

To set NeoHive up again later, start from [Install NeoHive](../get-started/install.md).
