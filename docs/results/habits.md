---
description: "Small everyday habits that make NeoHive's answers more accurate each week you use it."
---

# Habits that compound

NeoHive knows only what you index and what your team teaches it. Each habit below takes a few seconds, and each one adds to what your [Hive](../concepts/glossary.md#hive) knows or keeps it correct.

The benefit compounds: the more your team teaches NeoHive, the better it answers. A correction you store today comes back in every later session, for you and for every teammate.

In the order they come up in a session:

1. **Ask before you start.** Your agent's first draft then follows your team's decisions. For example: "Before we start, what do we already know about the auth flow here?"
2. **Ask like a teammate.** Name the system, and recall matches [Memories](../concepts/glossary.md#memory) that use the same names. For example: "Have we hit flaky failures in the batch processor before? What fixed them?" See [Write prompts that retrieve well](prompting.md).
3. **Teach as you go.** Nobody on the team has to learn the rule again. For example: "Remember that we always use idempotency keys on payment POST requests." See [Teach your agent as you work](teach.md).
4. **Fix out-of-date knowledge.** Recall stops returning the old Memory. For example: "That's out of date. We moved off Redis for sessions last month. Update it."
5. **Reload when the task changes.** Start a new session, or run `/neohive:load-context` with the new task, so your agent loads context for the work in front of it.
6. **Capture before you close.** Run `/neohive:capture-session-learnings`, so the session's corrections and decisions come back next time.

One habit is for the whole team rather than one session: **keep repositories in sync.** Set a **Sync interval** on each [Code](../concepts/glossary.md#code-index) or [Documentation Index](../concepts/glossary.md#documentation-index) you work in, so answers about code match the current code. See [Keep a repository up to date](../context/repositories/sync.md).

## How you know the habits are working

After a few weeks, your agent follows your conventions without reminders and stops suggesting patterns your team no longer uses.

To check your progress, do the following:

1. In the dashboard, open your Hive.
2. Select the **Recent learnings** tab to see what agents stored.
3. Select the **Recent queries** tab to see what agents asked.
