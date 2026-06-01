import { motion, useReducedMotion } from 'framer-motion';
import { HighlightText } from '@/components/HighlightText';
import { background } from '@/content';

/**
 * Background section — title + paragraphs + a smaller HighlightText
 * accent on the closing line that connects back to the vision.
 */
export function Background() {
  const reduce = useReducedMotion();

  return (
    <section
      id="background"
      data-section="background"
      className="relative w-full overflow-hidden py-32 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-10 lg:px-16">
        <motion.h2
          initial={reduce ? undefined : { opacity: 0, y: 14, filter: 'blur(8px)' }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(36px,5.5vw,72px)] font-bold leading-[0.98] tracking-tight text-ink"
        >
          {background.title}
        </motion.h2>

        <div className="mt-8 space-y-5">
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

        {/* HighlightText accent — paints a gradient bar across the line on scroll */}
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 font-display text-lg font-semibold leading-snug text-ink md:text-xl"
        >
          <HighlightText duration={1.4} delay={0.4}>{background.marqueeText}</HighlightText>
        </motion.p>
      </div>
    </section>
  );
}
