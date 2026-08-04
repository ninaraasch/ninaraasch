import { createClient } from "@sanity/client";
import { randomUUID } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { apiVersion, dataset, projectId } from "../lib/sanity/config.ts";
import { exhibitions, intro, links, lists } from "../data/contact.ts";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) throw new Error("SANITY_WRITE_TOKEN is not set");

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const SOURCE = join(process.cwd(), "public");
const BATCH_SIZE = 5;
const SEPARATOR = /\s+[—–-]\s+/;

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function naturalCompare(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function parseFolder(name: string) {
  const parts = name.trim().split(SEPARATOR);
  if (parts.length >= 2) {
    return { campaign: parts[0].trim(), client: parts.slice(1).join(" — ").trim() };
  }
  return { campaign: "", client: name.trim() };
}

function projectFolders() {
  return readdirSync(SOURCE)
    .filter((entry) => statSync(join(SOURCE, entry)).isDirectory())
    .sort(naturalCompare);
}

function imagesIn(folder: string) {
  return readdirSync(join(SOURCE, folder))
    .filter((file) => /\.jpe?g$/i.test(file))
    .sort(naturalCompare);
}

async function uploadFolder(folder: string) {
  const files = imagesIn(folder);
  const assetIds: string[] = [];

  for (let start = 0; start < files.length; start += BATCH_SIZE) {
    const batch = files.slice(start, start + BATCH_SIZE);
    const uploaded = await Promise.all(
      batch.map((file) =>
        client.assets.upload("image", readFileSync(join(SOURCE, folder, file)), {
          filename: file,
        }),
      ),
    );
    assetIds.push(...uploaded.map((asset) => asset._id));
    process.stdout.write(
      `    ${Math.min(start + BATCH_SIZE, files.length)}/${files.length}\r`,
    );
  }

  return assetIds;
}

async function migrateProjects() {
  const folders = projectFolders();
  console.log(`${folders.length} projects\n`);

  for (const [index, folder] of folders.entries()) {
    const { campaign, client: clientName } = parseFolder(folder);
    const slug = slugify([campaign, clientName].filter(Boolean).join(" "));
    console.log(`[${index + 1}/${folders.length}] ${folder}`);

    const assetIds = await uploadFolder(folder);

    await client.createOrReplace({
      _id: `project-${slug}`,
      _type: "project",
      campaign: campaign || undefined,
      client: clientName,
      slug: { _type: "slug", current: slug },
      images: assetIds.map((assetId) => ({
        _type: "image",
        _key: randomUUID(),
        asset: { _type: "reference", _ref: assetId },
      })),
    });

    console.log(`    ${assetIds.length} images -> project-${slug}`);
  }
}

async function migrateContact() {
  await client.createOrReplace({
    _id: "contact",
    _type: "contact",
    intro,
    links: links.map((link) => ({
      _type: "contactLink",
      _key: randomUUID(),
      label: link.label,
      text: link.text,
      href: link.href,
    })),
    lists: lists.map((list) => ({
      _type: "contactList",
      _key: randomUUID(),
      label: list.label,
      items: list.items,
    })),
    exhibitions,
  });
  console.log("\ncontact document written");
}

await migrateProjects();
await migrateContact();
console.log("done");
