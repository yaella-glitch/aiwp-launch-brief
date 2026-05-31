import { SectionMarker } from '@/components/SectionMarker';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ImageCompare } from '@/components/ImageCompare';
import { customer } from '@/content';

/**
 * Part 2 · The customer.
 *  - Primary + secondary personas stacked vertically (large primary, smaller below)
 *  - Before / After image comparison sliders (drag handle)
 */
export function Customer() {
  return (
    <section id="customer" data-section="customer" className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <SectionMarker number="02" eyebrow={customer.eyebrow} title={customer.title} lede={customer.lede} />

        {/* Personas — vertical stack */}
        <div className="mt-20 max-w-4xl space-y-5">
          <ScrollReveal>
            <article className="card-gradient">
              <div className="card-gradient-inner p-8 md:p-10">
                <div className="flex items-baseline gap-4">
                  <span className="text-eyebrow uppercase text-accent">Primary</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
                </div>
                <h3 className="mt-5 font-display text-3xl text-ink md:text-4xl">
                  {customer.audience.primary.title}
                </h3>
                <p className="mt-5 max-w-2xl text-lead leading-relaxed text-muted">
                  {customer.audience.primary.description}
                </p>
              </div>
            </article>
          </ScrollReveal>

          {customer.audience.secondary.map((s, i) => (
            <ScrollReveal key={s.title} delay={0.05 + i * 0.05}>
              <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-200 hover:border-white/15 hover:bg-white/[0.05]">
                <div className="flex items-baseline gap-4">
                  <span className="text-eyebrow uppercase text-muted">Secondary</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
                </div>
                <h4 className="mt-4 font-display text-2xl text-ink">{s.title}</h4>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{s.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Before / After comparison sliders */}
        <div className="mt-32">
          <ScrollReveal>
            <div className="mb-12 flex items-end justify-between gap-6">
              <h3 className="font-display text-[clamp(28px,4vw,52px)] font-bold tracking-tight text-ink">
                Before &amp; after.
              </h3>
              <p className="hidden max-w-xs text-sm leading-snug text-muted md:block">
                Drag the handle to reveal what changes for the customer.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-20 md:space-y-28">
            {customer.beforeAfter.map((ba, i) => (
              <ScrollReveal key={ba.id} delay={0.05}>
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-3">
                    <p className="text-eyebrow uppercase text-accent">
                      Shift #{(i + 1).toString().padStart(2, '0')}
                    </p>
                    <h4 className="mt-3 font-display text-3xl text-ink md:text-4xl">{ba.theme}</h4>
                    <div className="mt-6 space-y-4 text-sm leading-relaxed">
                      <div>
                        <p className="text-eyebrow uppercase text-rose-300">{ba.beforeLabel}</p>
                        <p className="mt-2 text-ink/80">{ba.beforeDescription}</p>
                      </div>
                      <div>
                        <p className="text-eyebrow uppercase text-emerald-300">{ba.afterLabel}</p>
                        <p className="mt-2 text-ink/90">{ba.afterDescription}</p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-9">
                    <ImageCompare
                      beforeImage={ba.beforeImage}
                      afterImage={ba.afterImage}
                      beforeLabel={ba.beforeLabel}
                      afterLabel={ba.afterLabel}
                      altBefore={`${ba.theme} — ${ba.beforeLabel}`}
                      altAfter={`${ba.theme} — ${ba.afterLabel}`}
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
