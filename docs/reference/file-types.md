---
description: "Which files NeoHive indexes from an upload or a repository, and the limits that apply."
---

# Supported file types

NeoHive reads files from two places: uploads to a [Files Index](../concepts/glossary.md#files-index), and repositories that you connect. Each place accepts different file types and has its own limits. Check this page before you upload a file or add a repository. The page tells you which files NeoHive can index.

## Uploads to a Files Index

A Files Index holds the files you upload. A Files Index accepts the following formats:

| Format | Extensions |
|---|---|
| Markdown | `.md`, `.markdown` |
| Plain text | `.txt` |
| PDF | `.pdf` |

The following limits apply to each upload:

| Limit | Value |
|---|---|
| One file | 10 MB |
| Files in one upload | 20 |
| A file whose name is already in the [Index](../concepts/glossary.md#index) | NeoHive skips the file and shows `<name> already exists, skipped`. |

NeoHive refuses a file with any other extension. To index a Word document or a slide deck, export it to PDF or Markdown first.

{% hint style="warning" %}
A PDF of scanned pages, or one whose text is drawn as shapes instead of fonts, has no text to extract. NeoHive marks the file with `No text could be extracted from this PDF`. Run the PDF through optical character recognition (OCR), or export its text, and upload the result.
{% endhint %}

A PDF that takes longer than five minutes to convert fails. To allow more time, raise `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS` as described in [Environment variables](environment-variables.md).

## Files in a repository

A repository sync reads every text file that passes your file filters, including code, Markdown, and configuration files such as `.json` or `.yaml`.

NeoHive always skips the following files, whatever your filters say:

| Skipped | Examples |
|---|---|
| Binary and generated files | images, fonts, audio, video, archives, compiled output, databases, data dumps such as `.parquet`, model weights, source maps, and keys and certificates |
| Lock files and system files | `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `.terraform.lock.hcl`, `.DS_Store`, `Thumbs.db` |
| Minified bundles | `*.min.js`, `*.min.css` |
| Generated and dependency folders, at any depth | `node_modules`, `.git`, `dist`, `build`, `coverage`, `vendor`, `.venv`, `venv`, `__pycache__`, `.next`, `.svelte-kit`, `.turbo`, `.nyc_output`, `obj`, `.vs` |
| Anything that looks binary | NeoHive checks the content, whatever the extension. |

{% hint style="info" %}
Repository sync does not convert PDFs, so NeoHive skips a PDF in a repository as a binary file. To make the PDF searchable, upload it to a Files Index.
{% endhint %}
