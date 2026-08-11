import { defineArrayMember, defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "intro",
      title: "Intro",
      type: "string",
      description: "The opening line of the contact panel.",
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      description:
        "Email, Instagram, and anything else with a single value. Drag to reorder.",
      options: { sortable: true },
      of: [
        defineArrayMember({
          type: "object",
          name: "contactLink",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "text", title: "Text", type: "string" }),
            defineField({
              name: "href",
              title: "Link",
              type: "url",
              validation: (rule) =>
                rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
            }),
          ],
          preview: { select: { title: "label", subtitle: "text" } },
        }),
      ],
    }),
    defineField({
      name: "lists",
      title: "Lists",
      type: "array",
      options: { sortable: true },
      description:
        "Selected clients, selected artists, magazine specials. Each entry is shown separated by a vertical bar.",
      of: [
        defineArrayMember({
          type: "object",
          name: "contactList",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "items",
              title: "Entries",
              type: "array",
              description: "Drag to reorder. Shown separated by a vertical bar.",
              of: [defineArrayMember({ type: "string" })],
              options: { sortable: true },
            }),
          ],
          preview: {
            select: { title: "label", items: "items" },
            prepare({ title, items }) {
              return { title, subtitle: `${items?.length ?? 0} entries` };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "exhibitions",
      title: "Exhibitions",
      type: "array",
      description:
        "One line each, for example: Title | Year | Venue | City. Drag to reorder.",
      options: { sortable: true },
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact" };
    },
  },
});
