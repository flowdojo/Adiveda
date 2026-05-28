import {defineQuery} from "next-sanity";

import {client} from "./client";

export const homePageQuery = defineQuery(`*[_type == "homePage"] | order(_updatedAt desc)[0]{
  "heroTitle": coalesce(hero.title, heroTitle),
  "heroSubtitle": coalesce(hero.subtitle, heroSubtitle),
  "heroImage": coalesce(hero.backgroundImage, heroImage),
  "heroImageAlt": coalesce(hero.backgroundImage.alt, "Hero Background"),
  "primaryCta": coalesce(hero.primaryCta, primaryCta),
  "secondaryCta": coalesce(hero.secondaryCta, secondaryCta),
  seo
}`);

export async function getHomePage() {
  if (!client) {
    return null;
  }

  return client.fetch(homePageQuery, {}, {cache: "no-store"});
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

export async function getBlogPosts() {
  if (!client) {
    return [];
  }

  return client.fetch(blogPostsQuery, {}, {cache: "no-store"});
}

export async function getBlogPost(slug) {
  if (!client) {
    return null;
  }

  return client.fetch(blogPostQuery, {slug}, {cache: "no-store"});
}

export async function getRelatedBlogPosts({slug, category}) {
  if (!client || !category) {
    return [];
  }

  return client.fetch(relatedBlogPostsQuery, {slug, category}, {cache: "no-store"});
}
