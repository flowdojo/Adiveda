import { ImagesIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageAsset",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility.",
        }),
        defineField({
          name: "title",
          type: "string",
          title: "Title",
          description: "Title for the image",
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption",
          description: "Caption for the image",
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
    }),
  ],
  preview: {
    select: {
      title: "image.title",
      caption: "image.caption",
      alt: "image.alt",
      image: "image",
    },
    prepare({ title, caption, alt, image }) {
      return {
        title: title || caption || alt || "Untitled",
        subtitle: "Image",
        media: image || ImagesIcon,
      };
    },
  },
});
