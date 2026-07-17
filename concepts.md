---
description: "How NeoHive organizes context into projects, hives, and memories — and how it retrieves the right context at the right time."
---

# Core Concepts

NeoHive connects your coding agents to your codebase and your team's accumulated knowledge. It organizes that context into three things — **projects**, **hives**, and **memories** — then retrieves the right slice of it whenever your agent asks.

## Projects

A project is a workspace. It keeps context separate between unrelated work — your frontend app and your infrastructure tooling don't need to share the same knowledge.

You create projects in the NeoHive dashboard at `http://localhost:3577`, and each one gets its own MCP endpoint that your agents connect to.

Most people run one project per codebase or team. If two codebases share a lot of context (a monorepo, say), put them in one project; if they're unrelated, keep them separate.

## Hives

A hive is a container for one kind of context within a project. Each hive has its own database and is tuned for its content type:

<table data-view="cards">
  <thead>
    <tr>
      <th width="52"></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><i class="fa-github"></i></td>
      <td><strong>Repo hives</strong></td>
      <td>Indexed source code from a GitHub or GitLab repository — this is how your agent searches your actual code by meaning, not by filename or keyword. See <a href="codebase.md">Indexing Your Codebase</a>.</td>
    </tr>
    <tr>
      <td><i class="fa-file-lines"></i></td>
      <td><strong>Document hives</strong></td>
      <td>Uploaded files: markdown, text, PDFs. Use these for content that doesn't live in git — runbooks, onboarding guides, design docs. Drag and drop them into the dashboard.</td>
    </tr>
    <tr>
      <td><i class="fa-star"></i></td>
      <td><strong>Knowledge hives</strong></td>
      <td>Where your agents store and retrieve learned context — conventions, decisions, insights, corrections. Created automatically with the project; your agents read and write here as you work.</td>
    </tr>
  </tbody>
</table>

A project can hold multiple hives of any type. Your agent never has to pick one — a single query searches them all and comes back with the relevant code, the relevant convention, and the relevant doc together. (More on that in [How retrieval works](#how-retrieval-works).)

## Memories

A memory is a single piece of stored knowledge in a knowledge hive — a convention, a decision, an insight, a correction. Your agent creates and retrieves these as you work: when you tell it to remember something, or it discovers something worth keeping, it's stored as a memory and comes back in future sessions when it's relevant.

Each memory has a **type** — `directive`, `convention`, `decision`, `insight`, `error_pattern`, and a few others — which helps NeoHive weigh and surface it appropriately. You don't manage these by hand; your agent classifies them as it stores.

{% hint style="info" %}
NeoHive is proven to actually get better over time — the more you or your agent use it, the better it becomes.
{% endhint %}

## How retrieval works

This is the part that makes NeoHive more than a searchable `CLAUDE.md`. When your agent asks a question, it doesn't grep for filenames or read a file top to bottom — it searches your context **by meaning**. Here's the flow:

1. **Your agent sends a query.** Usually through the `memory_recall` or `memory_context` tools, phrased as a natural description of what it needs — e.g. _"error handling in the payment webhook retry path."_

2. **Each hive embeds the query with its own model.** A repo hive uses a code-tuned embedding model; a knowledge or document hive uses a text model. Embedding each query with the right model for its content gives sharper matches than forcing one model across everything.

3. **Each hive runs a hybrid search.** NeoHive combines **dense vector search** (meaning) with **BM25 keyword search** (exact terms) and fuses the two with **Reciprocal Rank Fusion** — so you get semantic recall _and_ precise term matches, not one at the expense of the other.

4. **The results merge into one ranked list.** Every hive's results are fused into a single response, and hives that weren't relevant drop out on their own. Your agent gets the relevant code, conventions, and docs together — as if they all lived in one place.

This is also why _phrasing matters_. Because search is by meaning, describing the situation in the terms you'd expect to see in the answer gets the best results — see [Getting better results](usage.md#getting-better-results) for how to ask.
