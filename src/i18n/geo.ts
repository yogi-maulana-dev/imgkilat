import type { Locale } from "./config";

// Country headers injected by common CDNs / platforms (derived from client IP).
const COUNTRY_HEADERS = [
  "x-vercel-ip-country", // Vercel
  "cf-ipcountry", // Cloudflare
  "x-country-code", // various reverse proxies / Nginx GeoIP
  "x-geo-country",
  "x-appengine-country", // Google App Engine
  "fastly-geo-country",
];

/** Read the visitor's country (ISO-3166 alpha-2) from platform geo headers. */
export function countryFromHeaders(headers: Headers): string | null {
  for (const h of COUNTRY_HEADERS) {
    const v = headers.get(h);
    if (v && v !== "XX" && v !== "T1") return v.toUpperCase();
  }
  return null;
}

/** Indonesia → Bahasa Indonesia, everywhere else → English. */
export function localeFromCountry(country: string | null): Locale | null {
  if (!country) return null;
  return country === "ID" ? "id" : "en";
}

export function clientIpFrom(headers: Headers): string | null {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return headers.get("x-real-ip");
}

const PRIVATE_IP =
  /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::1|fc|fd|localhost)/i;

/**
 * Optional fallback: resolve country via a free IP geolocation API.
 * Used only on hosts that don't provide a geo header (set GEOIP_API=1).
 */
export async function countryFromApi(ip: string | null): Promise<string | null> {
  if (!ip || PRIVATE_IP.test(ip)) return null;
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 1500);
    const res = await fetch(`https://ipwho.is/${ip}?fields=country_code`, {
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = (await res.json()) as { country_code?: string };
    return typeof data.country_code === "string" ? data.country_code.toUpperCase() : null;
  } catch {
    return null; // geo lookup must never block navigation
  }
}
