import Link from "next/link";
import { site } from "@/lib/site";

type Crumb = { label: string; href: string };

type Props = {
  trail: Crumb[]; // first item = root, last = current page
  /** Show the breadcrumb visually. Default true. JSON-LD is always emitted. */
  visual?: boolean;
};

/**
 * Renders a visual breadcrumb + emits BreadcrumbList JSON-LD for SEO.
 * Use at the top of inner pages, just above the PageHero.
 *
 * When visual is true the crumb sits in the nav-clear zone (top ~5rem) so it
 * reads as orienting metadata, not as page content.
 */
export function Breadcrumbs({ trail, visual = true }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${site.url}${c.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {visual && (
        <nav
          aria-label="Breadcrumb"
          className="container-page pt-24 md:pt-28 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-faint)]"
        >
          <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            {trail.map((c, i) => {
              const isLast = i === trail.length - 1;
              return (
                <li key={c.href} className="flex items-center gap-2.5">
                  {isLast ? (
                    <span className="text-[color:var(--color-muted)]" aria-current="page">
                      {c.label}
                    </span>
                  ) : (
                    <Link
                      href={c.href}
                      className="hover:text-[color:var(--color-paper)] transition-colors"
                    >
                      {c.label}
                    </Link>
                  )}
                  {!isLast && (
                    <span aria-hidden className="text-[color:var(--color-mars)]/60">
                      /
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
}
