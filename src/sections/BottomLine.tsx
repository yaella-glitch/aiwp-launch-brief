import { motion, useReducedMotion } from 'framer-motion';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { bottomLine } from '@/content';

/**
 * The bottom line — short, scannable list of key takeaways. Sits right after
 * the launch date so readers can orient before diving into the brief.
 *
 * Layout: numbered editorial list with a violet rail down the left.
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
          <ol className="relative mt-20 max-w-4xl space-y-6">
            {/* Violet rail down the left */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-3 bottom-3 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent md:left-4"
            />

            {bottomLine.points.map((point, i) => (
              <motion.li
                key={i}
                initial={reduce ? undefined : { opacity: 0, y: 12 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-start gap-5 pl-10 md:gap-7 md:pl-14"
              >
                {/* Node dot on the rail */}
                <span
                  aria-hidden="true"
                  className="absolute left-[7px] top-[10px] h-3 w-3 rounded-full border border-accent/70 bg-accent/40 md:left-[11px] md:top-[12px]"
                />
                {/* Horizontal connector tick */}
                <span
                  aria-hidden="true"
                  className="absolute left-3 top-[15px] h-px w-5 bg-accent/40 md:left-4 md:top-[18px] md:w-8"
                />
                <span className="shrink-0 font-mono text-xs font-semibold text-muted/70 pt-0.5 md:text-sm">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <p className="font-display text-lg leading-relaxed text-ink/90 md:text-xl">
                  {point}
                </p>
              </motion.li>
            ))}
          </ol>
        </ScrollReveal>
      </div>
    </section>
  );
}
