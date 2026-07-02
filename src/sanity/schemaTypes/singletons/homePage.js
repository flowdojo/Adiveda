import { defineField, defineType } from "sanity";
import pageSections from "../pageSections";
import { HomeIcon } from "@sanity/icons";
import { defaultFieldGroups } from "../config/fieldGroups";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: defaultFieldGroups,
  icon: HomeIcon,

  fields: [
    defineField({
      name: "name",
      hidden: true,
      readOnly: true,
      type: "string",
      initialValue: "Home Page",
      group: "content",
    }),
    pageSections,
    defineField({
      title: "SEO & Metadata",
      name: "seo",
      type: "seoMetaFields",
      group: "seo",
    }),
  ],
});
