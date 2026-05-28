# Repository Sync Issues

If a repository sync fails or seems stuck, here are the most common causes.

## Credential problems

The most frequent issue is an expired or invalid access token. Open the NeoHive dashboard, navigate to the repo hive, and check the credential status. If the token has expired, replace it with a fresh one.

For GitHub personal access tokens, make sure the token has `repo` scope.

## Large repositories

Very large repositories take longer to index on first sync. The dashboard shows live progress during syncs. If a sync appears stuck, check the logs:

```sh
docker logs neohive --tail 50
```

Long-running syncs won't be interrupted by idle suspension — NeoHive keeps the worker active until the sync completes.

## PDF files timing out

If your repository contains large PDF files and sync fails with a timeout, increase the processing timeout by setting `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS`. The default is 5 minutes, but a 900-page document typically needs 25-30 minutes:

```sh
NEOHIVE_PDF_BRIDGE_TIMEOUT_MS=1800000 \
  bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

## Sync schedule

Syncs run automatically on a configurable schedule. If you need to trigger one immediately, use the dashboard — each repo hive has a manual sync button.

## Still stuck?

Contact the NeoHive team at `support@neohive.ai` with the output of `docker logs neohive --tail 100` and the name of the repository that's failing.
