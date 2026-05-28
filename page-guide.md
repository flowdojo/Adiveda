# Sanity Page Guide

This guide shows the easiest repeatable way to add a new Sanity-powered page to this project.

Use the Home Page setup as the example:

- Schemas live in `src/sanity/schemaTypes/`
- Queries live in `src/sanity/queries.js`
- Next pages live in `src/app/`
- Sanity Studio is at `/studio`
- Blog pages are created from Sanity post slugs at `/blog/[slug]`

## 1. Decide The Page Fields

Start simple. Most pages need:

- A page title
- A hero subtitle
- A hero image
- One or two buttons
- SEO title and description

For example, an About page could have:

```txt
title
subtitle
image
primaryCta
seo.title
seo.description
```

## 2. Create The Schema File

Create a file in `src/sanity/schemaTypes/`.

Example: `src/sanity/schemaTypes/aboutPage.js`

```js
import {defineField, defineType} from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    {
      name: "hero",
      title: "Hero",
      default: true,
    },
    {
      name: "seo",
      title: "SEO",
    },
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
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Describe the image for accessibility.",
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
      media: "hero.image",
    },
    prepare({title, media}) {
      return {
        title: "About Page",
        subtitle: title,
        media,
      };
    },
  },
});
```

## 3. Export The Schema

Open `src/sanity/schemaTypes/index.js`.

Import the new schema:

```js
import {aboutPage} from "./aboutPage";
```

Add it to `schemaTypes`:

```js
export const schemaTypes = [cta, homePage, aboutPage];
```

Restart the dev server after changing schemas:

```bash
npm run dev
```

## 4. Add A Query

Open `src/sanity/queries.js`.

Add a query for the new page:

```js
export const aboutPageQuery = defineQuery(`*[_type == "aboutPage"] | order(_updatedAt desc)[0]{
  "title": hero.title,
  "subtitle": hero.subtitle,
  "image": hero.image,
  "imageAlt": coalesce(hero.image.alt, "About image"),
  "primaryCta": hero.primaryCta,
  seo
}`);

export async function getAboutPage() {
  if (!client) {
    return null;
  }

  return client.fetch(aboutPageQuery, {}, {cache: "no-store"});
}
```

`cache: "no-store"` makes published Sanity changes show up immediately in development.

## 5. Use The Query In A Next Page

Example: `src/app/about/page.js`

```js
import Image from "next/image";
import ButtonA from "@/components/ui/ButtonA";
import {getAboutPage} from "@/sanity/queries";
import {urlForImage} from "@/sanity/image";

export const dynamic = "force-dynamic";

const fallbackPage = {
  title: "About Adiveda",
  subtitle: "A simple fallback shown if Sanity has no content yet.",
  imageAlt: "About image",
  primaryCta: {
    label: "Get Started",
    href: "#",
  },
};

export default async function AboutPage() {
  const page = (await getAboutPage()) || fallbackPage;
  const imageUrl = urlForImage(page.image)?.width(1600).height(1000).url();

  return (
    <main>
      <section className="section-padding">
        <div className="padding-global">
          <div className="container-xlarge grid gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <h1 className="heading-h1">{page.title}</h1>
              <p className="text-body">{page.subtitle}</p>
              <ButtonA
                href={page.primaryCta?.href || "#"}
                text={page.primaryCta?.label || "Get Started"}
              />
            </div>

            {imageUrl ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={imageUrl}
                  alt={page.imageAlt || "About image"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
```

## 6. Add Content In Studio

Open:

```txt
http://localhost:3000/studio
```

Then:

1. Click the new page type, for example `About Page`.
2. Click `Create`.
3. Fill the Hero fields.
4. Fill SEO if needed.
5. Click `Publish`.
6. Refresh the website page.

## 7. Basic Field Types

Use these often:

```js
// Short text
defineField({
  name: "title",
  title: "Title",
  type: "string",
})

// Longer text
defineField({
  name: "description",
  title: "Description",
  type: "text",
  rows: 3,
})

// Image with alt text
defineField({
  name: "image",
  title: "Image",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
    }),
  ],
})

// Reusable CTA object
defineField({
  name: "primaryCta",
  title: "Primary CTA",
  type: "cta",
})
```

