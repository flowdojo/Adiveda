import {defineField, defineType} from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
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
          initialValue: "About Us",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "About Us",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
          rows: 3,
          initialValue: "A modern Ayurveda-inspired web experience built with Next.js and Sanity.",
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
      subtitle: "hero.subtitle",
    },
    prepare({title, subtitle}) {
      return {
        title: "About Page",
        subtitle: title || subtitle,
      };
    },
  },
});
