# Project Starter & Style Guide

This repository is a Next.js App Router project with embedded Sanity Studio and a small Sanity-powered page CMS.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` in the repository root and add:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2026-05-22
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open the public site:
   ```txt
   http://localhost:3000
   ```
5. Open the embedded Studio:
   ```txt
   http://localhost:3000/studio
   ```

## Core Project Structure

- `src/app/`
  - `page.js` — Home page route
  - `about/page.js` — About page route
  - `blog/page.js` — Blog listing route
  - `blog/[slug]/page.js` — Blog detail route
  - `studio/[[...tool]]/page.jsx` — Embedded Sanity Studio route
- `src/components/` — Shared UI components like `Navbar`, `Footer`, and `BlogListing`
- `src/sanity/`
  - `client.js` — Sanity client setup with live draft support
  - `queries.js` — GROQ queries and fetch helpers
  - `schemaTypes/` — Sanity schema documents
  - `structure.js` — Studio content structure
  - `lib/live.js` — Next/Sanity live preview connector
- `page-build.md` — Detailed page creation reference
- `starter.md` — This quick starter and style guide

## Sanity Visual Editing Rules

To make a page editable in Studio visual editing, follow these rules:

- Create a Sanity document schema for the page.
- Register the schema in `src/sanity/schemaTypes/index.js`.
- Add a singleton Studio structure entry in `src/sanity/structure.js`.
- Define a `presentationTool.resolve` location for the page in `sanity.config.js`.
- Query the page as a singleton with `order(_updatedAt desc)[0]`.
- Use `draftMode` and `cache: "no-store"` so content updates appear in Studio preview.
- Use `SanityLive` and `VisualEditing` in `src/app/layout.js`.

## Page Pattern

Each Sanity-backed page should follow this pattern:

1. Schema in `src/sanity/schemaTypes/`
2. Export in `src/sanity/schemaTypes/index.js`
3. Query in `src/sanity/queries.js`
4. Page route in `src/app/.../page.js`
5. Fallback content in the route for non-Sanity mode

### Recommended schema shape

Most pages should start with a simple structure:

- `hero`
  - `title`
  - `subtitle`
  - `backgroundImage`
  - `primaryCta` / `secondaryCta`
- `seo`
  - `title`
  - `description`

This keeps pages easy to edit and fast to build.

## Existing Sanity Content Types

- `homePage` — Home hero, image, CTAs, and SEO
- `blogPage` — Blog listing hero content and SEO
- `aboutPage` — About hero content and SEO
- `blogPost` — Full blog posts with slug, author, cover image, category, body, and SEO
- `author` — Author profiles used by blog posts
- `cta` — Reusable call-to-action objects

## Style Guide / Conventions

- Use `export const dynamic = "force-dynamic"` for pages that need live preview and draft mode.
- Use `generateMetadata()` when page metadata should come from Sanity.
- Keep `SiteShell` wrappers inside `src/components/layout/SiteShell.jsx` and bypass them for `/studio`.
- Use `urlForImage()` from `src/sanity/image.js` for Sanity image rendering.
- Keep the Studio route outside the public shell to avoid smooth-scrolling and animation conflicts.
- Prefer clean, small schemas over large one-off page objects.

## How To Add A New Page

1. Create a new schema file under `src/sanity/schemaTypes/`.
2. Add the schema export to `src/sanity/schemaTypes/index.js`.
3. Add a document entry to `src/sanity/structure.js`.
4. Add a `presentationTool.resolve` location in `sanity.config.js`.
5. Add a GROQ singleton query and fetch helper in `src/sanity/queries.js`.
6. Create the page route under `src/app/`.
7. Add fallback content so the site still renders when Sanity is not configured.

## Developer Notes

- `src/app/layout.js` already enables draft mode visual editing.
- `src/sanity/lib/live.js` is the bridge for live updates.
- `page-build.md` contains the step-by-step flow for adding or updating pages.
- Use the Studio to create singleton documents for `homePage`, `blogPage`, and `aboutPage`.

## Presenting This Starter

If you present this as a starter project, tell them:

- It is a Next.js + Sanity starter with embedded Studio and page-level CMS.
- The page architecture is intentionally simple: one singleton document per route.
- Visual editing needs schema, structure, and preview route resolution.
- New pages should be added through schema → query → route.
- The repo already includes a home page, about page, blog listing, blog detail, and Studio.

## Quick Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

---

For more detail on page creation, see `page-build.md`.
