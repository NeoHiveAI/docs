---
description: "Upload markdown, text, PDF, Office, and image files to a Files Index so your agent can recall them alongside your code."
---

# Add documents and images

A [Files Index](../concepts/glossary.md#files-index) holds documents that you upload, such as specs, runbooks, design docs, meeting notes, or an exported notes vault. NeoHive turns each file into text, and your agent recalls that text the same way as code. You create the Files Index once, and then add, replace, or delete its files whenever your documents change.

<figure><img src="../.gitbook/assets/context-documents.svg" alt="You upload a markdown, text, PDF, Office, or image file of up to 50 MB. The Files Index stores it in a searchable form. Your agent's memory_recall gets back the section that answers the question."><figcaption></figcaption></figure>

{% hint style="info" %}
If your documents are in a GitHub or GitLab repository, add the repository instead of uploading the files, so NeoHive keeps them in sync as they change. To add the repository, see [Add a repository](repositories/README.md).
{% endhint %}

## Create the Index

NeoHive accepts markdown, text, PDF, Word, Excel, and PowerPoint files, and PNG or JPEG images, up to 50 MB each. For more information about each format and its limits, see [Supported file types](../reference/file-types.md).

To create a Files Index, do the following:

1. In the dashboard, open your [Hive](../concepts/glossary.md#hive).
2. Click **+** next to **Indexes**.
3. Select **File Upload**.
4. Enter an **Index name** that describes the documents, for example `Engineering Docs`.
5. Click **Create Index**.

To upload files at the same time, drag them onto the **Files** drop zone, or click the drop zone to browse, before you click **Create Index**. NeoHive then fills in **Index name** from the first file, and you can change it. To upload files later, see [Manage files later](#manage-files-later).

Each file becomes searchable as soon as it finishes processing.

To help your agent choose this Index, set a **Description** on the **Index Info** tab. Name the kind of documents the Index holds. Your agent reads this description through `list_indexes`.

## Manage files later

To add more files, do the following:

1. Open the Index, and then select its **Files** tab.
2. Drag files onto the drop zone, or select the drop zone to browse.
3. Select the upload button, which shows the number of files, such as **Upload 3 files**.

The tab shows which file is processing and how much of the upload is done.

To replace a document, upload the new version with exactly the same file name. NeoHive replaces the old file and its content.

{% hint style="warning" %}
When you click the trash icon next to a file, NeoHive deletes the file and its content from the Index right away. NeoHive does not ask you to confirm.
{% endhint %}

## Large or scanned files

A large file can take more than five minutes to convert, and a scan with faint or very small text can fail with `No text could be extracted from this document`. For more information about conversion time limits and files with no readable text, see [Supported file types](../reference/file-types.md#file-uploads).
