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
| Word, PowerPoint, Excel | `.docx`, `.pptx`, `.xlsx` |
| Images, read with OCR | `.png`, `.jpg`, `.jpeg` |

The following limits apply to each upload:

| Limit | Value |
|---|---|
| One file | 50 MB |
| Pages in one PDF | 500. A longer PDF fails with `<file> has <n> pages, over the 500 page limit`. |
| Pixels in one image | 50 million. A larger image fails with `<file> has <n> pixels, over the 50000000 pixel limit`. |
| A file whose name is already in the [Index](../concepts/glossary.md#index) | NeoHive replaces the old file. The new file must be the same type, except that markdown and text files can replace each other. |

NeoHive refuses a file with any other extension, including the older `.doc`, `.ppt`, and `.xls` formats. To index an older Office file, save the file in the newer format or export the file to PDF first.

{% hint style="warning" %}
NeoHive reads scanned PDF pages and images with optical character recognition (OCR). If OCR finds no readable text, NeoHive marks the file with `No text could be extracted from this document`. A faint scan, text drawn as shapes, or small or low-contrast text can cause the error. Upload a clearer copy, or export the document's text and upload the result.
{% endhint %}

A PDF, Office, or image file that takes longer than five minutes to convert to text fails. To allow more time, raise `NEOHIVE_DOCUMENT_TIMEOUT_MS` as described in [Environment variables](environment-variables.md).

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
