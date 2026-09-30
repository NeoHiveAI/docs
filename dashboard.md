---
description: "A tour of the NeoHive web dashboard: hives, indexes, and the tools for managing them."
---

# The dashboard

The dashboard is the web app at `http://localhost:3577`, where you create hives, connect repositories and documents, and see what NeoHive has indexed. This page is a tour of what's there. For the mental model behind hives, indexes, and memories, start with [Core Concepts](concepts.md).

## Hives overview

The home screen lists every hive as a card, with totals across all of them along the top: how many memories you've stored, how many came in through your agent, and how many queries ran in the last 30 days. A trends toggle turns each total into a 30-day sparkline.

From here you can:

- **Pin** a hive to keep it at the top.
- **Drag** cards to reorder them.
- **Copy a hive's connect command** from its card menu.
- **Create a hive** from the card at the end of the grid.

## Inside a hive

Opening a hive shows what NeoHive is doing for it: a band of headline numbers (memories, recent learnings, queries, and last activity), the indexes connected to it, and the **Connect** panel with the MCP endpoint your agents point at.

If a hive has been idle for a while, NeoHive suspends it to free resources. Opening it wakes it again automatically, with a short loading state while it resumes. See [Access & sharing](config/access.md) for how hives are reached over the network.

## Inside an index

Each index has its own page. Its stats sit at the top (memory count, file count, last sync, and recent growth), with its source type and embedding model shown as badges. Below that are tabs:

| Tab | What's there |
|-----|--------------|
| **Showcase** | A preview of the index's most-used content, with syntax-highlighted code and rendered markdown. |
| **Files** | For documentation indexes: the uploaded files, plus a drop zone to add more. See [Documentation indexes](documents.md). |
| **Sync Settings** | For repository indexes: the sync schedule, file filters, and sync history. See [Indexing Your Codebase](codebase.md). |
| **Index Info** | The index's name, description, and embedding-model picker. |

Changing an index's embedding model from **Index Info** re-indexes its contents, with live progress while it runs.

## Archiving and restoring

Deleting a hive archives it instead of removing it straight away. Archived hives move to a separate section for 30 days, where you can restore them with their data intact. After 30 days they are purged. This way an accidental delete is recoverable.

## Moving an index

You can move an index from one hive to another from its menu. The auto-created Knowledge index stays with its hive.

## Quick navigation

Press **Cmd+K** (Ctrl+K on Windows and Linux) to open the command palette, then type part of a hive, repository, or setting name to jump straight to it.
