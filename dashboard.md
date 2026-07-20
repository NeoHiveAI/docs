---
description: "A tour of the NeoHive web dashboard: projects, hives, and the tools for managing them."
---

# The dashboard

The dashboard is the web app at `http://localhost:3577`, where you create projects, connect repositories and documents, and see what NeoHive has indexed. This page is a tour of what's there. For the mental model behind projects, hives, and memories, start with [Core Concepts](concepts.md).

## Projects overview

The home screen lists every project as a card, with totals across all of them along the top: how many memories you've stored, how many came in through your agent, and how many queries ran in the last 30 days. A trends toggle turns each total into a 30-day sparkline.

From here you can:

- **Pin** a project to keep it at the top.
- **Drag** cards to reorder them.
- **Copy a project's connect command** from its card menu.
- **Create a project** from the card at the end of the grid.

## Inside a project

Opening a project shows what NeoHive is doing for it: a band of headline numbers (memories, recent learnings, queries, and last activity), the hives connected to it, and the **Connect** panel with the MCP endpoint your agents point at.

If a project has been idle for a while, NeoHive suspends it to free resources. Opening it wakes it again automatically, with a short loading state while it resumes. See [Access & sharing](config/access.md) for how projects are reached over the network.

## Inside a hive

Each hive has its own page. Its stats sit at the top (memory count, file count, last sync, and recent growth), with its source type and embedding model shown as badges. Below that are tabs:

| Tab | What's there |
|-----|--------------|
| **Showcase** | A preview of the hive's most-used content, with syntax-highlighted code and rendered markdown. |
| **Files** | For document hives: the uploaded files, plus a drop zone to add more. See [Document hives](documents.md). |
| **Sync Settings** | For repo hives: the sync schedule, file filters, and sync history. See [Indexing Your Codebase](codebase.md). |
| **Hive Info** | The hive's name, description, and embedding-model picker. |

Changing a hive's embedding model from **Hive Info** re-indexes its contents, with live progress while it runs.

## Archiving and restoring

Deleting a project archives it instead of removing it straight away. Archived projects move to a separate section for 30 days, where you can restore them with their data intact. After 30 days they are purged. This way an accidental delete is recoverable.

## Moving a hive

You can move a hive from one project to another from its menu. The auto-created Knowledge hive stays with its project.

## Quick navigation

Press **Cmd+K** (Ctrl+K on Windows and Linux) to open the command palette, then type part of a project, repository, or setting name to jump straight to it.
