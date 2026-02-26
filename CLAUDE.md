# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static documentation site for robotics tutorials built with Next.js 15 (App Router), Fumadocs, and Code Hike. Deployed to GitHub Pages as a fully static export.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Build static site (output to `out/`)
- `npx fumadocs-mdx` — Regenerate `.source/` directory (runs automatically on `npm install`)

No test or lint scripts are configured.

## Architecture

### Content Pipeline

MDX files in `content/docs/` → processed by fumadocs-mdx + Code Hike plugins → static HTML pages. Page ordering is controlled by `content/docs/meta.json`. Frontmatter fields: `title`, `description`, `full`, `banner`.

### Routing

- `/` — Home page (route group `app/(home)/`)
- `/docs/[...slug]` — Docs pages with catch-all dynamic routing, uses `generateStaticParams()` for static generation
- `/api/search` — Static search endpoint

### Key Files

- `source.config.ts` — Fumadocs collection definition + Code Hike plugin config (remarkCodeHike, recmaCodeHike)
- `lib/source.ts` — Fumadocs source loader
- `app/layout.config.tsx` — Shared navigation config (sidebar, links)
- `next.config.mjs` — MDX integration, `output: "export"`, conditional `basePath: "/Next-Docs"` for GitHub Actions

### Custom Components

- `components/scrollycoding.tsx` — Interactive stepped tutorial with synchronized code/image previews (uses `codehike/utils/selection`)
- `components/header.tsx` — MDX block component with title, children, and optional image zoom
- `components/annotations/` — Code Hike annotation handlers (callout, token transitions, word wrap)

### GitHub Pages Deployment

The deploy workflow (`.github/workflows/deploy.yml`) builds with `NEXT_PUBLIC_GITHUB_ACTIONS=true` which sets `basePath: "/Next-Docs"` and `trailingSlash: true`. The `out/` directory is deployed to Pages.

## Conventions

- TypeScript strict mode, path alias `@/*` maps to project root
- Server Components by default; client components explicitly marked
- Tailwind CSS with Fumadocs UI preset (classes prefixed `fd-*`)
- Images in `public/`, referenced with basePath awareness for GitHub Pages compatibility
- Auto-generated `.source/` directory is gitignored — do not edit manually
