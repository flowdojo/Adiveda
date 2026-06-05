import {defineQuery} from "next-sanity";
import {draftMode} from "next/headers";

import {client} from "./client";

async function getFetchOptions() {
  const {isEnabled: isDraftMode} = await draftMode();
  const token = process.env.SANITY_API_READ_TOKEN;

  return {
    cache: "no-store",
    perspective: isDraftMode && token ? "drafts" : undefined,
    stega: isDraftMode,
    token: isDraftMode && token ? token : undefined,
  };
}

export const homePageQuery = defineQuery(`*[_type == "homePage"] | order(_updatedAt desc)[0]{
  "heroTitle": coalesce(hero.title, heroTitle),
  "heroSubtitle": coalesce(hero.subtitle, heroSubtitle),
  "heroImage": coalesce(hero.backgroundImage, heroImage),
  "heroImageAlt": coalesce(hero.backgroundImage.alt, "Hero Background"),
  "primaryCta": {
    "label": coalesce(hero.primaryCta.label, primaryCta.label, "Get Started"),
    "href": coalesce(hero.primaryCta.href, primaryCta.href, "#"),
    "variant": coalesce(hero.primaryCta.variant, primaryCta.variant, "primary")
  },
  "secondaryCta": {
    "label": coalesce(hero.secondaryCta.label, secondaryCta.label, "Learn More"),
    "href": coalesce(hero.secondaryCta.href, secondaryCta.href, "#"),
    "variant": coalesce(hero.secondaryCta.variant, secondaryCta.variant, "secondary")
  },
  seo
}`);

export const contactPageQuery = defineQuery(`*[_type == "contactPage"] | order(_updatedAt desc)[0]{
  "eyebrow": coalesce(hero.eyebrow, "Contact"),
  "title": coalesce(hero.title, "Contact Us"),
  "subtitle": coalesce(hero.subtitle, "Reach out to begin your Adiveda journey."),
  "testimonial": {
    "quote": coalesce(testimonial.quote, "We built this because we needed it ourselves. The practices in Hridhayam are not teachings we read about; they are the ones that changed our lives."),
    "author": coalesce(testimonial.author, "Massimo Vignelli"),
    "role": coalesce(testimonial.role, "Founders, Adiveda · Hridhayam"),
    "image": testimonial.image
  },
  "faqSection": {
    "eyebrow": coalesce(faqSection.eyebrow, "FAQ"),
    "title": coalesce(faqSection.title, "Helpful answers before you reach out"),
    "description": coalesce(faqSection.description, "Everything you need to know about the process, timing, and what comes next after your message.")
  },
  "faqItems": coalesce(faqItems[], [
    {
      "question": "How quickly will you respond?",
      "answer": "Most enquiries receive a personal reply within 24 hours. If your timing is urgent, mention that in the form and we will do our best to prioritise it."
    },
    {
      "question": "Do you work with beginners?",
      "answer": "Yes. We welcome people at every stage, including first-time practitioners, curious explorers, and those returning to themselves after a long pause."
    },
    {
      "question": "Can I book a discovery call?",
      "answer": "Absolutely. Once you submit your details, we will suggest the best next step and share what to expect from the first conversation."
    }
  ]),
  "email": coalesce(email, "hello@adiveda.com"),
  "phone": coalesce(phone, "+91 98765 43210"),
  "address": coalesce(address, "Adiveda Practice, India"),
  seo
}`);


export const blogPageQuery = defineQuery(`*[_type == "blogPage"] | order(_updatedAt desc)[0]{
  "eyebrow": coalesce(hero.eyebrow, "Journal"),
  "title": coalesce(hero.title, "Blog"),
  "subtitle": coalesce(hero.subtitle, "Notes on Ayurveda, ritual, Panchang, and grounded practice."),
  seo
}`);

export const aboutPageQuery = defineQuery(`*[_type == "aboutPage"] | order(_updatedAt desc)[0]{
  "eyebrow": coalesce(hero.eyebrow, "About Us"),
  "title": coalesce(hero.title, "About Us"),
  "subtitle": coalesce(hero.subtitle, "A modern Ayurveda-inspired web experience built with Next.js and Sanity."),
  seo
}`);

export async function getHomePage() {
  if (!client) {
    return null;
  }

  return client.fetch(homePageQuery, {}, await getFetchOptions());
}

export async function getContactPage() {
  if (!client) {
    return null;
  }

  return client.fetch(contactPageQuery, {}, await getFetchOptions());
}

const blogPostFields = `
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  category,
  coverImage,
  "coverImageAlt": coalesce(coverImage.alt, title),
  body,
  "author": author->{
    name,
    bio,
    image,
    "imageAlt": coalesce(image.alt, name)
  },
  seo
`;

export const blogPostsQuery = defineQuery(`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc){
  ${blogPostFields}
}`);

export const blogPostQuery = defineQuery(`*[_type == "blogPost" && slug.current == $slug][0]{
  ${blogPostFields}
}`);

export const relatedBlogPostsQuery = defineQuery(`*[
  _type == "blogPost" &&
  defined(slug.current) &&
  slug.current != $slug &&
  category == $category
] | order(publishedAt desc)[0...3]{
  ${blogPostFields}
}`);

export async function getBlogPage() {
  if (!client) {
    return null;
  }

  return client.fetch(blogPageQuery, {}, await getFetchOptions());
}

export async function getAboutPage() {
  if (!client) {
    return null;
  }

  return client.fetch(aboutPageQuery, {}, await getFetchOptions());
}

export async function getBlogPosts() {
  if (!client) {
    return [];
  }

  return client.fetch(blogPostsQuery, {}, await getFetchOptions());
}

export async function getBlogPost(slug) {
  if (!client) {
    return null;
  }

  return client.fetch(blogPostQuery, {slug}, await getFetchOptions());
}

export async function getRelatedBlogPosts({slug, category}) {
  if (!client || !category) {
    return [];
  }

  return client.fetch(relatedBlogPostsQuery, {slug, category}, await getFetchOptions());
}
