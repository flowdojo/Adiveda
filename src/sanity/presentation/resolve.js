import { defineDocuments } from "sanity/presentation";

export const mainDocuments = defineDocuments([
  {
    route : "/",
    filter: `_type == "homePage"`,
  },
  {
    route : "/:slug",
    resolve(ctx) { 
      const { params } = ctx;
      return {
        filter: `_type == "page" && slug.current == $slug`,
        slug : params.slug
      }
    }
  },

  {
    route : "/blog/:slug",
    resolve(ctx) { 
      const { params } = ctx;
      return {
        filter: `_type == "blogPost" && slug.current == $slug`,
        slug : params.slug
      }
    }
  }
])



export const locations = {
  homepage : () => ({ title: "Home", href: "/" }),
  page : (doc) => ({
    title: doc.title || "Page",
    href: doc.slug?.current ? `/${doc.slug.current}` : "/",
  }),
  blogs : (doc) => ({
    title: doc.title || "Blog Post",
    href: doc.slug?.current ? `/blog/${doc.slug.current}` : "/blog",
  }),
}