---
description: "How your agent, the NeoHive plugin, and the NeoHive container fit together, and where each one runs."
---

# How NeoHive works

NeoHive gives every coding agent on your team one shared memory. Your agent connects to it over [MCP](glossary.md#mcp), the NeoHive plugin tells the agent when to use it, and the memory itself runs in a Docker container on your machine or a shared server.

Whatever tool a teammate uses, their agent reads the same memory, and what one person teaches it, every agent gets back.

<figure><img src="../.gitbook/assets/how-it-works.svg" alt="Three teammates' coding agents, Claude Code, Cursor, and Codex, each with the NeoHive plugin, connect to one Hive inside the NeoHive container. One agent stores a lesson, and the other agents get it back through recall. The Hive holds Code and Documentation Indexes synced from GitHub or GitLab, a Files Index for files you upload, and a Knowledge Index for what agents learn. The container runs in Docker, on your machine or a shared server."><figcaption></figcaption></figure>

Your agent never reads NeoHive's files. It asks through an MCP tool, such as `memory_recall` or `memory_store`, and gets matching code, docs, and [Memories](glossary.md#memory) back. [MCP tools](../reference/mcp-tools.md) lists every tool.

## The container

NeoHive is one Docker container named `neohive`. Your code, documents, and Memories never leave the machine it runs on.

Inside it, a Hive is a workspace for one codebase or team, and each Index holds one kind of context, such as your code or your team's Memories. [Hives, Indexes, and Memories](hives-indexes-memories.md) explains the three levels.

* **The dashboard**, where you manage your Hives, opens in your browser at the address the installer prints.
* **Each Hive has its own MCP endpoint**, at `/hives/<hive-id>/mcp`.
* **Everything the container stores** lives in the `neohive-data` Docker volume, mounted at `/app/data` inside the container.

## What the plugin runs

The plugin installs a [rules file](glossary.md#rules-file) that tells your agent when to use memory. What else it runs depends on your tool:

{% tabs %}
{% tab title="Claude Code" %}
Two hooks do most of the work:

* **When a session starts**, a hook installs the plugin's rules file.
* **When you send a prompt**, a hook runs `memory_recall` on it and adds the results to the agent's context before the agent answers.

No hook runs when a session ends. To save what your agent learned, run `/neohive:capture-session-learnings`.
{% endtab %}

{% tab title="Cursor and Codex" %}
These plugins have no hooks. Their rules file tells the agent to load context at the start of a session and to recall before it searches files.
{% endtab %}

{% tab title="Other MCP apps" %}
Claude Desktop and other MCP apps have no plugin. Add the rules from [Tell your agent to use NeoHive](../get-started/connect/README.md#tell-your-agent-to-use-neohive) so the agent knows when to call NeoHive.
{% endtab %}
{% endtabs %}

[What the plugin does automatically](../results/plugin-automation.md) lists every hook and how to turn it off.

## Repositories

When you add a repository, the container does the following:

1. Copies (clones) the repository from GitHub or GitLab into the `neohive-data` volume.
2. Splits each file into [chunks](glossary.md#chunk).
3. Turns each chunk into an [embedding](glossary.md#embedding).
4. Stores the chunks and their embeddings in a [Code](glossary.md#code-index) or [Documentation Index](glossary.md#documentation-index).

Later syncs index only the files that changed, so the memory keeps itself current with no upkeep.

Embedding and search both run inside the container. [What stays on your machine](../security/local-only.md) lists every connection it makes to outside services.
