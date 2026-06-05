import {defineField, defineType} from "sanity";

export const cta = defineType({
  name: "cta",
  title: "CTA",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      initialValue: "#",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "variant",
      title: "Button Variant",
      type: "string",
      options: {
        list: [
          {title: "Primary", value: "primary"},
          {title: "Secondary", value: "secondary"},
          {title: "Nav", value: "nav"},
        ],
        layout: "radio",
      },
      initialValue: "primary",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href",
    },
  },
});
