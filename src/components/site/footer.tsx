import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getTools } from "@/lib/tools";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const groupSlugs: { key: "resize" | "compress" | "convert"; slugs: string[] }[] = [
  { key: "resize", slugs: ["pas-foto-cpns", "resize-image", "crop-image", "passport-photo-resizer", "resize-image-to-100kb"] },
  { key: "compress", slugs: ["compress-image", "bulk-image-resizer"] },
  { key: "convert", slugs: ["jpg-to-png", "png-to-jpg", "png-to-webp", "jpg-to-webp", "webp-to-jpg", "webp-to-png"] },
];

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const all = getTools(locale);
  return (
    <footer className="mt-20 border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="text-lg font-extrabold">{siteConfig.name}</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">{dict.site.description}</p>
          <div className="mt-3 flex gap-4">
            <Link href={`/${locale}/blog`} className="text-sm font-medium text-primary hover:underline">
              {dict.blog.nav}
            </Link>
            <Link href={`/${locale}/berita`} className="text-sm font-medium text-primary hover:underline">
              Berita
            </Link>
          </div>
        </div>
        {groupSlugs.map((g) => (
          <div key={g.key}>
            <p className="mb-3 text-sm font-semibold">{dict.footer.groups[g.key]}</p>
            <ul className="space-y-2">
              {g.slugs.map((slug) => {
                const t = all.find((x) => x.slug === slug);
                if (!t) return null;
                return (
                  <li key={slug}>
                    <Link href={`/${locale}/${slug}`} className="text-sm text-muted-foreground hover:text-foreground">
                      {t.navLabel}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} {siteConfig.name}. {dict.footer.note}
      </div>
    </footer>
  );
}
