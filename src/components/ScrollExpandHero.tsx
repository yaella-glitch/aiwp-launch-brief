import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollExpandHeroProps {
  /** Foreground image that starts small and expands to fill the viewport. */
  imageSrc: string;
  imageAlt?: string;
  /** Optional ambient background image behind everything. Falls back to mesh. */
  bgImageSrc?: string;
  /** Hero title/eyebrow/badge content rendered above the expanding image. */
  title: ReactNode;
  /** Hint text shown under the image while it's small. */
  scrollHint?: string;
  className?: string;
}

/**
 * Pattern adapted from Magic MCP's "Scroll Media Expansion Hero":
 * - A foreground image (or video) starts small (~300px wide).
 * - Wheel/touch scroll grows it to fullscreen instead of scrolling the page.
 * - Once fully expanded, the page resumes normal scroll.
 * - Background fades + foreground darkening lifts as the image grows.
 *
 * Adapted to dark theme + reduce-motion friendly.
 */
export function ScrollExpandHero({
  imageSrc,
  imageAlt = 'Hero visual',
  bgImageSrc,
  title,
  scrollHint = 'Scroll to expand',
  className,
}: ScrollExpandHeroProps) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0); // 0 → 1
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const touchStartY = useRef(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // If reduce-motion is on, skip the interaction lock — just show fully expanded immediately.
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
        // Already expanded — only swallow upward scroll past the top to re-collapse.
        if (e.deltaY < 0 && window.scrollY <= 4) {
          setExpanded(false);
          setProgress((p) => Math.max(0.85, p));
          e.preventDefault();
        }
        return;
      }
      // Lock page scroll while the image grows.
      e.preventDefault();
      const delta = e.deltaY * 0.00075;
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
        const next = Math.min(Math.max(p + dy * 0.005, 0), 1);
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

  // Geometry — derived from progress (0..1).
  const mediaWidth = 300 + progress * (isMobile ? 600 : 1100);
  const mediaHeight = 200 + progress * (isMobile ? 280 : 480);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden',
        className,
      )}
    >
      {/* Background — ambient image (fades as image expands) */}
      {bgImageSrc && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{ opacity: reduce ? 0.35 : 1 - progress * 0.65 }}
        >
          <img src={bgImageSrc} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-canvas/70" />
        </motion.div>
      )}

      {/* Title block — fades + scales out as image grows */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto flex flex-col items-center px-6 pt-24 text-center md:pt-32"
        style={{ opacity: 1 - progress * 0.9, transform: `translateY(${-progress * 30}px)` }}
      >
        {title}
      </motion.div>

      {/* Expanding image card */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
        style={{
          width: `${mediaWidth}px`,
          height: `${mediaHeight}px`,
          maxWidth: '95vw',
          maxHeight: '85vh',
        }}
        transition={{ type: 'tween', duration: 0 }}
      >
        <FrameImage src={imageSrc} alt={imageAlt} />
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-canvas"
          style={{ opacity: 0.55 - progress * 0.55 }}
        />
      </motion.div>

      {/* Hint below the image, while small */}
      <motion.p
        aria-hidden={progress > 0.5}
        className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 font-mono text-xs uppercase tracking-[0.25em] text-white/70"
        style={{ opacity: 1 - progress * 1.2 }}
      >
        {scrollHint}
      </motion.p>
    </section>
  );
}

function FrameImage({ src, alt }: { src: string; alt: string }) {
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
