---
description: "Error messages from the NeoHive installer, server, tools, uploads, and syncs, each with its cause and fix."
---

# Common errors

Search this page for the message you see. Each entry gives the cause and the fix, grouped by where the message appears. Text in `<angle brackets>` stands for a value that changes, such as a file name.

If NeoHive works but your agent recalls the wrong things, see [Common mistakes to avoid](../results/common-mistakes.md) instead.

## Installer

The installer is the script that downloads and starts NeoHive. When the installer fails, it prints `FAIL [<code>]` followed by the message, and then stops.

| Code | Message | Fix |
|---|---|---|
| `E201` | `Unsupported OS: <name>. Linux and macOS are supported. On Windows, install via WSL2.` | On Windows, run the installer inside Windows Subsystem for Linux (WSL2). |
| `E202` | `Docker is not installed. Install from https://docs.docker.com/get-docker/ and retry.` | Install Docker, and then run the installer again. |
| `E203` | `Docker daemon is not running (or current user cannot access it). Start Docker and retry.` | Start Docker. Check that `docker info` works without `sudo`. |
| `E204` | `Invalid BACKEND '<value>' (expected cpu\|vulkan\|cuda\|rocm)` | Set `NEOHIVE_BACKEND` to one of the listed values, or unset it. |
| `E205` | `<flag> requires a path argument.` | Pass `--license-file /path/to/license.key`. |
| `E206` | `Unknown argument: <flag>` | The installer takes only `--license-file <path>`, `--license-file=<path>`, or `-l <path>`. Use [environment variables](../reference/environment-variables.md) for settings. |
| `E301` | `No license. Set NEOHIVE_LICENSE_FILE (or pass --license-file), or drop a license.key / license.json next to install.sh, or run interactively. Contact hello@neohive.ai for your license.` | Pass `--license-file`, set `NEOHIVE_LICENSE_FILE`, or put `license.key` or `license.json` next to `install.sh`. To get a license, request one from the [NeoHive team](https://www.neohive.ai/download/). |
| `E301` | `<path> is not a readable file. Verify the path and re-run.` | Run the installer again, and type the full path to the file. |
| `E302` | `Empty path.` | Run the installer again, and type the path at the prompt. |
| `E303` | `License rejected and stdin is not a TTY - cannot re-prompt. Point NEOHIVE_LICENSE_FILE at a valid license file and retry.` | Point `NEOHIVE_LICENSE_FILE` at your current license file. If the installer still rejects it, request a new license from the [NeoHive team](https://www.neohive.ai/download/). |
| `E304` to `E307` | `License file '<path>' is not readable.`, `License file '<path>' is empty.`, `License file '<path>' is JSON but no .key field found.`, or `Could not extract license key from '<path>'.` | Use the license file that the NeoHive team sent you, without editing it. |
| `E308` | `--license-file '<path>' does not exist.` | Correct the path to the license file. |
| `E309` | `NEOHIVE_LICENSE_FILE '<path>' does not exist.` | Correct the path to the license file. |
| `E310` | `License rejected after 3 attempts. Contact hello@neohive.ai.` | Check that you have the current license file. If you do, request a new license from the [NeoHive team](https://www.neohive.ai/download/). |
| `E501` | `image '<image>:<backend>' not found and NEOHIVE_BACKEND is set - unset it to allow automatic fallback.` | Unset `NEOHIVE_BACKEND` so that the installer chooses an image. |
| `E502` | `no compatible image found on <image>. Check connectivity to Docker Hub and retry.` | Check your connection or proxy to Docker Hub, and then run the installer again. |
| `E503` | `a compatible image exists on <image> but the download did not complete - usually an interrupted (Ctrl-C) or dropped pull. Re-run the installer to resume; already-pulled layers are cached.` | Run the installer again. The installer reuses the image layers it already downloaded. |
| `E602` | `/health did not respond in 60s. Inspect: docker logs neohive` | Read the log, and then see [Agent can't connect](connection.md). |
| `E603` | `<variable> must be a positive integer (milliseconds). Got: '<value>'` | Set the timeout to digits only, such as `1800000`. |
| `E101`, `E601` | A message that ends with `Contact hello@neohive.ai.` | Send the full message to `hello@neohive.ai`. These errors come from the installer itself, not from your machine. |
| none | `port is already allocated` (from Docker) | Another program holds port `3577`. Stop that program, or run the installer again with `NEOHIVE_PORT=4577`. |

Before `E303` or `E310`, the installer also prints `License rejected by Keygen: <reason>` or `License rejected by Keygen (HTTP <status>): <reason>`.

## Server and dashboard

The NeoHive server returns the following messages. You see them in the dashboard, in a command's output, or in the reply from `/health`. [Agent can't connect](connection.md) explains each `/health` status, including `"status":"degraded"`.

| Message | Cause | Fix |
|---|---|---|
| `Failed to connect to localhost port 3577` (from `curl`) | The container is not running. | Run `docker start neohive`, and then see [Agent can't connect](connection.md). |
| `"error":"warmup failed"` from `/health` | NeoHive could not finish starting. | Read `docker logs neohive --tail 50`, and then run `docker restart neohive`. |
| `"error":"embedder cannot run, so nothing can be stored or recalled"` from `/health` | The embedding engine in the container cannot start. | Read the log, and then see [GPU and CPU](../admin/gpu-cpu.md). |
| `"error":"document worker is not running, so uploads are not processed"` from `/health` | The part of NeoHive that converts uploaded files has stopped. | Run `docker restart neohive`. If the error continues, send a diagnostics bundle, as described in [Not listed here](#not-listed-here). |
| `Unknown Hive: <id>` | The [Hive](../concepts/glossary.md#hive) id in the [MCP](../concepts/glossary.md#mcp) endpoint or webhook URL is wrong. | Copy the endpoint again from **Install Instructions**. |
| `License check failed` (HTTP `402`) | The license expired or failed validation. The reply also carries a `reason`. | See [Licensing](../admin/licensing.md). |
| `License check unavailable` (HTTP `503`) | NeoHive could not read its license state. | Run `docker restart neohive`. If the error continues, contact `hello@neohive.ai`. |
| `Gateway is warming up. Sync scheduling is not available yet, retry shortly.` | NeoHive has just started. | Wait a few seconds and try again. |

## Agent tools

Your agent receives the following messages from a NeoHive tool, such as `memory_recall`.

| Message | Cause | Fix |
|---|---|---|
| `No Indexes configured. Create an Index first.` | The Hive has no [Index](../concepts/glossary.md#index). | Add an Index to the Hive. |
| `Index "<id>" not found. Use list_indexes to see available Indexes.` | The `index` argument names an id this Hive does not have. | Call `list_indexes` and use an id from its reply. |
| `Index "<id>" is <status>. Only active Indexes can be used.` | The Index is not `active`, for example `paused` or `error`. | Open the Index page in the dashboard, and fix the problem that the page shows. See [Repository sync issues](sync.md). |
| `Provide either query (string) or queries (string array).` | `memory_recall` received neither argument. | Pass one of the two arguments. See [MCP tools](../reference/mcp-tools.md). |
| `Provide query OR queries, not both.` | `memory_recall` received both arguments. | Pass only one of the two arguments. |
| `Maximum 5 queries allowed.` | `queries` has more than five entries. | Send five queries or fewer. |
| `Memory #<id> not found.` | `memory_forget` received an id that does not exist. | Take the id from a `memory_recall` result heading, which reads `Memory #<n> (id: <id>, ...)`. |
| `Refusing to index binary content: mem://store` | `memory_store` received binary data instead of text. | Store text only. |
| `No relevant memories found for this query.` | No stored content matched the query. | See [Recall isn't finding what I need](recall.md). |

## Uploads

NeoHive shows the following messages for a file that you upload to a [Files Index](../concepts/glossary.md#files-index). A message that NeoHive shows before the upload starts begins with the file's name.

| Message | Cause | Fix |
|---|---|---|
| `Unsupported type: <ext>` or `Unsupported file type: <ext>. Allowed: <extensions>` | NeoHive cannot read that file type. | Export the file to a supported type. See [Supported file types](../reference/file-types.md). |
| `File too large (<size> > <limit>)` or `File too large` | The file is over the size limit for one file. | Split the file into smaller files. |
| `Too many files` | The upload has more than 20 files. | Upload in batches of 20 or fewer. |
| `This upload is <size>, over the <limit> per-request limit` | The files in one upload add up to more than NeoHive accepts at once. | Upload fewer files at a time. |
| `a file with this name is already staged`, `selected more than once`, or `More than one file in this upload is named <name>` | Two files in the same upload have the same name. | Rename one of the files, or upload it separately. |
| `Cannot replace a <ext> upload with a <ext> file. Delete it and upload the new file instead.` | A file with that name is already in the Index. A new file with the same name replaces the old one, but only when the two have the same type. | Delete the old file from the Index, and then upload the new one. |
| `No text could be extracted from this document. Common causes: scanned or image-only pages, or text rendered as vector outlines instead of fonts. For an image: no readable text, or text too small or too low in contrast for OCR.` | The file has no text that NeoHive can read, or it is empty. | Upload a version with real text, or a sharper image. |
| `Converting "<name>" timed out` | Converting the file took longer than the time allowed, five minutes by default. | Run the installer again with a higher `NEOHIVE_DOCUMENT_TIMEOUT_MS`. See [Environment variables](../reference/environment-variables.md). |
| `Converting "<name>" was killed — most likely it needed more memory than available.` | Converting the file needed more memory than the container has. | Split the file, or give Docker more memory. |
| `Upload processing is unavailable. Try again shortly.` | The part of NeoHive that converts uploads is not running. | Wait a minute and try again. If the error continues, check `/health` as described in [Agent can't connect](connection.md). |

## Syncs and connections

Two messages come from the GitHub or GitLab connection that a repository sync uses.

`Invalid token or token has expired` means the token no longer works, so NeoHive cannot list your repositories. On **Data Sources**, add a new connection with a working token. See [Credentials and secrets](../security/credentials.md).

`Token missing required scopes (needs repo)` means the GitHub token lacks the `repo` scope. For GitLab, the message ends at `scopes`. Create a token with the right scope, and then add it as a new connection.

[Repository sync issues](sync.md) covers the messages that a sync shows on an Index's page, such as `A synced branch is no longer on the remote`. [Webhook refresh endpoint](../reference/webhooks.md) lists the webhook errors, such as `Invalid or missing webhook secret` and `No Index found syncing repo: <repo>`.

## Not listed here

To get help with an error that this page does not list, do the following:

1. Run the following command to collect a diagnostics bundle:

   ```bash
   curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/logs.sh | bash
   ```

2. Send the bundle to `hello@neohive.ai` with the message you saw.

The bundle holds logs and settings with secrets removed. The bundle never includes your [Memories](../concepts/glossary.md#memory), code, or databases.
