---
description: "How to correct your agent and tell it what to remember, so the knowledge comes back in later sessions."
---

# Teach your agent as you work

Say it once, in plain words, and your agent stores it for everyone on the hive.

<figure><img src="../.gitbook/assets/results-teach.svg" alt="A correction you give today, such as no, we validate tokens in the gateway, is stored with memory_store as one memory in the Knowledge index. Later, when a teammate asks to add auth checks to the orders service, recall returns it and their agent validates in the gateway."><figcaption></figcaption></figure>

| When this happens | Say something like | Your agent |
|---|---|---|
| It gets something wrong | `No, we validate tokens in the gateway, not in each service.` | Stores the correction with `memory_store` |
| You settle a decision | `Remember that we use Redis for sessions because they are short-lived and need no durability.` | Stores it as a decision, with the reason |
| You hit a gotcha | `Store this: the staging database rejects connections without TLS.` | Stores it as an insight |
| A fact is out of date | `That's out of date. We moved sessions off Redis last month. Update it.` | Stores the new fact and retires the old one with `memory_forget` |

## Say it when it happens

Correct your agent while the reason is still in the conversation. The reason is what makes the memory useful later. `/neohive:capture-session-learnings` at the end catches what you missed, but it stores at most five memories per run.

## Name the system, the rule and the reason

Recall finds a memory by the words in it. Your agent writes the memory from what you tell it, so a specific correction gives a specific memory.

| Hard to find | Easy to find |
|---|---|
| `We fixed the bug.` | `Retry calls to the billing API with exponential backoff from 500ms, at most 3 attempts. The provider returns 429 with no Retry-After header, so a fixed delay retries too fast.` |
| `Don't use the old client.` | `Use the v2 HTTP client in lib/http for all outbound calls. The v1 client has no request timeout and hangs workers when a provider stalls.` |

## Say "out of date" when a fact changes

If you only state the new fact, both versions stay active and your agent may use either one. Saying "that's out of date" makes it retire the old memory, so recall stops returning it. A retired memory is switched off, not deleted.

## Where it goes

Everything your agent stores goes into your hive's **Knowledge** index. It can be recalled as soon as it is stored. What you teach never lands in a Shared Index, because `memory_store` always writes to your own hive's Knowledge index.

To see what was stored, open the hive in the dashboard and click the **Recent learnings** tab. It lists what agents stored in the last 7 days. To import rules your team already keeps in `CLAUDE.md` or `AGENTS.md`, see [Migrate from CLAUDE.md](../context/migrate.md).

## Next step

Continue to [Ask for context directly](ask-directly.md).
