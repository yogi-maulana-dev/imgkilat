import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { allSlugs } from "@/lib/tools";
import { allPostSlugs } from "@/lib/blog";
import { listNews } from "@/lib/news";
import { locales } from "@/i18n/config";

// Dynamic so admin-managed news appear without a rebuild.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const paths = [
    "",
    ...allSlugs().map((s) => `/${s}`),
    "/blog",
    ...allPostSlugs().map((s) => `/blog/${s}`),
  ];

  const localized: MetadataRoute.Sitemap = paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.9,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}${path}`])),
      },
    })),
  );

  const news = await listNews();
  const newsEntries: MetadataRoute.Sitemap = news.map((n) => ({
    url: `${siteConfig.url}/berita/${n.slug}`,
    lastModified: new Date(n.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...localized, ...newsEntries];
}
