import { Check, X, Quote } from 'lucide-react';
import { SectionMarker } from '@/components/SectionMarker';
import { ScrollReveal } from '@/components/ScrollReveal';
import { positioning } from '@/content';

/**
 * Part 4 · Positioning & messaging.
 *   - How this launch supports the vision
 *   - What we emphasize externally
 *   - Say / Don't Say
 */
export function Positioning() {
  return (
    <section id="positioning" data-section="positioning" className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <SectionMarker number="04" eyebrow={positioning.eyebrow} title={positioning.title} lede={positioning.lede} />

        {/* Vision support */}
        <ScrollReveal>
          <div className="mt-20">
            <div className="relative">
              <Quote className="absolute -left-2 -top-4 h-12 w-12 text-accent/30" aria-hidden="true" />
              <p className="text-eyebrow uppercase text-accent">{positioning.supportsVision.title}</p>
              <p className="mt-6 max-w-3xl font-display text-[clamp(24px,3vw,40px)] font-medium italic leading-[1.2] text-ink">
                "{positioning.supportsVision.lede}"
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {positioning.supportsVision.supportPoints.map((p, i) => (
                <div
                  key={p.title}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-200 hover:border-accent/30 hover:bg-white/[0.06]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 -top-3 font-display text-6xl font-bold text-accent/10 transition-transform duration-500 group-hover:scale-110"
                  >
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <h4 className="relative font-display text-lg font-semibold text-ink">{p.title}</h4>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* External emphasis */}
        <ScrollReveal delay={0.1}>
          <div className="mt-32">
            <p className="text-eyebrow uppercase text-muted">Externally</p>
            <h3 className="mt-3 font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink">
              What we emphasize.
            </h3>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {positioning.externalEmphasis.map((e, i) => (
            <ScrollReveal key={e.title} delay={0.05 + i * 0.05}>
              <div className="group h-full rounded-2xl border border-accent/20 bg-accent/[0.06] p-7 transition-colors duration-200 hover:border-accent/40 hover:bg-accent/[0.12]">
                <p className="text-eyebrow uppercase text-accent">Emphasis #{i + 1}</p>
                <h4 className="mt-3 font-display text-lg text-ink">{e.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Say / Don't Say */}
        <ScrollReveal delay={0.15}>
          <div className="mt-32">
            <p className="text-eyebrow uppercase text-muted">Guardrails</p>
            <h3 className="mt-3 font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink">
              Say / Don't say.
            </h3>
          </div>
        </ScrollReveal>

        <div className="mt-10 space-y-8">
          {positioning.sayDontSay.map((s, i) => (
            <ScrollReveal key={s.topic} delay={0.05 + i * 0.05}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <p className="text-eyebrow uppercase text-muted">{s.topic}</p>
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-start gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] p-5">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden="true" />
                    <div>
                      <p className="text-eyebrow uppercase text-emerald-300">Say</p>
                      <p className="mt-2 text-base leading-relaxed text-ink">"{s.say}"</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-rose-400/25 bg-rose-400/[0.06] p-5">
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
