import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getTool, allSlugs } from "@/lib/tools";
import { siteConfig } from "@/lib/site";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor, ogLocale } from "@/i18n/meta";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ContentSections } from "@/components/site/content-sections";
import { Faq } from "@/components/site/faq";
import { ToolRenderer } from "@/components/tools/tool-renderer";
import { ToolJsonLd } from "@/components/seo/json-ld";
import { ToolIcon } from "@/components/site/icon";
import { ShareBar } from "@/components/site/share-bar";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => allSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  const tool = getTool(loc, slug);
  if (!tool) return {};
  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    keywords: tool.keywords,
    alternates: alternatesFor(`/${tool.slug}`, loc),
    openGraph: {
      type: "website",
      locale: ogLocale(loc),
      url: `${siteConfig.url}/${loc}/${tool.slug}`,
      title: tool.metaTitle,
      description: tool.metaDescription,
      siteName: siteConfig.name,
    },
    twitter: { card: "summary_large_image", title: tool.metaTitle, description: tool.metaDescription },
  };
}

export default async function ToolPageRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const tool = getTool(locale, slug);
  if (!tool) notFound();
  const d = getDictionary(locale);

  const related = tool.related.map((s) => getTool(locale, s)).filter(Boolean);

  return (
    <>
      <ToolJsonLd tool={tool} locale={locale} />
      <Breadcrumbs label={tool.navLabel} locale={locale} homeLabel={d.breadcrumb.home} />

      <section className="mx-auto max-w-3xl px-4 pt-6 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <ToolIcon name={tool.icon} className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{tool.h1}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">{tool.intro}</p>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8">
        <ToolRenderer
          type={tool.type}
          preset={tool.preset}
          dict={d.tool}
          dropzone={d.dropzone}
          cpns={d.cpns}
          shareMessage={d.share.message.replace("{site}", new URL(siteConfig.url).host)}
          shareUrl={`${siteConfig.url}/${locale}/${tool.slug}`}
        />
      </section>

      <ContentSections sections={tool.content} />

      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="mb-5 text-center text-2xl font-bold">{d.related.title}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <Link
              key={r!.slug}
              href={`/${locale}/${r!.slug}`}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:border-primary/40 hover:shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ToolIcon name={r!.icon} className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium">{r!.navLabel}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </section>

      <ShareBar
        title={d.share.title}
        message={d.share.message.replace("{site}", new URL(siteConfig.url).host)}
        url={`${siteConfig.url}/${locale}/${tool.slug}`}
        copyLabel={d.share.copy}
        copiedLabel={d.share.copied}
      />

      <Faq items={tool.faqs} title={d.faq.title} />
    </>
  );
}
