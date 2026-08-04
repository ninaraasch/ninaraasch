import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineArrayMember, defineField, defineType } from "sanity";
import { MultiImageInput } from "../components/MultiImageInput";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "project" }),
    defineField({
      name: "campaign",
      title: "Campaign",
      type: "string",
      description:
        "The story or campaign name, shown in italic on the overview card.",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      description: "The magazine or brand, shown under the campaign name.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (document) =>
          [document.campaign, document.client].filter(Boolean).join(" "),
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cover",
      title: "Cover",
      type: "image",
      description:
        "Thumbnail for the overview. Leave empty to use the first image.",
      options: { hotspot: true },
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              description: "Describes the image for screen readers.",
            }),
          ],
        }),
      ],
      options: { layout: "grid" },
      components: { input: MultiImageInput },
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      campaign: "campaign",
      client: "client",
      cover: "cover",
      firstImage: "images.0",
    },
    prepare({ campaign, client, cover, firstImage }) {
      return {
        title: client,
        subtitle: campaign,
        media: cover ?? firstImage,
      };
    },
  },
});
