# Recall Isn't Finding What I Need

If your agent isn't surfacing relevant context, the issue is usually how the query is phrased or whether the knowledge was ever stored.

## Rephrase the query

NeoHive searches by meaning, not keywords. The way you ask matters.

**Too vague:**
> "What do we know about errors?"

**Better:**
> "Error handling conventions in the payment webhook retry path"

Use the specific terms you'd expect to find in the answer. If the memory mentions "idempotency keys," searching for "duplicate prevention" might not find it.

## Check that the knowledge exists

Open the NeoHive dashboard, navigate to your project, and browse the hive's contents. If the knowledge you're looking for was never stored, recall can't find it.

You can store it now:

> "Remember that the staging environment uses a self-signed certificate and requires `NODE_TLS_REJECT_UNAUTHORIZED=0` for local testing."

## Try multiple phrasings

If you're asking your agent to look something up, try describing the same thing in different words:

> "How do we handle authentication tokens?"

> "JWT token validation in the API gateway"

> "Auth middleware session management"

Different phrasings can surface different results. One of them will usually hit.

## Context is scoped to a project

NeoHive searches within the project your agent is connected to. If the knowledge you need is in a different project, your agent won't find it. Check that you're connected to the right project in your MCP configuration.

## Recently stored knowledge

Knowledge is available for recall immediately after storing. If you just stored something and can't find it, the issue is likely phrasing. Try the tips above.
