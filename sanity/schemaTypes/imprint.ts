import { defineArrayMember, defineField, defineType } from "sanity";

export const imprint = defineType({
  name: "imprint",
  title: "Imprint",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Imprint",
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description:
        "Each section is a heading with its text below it. Drag to reorder.",
      options: { sortable: true },
      of: [
        defineArrayMember({
          type: "object",
          name: "imprintSection",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
            }),
            defineField({
              name: "body",
              title: "Text",
              type: "text",
              rows: 8,
              description: "Line breaks are kept as written.",
            }),
          ],
          preview: {
            select: { title: "heading", subtitle: "body" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Imprint" };
    },
  },
});
