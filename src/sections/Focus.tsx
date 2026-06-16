import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { focus } from '@/content';
import { cn, withBase } from '@/lib/utils';
import type { FocusItem } from '@/types';

/**
 * What we lead with externally — tablet/device-frame carousel.
 *
 * One designed slide visible at a time, framed in a subtle tablet-style
 * bezel. Prev / next chevrons sit OUTSIDE the device on the left and right.
 * Dot indicators below. Active slide's title + description renders below
 * the device as the dedicated text area.
 */
export function Focus() {
  return (
    <section
      id="focus"
      data-section="focus"
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader title={focus.title} lede={focus.lede ?? ''} />

        <ScrollReveal delay={0.05}>
          <div className="mt-20">
            <FocusCarousel items={focus.items} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function FocusCarousel({ items }: { items: FocusItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const item = items[index];

  // Auto-advance every 7s; pauses on hover
  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 7000);
    return () => window.clearTimeout(id);
  }, [index, paused, items.length]);

  function next() {
    setIndex((i) => (i + 1) % items.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }

  if (!item) return null;

  return (
    <div
      className="relative w-full px-8 md:px-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Device frame — outer bezel */}
      <div className="relative rounded-[28px] border border-white/15 bg-canvas/40 p-2.5 shadow-[0_30px_120px_-40px_rgba(165,138,255,0.35)] md:p-3">
        {/* Screen — inner */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] bg-canvas">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={reduce ? undefined : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <SlideImage src={item.image} alt={item.title} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dot indicators — below the device */}
      {items.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === index ? 'w-8 bg-accent' : 'w-1.5 bg-white/25 hover:bg-white/45',
              )}
            />
          ))}
        </div>
      )}

      {/* Arrow buttons — outside the device, vertically centered against the screen */}
      {items.length > 1 && (
        <>
          <ArrowButton direction="prev" onClick={prev} />
          <ArrowButton direction="next" onClick={next} />
        </>
      )}
    </div>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      className={cn(
        'group absolute top-[28%] z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full',
        'border border-white/20 bg-canvas/85 text-ink/85 backdrop-blur',
        'shadow-[0_0_24px_-8px_rgba(0,0,0,0.6)]',
        'transition-all duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-ink',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
        direction === 'prev' ? 'left-0' : 'right-0',
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          'h-5 w-5 transition-transform duration-200',
          direction === 'prev' ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5',
        )}
      />
    </button>
  );
}

function SlideImage({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/12 via-canvas to-canvas">
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
      className={cn('h-full w-full object-contain', ok === null && 'opacity-0')}
    />
  );
}
