import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GraphHealth",
    short_name: "GraphHealth",
    description: "Mobile-first patient monitoring prototype for scanning readings and reviewing health trends.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7fb",
    theme_color: "#9a1d38",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
      {
        src: "/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
