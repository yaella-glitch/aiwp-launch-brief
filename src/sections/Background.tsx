import { motion, useReducedMotion } from 'framer-motion';
import { HighlightText } from '@/components/HighlightText';
import { GistOrbit } from '@/components/GistOrbit';
import { background } from '@/content';

/**
 * Background section — title + 2-3 sentence gist story + the gist visual
 * (radial orbital: Humans+Agents at center, 5 wrapper concepts orbiting).
 */
export function Background() {
  const reduce = useReducedMotion();

  return (
    <section
      id="background"
      data-section="background"
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Header column — narrower for readability */}
        <div className="max-w-3xl">
          <motion.h2
            initial={reduce ? undefined : { opacity: 0, y: 14, filter: 'blur(8px)' }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(36px,5.5vw,72px)] font-bold leading-[0.98] tracking-tight text-ink"
          >
            {background.title}
          </motion.h2>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-8 text-base leading-relaxed text-muted md:text-lg"
          >
            {background.story}
          </motion.p>

          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 8 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 font-display text-lg font-semibold leading-snug text-ink md:text-xl"
          >
            <HighlightText duration={1.4} delay={0.4}>{background.highlight}</HighlightText>
          </motion.p>
        </div>

        {/* Gist visual */}
        <div className="mt-24">
          <GistOrbit center={background.gist.center} nodes={background.gist.nodes} />
        </div>
      </div>
    </section>
  );
}
