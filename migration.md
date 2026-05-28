# Migrating from CLAUDE.md

If you've been using `CLAUDE.md`, `AGENTS.md`, or `.cursor/rules` to give your agent project context, you can import that knowledge into NeoHive. This makes it semantically searchable and keeps it up to date alongside everything else your agent learns.

## Why migrate

Static context files work, but they have limits:

- **They're always loaded in full.** As they grow, they consume more of your agent's context window whether the content is relevant or not.
- **They're not searchable by meaning.** Your agent reads them top to bottom — it can't selectively recall the one convention that matters for the current task.
- **They don't update themselves.** When your team's practices change, someone has to remember to edit the file.

NeoHive stores the same knowledge but retrieves it selectively. Only the context relevant to what you're working on right now gets loaded.

## How to migrate

Run the migration command in your agent:

```
/neohive:migrate-memory
```

The migration scans your local context files — `CLAUDE.md`, `AGENTS.md`, `.cursor/rules`, and anything in `.claude/rules` — and imports each entry into NeoHive. It classifies each piece as a directive, convention, decision, or other appropriate type.

The original files are not modified or deleted. You can keep them around as a reference or remove them once you're satisfied with the migration.

## After migrating

You don't need to change how you work. Your agent will recall the migrated knowledge from NeoHive the same way it recalls anything else — automatically, when it's relevant.

If you notice something that was migrated incorrectly or is outdated, just tell your agent:

> "That convention about using semicolons is outdated — we switched to no-semicolons last month."

Your agent will update or replace it in NeoHive.

## What about new team members?

When a new person joins and connects their agent to the same NeoHive project, they get the full benefit of everything that's been stored — including knowledge you migrated from your context files. They don't need to set up their own `CLAUDE.md`.
