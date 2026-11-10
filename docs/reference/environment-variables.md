---
description: "Environment variables the NeoHive installer, agent plugin, and server read, with their defaults."
---

# Environment variables

NeoHive reads settings such as ports, timeouts, and log sizes from environment variables. The installer, the agent plugin, and the server each read their own set.

Each variable takes effect only in the place shown in the following table:

| Where you set it | Who reads it | Takes effect |
|---|---|---|
| Your shell, before you run `install.sh` | The installer | When you next run the installer |
| The shell or profile your coding agent starts from | The NeoHive plugin hooks | In the next agent session |
| The `neohive` container's environment | The NeoHive server | When the container next starts |

## Installer

Set installer variables before the installer command, or `export` them first. For example, the following command installs NeoHive on port `4000`:

```bash
NEOHIVE_PORT=4000 \
  bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

To change a variable later, run the installer again with every variable you set before. The installer does not remember them, so any you leave out return to their defaults. For more information, see [Update NeoHive](../admin/updating.md).

| Variable | Default | Purpose |
|---|---|---|
| `NEOHIVE_LICENSE_FILE` | none | The path to your license file (`.key` or `.json`). This variable does the same as the `--license-file` option. For more information, see [Licensing](../admin/licensing.md). |
| `NEOHIVE_LICENSE_KEY` | none | The license key itself, for setups without a license file. This key takes priority over every other license source. |
| `NEOHIVE_ROTATE_LICENSE` | unset | Set to `1` to read a new license file even when a key is already cached. |
| `NEOHIVE_PORT` | `3577` | The port NeoHive is published on. Change your agent's [MCP](../concepts/glossary.md#mcp) endpoint to match. |
| `NEOHIVE_BACKEND` | detected | Makes NeoHive use one compute backend instead of detecting it: `cpu`, `cuda`, `vulkan`, or `rocm`. For more information, see [GPU and CPU](../admin/gpu-cpu.md). |
| `NEOHIVE_DOCUMENT_TIMEOUT_MS` | `300000` (5 minutes) | The time allowed to convert one uploaded file, such as a PDF or a Word document. Raise this value for very large files. |
| `NEOHIVE_CHUNKER_TIMEOUT_MS` | `30000` (30 seconds) | The time allowed to split one Markdown or code file. |
| `NEOHIVE_UPDATE_REPO` | `neohivedev/neohive` | The Docker Hub repository the dashboard checks for new versions. |

The timeout variables accept only positive whole numbers of milliseconds. Any other value, including `0`, stops the installer with error `E603`.

<details>

<summary>Older variable names</summary>

* `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS` is the older name for `NEOHIVE_DOCUMENT_TIMEOUT_MS`. The installer still applies it, but `NEOHIVE_DOCUMENT_TIMEOUT_MS` wins when you set both.
* NeoHive no longer uses `NEOHIVE_PDF_WARMUP_TIMEOUT_MS`, so you can remove it.

</details>

### Apple Silicon

The following variables apply only on a Mac with Apple Silicon, where the installer also sets up the Metal worker:

| Variable | Default | Purpose |
|---|---|---|
| `NEOHIVE_METAL_WORKER` | `1` | Set to `0` to embed on the CPU inside the container instead of on the Metal worker. |
| `NEOHIVE_METAL_WORKER_PORT` | `50051` | The port the Metal worker listens on. Change it if another program already uses the port. |
| `NEOHIVE_METAL_WORKER_IMAGE` | `docker.io/neohivedev/neohive-metal-worker` | The image the Metal worker is installed from. |
| `NEOHIVE_METAL_WORKER_TAG` | picked by the installer | The exact Metal worker version to install. |
| `NEOHIVE_METAL_WORKER_HEALTH_BUDGET_S` | `90` | The number of seconds the installer waits for the Metal worker to answer. |

## Agent plugin

Set each variable where your coding agent starts, for example with `export NEOHIVE_PRETOOL_DISABLED=1` in your shell profile (`~/.zshrc` or `~/.bashrc`). The plugin hooks read the following variables:

| Variable | Default | Purpose |
|---|---|---|
| `NEOHIVE_TOKEN` | unset | The bearer token that the plugin hooks send. You need the token only when NeoHive runs behind an authenticating proxy that you run. |
| `NEOHIVE_HOOK_DISABLED` | unset | Claude Code only: set to `1` to stop the hook that recalls context for each prompt. This setting also stops the hook that records which [Memories](../concepts/glossary.md#memory) a session used. |
| `NEOHIVE_PRETOOL_STRICT` | unset | Claude Code only: set to `1` to block `Glob` and `Grep` in an indexed project. Without this setting, the hook only reminds the agent to call `memory_recall` first. |
| `NEOHIVE_PRETOOL_DISABLED` | unset | Claude Code only: set to `1` to turn off the reminder to call `memory_recall` first. |
| `NEOHIVE_SMART_DISABLED` | unset | Set to `1` to pause the smart-prompts hook. `enable-smart-prompts` suggests this variable as the way to turn the hook off. |
| `NEOHIVE_SMART_RUN` | unset | This variable applies only if you chose the manual trigger in `enable-smart-prompts`. Set to `1` to let the hook run. |
| `ANTHROPIC_API_KEY` | unset | The smart-prompts hook needs this key. Without it, the hook does nothing. |
| `NEOHIVE_SESSION_STATE_DIR` | `~/.claude/neohive/sessions` | Claude Code only: the folder where the plugin keeps per-session records. |

## Server

The NeoHive server reads these variables from the `neohive` container's environment, not from your shell. To set one, add it with `docker run -e` when you start the container.

{% hint style="warning" %}
The installer drops variables you added with `docker run -e` the next time it recreates the container, for example during an update. Add them again after every update. If you set `MEMVEC_ENCRYPTION_KEY`, add it back before NeoHive starts, or NeoHive cannot read the connection tokens it stored.
{% endhint %}

| Variable | Default | Purpose |
|---|---|---|
| `MEMVEC_WEBHOOK_SECRET` | unset | The secret for the [webhook refresh endpoint](webhooks.md). While this variable is unset, every webhook request gets a `401` response. |
| `MEMVEC_ENCRYPTION_KEY` | unset | A 64-character hexadecimal key that encrypts stored connection secrets. While this variable is unset, NeoHive uses the key in `/app/data/.encryption_key`, and creates that file if it is missing. For more information, see [Credentials and secrets](../security/credentials.md). |
| `NEOHIVE_MCP_HINTS` | on | Set to `0` on the container to remove the short hint that the server adds to `memory_recall` and `memory_context` replies. |
| `NEOHIVE_LOG_SIZE_MB` | `10` | The size, in megabytes, that a log file reaches before NeoHive starts a new one. |
| `NEOHIVE_LOG_KEEP_FILES` | `20` | How many old log files NeoHive keeps. |
| `MEMVEC_SYNC_MAX_CONCURRENT` | `1` | How many repository syncs run at the same time. |
| `MEMVEC_SYNC_CONCURRENCY` | `3` | How many files one sync indexes in parallel. |
| `MEMVEC_SYNC_MAX_RETRY_ATTEMPTS` | `3` | How many times a file can fail to index, counting the first failure. After that, NeoHive stops retrying the file. |
| `MEMVEC_SYNC_RETRY_DELAY_MS` | `120000` (2 minutes) | How long NeoHive waits before it retries automatically after a sync in which some files failed. |
| `MEMVEC_TOKEN_REVALIDATION_MS` | `82800000` (23 hours) | How long the result of a connection's last token check stays valid. After that time, NeoHive checks the token again. |
| `MEMVEC_EMBEDDER_TIMEOUT_MS` | `120000` (2 minutes) | How long NeoHive waits for one [embedding](../concepts/glossary.md#embedding) call. On a slow machine, raise this value. |
| `MEMVEC_MIGRATION_SNAPSHOT` | on | Set to `off` to skip the database copy NeoHive takes before an upgrade changes its databases. |
| `MEMVEC_MIGRATION_SNAPSHOT_KEEP` | `5` | How many of those copies to keep per database. Each copy is a full copy of the database. If disk space is low, lower this number. |
| `MEMVEC_DOCUMENT_MAX_PAGES` | `500` | The most pages an uploaded PDF can have. If you raise it, raise `NEOHIVE_DOCUMENT_TIMEOUT_MS` too. |
| `MEMVEC_IMAGE_MAX_PIXELS` | `50000000` | The most pixels an uploaded image, or a picture inside a Word or PowerPoint file, can have. |
| `MEMVEC_UPLOAD_BATCH_MAX_BYTES` | `209715200` (200 MB) | The most data one upload request can carry. The dashboard splits a larger selection to fit. |
