---
description: "NeoHive's slash commands, MCP tools, memory types, and environment variables."
---

# Reference

## Slash commands

Available in your agent after installing the NeoHive plugin. Run them directly in your agent session.

| Command | What it does |
|---------|-------------|
| `/neohive:getting-started` | First-time setup wizard. Verifies the MCP connection, creates a project, and optionally migrates existing context files. Run once per machine. |
| `/neohive:load-context` | Pre-loads relevant context for your current task. Run at the start of a session, or when switching tasks mid-session. |
| `/neohive:capture-session-learnings` | Scans the current conversation and stores corrections, conventions, decisions, and insights. Also runs at session end via the plugin hook. |
| `/neohive:migrate-memory` | Imports knowledge from `CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, and `.claude/rules`. See [Migrating away from Markdown](migration.md). |
| `/neohive:generate-claude-md` | Generates a NeoHive topology block in your project's `CLAUDE.md`. Re-run when hives are added or renamed. |
| `/neohive:design-codebase-docs` | Guides you through defining a documentation standard for your codebase, saves it to NeoHive, and generates sample pages to validate it. |
| `/neohive:enable-smart-prompts` | Installs a hook that rewrites your prompts with a small model before searching NeoHive, improving recall relevance. |

{% hint style="info" %}
The `/neohive:` prefix is Claude Code's syntax. In Codex and Cursor you invoke the same skills by name (for example, run the `load-context` skill) without the prefix. The topology command also differs by agent: Claude Code writes `CLAUDE.md` with `generate-claude-md`, Codex writes `AGENTS.md` with `generate-agents-md`, and Cursor writes a project rule with `generate-cursor-rules`.
{% endhint %}

## MCP tools

The plugin's rules and hooks call these tools under the hood, and any MCP-capable agent can use them directly.

| Tool | What it does |
|------|-------------|
| `memory_recall` | Semantic search across the project's hives. Returns the most relevant code and knowledge. |
| `memory_context` | Loads directives, conventions, and task-relevant knowledge at the start of a session or task. |
| `memory_store` | Saves a new memory (a convention, decision, insight, or correction) to the project's Knowledge hive. |
| `memory_forget` | Retires an outdated memory, optionally pointing to the one that replaces it. |
| `memory_stats` | Reports counts and statistics for the project's stored memories. |
| `list_hives` | Lists the hives available in the current project. |

### Parameters

The read tools (`memory_recall`, `memory_context`, `memory_stats`) take an optional `hive` to target a single hive. Omit it to search or aggregate across every hive in the project. The write tools always target the project's Knowledge hive, so they take no `hive` argument.

**`memory_recall`**

| Parameter | Type | Default | Notes |
|-----------|------|---------|-------|
| `query` | string | - | A single search query. Use this or `queries`. |
| `queries` | string list | - | One to five phrasings of the same need. Results are fused for broader recall. |
| `limit` | integer | `10` | Maximum results to return, from 1 to 50. |
| `types` | string list | all | Restrict results to specific [memory types](#memory-types). |
| `hive` | string | all hives | Search one hive instead of every hive. |

**`memory_context`**

| Parameter | Type | Default | Notes |
|-----------|------|---------|-------|
| `task` | string | required | A short description of what you are about to work on. |
| `hive` | string | all hives | Load context from one hive instead of every hive. |

**`memory_store`**

| Parameter | Type | Default | Notes |
|-----------|------|---------|-------|
| `content` | string | required | The knowledge to store, written so it stands on its own. |
| `type` | string | required | One of the [memory types](#memory-types). |
| `importance` | integer | `5` | 1 (trivial) to 10 (critical). Higher values surface more readily in recall. |
| `tags` | string list | none | Optional labels to help later searches find this memory. |
| `format` | string | `auto` | Chunking hint for longer content: `auto`, `markdown`, `code`, `DSL`, or `text`. |

**`memory_forget`**

| Parameter | Type | Default | Notes |
|-----------|------|---------|-------|
| `memory_id` | integer | required | The id of the memory to retire. |
| `reason` | string | none | Why it is being retired. |
| `superseded_by` | integer | none | The id of the memory that replaces it. |

`memory_stats` takes only the optional `hive`. `list_hives` takes no arguments and returns each hive's id, name, type, status, embedding model, and description.

## Memory types

Every memory has a type. Your agent classifies most of them for you, so you rarely set this by hand. These five cover almost everything you store day to day:

| Type | Use it for |
|------|-----------|
| `directive` | A rule the team must follow. |
| `convention` | A preferred practice or style. |
| `decision` | A choice you made, with the reasoning behind it. |
| `insight` | A non-obvious discovery or gotcha. |
| `error_pattern` | A bug or pitfall, and how to avoid it. |

NeoHive recognizes several more, used mostly by automatic capture and code indexing: `narrative`, `session_summary`, `consolidated`, `syntax_rule`, `semantic_rule`, `stdlib_reference`, `example_pattern`, and `idiom`.

Each memory also carries an **importance** from 1 (trivial) to 10 (critical), defaulting to 5. Importance influences how readily a memory comes back in recall.

## Environment variables

### Server

Set these before running the installer. They configure the NeoHive container itself.

| Variable | Purpose |
|----------|---------|
| `NEOHIVE_LICENSE_FILE` | Path to your license file, used during install. See [Licensing](config/licensing.md). |
| `NEOHIVE_ROTATE_LICENSE` | Set to `1` to rotate to a replacement license during install. |
| `NEOHIVE_BACKEND` | Force a compute backend: `cpu`, `cuda`, `vulkan`, or `rocm`. See [GPU vs CPU](config/gpu.md). |
| `NEOHIVE_PORT` | Change the port NeoHive binds to (default `3577`). |
| `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS` | Per-document PDF processing timeout (default 5 minutes). Raise it for very large PDFs. See [Repository Sync Issues](troubleshooting/sync.md). |
| `NEOHIVE_PDF_WARMUP_TIMEOUT_MS` | Timeout for the one-time PDF model warm-up on first use (default 5 minutes). Raise it if the first PDF upload times out. |
| `NEOHIVE_CHUNKER_TIMEOUT_MS` | Timeout for splitting a single file during indexing (default 30 seconds). |

### Agent-side

Set these in the environment where your coding agent runs. They tune how the plugin behaves.

| Variable | Purpose |
|----------|---------|
| `NEOHIVE_TOKEN` | Bearer token your agent sends when your NeoHive deployment sits behind an authenticating proxy you run (for example a reverse proxy or VPN gateway). A standard local install needs no token. |
| `NEOHIVE_MCP_HINTS` | Set to `0` to suppress the hint appended to recall and context responses. |
| `NEOHIVE_HOOK_DISABLED` | Set to `1` to turn off the automatic context injection that runs on each prompt (Claude Code). |
| `NEOHIVE_PRETOOL_STRICT` | Set to `1` to block file searches in indexed projects until memory has been checked first (Claude Code). |
| `NEOHIVE_PRETOOL_DISABLED` | Set to `1` to turn off the pre-search reminder entirely (Claude Code). |
| `NEOHIVE_SMART_DISABLED` | Set to `1` to turn off the smart-prompt rewriter, if you enabled it with `enable-smart-prompts`. |

<figure><img src="https://github.com/NeoHiveAI/docs/releases/download/docs-media/proxytest.gif" alt="gif proxy test"><figcaption></figcaption></figure>
