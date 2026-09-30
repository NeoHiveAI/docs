---
description: "Small everyday habits that make NeoHive's answers more accurate each week you use it."
---

# Habits that compound

Each habit takes seconds. Each one adds to what your Hive knows, so later sessions start with more of the right context.

| Habit | What you say or do | Result |
|---|---|---|
| **Teach as you go** | `Remember that we always use idempotency keys on payment POST requests.` | Nobody on the team has to learn it again. See [Teach your agent as you work](teach.md) |
| **Ask like a teammate** | `Have we hit flaky failures in the batch processor before? What fixed them?` | Recall matches Memories that use the same system names. See [Write prompts that retrieve well](prompting.md) |
| **Ask before you start** | `Before we start, what do we already know about the auth flow here?` | Your agent's first draft follows your team's decisions |
| **Reload when the task changes** | Start a new session, or run `/neohive:load-context refactoring the settings page form validation` | Your agent loads context for the task you are on now |
| **Fix stale knowledge** | `That's out of date. We moved off Redis for sessions last month. Update it.` | The old Memory stops coming back in recall |
| **Capture before you close** | Run `/neohive:capture-session-learnings` | The session's corrections and decisions can be recalled next time |
| **Keep repositories in sync** | Set a **Sync interval** on each Code or Documentation Index you work in. See [Keep it up to date](../context/repositories/sync.md) | Code answers match the code as it is today |

## How you know it is working

After a few weeks, your agent follows your conventions without being told and stops suggesting patterns your team has retired.

To check, open the Hive in the dashboard. The **Recent learnings** tab shows what agents stored, and the **Recent queries** tab shows what they asked.

## Next step

Continue to [Team workflows](team-workflows.md).
