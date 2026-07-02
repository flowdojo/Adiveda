"use client";


// import {defineConfig} from "sanity";
// import {structureTool} from "sanity/structure";
// import {schemaTypes} from "./src/sanity/schemaTypes";
// import {presentationTool} from "sanity/presentation";
// import {structure} from "./src/sanity/structure";
// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "replace-me";
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// export default defineConfig({
//   name: "adiveda",
//   title: "Adiveda",
//   projectId,
//   dataset,
//   basePath: "/studio",
// plugins: [
//   structureTool({
//     structure,
//   }),

//   presentationTool({
//     previewUrl: {
//       origin: "http://localhost:3000",
//       preview: "/api/draft-mode/enable",
//     },
//     resolve: {
//       locations: {
//         homePage: () => ({title: "Home", href: "/"}),
//         blogPage: () => ({title: "Blog", href: "/blog"}),
//         aboutPage: () => ({title: "About", href: "/about"}),
//         contactPage: () => ({title: "Contact", href: "/contact"}),
//         blogPost: (doc) => ({
//           title: doc.title || "Blog Post",
//           href: doc.slug?.current ? `/blog/${doc.slug.current}` : "/blog",
//         }),
//       },
//     },
//   }),
// ],
//   schema: {
//     types: schemaTypes,
//   },
// });

import { structure } from "@/sanity/structure";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { mainDocuments, locations } from "@/sanity/presentation/resolve";
import { schemaTypes } from "@/sanity/schemaTypes";




export default defineConfig({
  basePath: "/studio",
  name: 'default',
  title: 'Adiveda',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  plugins : [
    structureTool({
      structure,
    }),
    presentationTool({
      previewUrl : {
        previewMode : {
          enable : '/api/draft-mode/enable'
        }
      },
      resolve : { mainDocuments, locations }
    })
  ],
  schema: {
    types: schemaTypes,
  },
})

