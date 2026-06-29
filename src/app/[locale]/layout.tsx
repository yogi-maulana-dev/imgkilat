import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { siteConfig } from "@/lib/site";
import { locales, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { alternatesFor, ogLocale } from "@/i18n/meta";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { OrganizationJsonLd } from "@/components/seo/json-ld";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = (isLocale(locale) ? locale : "en") as Locale;
  const d = getDictionary(loc);
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} – ${d.site.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: d.site.description,
    applicationName: siteConfig.name,
    alternates: alternatesFor("/", loc),
    openGraph: {
      type: "website",
      locale: ogLocale(loc),
      url: `${siteConfig.url}/${loc}`,
      siteName: siteConfig.name,
      title: `${siteConfig.name} – ${d.site.tagline}`,
      description: d.site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} – ${d.site.tagline}`,
      description: d.site.description,
      creator: siteConfig.twitter,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const d = getDictionary(locale);

  return (
    <html lang={locale} className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <OrganizationJsonLd />
        <Navbar locale={locale} dict={d} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={d} />
      </body>
    </html>
  );
}
