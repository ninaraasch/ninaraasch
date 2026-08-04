import { createClient } from "@sanity/client";
import { LexoRank } from "lexorank";
import { apiVersion, dataset, projectId } from "../lib/sanity/config.ts";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) throw new Error("SANITY_WRITE_TOKEN is not set");

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const documents = await client.fetch<{ _id: string }[]>(
  `*[_type == "project"] | order(coalesce(order, 9999) asc, _createdAt asc){_id}`,
);

let rank = LexoRank.min();
const transaction = client.transaction();

for (const document of documents) {
  rank = rank.genNext();
  transaction.patch(document._id, (patch) =>
    patch.set({ orderRank: rank.toString() }).unset(["order"]),
  );
}

await transaction.commit();
console.log(`ranked ${documents.length} projects`);
