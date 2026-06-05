import {defineArrayMember, defineField, defineType} from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",

  groups: [
    {name: "hero", title: "Hero", default: true},
    {name: "contact", title: "Contact Details"},
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
          initialValue: "Contact",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "Contact Us",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "text",
          rows: 3,
          initialValue: "Reach out to begin your Adiveda journey.",
        }),
      ],
    }),

    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "quote",
          title: "Quote",
          type: "text",
          rows: 4,
          initialValue:
            "We built this because we needed it ourselves. The practices in Hridhayam are not teachings we read about; they are the ones that changed our lives.",
        }),
        defineField({
          name: "author",
          title: "Author",
          type: "string",
          initialValue: "Massimo Vignelli",
        }),
        defineField({
          name: "role",
          title: "Role",
          type: "string",
          initialValue: "Founders, Adiveda · Hridhayam",
        }),
        defineField({
          name: "image",
          title: "Author Image",
          type: "image",
          options: {hotspot: true},
        }),
      ],
    }),

    defineField({
      name: "faqSection",
      title: "FAQ Section",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "FAQ",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "Helpful answers before you reach out",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue:
            "Everything you need to know about the process, timing, and what comes next after your message.",
        }),
      ],
    }),

    defineField({
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
      initialValue: "hello@adiveda.com",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
      initialValue: "+91 98765 43210",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      group: "contact",
      initialValue: "Adiveda Practice, India",
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        defineField({name: "title", title: "Meta Title", type: "string"}),
        defineField({
          name: "description",
          title: "Meta Description",
          type: "text",
          rows: 3,
        }),
      ],
    }),
  ],
});
