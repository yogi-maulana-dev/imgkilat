import type { Metadata } from "next";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor } from "@/i18n/meta";
import { Hero } from "@/components/site/hero";
import { ToolGrid } from "@/components/site/tool-grid";
import { ToolApp } from "@/components/tools/tool-app";
import { Faq } from "@/components/site/faq";

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
      <Faq items={d.home.faqs} title={d.faq.title} />
    </>
  );
}
