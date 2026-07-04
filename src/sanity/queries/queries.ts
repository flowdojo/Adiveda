import { defineQuery } from "next-sanity";
import { pageFragment } from "./fragments/fragments";

export const homePageQuery = defineQuery(`[_type == "homepage"]{
  _id,
  _type,
  ...,
  ${pageFragment}
}`);

export const getPageQuery =
  defineQuery(`*[_type == "page" && slug.current == $slug][0] {
  _id,
  _type,
  name,
  slug,
  ${pageFragment}
}`);
