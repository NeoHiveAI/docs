---
description: "Setups that raise no error but make recall worse, and how to fix each one."
---

# Common mistakes to avoid

Some setup choices and habits make NeoHive's answers worse without ever showing an error. Your agent still answers, but from the wrong context. When answers seem off but nothing is broken, find what you notice in the table below.

<figure><img src="../.gitbook/assets/results-common-mistakes.svg" alt="The same request, Add a refund endpoint to the payments API, with two outcomes. With common mistakes, your agent gets mobile app checkout code because the mobile app shares the Hive, a generated API client because generated code is indexed too, and the old rule to store amounts in dollars because the old rule was never retired. With the fixes, it gets the payments refund handler because there is one Hive per product, your own refund service code because of an Allowlist for your source folders, and the current rule to store amounts in cents because the old rule is marked out of date."><figcaption></figcaption></figure>

## Mistakes and how to fix them

| Mistake | What you notice | Fix |
|---|---|---|
| **Index with an empty or vague description** | Your agent searches the wrong Index, or every Index, when you ask about one area. | On the Index page, fill in **Description** under **Index settings**. Your agent reads the description in `list_indexes`. |
| **Unrelated codebases in one Hive** | Answers include code and conventions from another product. | Give each product its own Hive. To reuse an Index elsewhere, add it to the other Hive as a **Shared Index**. |
| **Indexing everything the defaults allow** | Generated code, snapshot fixtures, and CSV or JSON data fill results that should show your source code. | Set an **Allowlist** for the folders you work in. Then set a **Blocklist** for files to leave out inside those folders. |
| **Never correcting the agent** | The same wrong suggestion comes back in every session. | When your agent is wrong, say what is correct and why. |
| **Stating a new fact without retiring the old one** | Your agent quotes the old rule as often as the new one. | Say "that's out of date" so your agent deactivates the old Memory. See [Teach your agent as you work](teach.md). |
| **One session across unrelated tasks** | Loaded context fits the task you started with, not the task you are working on now. | Start a new session, or run `/neohive:load-context` with the new task. |
| **Skipping the end-of-session capture** | Your agent never recalls decisions from long sessions. | Run `/neohive:capture-session-learnings` before you close the session. |
| **Wrong [MCP](../concepts/glossary.md#mcp) server name or scope** | In Claude Code, prompts stop adding context automatically. Tool calls still work. | Keep `neohive` in the server name. Add the server with `--scope project` from your project's root folder, or with `--scope user`. See [What the plugin does automatically](plugin-automation.md). |

## What NeoHive already skips

NeoHive always skips dependency and build folders, lock files, minified bundles, and binary files, so you do not need to block them. For the full list, see [Files in a repository](../reference/file-types.md#files-in-a-repository). To write your own allowlist and blocklist patterns, see [Choose which files are included](../context/repositories/file-patterns.md).

If you see an actual error, such as a failed sync or a tool your agent cannot find, see [Common errors](../troubleshooting/common-errors.md) instead.
