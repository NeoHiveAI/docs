# Topic owners for the NeoHive docs

**Scope:** which page of the public docs (`docs/`) holds the full explanation of each topic. Use this file before you explain anything on a page. It does not cover the NeoHive app's own text or this `internal/` folder.

**Provenance:** built on 2026-10-08 from each page's `description:` frontmatter and from an audit for duplicated explanations. A second, topic-level audit on the same date found duplicates explained in different words, and the rows below reflect its fixes.

## How to use this file (Must Follow)

- **Look up the topic before you explain it.** If a page owns the topic, write a one or two sentence summary and link to the owner page. Two full explanations drift apart as each is edited, and the reader cannot tell which is right. The audit found exactly this: one sync error had a different cause on each of two pages.
- **Change the explanation on the owner page only.** A summary page states the short version and links on. If a summary no longer matches the owner page, fix the summary, never the other way round.
- **Add a row when you create a page that owns a new topic.** Also add a row when you split a topic out of a page. A topic with no row has no owner, so the next writer explains it again somewhere else.
- **Update the row when you move or rename a page.** A row that names a missing page sends the writer to search, and the search usually ends in a second explanation.
- **Check the map before you open a pull request.** Every page in `docs/SUMMARY.md` owns at least one row, no row names a missing page, and every summary page links to its owner page. An out-of-date map lets the next writer explain a topic a second time.

## Owners (Quick Reference)

