import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageIcon, User, Users, ArrowRight } from 'lucide-react';
import { cn, withBase } from '@/lib/utils';
import type { BackgroundCarouselSlide } from '@/types';

interface BackgroundCarouselProps {
  slides: BackgroundCarouselSlide[];
  /** Auto-advance interval in ms. 0 disables. */
  autoAdvanceMs?: number;
  className?: string;
}

/**
 * Slide-style carousel. Each entry is a real slide-shaped container that
 * holds either:
 *   - an image (drop a PNG/JPG into /public and reference it), or
 *   - a designed fallback (big stat number, or an icon arrangement).
 *
 * Built like a presentation carousel: prev / next arrows on the OUTSIDE
 * left and right of the slide, dot indicators bottom-right inside, caption
 * underneath the slide. Auto-advances; pauses while the cursor is over it.
 */
export function BackgroundCarousel({
  slides,
  autoAdvanceMs = 6000,
  className,
}: BackgroundCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const slide = slides[index];

  useEffect(() => {
    if (!autoAdvanceMs || paused || slides.length <= 1) return;
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, autoAdvanceMs);
    return () => window.clearTimeout(id);
  }, [index, paused, autoAdvanceMs, slides.length]);

  function next() {
    setIndex((i) => (i + 1) % slides.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  if (!slide) return null;
  const showArrows = slides.length > 1;

  return (
    <div
      className={cn('relative w-full', showArrows && 'px-7 md:px-9', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 bg-canvas shadow-card-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <SlideContent slide={slide} />
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === index ? 'w-6 bg-ink/90' : 'w-1.5 bg-ink/30 hover:bg-ink/50',
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Caption — sits below the slide */}
      {slide.caption && (
        <p className="mt-5 text-center text-sm leading-relaxed text-muted md:text-base">
          {slide.caption}
        </p>
      )}

      {/* Navigation arrows — outside left + right of the slide */}
      {showArrows && (
        <>
          <ArrowButton
            direction="prev"
            onClick={prev}
            className="left-0 top-1/2"
          />
          <ArrowButton
            direction="next"
            onClick={next}
            className="right-0 top-1/2"
          />
        </>
      )}
    </div>
  );
}

/* ---------- slide content (image or designed fallback) ---------- */

function SlideContent({ slide }: { slide: BackgroundCarouselSlide }) {
  // Real image — when provided
  if (slide.image) {
    return <SlideImage src={slide.image} alt={slide.caption ?? ''} fallback={slide} />;
  }
  // Designed fallback
  return <SlideFallback slide={slide} />;
}

function SlideImage({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: BackgroundCarouselSlide;
}) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false) {
    return <SlideFallback slide={fallback} />;
  }
  return (
    <img
      src={withBase(src)}
      alt={alt}
      className={cn('h-full w-full object-cover', ok === null && 'opacity-0')}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}

function SlideFallback({ slide }: { slide: BackgroundCarouselSlide }) {
  const isWarning = slide.tone === 'warning';
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center p-8 md:p-12',
        isWarning
          ? 'bg-gradient-to-br from-amber-500/[0.12] via-canvas to-canvas'
          : 'bg-gradient-to-br from-accent/[0.12] via-canvas to-canvas',
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0',
          isWarning
            ? '[background:radial-gradient(circle_at_30%_20%,rgba(251,191,36,0.10),transparent_55%)]'
            : '[background:radial-gradient(circle_at_30%_20%,rgba(165,138,255,0.14),transparent_55%)]',
        )}
      />

      {slide.kind === 'stat' && slide.stat ? (
        <p
          className={cn(
            'relative font-display font-bold leading-[0.95] tracking-[-0.02em]',
            'text-[clamp(72px,12vw,176px)]',
            isWarning
              ? 'bg-gradient-to-br from-amber-200 via-amber-300 to-rose-300 bg-clip-text text-transparent'
              : 'bg-gradient-to-br from-violet-200 via-indigo-200 to-sky-300 bg-clip-text text-transparent',
          )}
        >
          {slide.stat}
        </p>
      ) : slide.kind === 'visual' ? (
        <IndividualToTeamVisual />
      ) : (
        <div className="relative text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <ImageIcon className="h-6 w-6 text-white/60" aria-hidden="true" />
          </span>
          <p className="mt-3 font-mono text-[11px] text-white/40">slide placeholder</p>
        </div>
      )}
    </div>
  );
}

function IndividualToTeamVisual() {
  return (
    <div className="relative flex items-center gap-6 md:gap-8">
      {/* Solo */}
      <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-canvas/80 md:h-20 md:w-20">
        <User className="h-8 w-8 text-ink/75 md:h-10 md:w-10" aria-hidden="true" />
      </span>

      {/* Arrow */}
      <ArrowRight
        className="h-7 w-7 shrink-0 text-accent md:h-8 md:w-8"
        aria-hidden="true"
      />

      {/* Team — bigger, with accent dots around */}
      <div className="relative">
        <span className="grid h-24 w-24 place-items-center rounded-2xl border border-accent/40 bg-accent/[0.10] shadow-[0_0_40px_-12px_rgba(165,138,255,0.55)] md:h-28 md:w-28">
          <Users className="h-12 w-12 text-accent md:h-14 md:w-14" aria-hidden="true" />
        </span>
        <span className="absolute -right-2 -top-2 h-3 w-3 rounded-full border border-accent/50 bg-canvas" />
        <span className="absolute -right-3 bottom-1 h-2 w-2 rounded-full border border-accent/50 bg-canvas" />
        <span className="absolute -left-2 bottom-2 h-2.5 w-2.5 rounded-full border border-accent/50 bg-canvas" />
      </div>
    </div>
  );
}

/* ---------- navigation arrow ---------- */

function ArrowButton({
  direction,
  onClick,
  className,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      className={cn(
        'group absolute z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full',
        'border border-white/15 bg-canvas/90 text-ink/85 backdrop-blur',
        'shadow-[0_0_24px_-8px_rgba(0,0,0,0.6)]',
        'transition-all duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-ink',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
        className,
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
