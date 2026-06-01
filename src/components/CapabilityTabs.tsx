import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Play, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn, withBase } from '@/lib/utils';
import type { CapabilityTab, CapabilityCard } from '@/types';

interface CapabilityTabsProps {
  tabs: CapabilityTab[];
  className?: string;
}

/**
 * Monday-style top tabs + horizontal carousel of capability cards.
 *
 *  - Top: pill tabs (active = violet)
 *  - Below: optional tagline
 *  - Carousel of cards with:
 *      - native horizontal scroll + scroll-snap (works on touch)
 *      - left/right arrow buttons on desktop
 *      - hidden scrollbar, fade masks on the edges
 */
export function CapabilityTabs({ tabs, className }: CapabilityTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  if (!active) return null;

  return (
    <div className={cn('w-full', className)}>
      {/* Tab nav */}
      <nav
        aria-label="Capability domains"
        className="flex w-full flex-wrap justify-center gap-2 md:gap-3"
      >
        {tabs.map((t) => {
          const isActive = t.id === active.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              aria-pressed={isActive}
              className={cn(
                'cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
                isActive
                  ? 'bg-accent text-canvas shadow-[0_8px_24px_-12px_rgba(165,138,255,0.7)]'
                  : 'border border-white/10 bg-white/[0.03] text-ink/80 hover:border-white/20 hover:bg-white/[0.06] hover:text-ink',
              )}
            >
              {t.title}
            </button>
          );
        })}
      </nav>

      {/* Tab body — tagline + carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          {active.tagline && (
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted md:text-lg">
              {active.tagline}
            </p>
          )}

          <CardCarousel cards={active.cards} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CardCarousel({ cards }: { cards: CapabilityCard[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  // Track scroll position to enable/disable arrow buttons.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    function check() {
      if (!el) return;
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }
    check();
    el.addEventListener('scroll', check, { passive: true });
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', check);
      ro.disconnect();
    };
  }, [cards]);

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    // Scroll by one card width (~80% of viewport on mobile, single card on desktop)
    const card = el.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  return (
    <div className="relative mt-10">
      {/* Arrow buttons — hidden on touch / when not applicable */}
      <div className="mb-5 hidden items-center justify-end gap-2 md:flex">
        <CarouselArrow
          direction="prev"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
          label="Previous card"
        />
        <CarouselArrow
          direction="next"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
          label="Next card"
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
          aria-label="Capability cards"
          tabIndex={0}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              data-card
              className={cn(
                'shrink-0 snap-start',
                // ~85% on mobile so the next card peeks; fixed width on desktop
                'w-[85%] sm:w-[60%] md:w-[420px] lg:w-[460px]',
                i === 0 && 'ml-0',
              )}
            >
              <CardTile card={card} />
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

function CardTile({ card }: { card: CapabilityCard }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.05]">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5">
        {card.media.type === 'video' ? (
          <MediaVideo src={card.media.src} alt={card.media.alt} />
        ) : (
          <MediaImage src={card.media.src} alt={card.media.alt} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-display text-lg font-semibold leading-tight text-ink md:text-xl">
          {card.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
      </div>
    </article>
  );
}

function MediaImage({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false) {
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

function MediaVideo({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <Play className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <p className="mt-3 px-4 font-mono text-[10px] text-white/40">{src}</p>
        </div>
      </div>
    );
  }
  return (
    <video
      src={withBase(src)}
      muted
      loop
      playsInline
      autoPlay
      aria-label={alt}
      className={cn('h-full w-full object-cover', ok === null && 'opacity-0')}
      onLoadedData={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}
