import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.goodluckproperties.co.in";
  
  const routes = [
    "",
    "/nimbus-palm-village",
    "/ace-hanei",
    "/ats-homekraft",
    "/gaur-yamuna-city",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
