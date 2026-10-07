---
description: "Error messages from the NeoHive installer, server, tools, uploads, and syncs, each with its cause and fix."
---

# Common errors

Search this page for the message you see, and then apply the fix.

Each entry on this page is an error message. If NeoHive works but your agent recalls the wrong things, see [Common mistakes to avoid](../results/common-mistakes.md). Text in `<angle brackets>` stands for a value that changes.

## Installer

The installer prints a failure as `FAIL [<code>]` followed by the message.

| Code | Message | Fix |
|---|---|---|
| `E201` | `Unsupported OS: <name>. Linux and macOS are supported. On Windows, install via WSL2.` | On Windows, run the installer inside Windows Subsystem for Linux (WSL2). |
| `E202` | `Docker is not installed. Install from https://docs.docker.com/get-docker/ and retry.` | Install Docker, then run the installer again. |
| `E203` | `Docker daemon is not running (or current user cannot access it). Start Docker and retry.` | Start Docker. Check that `docker info` works without `sudo`. |
| `E204` | `Invalid BACKEND '<value>' (expected cpu\|vulkan\|cuda\|rocm)` | Set `NEOHIVE_BACKEND` to one of the listed values, or unset it. |
| `E205` | `<flag> requires a path argument.` | Pass `--license-file /path/to/license.key`. |
| `E206` | `Unknown argument: <flag>` | The installer takes only `--license-file <path>`, `--license-file=<path>`, or `-l <path>`. Use [environment variables](../reference/environment-variables.md) for settings. |
| `E301` | `No license. Set NEOHIVE_LICENSE_FILE (or pass --license-file), ...` | Pass `--license-file`, set `NEOHIVE_LICENSE_FILE`, or put `license.key` or `license.json` next to `install.sh`. |
| `E301` | `<path> is not a readable file. Verify the path and re-run.` | Run the installer again, and type the full path to the file. |
| `E302` | `Empty path.` | Run the installer again, and type the path at the prompt. |
| `E303` | `License rejected and stdin is not a TTY - cannot re-prompt. ...` | Point `NEOHIVE_LICENSE_FILE` at your current license file. If the installer still rejects it, contact `hello@neohive.ai`. |
| `E304` to `E307` | `License file '<path>' is not readable.`, `... is empty.`, `... is JSON but no .key field found.`, `Could not extract license key from '<path>'.` | Use the license file that the NeoHive team sent you, without editing it. |
| `E308` | `--license-file '<path>' does not exist.` | Correct the path to the license file. |
| `E309` | `NEOHIVE_LICENSE_FILE '<path>' does not exist.` | Correct the path to the license file. |
| `E310` | `License rejected after <n> attempts. Contact hello@neohive.ai.` | Check that you have the current license file, and then contact `hello@neohive.ai`. |
| `E501` | `image '<image>:<backend>' not found and NEOHIVE_BACKEND is set - unset it to allow automatic fallback.` | Unset `NEOHIVE_BACKEND` so that the installer chooses an image. |
| `E502` | `no compatible image found on <image>. Check connectivity to Docker Hub and retry.` | Check your connection or proxy to Docker Hub, and then run the installer again. |
| `E503` | `a compatible image exists on <image> but the download did not complete ...` | Run the installer again. The installer reuses the image layers it already downloaded. |
| `E602` | `/health did not respond in 60s. Inspect: docker logs neohive` | Read the log, and then see [Agent can't connect](connection.md). |
| `E603` | `<variable> must be a positive integer (milliseconds). Got: '<value>'` | Set the timeout to digits only, such as `1800000`. |
| `E101`, `E601` | `... Contact hello@neohive.ai.` | Send the full message to `hello@neohive.ai`. |
| none | `port is already allocated` (from Docker) | Another program holds port `3577`. Stop that program, or run again with `NEOHIVE_PORT=4577`. |

Before `E303` or `E310`, the installer also prints `License rejected by Keygen: <reason>` or `License rejected by Keygen (HTTP <status>): <reason>`.

## Server and dashboard

| Message | Cause | Fix |
|---|---|---|
| `Failed to connect to localhost port 3577` | The container is not running. | Run `docker start neohive`, and then see [Agent can't connect](connection.md). |
| `"error":"warmup failed"` from `/health` | NeoHive could not finish starting. | Read `docker logs neohive --tail 50`, and then run `docker restart neohive`. |
| `"error":"embedder cannot run, so nothing can be stored or recalled"` from `/health` | The embedding engine in the container cannot start. | Read the log, and then see [GPU and CPU](../admin/gpu-cpu.md). |
| `"status":"degraded"` from `/health` | At least one [Hive](../concepts/glossary.md#hive) failed its check. | On the dashboard home page, open that Hive's menu and select **Restart**. |
| `Unknown Hive: <id>` | The Hive id in the Model Context Protocol (MCP) endpoint or webhook URL is wrong. | Copy the endpoint again from **Install Instructions**. |
| `License check failed` (HTTP `402`) | The license expired or failed validation. | See [Licensing](../admin/licensing.md). |
| `License check unavailable` (HTTP `503`) | NeoHive could not read its license state. | Run `docker restart neohive`. If the error continues, contact `hello@neohive.ai`. |
| `Gateway is warming up. Sync scheduling is not available yet, retry shortly.` | NeoHive has just started. | Wait a few seconds and try again. |

## Agent tools

| Message | Cause | Fix |
|---|---|---|
| `No Indexes configured. Create an Index first.` | The Hive has no [Index](../concepts/glossary.md#index), or NeoHive cannot open any of its Indexes. | Add an Index to the Hive. If the Hive already has an Index, open the Hive's menu on the dashboard home page and select **Restart**. |
| `Index "<id>" not found. Use list_indexes to see available Indexes.` | The `index` argument names an id this Hive does not have. | Call `list_indexes` and use an id from its reply. |
| `Index "<id>" is <status>. Only active Indexes can be used.` | The Index is not `active`, for example `paused` or `error`. | Open the Index page in the dashboard, and fix the error that the page shows. See [Repository sync issues](sync.md). |
| `Provide either query (string) or queries (string array).` | `memory_recall` received neither argument. | Pass one of the two arguments. See [MCP tools](../reference/mcp-tools.md). |
| `Provide query OR queries, not both.` | `memory_recall` received both arguments. | Pass only one of the two arguments. |
| `Maximum 5 queries allowed.` | `queries` has more than five entries. | Send five queries or fewer. |
| `Memory #<id> not found.` | `memory_forget` received an id that does not exist. | Take the id from a `memory_recall` result heading. |
| `Refusing to index binary content: mem://store` | `memory_store` received binary data instead of text. | Store text only. |
| `No relevant memories found for this query.` | No stored content matched the query. | See [Recall isn't finding what I need](recall.md). |

## Uploads

| Message | Cause | Fix |
|---|---|---|
| `Unsupported type: <ext>` or `Unsupported file type: <ext>. Allowed: .md, .markdown, .txt, .pdf` | The file is not one of those types. | Export the file to one of those types. See [Supported file types](../reference/file-types.md). |
| `File too large (<size> > 10 MB)` or `File too large` | The file is over 10 MB. | Split the file into smaller files. |
| `Too many files` | The upload has more than 20 files. | Upload in batches of 20 or fewer. |
| `<name> already exists, skipped` | A file with that name is already in the Index. | Rename the new file, or remove the old file first. |
| `No text could be extracted from this PDF. ...` | The PDF contains only scanned images, or its text is drawn as shapes. | Run optical character recognition (OCR) on the PDF, or upload an exported text version. |
| `No content could be extracted from this file (it appears to be empty or contain only whitespace).` | The file is empty. | Upload a file with content. |
| `PDF bridge timed out after 300s` | Converting the PDF took longer than the timeout. | Run the installer again with a higher `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS`. |

## Syncs and connections

| Message | Cause | Fix |
|---|---|---|
| `Invalid token or token has expired` | NeoHive tried to list your repositories with a GitHub or GitLab token that no longer works. | On **Data Sources**, add a new connection with a working token. See [Credentials and secrets](../security/credentials.md). |
| `Token missing required scopes (needs repo)` | The GitHub token lacks the `repo` scope. For GitLab, the message ends at `scopes`. | Create a token with the right scope, and then add the token as a new connection. |
| `A sync is already running for this Index` | A sync was already running when you selected **Trigger sync**. | Wait for the running sync to finish. |
| `<n> files could not be indexed after 3 attempts. Trigger a sync to retry.` or `... could not be indexed after repeated attempts. Trigger a sync to retry.` | The same files failed three syncs in a row. | See [Repository sync issues](sync.md). |

[Webhook refresh endpoint](../reference/webhooks.md) lists the webhook errors, such as `Invalid or missing webhook secret` and `No Index found syncing repo: <repo>`.

## Not listed here

To get help with an error that this page does not list, do the following:

1. Run the following command to collect a diagnostics bundle:

   ```bash
   curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/logs.sh | bash
   ```

2. Send the bundle to `hello@neohive.ai` with the message you saw.

The bundle holds logs and settings with secrets removed. The bundle never includes your Memories, code, or databases.

## Next step

To work through the connection checks, see [Agent can't connect](connection.md).
