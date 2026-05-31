import { motion, useReducedMotion } from 'framer-motion';
import { KineticHeadline } from '@/components/KineticHeadline';
import { ScrollExpandHero } from '@/components/ScrollExpandHero';
import { hero, manifest } from '@/content';
import { cn } from '@/lib/utils';

/**
 * Hero — scroll-expand image pattern.
 *  - Title block (badge + eyebrow + kinetic headline + subhead + date) at top
 *  - Foreground image starts small in center, expands to fill viewport on scroll
 *  - Once fully expanded, the page resumes normal scroll
 *
 * Typography is intentionally restrained: headline at clamp(40-72px), not the
 * earlier 12vw display scale.
 */
export function Hero({ presentMode: _ }: { presentMode: boolean }) {
  const reduce = useReducedMotion();

  return (
    <ScrollExpandHero
      imageSrc={manifest.siteMeta.heroImagePath}
      imageAlt="AI work platform — Milestone 2 hero visual"
      title={
        <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col items-center">
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
            className="mt-5 text-[11px] font-medium uppercase tracking-[0.22em] text-accent"
          >
            {hero.eyebrow}
          </motion.p>

          <h1
            className={cn(
              'mt-3 font-display font-bold leading-[0.98] tracking-[-0.03em] text-ink',
              // Tighter scale than before — clamp(36 → 64)
              'text-[clamp(36px,5.5vw,64px)]',
            )}
          >
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
            className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-white/85 md:text-base"
          >
            {hero.subhead}
          </motion.p>

          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-5 inline-flex items-center gap-2.5"
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
      }
    />
  );
}
