---
description: "How to correct your agent and tell it what to remember, so the knowledge comes back in later sessions."
---

# Teach your agent as you work

Say it once, in plain words, and your agent stores it for everyone on the Hive.

<figure><img src="../.gitbook/assets/results-teach.svg" alt="A correction you give today, such as no, we validate tokens in the gateway, is stored with memory_store as one Memory in the Knowledge Index. Later, when a teammate asks to add auth checks to the orders service, recall returns it and their agent validates in the gateway."><figcaption></figcaption></figure>

| When this happens | Say something like | Your agent |
|---|---|---|
| It gets something wrong | `No, we validate tokens in the gateway, not in each service.` | Stores the correction with `memory_store` |
| You settle a decision | `Remember that we use Redis for sessions because they are short-lived and need no durability.` | Stores it as a decision, with the reason |
| You hit a gotcha | `Store this: the staging database rejects connections without TLS.` | Stores it as an insight |
| A fact is out of date | `That's out of date. We moved sessions off Redis last month. Update it.` | Stores the new fact and retires the old one with `memory_forget` |

## Say it when it happens

Correct your agent while the reason is still in the conversation, because the reason is what makes the Memory useful later. `/neohive:capture-session-learnings` catches what you missed, but it stores at most five Memories per run.

## Name the system, the rule and the reason

Recall finds a Memory by the words in it. A specific correction gives a specific Memory.

| Hard to find | Easy to find |
|---|---|
| `We fixed the bug.` | `Retry calls to the billing API with exponential backoff from 500ms, at most 3 attempts. The provider returns 429 with no Retry-After header.` |
| `Don't use the old client.` | `Use the v2 HTTP client in lib/http for all outbound calls. The v1 client has no request timeout and hangs workers.` |

## Say "out of date" when a fact changes

If you only state the new fact, both versions stay active and your agent may use either. Saying "that's out of date" makes your agent retire the old Memory, so recall stops returning it. A retired Memory is switched off, not deleted.

## Where it goes

Everything your agent stores goes into your own Hive's **Knowledge** Index and can be recalled straight away. It never goes into a Shared Index, because a Shared Index belongs to another Hive and is read-only from yours.

To see what was stored, open the Hive in the dashboard and click the **Recent learnings** tab. It lists what agents stored in the last 7 days. To import rules your team already keeps in `CLAUDE.md` or `AGENTS.md`, see [Migrate from CLAUDE.md](../context/migrate.md).

## Next step

Continue to [Ask for context directly](ask-directly.md).
