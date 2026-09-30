---
description: "Three ways teams use a shared hive: onboarding, debugging with past fixes, and keeping conventions consistent."
---

# Team workflows

When every agent on the team connects to the same hive, what one person teaches reaches everyone.

<figure><img src="../.gitbook/assets/results-team-workflows.svg" alt="Two teammates teach the team hive with memory_store: one states a convention, one stores a bug fix. The hive has one MCP endpoint and holds a Knowledge index plus Code and Documentation indexes. Three agents get it back through memory_context and memory_recall: a new engineer on day one, the next person with the same symptom, and every agent writing code in that area."><figcaption></figcaption></figure>

## Set it up once per person

A hive has one MCP endpoint. Everyone who connects their agent to it reads the same indexes and writes to the same **Knowledge** index. There is no per-person copy.

So each teammate connects to the team's hive instead of creating their own. [Access and sharing](../admin/access.md) covers running one NeoHive for a team.

## The three workflows

| Workflow | Someone did this earlier | Now anyone can ask |
|---|---|---|
| **Onboard a teammate** | Taught the hive the team's conventions and decisions | `How do we handle authentication in the API gateway, and why?` |
| **Debug with past fixes** | Stored the symptom, cause and fix of a bug | `Have we run into flaky failures in the batch processor? What fixed them?` |
| **Keep conventions consistent** | Said `Remember that we use snake_case for all database column names.` | Nothing. At session start, `memory_context` returns the conventions that fit the task |

Each workflow needs the middle column to have happened first. A fix nobody stored cannot come back, so when you solve something tricky, tell your agent to remember the symptom, the cause and the fix.

{% hint style="info" %}
To import rules your team already keeps in `CLAUDE.md` or `AGENTS.md` files, see [Migrate from CLAUDE.md](../context/migrate.md).
{% endhint %}

## Next step

Continue to [What the plugin does automatically](plugin-automation.md).
