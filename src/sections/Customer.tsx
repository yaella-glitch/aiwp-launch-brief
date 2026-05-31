import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { PersonaStack } from '@/components/PersonaStack';
import { ImageCompare } from '@/components/ImageCompare';
import { customer } from '@/content';

/**
 * The customer:
 *  - Personas as an auto-rotating CardStack (left col)
 *    + side intro copy (right col)
 *  - Before / after sliders (description only)
 */
export function Customer() {
  return (
    <section
      id="customer"
      data-section="customer"
      className="relative w-full overflow-hidden py-32 md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader
          eyebrow={customer.eyebrow}
          title={customer.title}
          lede={customer.lede}
        />

        {/* Personas — auto-rotating stack + side copy */}
        <div className="mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal className="lg:col-span-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/70">
                Personas
              </p>
              <h3 className="mt-4 font-display text-[clamp(28px,4vw,52px)] font-semibold leading-tight tracking-tight text-ink">
                The people we build for.
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                Hover the stack to pause. Click any back card to bring it forward.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="lg:col-span-7" delay={0.1}>
            <PersonaStack personas={customer.personas} />
          </ScrollReveal>
        </div>

        {/* Before / After */}
        <div className="mt-40">
          <ScrollReveal>
            <h3 className="mb-16 font-display text-[clamp(28px,4vw,52px)] font-semibold tracking-tight text-ink">
              Before &amp; after.
            </h3>
          </ScrollReveal>

          <div className="space-y-16 md:space-y-20">
            {customer.beforeAfter.map((ba, i) => (
              <ScrollReveal key={ba.id} delay={0.04 * i}>
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-3">
                    <p className="text-eyebrow uppercase text-accent">{ba.theme}</p>
                    <p className="mt-4 text-base leading-relaxed text-ink/85">{ba.description}</p>
                  </div>
                  <div className="lg:col-span-9">
                    <ImageCompare
                      beforeImage={ba.beforeImage}
                      afterImage={ba.afterImage}
                      altBefore={`${ba.theme} — before`}
                      altAfter={`${ba.theme} — after`}
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
