import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Sparkles } from '@/components/Sparkles';
import { KineticHeadline } from '@/components/KineticHeadline';
import { hero } from '@/content';
import { cn } from '@/lib/utils';

/**
 * Hero — Aceternity Sparkles pattern (the "Acme" variant).
 *
 * Centered headline above a glowing horizontal "beam" that contains
 * twinkling sparkles. The beam = two gradient lines (indigo + sky) with
 * a sparkle band. A radial mask fades the edges so it looks like a
 * light burst under the title.
 *
 * Reference:
 * https://21st.dev/community/components/aceternity/sparkles/default
 */
export function Hero({ presentMode }: { presentMode: boolean }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      data-section="hero"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-canvas"
    >
      {/* Content */}
      <div
        className={cn(
          'relative z-[2] mx-auto w-full max-w-3xl px-6 text-center',
          presentMode ? 'pt-12' : 'pt-24 md:pt-20',
        )}
      >
        {/* Badge */}
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

        {/* Eyebrow */}
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 6 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-[11px] font-medium uppercase tracking-[0.22em] text-accent"
        >
          {hero.eyebrow}
        </motion.p>

        {/* Headline */}
        <h1 className="mt-4 font-display text-[clamp(40px,7vw,84px)] font-bold leading-[1.0] tracking-[-0.02em] text-ink">
          <KineticHeadline text={hero.headline} delay={0.2} stagger={0.06} />{' '}
          <KineticHeadline
            text={hero.highlight}
            delay={0.2 + hero.headline.split(' ').length * 0.06 + 0.05}
            stagger={0.06}
            gradient
          />
        </h1>

        {/* Beam container — sparkles + gradient lines + radial mask */}
        <div className="relative mx-auto mt-4 h-40 w-full max-w-2xl">
          {/* Wide indigo gradient line */}
          <div className="absolute inset-x-16 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm" />
          <div className="absolute inset-x-16 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
          {/* Narrow sky gradient line */}
          <div className="absolute inset-x-48 top-0 h-[5px] w-1/4 bg-gradient-to-r from-transparent via-sky-400 to-transparent blur-sm" />
          <div className="absolute inset-x-48 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />

          {/* Sparkle band */}
          <Sparkles count={160} minRadius={0.4} maxRadius={1.4} speed={0.9} />

          {/* Radial mask — fades sparkles to canvas on edges */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-canvas"
            style={{
              maskImage:
                'radial-gradient(420px 200px at top, transparent 20%, black 80%)',
              WebkitMaskImage:
                'radial-gradient(420px 200px at top, transparent 20%, black 80%)',
            }}
          />
        </div>

        {/* Subhead */}
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mx-auto -mt-12 max-w-xl text-sm font-medium leading-relaxed text-white/85 md:text-base"
        >
          {hero.subhead}
        </motion.p>

        {/* Launch date */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mt-6 inline-flex items-center gap-2.5"
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
