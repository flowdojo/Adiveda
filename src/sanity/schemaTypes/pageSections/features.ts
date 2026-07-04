import { defineField, defineType } from "sanity";
import { StackCompactIcon } from "@sanity/icons";
export default defineType({
  name: "featuresSection",
  title: "Features",
  type: "object",
  icon: StackCompactIcon,

  fields: [
    defineField({
      name: "heading",
      title: "heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "description",
      type: "string",
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [{ type: "button" }],
    }),

    defineField({
      name : 'featureCards',
      type : 'array',
      of : [{ type : 'featureCard' }]
    })
  ],
});
