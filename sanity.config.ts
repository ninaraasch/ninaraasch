import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./lib/sanity/config";

export default defineConfig({
  name: "ninaraasch",
  title: "Nina Raasch",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Homepage")
              .id("homepage")
              .child(
                S.document().schemaType("homepage").documentId("homepage"),
              ),
            orderableDocumentListDeskItem({
              type: "project",
              title: "Projects",
              S,
              context,
            }),
            S.listItem()
              .title("Contact")
              .id("contact")
              .child(
                S.document().schemaType("contact").documentId("contact"),
              ),
            S.listItem()
              .title("Imprint")
              .id("imprint")
              .child(
                S.document().schemaType("imprint").documentId("imprint"),
              ),
          ]),
    }),
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
