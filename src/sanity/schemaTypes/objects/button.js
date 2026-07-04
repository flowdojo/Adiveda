import { Command } from "lucide-react";
import { defineField, defineType } from "sanity";
import { capitalize } from "@/utils/strings";
import { createRadioListLayout } from "@/utils/schema";

const buttonVariants = ["default", "secondary", "outline"];

export default defineType({
  name: "button",
  title: "Button",
  type: "object",
  icon: Command,
  fields: [
    defineField({
      name: "variant",
      type: "string",
      initialValue: () => "default",
      options: createRadioListLayout(buttonVariants, {
        direction: "horizontal",
      }),
    }),
    defineField({
      name: "withoutBackground",
      type: "boolean",
      initialValue: () => false,
      hidden: ({ parent }) => parent?.variant !== "outline",
      description:
        "Setting this field to true renders the button without white background making it look like outline-white button",
    }),
    defineField({
      name: "icon",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility.",
        }),
      ],
      options: {
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
    }),
    defineField({
      name: "hoverIcon",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility.",
        }),
      ],
      options: {
        aiAssist: {
          imageDescriptionField: "alt",
        },
      },
      hidden: ({ parent }) => parent?.variant !== "outline",
    }),
    defineField({
      name: "text",
      title: "Button Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonType",
      type: "string",
      initialValue: "default",
      options: createRadioListLayout(["default", "popup"], {
        direction: "horizontal",
      }),
    }),
    // defineField({
    //   name: "popupEmbed",
    //   type: "reference",
    //   to: [
    //     {
    //       type: "bookACall",
    //       validation: (Rule) => Rule.min(1).max(1),
    //     },
    //     {
    //       type: "downloadInfoPack",
    //       validation: (Rule) => Rule.min(1).max(1),
    //     },
    //   ],
    //   hidden: ({ parent }) => parent?.buttonType !== "popup",
    // }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      hidden: ({ parent }) => parent?.buttonType === "popup",
    }),
  ],
  preview: {
    select: {
      title: "text",
      variant: "variant",
      icon: "icon",
    },
    prepare: ({ title, variant, icon }) => {
      return {
        title: title || "Untitled Button",
        subtitle: `${capitalize(variant ?? "default")}`,
        media: icon,
      };
    },
  },
});
