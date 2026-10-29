---
description: "Back up a running NeoHive instance to a single archive, and restore from it on the same or a new machine."
---

# Backups and restore

A backup is one archive of everything NeoHive stores. Take a backup before you update NeoHive, and take one regularly while you use it. With a backup, you can recover from a failed update or a deleted Hive, or move NeoHive to a new machine. The `backup.sh` script takes the backup while NeoHive keeps running, and the same script restores it.

Everything NeoHive stores lives in the `neohive-data` Docker volume. That includes every [Hive](../concepts/glossary.md#hive), [Index](../concepts/glossary.md#index), and [Memory](../concepts/glossary.md#memory).

<figure><img src="../.gitbook/assets/admin-backups.svg" alt="Backup: while NeoHive runs, backup.sh copies the neohive-data volume into neohive-backup-timestamp.tar.gz. The archive holds manifest.json, SHA256SUMS, and a data folder. Restore: backup.sh --restore works in four steps. First, it verifies every file, and a damaged archive changes nothing. Second, you confirm by typing neohive-data. Third, it stops NeoHive and replaces the volume contents. Fourth, it starts NeoHive again."><figcaption></figcaption></figure>

| In the backup | Not in the backup |
|---|---|
| Every database: Hives, Indexes, Memories, connections, and sync history | The cached license key in `~/.cache/neohive` |
| The search data of every Index, plus the local copies of your synced repositories | The license-seat file `machine-id` |
| The keys that encrypt your saved GitHub and GitLab credentials | Apple Silicon models in `~/.neohive/models` |

{% hint style="danger" %}
A backup holds your Memories, your indexed code, and the keys to your saved credentials. Store it like other private data, and never commit it to a repository.
{% endhint %}

## Take a backup

Before you start, make sure that the NeoHive container is running. To take a backup, run the following command on the machine where NeoHive runs:

```bash
curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/backup.sh | bash
```

The script writes `neohive-backup-<timestamp>.tar.gz` to the current folder. To write the archive to a different folder, pass a folder that exists:

```bash
curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/backup.sh \
  | bash -s -- --out /path/to/backups
```

{% hint style="success" %}
**Check:** the script ends with **Backup complete.** and the archive's path.
{% endhint %}

## Restore from a backup

{% hint style="danger" %}
Restoring replaces everything in the `neohive-data` volume. You permanently lose anything added since the backup.
{% endhint %}

The NeoHive container must exist, but it can be running or stopped. To restore from a backup, run the following command with the name of your archive:

```bash
curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/backup.sh \
  | bash -s -- --restore neohive-backup-<timestamp>.tar.gz
```

When the script asks you to confirm, type `neohive-data`. The `--yes` flag skips that question. Use `--yes` only in scripts.

{% hint style="success" %}
**Check:** the script ends with **Restore complete.** When you open `http://localhost:3577`, your Hives are back.
{% endhint %}

## Move to a new machine

A license covers one running machine at a time, so the order of these steps matters. To move NeoHive to a new machine, do the following:

1. On your current machine, while NeoHive is still running, [take a backup](#take-a-backup).
2. On your current machine, stop NeoHive:

   ```bash
   docker stop neohive
   ```

   A clean stop frees the license's seat right away. If NeoHive still runs on the old machine, the new machine cannot use the license.
3. On the new machine, install NeoHive with the same license file. Follow [Install NeoHive](../get-started/install.md). The restore needs the container that this install creates.
4. Copy the backup archive to the new machine.
5. On the new machine, run the command in [Restore from a backup](#restore-from-a-backup).

The restore reuses the Docker image that the new install runs, so the restore downloads nothing. When the restore finishes, your Hives are on the new machine. For more about license seats, see [Move to another machine](licensing.md#move-to-another-machine).

<details>

<summary>Optional: non-default container, volume, or port, and Colima or Lima</summary>

The script reads the following variables. Set them if your install does not use the defaults.

| Variable | Default |
|---|---|
| `NEOHIVE_CONTAINER_NAME` | `neohive` |
| `NEOHIVE_VOLUME_NAME` | `neohive-data` |
| `NEOHIVE_PORT` | `3577` |

On Colima or Lima, a restore can stop because the container cannot see the extracted files. Your data is untouched. Set `TMPDIR` to a folder under your home directory, as the error message shows, and run the restore again.

</details>
