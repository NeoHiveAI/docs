---
title: "Using NeoHive"
description: "Your day-to-day workflow: how your agent pulls context and captures knowledge as you work."
---

Once NeoHive is installed and your agent is connected, most of the work happens in the background. Your agent pulls context from NeoHive when it needs it, and captures new knowledge as you work.

## Starting a session

When you begin working, your agent loads relevant context from NeoHive: project conventions, recent decisions, and anything related to the task at hand. The NeoHive plugin handles this on session start.

You can also trigger it manually:

```
/neohive:load-context
```

This pre-loads directives, conventions, and task-relevant knowledge so your agent starts with your project's context rather than guessing.

**Tip:** If you're switching to a very different task mid-session, run `/neohive:load-context` again. It re-loads context based on what you're working on now.

## How your agent uses context

With NeoHive connected, your agent draws on two kinds of context:

**Your codebase.** If you've indexed a repository, your agent can find relevant code by describing what it does. When you ask "how does the retry logic work?" it pulls the actual implementation instead of guessing. Your agent stops hallucinating APIs and recommending libraries you don't use.

**Your team's knowledge.** Conventions, architectural decisions, debugging insights, and gotchas stored in NeoHive come up when they're relevant. Your agent follows your team's patterns because it knows what they are.

You'll see your agent call NeoHive tools like `memory_recall` and `memory_context` during your session. This is normal. It's pulling context as it works.

## Teaching your agent

Knowledge gets into NeoHive in two ways:

### Without you doing anything

The NeoHive plugin includes an end-of-session hook that reviews your conversation and extracts anything worth keeping: corrections you made, conventions you established, decisions you reached, gotchas you discovered.

### By telling it directly

You can tell your agent to store something at any time:

> "Remember that the payments API requires idempotency keys on all POST requests."

> "Store this: we decided to use Redis for session storage because our sessions are short-lived and don't need durability."

> "Don't forget, the staging environment uses a different OAuth provider than production."

These get stored and come back in future sessions when relevant, for you and for anyone else connected to the same project.

## Asking for context directly

Your agent searches NeoHive on its own, but you can also ask directly:

> "What do we know about the authentication flow?"

> "Have we encountered issues with the batch processor before?"

> "What conventions do we follow for error handling?"

### Getting better results

If your agent isn't finding what you expect, try being more specific. NeoHive searches by meaning, so phrasing matters.

- **Be specific, not vague:** "PostgreSQL connection pooling configuration" works better than "database stuff"
- **Use the terms you'd find in the answer:** If the stored knowledge mentions "idempotency keys," searching for "duplicate prevention" might not find it
- **Describe the situation:** "Error handling in the payment webhook retry path" is more targeted than "error handling"

## End of session

When you finish working, the NeoHive plugin reviews the conversation and extracts learnings. This happens when the session ends.

You can also trigger it manually:

```
/neohive:capture-session-learnings
```

This scans the conversation for corrections, conventions, decisions, and insights, then stores them in NeoHive. The next time you or a teammate work on something related, that context is there.

## What builds up over time

After a few weeks of use, your NeoHive project accumulates a body of context:

- Your indexed codebase, kept fresh with periodic syncs
- Coding conventions your team follows
- Architectural decisions and why they were made
- Gotchas and pitfalls in specific parts of the codebase
- Debugging insights from past incidents

New sessions start informed. Your agent stops recommending deprecated patterns, stops hallucinating APIs, and stops ignoring your team's conventions. Context that used to live in someone's head or buried in a Slack thread is now searchable and persistent, available to every agent your team uses.
