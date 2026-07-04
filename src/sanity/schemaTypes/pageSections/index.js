import { defineArrayMember, defineField } from "sanity";
import cta from "./cta";
import hero from "./hero";
import features from "./features";

// all the sections of the page builder go here
const pageSectionsObjects = [cta, hero, features ];

export default defineField({
  name: "pageSections",
  title: "Page Builder",
  type: "array",
  of: pageSectionsObjects.map(({ name }) => defineArrayMember({ type: name })),
  group: "content",
});
