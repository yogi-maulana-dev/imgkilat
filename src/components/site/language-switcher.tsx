"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(target: Locale) {
    if (target === locale) return;
    // Replace the leading /{locale} segment with the target locale.
    const rest = pathname.replace(new RegExp(`^/(${locales.join("|")})`), "");
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
    router.push(`/${target}${rest || ""}`);
  }

  return (
    <div className="group relative">
      <button
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{localeFlags[locale]}</span>
      </button>
      <div className="invisible absolute right-0 top-full z-50 w-44 rounded-xl border border-border bg-card p-1 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => switchTo(l)}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-muted ${
              l === locale ? "font-semibold text-primary" : "text-foreground"
            }`}
          >
            <span>{localeFlags[l]}</span>
            {localeNames[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
