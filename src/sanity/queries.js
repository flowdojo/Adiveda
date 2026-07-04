import { defineQuery } from "next-sanity";
import { draftMode } from "next/headers";

import { client } from "./client";
import { pageFragment } from "./queries/fragments/fragments";

async function getFetchOptions() {
  const { isEnabled: isDraftMode } = await draftMode();
  const token = process.env.SANITY_API_READ_TOKEN;

  return {
    cache: "no-store",
    perspective: isDraftMode && token ? "drafts" : undefined,
    stega: isDraftMode,
    token: isDraftMode && token ? token : undefined,
  };
}

export const homePageQuery = defineQuery(`*[_type == "homePage"][0]{
  _id,
  _type,
  ...,
  ${pageFragment}
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

export const blogPostsQuery =
  defineQuery(`*[_type == "blogPost" && defined(slug.current)] | order(publishedAt desc){
  ${blogPostFields}
}`);

export const blogPostQuery =
  defineQuery(`*[_type == "blogPost" && slug.current == $slug][0]{
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

  return client.fetch(blogPostQuery, { slug }, await getFetchOptions());
}

export async function getRelatedBlogPosts({ slug, category }) {
  if (!client || !category) {
    return [];
  }

  return client.fetch(
    relatedBlogPostsQuery,
    { slug, category },
    await getFetchOptions(),
  );
}
