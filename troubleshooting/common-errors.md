---
description: "Error messages from the NeoHive installer, server, tools, uploads, and syncs, each with its cause and fix."
---

# Common errors

Search this page for the message you see, then apply the fix.

Every entry here is a failure with a message. If NeoHive works but your agent recalls the wrong things, see [Common mistakes to avoid](../results/common-mistakes.md). Text in `<angle brackets>` stands for a value that changes.

## Installer

The installer prints a failure as `FAIL [<code>]` followed by the message.

| Code | Message | Fix |
|---|---|---|
| `E201` | `Unsupported OS: <name>. Linux and macOS are supported. On Windows, install via WSL2.` | On Windows, run the installer inside WSL2. |
| `E202` | `Docker is not installed. Install from https://docs.docker.com/get-docker/ and retry.` | Install Docker, then run the installer again. |
| `E203` | `Docker daemon is not running (or current user cannot access it). Start Docker and retry.` | Start Docker. Check that `docker info` works without `sudo`. |
| `E204` | `Invalid BACKEND '<value>' (expected cpu\|vulkan\|cuda\|rocm)` | Set `NEOHIVE_BACKEND` to one of those, or unset it. |
| `E205` | `--license-file requires a path argument.` | Pass `--license-file /path/to/license.key`. |
| `E206` | `Unknown argument: <flag>` | The installer takes only `--license-file` (or `-l`). Use [environment variables](../reference/environment-variables.md) for settings. |
| `E301` | `No license. Set NEOHIVE_LICENSE_FILE (or pass --license-file), ...` | Pass `--license-file`, set `NEOHIVE_LICENSE_FILE`, or put `license.key` or `license.json` next to `install.sh`. |
| `E301` | `<path> is not a readable file. Verify the path and re-run.` | Run again and type the full path to the file. |
| `E302` | `Empty path.` | Run again and type the path at the prompt. |
| `E304` to `E307` | `License file '<path>' is not readable.`, `... is empty.`, `... is JSON but no .key field found.`, `Could not extract license key from '<path>'.` | Use the license file the NeoHive team sent, unedited. |
| `E308` | `--license-file '<path>' does not exist.` | Fix the path. |
| `E309` | `NEOHIVE_LICENSE_FILE '<path>' does not exist.` | Fix the path. |
| `E303` | `License rejected and stdin is not a TTY - cannot re-prompt. ...` | Point `NEOHIVE_LICENSE_FILE` at your current license file. Contact `hello@neohive.ai` if it still fails. |
| `E310` | `License rejected after <n> attempts. Contact hello@neohive.ai.` | Check you have the current license file, then contact `hello@neohive.ai`. |
| `E501` | `image '<image>:<backend>' not found and NEOHIVE_BACKEND is set - unset it to allow automatic fallback.` | Unset `NEOHIVE_BACKEND` so the installer picks an image. |
| `E502` | `no compatible image found on <image>. Check connectivity to Docker Hub and retry.` | Check your connection or proxy to Docker Hub, then run again. |
| `E503` | `a compatible image exists on <image> but the download did not complete ...` | Run again. Layers already downloaded are reused. |
| `E602` | `/health did not respond in 60s. Inspect: docker logs neohive` | Read the log, then see [Agent can't connect](connection.md). |
| `E603` | `<variable> must be a positive integer (milliseconds). Got: '<value>'` | Set the timeout to digits only, such as `1800000`. |
| `E101`, `E601` | `... Contact hello@neohive.ai.` | Send the full message to `hello@neohive.ai`. |
| none | `port is already allocated` (from Docker) | Another program holds port `3577`. Stop it, or run again with `NEOHIVE_PORT=4577`. |

Before `E303` or `E310` the installer also prints `License rejected by Keygen: <reason>`.

## Server and dashboard

| Message | Cause | Fix |
|---|---|---|
| `Failed to connect to localhost port 3577` | The container is not running. | Run `docker start neohive`, then see [Agent can't connect](connection.md). |
| `"error":"warmup failed"` from `/health` | NeoHive could not finish starting. | Read `docker logs neohive --tail 50`, then run `docker restart neohive`. |
| `"error":"embedder cannot run, so nothing can be stored or recalled"` from `/health` | The embedding engine in the container cannot start. | Read the log, then see [GPU and CPU](../admin/gpu-cpu.md). |
| `"status":"degraded"` from `/health` | One hive failed its check. | On the dashboard home page, open that hive's menu and click **Restart**. |
| `Unknown Hive: <id>` | The hive id in the MCP endpoint or webhook URL is wrong. | Copy the endpoint again from **Install Instructions**. |
| `License check failed` (HTTP `402`) | The license expired or failed validation. | See [Licensing](../admin/licensing.md). |
| `License check unavailable` (HTTP `503`) | NeoHive could not read its license state. | Run `docker restart neohive`. If it persists, contact `hello@neohive.ai`. |
| `Gateway is warming up. Sync scheduling is not available yet, retry shortly.` | NeoHive has just started. | Wait a few seconds and try again. |

## Agent tools

| Message | Cause | Fix |
|---|---|---|
| `No Indexes configured. Create an Index first.` | The hive has no index NeoHive can open. | Open the hive's menu in the dashboard and click **Restart**. |
| `Index "<id>" not found. Use list_indexes to see available Indexes.` | The `index` argument names an id this hive does not have. | Call `list_indexes` and use an id from its reply. |
| `Index "<id>" is <status>. Only active Indexes can be used.` | The index is `paused` or in `error`, so recall skips it. | Open the index page in the dashboard and fix the error it shows. See [Repository sync issues](sync.md). |
| `Provide either query (string) or queries (string array).` | `memory_recall` got neither. | Pass one of them. See [MCP tools](../reference/mcp-tools.md). |
| `Provide query OR queries, not both.` | `memory_recall` got both. | Pass one of them. |
| `Maximum 5 queries allowed.` | `queries` has more than five entries. | Send five or fewer. |
| `Memory #<id> not found.` | `memory_forget` got an id that does not exist. | Take the id from a `memory_recall` result heading. |
| `Refusing to index binary content: mem://store` | `memory_store` got binary data instead of text. | Store text only. |
| `No relevant memories found for this query.` | Nothing matched. | See [Recall isn't finding what I need](recall.md). |

## Uploads

| Message | Cause | Fix |
|---|---|---|
| `Unsupported type: <ext>` or `Unsupported file type: <ext>. Allowed: .md, .markdown, .txt, .pdf` | The file is not one of those types. | Export it to one of them. See [Supported file types](../reference/file-types.md). |
| `File too large (<size> > 10 MB)` or `File too large` | The file is over 10 MB. | Split it into smaller files. |
| `Too many files` | More than 20 files in one upload. | Upload in batches of 20 or fewer. |
| `<name> already exists, skipped` | A file with that name is already in the index. | Rename the new file, or remove the old one first. |
| `No text could be extracted from this PDF. ...` | The PDF is scanned images or drawn text. | Run OCR on it, or upload an exported text version. |
| `No content could be extracted from this file (it appears to be empty or contain only whitespace).` | The file is empty. | Upload a file with content. |
| `PDF bridge timed out after 300s` | Converting the PDF took longer than the timeout. | Run the installer again with a higher `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS`. |

## Syncs and connections

| Message | Cause | Fix |
|---|---|---|
| `Invalid token or token has expired` | The GitHub or GitLab token no longer works. | Replace it on **Data Sources**. See [Repository sync issues](sync.md). |
| `Token missing required scopes (needs repo)` | The GitHub token lacks the `repo` scope. | Create a token with `repo` scope and replace it. |
| `A sync is already running for this Index` | A sync was already running when you clicked **Trigger sync**. | Wait for it to finish. |
| `<n> files could not be indexed after 3 attempts. Trigger a sync to retry.` | The same files failed three syncs in a row. | See [Repository sync issues](sync.md). |

Webhook errors (`Invalid or missing webhook secret`, `No Index found syncing repo: <repo>`) are listed on [Webhook refresh endpoint](../reference/webhooks.md).

## Not listed here

Collect a diagnostics bundle and send it to `hello@neohive.ai` with the message you saw. The bundle holds logs and settings with secrets removed, never your memories, code, or databases.

```bash
curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/logs.sh | bash
```

## Next step

See [Agent can't connect](connection.md) to work through the connection checks.
