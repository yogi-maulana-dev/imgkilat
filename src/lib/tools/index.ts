import type { OutputFormat } from "@/lib/image/processor";
import type { Locale } from "@/i18n/config";
import { bases } from "./base";
import { contentEn } from "./content.en";
import { contentId } from "./content.id";

export type ToolType = "resize" | "compress" | "convert" | "crop" | "bulk";

export interface FaqItem {
  q: string;
  a: string;
}

export interface ContentSection {
  heading: string;
  /** Paragraphs and/or bullets. A string starting with "- " is a bullet. */
  body: string[];
}

export interface ToolPreset {
  from?: OutputFormat;
  to?: OutputFormat;
  targetKB?: number;
  width?: number;
  height?: number;
  lockFormat?: boolean;
}

/** Language-independent definition. */
export interface ToolBase {
  slug: string;
  type: ToolType;
  icon: string;
  preset?: ToolPreset;
  related: string[];
}

/** Localized copy for a tool. */
export interface ToolContent {
  h1: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  content: ContentSection[];
  faqs: FaqItem[];
}

export interface ToolPage extends ToolBase, ToolContent {}

const content: Record<Locale, Record<string, ToolContent>> = {
  en: contentEn,
  id: contentId,
};

export function getTools(locale: Locale): ToolPage[] {
  return bases
    .map((b) => {
      const c = content[locale][b.slug] ?? contentEn[b.slug];
      return c ? { ...b, ...c } : null;
    })
    .filter((t): t is ToolPage => t !== null);
}

export function getTool(locale: Locale, slug: string): ToolPage | undefined {
  const base = bases.find((b) => b.slug === slug);
  if (!base) return undefined;
  const c = content[locale][slug] ?? contentEn[slug];
  return c ? { ...base, ...c } : undefined;
}

export function allSlugs(): string[] {
  return bases.map((b) => b.slug);
}
