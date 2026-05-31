import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { MeshGradient } from '@/components/MeshGradient';
import { KineticHeadline } from '@/components/KineticHeadline';
import { ScrollHeroContainer } from '@/components/ScrollHeroContainer';
import { hero, manifest } from '@/content';
import { cn } from '@/lib/utils';

/**
 * Hero — scroll-driven container that tilts a hero image upright as the
 * user scrolls. Kinetic title above, with eyebrow + badge + launch date.
 * Pattern from Magic MCP (Aceternity ContainerScrollAnimation).
 */
export function Hero({ presentMode }: { presentMode: boolean }) {
  const reduce = useReducedMotion();
  return (
    <section
      id="hero"
      data-section="hero"
      className="relative w-full overflow-hidden"
    >
      <MeshGradient />

      {/* Vignette + bottom fade */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-canvas/40 via-transparent to-canvas" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(6,6,14,0.55)_90%)]" />
      </div>

      <ScrollHeroContainer
        className={cn(presentMode && 'min-h-[100svh]')}
        imageSrc={manifest.siteMeta.heroImagePath}
        imageAlt="AI work platform — Milestone 2 hero visual"
        title={
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur"
            >
              <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(165,138,255,0.8)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                {hero.badge}
              </span>
            </motion.div>

            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-8 text-eyebrow uppercase text-accent"
            >
              {hero.eyebrow}
            </motion.p>

            <h1
              className={cn(
                'mt-5 max-w-5xl font-display font-bold leading-[0.94] tracking-[-0.035em]',
                'text-[clamp(48px,10vw,128px)] text-ink',
              )}
            >
              <KineticHeadline text={hero.headline} delay={0.25} stagger={0.07} />
              <br />
              <KineticHeadline
                text={hero.highlight}
                delay={0.25 + hero.headline.split(' ').length * 0.07 + 0.1}
                stagger={0.08}
                gradient
              />
            </h1>

            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.3 }}
              className="mx-auto mt-10 max-w-2xl text-lead font-medium text-white/90"
            >
              {hero.subhead}
            </motion.p>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 1.6 }}
              className="mt-10 inline-flex items-center gap-3"
            >
              <span aria-hidden="true" className="h-px w-12 bg-gradient-to-r from-transparent via-accent to-transparent" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                Launching
              </span>
              <span className="font-display text-xl font-semibold text-ink md:text-2xl">
                {hero.launchDate}
              </span>
            </motion.div>
          </div>
        }
      />

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => {
          document.querySelector('#product-overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        initial={reduce ? undefined : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
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
