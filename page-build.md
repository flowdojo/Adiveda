# Page Build Guide

This guide documents the repeatable way to add or update pages in this project after the current Sanity, App Router, Lenis, GSAP, and Tailwind setup.

## Existing Page Map

- Home: `src/app/page.js`
- About: `src/app/about/page.js`
- Blog listing: `src/app/blog/page.js`
- Blog detail: `src/app/blog/[slug]/page.js`
- Studio: `src/app/studio/[[...tool]]/page.jsx`

The root layout wraps public pages with `SiteShell`, which adds Lenis smooth scrolling, GSAP animations, and the footer. `SiteShell` skips those wrappers for `/studio`.

## Add A Sanity-Powered Page

### 1. Choose The Fields

Most CMS pages should start with a small, stable shape:

```txt
hero.title
hero.subtitle
hero.backgroundImage
hero.primaryCta
seo.title
seo.description
```

Add more fields only when the page design needs them.

### 2. Create The Schema

Create a schema file in `src/sanity/schemaTypes/`.

Example: `src/sanity/schemaTypes/servicesPage.js`

```js
import {defineField, defineType} from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  groups: [
    {name: "hero", title: "Hero", default: true},
    {name: "seo", title: "SEO"},
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required().max(220),
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: {hotspot: true},
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "primaryCta",
          title: "Primary CTA",
          type: "cta",
          initialValue: {
            label: "Learn More",
            href: "#",
          },
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          title: "Meta Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "hero.title",
      media: "hero.backgroundImage",
    },
    prepare({title, media}) {
      return {
        title: "Services Page",
        subtitle: title,
        media,
      };
    },
  },
});
```

### 3. Export The Schema

Update `src/sanity/schemaTypes/index.js`:

```js
import {author} from "./author";
import {blogPost} from "./blogPost";
import {cta} from "./cta";
import {homePage} from "./homePage";
import {servicesPage} from "./servicesPage";

export const schemaTypes = [cta, author, blogPost, homePage, servicesPage];
```

Restart the dev server after changing schemas:

```bash
npm run dev
```

### 4. Add A Query

Add a query and fetch helper to `src/sanity/queries.js`:

```js
export const servicesPageQuery = defineQuery(`*[_type == "servicesPage"] | order(_updatedAt desc)[0]{
  "heroTitle": hero.title,
  "heroSubtitle": hero.subtitle,
  "heroImage": hero.backgroundImage,
  "heroImageAlt": coalesce(hero.backgroundImage.alt, "Services image"),
  "primaryCta": hero.primaryCta,
  seo
}`);

export async function getServicesPage() {
  if (!client) {
    return null;
  }

  return client.fetch(servicesPageQuery, {}, {cache: "no-store"});
}
```

Use `cache: "no-store"` when you want Studio changes to appear immediately during development.

### 5. Create The App Route

Create `src/app/services/page.js`:

```jsx
import Image from "next/image";

import Navbar from "@/components/layout/Navbar";
import ButtonA from "@/components/ui/ButtonA";
import {urlForImage} from "@/sanity/image";
import {getServicesPage} from "@/sanity/queries";

export const dynamic = "force-dynamic";

const fallbackPage = {
  heroTitle: "Services",
  heroSubtitle: "A simple fallback shown until Sanity content is published.",
  heroImageAlt: "Services image",
  primaryCta: {
    label: "Learn More",
    href: "#",
  },
};

export async function generateMetadata() {
  const page = await getServicesPage();

  return {
    title: page?.seo?.title || "Services - Adiveda",
    description: page?.seo?.description || fallbackPage.heroSubtitle,
  };
}

export default async function ServicesPage() {
  const page = (await getServicesPage()) || fallbackPage;
  const imageUrl = urlForImage(page.heroImage)?.width(1800).height(1000).url();

  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="section-padding pt-40">
          <div className="padding-global">
            <div className="container-xlarge grid gap-10 md:grid-cols-2">
              <div className="space-y-6">
                <p className="eyebrow text-primary">Services</p>
                <h1 className="heading-h1">{page.heroTitle}</h1>
                <p className="text-body text-foreground/75">{page.heroSubtitle}</p>
                <ButtonA
                  href={page.primaryCta?.href || "#"}
                  text={page.primaryCta?.label || "Learn More"}
                />
              </div>

              {imageUrl ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-background-secondary">
                  <Image
                    src={imageUrl}
                    alt={page.heroImageAlt || "Services image"}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
```

### 6. Add Navigation When Needed

Update `navItems` in `src/components/layout/Navbar.jsx`:

