import { useState } from 'react';
import { ImageIcon, User } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { ImageCompare } from '@/components/ImageCompare';
import { FlipCard } from '@/components/FlipCard';
import { customer } from '@/content';
import { cn, withBase } from '@/lib/utils';
import type { Persona, UseCase } from '@/types';

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
      className="relative w-full overflow-hidden py-20 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <EditorialHeader
          title="Who it's for."
          lede={customer.lede}
        />

        {/* Personas — static grid. Primary spans 2/4 (wider + roomier). */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-7">
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
        <div className="mt-24">
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
                    <h4 className="font-display text-xl font-semibold text-ink md:text-2xl">{ba.theme}</h4>
                    <p className="mt-3 text-base leading-relaxed text-muted">{ba.description}</p>
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

        {/* Use cases — flip cards. Front: scenario over image. Back: outcome. */}
        {customer.useCases.length > 0 && (
          <div className="mt-24">
            <ScrollReveal>
              <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
                Use cases.
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                Three scenarios we lead with. Hover to flip.
              </p>
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {customer.useCases.map((uc, i) => (
                <ScrollReveal key={uc.id} delay={0.05 + i * 0.06}>
                  <div className="relative aspect-[3/4] w-full">
                    <FlipCard
                      front={<UseCaseFront uc={uc} />}
                      back={<UseCaseBack uc={uc} />}
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function UseCaseFront({ uc }: { uc: UseCase }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="absolute inset-0">
        <UseCaseImage src={uc.image} alt={uc.title} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/40 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-7">
        <h4 className="font-display text-xl font-semibold text-ink md:text-2xl">{uc.title}</h4>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{uc.scenario}</p>
      </div>
    </div>
  );
}

function UseCaseBack({ uc }: { uc: UseCase }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/15 via-canvas to-canvas">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(165,138,255,0.20),transparent_60%)]" />
      <div className="relative flex h-full flex-col justify-end p-7">
        <h4 className="font-display text-xl font-semibold text-ink md:text-2xl">{uc.title}</h4>
        <p className="mt-3 text-base leading-relaxed text-ink/85">{uc.outcome}</p>
      </div>
    </div>
  );
}

function UseCaseImage({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false || !src) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/12 via-indigo-500/6 to-sky-500/8">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <ImageIcon className="h-5 w-5 text-white/60" aria-hidden="true" />
          </span>
          <p className="mt-3 px-4 font-mono text-[10px] text-white/40">{src}</p>
        </div>
      </div>
    );
  }
  return (
    <img
      src={withBase(src)}
      alt={alt}
      className={cn('h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.03]', ok === null && 'opacity-0')}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}

function PersonaCard({ persona }: { persona: Persona }) {
  const [imgOk, setImgOk] = useState<boolean | null>(null);
  const isPrimary = persona.kind === 'primary';

  return (
    <SpotlightCard className={cn('h-full', isPrimary && 'border-accent/25 bg-accent/[0.04]')}>
      <div
        className={cn(
          'flex h-full flex-col gap-6',
          // Primary card: roomier padding for breathing room
          isPrimary ? 'p-9 md:p-11' : 'p-7 md:p-8',
        )}
      >
        {/* Photo — bumped from 80px → 112px (primary 128px) */}
        <div
          className={cn(
            'relative shrink-0 overflow-hidden rounded-2xl ring-1',
            isPrimary
              ? 'h-32 w-32 ring-accent/40 shadow-[0_0_40px_-12px_rgba(165,138,255,0.55)]'
              : 'h-28 w-28 ring-white/15',
          )}
        >
          {imgOk !== false ? (
            <img
              src={withBase(persona.photo)}
              alt={persona.name}
              className={cn('h-full w-full object-cover', imgOk === null && 'opacity-0')}
              onLoad={() => setImgOk(true)}
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-violet-500/30 to-indigo-500/20">
              <User className={cn(isPrimary ? 'h-10 w-10' : 'h-9 w-9', 'text-white/70')} aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Name + role */}
        <div>
          <h3
            className={cn(
              'font-display font-semibold text-ink',
              isPrimary ? 'text-3xl md:text-[32px]' : 'text-2xl',
            )}
          >
            {persona.name}
          </h3>
          <p className="mt-1 text-sm text-muted">{persona.role}</p>
        </div>

        {/* Description */}
        <p className={cn('leading-relaxed text-muted', isPrimary ? 'text-lg' : 'text-base')}>
          {persona.description}
        </p>
      </div>
    </SpotlightCard>
  );
}
