import { ShieldCheck, Zap, Sparkles } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(79,70,229,0.12),transparent)]" />
      <div className="mx-auto max-w-4xl px-4 pt-16 pb-8 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> {dict.hero.badge}
        </span>
        <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl">
          {dict.hero.titleA}{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {dict.hero.titleB}
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{dict.site.description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-success" /> {dict.hero.pointStored}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-primary" /> {dict.hero.pointFast}
          </span>
        </div>
      </div>
    </section>
  );
}
