---
description: "Environment variables the NeoHive installer, agent plugin, and server read, with their defaults."
---

# Environment variables

Find the variable that changes a NeoHive setting, where to set it, and its default.

A variable takes effect only in the place that reads it. Set each variable in the place shown in the following table:

| Where you set it | Who reads it | Takes effect |
|---|---|---|
| Your shell, before you run `install.sh` | The installer | When you next run the installer |
| The shell or profile your coding agent starts from | The NeoHive plugin hooks | In the next agent session |
| The `neohive` container's environment | The NeoHive server | When the container next starts |

## Installer

Put the variable on the installer's command line, or export it first. To change a variable later, run the installer again.

```bash
NEOHIVE_PORT=4577 \
  bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

| Variable | Default | Purpose |
|---|---|---|
| `NEOHIVE_LICENSE_FILE` | none | The path to your license file (`.key` or `.json`). This variable does the same as the `--license-file` option. See [Licensing](../admin/licensing.md). |
| `NEOHIVE_LICENSE_KEY` | none | The license key itself, for setups without a license file. This key takes priority over every other license source. |
| `NEOHIVE_ROTATE_LICENSE` | unset | Set to `1` to read a new license file even when a key is already cached. |
| `NEOHIVE_PORT` | `3577` | The port NeoHive is published on. Change your agent's Model Context Protocol (MCP) endpoint to match. |
| `NEOHIVE_BACKEND` | detected | Makes NeoHive use one compute backend instead of detecting it: `cpu`, `cuda`, `vulkan`, or `rocm`. See [GPU and CPU](../admin/gpu-cpu.md). |
| `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS` | `300000` (5 minutes) | The time allowed to convert one PDF. A 900-page file can need `1800000`. |
| `NEOHIVE_PDF_WARMUP_TIMEOUT_MS` | `300000` (5 minutes) | The time allowed for the one-time PDF converter warm-up. Raise this value on a slow connection or machine. |
| `NEOHIVE_CHUNKER_TIMEOUT_MS` | `30000` (30 seconds) | The time allowed to split one Markdown or code file. |
| `NEOHIVE_UPDATE_REPO` | `neohivedev/neohive` | The Docker Hub repository the dashboard checks for new versions. |
| `NEOHIVE_METAL_WORKER` | `1` | Apple Silicon only: set to `0` to embed on the CPU inside the container instead of on the Metal worker. |
| `NEOHIVE_METAL_WORKER_PORT` | `50051` | Apple Silicon only: the port the Metal worker listens on. |
| `NEOHIVE_METAL_WORKER_IMAGE` | `docker.io/neohivedev/neohive-metal-worker` | Apple Silicon only: the image the Metal worker is installed from. |
| `NEOHIVE_METAL_WORKER_TAG` | picked by the installer | Apple Silicon only: the exact Metal worker version to install. |
| `NEOHIVE_METAL_WORKER_HEALTH_BUDGET_S` | `90` | Apple Silicon only: the number of seconds the installer waits for the Metal worker to answer. |

The three timeout variables accept only whole numbers of milliseconds. Any other value stops the installer with error `E603`.

## Agent plugin

Set these variables where your coding agent starts, for example in your shell profile.

| Variable | Default | Purpose |
|---|---|---|
| `NEOHIVE_TOKEN` | unset | The bearer token that the plugin hooks send. You need the token only when NeoHive runs behind an authenticating proxy that you run. |
| `NEOHIVE_HOOK_DISABLED` | unset | Claude Code only: set to `1` to stop the hook that recalls context for each prompt. This setting also stops the hook that records which Memories a session used. |
| `NEOHIVE_PRETOOL_STRICT` | unset | Claude Code only: set to `1` to block `Glob` and `Grep` in an indexed project. Without this setting, the hook only reminds the agent to call `memory_recall` first. |
| `NEOHIVE_PRETOOL_DISABLED` | unset | Claude Code only: set to `1` to turn off the reminder to call `memory_recall` first. |
| `NEOHIVE_SMART_DISABLED` | unset | Set to `1` to pause the smart-prompts hook. `enable-smart-prompts` suggests this variable as the way to turn the hook off. |
| `NEOHIVE_SMART_RUN` | unset | This variable applies only if you chose the manual trigger in `enable-smart-prompts`. Set to `1` to let the hook run. |
| `ANTHROPIC_API_KEY` | unset | The smart-prompts hook needs this key. Without it, the hook does nothing. |
| `NEOHIVE_SESSION_STATE_DIR` | `~/.claude/neohive/sessions` | Claude Code only: the folder where the plugin keeps per-session records. |

## Server

The NeoHive server reads these variables from the `neohive` container's environment. Setting them in your shell does nothing.

{% hint style="warning" %}
The installer passes only these variables into the container: the license key, the three timeouts, `NEOHIVE_UPDATE_REPO`, and the Metal worker address on Apple Silicon. The installer drops any other variable you add with `docker run -e` the next time it recreates the container. Add those variables again after every upgrade.
{% endhint %}

| Variable | Default | Purpose |
|---|---|---|
| `MEMVEC_WEBHOOK_SECRET` | unset | The secret for the [webhook refresh endpoint](webhooks.md). While this variable is unset, every webhook request gets a `401` response. |
| `MEMVEC_ENCRYPTION_KEY` | unset | A 64-character hexadecimal key that encrypts stored connection secrets. While this variable is unset, NeoHive creates a key in `/app/data/.encryption_key`. See [Credentials and secrets](../security/credentials.md). |
| `NEOHIVE_MCP_HINTS` | on | Set to `0` to remove the short hint that the server adds to `memory_recall` and `memory_context` replies. |
| `NEOHIVE_LOG_SIZE_MB` | `10` | The size, in megabytes, that a log file reaches before NeoHive starts a new one. |
| `NEOHIVE_LOG_KEEP_FILES` | `20` | How many old log files NeoHive keeps. |
| `MEMVEC_SYNC_MAX_CONCURRENT` | `1` | How many repository syncs run at the same time. |
| `MEMVEC_SYNC_CONCURRENCY` | `3` | How many files one sync indexes in parallel. |
| `MEMVEC_SYNC_MAX_RETRY_ATTEMPTS` | `3` | How many later syncs retry a file that failed to index. After that, NeoHive stops retrying the file. |
| `MEMVEC_SYNC_RETRY_DELAY_MS` | `120000` (2 minutes) | How long NeoHive waits before it retries automatically after a sync in which some files failed. |
| `MEMVEC_COMMIT_IMPORT_WINDOW_DAYS` | `180` | How many days of commit history NeoHive imports from a repository. |
| `MEMVEC_TOKEN_REVALIDATION_MS` | `82800000` (23 hours) | How long the result of a connection's last token check stays valid. After that time, NeoHive checks the token again. |
| `MEMVEC_MIGRATION_SNAPSHOT` | on | Set to `off` to skip the database copy NeoHive takes before an upgrade changes its databases. |
| `MEMVEC_MIGRATION_SNAPSHOT_KEEP` | `5` | How many of those copies to keep per database. Each copy is a full copy of the database. If disk space is low, lower this number. |

{% hint style="info" %}
Some plugin rules say to set `NEOHIVE_MCP_HINTS=0` in your agent's environment. Setting the variable there has no effect. The server adds the hint, so you must set the variable on the container.
{% endhint %}

## Next step

See [Supported file types](file-types.md) for what NeoHive can index.
