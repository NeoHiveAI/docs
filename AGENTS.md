<!-- gitbook-agent-instructions:start -->

## GitBook Documentation Editing

This repository contains documentation synced with GitBook via Git Sync.

Before editing GitBook-synced Markdown, YAML, or asset files, make sure the GitBook skill is available and up to date in your local agent environment. Prefer installing or updating it with:

```bash
npx skills add gitbookio/gitbook-skills
```

This command may add or update local agent skill files. Use them only as local agent instructions; do not commit those installed skill files or any tool-generated agent configuration unless the user explicitly asks for it.

If `npx` is unavailable, load the skill from:

https://gitbook.com/docs/skill.md

When making changes, preserve GitBook sync metadata such as frontmatter, `SUMMARY.md`, `gitbook-docs.yaml`, `.gitbook/`, and asset links unless the requested edit explicitly requires changing them.

<!-- gitbook-agent-instructions:end -->

## Writing the docs (Must Follow)

- **Follow `internal/style-guide.md` for every page under `docs/`.** It is the official style reference for the public docs, and plain English comes first. A page that ignores it reads differently from the rest of the site and has to be rewritten in review.
- **Check `internal/topic-owners.md` before you explain a topic.** If another page owns the topic, summarize it and link there. Two full explanations of one topic drift apart, and the reader cannot tell which is right.
- **Make every diagram by following `internal/diagram-guide.md`.** It holds the template, the logo, the color meanings, and the checks to run before you commit. A diagram made without it breaks the shared visual system across pages. When you change a value in that guide, update `internal/diagram-guide.svg` in the same commit, because the image shows the same values.
- **Check every product fact against the NeoHive source code in the `NeoHiveAI/MemVec` repository before you write it.** The docs describe what NeoHive does today, so a fact that only appears on the website, in a ticket, or in an older page is not confirmed. If you cannot confirm a fact, leave it out.
- **When you add a rule that other pages should follow, add it to `internal/style-guide.md` in the same change.** A rule that lives only in one page's history gets broken by the next writer, who never saw it.

## Working in this repository (Must Follow)

- **Treat this repository as the source of truth, and sync GitBook from GitHub, not the other way.** An export from the GitBook editor rewrote every folder to match the menu group names, left the old files behind as orphans, dropped an image, and stripped the language from every code fence. Before you edit, pull, and check that no GitBook commit has moved pages since your last change.
- **Update `internal/topic-owners.md` whenever you add, move, rename, or delete a page.** Then confirm that every page in `docs/SUMMARY.md` owns a row, that no row names a missing page, and that every summary page links to its owner.
- **Commit a new image in the same commit as the page that uses it, or earlier.** If the image is missing when GitBook imports the page, the image can stay broken on the site even after a later commit adds the file.
- **Keep internal docs in `internal/`, never in `docs/`.** GitBook publishes everything under `docs/` (its `.gitbook.yaml` root), so an internal note placed there goes live on the public site.
- **Never commit the ticket-prefixed working files in the repository root,** such as `HIVE-479-product-issues.md` or `refactor-docs-*.svg`. They are drafts for one piece of work, and committing them puts unreviewed notes next to the real docs.
