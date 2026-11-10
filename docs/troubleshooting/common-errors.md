---
description: "Error messages from the NeoHive installer, server, tools, uploads, and syncs, each with its cause and fix."
---

# Common errors

NeoHive shows an error message when the installer, the server, an agent tool, an upload, or a sync fails. To find the cause and the fix, search for the exact message you see. Text in `<angle brackets>` stands for a value that changes, such as a file name.

If NeoHive works but your agent recalls the wrong things, see [Common mistakes to avoid](../results/common-mistakes.md) instead.

## Installer

The installer is the script that downloads and starts NeoHive. When the installer fails, it prints `FAIL [<code>]` followed by the message, and then stops.

| Code | Message | Fix |
|---|---|---|
| `E201` | `Unsupported OS: <name>. Linux and macOS are supported. On Windows, install via WSL2.` | On Windows, run the installer inside Windows Subsystem for Linux (WSL2). |
| `E202` | `Docker is not installed. Install from https://docs.docker.com/get-docker/ and retry.` | Install Docker, and then run the installer again. |
| `E203` | `Docker daemon is not running (or current user cannot access it). Start Docker and retry.` | Start Docker. Check that `docker info` works without `sudo`. |
| `E204` | `Invalid BACKEND '<value>' (expected cpu\|vulkan\|cuda\|rocm)` | Set `NEOHIVE_BACKEND` to one of the listed values, or unset it. |
| `E205`, `E206` | `<flag> requires a path argument.` or `Unknown argument: <flag>` | The installer takes only `--license-file <path>`, `--license-file=<path>`, or `-l <path>`. Use [environment variables](../reference/environment-variables.md) for settings. |
| `E301` | `No license. Set NEOHIVE_LICENSE_FILE (or pass --license-file), or drop a license.key / license.json next to install.sh, or run interactively. Contact hello@neohive.ai for your license.` | Pass `--license-file`, set `NEOHIVE_LICENSE_FILE`, or put `license.key` or `license.json` next to `install.sh`. To get a license, request one from the [NeoHive team](https://www.neohive.ai/download/). |
| `E301`, `E302`, `E308`, `E309` | `<path> is not a readable file. Verify the path and re-run.`, `Empty path.`, `--license-file '<path>' does not exist.`, or `NEOHIVE_LICENSE_FILE '<path>' does not exist.` | Correct the path to the license file, and then run the installer again. At the prompt, enter the full path. |
| `E303` | `License rejected and stdin is not a TTY - cannot re-prompt. Point NEOHIVE_LICENSE_FILE at a valid license file and retry.` | Set `NEOHIVE_LICENSE_FILE` to the path of your current license file. If the installer still rejects it, request a new license from the [NeoHive team](https://www.neohive.ai/download/). |
| `E304` to `E307` | `License file '<path>' is not readable.`, `License file '<path>' is empty.`, `License file '<path>' is JSON but no .key field found.`, or `Could not extract license key from '<path>'.` | Use the license file that the NeoHive team sent you, without editing it. |
| `E310` | `License rejected after 3 attempts. Contact hello@neohive.ai.` | Check that you have the current license file. If you do, request a new license from the [NeoHive team](https://www.neohive.ai/download/). |
| `E501` | `image '<image>:<backend>' not found and NEOHIVE_BACKEND is set - unset it to allow automatic fallback.` | Unset `NEOHIVE_BACKEND` so that the installer chooses an image. |
| `E502` | `no compatible image found on <image>. Check connectivity to Docker Hub and retry.` | Check your connection or proxy to Docker Hub, and then run the installer again. |
| `E503` | `a compatible image exists on <image> but the download did not complete - usually an interrupted (Ctrl-C) or dropped pull. Re-run the installer to resume; already-pulled layers are cached.` | Run the installer again. The installer reuses the image layers it already downloaded. |
| `E602` | `/health did not respond in 60s. Inspect: docker logs neohive` | Read the log. To check the container and the server, see [Agent can't connect](connection.md). |
| `E603` | `<variable> must be a positive integer (milliseconds). Got: '<value>'` | Set the timeout to digits only, such as `1800000`. |
| `E601` | A message that ends with `Contact hello@neohive.ai.` | Send the full message to `hello@neohive.ai`. |
| none | `port is already allocated` (from Docker) | Another program holds port `3577`. Stop that program, or run the installer again with `NEOHIVE_PORT=4577`. |

## Server and dashboard

The NeoHive server reports a problem in the dashboard, in a command's output, or in the reply from `/health`. For more information about each `/health` status, including `"status":"degraded"`, see [Agent can't connect](connection.md). The server returns the following messages:

| Message | Cause | Fix |
|---|---|---|
| `Failed to connect to localhost port 3577` (from `curl`) | The container is not running. | Run `docker start neohive`. To find why the container stopped, see [Agent can't connect](connection.md). |
| `"error":"warmup failed"` from `/health` | NeoHive could not finish starting. | Read `docker logs neohive --tail 50`, and then run `docker restart neohive`. |
| `"error":"embedder cannot run, so nothing can be stored or recalled"` from `/health` | The embedding engine in the container cannot start. | Read the log. To check the embedding engine's hardware, see [GPU and CPU](../admin/gpu-cpu.md). |
| `"error":"document worker is not running, so uploads are not processed"` from `/health` | The part of NeoHive that converts uploaded files has stopped. | Run `docker restart neohive`. If the error continues, send a diagnostics bundle. To collect the bundle, see [Not listed here](#not-listed-here). |
| `Unknown Hive: <id>` | The [Hive](../concepts/glossary.md#hive) ID in the [MCP](../concepts/glossary.md#mcp) endpoint or webhook URL is wrong. | Copy the endpoint again from **Install Instructions**. |
| `License check failed` (HTTP `402`) | The license expired or failed validation. The reply also carries a `reason`. | To check or replace the license, see [Licensing](../admin/licensing.md). |
| `License check unavailable` (HTTP `503`) | NeoHive could not read its license state. | Run `docker restart neohive`. If the error continues, contact `hello@neohive.ai`. |
| `Gateway is warming up. Sync scheduling is not available yet, retry shortly.` | NeoHive is still starting. | Wait a few seconds and try again. |

## Agent tools

Your agent receives an error message when a NeoHive tool, such as `memory_recall`, fails. Most of these messages mean that the agent called the tool the wrong way, so the agent fixes its call and tries again. For the rules each tool follows, see [MCP tools](../reference/mcp-tools.md).

The following messages need you to act:

| Message | Cause | Fix |
|---|---|---|
| `Index "<id>" is <status>. Only active Indexes can be used.` | NeoHive marked the Index as `error`, for example because its embedding model does not match its stored data. | Open the Index page in the dashboard, and fix the problem that the page shows. For more information about sync problems, see [Repository sync issues](sync.md). |
| `No relevant memories found for this query.` | No stored content matched the query. | To find why nothing matched, see [Recall isn't finding what I need](recall.md). |
| `Recall could not run: Embedding model is still downloading` or `Context could not load: Embedding model is still downloading` | NeoHive is still downloading the embedding model that the Index uses. | Wait a few minutes, and then ask again. |
| `The embedding model could not be downloaded. NeoHive will try again.` | NeoHive could not download the embedding model. | Wait a few minutes, and then ask again. If the error continues, send a diagnostics bundle. To collect the bundle, see [Not listed here](#not-listed-here). |
| `Recall could not run: none of the <n> Indexes in this Hive could be searched.` or `Context could not load: none of the <n> Indexes in this Hive could be searched.` | The search failed in every Index of the Hive. The message names the affected Indexes. | Run the checks in [Agent can't connect](connection.md). |

## Uploads

NeoHive shows the following messages for a file that you upload to a [Files Index](../concepts/glossary.md#files-index). A message that NeoHive shows before the upload starts begins with the file's name.

| Message | Cause | Fix |
|---|---|---|
| `Unsupported type: <ext>` | NeoHive cannot read that file type. | Export the file to a supported type. For more information about supported types, see [Supported file types](../reference/file-types.md). |
| `File too large (<size> > <limit>)` | The file is over the size limit for one file. | Split the file into smaller files. |
| `a file with this name is already staged`, `selected more than once`, or `More than one file in this upload is named <name>` | Two files in the same upload have the same name. | Rename one of the files so each name is unique, and then upload both. |
| `No text could be extracted from this document. Common causes: scanned or image-only pages, or text rendered as vector outlines instead of fonts. For an image: no readable text, or text too small or too low in contrast for OCR.` | The file has no text that NeoHive can read, or the file is empty. | Upload a version with real text, or a sharper image. |
| `Converting "<name>" timed out` | Converting the file took longer than the time allowed, five minutes by default. | Run the installer again with a higher `NEOHIVE_DOCUMENT_TIMEOUT_MS`. For more information, see [Environment variables](../reference/environment-variables.md). |
| `Converting "<name>" was killed` | Converting the file needed more memory than the container has. | Split the file, or give Docker more memory. |
| `Upload processing is unavailable. Try again shortly.` | The part of NeoHive that converts uploads is not running. | Wait a minute and try again. If the error continues, check `/health`. To read the `/health` reply, see [Agent can't connect](connection.md). |
| `<name> has <n> pages, over the <limit> page limit` | The PDF has more than 500 pages, the default limit. | Split the PDF into smaller files. |
| `<name> has <n> pixels, over the <limit> pixel limit` | The image has more than 50,000,000 pixels, the default limit. | Resize the image, or crop the image to the part with the text. |
| `Converting "<name>" exited with code <n>` | The converter could not read the file, which is often damaged or saved in an unusual way. | Open the file, save or export it again, and then upload the new copy. |
| `Refusing to index binary content: <name>` | The file has a text extension, such as `.txt` or `.md`, but holds binary data. | Upload the file with the extension that matches its contents. |
| `This import could not be processed after repeated failures. Re-upload the document to try again.` | The upload failed several times, so NeoHive stopped trying. | Upload the file again. |

## Syncs and connections

When you add a Code or Documentation Index, the repository list can show two messages about the connection's token. A sync with a broken token shows `A git command failed` instead. For that message, see [Repository sync issues](sync.md#a-git-command-failed).

`Invalid token or token has expired` means the token no longer works, so NeoHive cannot list your repositories. On **Data Sources**, add a new connection with a working token. For more information about replacing a token, see [Data sources and credentials](../admin/data-sources.md#check-or-remove-a-connection).

`Token missing required scopes (needs repo)` means the GitHub token lacks the `repo` scope. For GitLab, the message ends at `scopes`. Create a token with the right scope, and then add it as a new connection.

A sync shows other messages on an Index's page, such as [`A git command failed`](sync.md#a-git-command-failed) and `A synced branch is no longer on the remote`. A webhook call returns its own errors, such as `Invalid or missing webhook secret` and `No Index found syncing repo: <repo>`. For more information about sync messages, see [Repository sync issues](sync.md), and for webhook errors, see [Webhook refresh endpoint](../reference/webhooks.md).

## Not listed here

To get help with any other error, do the following:

1. To collect a diagnostics bundle, run the following command:

   ```bash
   curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/logs.sh | bash
   ```

2. Send the bundle to `hello@neohive.ai` with the message you saw.

The bundle holds logs and settings with secrets removed. The bundle does not include your [Memories](../concepts/glossary.md#memory), code, or databases.
