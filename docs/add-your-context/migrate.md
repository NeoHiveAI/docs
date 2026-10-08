---
description: >-
  Import the rules in your CLAUDE.md, AGENTS.md, and rules folders into NeoHive,
  where every agent on the Hive can recall them.
---

# Migrate from CLAUDE.md

Run one skill to turn the project rules in your context files, such as `CLAUDE.md`, into [Memories](../reference/glossary.md#memory) (stored pieces of team knowledge). Every agent connected to your [Hive](../reference/glossary.md#hive) can then recall those Memories.

<figure><img src="../.gitbook/assets/context-migrate.svg" alt="A CLAUDE.md with sections on payments, testing, a database choice, and setup. The skill turns each rule into its own Memory with a type. &#x27;Always send an idempotency key&#x27; becomes a directive. &#x27;Tests use Vitest&#x27; becomes a convention. &#x27;Postgres chosen for row-level locks&#x27; becomes a decision. The skill leaves out setup steps and personal preferences. The skill stores nothing until you approve the preview, and it does not change your files."><figcaption></figcaption></figure>

Your agent loads all of `CLAUDE.md` on every task, even the parts that do not apply. After you migrate, your agent recalls only the rules that matter for the current task.

## Run the migration

To start the migration, do the following:

1. Open your agent in the root folder of the project.
2. Run the skill, as shown for your agent in the following tabs.

{% tabs %}
{% tab title="Claude Code" %}
```
/neohive:migrate-memory
```

The skill reads the following files:

* `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md`
* The `.md` files in `.claude/rules/`
* Any `CONVENTIONS*.md` or `CONTRIBUTING.md` under `docs/`

The skill never imports `~/.claude/CLAUDE.md`, which holds your personal preferences.
{% endtab %}

{% tab title="Cursor and Codex" %}
Ask your agent to run the `migrate-memory` skill.

The skill reads the following files:

* `CLAUDE.md`, `AGENTS.md`, and `GEMINI.md`
* The `.md` and `.mdc` files in `.cursor/rules/`, `.codex/rules/`, and `.claude/rules/`
* Any `CONVENTIONS*.md` or `CONTRIBUTING.md` under `docs/`

The skill never imports `~/.codex/AGENTS.md`, `~/.claude/CLAUDE.md`, or `~/.cursor/rules/`, which hold your personal preferences.
{% endtab %}
{% endtabs %}

{% stepper %}
{% step %}
## The skill lists the files

The list shows each project file that the skill reads. Files in your home folder appear as skipped, because the skill reads them for context only.
{% endstep %}

{% step %}
## The skill splits and classifies

The skill turns each rule or decision into its own Memory and gives each Memory a type, such as `directive`, `convention`, or `decision`. The skill leaves out setup steps, tables of contents, TODO lists, and personal preferences. If an entry could be either a personal rule or a team rule, the skill marks it as ambiguous. The skill skips ambiguous entries unless you re-classify them.
{% endstep %}

{% step %}
## You confirm

If the Hive has more than one [Index](../reference/glossary.md#index), the skill asks which Index to use. Select **Knowledge**. The `memory_store` tool always writes to the Hive's [Knowledge Index](../reference/glossary.md#knowledge-index), whichever Index you name.

The skill then shows a preview table of what it plans to store and what it skipped. The skill writes nothing until you approve. You can remove items, re-classify the ambiguous ones, or stop the migration.
{% endstep %}

{% step %}
## The skill stores the Memories

The skill skips any Memory that the Hive already holds. The skill stores the rest in the Hive's Knowledge Index, and then shows a summary of what it migrated.
{% endstep %}
{% endstepper %}

To approve each Memory one at a time, add `review=each` to the command: `/neohive:migrate-memory review=each`.

The skill does not change your original files. The skill also skips the block between the `<!-- BEGIN neohive-managed v=N -->` and `<!-- END neohive-managed v=N -->` markers. The NeoHive plugin writes that block, for example when you run `/neohive:generate-claude-md`. The block must stay in the file.

## After migrating

Your agent recalls migrated rules like any other Memory. A teammate on the same Hive gets the same rules without copying your `CLAUDE.md`. If a rule migrated incorrectly or becomes out of date, tell your agent. Your agent then retires the old Memory. For details, see [Capture team knowledge](team-knowledge.md#correct-what-goes-stale).

{% hint style="info" %}
Long-form notes, such as an Obsidian vault, design docs, or runbooks, belong in a [Files Index](../reference/glossary.md#files-index). See [Add documents and PDFs](documents.md).
{% endhint %}

## Next step

Your rules are now in NeoHive. Continue to [A session, start to finish](../get-better-results/a-session.md) to see how your agent uses those rules.
