# adiveda-practice

A modern Next.js project with Sanity CMS, smooth scrolling, GSAP-ready animations, responsive Tailwind CSS styling, and reusable layout primitives.

## Features

- Smooth scrolling with Lenis
- GSAP-ready animation setup
- Mobile-first Tailwind CSS 4 styling
- Next.js 16 and React 19
- Sanity Studio embedded at `/studio`
- CMS-backed home page and blog system
- Blog listing with category filters
- Dynamic blog detail pages created from Sanity slugs
- Reusable Navbar, Footer, BlogListing, and Button components
- Home, About, Blog, and Studio routes

## Getting Started

Install dependencies:
```bash
npm install
```

Create local env config only if needed:
```bash
cp .env.example .env.local
```

Add Sanity values to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-22
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.
Open [http://localhost:3000/studio](http://localhost:3000/studio) to edit Sanity content.

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Git Push Commands

Use these when you want to save local changes and push them to GitHub:

```bash
git status
git add -A
git commit -m "Describe your changes"
git push origin main
```

If you are on another branch, check the branch name:

```bash
git branch --show-current
```

Then push that branch:

```bash
git push origin your-branch-name
```

## Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout with SiteShell
│   ├── page.js                # CMS-backed home page
│   ├── globals.css            # Global styles and Tailwind directives
│   ├── about/page.js          # About page
│   ├── blog/page.js           # Blog listing with filters
│   ├── blog/[slug]/page.js    # Dynamic Sanity blog page
│   └── studio/                # Embedded Sanity Studio
├── components/
│   ├── blog/
│   │   └── BlogListing.jsx    # Client-side blog category filters
│   ├── layout/
│   │   ├── Navbar.jsx         # Navigation with mobile menu
│   │   ├── Footer.jsx         # Footer component
│   │   └── SiteShell.jsx      # Skips Lenis/Footer on /studio
│   └── ui/
│       └── ButtonA.jsx        # Shared button/link component
├── sanity/
│   ├── client.js              # Sanity client
│   ├── queries.js             # GROQ queries
│   └── schemaTypes/           # Sanity schemas
├── lib/
│   └── sampleBlogs.js         # Fallback sample blog content
├── providers/
│   ├── Animations.jsx         # Animation provider
│   └── SmoothScrolling.jsx    # Lenis smooth scroll provider
└── animations/
    └── initAnimations.js      # GSAP animation setup
```

## Pages

- `/` - Home page with hero section
- `/about` - About page
- `/blog` - Blog listing with category filters
- `/blog/[slug]` - Blog detail page generated from Sanity post slugs
- `/studio` - Sanity Studio

## Sanity Content

Schemas live in `src/sanity/schemaTypes/`:

- `homePage` - home hero content and SEO
- `blogPost` - heading, slug, excerpt, body, cover image, date, category, author, SEO
- `author` - author name, slug, image, and bio
- `cta` - reusable button label/link object

Queries live in `src/sanity/queries.js`.

Published blog posts create pages automatically from their slug:

```txt
/blog/my-post-slug
```

Blog detail pages include:

- Heading
- Date
- Category
- Author name and image
- Body content
- Table of contents from `h2` and `h3` body headings
- Related blogs from the same category

See `page-guide.md` for the step-by-step page creation tutorial.

## Components

### Navbar

```jsx
import Navbar from "@/components/layout/Navbar";

export default function Page() {
  return <Navbar />;
}
```

The root layout already includes `Footer`, so pages only need to render their page-specific content and any page-level navigation.

### BlogListing

`BlogListing` renders the blog cards and category filters. It is used by `src/app/blog/page.js`.

## Global Utilities

- `.section-padding` - Vertical padding for sections
- `.padding-global` - Horizontal padding
- `.container-{size}` - Responsive max-width containers
- `.heading-{h1-h6}` - Predefined heading styles
- `.text-body` - Body text styling
- `.eyebrow` - Small uppercase label
- `.button-primary` / `.button-secondary` - Button styles

<details>
<summary>Setup And Configuration</summary>

### Environment Variables

Create `.env.local` with the Sanity values:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-22
```

### Tailwind

Tailwind CSS 4 is configured through:

- `src/app/globals.css` for `@theme`, custom utilities, resets, and Lenis styles
- `tailwind.config.js` for colors, fonts, breakpoints, radius, and spacing
- `postcss.config.mjs` for the Tailwind PostCSS plugin

### Smooth Scrolling

Lenis is configured in `src/providers/SmoothScrolling.jsx` with:

- `lerp: 0.08`
- `smoothTouch: false`
- `normalizeWheel: true`
- `window.lenisCustomStart()`
- `window.lenisCustomStop()`

### Animations

GSAP animation setup lives in `src/animations/initAnimations.js`. Add `fd-animate` attributes to elements when wiring scroll or entrance animations.

</details>

<details>
<summary>Styling Guide</summary>

### Theme Variables

Edit in `src/app/globals.css` under `@theme`:

```css
@theme {
  --color-primary: #890808;
  --color-secondary: #c24a00;
  --color-background: #fcf6f6;
  --color-background-secondary: #f6f1e7;
  --color-background-tertiary: var(--color-primary);
  --color-text-dark: #000000;
  --color-text-light: #ffffff;
  --color-foreground: var(--color-text-dark);
  --font-heading: "Arial", "Helvetica", sans-serif;
  --radius-default: 1rem;
}
```

### Typography

```jsx
<h1 className="heading-h1">Main Title</h1>
<h2 className="heading-h2">Section Title</h2>
<p className="text-body">Regular paragraph</p>
<p className="eyebrow">Small uppercase label</p>
```

### Layout

```jsx
<section className="section-padding">
  <div className="padding-global">
    <div className="container-xlarge">Content</div>
  </div>
</section>
```

### Buttons

```jsx
<button className="button-primary">Primary Button</button>
<button className="button-secondary">Secondary Button</button>
```

### Best Practices

- Use Tailwind utilities first for one-off layout and spacing.
- Use semantic color classes like `bg-primary`, `bg-secondary`, `bg-background-secondary`, `bg-tertiary`, `text-dark`, and `text-light`.
- Add reusable composed classes in `globals.css` with `@apply` only when the pattern repeats.
- Keep new design tokens mirrored between `@theme` in `globals.css` and `theme.extend` in `tailwind.config.js`.

</details>

<details>
<summary>Deployment</summary>

### Vercel

1. Push code to GitHub.
2. Connect the repository to Vercel.
3. Add any required environment variables in the Vercel dashboard.
4. Deploy automatically on push.

```bash
vercel deploy
```

### Other Platforms

Build and start the production server:

```bash
npm run build
npm run start
```

</details>

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lenis Documentation](https://lenis.studiofreight.com/)
- [GSAP Documentation](https://gsap.com/docs/)
