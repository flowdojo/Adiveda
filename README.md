# Adiveda Practice

Adiveda Practice is a Next.js App Router site for an Ayurveda-inspired content experience. It combines a CMS-backed home page, an embedded Sanity Studio, a blog listing with filters, dynamic blog detail pages, Lenis smooth scrolling, and GSAP-powered entrance animations.

## Tech Stack

- Next.js 16 with the App Router
- React 19
- Sanity CMS and embedded Sanity Studio
- Tailwind CSS 4
- Lenis for smooth scrolling
- GSAP and ScrollTrigger for attribute-based animations
- Local brand fonts from `public/fonts`

## Features

- CMS-backed home hero with fallback content
- Embedded Studio at `/studio`
- Blog listing at `/blog` with client-side category filters
- Dynamic blog pages at `/blog/[slug]`
- Blog table of contents generated from Sanity `h2` and `h3` body blocks
- Related blog cards from the same category
- Fallback sample blog content when Sanity is not configured or has no posts
- Shared navbar, footer, button, animation, and smooth-scroll providers
- Studio route excluded from the public site shell so Studio scrolling works normally

## Getting Started

Install dependencies: 

```bash
npm install
```

Create `.env.local` in the project root when you are ready to connect Sanity:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-22
```

Run the development server:

```bash
npm run dev
```

Open the site at:

```txt
http://localhost:3000
```

Open Sanity Studio at:

```txt
http://localhost:3000/studio
```

If `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing, the website still renders using fallback content and `/studio` shows setup instructions.

## Scripts

```bash
npm run dev      # Start the Next.js development server
npm run build    # Build the production app
npm run start    # Run the production build
npm run lint     # Run ESLint
```

## Routes

- `/` - Home page with a CMS-backed hero and local image fallback
- `/about` - Static about page
- `/blog` - Blog index with category filters
- `/blog/[slug]` - Dynamic blog detail page from Sanity or sample fallback data
- `/studio` - Embedded Sanity Studio

## Project Structure

```txt
src/
  animations/
    initAnimations.js          # GSAP animation setup for fd-animate attributes
  app/
    layout.js                  # Root layout with SiteShell
    globals.css                # Tailwind theme, fonts, utilities, button styles
    page.js                    # CMS-backed home page
    about/page.js              # Static about page
    blog/page.js               # Blog listing route
    blog/[slug]/page.js        # Blog detail route
    studio/[[...tool]]/        # Embedded Sanity Studio route
  components/
    blog/BlogListing.jsx       # Client-side blog filters and cards
    layout/Navbar.jsx          # Header and mobile menu
    layout/Footer.jsx          # Site footer
    layout/SiteShell.jsx       # Lenis, animations, footer, and Studio bypass
    ui/ButtonA.jsx             # Shared button/link component
  lib/
    sampleBlogs.js             # Fallback blog posts
  providers/
    Animations.jsx             # Re-runs animations on route changes
    SmoothScrolling.jsx        # Lenis setup and scroll lock helpers
  sanity/
    client.js                  # Sanity client, disabled when project ID is absent
    env.js                     # Sanity environment defaults
    image.js                   # Sanity image URL builder
    queries.js                 # GROQ queries and fetch helpers
    schemaTypes/               # Sanity schemas
public/
  fonts/                       # Ronzino and Tiempos Headline font files
  images/home-hero-bg.png      # Home hero fallback image
```

## Sanity Content

Schema files live in `src/sanity/schemaTypes/`:

- `homePage` - home hero title, subtitle, background image, CTAs, and SEO
- `blogPost` - heading, slug, excerpt, body, cover image, date, category, author, and SEO
- `author` - author name, slug, image, and bio
- `cta` - reusable button label and link object

Queries live in `src/sanity/queries.js`. Fetch helpers return fallback-friendly values when Sanity is not configured:

- `getHomePage()` returns `null`
- `getBlogPosts()` returns `[]`
- `getBlogPost(slug)` returns `null`
- `getRelatedBlogPosts({slug, category})` returns `[]`

## Blog Workflow

Create an `Author` document first, then create a `Blog Post`.

Required blog fields:

- Heading
- Slug
- Excerpt
- Date
- Category
- Author

Recommended fields:

- Body
- Cover image and alt text
- SEO title and description

The current blog categories are:

- Ayurveda
- Rituals
- Panchang
- Wellbeing

To edit category options, update the `category` field in `src/sanity/schemaTypes/blogPost.js`.

Blog body content currently renders plain Sanity block text. `h2` and `h3` blocks are also used to build the table of contents on the blog detail page.

## Styling

The visual system is defined mostly in `src/app/globals.css`:

- Local fonts: `Ronzino` for body text and `Tiempos Headline` for headings
- Theme tokens inside `@theme`
- Layout utilities such as `.padding-global`, `.section-padding`, and `.container-xlarge`
- Typography utilities such as `.heading-h1`, `.heading-h5`, `.text-body`, and `.eyebrow`
- Button utilities: `.button-primary`, `.button-secondary`, and `.button-nav`
- Animation initial states for `fd-animate`

Tailwind theme extensions are mirrored in `tailwind.config.js` for colors, fonts, screens, radius, and spacing.

## Animations

Use the `fd-animate` attribute on elements:

```jsx
<h2 fd-animate="heading-anime">Animated heading</h2>
<div fd-animate="child-fade-up">
  <p>First child</p>
  <p>Second child</p>
</div>
```

Supported values are defined in `src/animations/initAnimations.js`:

- `fade-up`
- `fade-in-up`
- `fade-in-bottom`
- `fade-in-left`
- `fade-in-right`
- `child-fade-up`
- `child-fade-in-up`
- `child-fade-in-bottom`
- `child-fade-in-left`
- `child-fade-in-right`
- `heading-anime`

## Page Building

Use `page-build.md` for the step-by-step workflow to add a new Sanity-powered page, wire its schema, query it, render it in `src/app`, and publish content in Studio.

## Deployment

For Vercel:

1. Push the repository to GitHub.
2. Import it into Vercel.
3. Add the Sanity environment variables.
4. Deploy.

For any platform that supports Next.js:

```bash
npm run build
npm run start
```

## Git Push Commands

```bash
git status
git add -A
git commit -m "Describe your changes"
git push origin main
```
