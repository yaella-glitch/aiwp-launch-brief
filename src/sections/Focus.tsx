import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { focus } from '@/content';
import { cn, withBase } from '@/lib/utils';
import type { FocusItem } from '@/types';

/**
 * Focus section — "What we lead with externally."
 *
 * Sits between the feature dump (Product Overview accordion) and the customer
 * sections. Surfaces the 3 (or so) headlines we lead with go-to-market.
 *
 * Layout: 3-column grid on desktop, horizontal snap-scroll carousel on
 * mobile/tablet so cards stay generous and readable.
 */
export function Focus() {
  return (
    <section
      id="focus"
      data-section="focus"
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader title={focus.title} lede={focus.lede} />

        <ScrollReveal delay={0.05}>
          <div className="mt-16">
            {/* Mobile: snap carousel · Desktop: 3-col grid */}
            <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0">
              {focus.items.map((item, i) => (
                <div
                  key={item.id}
                  className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-[55%] lg:w-auto"
                >
                  <LeadCard item={item} index={i} />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function LeadCard({ item, index }: { item: FocusItem; index: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.05]">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5">
        <LeadImage src={item.image} alt={item.title} />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
          {(index + 1).toString().padStart(2, '0')} / Lead
        </span>
        <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink">
          {item.title}
        </h3>
        <p className="mt-3 text-base leading-relaxed text-muted">{item.description}</p>
      </div>
    </article>
  );
}

function LeadImage({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false || !src) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/12 via-indigo-500/6 to-sky-500/8">
        <div className="text-center">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <ImageIcon className="h-4 w-4 text-white/60" aria-hidden="true" />
          </span>
          <p className="mt-2 px-4 font-mono text-[10px] text-white/40">{src}</p>
        </div>
      </div>
    );
  }
  return (
    <img
      src={withBase(src)}
      alt={alt}
      className={cn(
        'h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.03]',
        ok === null && 'opacity-0',
      )}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}
