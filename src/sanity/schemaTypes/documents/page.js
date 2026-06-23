import { defineType, defineField } from "sanity";
import pageSections from "../pageSections";
import { defaultFieldGroups } from "../config/fieldGroups";


export default defineType({
  name: 'page',
  title: "Pages",
  type: 'document',
  groups: defaultFieldGroups,

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'This will help generating the slug',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The URL path for this page (e.g., /page).',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
        isUnique : true,
      },
      group: 'content',
    }),

    pageSections,

    // defineField({
    //   title: 'SEO & Metadata',
    //   name: 'seo',
    //   type: 'seoMetaFields',
    //   group: 'seo',
    // }),


  ]
})