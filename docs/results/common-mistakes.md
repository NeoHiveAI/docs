---
description: "Setups that raise no error but make recall worse, and how to fix each one."
---

# Common mistakes to avoid

Nothing on this page shows an error message. Each mistake leaves NeoHive working, but returning weaker answers.

<figure><img src="../.gitbook/assets/results-common-mistakes.svg" alt="Three before and after pairs. Index description: Backend, versus Payments service: refunds, invoicing, and the Stripe webhook handlers. Hive layout: one Hive holding the payments service and an unrelated mobile app, versus one Hive per product with an Index shared into another Hive when needed. A fact changes: stating the new fact while the old Memory stays active, versus saying that's out of date, update it."><figcaption></figcaption></figure>

| Mistake | What you notice | Fix |
|---|---|---|
| **Index with an empty or vague description** | Your agent searches the wrong Index, or every Index, when you ask about one area | On the Index page, fill in **Description** under **Index settings**. Your agent reads it in `list_indexes` |
| **Unrelated codebases in one Hive** | Answers mix in code and conventions from another project | Give each product its own Hive. To reuse an Index elsewhere, add it to the other Hive as a **Shared Index** |
| **Indexing everything the defaults allow** | Generated code, snapshot fixtures and CSV or JSON data crowd out your source | Set an **Allowlist** for the folders you work in and a **Blocklist** for what to leave out inside them |
| **Never correcting the agent** | The same wrong suggestion comes back session after session | Say what is right, and why, when it happens |
| **Stating a new fact without retiring the old one** | Your agent quotes the old rule as often as the new one | Say "that's out of date" so it retires the old Memory |
| **One session across unrelated tasks** | Loaded context fits the task you started with, not the one you are on | Start a new session or run `/neohive:load-context` with the new task |
| **Skipping the end-of-session capture** | Decisions from long sessions never come back | Run `/neohive:capture-session-learnings` before you close |
| **Wrong MCP server name or scope** | In Claude Code, prompts stop pulling in context on their own; tool calls still work | Keep `neohive` in the server name, and add it with `--scope user` or `--scope project`. See [What the plugin does automatically](plugin-automation.md) |

## What NeoHive already skips

You do not need to block these. NeoHive never indexes folders named `node_modules`, `dist`, `build`, `vendor`, `coverage`, `venv` or `__pycache__`, lock files, minified `.min.js` and `.min.css` files, images, and binaries. [Choose which files are included](../context/repositories/file-patterns.md) shows allowlist and blocklist patterns.

{% hint style="info" %}
Seeing an actual error, such as a failed sync or a tool your agent cannot find? See [Common errors](../troubleshooting/common-errors.md).
{% endhint %}

## Next step

Continue to [Dashboard tour](../admin/dashboard.md).
