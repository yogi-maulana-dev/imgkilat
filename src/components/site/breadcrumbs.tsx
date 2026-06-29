import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Locale } from "@/i18n/config";

export function Breadcrumbs({
  label,
  locale,
  homeLabel,
}: {
  label: string;
  locale: Locale;
  homeLabel: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href={`/${locale}`} className="hover:text-foreground">
            {homeLabel}
          </Link>
        </li>
        <ChevronRight className="h-4 w-4" />
        <li className="font-medium text-foreground">{label}</li>
      </ol>
    </nav>
  );
}
