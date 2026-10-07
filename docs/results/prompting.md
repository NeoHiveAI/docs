---
description: "Phrase requests and memory queries so NeoHive returns the Memories and code you actually need."
---

# Write prompts that retrieve well

Recall finds a stored [Memory](../concepts/glossary.md#memory) by the words and meaning it shares with your query. Write the query the way the answer would be written.

<figure><img src="../.gitbook/assets/results-prompting.svg" alt="Two queries against one stored Memory about batch processor retries. The question how do we handle errors shares few words and matches weakly. The statement error handling and retries in the async batch processor shares its words and matches strongly."><figcaption></figcaption></figure>

| Instead of | Write | Why it works better |
|---|---|---|
| `How do we handle errors?` | `error handling and retries in the async batch processor` | A statement with system names reads like the Memory it should match. |
| `auth stuff` | `JWT validation and token refresh in the API gateway middleware` | The query names the parts a matching Memory would mention. |
| `duplicate prevention` | `idempotency keys on payment POST requests` | The query uses your team's own words, which stored Memories also use. |
| `ok now do the search work` | `Switching to the search indexing worker. It drops documents over 1MB.` | The prompt starts with the subject, so the automatic recall has something to match. |

## Put the subject first

In Claude Code, the plugin sends the first 400 characters of each prompt to `memory_recall`. Put the system and the problem first. Then add background and instructions. A prompt under 10 characters, or a prompt that starts with `/`, does not start a recall.

## Ask for several phrasings on important searches

`memory_recall` accepts `queries`, a list of one to five phrasings. `memory_recall` returns one merged list of results. Use `queries` when you do not know the words your team uses.

```text
Search memory a few different ways for how we rate-limit the billing API.
```

## Pick the right tool

| | `memory_context` | `memory_recall` |
|---|---|---|
| **Use it** | Once, at the start of a task | Any time you need something specific |
| **You give it** | `task`: what you are doing, as a statement | `query`, or `queries` for several phrasings |
| **It returns** | Rules and conventions, plus other Memories that fit the task | The best matches of any kind, including indexed code and documents |
| **Narrow it with** | `index` | `index`, `types` (kinds of Memory), `limit` (default 10, at most 50) |

Both tools search every Index in your Hive unless you pass `index`. A Hive is your team's workspace, and each Index inside the Hive is one store of context. Describe the task as a statement. For example, `implementing rate limiting for the Express gateway` loads more context than `what do we know about the gateway?`.

<details>

<summary>Rules to paste for an agent without the NeoHive plugin</summary>

The plugin already gives your agent these rules. If your agent does not have the plugin, add the rules to its `CLAUDE.md` file, `AGENTS.md` file, or equivalent file:

```text
At the start of every session, call memory_context with a short description of the task, for example "implementing auth middleware for the Express gateway".

Before reading many files to understand a subsystem, call memory_recall with specific domain terms, then read the files it returns.

When the user corrects you, sets a convention, or points out a gotcha, call memory_store with a self-contained statement that names the system, the rule, and the reason.
```

</details>

{% hint style="success" %}
Before you rely on a phrasing, test it in the dashboard **Playground**. See [Test queries in the Playground](../admin/playground.md).
{% endhint %}

## Next step

Continue to [Habits that compound](habits.md).
