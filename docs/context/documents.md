---
description: "Upload markdown, text, and PDF files to a Files Index so your agent can recall them alongside your code."
---

# Add documents and PDFs

Create a Files Index, drop your documents in, and your agent recalls them the same way it recalls code.

<figure><img src="../.gitbook/assets/context-documents.svg" alt="You upload a .md, .markdown, .txt or .pdf file of up to 10 MB. A PDF is first converted to text, which takes longer. The Files Index splits the text into sections, markdown at its headings, and embeds each one. Your agent's memory_recall gets back the section that answers the question."><figcaption></figcaption></figure>

Use a Files Index for specs, runbooks, design docs, meeting notes, or an exported notes vault. For markdown that already lives in a repository, add a Documentation Index instead so it stays in sync; see [What to add, and where](what-to-add.md).

{% stepper %}
{% step %}
## Create the Index

Open your Hive at `http://localhost:3577`, click **+** next to **Indexes**, and choose **File Upload**.
{% endstep %}

{% step %}
## Add files

Drag files onto the **Files** drop zone, up to 20 at a time. They upload once the Index exists. You can also skip this and upload later.

Accepted: `.md`, `.markdown`, `.txt`, and `.pdf`, up to 10 MB each. See [Supported file types](../reference/file-types.md).
{% endstep %}

{% step %}
## Name it and create it

**Index name** fills in from the first file. Rename it to say what the documents are, such as `Engineering Docs`, and click **Create Index**.
{% endstep %}
{% endstepper %}

Each file is searchable as soon as it finishes processing. Then set a **Description** on the **Index Info** tab that names the kind of documents it holds, because your agent reads it through `list_indexes`.

## Manage files later

Open the Index and choose its **Files** tab. Drop more files on it at any time; the tab shows which file is processing and how far along it is. Deleting a file removes its content from the Index.

A file with the same name as one already in the Index is skipped with a warning. To replace a document, delete the old file first, then upload the new one.

{% hint style="info" %}
Moving an Obsidian or similar notes vault? Export it as markdown and upload the files.
{% endhint %}

## Large PDFs

Each PDF gets five minutes to convert by default. A 900-page PDF can need 25 to 30 minutes. Raise the limit, in milliseconds, when you run the installer:

```bash
NEOHIVE_PDF_BRIDGE_TIMEOUT_MS=1800000 \
  bash <(curl -fsSL https://raw.githubusercontent.com/NeoHiveAI/install/main/install.sh)
```

The first PDF on a new machine also downloads the converter's model. If that step times out, raise `NEOHIVE_PDF_WARMUP_TIMEOUT_MS` the same way. See [Environment variables](../reference/environment-variables.md).

A scanned PDF, or one that draws its text as shapes, fails with `No text could be extracted from this PDF`.

## Next step

Your documents are in. Continue to [Capture team knowledge](team-knowledge.md) to see how your agent adds what it learns.
