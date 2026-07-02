import { blogPost } from "./documents/blogPost";
import { homePage } from "./singletons/homePage";
import  page  from "./documents/page";
import cta from "./pageSections/cta";
import {author} from "./objects/author";

// import seoTypes from './objects/seo';


export const schemaTypes = [
  // Singletons
  homePage,


  // Documents
  page,
  blogPost,



  // objects

  cta,
  author

  // ...seoTypes
 
];
