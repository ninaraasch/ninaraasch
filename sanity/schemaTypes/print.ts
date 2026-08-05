import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const print = defineType({
  name: "print",
  title: "Print",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "print" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Pick from the media library to reuse an image already in a project.",
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      description: "For example: 40 × 50 cm",
    }),
    defineField({
      name: "edition",
      title: "Edition",
      type: "string",
      description: "For example: Edition of 10",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: "Written as it should appear, for example: €450",
    }),
    defineField({
      name: "url",
      title: "Shop link",
      type: "url",
      description:
        "The product page in the Squarespace shop. Buying happens there.",
      validation: (rule) => rule.required().uri({ scheme: ["http", "https"] }),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "price", media: "image" },
  },
});
