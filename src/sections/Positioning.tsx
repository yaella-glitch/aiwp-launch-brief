import { useState } from 'react';
import { Check, X, ImageIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { positioning } from '@/content';
import { cn } from '@/lib/utils';

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
      className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader
          eyebrow={positioning.eyebrow}
          title={positioning.title}
          lede={positioning.lede}
        />

        {/* Vision — bold statement, no parts grid */}
        <ScrollReveal>
          <div className="mt-20 max-w-4xl">
            <p className="text-eyebrow uppercase text-accent">{positioning.vision.title}</p>
            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 14, filter: 'blur(8px)' }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-[clamp(28px,4vw,56px)] font-bold leading-[1.05] tracking-tight text-ink"
            >
              {positioning.vision.statement}
            </motion.p>
          </div>
        </ScrollReveal>

        {/* How it all comes together — horizontal image strip */}
        <ScrollReveal delay={0.1}>
          <div className="mt-32">
            <p className="text-eyebrow uppercase text-muted">{positioning.comesTogether.title}</p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
              {positioning.comesTogether.lede}
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {positioning.comesTogether.aspects.map((a, i) => (
            <ScrollReveal key={a.id} delay={0.04 * i}>
              <SpotlightCard className="aspect-[3/4]">
                <AspectImage src={a.image} alt={a.imageAlt} />
                <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-canvas via-canvas/85 to-transparent p-5">
                  <p className="font-display text-base font-semibold leading-tight text-ink md:text-lg">
                    {a.title}
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>

        {/* External emphasis — interactive image accordion-feel grid */}
        <ScrollReveal delay={0.15}>
          <div className="mt-32 flex items-end justify-between gap-6">
            <h3 className="font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink">
              What we lead with.
            </h3>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {positioning.externalEmphasis.map((e, i) => (
            <ScrollReveal key={e.title} delay={0.05 * i}>
              <EmphasisCard title={e.title} image={e.image} description={e.description} />
            </ScrollReveal>
          ))}
        </div>

        {/* Say / Don't Say */}
        <ScrollReveal delay={0.2}>
          <div className="mt-32 flex items-end justify-between gap-6">
            <h3 className="font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink">
              Say. Don't say.
            </h3>
          </div>
        </ScrollReveal>

        <div className="mt-10 space-y-6">
          {positioning.sayDontSay.map((s, i) => (
            <ScrollReveal key={s.topic} delay={0.04 * i}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
                <p className="text-eyebrow uppercase text-muted">{s.topic}</p>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
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

function EmphasisCard({ title, image, description }: { title: string; image: string; description: string }) {
  return (
    <SpotlightCard className="group/emphasis aspect-[4/5]">
      <div className="absolute inset-0">
        <AspectImage src={image} alt={title} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-transparent transition-opacity duration-300 group-hover/emphasis:opacity-90" />
      <div className="absolute inset-x-0 bottom-0 z-[2] p-6">
        <h4 className="font-display text-xl font-semibold leading-tight text-ink md:text-2xl">{title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </SpotlightCard>
  );
}

function AspectImage({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  return ok === false ? (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/15 via-indigo-500/8 to-sky-500/10">
      <div className="text-center">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
          <ImageIcon className="h-4 w-4 text-white/60" aria-hidden="true" />
        </span>
        <p className="mt-2 px-2 font-mono text-[9px] text-white/40">{src}</p>
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={cn('absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-105', ok === null && 'opacity-0')}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}
