---
description: "Push changed files to a Code or Documentation Index from CI with POST /hives/<hive-id>/webhook/refresh."
---

# Webhook refresh endpoint

Send changed files to NeoHive from CI, so a Code or Documentation Index updates seconds after a merge.

<figure><img src="../.gitbook/assets/reference-webhooks.svg" alt="Sequence: a CI job posts changed files to the Hive's webhook route; NeoHive checks X-Webhook-Secret, finds every Index that syncs the named repository, removes each path's old content, indexes the new content, and replies with counts."><figcaption></figcaption></figure>

Scheduled syncs already keep each Code or Documentation Index current. Use the webhook only when the wait for the next scheduled sync is too long.

```text
POST http://<host>:3577/hives/<hive-id>/webhook/refresh
Content-Type: application/json
X-Webhook-Secret: <secret>
```

`<hive-id>` is the id in the Hive's MCP endpoint, `http://<host>:3577/hives/<hive-id>/mcp`. One request updates every Code or Documentation Index in that Hive that syncs the repository you name.

## Authentication

NeoHive compares `X-Webhook-Secret` with `MEMVEC_WEBHOOK_SECRET` on the `neohive` container. While that variable is unset, every request gets `401`. The installer does not set it, so add it to the container yourself, and again after each upgrade. [Environment variables](environment-variables.md) explains why.

{% hint style="danger" %}
Treat the secret like a database password. Keep it in your CI secret store, never in the repository or in CI logs.
{% endhint %}

## Request body

```json
{
  "repo": "https://github.com/acme/api",
  "sha": "4f2c9e1",
  "files": [
    { "path": "src/users.ts", "content_base64": "ZXhwb3J0IGNvbnN0IC4uLg==" },
    { "path": "src/legacy.ts", "action": "deleted" }
  ]
}
```

| Field | Required | Notes |
|---|---|---|
| `repo` | Yes | The repository URL exactly as the Index stores it, such as `https://github.com/acme/api`. `acme/api` alone does not match. |
| `sha` | Yes | The commit the files come from. |
| `files[].path` | Yes | Path from the repository root. |
| `files[].content_base64` | For added and changed files | The whole file, base64-encoded. |
| `files[].action` | For deleted files | `deleted` is the only value that does anything. |

For each path, NeoHive first removes what it holds, then indexes `content_base64` if you sent it. **A file sent with neither `content_base64` nor `"action": "deleted"` is removed from the Index.** NeoHive does not read the file from its own copy of the repository.

The body can be at most 100 KB, and base64 makes each file about a third larger. Split a large change across several requests.

## Response

```json
{ "processed": 2, "skipped": 0, "deleted": 7, "errors": [], "duration_ms": 412 }
```

| Field | Counts |
|---|---|
| `processed` | Files indexed, plus files removed with `"action": "deleted"` |
| `skipped` | Files the built-in skip list excludes, files that look binary, and files sent with no content |
| `deleted` | Stored pieces removed, not files |
| `errors` | One `{ "path", "error" }` entry per file that failed |

| Status | Body | Cause |
|---|---|---|
| `401` | `Invalid or missing webhook secret` | Wrong header, or `MEMVEC_WEBHOOK_SECRET` is not set on the container. |
| `400` | `Missing required field: repo` (or `sha`, `files (array)`) | The body is missing a field. |
| `400` | `Each file must have a path string` | An entry in `files` has no `path`. |
| `404` | `No Index found syncing repo: <repo>` | No Code or Documentation Index in that Hive syncs that exact URL. |
| `404` | `Unknown Hive: <hive-id>` | The Hive id in the URL is wrong. |
| `413` | `Payload Too Large` (an HTML page, not JSON) | The body is over 100 KB. |
| `402` | `License check failed` | The license expired or failed validation. See [Licensing](../admin/licensing.md). |

## GitHub Actions template

The runner must reach your NeoHive server. A GitHub-hosted runner cannot reach `localhost`, so use a self-hosted runner on the same network, or read [Exposing NeoHive beyond your network](../security/network.md) first.

```yaml
name: NeoHive refresh

on:
  push:
    branches:
      - main

jobs:
  refresh:
    runs-on:
      - self-hosted
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Send changed files to NeoHive
        env:
          NEOHIVE_URL: ${{ secrets.NEOHIVE_URL }}
          NEOHIVE_HIVE_ID: ${{ secrets.NEOHIVE_HIVE_ID }}
          NEOHIVE_WEBHOOK_SECRET: ${{ secrets.NEOHIVE_WEBHOOK_SECRET }}
          REPO_URL: ${{ github.server_url }}/${{ github.repository }}
        run: |
          git diff --no-renames --name-status HEAD~1 HEAD > changed.txt
          python3 - > payload.json <<'EOF'
          import base64, json, os
          files = []
          for line in open("changed.txt"):
              status, path = line.rstrip("\n").split("\t", 1)
              if status == "D":
                  files.append({"path": path, "action": "deleted"})
              else:
                  with open(path, "rb") as f:
                      content = base64.b64encode(f.read()).decode()
                  files.append({"path": path, "content_base64": content})
          payload = {"repo": os.environ["REPO_URL"], "sha": os.environ["GITHUB_SHA"], "files": files}
          print(json.dumps(payload))
          EOF
          curl -fsS \
            -H 'Content-Type: application/json' \
            -H "X-Webhook-Secret: $NEOHIVE_WEBHOOK_SECRET" \
            --data @payload.json \
            "$NEOHIVE_URL/hives/$NEOHIVE_HIVE_ID/webhook/refresh"
```

`--no-renames` reports a renamed file as a deletion plus an addition, so the old path leaves the Index. The template sends one request, so a merge whose changed files add up to more than 100 KB gets `413`.

## Next step

See [Common errors](../troubleshooting/common-errors.md) for any other message.
