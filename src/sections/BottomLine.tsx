import { motion, useReducedMotion } from 'framer-motion';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { bottomLine } from '@/content';

/**
 * Executive summary — short, scannable takeaways inside a violet-framed card.
 * Simple bullet list, one line per point.
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
        <EditorialHeader title={bottomLine.title} lede={bottomLine.lede ?? ''} />

        <ScrollReveal delay={0.05}>
          <div className="relative mt-20 max-w-4xl overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/10 via-accent/5 to-canvas p-9 md:p-12 shadow-[0_0_60px_-20px_rgba(165,138,255,0.45)]">
            <div className="absolute inset-0 [background:radial-gradient(circle_at_20%_0%,rgba(165,138,255,0.16),transparent_55%)]" />
            <ul className="relative space-y-4">
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
