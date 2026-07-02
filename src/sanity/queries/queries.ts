import { defineQuery } from "next-sanity";
import { pageFragment } from "./fragments/fragments";

export const homePageQuery = defineQuery(`[_type == "homepage"]{
  _id,
  _type,
  ...,
  ${pageFragment}
}`);
