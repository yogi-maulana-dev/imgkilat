import type { FaqItem } from "@/lib/tools";

export function Faq({ items, title }: { items: FaqItem[]; title: string }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl">{title}</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.q} className="group rounded-xl border border-border bg-card p-4">
            <summary className="cursor-pointer list-none font-semibold marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.q}
                <span className="text-primary transition-transform group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
