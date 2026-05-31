import { Check, X } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { HighlightText } from '@/components/HighlightText';
import { EmphasisAccordion } from '@/components/EmphasisAccordion';
import { positioning } from '@/content';

/**
 * Positioning & messaging — vision statement (bold prose, no parts grid),
 * "how it all comes together" image strip, what we emphasize externally,
 * say / don't-say guardrails.
 */
export function Positioning() {
  const reduce = useReducedMotion();
  return (
    <section
      id="positioning"
      data-section="positioning"
      className="relative w-full overflow-hidden py-32 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader
          title={positioning.title}
          lede={positioning.lede}
        />

        {/* Vision — bold prose statement with a HIGHLIGHT BAR on key phrase */}
        <ScrollReveal>
          <div className="mt-24 max-w-4xl">
            <h3 className="font-display text-[clamp(28px,4vw,52px)] font-semibold tracking-tight text-ink">
              {positioning.vision.title}.
            </h3>
            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 14, filter: 'blur(8px)' }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 font-display text-[clamp(28px,4vw,56px)] font-medium leading-[1.25] tracking-tight text-ink"
            >
              It completes the picture.{' '}
              <HighlightText>
                Humans and agents execute as one team.
              </HighlightText>
            </motion.p>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">
              {positioning.vision.statement}
            </p>
          </div>
        </ScrollReveal>

        {/* External emphasis — interactive image accordion */}
        <ScrollReveal delay={0.15}>
          <div className="mt-32">
            <h3 className="font-display text-[clamp(28px,4vw,52px)] font-semibold tracking-tight text-ink">
              What we lead with externally.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Hover any panel to expand. The active one tells its story.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mt-12">
            <EmphasisAccordion
              items={positioning.externalEmphasis.map((e) => ({
                title: e.title,
                description: e.description,
                image: e.image,
                imageAlt: `Emphasis: ${e.title}`,
              }))}
            />
          </div>
        </ScrollReveal>

        {/* Say / Don't Say */}
        <ScrollReveal delay={0.2}>
          <h3 className="mt-40 font-display text-[clamp(28px,4vw,52px)] font-semibold tracking-tight text-ink">
            Say. Don't say.
          </h3>
        </ScrollReveal>

        <div className="mt-12 space-y-6">
          {positioning.sayDontSay.map((s, i) => (
            <ScrollReveal key={s.topic} delay={0.04 * i}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 md:p-10">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/70">
                  Topic · {s.topic}
                </p>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.05] p-5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                    <div>
                      <p className="text-eyebrow uppercase text-emerald-300">Say</p>
                      <p className="mt-2 text-base leading-relaxed text-ink">"{s.say}"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-rose-400/25 bg-rose-400/[0.05] p-5">
                    <X className="mt-1 h-4 w-4 shrink-0 text-rose-300" aria-hidden="true" />
                    <div>
                      <p className="text-eyebrow uppercase text-rose-300">Don't say</p>
                      <p className="mt-2 text-base leading-relaxed text-ink/85">"{s.dontSay}"</p>
                    </div>
                  </div>
                </div>
                {s.why && (
                  <p className="mt-4 text-sm italic text-muted">
                    <span className="font-semibold not-italic text-ink/70">Why · </span>
                    {s.why}
                  </p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

