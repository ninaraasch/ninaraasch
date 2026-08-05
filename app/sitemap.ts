import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://ninaraasch.com",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://ninaraasch.com/imprint",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
