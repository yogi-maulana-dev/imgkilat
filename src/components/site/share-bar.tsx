"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";

export function ShareBar({
  title,
  message,
  url,
  copyLabel,
  copiedLabel,
}: {
  title: string;
  message: string;
  url: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);
  const text = encodeURIComponent(message);
  const u = encodeURIComponent(url);

  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${text}`, bg: "#25D366" },
    { name: "Telegram", href: `https://t.me/share/url?url=${u}&text=${text}`, bg: "#0088cc" },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, bg: "#1877F2" },
    { name: "X", href: `https://twitter.com/intent/tweet?text=${text}`, bg: "#111827" },
  ];

  async function native() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text: message, url });
      } catch {
        /* user dismissed */
      }
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${message}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <Share2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {links.map((l) => (
            <a
              key={l.name}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              style={{ background: l.bg }}
            >
              {l.name}
            </a>
          ))}
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            {copied ? copiedLabel : copyLabel}
          </button>
          <button
            onClick={native}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted sm:hidden"
          >
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
      </div>
    </section>
  );
}
