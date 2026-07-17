---
description: "Index your GitHub or GitLab repositories so your agent can search your code by meaning."
---

# Indexing Your Codebase

NeoHive can index your GitHub or GitLab repositories so your agents search your source code by meaning. Instead of grepping for a function name, your agent can ask "how does the sync engine handle retries?" and get back the relevant code.

## Prerequisites

- A repo hive lives inside a project — [create a project first](getting-started.md) if you haven't.
- **Read access to the repository**, plus a credential NeoHive can use: a GitHub personal access token with `repo` scope, a GitLab token with `read_repository`, or an SSH key.
- Indexing runs on your own hardware. It's fast on any machine and quicker with a GPU — see [GPU vs CPU](config/gpu.md).

## Adding a repository

[▶ **Watch: Adding a repository**](https://github.com/NeoHiveAI/docs/releases/download/docs-media/indexing-codebase.mp4)

1. Open the NeoHive dashboard at `http://localhost:3577`.
2. Navigate to your project and create a new **repo hive**.
3. Enter the repository URL and credentials — a personal access token or SSH key.
4. Choose the branch to index (defaults to `main`), then start the initial sync.

The initial sync clones the repository and indexes every file.

{% hint style="info" %}
Indexing time scales with repository size — a few minutes for a typical service, longer for a large monorepo. You only pay this cost once; later syncs are incremental. Watch live progress in the dashboard.
{% endhint %}

{% hint style="info" %}
For GitHub personal access tokens, the token needs `repo` scope. Credentials are encrypted at rest.
{% endhint %}

## What gets indexed

NeoHive indexes text-based source and skips anything with no semantic value:

| Indexed | Skipped |
|---------|---------|
| Source code | Binaries and images |
| Markdown, plain text, docs | Vendored dependencies (e.g. `node_modules/`, `vendor/`) |
| Config files | Very large or generated files |

The index understands the _structure_ of your code, not just keywords — so your agent finds relevant code by describing what it does.

## Scoping what gets indexed

To narrow the index further — skip generated code, fixtures, or anything noisy — add ignore patterns in the repo hive's **Sync Settings** tab. The **file blocklist** takes [micromatch](https://github.com/micromatch/micromatch) globs, the same style as `.gitignore`:

```text
dist/**
**/*.min.js
**/__fixtures__/**
**/*.snap
docs/generated/**
```

Excluding low-value files — build output, minified bundles, test fixtures, snapshots — keeps retrieval sharp. The fewer near-duplicate and machine-generated chunks in the index, the more often the _right_ code comes back first.

## Keeping it fresh

Once a repo hive exists, NeoHive keeps it in sync on a schedule you set in **Sync Settings**. Syncs are incremental, so they stay fast:

| Change since last sync | What happens |
|------------------------|--------------|
| New or modified file | Re-embedded and updated in the index |
| Deleted file | Removed from the index |
| Unchanged file | Left as-is, not re-processed |

You never have to trigger a sync by hand — but each repo hive also has a **Trigger Sync** button for when you want an update right now.

## Using indexed code

Once your code is indexed, your agent searches it alongside your stored knowledge. Ask questions like:

* Where do we handle webhook retries?
* Show me how the authentication middleware works.
* What does the billing module do when a payment fails?

NeoHive returns the relevant code snippets alongside any related conventions, decisions, or insights — your agent doesn't need to know whether the answer came from code or from memory.

## Advanced

### Choosing an embedding model

Repo hives are indexed with a **code-tuned embedding model** — one trained on source code, so it matches "how does the sync engine retry?" to the right function even when your exact words never appear in it. (Knowledge and document hives use a general-purpose text model instead.)

NeoHive sizes the model to your hardware: larger, higher-quality code models run best on a GPU backend, while CPU and Apple Silicon hosts use one tuned to stay fast without a GPU — see [GPU vs CPU](config/gpu.md). The trade-off is straightforward — a bigger model sharpens retrieval but needs more memory and more time to index — so the best fit is the strongest code model your hardware runs comfortably.

### Writing a good hive description

A hive's description isn't just a label. It's what your agent reads (through `list_hives`) to decide _which_ hive to search for a given question. A vague description leaves the agent guessing; a specific one routes the right questions to the right index.

Name the domains, services, and languages the repository covers:

> **Vague:** `repo hive`

> **Specific:** `Backend Python services for billing and payments — Stripe integration, webhook handlers, the retry/idempotency layer, and the nightly reconciliation jobs.`

With several hives connected — say a backend repo, a frontend repo, and a knowledge hive — good descriptions are what let your agent reach for the backend hive on a payments question and the frontend hive on a rendering one, without you telling it where to look.

## Privacy & security

Everything stays on the machine running NeoHive. Repositories are cloned and indexed locally, embeddings live in your project's local data directory, and repository credentials are encrypted at rest. Nothing is sent to an external service to be indexed.

## Troubleshooting

Sync stuck, a repository not appearing, or authentication failing? See [Repository Sync Issues](troubleshooting/sync.md). If your agent isn't finding code you'd expect, first check the file blocklist above — the file may be excluded — then see [Recall Isn't Finding What I Need](troubleshooting/recall.md).
