import { defineArrayMember, defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "slides",
      title: "Slideshow",
      type: "array",
      description:
        "Images shown on the homepage, in this order. Drag to reorder. Leave empty to show every project image.",
      of: [
        defineArrayMember({
          type: "object",
          name: "homeSlide",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              description:
                "Pick from the media library to reuse an image already in a project.",
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt text",
                  type: "string",
                }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description:
                "Only needed for images that are not part of a project. Otherwise the project name is used automatically.",
            }),
          ],
          preview: {
            select: { media: "image", title: "title" },
            prepare({ media, title }) {
              return { title: title || "From project", media };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
