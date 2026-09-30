---
description: "Which files NeoHive indexes from an upload or a repository, and the limits that apply."
---

# Supported file types

Check whether NeoHive can index a file before you upload it or add its repository.

## Uploads to a Files index

| Format | Extensions | How it is split |
|---|---|---|
| Markdown | `.md`, `.markdown` | By heading, so each section stays with its heading. |
| Plain text | `.txt` | The same way as markdown. |
| PDF | `.pdf` | Converted to markdown, then split by heading. |

| Limit | Value |
|---|---|
| One file | 10 MB |
| Files in one upload | 20 |
| A file whose name is already in the index | Skipped with `<name> already exists, skipped` |

Any other extension is refused. To index a Word document or a slide deck, export it to PDF or markdown first.

{% hint style="warning" %}
A PDF of scanned pages, or one whose text is drawn as shapes instead of fonts, has no text to extract. NeoHive marks it `No text could be extracted from this PDF`. Run it through OCR, or export the text, and upload that.
{% endhint %}

A PDF that takes longer than five minutes to convert fails. Raise `NEOHIVE_PDF_BRIDGE_TIMEOUT_MS` as shown in [Environment variables](environment-variables.md).

## Files in a repository

A repository sync reads every text file that passes your file filters. Code in the languages below is split along functions and classes, so a result is a whole unit of code. Other text files, such as `.json` or `.yaml`, are split into chunks of readable size.

| Language | Extensions |
|---|---|
| TypeScript | `.ts`, `.tsx` |
| JavaScript | `.js`, `.jsx` |
| Python | `.py` |
| Java | `.java` |
| Go | `.go` |
| Ruby | `.rb` |
| Rust | `.rs` |
| C++ and C headers | `.cpp`, `.cc`, `.hpp`, `.h` |
| PHP | `.php` |
| Scala | `.scala` |
| Swift | `.swift` |
| Starlang | `.star`, `.starlang` |
| Markdown and text | `.md`, `.markdown`, `.txt` (split by heading) |

These are always skipped, whatever your filters say:

| Skipped | Examples |
|---|---|
| Binary and generated files | images, fonts, audio, video, archives, compiled output, databases, data dumps such as `.parquet`, model weights, source maps, keys and certificates |
| Lock files and system files | `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `.terraform.lock.hcl`, `.DS_Store`, `Thumbs.db` |
| Minified bundles | `*.min.js`, `*.min.css` |
| Generated and dependency folders, at any depth | `node_modules`, `.git`, `dist`, `build`, `coverage`, `vendor`, `.venv`, `venv`, `__pycache__`, `.next`, `.svelte-kit`, `.turbo`, `.nyc_output`, `obj`, `.vs` |
| Anything that looks binary | Checked by content, whatever the extension |

{% hint style="info" %}
Repository sync does not convert PDFs, so a PDF in a repository is skipped as binary. To make it searchable, upload it to a Files index.
{% endhint %}

## Next step

See [File pattern syntax](file-patterns.md) to narrow a repository further.
