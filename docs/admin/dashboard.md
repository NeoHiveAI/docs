---
description: "A map of the NeoHive dashboard: its main screens, how you move between them, and what each one shows."
---

# Dashboard tour

Where each screen of the dashboard lives and what you do there.

The dashboard runs at `http://localhost:3577`.

<figure><img src="../.gitbook/assets/admin-dashboard.svg" alt="Dashboard map. The Hives home screen at / leads to a Hive page at /hives/hive-id by clicking a card, and on to an Index page by clicking an Index row. New Hive opens Create Hive at /hives/new. Try in Playground on a Hive page opens /playground. Data Sources at /sources and Settings at /settings and /settings/license sit at the bottom of the sidebar."><figcaption></figcaption></figure>

Two screens appear only while you set up: **Welcome** at `/welcome`, shown until your first Hive exists, and the setup wizard at `/setup`. Rerun the wizard from **Settings** with **Run setup wizard**.

## The home screen

**Hives** shows every Hive as a card, with **Total Memories**, **Added via MCP** and **Queries (30d)** along the top. Switch on **Trends** to add a 30-day line under each total.

- **Pin** up to two Hives to keep them in a **Pinned** row at the top.
- **Drag** the other cards to reorder them.
- **Open a card's menu** for **Edit**, **Pin**, **Copy MCP command**, **Stop**, **Start** or **Restart**, **Archive** and **Delete**.

## The Hive page

**Install Instructions** at the top gives ready-made commands for Claude Code, Claude Desktop, Codex and Cursor. It collapses once an agent connects; **Reinstall** opens it again.

| Section | What it shows |
|---|---|
| **AT A GLANCE** | **Memories**, **Learnings 7d**, **Queries 7d**, **Last activity** |
| Activity | **Recent learnings**, **Recent queries**, **All activity** |
| **Indexes** | Every Index in the Hive, including **Shared Indexes** from other Hives. **+** adds one; each row's menu holds its actions |
| **Tool usage** | Requests per kind of agent, such as Claude Code or Cursor |
| **Sync Queue** | Syncs running or waiting |

A red **An Index stopped syncing** banner at the top names any Index whose sync failed, with the reason.

## The Index page

The top shows **Memories**, **Files**, **Last sync** and **On disk**. A GitHub or GitLab Index also has **Trigger sync**.

| Tab | Shown for | What's there |
|---|---|---|
| **Showcase** | Every Index | A preview of what the Index holds |
| **Files** | Files Indexes | Uploaded files and a drop zone for more |
| **Sync Settings** | Code and Documentation Indexes | **Sync history**, then connection, branch, **Sync interval**, file filters, and **Pause syncing** |
| **Index Info** | Every Index | Name, description, embedding model, **Share Index…**, **Move Index…**, **Danger zone** |

A new embedding model, the program that turns text into numbers for search, re-embeds every Memory in the background. A banner shows progress while it runs.

## The Settings screen

| Card | What you do there |
|---|---|
| **Default Index Type** | Pick **Knowledge Base** or **Code Repository** as the default for new Indexes. You can still choose per Index |
| **Server Status** | See whether your browser can reach the server. **Retry** checks again |
| **Setup Wizard** | **Run setup wizard** walks through setup again. Nothing is reset or deleted |
| **Licence Key** | **Manage licence** opens your license status. See [Licensing](licensing.md) |
| **Design Partner Licence Agreement** | **View licence** shows the agreement you accepted on first run |
| **Anonymous Telemetry** | Switch off sharing of anonymised performance data. Your prompts, code, and Memories are never sent |

## Keyboard shortcuts

| Keys | Action |
|---|---|
| `Cmd+K` or `Ctrl+K`, or `/` | Search palette: jump to a Hive, a connection, **Data Sources** or **Settings** |
| `G` then `D` | Home screen |
| `G` then `S` | **Settings** |
| `Cmd+B` or `Ctrl+B` | Show or hide the sidebar |
| `?` | All shortcuts |

## Next step

Continue to [Manage Hives and Indexes](manage.md) to archive, move, share, or delete them.