## 8. Reusable CTA Schema

This project already has a reusable CTA object in `src/sanity/schemaTypes/cta.js`.

Use it whenever you need a button:

```js
defineField({
  name: "primaryCta",
  title: "Primary CTA",
  type: "cta",
})
```

In the page component:

```jsx
<ButtonA
  href={page.primaryCta?.href || "#"}
  text={page.primaryCta?.label || "Learn More"}
/>
```

## 9. Good Naming Rules

Keep names simple:

- Schema file: `aboutPage.js`
- Schema name: `aboutPage`
- Query name: `aboutPageQuery`
- Fetch function: `getAboutPage`
- Route file: `src/app/about/page.js`

For services:

- `servicesPage.js`
- `servicesPage`
- `getServicesPage`
- `src/app/services/page.js`

## 10. Troubleshooting

### I changed schema but Studio did not update

Restart the dev server:

```bash
npm run dev
```

### I published in Sanity but the website did not update

Make sure the page has:

```js
export const dynamic = "force-dynamic";
```

And the query fetch uses:

```js
return client.fetch(query, {}, {cache: "no-store"});
```

### Images from Sanity do not show

Make sure `next.config.mjs` allows Sanity images:

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

### Studio fields are cut off or not scrollable

Studio should not be wrapped in the site smooth-scroll provider. This project skips the site shell on `/studio` using `src/components/layout/SiteShell.jsx`.

### The page is blank

Check these first:

1. Is the Sanity document published?
2. Is the schema exported in `schemaTypes/index.js`?
3. Does the query use the correct `_type`?
4. Does `.env.local` have the correct project ID and dataset?

## 11. Quick Checklist

When creating a new CMS page:

1. Create schema file in `src/sanity/schemaTypes/`.
2. Export it from `src/sanity/schemaTypes/index.js`.
3. Add a query and fetch function in `src/sanity/queries.js`.
4. Create or update the route in `src/app/`.
5. Add fallback content in the page component.
6. Restart `npm run dev`.
7. Create and publish the document in `/studio`.
8. Refresh the website page.

## 12. Blog Pages

The blog system is already wired up.

Files:

- Blog schema: `src/sanity/schemaTypes/blogPost.js`
- Author schema: `src/sanity/schemaTypes/author.js`
- Blog queries: `src/sanity/queries.js`
- Blog listing route: `src/app/blog/page.js`
- Blog detail route: `src/app/blog/[slug]/page.js`
- Blog filters: `src/components/blog/BlogListing.jsx`
- Fallback posts: `src/lib/sampleBlogs.js`

### Create A Blog Author

In `/studio`:

1. Open `Author`.
2. Create an author.
3. Add name, slug, image, and bio.
4. Publish.

### Create A Blog Post

In `/studio`:

1. Open `Blog Post`.
2. Create a post.
3. Add the heading.
4. Generate the slug from the heading.
5. Add excerpt, body, cover image, date, category, and author.
6. Publish.

The page is created automatically from the slug:

```txt
/blog/your-post-slug
```

### Blog Listing Filters

The `/blog` page gets categories from the published blog posts.

The current schema category options are:

- Ayurveda
- Rituals
- Panchang
- Wellbeing

To add or rename categories, edit the `category` field in:

```txt
src/sanity/schemaTypes/blogPost.js
```

### Blog Inner Page TOC

The blog detail page creates a table of contents from body headings.

Use these heading styles in the Sanity body editor:

- `h2` for main sections
- `h3` for sub-sections

Normal paragraphs do not appear in the table of contents.

### Related Blogs

Related blogs are fetched from the same category as the current post.

If Sanity has no related posts yet, the site falls back to `src/lib/sampleBlogs.js`.

### Important Blog Fields

Required fields:

- Heading
- Slug
- Excerpt
- Date
- Category
- Author

Recommended fields:

- Body
- Cover image
- Cover image alt text
- SEO title
- SEO description

### Add A New Blog Body Field

The current body supports Sanity block content:

```js
defineField({
  name: "body",
  title: "Body",
  type: "array",
  of: [
    {
      type: "block",
    },
  ],
})
```

If you add custom body types like images, quotes, or callouts, also update the renderer in:

```txt
src/app/blog/[slug]/page.js
```
