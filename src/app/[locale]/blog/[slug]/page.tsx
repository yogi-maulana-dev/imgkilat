import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getPost, allPostSlugs } from "@/lib/blog";
import { getTool } from "@/lib/tools";
import { siteConfig } from "@/lib/site";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor, ogLocale } from "@/i18n/meta";
import { ContentSections } from "@/components/site/content-sections";
import { ToolIcon } from "@/components/site/icon";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => allPostSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  const post = getPost(slug);
  if (!post) return {};
  const c = post.content[loc];
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: alternatesFor(`/blog/${slug}`, loc),
    openGraph: {
      type: "article",
      locale: ogLocale(loc),
      url: `${siteConfig.url}/${loc}/blog/${slug}`,
      title: c.metaTitle,
      description: c.metaDescription,
      siteName: siteConfig.name,
      publishedTime: post.date,
    },
    twitter: { card: "summary_large_image", title: c.metaTitle, description: c.metaDescription },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const post = getPost(slug);
  if (!post) notFound();
  const d = getDictionary(locale);
  const c = post.content[locale];
  const url = `${siteConfig.url}/${locale}/blog/${slug}`;
  const related = post.relatedTools.map((s) => getTool(locale, s)).filter(Boolean);

  const dateLabel = new Date(post.date).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: c.title,
            description: c.metaDescription,
            inLanguage: locale,
            datePublished: post.date,
            dateModified: post.date,
            author: { "@type": "Organization", name: siteConfig.name },
            publisher: { "@type": "Organization", name: siteConfig.name },
            mainEntityOfPage: url,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: d.breadcrumb.home, item: `${siteConfig.url}/${locale}` },
              { "@type": "ListItem", position: 2, name: d.blog.nav, item: `${siteConfig.url}/${locale}/blog` },
              { "@type": "ListItem", position: 3, name: c.title, item: url },
            ],
          }),
        }}
      />

      <nav aria-label="Breadcrumb" className="mx-auto max-w-3xl px-4 pt-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li>
            <Link href={`/${locale}`} className="hover:text-foreground">
              {d.breadcrumb.home}
            </Link>
          </li>
          <ChevronRight className="h-4 w-4" />
          <li>
            <Link href={`/${locale}/blog`} className="hover:text-foreground">
              {d.blog.nav}
            </Link>
          </li>
        </ol>
      </nav>

      <article className="mx-auto max-w-3xl px-4 pt-4">
        <p className="text-sm text-muted-foreground">
          {d.blog.published} {dateLabel}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{c.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{c.excerpt}</p>
      </article>

      <ContentSections sections={c.sections} />

      {related.length > 0 && (
        <section className="mx-auto max-w-3xl px-4 pb-4">
          <h2 className="mb-4 text-xl font-bold">{d.blog.mentioned}</h2>
          <div className="grid gap-3 sm:grid-cols-3">
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
      )}

      <div className="mx-auto max-w-3xl px-4 pb-12 pt-2">
        <Link href={`/${locale}/blog`} className="text-sm font-medium text-primary hover:underline">
          ← {d.blog.back}
        </Link>
      </div>
    </>
  );
}
