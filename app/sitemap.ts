import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/shop", "/about", "/contact", "/login", "/register", "/forgot-password", "/account", "/checkout"];

  return routes.map((route) => ({
    url: `https://velvet-roast.example${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
