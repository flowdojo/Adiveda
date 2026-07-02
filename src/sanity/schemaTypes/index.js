import { blogPost } from "./documents/blogPost";
import { homePage } from "./singletons/homePage";
import page from "./documents/page";
import cta from "./pageSections/cta";
import { author } from "./objects/author";
import button from "./objects/button";
import imageAsset from "./documents/global/image-asset";
import video from "./documents/global/video";
import link from "./objects/link";
import hero from "./pageSections/hero";
import seoTypes from "./objects/seo";

// import seoTypes from './objects/seo';

export const schemaTypes = [
  // Singletons
  homePage,

  // sections
  hero,
  cta,

  // Documents
  page,
  blogPost,
  imageAsset,
  video,

  // objects
  ...seoTypes,
  link,
  button,
  author,

  // ...seoTypes
];
