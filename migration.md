---
description: "Import your CLAUDE.md, AGENTS.md, and rules files into NeoHive — searchable, shared, and always current."
---

# Migrating away from Markdown

If you've been giving your agent context through markdown files — `CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, and the like — you can import all of it into NeoHive. Once it's in, that knowledge becomes searchable by meaning, shared across your team, and it stays current alongside everything else your agent learns.

## Why migrate

Static context files work, but they hit limits as they grow:

- **They're always loaded in full.** The bigger they get, the more of your agent's context window they eat — relevant or not.
- **They're not searchable by meaning.** Your agent reads them top to bottom; it can't pull just the one convention that matters right now.
- **They don't update themselves.** When practices change, someone has to remember to edit the file.

NeoHive stores the same knowledge but retrieves it selectively — only what's relevant to the task in front of you.

## How to migrate

Run the migration skill in your agent:

```
/neohive:migrate-memory
```

1. **It scans your local context files** — `CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, `.codex/rules`, and anything in `.claude/rules`.

2. **It classifies each entry** into a memory type — `directive`, `convention`, `decision`, `insight`, and so on — so NeoHive can weigh and surface it appropriately.

3. **It stores them in your project's knowledge hive**, where every agent on the project can retrieve them.

Your original files are never modified or deleted — keep them as a reference, or remove them once you're happy with the migration.

### Before and after

A line in your `CLAUDE.md`:

> Always use idempotency keys on payment POST requests.

becomes a stored `directive` in NeoHive — one that surfaces automatically the next time anyone touches the payments code, without loading the whole file.

## After migrating

Nothing changes about how you work. Your agent pulls the migrated knowledge the same way it pulls anything else — when it's relevant.

If something migrated wrong or goes stale, just tell your agent:

* That convention about semicolons is out of date — we switched to no-semicolons last month.

It'll update or replace it in NeoHive.

{% hint style="info" %}
Migrating markdown _notes_ — an Obsidian vault, design docs, runbooks — works a little differently: those go into a **document hive** rather than through the migration skill. Upload them through the dashboard (a dedicated guide is on the way).
{% endhint %}

## What about new team members?

When someone new joins and connects their agent to the same project, they inherit everything that's been stored — including the knowledge you migrated. No per-person `CLAUDE.md` setup required.
