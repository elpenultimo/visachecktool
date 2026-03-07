import type { MetadataRoute } from "next";
import { listAll } from "@/lib/countryIndex";

const BASE_URL = "https://visachecktool.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const countries = listAll();

  const homepage: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/`,
    lastModified,
    changeFrequency: "weekly",
    priority: 1.0,
  };

  const visaRoutes: MetadataRoute.Sitemap = [];

  for (const origin of countries) {
    for (const destination of countries) {
      if (origin.key === destination.key) continue;

      visaRoutes.push({
        url: `${BASE_URL}/visa/${origin.slug_es}/${destination.slug_es}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return [homepage, ...visaRoutes];
}
