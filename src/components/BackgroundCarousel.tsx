import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BackgroundCarouselSlide } from '@/types';

interface BackgroundCarouselProps {
  slides: BackgroundCarouselSlide[];
  /** Auto-advance interval in ms. Set 0 to disable. */
  autoAdvanceMs?: number;
  className?: string;
}

/**
 * Background section carousel — 2 (or more) stat / concept cards that cross-
 * fade with an arrow control. Auto-advances every ~5s unless paused.
 */
export function BackgroundCarousel({
  slides,
  autoAdvanceMs = 5500,
  className,
}: BackgroundCarouselProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const slide = slides[index];

  // Auto-advance
  useEffect(() => {
    if (!autoAdvanceMs || slides.length <= 1) return;
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, autoAdvanceMs);
    return () => window.clearTimeout(id);
  }, [index, autoAdvanceMs, slides.length]);

  function next() {
    setIndex((i) => (i + 1) % slides.length);
  }

  if (!slide) return null;

  const isWarning = slide.tone === 'warning';

  return (
    <div className={cn('relative h-full w-full', className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
        {/* Slide content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'absolute inset-0 flex flex-col justify-between p-7 md:p-9',
              isWarning
                ? 'bg-gradient-to-br from-amber-500/[0.10] via-canvas to-canvas'
                : 'bg-gradient-to-br from-accent/[0.10] via-canvas to-canvas',
            )}
          >
            {/* Soft glow */}
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-0',
                isWarning
                  ? '[background:radial-gradient(circle_at_30%_0%,rgba(251,191,36,0.10),transparent_55%)]'
                  : '[background:radial-gradient(circle_at_30%_0%,rgba(165,138,255,0.14),transparent_55%)]',
              )}
            />

            {/* Stat — big */}
            <div className="relative">
              <p
                className={cn(
                  'font-display font-bold leading-[0.95] tracking-[-0.02em]',
                  'text-[clamp(56px,8vw,128px)]',
                  isWarning
                    ? 'bg-gradient-to-br from-amber-200 via-amber-300 to-rose-300 bg-clip-text text-transparent'
                    : 'bg-gradient-to-br from-violet-200 via-indigo-200 to-sky-300 bg-clip-text text-transparent',
                )}
              >
                {slide.stat}
              </p>
            </div>

            {/* Caption */}
            <p className="relative text-base leading-relaxed text-ink/85 md:text-lg">
              {slide.caption}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicator dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-5 right-5 z-10 flex items-center gap-1.5">
            {slides.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === index ? 'w-6 bg-accent' : 'w-1.5 bg-white/25',
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Arrow button — sits between/beside slides to advance */}
      {slides.length > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className={cn(
            'group absolute -left-5 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full',
            'border border-accent/40 bg-canvas shadow-[0_0_24px_-8px_rgba(165,138,255,0.6)]',
            'transition-all duration-200 hover:border-accent hover:bg-accent/15',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
          )}
        >
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 text-accent transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      )}
    </div>
  );
}
