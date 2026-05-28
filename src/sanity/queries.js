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
