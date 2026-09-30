---
description: "How the Knowledge Index captures your team's conventions, decisions, and corrections, and shares them with every agent on the Hive."
---

# Capture team knowledge

Every Hive has a **Knowledge** Index. What one person's agent stores there, every agent connected to the Hive can recall.

<figure><img src="../.gitbook/assets/context-team-knowledge.svg" alt="On Monday Ana corrects her agent: no, we use Redis for sessions. Her agent calls memory_store and the decision lands in the Hive's Knowledge Index. On Tuesday Ben's agent recalls it while he edits the login code, and a teammate who joins next month recalls it on day one. A different Hive has its own Knowledge Index and never sees this memory."><figcaption></figcaption></figure>

The **Knowledge** Index holds what your team has learned: conventions, decisions and their reasons, gotchas, and corrections. It is created with the Hive and listed under **Indexes** on the Hive page, highlighted in violet. Your agents write to it, so you have nothing to set up. Its settings cannot be changed, and it cannot be shared with or moved to another Hive.

## How knowledge gets in

| Way in | What happens |
|---|---|
| You ask | Say `Remember that the payments API requires idempotency keys on all POST requests.` Your agent calls `memory_store`. |
| Your agent notices | When you correct it or settle a convention, it stores the point on its own. |
| End of session | Run `/neohive:capture-session-learnings` in Claude Code, or the `capture-session-learnings` skill in Cursor or Codex. It stores up to five learnings from the conversation. |
| Existing rules files | Import `CLAUDE.md`, `AGENTS.md`, and rules folders once. See [Migrate from CLAUDE.md](migrate.md). |

`memory_store` always writes to the **Knowledge** Index of the Hive your agent is connected to. Your agent gives each Memory a type, such as `directive`, `convention`, or `decision`. [Memory types](../reference/memory-types.md) lists them all.

## Who sees it

Everyone who connects an agent to the same Hive shares one **Knowledge** Index. A teammate who joins later starts with everything the team has stored. Agents on a different Hive never see it, even when the two Hives share a **Shared Index**.

That is why [What to add, and where](what-to-add.md) suggests one Hive per product. Who can reach a Hive is set in [Access and sharing](../admin/access.md).

The Hive page lists **Recent learnings**, so you can see what your team's agents stored lately. Click **Knowledge** under **Indexes** to open it.

## Correct what goes stale

Tell your agent when a Memory is out of date: `That convention about semicolons is out of date. We switched to no semicolons last month.` It stores the correction and retires the old Memory with `memory_forget`. A retired Memory is kept but no longer comes back in results.

Write Memories that make sense to someone with no context: name the service, the rule, and the reason. [Teach your agent as you work](../results/teach.md) has more on phrasing.

## Next step

Already have rules in `CLAUDE.md` or `AGENTS.md`? Continue to [Migrate from CLAUDE.md](migrate.md).