| Topic | Owner page | Pages that summarize it and link to the owner |
| --- | --- | --- |
| What NeoHive is and who it is for | `get-started/what-is-neohive.md` | `README.md` |
| The Welcome page overview and entry points | `README.md` | |
| How the agent, plugin, and container fit together | `concepts/how-it-works.md` | `get-started/what-is-neohive.md` |
| Hives, Indexes, Memories, and the kinds of Index | `concepts/hives-indexes-memories.md` | `get-started/what-is-neohive.md` |
| Shared Index: what it is and who can do what | `concepts/hives-indexes-memories.md` | `admin/manage.md`, `context/what-to-add.md` |
| How recall finds and ranks results | `concepts/retrieval.md` | `results/prompting.md` |
| Tool parameters, types, and defaults | `reference/mcp-tools.md` | `concepts/retrieval.md`, `results/prompting.md` |
| Memory types | `reference/memory-types.md` | `concepts/hives-indexes-memories.md` |
| The importance scale of a Memory | `reference/memory-types.md` | `concepts/hives-indexes-memories.md` |
| Plugin hooks and what runs automatically | `results/plugin-automation.md` | `concepts/how-it-works.md`, `get-started/connect/claude-code.md`, `results/prompting.md` |
| Smart prompts: requirements and how the hook runs | `results/plugin-automation.md` | `reference/slash-commands.md` |
| Connecting any agent, and the MCP endpoint every agent uses | `get-started/connect/README.md` | `get-started/what-is-neohive.md` |
| Rules to paste into an agent so it uses NeoHive | `get-started/connect/README.md` | `results/prompting.md` |
| Connecting Claude Code, including the server scope the hooks need | `get-started/connect/claude-code.md` | `get-started/install.md`, `results/plugin-automation.md` |
| Connecting Cursor | `get-started/connect/cursor.md` | |
| Connecting Codex | `get-started/connect/codex.md` | |
| Connecting Claude Desktop and other MCP apps | `get-started/connect/desktop-apps.md` | |
| Slash commands | `reference/slash-commands.md` | `results/plugin-automation.md` |
| Which Index to use for each kind of content, and how many Hives | `context/what-to-add.md` | |
| Connecting a repository and creating its Index | `context/repositories/connect.md` | `context/repositories/README.md` |
| Adding a code repository: overview of the steps | `context/repositories/README.md` | |
| Managing GitHub and GitLab connections: states, checking, replacing, and removing | `admin/data-sources.md` | `context/repositories/connect.md`, `security/credentials.md` |
| How tokens are stored and protected | `security/credentials.md` | `admin/data-sources.md` |
| Allowlist and Blocklist: when and where to set them | `context/repositories/file-patterns.md` | |
| Glob pattern syntax, and how the Allowlist and Blocklist combine | `reference/file-patterns.md` | `context/repositories/file-patterns.md` |
| Sync schedule, on-demand sync, and sync history | `context/repositories/sync.md` | `reference/webhooks.md`, `troubleshooting/sync.md` |
| Webhook refresh from a CI pipeline, and how it differs from a sync | `reference/webhooks.md` | `context/repositories/sync.md`, `reference/file-patterns.md` |
| Supported file types and size limits | `reference/file-types.md` | `context/documents.md`, `get-started/install.md` |
| Folders and files NeoHive always skips | `reference/file-types.md` | `results/common-mistakes.md` |
| Uploading documents to a Files Index | `context/documents.md` | |
| How the Knowledge Index captures team knowledge | `context/team-knowledge.md` | |
| Ways teams use one shared Hive | `results/team-workflows.md` | `get-started/what-is-neohive.md` |
| What to say to teach your agent, and retiring an out-of-date Memory | `results/teach.md` | `results/habits.md`, `context/team-knowledge.md` |
| Importing `CLAUDE.md` and `AGENTS.md` | `context/migrate.md` | `results/teach.md`, `results/team-workflows.md` |
| Stages of a working session | `results/a-session.md` | |
| A first guided session | `get-started/first-session.md` | |
| Questions to ask your agent directly | `results/ask-directly.md` | |
| Everyday habits that improve recall | `results/habits.md` | |
| Phrasing queries | `results/prompting.md` | `concepts/retrieval.md` |
| Setups that raise no error but make recall worse | `results/common-mistakes.md` | |
| Installing NeoHive and installer options | `get-started/install.md` | `get-started/quickstart.md` |
| The shortest path from install to a first answer | `get-started/quickstart.md` | |
| GPU and CPU backends | `admin/gpu-cpu.md` | `get-started/install.md` |
| Environment variables | `reference/environment-variables.md` | `admin/updating.md`, `admin/gpu-cpu.md`, `context/documents.md` |
| Getting a license, license lookup, and the offline grace period | `admin/licensing.md` | `admin/updating.md`, `security/local-only.md`, `get-started/install.md` |
| Backups and restore | `admin/backups.md` | `admin/updating.md` |
| Updating NeoHive | `admin/updating.md` | |
| Archiving, deleting, moving, and sharing Hives and Indexes: the steps | `admin/manage.md` | `concepts/hives-indexes-memories.md` |
| Dashboard screens | `admin/dashboard.md` | |
| Testing queries in the Playground | `admin/playground.md` | |
| Uninstalling NeoHive | `admin/uninstall.md` | |
| Running one instance for a team | `admin/access.md` | `results/team-workflows.md` |
| Network exposure and authenticating proxies | `security/network.md` | `admin/access.md` |
| Outbound connections and what stays local | `security/local-only.md` | `README.md`, `get-started/what-is-neohive.md`, `concepts/how-it-works.md` |
| `/health` statuses | `troubleshooting/connection.md` | `troubleshooting/common-errors.md` |
| Sync errors shown on an Index's page | `troubleshooting/sync.md` | `troubleshooting/common-errors.md` |
| Recall that comes back empty or misses content | `troubleshooting/recall.md` | |
| Error messages with no dedicated page | `troubleshooting/common-errors.md` | |
| Definitions of terms | `concepts/glossary.md` | every page, through first-mention links |

## Allowed repetition (don't "fix" without checking)

- **The connect pages for each agent repeat a few steps,** such as checking the connection with `list_indexes`. Each page is a complete task for a reader who only opens the page for their own agent, so merging the shared steps would send that reader to a second page in the middle of a task.
- **`get-started/install.md` repeats the Claude Code connection steps** from `get-started/connect/claude-code.md`. The install page is one complete task that ends with a connected agent, so sending the reader away in its last step would break the task.
- **One-line definitions next to a glossary link,** such as "a Hive is the workspace your agent connects to". These are summaries, which is what this file asks for, not second explanations.
- **Error tables that link to the same page from several rows.** Each row is looked up on its own, and Google's cross-references guidance allows a repeated link on a long page when the links are far apart.
