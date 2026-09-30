---
description: "Import the rules in your CLAUDE.md, AGENTS.md, and rules folders into NeoHive, where every agent on the Hive can recall them."
---

# Migrate from CLAUDE.md

Run one skill and the project rules in your context files become Memories every agent on the Hive can recall.

<figure><img src="../.gitbook/assets/context-migrate.svg" alt="A CLAUDE.md with sections on payments, testing, a database choice, and setup. Each rule becomes its own Memory with a type: always send an idempotency key becomes a directive, tests use Vitest becomes a convention, Postgres chosen for row-level locks becomes a decision. Setup steps and personal preferences are left out. Nothing is stored until you approve the preview, and your files are not changed."><figcaption></figcaption></figure>

A `CLAUDE.md` is loaded in full on every task, relevant or not. After migrating, your agent recalls only the rules that matter for the task in front of it.

## Run the migration

Open your agent in the root of the project, then start the skill.

{% tabs %}
{% tab title="Claude Code" %}
```text
/neohive:migrate-memory
```

It reads `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, the `.md` files in `.claude/rules/`, and any `CONVENTIONS*.md` or `CONTRIBUTING.md` under `docs/`.

It never imports `~/.claude/CLAUDE.md`, which holds your personal preferences.
{% endtab %}

{% tab title="Cursor and Codex" %}
Ask your agent to run the `migrate-memory` skill.

It reads `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, the `.md` and `.mdc` files in `.cursor/rules/`, `.codex/rules/`, and `.claude/rules/`, and any `CONVENTIONS*.md` or `CONTRIBUTING.md` under `docs/`.

It never imports `~/.codex/AGENTS.md`, `~/.claude/CLAUDE.md`, or `~/.cursor/rules/`, which hold your personal preferences.
{% endtab %}
{% endtabs %}

{% stepper %}
{% step %}
## It lists what it found

The list shows each project file it will read. Files in your home folder appear as skipped: the skill reads them for context only.
{% endstep %}

{% step %}
## It splits and classifies

Each rule or decision becomes its own Memory, with a type such as `directive`, `convention`, or `decision`. Setup steps, tables of contents, TODO lists, and personal preferences are left out. Entries that could be personal or team rules are marked ambiguous and skipped unless you re-classify them.
{% endstep %}

{% step %}
## You confirm

If the Hive has more than one Index, the skill asks which one to use. Pick **Knowledge**: `memory_store` always writes to the Hive's Knowledge Index, whichever Index you name.

A preview table then shows what it will store and what it skipped. Nothing is written until you approve. You can drop items, re-classify the ambiguous ones, or stop.
{% endstep %}

{% step %}
## It stores

Memories the Hive already holds are skipped. The rest go into the Hive's **Knowledge** Index, and a summary shows what was migrated.
{% endstep %}
{% endstepper %}

To approve each Memory one at a time, add `review=each`: `/neohive:migrate-memory review=each`.

Your original files are not changed. The skill skips the block between the `<!-- BEGIN neohive-managed v=N -->` and `<!-- END neohive-managed v=N -->` markers. The plugin writes that block, for example with `/neohive:generate-claude-md`, and it has to stay in the file.

## After migrating

Your agent recalls migrated rules like any other Memory, and a teammate on the same Hive gets them with no `CLAUDE.md` to copy. If a rule migrated wrong or goes stale, tell your agent and it retires the old Memory; see [Capture team knowledge](team-knowledge.md#correct-what-goes-stale).

{% hint style="info" %}
Long-form notes, such as an Obsidian vault, design docs, or runbooks, belong in a Files Index. See [Add documents and PDFs](documents.md).
{% endhint %}

## Next step

Your context is in. Continue to [A session, start to finish](../results/a-session.md) to see how your agent uses it.
