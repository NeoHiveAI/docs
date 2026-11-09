---
description: "Which files NeoHive indexes from an upload or a repository, and the limits that apply."
---

# Supported file types

NeoHive reads files from two places: files that you upload, and repositories that you connect. Each place accepts different file types and has its own limits. Before you upload a file or add a repository, check that NeoHive can index the files.

## File uploads

When you add files with **File Upload**, NeoHive stores them in a [Files Index](../concepts/glossary.md#files-index). A Files Index accepts the following formats:

| Format | Extensions | What NeoHive reads |
|---|---|---|
| Markdown | `.md`, `.markdown` | The text. |
| Plain text | `.txt` | The text. |
| PDF | `.pdf` | The text, including the text in scanned pages and pictures. |
| Word | `.docx` | The text and tables, plus the text in pictures. |
| PowerPoint | `.pptx` | The text and tables, plus the text in pictures. |
| Excel | `.xlsx` | Each sheet, with its name and its rows. |
| Image | `.png`, `.jpg`, `.jpeg` | The text in the image. |

NeoHive reads the text in scans, pictures, and images with optical character recognition (OCR), so how much text it finds depends on how clear the text is in the image.

NeoHive refuses a file with any other extension. To index another format, export it to PDF or Markdown first.

{% hint style="warning" %}
If NeoHive finds no text in a file, it marks the file with `No text could be extracted from this document.`, followed by the common causes. The message appears when the text is too small or too faint for OCR. A PDF that draws its text as shapes instead of fonts causes the same message. To fix the problem, export the text from the app that made the file, and upload the exported text.
{% endhint %}

NeoHive allows five minutes for each conversion attempt. If a PDF fails to convert in that time, NeoHive still indexes its text, but its tables lose their structure, and the file shows a warning that starts with `Converted without layout analysis`. To give large PDFs more time, raise `NEOHIVE_DOCUMENT_TIMEOUT_MS`. For more information, see [Environment variables](environment-variables.md#installer).

### Upload limits

The following limits apply to each upload:

| Limit | Value |
|---|---|
| One file | 50 MB |
| One PDF | 500 pages |
| One image | 50,000,000 pixels. In a Word or PowerPoint file, NeoHive leaves out a larger picture and reads the rest of the file. |
| Files in one upload | 20 files, or 200 MB in total. The dashboard splits a larger selection into several uploads. |
| A file whose name is already in the [Index](../concepts/glossary.md#index) | NeoHive replaces the stored file with the new one. |

To change the page or pixel limit, see [Environment variables](environment-variables.md#server).

## Files in a repository

A repository sync reads text files, including code, Markdown, and configuration files such as `.json` or `.yaml`. The sync reads only the files that pass your [file filters](../context/repositories/file-patterns.md).

NeoHive always skips the following files, even if your file filters include them:

| Skipped | Examples |
|---|---|
| Binary and generated files | images (`.png`, `.jpg`), fonts, audio and video (`.mp3`, `.wav`, `.mp4`), archives (`.zip`, `.tar`), compiled output (`.exe`, `.dll`), databases (`.db`, `.sqlite`), data dumps such as `.parquet`, model weights, source maps, and keys and certificates |
| Lock files and system files | `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `.terraform.lock.hcl`, `.DS_Store`, `Thumbs.db` |
| Minified bundles | `*.min.js`, `*.min.css` |
| Generated and dependency folders, at any depth | `node_modules`, `.git`, `dist`, `build`, `coverage`, `vendor`, `.venv`, `venv`, `__pycache__`, `.next`, `.svelte-kit`, `.turbo`, `.nyc_output`, `obj`, `.vs` |
| Anything that looks binary | NeoHive checks each file's content, so it skips a binary file even if its extension looks like text. |

{% hint style="info" %}
Repository sync does not convert PDF, Word, PowerPoint, or Excel files, so NeoHive skips them in a repository as binary files. To make one searchable, upload it to a Files Index.
{% endhint %}
