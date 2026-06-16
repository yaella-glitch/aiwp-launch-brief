import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { market } from '@/content';
import { cn, withBase } from '@/lib/utils';
import type { CompetitorCard } from '@/types';

/**
 * Competitive overview — flat gallery of competitor cards (no category tabs).
 * Same card style as the "What we're launching" capability cards: image on
 * top, title + description below. 3 columns on desktop, 2 on tablet, 1 on
 * mobile.
 */
export function Market() {
  return (
    <section
      id="market"
      data-section="market"
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader title={market.title} lede={market.lede} />

        <ScrollReveal delay={0.05}>
          <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {market.competitors.map((c, i) => (
              <ScrollReveal key={c.id} delay={0.04 * i}>
                <CompetitorTile competitor={c} />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CompetitorTile({ competitor }: { competitor: CompetitorCard }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5">
        <CompetitorImage src={competitor.image} alt={competitor.title} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-display text-lg font-semibold leading-tight text-ink md:text-xl">
          {competitor.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-muted">{competitor.description}</p>
      </div>
    </article>
  );
}

function CompetitorImage({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/12 via-indigo-500/6 to-sky-500/8">
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
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
      className={cn(
        'h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.03]',
        ok === null && 'opacity-0',
      )}
    />
  );
}
