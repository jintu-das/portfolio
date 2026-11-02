# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio for Jintu Das, built with Astro 7 and Tailwind CSS v4. Static output, deployed at https://jintu.netlify.app/. There is no test suite, linter, or formatter configured.

## Commands

- `npm run dev`: dev server at `localhost:4321`
- `npm run build`: production build to `./dist/`
- `npm run preview`: serve the built site locally
- `npx astro check`: type-check `.astro` files (TypeScript uses `astro/tsconfigs/strict`)

## Architecture

- `src/pages/index.astro` is the home page. It composes section components in order: Hero, Projects, Testimonial, Stacks, Contact.
- Project detail pages live in `src/pages/projects/` (currently `blockbuster.astro`). Each keeps its content in frontmatter arrays and is linked from `PROJECTS_DATA` with a same-site path such as `/projects/blockbuster/`; the project card opens same-site links in the current tab and external links in a new one.
- `src/layouts/Layout.astro` wraps every page. It takes optional `title` and `description` props (homepage copy is the default), owns the `<head>` (SEO via `astro-seo`, canonical and `og:url` built from `site` in `astro.config.mjs`, OG image, favicon), imports `global.css` and the Inter variable font, and renders a skip link, Header and Footer around `<main id="main">`.
- `astro.config.mjs` sets `trailingSlash: 'always'` to match Netlify's directory URLs, so internal links must end in `/` (the dev server 404s otherwise).
- Section content is data-driven from constants in each component's frontmatter (for example `PROJECTS_DATA` in `projects.astro`, `STACKS` in `stacks.astro`). To add a project or stack, edit the array; the matching card in `src/components/cards/` renders each item.
- Project thumbnails are imported from `src/assets/` and rendered with `astro:assets` `<Image>`. Files in `public/` (favicon, `og.png`) are served as-is.

## Styling

- Tailwind v4 is loaded through the `@tailwindcss/vite` plugin in `astro.config.mjs`. There is no `tailwind.config.js`; theme tokens live in `src/styles/global.css` under `@theme`.
- Custom tokens: `midnight` and `muted` text colors, `surface` (card background), `subtle` (badge background), `border` (aliased to `subtle`), `font-inter`. Use these rather than raw grays.
- Shared classes defined in `global.css`: `container` (an `@utility` with an 800px max width), `medium-header`, `btn`, `btn-outline`, `badge`, `badge-solid`, `badge-inverse` (for dark backgrounds), `card`. Reuse them for new sections.
- These shared classes are unlayered CSS, so they beat Tailwind utilities on conflicting properties: `badge bg-white/10` keeps the badge background. Add a variant class instead of overriding with utilities.
- Global `:focus-visible` outline (in `@layer base`, so utilities can override it) and all reduced-motion handling live in `global.css`; don't add per-element `motion-safe:` guards. External links use `target="_blank" rel="noopener noreferrer"` plus an "(opens in new tab)" label for screen readers.
