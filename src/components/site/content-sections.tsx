import type { ContentSection } from "@/lib/tools";

/** Renders the long-form SEO content. Lines starting with "- " become bullets. */
export function ContentSections({ sections }: { sections: ContentSection[] }) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="space-y-10">
        {sections.map((s) => {
          const bullets = s.body.filter((b) => b.startsWith("- "));
          const paras = s.body.filter((b) => !b.startsWith("- "));
          return (
            <div key={s.heading}>
              <h2 className="mb-3 text-xl font-bold sm:text-2xl">{s.heading}</h2>
              {paras.map((p, i) => (
                <p key={i} className="mb-3 leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {bullets.length > 0 && (
                <ul className="ml-5 list-disc space-y-1.5 text-muted-foreground">
                  {bullets.map((b, i) => (
                    <li key={i}>{b.slice(2)}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
