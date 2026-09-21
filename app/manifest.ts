import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BrewCraft",
    short_name: "BrewCraft",
    description: "Coffee for slow mornings",
    start_url: "/",
    display: "standalone",
    background_color: "#120d0b",
    theme_color: "#1b120d",
    icons: [
      {
        src: "/maskable-icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
