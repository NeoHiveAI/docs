# NeoHive Docs

Source for the NeoHive documentation site, built with [Astro Starlight](https://starlight.astro.build) and self-hosted on GitHub Pages.

Documentation content lives in `src/content/docs/` as Markdown/MDX. Navigation is configured in `astro.config.mjs`.

## Develop

Node.js 22.12 or newer is required (Astro 6). CI uses Node 22 LTS; locally, run `nvm use 22` (or equivalent) if your default Node is older.

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build the static site to `dist/` |
| `npm run preview` | Preview the production build locally |

## Writing docs

- Add a `.md` or `.mdx` file under `src/content/docs/`. Every page needs frontmatter with at least a `title`.
- Add the page to the `sidebar` array in `astro.config.mjs` so it appears in the navigation.
- To use components such as `<Tabs>` / `<TabItem>` (from `@astrojs/starlight/components`), give the page the `.mdx` extension.

## Deployment

Pushing to the `self-hosted` branch triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes it to GitHub Pages.

One-time setup:

1. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. The custom domain is configured via [`public/CNAME`](public/CNAME) (`docs.neohive.ai`). Point a DNS `CNAME` record for that subdomain at `neohiveai.github.io`, then enable **Enforce HTTPS** in Settings → Pages.
