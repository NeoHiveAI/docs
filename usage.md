---
description: "Your day-to-day workflow: how your agent pulls context and captures knowledge as you work."
---

# Using NeoHive

Once NeoHive is installed and your agent is connected, most of the work happens in the background: your agent pulls context when it needs it and captures new knowledge as you go. Every session follows the same rhythm.

1. **Start.** Your agent loads the context relevant to your task: conventions, recent decisions, related code.

2. **Work.** As you go, it pulls the exact code and knowledge it needs instead of guessing or asking you to paste files.

3. **Teach.** You correct it or tell it to remember something, and that sticks for next time.

4. **Capture.** When the session ends, it extracts the learnings worth keeping, automatically.

## Starting a session

When you begin working, your agent loads relevant context from NeoHive: project conventions, recent decisions, and anything related to the task at hand. The plugin handles this on session start.

You can also trigger it manually:

```
/neohive:load-context
```

This pre-loads directives, conventions, and task-relevant knowledge so your agent starts with your project's context rather than guessing.

{% hint style="success" %}
Switching to a very different task mid-session? Run `/neohive:load-context` again: it re-loads context based on what you're working on now.
{% endhint %}

## How your agent uses context

With NeoHive connected, your agent draws on two kinds of context:

- **Your codebase.** If you've indexed a repository, your agent finds relevant code by describing what it does. Ask "how does the retry logic work?" and it pulls the actual implementation instead of guessing. No more hallucinated APIs or libraries you don't use.
- **Your team's knowledge.** Conventions, architectural decisions, debugging insights, and gotchas surface when they're relevant, so your agent follows your team's patterns because it knows what they are.

You'll see your agent call tools like `memory_recall` and `memory_context` as it works. That's normal: it's pulling context.

## Teaching your agent

Knowledge gets into NeoHive two ways.

**Automatically.** The plugin's end-of-session hook reviews your conversation and extracts what's worth keeping: corrections you made, conventions you established, decisions you reached, gotchas you hit.

**On demand.** Tell your agent to store something any time:

* Remember that the payments API requires idempotency keys on all POST requests.
* Store this: we use Redis for session storage because our sessions are short-lived and don't need durability.

These come back in future sessions when relevant, for you and for anyone else on the same project.

## Asking for context directly

Your agent searches NeoHive on its own, but you can also ask outright:

* What do we know about the authentication flow?
* Have we hit issues with the batch processor before?
* What conventions do we follow for error handling?

For more on working with your agent to get sharper answers, see [Getting the Most](getting-the-most.md#working-with-your-agent).

## End of session

When you finish, the plugin reviews the conversation and stores the learnings. It runs automatically at session end; you can also trigger it:

```
/neohive:capture-session-learnings
```

The next time you or a teammate work on something related, that context is already there.
