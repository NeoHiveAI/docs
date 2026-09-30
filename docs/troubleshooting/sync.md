---
description: "Diagnose and fix repository sync failures."
---

# Repository Sync Issues

If a repository sync fails or seems stuck, here are the most common causes.

## Credential problems

The most frequent issue is an expired or invalid access token. Open the dashboard, go to the repo hive, and check the credential status. If the token has expired, replace it with a fresh one. For GitHub personal access tokens, make sure the token has `repo` scope.

## Large repositories

Very large repositories take longer on the first sync. The dashboard shows live progress; if a sync looks stuck, check the logs:

```sh
docker logs neohive --tail 50
```

Long-running syncs won't be interrupted by idle suspension. NeoHive keeps the worker active until the sync completes.

## PDF files timing out

If your repository contains large PDFs and sync fails with a timeout, raise the processing timeout. The default is 5 minutes, but a 900-page document typically needs 25–30:

```sh
NEOHIVE_PDF_BRIDGE_TIMEOUT_MS=1800000 \
  bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

## Sync schedule

Syncs run automatically on a configurable schedule. To trigger one immediately, use the manual sync button on the repo hive in the dashboard.

## Still stuck?

Contact the NeoHive team at `support@neohive.ai` with the output of `docker logs neohive --tail 100` and the name of the repository that's failing.
