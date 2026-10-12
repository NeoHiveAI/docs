---
description: "Which files NeoHive indexes from an upload or a repository, and the limits that apply."
---

# Supported file types

NeoHive reads files from two places: files that you upload, and repositories that you connect. Each place accepts different file types and has its own limits. Check this page before you upload a file or add a repository. The page tells you which files NeoHive can index.

## File uploads

When you add files with **File Upload**, NeoHive stores them in a [Files Index](../concepts/glossary.md#files-index). File Upload accepts the following formats:

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
NeoHive reads only the text in a PDF, not text inside images. In a PDF that has both, NeoHive indexes the text and leaves out the images, such as diagrams, screenshots, or scanned pages.

If NeoHive finds no text in the whole file, it marks the file with `No text could be extracted from this PDF`. This happens with a PDF of scanned pages, or one whose text is drawn as shapes instead of fonts. Run the PDF through optical character recognition (OCR), or export its text, and upload the result.
{% endhint %}

A PDF that takes longer than five minutes to convert fails. To allow more time, raise `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS` as described in [Environment variables](environment-variables.md#installer).

## Files in a repository

A repository sync reads text files, including code, Markdown, and configuration files such as `.json` or `.yaml`. It reads only the files that pass your [file filters](../context/repositories/file-patterns.md).

NeoHive always skips the following files, even if your file filters include them:

| Skipped | Examples |
|---|---|
| Binary and generated files | images (`.png`, `.jpg`), fonts, audio and video (`.mp3`, `.wav`, `.mp4`), archives (`.zip`, `.tar`), compiled output (`.exe`, `.dll`), databases (`.db`, `.sqlite`), data dumps such as `.parquet`, model weights, source maps, and keys and certificates |
| Lock files and system files | `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `.terraform.lock.hcl`, `.DS_Store`, `Thumbs.db` |
| Minified bundles | `*.min.js`, `*.min.css` |
| Generated and dependency folders, at any depth | `node_modules`, `.git`, `dist`, `build`, `coverage`, `vendor`, `.venv`, `venv`, `__pycache__`, `.next`, `.svelte-kit`, `.turbo`, `.nyc_output`, `obj`, `.vs` |
| Anything that looks binary | NeoHive checks each file's content, so it skips a binary file even if its extension looks like text. |

{% hint style="info" %}
Repository sync does not convert PDFs, so NeoHive skips a PDF in a repository as a binary file. To make the PDF searchable, upload it to a Files Index.
{% endhint %}
