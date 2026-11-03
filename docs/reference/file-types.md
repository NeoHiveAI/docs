---
description: "Which files NeoHive indexes from an upload or a repository, and the limits that apply."
---

# Supported file types

NeoHive reads files from two places: files that you upload, and repositories that you connect. Each place accepts different file types and has its own limits. Before you upload a file or add a repository, check that NeoHive can index it.

## File uploads

When you add files with **File Upload**, NeoHive stores them in a [Files Index](../concepts/glossary.md#files-index). File Upload accepts the following formats:

| Format | Extensions | What NeoHive reads |
|---|---|---|
| Markdown | `.md`, `.markdown` | The text. |
| Plain text | `.txt` | The text. |
| PDF | `.pdf` | The text. On a page with no text, such as a scanned page, NeoHive reads the text with optical character recognition (OCR). |
| Word | `.docx` | The text and tables, plus the text in pictures, read with OCR. |
| PowerPoint | `.pptx` | The text and tables, plus the text in pictures, read with OCR. |
| Excel | `.xlsx` | Each sheet, with its name and its rows. |
| Image | `.png`, `.jpg`, `.jpeg` | The text in the image, read with OCR. |

NeoHive refuses a file with any other extension. To index another format, export it to PDF or Markdown first.

{% hint style="warning" %}
If NeoHive finds no text in a file, it marks the file with `No text could be extracted from this document.`, followed by the common causes. This happens when the text is too small or too faint for OCR, or when a PDF draws its text as shapes instead of fonts. Export the text from the app that made the file, and upload that instead.
{% endhint %}

NeoHive allows five minutes to convert one file. If the full conversion of a PDF fails or runs out of time, NeoHive converts the PDF again without layout analysis. The PDF is then indexed with its tables flattened to text, and it shows the warning `Converted without layout analysis, so table structure was flattened to text.` To allow more time, raise `NEOHIVE_DOCUMENT_TIMEOUT_MS` as described in [Environment variables](environment-variables.md#installer).

### Upload limits

The following limits apply to each upload:

| Limit | Value |
|---|---|
| One file | 50 MB |
| One PDF | 500 pages |
| One image | 50,000,000 pixels. In a Word or PowerPoint file, NeoHive leaves out a larger picture and reads the rest of the file. |
| Files in one upload | 20 files, or 200 MB in total. The dashboard splits a larger selection into several uploads. |
| A file whose name is already in the [Index](../concepts/glossary.md#index) | NeoHive replaces the stored file with the new one. A file of a different type cannot replace it, so delete the stored file first. Markdown and plain text count as one type. |

To change the page or pixel limit, see [Environment variables](environment-variables.md#server).

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
Repository sync does not convert PDF, Word, PowerPoint, or Excel files, so NeoHive skips them in a repository as binary files. To make one searchable, upload it to a Files Index.
{% endhint %}
