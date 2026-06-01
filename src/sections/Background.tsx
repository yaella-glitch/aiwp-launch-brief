import { motion, useReducedMotion } from 'framer-motion';
import { background } from '@/content';

/**
 * Background section — title + paragraphs (left) and a vertical
 * scrolling marquee on the right side. Reads like a ticker that
 * reinforces "this milestone completes the vision".
 */
export function Background() {
  const reduce = useReducedMotion();

  // Build a long string from repeated marquee text + diamond separator,
  // duplicated so the loop never reveals a hard edge.
  const marqueeBlock = Array.from({ length: 8 }, (_, i) => (
    <span key={i} className="inline-flex items-center gap-6 pr-6">
      <span>{background.marqueeText}</span>
      <span aria-hidden="true" className="text-accent">◆</span>
    </span>
  ));

  return (
    <section
      id="background"
      data-section="background"
      className="relative w-full overflow-hidden py-32 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* Title + paragraphs */}
          <div>
            <motion.h2
              initial={reduce ? undefined : { opacity: 0, y: 14, filter: 'blur(8px)' }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(36px,5.5vw,72px)] font-bold leading-[0.98] tracking-tight text-ink"
            >
              {background.title}
            </motion.h2>

            <div className="mt-8 space-y-5 max-w-2xl">
              {background.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={reduce ? undefined : { opacity: 0, y: 8 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.08 }}
                  className="text-base leading-relaxed text-muted md:text-lg"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Vertical scrolling marquee */}
          <div className="relative h-[320px] overflow-hidden md:h-[420px] lg:h-[480px]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas z-[2] pointer-events-none"
            />
            <div className="absolute inset-0 flex flex-col">
              {/* Two stacked tracks so the scroll loops seamlessly */}
              <MarqueeTrack reduce={reduce ?? false}>{marqueeBlock}</MarqueeTrack>
              <MarqueeTrack reduce={reduce ?? false}>{marqueeBlock}</MarqueeTrack>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeTrack({
  children,
  reduce,
}: {
  children: React.ReactNode;
  reduce: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      animate={reduce ? undefined : { y: ['0%', '-100%'] }}
      transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
      className="shrink-0 font-display text-xl font-medium leading-relaxed text-ink/70 md:text-2xl"
    >
      <div className="flex flex-col gap-10">{children}</div>
    </motion.div>
  );
}
