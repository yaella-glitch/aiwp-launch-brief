import { motion, useReducedMotion } from 'framer-motion';
import { HighlightText } from '@/components/HighlightText';
import { BackgroundCarousel } from '@/components/BackgroundCarousel';
import { background } from '@/content';

/**
 * Background — title + story + highlighted closing line on the left,
 * a small carousel of stat / concept cards on the right.
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
        <motion.h2
          initial={reduce ? undefined : { opacity: 0, y: 14, filter: 'blur(8px)' }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(36px,5.5vw,72px)] font-bold leading-[0.98] tracking-tight text-ink"
        >
          {background.title}
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 items-start gap-10 md:mt-16 md:grid-cols-[1.4fr_1fr] md:gap-14 lg:gap-20">
          {/* Left: story + highlight */}
          <div>
            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-base leading-relaxed text-muted md:text-lg"
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

          {/* Right: stat carousel */}
          {background.carousel && background.carousel.length > 0 && (
            <div className="md:pl-2">
              <BackgroundCarousel slides={background.carousel} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
