import { PresentationIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "object",
  icon: PresentationIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      type: "string",
    }),
    defineField({
      name: "buttons",
      type: "array",
      of: [{ type: "button" }],
    }),
    defineField({
      name: "imageAsset",
      title: "Image",
      type: "reference",
      to: [{ type: "imageAsset" }],
      // hidden: ({ parent, value }) => parent?.mediaType !== "image" && !value,
    }),
  ],

  preview: {
    select: {
      title: "title",
      subheading: "subtitle",
      image: "imageAsset.image",
    },
    prepare({ title, subheading, image }) {
      const titleText = title || "Untitled Hero";

      return {
        title: titleText,
        subtitle: subheading || "No subheading",
        media: image || PresentationIcon,
      };
    },
  },
});
