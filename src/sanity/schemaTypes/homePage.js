import {defineField, defineType} from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    {
      name: "hero",
      title: "Hero",
      default: true,
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "For a Rooted in Bharat. Open to the World of Being",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
          rows: 3,
          initialValue: "Rooted in the timeless wisdom of Bharat, the pathway to inner evolution.",
          validation: (Rule) => Rule.required().max(220),
        }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Describe the image for accessibility.",
            }),
          ],
        }),
        defineField({
          name: "secondaryCta",
          title: "Secondary CTA",
          type: "cta",
          initialValue: {
            label: "Learn More",
            href: "#",
            variant: "secondary",
          },
        }),
        defineField({
          name: "primaryCta",
          title: "Primary CTA",
          type: "cta",
          initialValue: {
            label: "Get Started",
            href: "#",
            variant: "primary",
          },
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
          initialValue: "Adiveda",
        }),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "hero.title",
      media: "hero.backgroundImage",
    },
    prepare({title, media}) {
      return {
        title: "Home Page",
        subtitle: title,
        media,
      };
    },
  },
});
