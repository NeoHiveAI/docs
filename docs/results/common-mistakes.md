---
description: "Setup choices and habits that make recall less accurate, and how to fix each one."
---

# Common mistakes to avoid

Some setup choices and habits give your agent less relevant context, so its answers are less accurate. NeoHive is working as you set it up, so it has nothing to report, and the effect is easy to miss. The following diagram shows one request with and without these mistakes:

<figure><img src="../.gitbook/assets/results-common-mistakes.svg" alt="One request, two outcomes. With these mistakes, your agent gets the wrong code and an old rule. Without them, your agent gets the right code and the current rule."><figcaption></figcaption></figure>

## Mistakes and how to fix them

When answers seem off but nothing is broken, find what you notice in the following tables. Each row names one mistake, what you notice, and how to fix it.

### When you set up Hives and Indexes

The following table shows the mistakes you can make during setup:

| Mistake | What you notice | Fix |
|---|---|---|
| **Leaving an Index's description empty or vague** | Your agent searches the wrong [Index](../concepts/glossary.md#index), or every Index, when you ask about one area. | On the Index page, fill in **Description** under **Index settings**. Your agent reads the description in `list_indexes`. |
| **Putting unrelated codebases in one Hive** | Answers include code and conventions from another product. | Give each product its own [Hive](../concepts/glossary.md#hive). To reuse an Index elsewhere, add it to the other Hive as a **Shared Index**. |
| **Indexing everything the defaults allow** | Generated code, snapshot fixtures, and CSV or JSON data fill results that should show your source code. | Set an **Allowlist** for the folders you work in. Then set a **Blocklist** for files to leave out inside those folders. |
| **In Claude Code, adding the server with the wrong name or scope** | Prompts stop adding context automatically. Tool calls still work. | Keep `neohive` in the server name. Add the server with `--scope project` from your project's root folder. For more information, see [When the prompt recall adds nothing](plugin-automation.md#when-the-prompt-recall-adds-nothing). |

### While you work with your agent

The following table shows the mistakes you can make during a session:

| Mistake | What you notice | Fix |
|---|---|---|
| **Never correcting the agent** | The same wrong suggestion comes back in every session. | When your agent is wrong, say what is correct and why. |
| **Stating a new fact without retiring the old one** | Your agent quotes the old rule as often as the new one. | Say `That's out of date.` Recall then stops returning the old [Memory](../concepts/glossary.md#memory). For more information, see [Teach your agent as you work](teach.md). |
| **One session across unrelated tasks** | Loaded context fits the task you started with, not the task you are working on now. | Start a new session, or run the `load-context` [skill](../concepts/glossary.md#skill) with the new task. |
| **Skipping the end-of-session capture** | Your agent never recalls decisions from long sessions. | Run the `capture-session-learnings` [skill](../concepts/glossary.md#skill) before you close the session. |

## What NeoHive already skips

NeoHive always skips dependency and build folders, lock files, minified bundles, and binary files, so you do not need to block them. For more information about the folders and files NeoHive skips, see [Files in a repository](../reference/file-types.md#files-in-a-repository). To write your own Allowlist and Blocklist patterns, see [Choose which files are included](../context/repositories/file-patterns.md).

To fix an actual error, such as a failed sync or a tool your agent cannot find, see [Common errors](../troubleshooting/common-errors.md) instead.
