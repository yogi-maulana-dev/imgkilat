import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/i18n/meta";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/site/hero";
import { ToolGrid } from "@/components/site/tool-grid";
import { ToolApp } from "@/components/tools/tool-app";
import { Faq } from "@/components/site/faq";
import { ToolIcon } from "@/components/site/icon";
import { ShareBar } from "@/components/site/share-bar";
import { getPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  return { alternates: alternatesFor("/", loc) };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  const d = getDictionary(loc);

  return (
    <>
      <Hero dict={d} />
      <section className="mx-auto max-w-4xl px-4 pb-8">
        <ToolApp type="resize" dict={d.tool} dropzone={d.dropzone} />
        <p className="mt-3 text-center text-sm text-muted-foreground">{d.home.dropHint}</p>
      </section>
      <ToolGrid locale={loc} dict={d} />

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <h2 className="mb-8 text-center text-3xl font-bold">{d.home.useCases}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getPosts().map((post) => {
            const c = post.content[loc];
            return (
              <Link
                key={post.slug}
                href={`/${loc}/blog/${post.slug}`}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ToolIcon name={post.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold group-hover:text-primary">{c.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{c.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {d.blog.readMore}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <Faq items={d.home.faqs} title={d.faq.title} />

      <ShareBar
        title={d.share.title}
        message={d.share.message.replace("{site}", new URL(siteConfig.url).host)}
        url={`${siteConfig.url}/${loc}`}
        copyLabel={d.share.copy}
        copiedLabel={d.share.copied}
      />
    </>
  );
}
