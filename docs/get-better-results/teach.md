---
description: >-
  How to correct your agent and tell it what to remember, so the knowledge comes
  back in later sessions.
---

# Teach your agent as you work

Your agent does not remember what you told it in an earlier session. Without NeoHive, you explain the same things again and correct the same mistakes.

With NeoHive, you tell your agent something once, in plain words. Your agent stores what you said as a [Memory](../reference/glossary.md#memory) (a stored piece of knowledge). The Memory goes into your [Hive](../reference/glossary.md#hive), your team's NeoHive workspace. Everyone who uses the Hive then gets the Memory in later sessions, whichever tool they use.

This page shows what to say to your agent, and how to word a lesson so recall finds it later. The page also shows how to update a fact that changes.

<figure><img src="../.gitbook/assets/results-teach.svg" alt="Today you give a correction, such as no, we validate tokens in the gateway. memory_store saves the correction as one Memory in the Knowledge Index. Later, a teammate asks to add auth checks to the orders service. Recall returns that Memory, and their agent validates tokens in the gateway."><figcaption></figcaption></figure>

| When this happens                         | Say something like                                                                             | Your agent                                                           |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Your agent gets something wrong           | `No, we validate tokens in the gateway, not in each service.`                                  | Stores the correction with `memory_store`                            |
| You make a decision                       | `Remember that we use Redis for sessions because they are short-lived and need no durability.` | Stores the decision, with the reason                                 |
| You find a problem your team should avoid | `Store this: the staging database rejects connections without TLS.`                            | Stores the problem as an insight                                     |
| A fact is out of date                     | `That's out of date. We moved sessions off Redis last month. Update it.`                       | Stores the new fact and deactivates the old one with `memory_forget` |

## Say it when it happens

Correct your agent while the reason is still in the conversation. The reason is what makes the Memory useful later. Before you close a session, `/neohive:capture-session-learnings` finds what you missed. It stores at most five Memories per run.

## Name the system, the rule, and the reason

Recall finds a Memory by the words and meaning in it. A specific correction creates a specific Memory.

| Vague (hard to recall)      | Specific (recalled reliably)                                                                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `We fixed the bug.`         | `Retry calls to the billing API with exponential backoff from 500ms, at most 3 attempts. The provider returns 429 with no Retry-After header.` |
| `Don't use the old client.` | `Use the v2 HTTP client in lib/http for all outbound calls. The v1 client has no request timeout and hangs workers.`                           |

## Say "out of date" when a fact changes

If you state only the new fact, both versions stay active. Your agent might then use either version. When you say "that's out of date", your agent deactivates the old Memory, so recall stops returning it. A deactivated Memory is switched off, not deleted.

## Where Memories go

Everything your agent stores goes into your own Hive's **Knowledge** [Index](../reference/glossary.md#knowledge-index). Your agents can recall a new Memory immediately. Your agent never stores anything in a [Shared Index](../reference/glossary.md#shared-index). A Shared Index belongs to another Hive, and your agents can only read from it.

To see stored Memories, do the following:

1. In the dashboard, open your Hive.
2. Select the **Recent learnings** tab.

The **Recent learnings** tab lists what agents stored in the last 7 days.

To import rules your team already keeps in `CLAUDE.md` or `AGENTS.md`, see [Migrate from CLAUDE.md](../add-your-context/migrate.md).

## Next step

Continue to [Ask for context directly](ask-directly.md).
