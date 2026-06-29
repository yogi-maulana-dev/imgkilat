import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { getTools } from "@/lib/tools";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./language-switcher";

const primaryNav = ["resize-image", "compress-image", "convert-image", "crop-image", "bulk-image-resizer"];

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const all = getTools(locale);
  const links = primaryNav.map((s) => all.find((t) => t.slug === s)).filter(Boolean);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href={`/${locale}`} className="flex items-center gap-2 text-lg font-extrabold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ImageIcon className="h-5 w-5" />
          </span>
          {siteConfig.name}
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((t) => (
            <Link
              key={t!.slug}
              href={`/${locale}/${t!.slug}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t!.navLabel}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <LanguageSwitcher locale={locale} />
          <Link
            href={`/${locale}/resize-image`}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            {dict.nav.getStarted}
          </Link>
        </div>
      </nav>
    </header>
  );
}
