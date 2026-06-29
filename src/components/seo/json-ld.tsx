import { siteConfig } from "@/lib/site";
import type { ToolPage } from "@/lib/tools";
import type { Locale } from "@/i18n/config";

function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      }}
    />
  );
}

export function ToolJsonLd({ tool, locale }: { tool: ToolPage; locale: Locale }) {
  const url = `${siteConfig.url}/${locale}/${tool.slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tool.h1,
          url,
          inLanguage: locale,
          applicationCategory: "MultimediaApplication",
          operatingSystem: "All",
          browserRequirements: "Requires JavaScript",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: tool.metaDescription,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: tool.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/${locale}` },
            { "@type": "ListItem", position: 2, name: tool.h1, item: url },
          ],
        }}
      />
    </>
  );
}
