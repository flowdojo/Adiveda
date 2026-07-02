import { VideoIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "video",
  title: "Video",
  type: "document",
  icon: VideoIcon,
  fields: [
    defineField({
      name: "videoTitle",
      type: "string",
      title: "Video Title",
    }),
    defineField({
      name: "videoThumbnail",
      type: "reference",
      title: "Video Thumbnail",
      to: [{ type: "imageAsset" }],
    }),
    defineField({
      name: "videoType",
      type: "string",
      title: "Video Type",
      options: {
        list: ["Internal Upload (Mux)", "Youtube/Vimeo Link"],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Youtube/Vimeo Video Link",
      name: "youtubeOrVimeoVideoLink",
      type: "url",
      hidden: ({ parent, value }) =>
        !value && parent?.videoType !== "Youtube/Vimeo Link",
    }),
    // defineField({
    //   title: "Mux Video",
    //   name: "muxVideo",
    //   type: "mux.video",
    //   hidden: ({ parent, value }) =>
    //     !value && parent?.videoType !== "Internal Upload (Mux)",
    // }),
  ],
  preview: {
    select: {
      title: "videoTitle",
      image: "videoThumbnail.image",
      videoType: "videoType",
    },
    prepare({ title, image, videoType }) {
      return {
        title:
          title ||
          (videoType === "Youtube/Vimeo Link"
            ? "Youtube/Vimeo Video"
            : "Mux Video"),
        subtitle: "Video",
        media: image || VideoIcon,
      };
    },
  },
});
