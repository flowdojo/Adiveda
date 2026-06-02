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
  "primaryCta": coalesce(hero.primaryCta, primaryCta),
  "secondaryCta": coalesce(hero.secondaryCta, secondaryCta),
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
