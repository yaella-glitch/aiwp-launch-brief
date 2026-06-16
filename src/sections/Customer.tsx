import { useState } from 'react';
import { ArrowUpRight, User } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
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

        {/* Personas — 3 slots: Decision maker | End user (frame w/ 2 inside) | Investor */}
        <PersonasGrid />


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

/* ---------- personas ---------- */

function PersonasGrid() {
  const decisionMaker = customer.personas.find((p) => p.kind === 'primary');
  const endUserTech = customer.personas.find((p) => p.kind === 'end-user-technical');
  const endUserBiz = customer.personas.find((p) => p.kind === 'end-user-business');
  const investor = customer.personas.find((p) => p.kind === 'investor');

  return (
    <div className="mt-20 grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_2fr_1fr]">
      {decisionMaker && (
        <ScrollReveal>
          <PersonaCard persona={decisionMaker} />
        </ScrollReveal>
      )}

      {(endUserTech || endUserBiz) && (
        <ScrollReveal delay={0.06}>
          <EndUserFrame technical={endUserTech} business={endUserBiz} />
        </ScrollReveal>
      )}

      {investor && (
        <ScrollReveal delay={0.12}>
          <PersonaCard persona={investor} />
        </ScrollReveal>
      )}
    </div>
  );
}

function EndUserFrame({
  technical,
  business,
}: {
  technical?: Persona;
  business?: Persona;
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/15 bg-white/[0.015] p-5 md:p-6">
      <div className="mb-5">
        <h3 className="font-display text-lg font-semibold text-ink">End user</h3>
        <p className="mt-1 text-xs text-muted">The people who live in monday day to day.</p>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        {technical && <PersonaCard persona={technical} variant="nested" />}
        {business && <PersonaCard persona={business} variant="nested" />}
      </div>
    </div>
  );
}

function PersonaCard({
  persona,
  variant = 'full',
}: {
  persona: Persona;
  variant?: 'full' | 'nested';
}) {
  const isNested = variant === 'nested';
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]',
        'transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.04]',
        isNested ? 'p-5' : 'p-6 md:p-7',
      )}
    >
      {/* Read-more arrow — top-right, icon only */}
      <button
        type="button"
        aria-label={`Read more about ${persona.name}`}
        className={cn(
          'absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full',
          'border border-white/15 bg-canvas/60 text-muted',
          'transition-all duration-200 hover:border-accent/50 hover:bg-accent/[0.12] hover:text-accent',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
        )}
      >
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>

      {/* Photo — uniform size across all cards */}
      <PersonaPhoto persona={persona} />

      {/* Name + role */}
      <div className="mt-5">
        <h4 className="font-display text-xl font-semibold leading-tight text-ink md:text-2xl">
          {persona.name}
        </h4>
        <p className="mt-1 text-sm text-muted">{persona.role}</p>
      </div>

      {/* Who are they */}
      {persona.whoAreThey.length > 0 && (
        <div className="mt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
            Who are they
          </p>
          <ul className="mt-2 space-y-1.5">
            {persona.whoAreThey.map((line, i) => (
              <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-ink/85">
                <span
                  aria-hidden="true"
                  className="mt-[8px] inline-block h-1 w-1 shrink-0 rounded-full bg-accent/70"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What they care about */}
      {persona.whatTheyCareAbout && (
        <div className="mt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
            What they care about
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/85">
            {persona.whatTheyCareAbout}
          </p>
        </div>
      )}

      {/* Messaging goal */}
      {persona.messagingGoal && (
        <div className="mt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/80">
            Our messaging goal
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/90">
            {persona.messagingGoal}
          </p>
        </div>
      )}

      {/* Features tags */}
      {persona.features.length > 0 && (
        <div className="mt-auto pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
            Features
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {persona.features.map((f) => (
              <span
                key={f}
                className="inline-flex items-center rounded-full border border-accent/30 bg-accent/[0.08] px-2.5 py-1 text-[11px] font-medium text-ink/85"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function PersonaPhoto({ persona }: { persona: Persona }) {
  const [imgOk, setImgOk] = useState<boolean | null>(null);
  return (
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15">
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
          <User className="h-8 w-8 text-white/70" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
