import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollExpandHeroProps {
  /** Foreground "lens" image that starts small in the center and expands. */
  mediaSrc: string;
  mediaAlt?: string;
  /** Full-bleed background image — fades as the foreground media expands. */
  bgImageSrc: string;
  /** Two-line title: first line sits above the card, rest below. */
  titleFirstLine: string;
  titleRestLine: string;
  /** Small text below the card (eyebrow / date). */
  subtitle?: string;
  /** Smaller hint string ("Scroll to expand"). */
  scrollHint?: string;
  /** When true, title uses mix-blend-difference for the knockout look. */
  textBlend?: boolean;
  className?: string;
}

/**
 * Pattern adapted faithfully from Magic MCP (arunachalam0606/scroll-expansion-hero).
 *
 *  - Full-bleed background image, fades as user scrolls.
 *  - Foreground media card in the absolute center, starts ~300x400 and grows
 *    to fill the viewport on wheel/touch.
 *  - Title sits in two lines that visually wrap around the card; with
 *    `textBlend`, mix-blend-difference makes them feel like the card is a
 *    lens cutting through the title.
 *  - Each title line translates horizontally as scroll progresses (the
 *    signature move).
 *  - When fully expanded, the page resumes normal scroll.
 */
export function ScrollExpandHero({
  mediaSrc,
  mediaAlt = 'Hero visual',
  bgImageSrc,
  titleFirstLine,
  titleRestLine,
  subtitle,
  scrollHint,
  textBlend = true,
  className,
}: ScrollExpandHeroProps) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (reduce) {
      setProgress(1);
      setExpanded(true);
    }
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;

    function onWheel(e: WheelEvent) {
      if (expanded) {
        if (e.deltaY < 0 && window.scrollY <= 4) {
          setExpanded(false);
          e.preventDefault();
        }
        return;
      }
      e.preventDefault();
      const delta = e.deltaY * 0.0009;
      setProgress((p) => {
        const next = Math.min(Math.max(p + delta, 0), 1);
        if (next >= 1) setExpanded(true);
        return next;
      });
    }

    function onTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0]?.clientY ?? 0;
    }
    function onTouchMove(e: TouchEvent) {
      if (!touchStartY.current) return;
      const y = e.touches[0]?.clientY ?? 0;
      const dy = touchStartY.current - y;
      if (expanded) {
        if (dy < -20 && window.scrollY <= 4) {
          setExpanded(false);
          e.preventDefault();
        }
        return;
      }
      e.preventDefault();
      setProgress((p) => {
        const next = Math.min(Math.max(p + dy * 0.006, 0), 1);
        if (next >= 1) setExpanded(true);
        return next;
      });
      touchStartY.current = y;
    }

    function onScroll() {
      if (!expanded) window.scrollTo(0, 0);
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [expanded, reduce]);

  // Geometry — matches the reference pattern (start 300x400, expand to ~85vw)
  const mediaWidth = 300 + progress * (isMobile ? 600 : 1100);
  const mediaHeight = 400 + progress * (isMobile ? 200 : 380);
  const textTranslateX = progress * (isMobile ? 180 : 130);

  return (
    <section
      className={cn(
        'relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-canvas',
        className,
      )}
    >
      {/* Background image */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{ opacity: reduce ? 0.4 : 1 - progress * 0.85 }}
      >
        <FullBleedImage src={bgImageSrc} alt="" />
        <div className="absolute inset-0 bg-canvas/40" />
      </motion.div>

      {/* Foreground "lens" image card — absolute center */}
      <div
        className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        style={{
          width: `${mediaWidth}px`,
          height: `${mediaHeight}px`,
          maxWidth: '95vw',
          maxHeight: '85vh',
        }}
      >
        <FullBleedImage src={mediaSrc} alt={mediaAlt} />
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-black"
          style={{ opacity: 0.55 - progress * 0.55 }}
        />
      </div>

      {/* Subtitle below the card — eyebrow + hint, translate horizontally on scroll */}
      <div className="pointer-events-none absolute bottom-[18%] left-0 right-0 z-[2] flex flex-col items-center text-center md:bottom-[15%]">
        {subtitle && (
          <p
            className="text-xs font-medium uppercase tracking-[0.22em] text-white/90 transition-none"
            style={{ transform: `translateX(-${textTranslateX}vw)` }}
          >
            {subtitle}
          </p>
        )}
        {scrollHint && (
          <p
            className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white/70 transition-none"
            style={{ transform: `translateX(${textTranslateX}vw)`, opacity: 1 - progress }}
          >
            {scrollHint}
          </p>
        )}
      </div>

      {/* Title — sits around the card, mix-blend-difference for the "knockout" effect */}
      <div
        className={cn(
          'pointer-events-none relative z-[3] flex w-full flex-col items-center justify-center gap-2 px-6 text-center md:gap-4',
          textBlend ? 'mix-blend-difference' : '',
        )}
      >
        <motion.h1
          className="font-display text-[clamp(40px,8vw,108px)] font-bold leading-[0.95] tracking-tight text-[#e5e7ff] transition-none"
          style={{ transform: `translateX(-${textTranslateX}vw)` }}
        >
          {titleFirstLine}
        </motion.h1>
        <motion.h1
          className="font-display text-[clamp(40px,8vw,108px)] font-bold leading-[0.95] tracking-tight text-[#e5e7ff] transition-none"
          style={{ transform: `translateX(${textTranslateX}vw)` }}
        >
          {titleRestLine}
        </motion.h1>
      </div>
    </section>
  );
}

function FullBleedImage({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(165,138,255,0.2),transparent_55%),rgb(17,17,32)]">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <ImageIcon className="h-5 w-5 text-white/70" aria-hidden="true" />
          </span>
          <p className="mt-3 px-6 font-mono text-[10px] text-white/50">{src}</p>
        </div>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={cn('h-full w-full object-cover', ok === null && 'opacity-0')}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}
