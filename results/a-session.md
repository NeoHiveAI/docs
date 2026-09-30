---
description: "What happens at each stage of a working session with NeoHive, from loading context to saving what you learned."
---

# A session, start to finish

A session has four stages. In Claude Code the first two run on their own; the last two are yours.

<figure><img src="../.gitbook/assets/results-a-session.svg" alt="One session in four stages: start calls memory_context, work calls memory_recall, teach calls memory_store, and capture runs capture-session-learnings before you close."><figcaption></figcaption></figure>

{% stepper %}
{% step %}
## Start: load context for the task

When the session opens, the plugin reminds your agent to call `memory_context` with your task. It returns your team's rules and conventions, plus the memories that fit the task.

To load it yourself, or to reload after you switch task, run:

```text
/neohive:load-context fixing the retry logic in the billing webhook handler
```

With no text after the command, your agent describes the task from the conversation so far, or asks you.
{% endstep %}

{% step %}
## Work: your agent pulls what it needs

Each prompt you send is also used as a recall query. The plugin adds the best matches to your agent's context before it answers. Prompts under 10 characters and slash commands are skipped.

Your agent also calls `memory_recall` when it needs something specific. These calls in the transcript are normal. [What the plugin does automatically](plugin-automation.md) lists every trigger.
{% endstep %}

{% step %}
## Teach: correct it and tell it to remember

When your agent is wrong, give the right answer and the reason. Your agent stores it with `memory_store`, and everyone on the hive gets it in later sessions.

```text
Remember that the payments API requires idempotency keys on every POST request.
```
{% endstep %}

{% step %}
## Capture: save the session's learnings

Before you close the session, run:

```text
/neohive:capture-session-learnings
```

Your agent reviews the conversation for corrections, conventions, decisions and gotchas. It skips anything the hive already knows and stores up to five new memories.

{% hint style="warning" %}
No hook runs this for you. Close the session without it and only the memories your agent stored during the session are kept.
{% endhint %}

<details>

<summary>Optional: other changes the capture skill can make</summary>

If the session showed your agent using memory badly, for example never loading context at the start, the skill can add one instruction to the memory section of `~/CLAUDE.md`. It edits that section only and never rewrites the file.

</details>
{% endstep %}
{% endstepper %}

## In Codex and Cursor

These agents have no plugin hooks, so nothing runs per prompt or at session start. Their plugins add a rule that tells your agent to call `memory_context` first and to check memory before searching files. The `load-context` and `capture-session-learnings` skills ship with both, so ask your agent to run them by name.

## Next step

Continue to [Teach your agent as you work](teach.md).
