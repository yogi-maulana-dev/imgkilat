import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { countryFromHeaders, localeFromCountry, countryFromApi, clientIpFrom } from "@/i18n/geo";

const PUBLIC_FILE = /\.[^/]+$/;

async function detectLocale(req: NextRequest): Promise<Locale> {
  // 1) Explicit user choice (set by the language switcher) always wins.
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie && isLocale(cookie)) return cookie;

  // 2) Geo-IP via platform header: Indonesia → id, otherwise → en.
  const byGeoHeader = localeFromCountry(countryFromHeaders(req.headers));
  if (byGeoHeader) return byGeoHeader;

  // 3) Optional geo-IP via API (for hosts without a geo header). Opt-in.
  if (process.env.GEOIP_API === "1") {
    const byGeoApi = localeFromCountry(await countryFromApi(clientIpFrom(req.headers)));
    if (byGeoApi) return byGeoApi;
  }

  // 4) Browser language as a fallback (e.g. local development).
  const header = req.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase());
    for (const lang of preferred) {
      if ((locales as readonly string[]).includes(lang)) return lang as Locale;
    }
  }

  // 5) Default.
  return defaultLocale;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip internals, API, metadata routes and static files.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/berita") ||
    pathname.startsWith("/uploads") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/news-sitemap.xml" ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Already locale-prefixed?
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const locale = await detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
