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

export const homepageQuery = defineQuery(`
  *[_type == "homepage"][0]{
    "slides": slides[defined(image.asset)]{
      title,
      "alt": image.alt,
      "src": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "project": *[_type == "project" && references(^.image.asset._ref)][0]{
        campaign,
        client
      }
    }
  }
`);

export const imprintQuery = defineQuery(`
  *[_type == "imprint"][0]{
    title,
    sections[]{heading, body}
  }
`);

export const printsQuery = defineQuery(`
  *[_type == "print" && defined(image.asset) && defined(url)]
    | order(orderRank asc) {
      "id": _id,
      title,
      size,
      edition,
      price,
      url,
      "alt": image.alt,
      "src": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height
    }
`);
