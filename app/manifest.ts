import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nina Raasch",
    short_name: "Nina Raasch",
    description:
      "Photographer working between London and Berlin. Fashion, editorial and commercial work.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f3f3",
    theme_color: "#f3f3f3",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
