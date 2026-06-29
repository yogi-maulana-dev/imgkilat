import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { locales, type Locale } from "./config";

/**
 * Build canonical + hreflang alternates for a path (without locale prefix).
 * e.g. alternatesFor("/resize-image", "id")
 */
export function alternatesFor(path: string, locale: Locale): Metadata["alternates"] {
  const clean = path === "/" ? "" : path;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${siteConfig.url}/${l}${clean}`;
  languages["x-default"] = `${siteConfig.url}/${defaultPath(clean)}`;
  return {
    canonical: `${siteConfig.url}/${locale}${clean}`,
    languages,
  };
}

function defaultPath(clean: string) {
  return `en${clean}`.replace(/^\//, "");
}

export function ogLocale(locale: Locale) {
  return locale === "id" ? "id_ID" : "en_US";
}
