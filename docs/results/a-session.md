---
description: "What happens at each stage of a working session with NeoHive, from loading context to saving what you learned."
---

# A session, start to finish

A session has four stages. In Claude Code, the first two run on their own. The last two are yours.

<figure><img src="../.gitbook/assets/results-a-session.svg" alt="One session in four stages: start calls memory_context, work calls memory_recall, teach calls memory_store, and capture runs capture-session-learnings before you close."><figcaption></figcaption></figure>

{% stepper %}
{% step %}
## Start: load context for the task

When the session opens, the plugin's rules tell your agent to call `memory_context` with your task. It returns your team's rules and conventions, plus the Memories that fit the task.

To load context yourself, or to reload it after you switch task, run:

```text
/neohive:load-context fixing the retry logic in the billing webhook handler
```

With no text after the command, your agent describes the task from the conversation, or asks you.
{% endstep %}

{% step %}
## Work: your agent pulls what it needs

The plugin uses each prompt you send as a recall query and adds the best matches to your agent's context. Your agent also calls `memory_recall` when it needs something specific. [What the plugin does automatically](plugin-automation.md) lists every trigger.
{% endstep %}

{% step %}
## Teach: correct it and tell it to remember

When your agent is wrong, give the right answer and the reason. Your agent stores it with `memory_store`, and everyone on the Hive gets it in later sessions.

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

Your agent reviews the conversation for corrections, conventions, decisions and gotchas. It skips what the Hive already knows and stores up to five new Memories.

{% hint style="warning" %}
No hook runs the capture for you. If you close the session without it, only the Memories your agent stored during the session are kept.
{% endhint %}

If the session showed your agent using memory badly, for example never loading context, the skill can also add one instruction to your agent's instructions file. It edits only the memory section.
{% endstep %}
{% endstepper %}

## In Codex and Cursor

These plugins have no hooks, so nothing runs on its own. Their rules file tells your agent to call `memory_context` first. Ask your agent to run the skills by name, for example `Run the load-context skill`.

| Agent | Start | Capture | Capture may edit |
|---|---|---|---|
| Claude Code | Automatic, or `/neohive:load-context` | `/neohive:capture-session-learnings` | `~/CLAUDE.md` |
| Codex | Rules file, or the `load-context` skill | The `capture-session-learnings` skill | `~/AGENTS.md` or `~/.codex/AGENTS.md` |
| Cursor | Rules file, or the `load-context` skill | The `capture-session-learnings` skill | Your `.cursor/rules/*.mdc` files |

## Next step

Continue to [Teach your agent as you work](teach.md).
