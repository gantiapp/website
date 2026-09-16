# Ganti website

Static brand site (Astro 7). Hardcoded pages, no API. Deployed on Netlify.

## Start locally

Requires **Node 22+** (see `.nvmrc`). With nvm:

```bash
nvm use
npm install
npm run dev
```

The dev server is at [http://localhost:4321](http://localhost:4321).

## Commands

Run these from the project root:

| Command | Action |
| --- | --- |
| `nvm use` | Switch to the Node version in `.nvmrc` |
| `npm install` | Install dependencies |
| `npm run dev` | Start the local dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

Pages live in `src/pages/` (one `.astro` file per route). Shared UI is in `src/components/`, copy in `src/data/`, tokens in `src/styles/settings/custom.css`. Static assets go in `public/`.
