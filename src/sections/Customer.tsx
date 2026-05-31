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
 *  - Personas as a static grid: primary spans 2 cols (wider),
 *    secondaries each take 1 col. No auto-rotation, fully accessible.
 *  - Before / after sliders (description only).
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
          title="Who it's for."
          lede={customer.lede}
        />

        {/* Personas — static grid (no auto-rotation). Primary spans 2/4. */}
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

        {/* Pains & solutions */}
        <div className="mt-40">
          <ScrollReveal>
            <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
              The pains &amp; solutions.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              What changes for the customer, theme by theme. Drag any handle to compare.
            </p>
          </ScrollReveal>

          <div className="h-12" />

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
      <div className="flex h-full flex-col gap-5 p-7 md:p-8">
        {/* Photo */}
        <div
          className={cn(
            'relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-1',
            isPrimary
              ? 'ring-accent/40 shadow-[0_0_30px_-10px_rgba(165,138,255,0.45)]'
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

        {/* Label */}
        <p className={cn('text-eyebrow uppercase', isPrimary ? 'text-accent' : 'text-muted')}>
          {isPrimary ? 'Primary' : 'Secondary'}
        </p>

        {/* Name + role */}
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink">{persona.name}</h3>
          <p className="mt-1 text-sm uppercase tracking-wider text-muted">{persona.role}</p>
        </div>

        {/* Description */}
        <p className="text-base leading-relaxed text-muted">{persona.description}</p>
      </div>
    </SpotlightCard>
  );
}
