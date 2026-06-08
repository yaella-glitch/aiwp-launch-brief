import { ArrowUpRight } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { resources } from '@/content';

/**
 * Resources — final section. Grouped bullet lists of hyperlinks
 * (decks, dashboards, dependencies, etc.). Lives at the bottom of the brief.
 */
export function Resources() {
  return (
    <section
      id="resources"
      data-section="resources"
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader title={resources.title} lede={resources.lede ?? ''} />

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {resources.groups.map((group, i) => (
            <ScrollReveal key={group.id} delay={0.05 * i}>
              <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-2">
                {group.links.map((link) => (
                  <li key={`${group.id}-${link.label}`}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-start gap-2 text-base leading-relaxed text-ink/85 transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60 transition-colors group-hover:bg-accent"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="underline decoration-white/15 decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-accent/60">
                          {link.label}
                        </span>
                        {link.note && (
                          <span className="ml-2 text-sm text-muted/80">· {link.note}</span>
                        )}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-muted/60 transition-colors group-hover:text-accent"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
