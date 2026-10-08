---
description: "Small everyday habits that make NeoHive's answers more accurate each week you use it."
---

# Habits that compound

Each habit takes a few seconds. Each habit adds to what your [Hive](../concepts/glossary.md#hive) knows, so later sessions start with more of the right context. A Hive is your team's workspace in NeoHive. The [Glossary](../concepts/glossary.md) defines Hive, [Index](../concepts/glossary.md#index), and [Memory](../concepts/glossary.md#memory).

| Habit | What you say or do | Result |
|---|---|---|
| **Teach as you go** | `Remember that we always use idempotency keys on payment POST requests.` | Nobody on the team has to learn the rule again. See [Teach your agent as you work](teach.md). |
| **Ask like a teammate** | `Have we hit flaky failures in the batch processor before? What fixed them?` | Recall matches Memories that use the same system names. See [Write prompts that retrieve well](prompting.md). |
| **Ask before you start** | `Before we start, what do we already know about the auth flow here?` | Your agent's first draft follows your team's decisions. |
| **Reload when the task changes** | Start a new session, or run `/neohive:load-context refactoring the settings page form validation` | Your agent loads context for the task you are working on now. |
| **Fix out-of-date knowledge** | `That's out of date. We moved off Redis for sessions last month. Update it.` | Recall stops returning the old Memory. |
| **Capture before you close** | Run `/neohive:capture-session-learnings` | Your agent can recall the session's corrections and decisions next time. |
| **Keep repositories in sync** | Set a **Sync interval** on each [Code](../concepts/glossary.md#code-index) or [Documentation Index](../concepts/glossary.md#documentation-index) you work in. See [Keep a repository up to date](../context/repositories/sync.md) | Answers about code match the current code. |

## How you know the habits are working

After a few weeks, your agent follows your conventions without reminders. Your agent also stops suggesting patterns your team no longer uses.

To check your progress, do the following:

1. In the dashboard, open your Hive.
2. Select the **Recent learnings** tab to see what agents stored.
3. Select the **Recent queries** tab to see what agents asked.

## Next step

Continue to [Team workflows](team-workflows.md).
