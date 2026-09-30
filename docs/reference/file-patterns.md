---
description: "The glob syntax the Allowlist and Blocklist accept, how the two combine, and patterns to start from."
---

# File pattern syntax

Write Allowlist and Blocklist patterns that include exactly the files you mean.

The **Allowlist** and **Blocklist** boxes sit under **File filters** on a Code or Documentation Index's **Sync Settings** tab. Put one pattern per line and click **Save settings**. Patterns use [micromatch](https://github.com/micromatch/micromatch) glob syntax and match paths from the repository root, such as `src/api/users.ts`.

A file is indexed only when it passes all three checks, in this order:

| Check | A file passes when | If the list is empty |
|---|---|---|
| Built-in skip list | It is not a binary, lock file, minified bundle, or inside a folder like `node_modules`. See [Supported file types](file-types.md). | Always applies |
| **Allowlist** | It matches at least one pattern. | Every file passes |
| **Blocklist** | It matches no pattern. | Every file passes |

The Blocklist wins over the Allowlist. Neither list can bring back a file the built-in skip list removes.

A new pattern only affects files from the next sync onward. It does not remove files the Index already holds, even after they change or are deleted in the repository.

Saving a change to either list makes the next sync re-read the whole repository, not only the files that changed.

## Syntax

| Pattern | Matches | Does not match |
|---|---|---|
| `*.js` | `app.js` | `lib/app.js` (a single `*` stops at `/`) |
| `src/*.ts` | `src/index.ts` | `src/utils/helpers.ts` |
| `src/**` | everything under `src/` | `test/src/a.ts` |
| `**/*.ts` | `index.ts`, `src/a/b.ts` | `src/App.TS` (matching is case-sensitive) |
| `**/*.{ts,tsx}` | `a.ts`, `ui/Button.tsx` | `a.js` |
| `**/*.{spec,test}.ts` | `a.spec.ts`, `api/a.test.ts` | `a.ts` |
| `generated/**` | `generated/x.ts` | `packages/core/generated/x.ts` |
| `**/generated/**` | `generated/x.ts`, `packages/core/generated/x.ts` | `src/x.ts` |

{% hint style="warning" %}
**Never put a `!` pattern in the Allowlist.** A file is allowed when it matches any line, and `!**/*.test.ts` matches every file that is not a test, including every config file. Put exclusions in the Blocklist.
{% endhint %}

Patterns skip files and folders whose names start with a dot. `**/*.md` does not match `.github/PULL_REQUEST_TEMPLATE.md`. Name dot paths directly, such as `.github/**`.

## Starting points

**Only the source and docs of a service.** Allowlist:

```text
src/**
docs/**/*.md
README.md
```

**A whole repository, minus tests and generated code.** Leave the Allowlist empty. Blocklist:

```text
**/*.{spec,test}.ts
**/__snapshots__/**
**/__fixtures__/**
**/generated/**
**/*.snap
```

**Only the TypeScript in a monorepo, minus tests.** Allowlist `**/*.{ts,tsx}`, Blocklist `**/*.{spec,test}.{ts,tsx}`.

You do not need `node_modules`, `dist`, `build`, `vendor`, `coverage`, lock files, or `.min.js` bundles in the Blocklist. The built-in skip list already removes them.

{% hint style="info" %}
The webhook refresh endpoint applies the built-in skip list but not your Allowlist or Blocklist. A file sent through the webhook is indexed even if your filters exclude it.
{% endhint %}

## Next step

See [Webhook refresh endpoint](webhooks.md) to update an Index the moment a change merges.