```js
const navItems = [
  {href: "#offerings", label: "Offerings"},
  {href: "/about", label: "Adiveda"},
  {href: "/services", label: "Services"},
  {href: "/blog", label: "Blog"},
];
```

Update footer links in `src/components/layout/Footer.jsx` if the new page belongs in the footer.

### 7. Publish Content In Studio

Open:

```txt
http://localhost:3000/studio
```

Then create the new page document, fill the fields, and click `Publish`.

## Add A Static Page

For a page that does not need Sanity:

1. Create a route folder under `src/app`, such as `src/app/contact/page.js`.
2. Export page metadata.
3. Render `Navbar` at the top of the page.
4. Use the global layout utilities from `globals.css`.
5. Add a navbar or footer link only if the route should be discoverable.

Example:

```jsx
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Contact - Adiveda",
  description: "Contact Adiveda.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        <section className="section-padding pt-40">
          <div className="padding-global">
            <div className="container-small space-y-5 text-center">
              <p className="eyebrow text-primary">Contact</p>
              <h1 className="heading-h1">Contact</h1>
              <p className="text-body text-foreground/75">
                Add contact content here.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
```

## Blog Pages

The blog system is already wired:

- Schema: `src/sanity/schemaTypes/blogPost.js`
- Author schema: `src/sanity/schemaTypes/author.js`
- Queries: `src/sanity/queries.js`
- Listing page: `src/app/blog/page.js`
- Detail page: `src/app/blog/[slug]/page.js`
- Listing UI: `src/components/blog/BlogListing.jsx`
- Fallback content: `src/lib/sampleBlogs.js`

To create a blog post:

1. Create or select an `Author`.
2. Create a `Blog Post`.
3. Fill Heading, Slug, Excerpt, Body, Cover Image, Date, Category, and Author.
4. Add SEO fields if needed.
5. Publish.

The route is created from the slug:

```txt
/blog/your-post-slug
```

The blog detail page builds its table of contents from `h2` and `h3` body blocks. If you add custom body types such as images, quotes, or callouts, update the renderer in `src/app/blog/[slug]/page.js`.

## Styling Checklist

Use these utilities before creating new global classes:

- `.padding-global`
- `.section-padding`
- `.container-small`
- `.container-medium`
- `.container-large`
- `.container-xlarge`
- `.heading-h1` through `.heading-h6`
- `.text-body`
- `.eyebrow`
- `.button-primary`
- `.button-secondary`
- `.button-nav`

Use semantic color classes where possible:

- `bg-background`
- `bg-background-secondary`
- `bg-primary`
- `bg-secondary`
- `text-foreground`
- `text-primary`
- `text-light`

## Animation Checklist

Add animation attributes directly to rendered elements:

```jsx
<div fd-animate="fade-up">Content</div>
<div fd-animate="child-fade-up">
  <article>First card</article>
  <article>Second card</article>
</div>
```

Animations are initialized in `src/providers/Animations.jsx` and implemented in `src/animations/initAnimations.js`.

## Troubleshooting

### Studio Does Not Show The New Schema

Restart the dev server:

```bash
npm run dev
```

Check that the schema is imported and included in `schemaTypes`.

### The Website Does Not Show Published Sanity Content

Check `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-22
```

Also check that the page uses:

```js
export const dynamic = "force-dynamic";
```

And that the fetch helper uses:

```js
return client.fetch(query, {}, {cache: "no-store"});
```

### Sanity Images Do Not Render

Sanity image URLs are allowed in `next.config.mjs`:

```js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
```

Make sure the image field exists in the query and is passed through `urlForImage`.

### Studio Scrolling Feels Broken

Studio should stay outside Lenis. This project handles that in `src/components/layout/SiteShell.jsx` by returning plain children for routes beginning with `/studio`.

### A Page Is Blank

Check these first:

1. The Sanity document is published.
2. The schema `_type` matches the query.
3. The schema is exported in `src/sanity/schemaTypes/index.js`.
4. The page has fallback content for missing Sanity data.
5. `.env.local` has the correct Sanity project ID and dataset.

## Quick Build Checklist

1. Add or update the schema.
2. Export it from `src/sanity/schemaTypes/index.js`.
3. Add a query and fetch helper in `src/sanity/queries.js`.
4. Create or update the route in `src/app`.
5. Add fallback content.
6. Add metadata.
7. Add navigation or footer links if needed.
8. Restart the dev server.
9. Create and publish content in `/studio`.
10. Run `npm run lint` before committing.
