import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ImageIcon } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { market } from '@/content';
import { cn, withBase } from '@/lib/utils';
import type { CompetitorCard } from '@/types';

/**
 * Competitive overview — flat horizontal carousel strip of competitor cards,
 * with prev / next arrow buttons. No category tabs. Same card style as the
 * "What we're launching" capability cards.
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
          <div className="mt-20">
            <CompetitorCarousel competitors={market.competitors} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CompetitorCarousel({ competitors }: { competitors: CompetitorCard[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    function update() {
      if (!el) return;
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [competitors]);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  return (
    <div className="relative">
      {/* Arrow buttons — top-right */}
      <div className="mb-5 hidden items-center justify-end gap-2 md:flex">
        <CarouselArrow
          direction="prev"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
          label="Previous competitor"
        />
        <CarouselArrow
          direction="next"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
          label="Next competitor"
        />
      </div>

      {/* Scrolling track */}
      <div className="relative">
        {/* Edge fades */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 z-[2] w-16 bg-gradient-to-r from-canvas to-transparent transition-opacity duration-200',
            canPrev ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 z-[2] w-16 bg-gradient-to-l from-canvas to-transparent transition-opacity duration-200',
            canNext ? 'opacity-100' : 'opacity-0',
          )}
        />

        <div
          ref={scrollerRef}
          className={cn(
            'flex gap-5 overflow-x-auto scroll-smooth pb-2',
            '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
            'snap-x snap-mandatory',
          )}
          role="region"
          aria-label="Competitors"
          tabIndex={0}
        >
          {competitors.map((c, i) => (
            <div
              key={c.id}
              data-card
              className={cn(
                'shrink-0 snap-start',
                'w-[85%] sm:w-[60%] md:w-[420px] lg:w-[460px]',
                i === 0 && 'ml-0',
              )}
            >
              <CompetitorTile competitor={c} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CarouselArrow({
  direction,
  onClick,
  disabled,
  label,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  const Icon = direction === 'prev' ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
        disabled
          ? 'cursor-not-allowed border-white/5 bg-white/[0.02] text-muted/30'
          : 'border-white/15 bg-white/5 text-ink hover:border-accent/40 hover:bg-white/10',
      )}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

function CompetitorTile({ competitor }: { competitor: CompetitorCard }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]">
      {/* Image container — uses object-contain so portrait/landscape/square
          competitor screenshots all show fully without cropping. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/5 bg-gradient-to-br from-canvas to-white/[0.02] p-3">
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
      <div className="flex h-full w-full items-center justify-center">
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
        'h-full w-full object-contain transition-opacity duration-500',
        ok === null && 'opacity-0',
      )}
    />
  );
}
