import {defineField, defineType} from "sanity";

export const blogPage = defineType({
  name: "blogPage",
  title: "Blog Page",
  type: "document",

  groups: [
    {name: "hero", title: "Hero", default: true},
    {name: "seo", title: "SEO"},
  ],

  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",

      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "Journal",
        }),

        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
          rows: 3,
        }),
      ],
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",

      fields: [
        defineField({
          name: "title",
          title: "Meta Title",
          type: "string",
        }),

        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "hero.title",
      subtitle: "hero.eyebrow",
    },
    prepare({title, subtitle}) {
      return {
        title: title || "Blog Page",
        subtitle: subtitle || "Journal",
      };
    },
  },
});