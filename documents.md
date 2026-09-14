---
description: "Add markdown, text, and PDF files to an Index so your agent can search them by meaning."
---

# Document Indexes

A Document Index holds files you upload, in markdown, plain text, or PDF, and makes them searchable the same way NeoHive searches code. Reach for one whenever the knowledge you want lives in documents rather than in a git repository or in your agent's own notes: product specs, runbooks, design docs, meeting notes, or an exported notes vault.

For how Document Indexes sit alongside Repo and Knowledge Indexes, see [Core Concepts](concepts.md).

## Creating a Document Index and adding files

{% stepper %}
{% step %}
### Create the Index

In your Hive, create a new Index and choose the file-upload source type. Give it a clear name and description. The description is what your agent reads when it decides which Index to search, so name the kind of documents it holds (see [writing a good Index description](codebase.md#writing-a-good-index-description)).
{% endstep %}

{% step %}
### Upload your files

Open the Index's **Files** tab and drag your documents onto the drop zone. NeoHive splits and embeds each file as it arrives, and shows progress per file.
{% endstep %}

{% step %}
### Ask your agent

Once a file finishes processing, its content is searchable right away. Ask your agent about it exactly as you would ask about code.
{% endstep %}
{% endstepper %}

## Supported files

| Format | Notes |
|--------|-------|
| Markdown (`.md`) | Split by heading, so related sections stay together. |
| Plain text (`.txt`) | Split into readable chunks. |
| PDF (`.pdf`) | Converted to text before indexing. See below. |

## Large PDFs

A PDF is converted to text before it is indexed, which takes longer than plain markdown. The default timeout per document is five minutes, which covers most files. For a very large PDF (hundreds of pages), raise it with `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS`. The first PDF you process also warms up the converter once; if that one-time step times out on a slower machine, raise `NEOHIVE_PDF_WARMUP_TIMEOUT_MS`. Both variables are listed in [Reference](reference.md#environment-variables), and [Repository Sync Issues](troubleshooting/sync.md) has more on slow processing.

{% hint style="info" %}
Moving over a notes vault, such as Obsidian? Export it as markdown and upload the folder into a Document Index. Your agent can then recall from your notes alongside your code and your team's knowledge.
{% endhint %}
