import { defineQuery } from "next-sanity";

export const projectsQuery = defineQuery(`
  *[_type == "project" && count(images[defined(asset)]) > 0]
    | order(orderRank asc) {
      "slug": slug.current,
      campaign,
      client,
      "cover": cover.asset->{
        "src": url,
        "width": metadata.dimensions.width,
        "height": metadata.dimensions.height
      },
      "images": images[defined(asset)]{
        alt,
        featured,
        "src": asset->url,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height
      }
    }
`);

export const contactQuery = defineQuery(`
  *[_type == "contact"][0]{
    intro,
    links[]{label, text, href},
    lists[]{label, items},
    exhibitions
  }
`);
