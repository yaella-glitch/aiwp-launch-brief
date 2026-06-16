import { motion, useReducedMotion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { bottomLine } from '@/content';

/**
 * The bottom line — short, scannable takeaways inside a single violet-framed
 * card. Title and bullets share the frame. No subtitle.
 */
export function BottomLine() {
  const reduce = useReducedMotion();
  return (
    <section
      id="bottom-line"
      data-section="bottom-line"
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-accent/40 bg-white/[0.015] p-9 md:p-12">
            {/* Very subtle violet glow in the corner — barely there */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_15%_0%,rgba(165,138,255,0.07),transparent_55%)]"
            />

            <h2 className="relative font-display text-[clamp(32px,5vw,60px)] font-bold leading-[1.0] tracking-tight text-ink">
              {bottomLine.title}
            </h2>

            <ul className="relative mt-10 space-y-4">
              {bottomLine.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={reduce ? undefined : { opacity: 0, x: -8 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[10px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <p className="text-base leading-relaxed text-ink/90 md:text-lg">{point}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
