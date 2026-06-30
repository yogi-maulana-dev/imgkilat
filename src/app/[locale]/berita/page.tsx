import type { Metadata } from "next";
import { listNews } from "@/lib/news";
import { isLocale, type Locale } from "@/i18n/config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Berita",
  description: "Berita dan informasi terbaru.",
};

export default async function BeritaIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = (isLocale(locale) ? locale : "id") as Locale;
  const news = await listNews();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Berita</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          {loc === "id" ? "Berita dan informasi terbaru." : "Latest news and updates."}
        </p>
      </header>

      {news.length === 0 ? (
        <p className="text-center text-muted-foreground">
          {loc === "id" ? "Belum ada berita." : "No news yet."}
        </p>
      ) : (
        <div className="space-y-4">
          {news.map((n) => (
            <a
              key={n.slug}
              href={`/berita/${n.slug}`}
              className="block rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-sm"
            >
              <p className="text-xs text-muted-foreground">
                {new Date(n.date).toLocaleDateString(loc === "id" ? "id-ID" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className="mt-1 text-lg font-semibold">{n.title}</h2>
              {n.excerpt && <p className="mt-1 text-sm text-muted-foreground">{n.excerpt}</p>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
