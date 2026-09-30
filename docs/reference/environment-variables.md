---
description: "Environment variables the NeoHive installer, agent plugin, and server read, with their defaults."
---

# Environment variables

Find the variable that changes a NeoHive setting, where to set it, and its default.

A variable only works where it is read. Set it in the right place:

| Where you set it | Who reads it | Takes effect |
|---|---|---|
| Your shell, before you run `install.sh` | The installer | When you next run the installer |
| The shell or profile your coding agent starts from | The NeoHive plugin hooks | In the next agent session |
| The `neohive` container's environment | The NeoHive server | When the container next starts |

## Installer

Put the variable on the installer's command line, or export it first. To change one later, run the installer again.

```bash
NEOHIVE_PORT=4577 \
  bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

| Variable | Default | Purpose |
|---|---|---|
| `NEOHIVE_LICENSE_FILE` | none | Path to your license file (`.key` or `.json`). Same as `--license-file`. See [Licensing](../admin/licensing.md). |
| `NEOHIVE_LICENSE_KEY` | none | The license key itself, for setups without a file. Wins over every other license source. |
| `NEOHIVE_ROTATE_LICENSE` | unset | Set to `1` to read a new license file even when a key is already cached. |
| `NEOHIVE_PORT` | `3577` | The port NeoHive is published on. Change your agent's MCP endpoint to match. |
| `NEOHIVE_BACKEND` | detected | Force a compute backend: `cpu`, `cuda`, `vulkan`, or `rocm`. See [GPU and CPU](../admin/gpu-cpu.md). |
| `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS` | `300000` (5 minutes) | Time allowed to convert one PDF. A 900-page file can need `1800000`. |
| `NEOHIVE_PDF_WARMUP_TIMEOUT_MS` | `300000` (5 minutes) | Time allowed for the one-time PDF converter warm-up. Raise it on a slow connection or machine. |
| `NEOHIVE_CHUNKER_TIMEOUT_MS` | `30000` (30 seconds) | Time allowed to split one markdown or code file. |
| `NEOHIVE_UPDATE_REPO` | `neohivedev/neohive` | The Docker Hub repository the dashboard checks for new versions. |
| `NEOHIVE_METAL_WORKER` | `1` | Apple Silicon only. Set to `0` to embed on the CPU inside the container instead of the Metal worker. |
| `NEOHIVE_METAL_WORKER_PORT` | `50051` | Apple Silicon only. The port the Metal worker listens on. |
| `NEOHIVE_METAL_WORKER_IMAGE` | `docker.io/neohivedev/neohive-metal-worker` | Apple Silicon only. The image the Metal worker is installed from. |
| `NEOHIVE_METAL_WORKER_TAG` | picked by the installer | Apple Silicon only. Install exactly this Metal worker version. |
| `NEOHIVE_METAL_WORKER_HEALTH_BUDGET_S` | `90` | Apple Silicon only. Seconds the installer waits for the Metal worker to answer. |

The three timeouts take whole milliseconds. Any other value stops the installer with `E603`.

## Agent plugin

Set these where your coding agent starts, for example in your shell profile.

| Variable | Default | Purpose |
|---|---|---|
| `NEOHIVE_TOKEN` | unset | Bearer token the plugin hooks send. Needed only when NeoHive sits behind an authenticating proxy you run. |
| `NEOHIVE_HOOK_DISABLED` | unset | Claude Code. Set to `1` to stop the hook that recalls context for each prompt, and the hook that records which Memories a session used. |
| `NEOHIVE_PRETOOL_STRICT` | unset | Claude Code. Set to `1` to block `Glob` and `Grep` in an indexed project, instead of only reminding the agent to call `memory_recall` first. |
| `NEOHIVE_PRETOOL_DISABLED` | unset | Claude Code. Set to `1` to turn that reminder off. |
| `NEOHIVE_SMART_DISABLED` | unset | The off switch `enable-smart-prompts` suggests. Set to `1` to pause the smart-prompts hook. |
| `NEOHIVE_SMART_RUN` | unset | Only if you chose the manual trigger in `enable-smart-prompts`. Set to `1` to let the hook run. |
| `ANTHROPIC_API_KEY` | unset | Required by the smart-prompts hook. Without it the hook does nothing. |
| `NEOHIVE_SESSION_STATE_DIR` | `~/.claude/neohive/sessions` | Claude Code. Where the plugin keeps per-session records. |

## Server

The server reads these from the `neohive` container's environment. Setting them in your shell does nothing.

{% hint style="warning" %}
The installer passes only the license key, the three timeouts, `NEOHIVE_UPDATE_REPO`, and (on Apple silicon) the Metal worker address into the container. Anything else you add with `docker run -e` is dropped the next time the installer recreates the container, so add it again after every upgrade.
{% endhint %}

| Variable | Default | Purpose |
|---|---|---|
| `MEMVEC_WEBHOOK_SECRET` | unset | The secret for the [webhook refresh endpoint](webhooks.md). While unset, every webhook request gets `401`. |
| `MEMVEC_ENCRYPTION_KEY` | unset | A 64-character hex key that encrypts stored connection secrets. While unset, NeoHive creates one in `/app/data/.encryption_key`. See [Credentials and secrets](../security/credentials.md). |
| `NEOHIVE_MCP_HINTS` | on | Set to `0` to drop the short hint added to `memory_recall` and `memory_context` replies. |
| `NEOHIVE_LOG_SIZE_MB` | `10` | Size of each log file before it rotates. |
| `NEOHIVE_LOG_KEEP_FILES` | `20` | How many rotated log files to keep. |
| `MEMVEC_SYNC_MAX_CONCURRENT` | `1` | How many repository syncs run at the same time. |
| `MEMVEC_SYNC_CONCURRENCY` | `3` | How many files one sync indexes in parallel. |
| `MEMVEC_SYNC_MAX_RETRY_ATTEMPTS` | `3` | How many syncs retry a file that failed to index before NeoHive gives up on it. |
| `MEMVEC_SYNC_RETRY_DELAY_MS` | `120000` (2 minutes) | Wait before an automatic retry after a sync where some files failed. |
| `MEMVEC_COMMIT_IMPORT_WINDOW_DAYS` | `180` | How many days of commit history NeoHive imports from a repository. |
| `MEMVEC_TOKEN_REVALIDATION_MS` | `82800000` (23 hours) | How long a connection's last token check counts before NeoHive checks the token again. |
| `MEMVEC_MIGRATION_SNAPSHOT` | on | Set to `off` to skip the database copy NeoHive takes before an upgrade changes its databases. |
| `MEMVEC_MIGRATION_SNAPSHOT_KEEP` | `5` | How many of those copies to keep per database. Each is a full copy, so lower it if disk is tight. |

{% hint style="info" %}
Some plugin rules say to set `NEOHIVE_MCP_HINTS=0` in your agent's environment. That has no effect. The server adds the hint, so the variable must be on the container.
{% endhint %}

## Next step

See [Supported file types](file-types.md) for what NeoHive can index.
