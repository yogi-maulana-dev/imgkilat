import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPosts } from "@/lib/blog";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/i18n/meta";
import { ToolIcon } from "@/components/site/icon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  const d = getDictionary(loc);
  return {
    title: d.blog.title,
    description: d.blog.subtitle,
    alternates: alternatesFor("/blog", loc),
  };
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  const d = getDictionary(loc);
  const posts = getPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{d.blog.title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{d.blog.subtitle}</p>
      </header>

      <div className="space-y-4">
        {posts.map((post) => {
          const c = post.content[loc];
          return (
            <Link
              key={post.slug}
              href={`/${loc}/blog/${post.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-sm"
            >
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ToolIcon name={post.icon} className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString(loc === "id" ? "id-ID" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h2 className="mt-1 text-lg font-semibold group-hover:text-primary">{c.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{c.excerpt}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {d.blog.readMore}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
