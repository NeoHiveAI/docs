---
description: "Phrase requests and memory queries so NeoHive returns the Memories and code you actually need."
---

# Write prompts that retrieve well

Recall is how your agent searches your [Hive](../concepts/glossary.md#hive) for context, through `memory_recall` or `memory_context`. In Claude Code, the plugin also runs a recall with the start of each prompt you send.

Recall finds a [Memory](../concepts/glossary.md#memory), code, or a document by the words and meaning it shares with your query. A vague question shares few words with anything, so it gets weak matches. Write each prompt and query the way the answer would be written. [How retrieval works](../concepts/retrieval.md) explains how recall finds and ranks results.

<figure><img src="../.gitbook/assets/results-prompting.svg" alt="Two queries against one stored Memory about batch processor retries. The question how do we handle errors shares few words and matches weakly. The statement error handling and retries in the async batch processor shares its words and matches strongly."><figcaption></figcaption></figure>

| Instead of | Write | Why it works better |
|---|---|---|
| `How do we handle errors?` | `error handling and retries in the async batch processor` | A statement with system names reads like the Memory it should match. |
| `auth stuff` | `JWT validation and token refresh in the API gateway middleware` | The query names the parts a matching Memory would mention. |
| `duplicate prevention` | `idempotency keys on payment POST requests` | The query uses your team's own words, which stored Memories also use. |
| `ok now do the search work` | `Switching to the search indexing worker. It drops documents over 1MB.` | The prompt starts with the subject, so the automatic recall has something to match. |

## Put the subject first

In Claude Code, the plugin recalls with only the start of each prompt, as [What the plugin does automatically](plugin-automation.md) explains. Put the system and the problem first, then the background and instructions.

## Ask for several phrasings on important searches

`memory_recall` accepts `queries`, a list of phrasings whose results it merges into one list. Ask for this when you do not know the words your team uses:

```text
Search memory a few different ways for how we rate-limit the billing API.
```

[MCP tools](../reference/mcp-tools.md#memory_recall) lists the parameters of `memory_recall` and their limits.

## Pick the right tool

Your agent has two tools for recall:

* **`memory_context`** runs once, at the start of a task. Describe the task as a statement. `implementing rate limiting for the Express gateway` loads more context than `what do we know about the gateway?`.
* **`memory_recall`** runs any time your agent needs something specific.

Both tools search every [Index](../concepts/glossary.md#index) in your Hive unless you pass `index`.

If your agent has no NeoHive plugin, paste the rules in [Tell your agent to use NeoHive](../get-started/connect/README.md#tell-your-agent-to-use-neohive) into its rules file.

{% hint style="success" %}
To see exactly what your agents searched for, open your Hive in the dashboard and select the **Recent queries** tab. In Claude Code, the list includes the recall the plugin runs with each prompt.
{% endhint %}
