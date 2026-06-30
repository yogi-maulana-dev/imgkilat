import fs from "node:fs/promises";
import path from "node:path";
import { siteConfig } from "./site";

export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  lang: string; // "id" | "en"
  date: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "news.json");
const PUBLIC_BERITA = path.join(process.cwd(), "public", "berita");

export async function listNews(): Promise<NewsItem[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const arr = JSON.parse(raw) as NewsItem[];
    return arr.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch {
    return [];
  }
}

export async function getNews(slug: string): Promise<NewsItem | undefined> {
  return (await listNews()).find((n) => n.slug === slug);
}

async function writeAll(items: NewsItem[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

export function slugify(s: string): string {
  const out = s
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80)
    .replace(/^-|-$/g, "");
  return out || `berita-${Date.now()}`;
}

export interface NewsInput {
  slug?: string;
  title: string;
  excerpt?: string;
  contentHtml?: string;
  lang?: string;
  date?: string;
}

export async function saveNews(input: NewsInput): Promise<NewsItem> {
  const items = await listNews();
  const slug = slugify(input.slug || input.title);
  const now = new Date().toISOString();
  const existing = items.find((i) => i.slug === slug);
  const item: NewsItem = {
    slug,
    title: input.title.trim(),
    excerpt: (input.excerpt ?? "").trim(),
    contentHtml: input.contentHtml ?? "",
    lang: input.lang === "en" ? "en" : "id",
    date: existing?.date ?? (input.date || now),
    updatedAt: now,
  };
  const next = existing ? items.map((i) => (i.slug === slug ? item : i)) : [item, ...items];
  await writeAll(next);
  await writeHtmlFile(item);
  return item;
}

export async function deleteNews(slug: string): Promise<boolean> {
  const items = await listNews();
  if (!items.some((i) => i.slug === slug)) return false;
  const next = items.filter((i) => i.slug !== slug);
  await writeAll(next);
  // Remove the generated static page (e.g. public/berita/<slug>/index.html).
  await fs.rm(path.join(PUBLIC_BERITA, slug), { recursive: true, force: true });
  return true;
}

async function writeHtmlFile(item: NewsItem) {
  const dir = path.join(PUBLIC_BERITA, item.slug);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, "index.html"), renderHtml(item), "utf8");
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Full standalone, SEO-friendly static HTML page for one news article. */
function renderHtml(item: NewsItem): string {
  const url = `${siteConfig.url}/berita/${item.slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.excerpt,
    datePublished: item.date,
    dateModified: item.updatedAt,
    inLanguage: item.lang,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: url,
  };
  const dateLabel = new Date(item.date).toLocaleDateString(item.lang === "id" ? "id-ID" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `<!doctype html>
<html lang="${item.lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(item.title)} | ${esc(siteConfig.name)}</title>
<meta name="description" content="${esc(item.excerpt)}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(item.title)}" />
<meta property="og:description" content="${esc(item.excerpt)}" />
<meta property="og:url" content="${url}" />
<meta property="og:site_name" content="${esc(siteConfig.name)}" />
<meta name="robots" content="index, follow" />
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<style>
:root{--p:#4f46e5;--ink:#0b1120;--mut:#64748b;--bd:#e2e8f0;--bg:#f8fafc}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.7}
.wrap{max-width:720px;margin:0 auto;padding:0 20px}
header{border-bottom:1px solid var(--bd);background:#fff}
header .wrap{display:flex;align-items:center;justify-content:space-between;height:60px}
.brand{font-weight:800;color:var(--ink);text-decoration:none}.brand span{color:var(--p)}
nav a{color:var(--mut);text-decoration:none;margin-left:18px;font-size:.95rem}
article{background:#fff;margin:24px auto;padding:32px;border:1px solid var(--bd);border-radius:16px}
h1{font-size:1.9rem;line-height:1.25;margin:.2em 0}
.date{color:var(--mut);font-size:.9rem}
.excerpt{color:var(--mut);font-size:1.1rem;margin-top:8px}
.content{margin-top:20px}.content img{max-width:100%;height:auto;border-radius:10px}
.content h2{font-size:1.3rem;margin-top:1.4em}.content a{color:var(--p)}
.back{display:inline-block;margin:8px 0 32px;color:var(--p);text-decoration:none}
footer{border-top:1px solid var(--bd);color:var(--mut);font-size:.85rem;text-align:center;padding:24px 0}
</style>
</head>
<body>
<header><div class="wrap">
<a class="brand" href="${siteConfig.url}/">${esc(siteConfig.name).replace(/(.{3})$/, "<span>$1</span>")}</a>
<nav><a href="${siteConfig.url}/berita">Berita</a><a href="${siteConfig.url}/">Beranda</a></nav>
</div></header>
<div class="wrap">
<article>
<p class="date">${dateLabel}</p>
<h1>${esc(item.title)}</h1>
<p class="excerpt">${esc(item.excerpt)}</p>
<div class="content">${item.contentHtml}</div>
</article>
<a class="back" href="${siteConfig.url}/berita">← Berita</a>
</div>
<footer>© ${new Date().getFullYear()} ${esc(siteConfig.name)}</footer>
</body>
</html>
`;
}
