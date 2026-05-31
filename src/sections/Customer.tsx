import { useState } from 'react';
import { User } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { ImageCompare } from '@/components/ImageCompare';
import { customer } from '@/content';
import { cn } from '@/lib/utils';
import type { Persona } from '@/types';

/**
 * The customer:
 *  - Persona cards (each with a photo placeholder, name, role, description)
 *  - Before / after sliders (description only — no TODAY/WITH labels)
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

        {/* Personas — primary spans 2 cols, secondary single */}
        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-4">
          {customer.personas.map((p, i) => (
            <ScrollReveal
              key={p.id}
              delay={0.04 * i}
              className={cn(p.kind === 'primary' ? 'md:col-span-2' : 'md:col-span-1')}
            >
              <PersonaCard persona={p} />
            </ScrollReveal>
          ))}
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

function PersonaCard({ persona }: { persona: Persona }) {
  const [imgOk, setImgOk] = useState<boolean | null>(null);
  const isPrimary = persona.kind === 'primary';

  return (
    <SpotlightCard className={cn('h-full', isPrimary && 'border-accent/25 bg-accent/[0.04]')}>
      <div className="p-7 md:p-8">
        {/* Avatar */}
        <div
          className={cn(
            'relative h-20 w-20 overflow-hidden rounded-2xl ring-1',
            isPrimary
              ? 'ring-accent/40 shadow-[0_0_30px_rgba(165,138,255,0.25)]'
              : 'ring-white/15',
          )}
        >
          {imgOk !== false ? (
            <img
              src={persona.photo}
              alt={persona.name}
              className={cn('h-full w-full object-cover', imgOk === null && 'opacity-0')}
              onLoad={() => setImgOk(true)}
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-violet-500/30 to-indigo-500/20">
              <User className="h-7 w-7 text-white/70" aria-hidden="true" />
            </div>
          )}
        </div>

        <p className={cn('mt-5 text-eyebrow uppercase', isPrimary ? 'text-accent' : 'text-muted')}>
          {isPrimary ? 'Primary' : 'Secondary'}
        </p>
        <h3 className="mt-3 font-display text-2xl text-ink">{persona.name}</h3>
        <p className="mt-1 text-sm uppercase tracking-wider text-muted">{persona.role}</p>
        <p className="mt-5 text-base leading-relaxed text-muted">{persona.description}</p>
      </div>
    </SpotlightCard>
  );
}
