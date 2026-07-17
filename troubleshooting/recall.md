---
description: "What to do when your agent isn't surfacing the context you expect."
---

# Recall Isn't Finding What I Need

If your agent isn't surfacing relevant context, it's usually one of a few things — how the query was phrased, or whether the knowledge was ever stored.

## Rephrase the ask

NeoHive searches by meaning, so how your agent asks matters. If it comes up short, ask again in more specific, situation-shaped terms — see [Working with your agent](../getting-the-most.md#working-with-your-agent). Use the vocabulary you'd expect in the answer: if a note says "idempotency keys", searching for "duplicate prevention" may miss it.

## Check the knowledge exists

Open the dashboard, go to your project, and browse the hive's contents. If what you're looking for was never stored, recall can't find it. You can store it now:

* Remember that the staging environment uses a self-signed certificate and needs `NODE_TLS_REJECT_UNAUTHORIZED=0` for local testing.

## Try a few phrasings

Describing the same thing different ways surfaces different results — one usually hits:

* How do we handle authentication tokens?
* JWT validation in the API gateway
* Auth middleware session management

## Check you're in the right project

Recall is scoped to the project your agent is connected to. If the knowledge lives in a different project, your agent won't find it — confirm the project in your MCP configuration.

{% hint style="info" %}
Knowledge is searchable immediately after it's stored. If you just saved something and can't find it, the issue is almost always phrasing — try the tips above.
{% endhint %}
