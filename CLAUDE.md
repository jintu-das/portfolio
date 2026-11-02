# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal portfolio for Jintu Das, built with Astro 7 and Tailwind CSS v4. Static output, deployed at https://jintu.netlify.app/. There is no test suite, linter, or formatter configured.

## Commands

- `npm run dev`: dev server at `localhost:4321`
- `npm run build`: production build to `./dist/`
- `npm run preview`: serve the built site locally
- `npx astro check`: type-check `.astro` files (TypeScript uses `astro/tsconfigs/strict`)

## Architecture

- `src/pages/index.astro` is the only page. It composes section components in order: Hero, Projects, Testimonial, Stacks, Contact.
- `src/layouts/Layout.astro` wraps every page. It owns the `<head>` (SEO via `astro-seo`, canonical URL, OG image, favicon), imports `global.css` and the Inter variable font, and renders Header and Footer around `<main>`.
- Section content is data-driven from constants in each component's frontmatter (for example `PROJECTS_DATA` in `projects.astro`, `STACKS` in `stacks.astro`). To add a project or stack, edit the array; the matching card in `src/components/cards/` renders each item.
- Project thumbnails are imported from `src/assets/` and rendered with `astro:assets` `<Image>`. Files in `public/` (favicon, `og.png`) are served as-is.

## Styling

- Tailwind v4 is loaded through the `@tailwindcss/vite` plugin in `astro.config.mjs`. There is no `tailwind.config.js`; theme tokens live in `src/styles/global.css` under `@theme`.
- Custom tokens: `midnight` and `muted` colors, `font-inter`. Use these rather than raw grays for primary/secondary text.
- Shared classes defined in `global.css`: `container` (an `@utility` with an 800px max width), `medium-header`, `btn`, `btn-outline`. Reuse them for new sections.
