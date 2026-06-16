import { useState } from 'react';
import { User } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { SpotlightCard } from '@/components/SpotlightCard';
import { ImageCompare } from '@/components/ImageCompare';
import { ActionLink } from '@/components/ActionLink';
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

        {/* Personas — weighted grid: decision maker 40% · end-user technical 25%
            · end-user business 25% · investor 10% (sums to 20fr). */}
        <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-[8fr_5fr_5fr_2fr] md:gap-6">
          {customer.personas.map((p, i) => (
            <ScrollReveal key={p.id} delay={0.04 * i}>
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

        {/* Use cases — flip cards. Pain on front, solution + features on back. */}
        {customer.useCases.length > 0 && (
          <div className="mt-24">
            <ScrollReveal>
              <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-10">
                <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
                  Use cases.
                </h3>
                <ActionLink
                  href="https://v074f041970a6be20bed5f15a6aa79587.cdn2.monday.app/"
                  label="Full use-cases list"
                />
              </div>
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {customer.useCases.map((uc, i) => (
                <ScrollReveal key={uc.id} delay={0.05 + i * 0.06}>
                  <UseCaseBlock uc={uc} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function UseCaseBlock({ uc }: { uc: UseCase }) {
  return (
    <div className="flex h-full flex-col">
      {/* Name — sits OUTSIDE the flip card, above */}
      <h4 className="font-display text-lg font-semibold leading-tight text-ink md:text-xl">
        {uc.name}
      </h4>

      {/* Flip card — pain on front, solution + features on back. Hover to flip. */}
      <div className="relative mt-3 aspect-[3/4] w-full">
        <FlipCard
          front={<UseCasePain pain={uc.pain} />}
          back={<UseCaseSolution solution={uc.solution} features={uc.features} />}
        />
      </div>
    </div>
  );
}

function UseCasePain({ pain }: { pain: string }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-rose-300/25 bg-gradient-to-br from-rose-500/[0.08] via-canvas to-canvas p-6 md:p-7">
      <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_0%,rgba(244,114,182,0.10),transparent_55%)]" />
      <div className="relative flex h-full flex-col">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-rose-300/80">
          The pain
        </p>
        <p className="mt-5 flex-1 text-sm italic leading-relaxed text-ink/90 md:text-base">
          "{pain}"
        </p>
        <p className="mt-5 text-[11px] font-medium text-muted/70">Hover to see solution →</p>
      </div>
    </div>
  );
}

function UseCaseSolution({ solution, features }: { solution: string; features: string[] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-emerald-300/30 bg-gradient-to-br from-emerald-500/[0.08] via-canvas to-canvas p-6 md:p-7">
      <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_0%,rgba(110,231,183,0.10),transparent_55%)]" />
      <div className="relative flex h-full flex-col">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/85">
          The solution
        </p>
        <p className="mt-5 flex-1 text-sm leading-relaxed text-ink/90 md:text-base">{solution}</p>

        {features.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {features.map((f) => (
              <span
                key={f}
                className="inline-flex items-center rounded-full border border-accent/30 bg-accent/[0.08] px-2.5 py-1 text-[11px] font-medium text-ink/85"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PersonaCard({ persona }: { persona: Persona }) {
  const [imgOk, setImgOk] = useState<boolean | null>(null);
  const isPrimary = persona.kind === 'primary';
  const isSupporting = persona.kind === 'supporting';

  return (
    <SpotlightCard
      className={cn(
        'h-full',
        isPrimary && 'border-accent/25 bg-accent/[0.04]',
        isSupporting && 'border-white/8 bg-white/[0.015]',
      )}
    >
      <div
        className={cn(
          'flex h-full flex-col',
          isPrimary ? 'gap-6 p-9 md:p-11' : isSupporting ? 'gap-3 p-5 md:p-6' : 'gap-5 p-7 md:p-8',
        )}
      >
        {/* Photo */}
        <div
          className={cn(
            'relative shrink-0 overflow-hidden rounded-2xl ring-1',
            isPrimary
              ? 'h-32 w-32 ring-accent/40 shadow-[0_0_40px_-12px_rgba(165,138,255,0.55)]'
              : isSupporting
                ? 'h-14 w-14 ring-white/12'
                : 'h-24 w-24 ring-white/15',
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
              <User
                className={cn(
                  isPrimary ? 'h-10 w-10' : isSupporting ? 'h-5 w-5' : 'h-8 w-8',
                  'text-white/70',
                )}
                aria-hidden="true"
              />
            </div>
          )}
        </div>

        {/* Name + role */}
        <div>
          <h3
            className={cn(
              'font-display font-semibold text-ink',
              isPrimary ? 'text-3xl md:text-[32px]' : isSupporting ? 'text-base' : 'text-xl md:text-2xl',
            )}
          >
            {persona.name}
          </h3>
          <p className={cn('mt-1 text-muted', isSupporting ? 'text-xs' : 'text-sm')}>{persona.role}</p>
        </div>

        {/* Description */}
        <p
          className={cn(
            'leading-relaxed text-muted',
            isPrimary ? 'text-lg' : isSupporting ? 'text-xs' : 'text-base',
          )}
        >
          {persona.description}
        </p>
      </div>
    </SpotlightCard>
  );
}
