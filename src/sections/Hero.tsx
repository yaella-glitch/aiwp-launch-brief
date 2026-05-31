import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Sparkles } from '@/components/Sparkles';
import { KineticHeadline } from '@/components/KineticHeadline';
import { hero } from '@/content';
import { cn } from '@/lib/utils';

/**
 * Hero — dark canvas + sparkles overlay + kinetic centered title.
 *
 * Pattern adapted from Aceternity's Sparkles. Simple, reliable, and
 * the title is always legible.
 */
export function Hero({ presentMode }: { presentMode: boolean }) {
  const reduce = useReducedMotion();
  return (
    <section
      id="hero"
      data-section="hero"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-canvas"
    >
      {/* Subtle ambient bloom behind the title */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      {/* Sparkles overlay — twinkling dots */}
      <Sparkles count={140} minRadius={0.3} maxRadius={1.6} speed={0.8} />

      {/* Bottom mask fade into next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-canvas"
      />

      {/* Content */}
      <div
        className={cn(
          'relative z-[2] mx-auto w-full max-w-3xl px-6 text-center',
          presentMode ? 'py-20' : 'py-24 md:py-28',
        )}
      >
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 6 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur"
        >
          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(165,138,255,0.8)]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/90">
            {hero.badge}
          </span>
        </motion.div>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 6 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-[11px] font-medium uppercase tracking-[0.22em] text-accent"
        >
          {hero.eyebrow}
        </motion.p>

        <h1 className="mt-4 font-display text-[clamp(40px,7vw,80px)] font-bold leading-[0.98] tracking-[-0.03em] text-ink">
          <KineticHeadline text={hero.headline} delay={0.2} stagger={0.06} />{' '}
          <KineticHeadline
            text={hero.highlight}
            delay={0.2 + hero.headline.split(' ').length * 0.06 + 0.05}
            stagger={0.06}
            gradient
          />
        </h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mx-auto mt-6 max-w-xl text-sm font-medium leading-relaxed text-white/85 md:text-base"
        >
          {hero.subhead}
        </motion.p>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mt-7 inline-flex items-center gap-2.5"
        >
          <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
            Launching
          </span>
          <span className="font-display text-sm font-semibold text-ink md:text-base">
            {hero.launchDate}
          </span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => {
          document.querySelector('#product-overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 z-[3] -translate-x-1/2 cursor-pointer rounded-full border border-white/15 bg-white/5 p-3 text-white/70 backdrop-blur transition-colors duration-200 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="block"
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.span>
      </motion.button>
    </section>
  );
}
