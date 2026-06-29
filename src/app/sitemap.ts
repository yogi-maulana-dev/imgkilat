import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { allSlugs } from "@/lib/tools";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["", ...allSlugs().map((s) => `/${s}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteConfig.url}/${l}${path}`]),
        ),
      },
    })),
  );
}
