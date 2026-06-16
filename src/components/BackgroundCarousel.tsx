import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BackgroundCarouselSlide } from '@/types';

interface BackgroundCarouselProps {
  slides: BackgroundCarouselSlide[];
  /** Auto-advance interval in ms. Set 0 to disable. */
  autoAdvanceMs?: number;
  className?: string;
}

/**
 * Background section carousel. Each slide is either:
 *   - 'stat'   → big headline number (e.g. "95%") + caption
 *   - 'visual' → icon arrangement (e.g. solo person → team) + caption
 * Cross-fades between slides, auto-advances every ~5.5s, with an arrow
 * button to skip and dot indicators bottom-right.
 */
export function BackgroundCarousel({
  slides,
  autoAdvanceMs = 5500,
  className,
}: BackgroundCarouselProps) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const slide = slides[index];

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
      <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'absolute inset-0 flex flex-col p-7 md:p-9',
              isWarning
                ? 'bg-gradient-to-br from-amber-500/[0.10] via-canvas to-canvas'
                : 'bg-gradient-to-br from-accent/[0.10] via-canvas to-canvas',
            )}
          >
            {/* Soft corner glow */}
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-0',
                isWarning
                  ? '[background:radial-gradient(circle_at_30%_0%,rgba(251,191,36,0.10),transparent_55%)]'
                  : '[background:radial-gradient(circle_at_30%_0%,rgba(165,138,255,0.14),transparent_55%)]',
              )}
            />

            {/* Main visual area */}
            <div className="relative flex flex-1 items-center justify-center">
              {slide.kind === 'stat' && slide.stat ? (
                <p
                  className={cn(
                    'font-display font-bold leading-[0.95] tracking-[-0.02em]',
                    'text-[clamp(64px,10vw,144px)]',
                    isWarning
                      ? 'bg-gradient-to-br from-amber-200 via-amber-300 to-rose-300 bg-clip-text text-transparent'
                      : 'bg-gradient-to-br from-violet-200 via-indigo-200 to-sky-300 bg-clip-text text-transparent',
                  )}
                >
                  {slide.stat}
                </p>
              ) : (
                <IndividualToTeamVisual />
              )}
            </div>

            {/* Caption */}
            <p className="relative mt-4 text-base leading-relaxed text-ink/85 md:text-lg">
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

      {/* Arrow button to advance */}
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

/**
 * Individual → Team visual. A single person silhouette on the left, an arrow,
 * and a cluster of people on the right — visualizing that one person's output
 * doesn't translate to organizational output.
 */
function IndividualToTeamVisual() {
  return (
    <div className="flex items-center gap-4 md:gap-6">
      {/* Solo */}
      <div className="relative">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-canvas/80">
          <User className="h-7 w-7 text-ink/75" aria-hidden="true" />
        </span>
      </div>

      {/* Arrow */}
      <ArrowRight className="h-6 w-6 shrink-0 text-accent md:h-7 md:w-7" aria-hidden="true" />

      {/* Team — cluster, bigger */}
      <div className="relative">
        <span className="grid h-20 w-20 place-items-center rounded-2xl border border-accent/40 bg-accent/[0.10] shadow-[0_0_40px_-12px_rgba(165,138,255,0.55)] md:h-24 md:w-24">
          <Users className="h-10 w-10 text-accent md:h-12 md:w-12" aria-hidden="true" />
        </span>
        {/* Tiny outlined dots around to suggest more people */}
        <span className="absolute -right-2 -top-2 h-3 w-3 rounded-full border border-accent/50 bg-canvas" />
        <span className="absolute -right-3 bottom-1 h-2 w-2 rounded-full border border-accent/50 bg-canvas" />
        <span className="absolute -left-2 bottom-2 h-2.5 w-2.5 rounded-full border border-accent/50 bg-canvas" />
      </div>
    </div>
  );
}
