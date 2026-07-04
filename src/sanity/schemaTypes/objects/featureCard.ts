import { defineField, defineType } from "sanity";
import {StackIcon} from '@sanity/icons'
export default defineType({
  name : 'featureCard',
  type : "object",
  icon : StackIcon,
  fields : [
    defineField({
      name : 'title',
      type : 'string',
      title : "Title"
    }),
     defineField({
      name : 'description',
      type : 'string',
      title : "Description"
    }),
     defineField({
      name : 'image',
      type : 'reference',
      to : [ { type : 'imageAsset' }]
    }),
  ]
})