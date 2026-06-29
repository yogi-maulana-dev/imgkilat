<<<<<<< HEAD
# ImgKilat — Online Image Tools (iLoveIMG-style)

Production-ready image tools platform built with **Next.js 16 (App Router) + TypeScript + Tailwind v4**, server-side image processing with **Sharp**, and a high-end SEO setup. Resize, compress, convert, crop and bulk-process JPG/PNG/WebP — fast, private, and SEO-optimized.

> Requested as "Next.js 15"; `create-next-app@latest` now ships **Next 16** (App Router is identical for this project). Pin to 15 if you specifically need it: `npm i next@15 react@18 react-dom@18`.

## Features

| Tool | Route | What it does |
|------|-------|--------------|
| Resize | `/resize-image` | By pixels or %, lock aspect ratio, preview |
| Compress | `/compress-image` | Quality slider **or** target file size |
| Resize to 100KB | `/resize-image-to-100kb` | Auto-finds best quality under 100 KB |
| Passport photo | `/passport-photo-resizer` | Preset 413×531 (35×45 mm) |
| Convert | `/convert-image`, `/jpg-to-png`, `/png-to-jpg`, `/png-to-webp`, `/jpg-to-webp`, `/webp-to-jpg`, `/webp-to-png` | Any direction JPG/PNG/WebP |
| Crop | `/crop-image` | Drag area, ratios 1:1 / 4:3 / 16:9 |
| Bulk | `/bulk-image-resizer` | Up to 30 files → single ZIP |

All processing runs in `/api/*` route handlers (Node runtime) using Sharp. **Files are held in memory only and discarded immediately — never written to disk.**

## SEO

- Dynamic per-page metadata + canonical (`generateMetadata`)
- `sitemap.ts` (auto) and `robots.ts`
- Schema.org JSON-LD: `WebApplication`, `FAQPage`, `BreadcrumbList`, `WebSite`
- Open Graph + Twitter cards
- Every landing page: keyword `H1`, long-form content, FAQ, internal linking
- Statically generated (SSG) tool pages for top Lighthouse scores

## Internationalization (English + Bahasa Indonesia)

Fully bilingual with localized routes, UI and SEO content.

- Routes are prefixed per locale: `/en/...` and `/id/...`
- `src/proxy.ts` (Next 16 proxy/middleware) resolves the locale in priority order: **(1)** `NEXT_LOCALE` cookie (manual choice) → **(2)** geo-IP country (Indonesia → `id`, else `en`) → **(3)** `Accept-Language` → **(4)** default `en`
- **Geo-IP**: country is read from platform headers (`x-vercel-ip-country`, `cf-ipcountry`, …) injected by Vercel/Cloudflare/Netlify automatically. On a plain VPS without such a header, set `GEOIP_API=1` to resolve the country via a free IP API (`ipwho.is`) — see `.env.example`. Logic lives in `src/i18n/geo.ts`
- Language switcher in the navbar (sets the cookie, keeps the current page)
- `hreflang` (en / id / x-default) + per-locale `canonical` on every page, and alternates in `sitemap.xml`
- UI strings live in `src/i18n/dictionaries.ts`; tool copy/FAQ live in `src/lib/tools/content.{en,id}.ts` (language-neutral config in `content` base via `src/lib/tools/base.ts`)

Add a language: extend `locales` in `src/i18n/config.ts`, add a dictionary, and add a `content.<locale>.ts` file.

## Security

- MIME allow-list **+ magic-byte signature check** (rejects forged extensions) — `src/lib/validation.ts`
- 20 MB per-file limit, 30-file bulk limit — `src/lib/site.ts`
- Rate limiting (Redis or in-memory fallback) — `src/lib/rate-limit.ts`
- Security headers — `next.config.ts`
- Files auto-deleted (in-memory only)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

No database or Redis required to run.

## Optional infrastructure (scalability)

Everything works in-memory out of the box. To enable analytics + distributed rate-limiting/queue, copy `.env.example` to `.env` and set:

```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/imgkilat"   # then: npx prisma generate && npx prisma db push
REDIS_URL="redis://localhost:6379"
```

- `src/lib/prisma.ts` and `src/lib/redis.ts` lazily activate only when these vars exist.

## Project structure

```
src/
  proxy.ts                        # locale detection + redirect (Next 16 proxy)
  app/
    [locale]/layout.tsx           # root shell (html lang), navbar/footer
    [locale]/page.tsx             # homepage
    [locale]/[slug]/page.tsx      # all SEO landing pages (data-driven)
    sitemap.ts, robots.ts
    api/{resize,compress,convert,crop,bulk}/route.ts
  i18n/
    config.ts                     # locales (en, id), defaults
    dictionaries.ts               # UI strings per locale
    meta.ts                       # canonical + hreflang helpers
  components/
    ui/                           # shadcn-style primitives
    site/                         # navbar, footer, hero, grid, faq, seo, language-switcher
    tools/                        # client tools (resize/compress/convert/crop/bulk)
  lib/
    image/processor.ts            # Sharp pipelines
    tools/                        # base.ts + content.en.ts + content.id.ts + index.ts
    validation.ts, rate-limit.ts, site.ts, prisma.ts, redis.ts
prisma/schema.prisma              # optional
```

## Adding a new SEO page

1. Add a base entry (slug, type, icon, preset, related) to `src/lib/tools/base.ts`.
2. Add localized copy under the same slug in `src/lib/tools/content.en.ts` **and** `src/lib/tools/content.id.ts` (H1, meta, keywords, intro, content, FAQ).

The route, metadata, `hreflang`, sitemap entry, and JSON-LD for both locales are generated automatically.

## Deploy (fastest path to ranking)

1. Push to GitHub, import into **Vercel** (zero-config, HTTPS automatic).
2. Set `NEXT_PUBLIC_SITE_URL` to your domain.
3. Submit `https://yourdomain/sitemap.xml` in **Google Search Console**.
=======
# imgkilat
Next.js image platform with multilingual support, API proxy, and Prisma integration for fast and scalable image management.
>>>>>>> 7b7b531665f39655e55a68e5f1e79727ba8d231a
