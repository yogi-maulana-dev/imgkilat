import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTools } from "@/lib/tools";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ToolIcon } from "./icon";

const featured = [
  "pas-foto-cpns",
  "resize-image",
  "compress-image",
  "convert-image",
  "crop-image",
  "png-to-webp",
  "resize-image-to-100kb",
  "passport-photo-resizer",
  "bulk-image-resizer",
];

export function ToolGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const all = getTools(locale);
  const items = featured.map((s) => all.find((t) => t.slug === s)).filter(Boolean);
  return (
    <section id="tools" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-center text-3xl font-bold">{dict.home.gridTitle}</h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{dict.home.gridSubtitle}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <Link
            key={t!.slug}
            href={`/${locale}/${t!.slug}`}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ToolIcon name={t!.icon} className="h-6 w-6" />
            </div>
            <h3 className="mt-4 flex items-center gap-1 text-lg font-semibold">
              {t!.h1}
              <ArrowRight className="h-4 w-4 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{t!.intro.slice(0, 110)}…</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
