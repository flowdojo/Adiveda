import { BulbFilledIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "cta",
  title: "CTA",
  type: "object",
  icon: BulbFilledIcon,
  fields: [
    defineField({
      name: "title",
      title: "title",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "variant",
      title: "Button Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Nav", value: "nav" },
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
