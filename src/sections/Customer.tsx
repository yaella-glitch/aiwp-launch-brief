import { useState } from 'react';
import { User } from 'lucide-react';
import { EditorialHeader } from '@/components/EditorialHeader';
import { ScrollReveal } from '@/components/ScrollReveal';
import { ArrowRight } from 'lucide-react';
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


        {/* Pains & solutions — before / after as TWO side-by-side cards. */}
        <div className="mt-24">
          <ScrollReveal>
            <h3 className="font-display text-[clamp(28px,4vw,44px)] font-semibold tracking-tight text-ink">
              The pains &amp; solutions.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              What changes for the customer, theme by theme.
            </p>
          </ScrollReveal>

          <div className="mt-12 space-y-16 md:space-y-20">
            {customer.beforeAfter.map((ba, i) => (
              <ScrollReveal key={ba.id} delay={0.04 * i}>
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
                  {/* Theme description */}
                  <div className="lg:col-span-3">
                    <h4 className="font-display text-xl font-semibold text-ink md:text-2xl">{ba.theme}</h4>
                    <p className="mt-3 text-base leading-relaxed text-muted">{ba.description}</p>
                  </div>

                  {/* Side-by-side: Before → After */}
                  <div className="lg:col-span-9">
                    <div className="relative grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-6">
                      <BeforeCard image={ba.beforeImage} theme={ba.theme} />
                      <AfterCard image={ba.afterImage} theme={ba.theme} />

                      {/* Arrow badge sitting between the two cards on desktop */}
                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/40 bg-canvas shadow-[0_0_24px_-8px_rgba(165,138,255,0.6)] md:grid"
                      >
                        <ArrowRight className="h-4 w-4 text-accent" aria-hidden="true" />
                      </span>
                    </div>
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

/* ---------- before / after side-by-side cards ---------- */

function BeforeCard({ image, theme }: { image: string; theme: string }) {
  return (
    <PainCard
      tone="rose"
      label="Before"
      image={image}
      alt={`${theme} — before`}
    />
  );
}

function AfterCard({ image, theme }: { image: string; theme: string }) {
  return (
    <PainCard
      tone="emerald"
      label="After"
      image={image}
      alt={`${theme} — after`}
    />
  );
}

function PainCard({
  tone,
  label,
  image,
  alt,
}: {
  tone: 'rose' | 'emerald';
  label: string;
  image: string;
  alt: string;
}) {
  const [ok, setOk] = useState<boolean | null>(null);
  const borderTone =
    tone === 'rose' ? 'border-rose-300/25' : 'border-emerald-300/25';
  const labelTone =
    tone === 'rose'
      ? 'border-rose-300/35 bg-rose-500/[0.12] text-rose-200'
      : 'border-emerald-300/35 bg-emerald-500/[0.12] text-emerald-200';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border bg-white/[0.02]',
        borderTone,
      )}
    >
      {/* Label pill — top-left */}
      <span
        className={cn(
          'absolute left-4 top-4 z-10 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]',
          labelTone,
        )}
      >
        {label}
      </span>

      <div className="aspect-[16/10] w-full">
        {ok === false || !image ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/8 via-canvas to-canvas">
            <p className="px-4 text-center font-mono text-[10px] text-white/40">
              {image}
            </p>
          </div>
        ) : (
          <img
            src={withBase(image)}
            alt={alt}
            className={cn('h-full w-full object-cover', ok === null && 'opacity-0')}
            onLoad={() => setOk(true)}
            onError={() => setOk(false)}
          />
        )}
      </div>
    </div>
  );
}

function UseCaseBlock({ uc }: { uc: UseCase }) {
  return (
    <div className="flex h-full flex-col">
      {/* Name — sits OUTSIDE the flip card, above */}
      <h4 className="font-display text-base font-semibold leading-tight text-ink md:text-lg">
        {uc.name}
      </h4>

      {/* Flip card — compact fixed height, no excess space */}
      <div className="relative mt-3 h-56 w-full">
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
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-rose-300/25 bg-gradient-to-br from-rose-500/[0.08] via-canvas to-canvas p-4 md:p-5">
      <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_0%,rgba(244,114,182,0.10),transparent_55%)]" />
      <div className="relative flex h-full flex-col">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-rose-300/80">
          The pain
        </p>
        <p className="mt-3 flex-1 text-sm italic leading-relaxed text-ink/90">
          "{pain}"
        </p>
        <p className="mt-3 text-[10px] font-medium text-muted/70">Hover to see solution →</p>
      </div>
    </div>
  );
}

function UseCaseSolution({ solution, features }: { solution: string; features: string[] }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-emerald-300/30 bg-gradient-to-br from-emerald-500/[0.08] via-canvas to-canvas p-4 md:p-5">
      <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_0%,rgba(110,231,183,0.10),transparent_55%)]" />
      <div className="relative flex h-full flex-col">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-300/85">
          The solution
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/90">{solution}</p>

        {features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {features.map((f) => (
              <span
                key={f}
                className="inline-flex items-center rounded-full border border-accent/30 bg-accent/[0.08] px-2 py-0.5 text-[10px] font-medium text-ink/85"
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

/* ---------- personas — horizontal accordion ---------- */

function PersonasGrid() {
  const [active, setActive] = useState(0);
  const personas = customer.personas;

  return (
    <div className="mt-20 flex w-full flex-col gap-3 md:flex-row md:gap-4">
      {personas.map((persona, i) => (
        <PersonaPanel
          key={persona.id}
          persona={persona}
          isActive={i === active}
          onActivate={() => setActive(i)}
        />
      ))}
    </div>
  );
}

function PersonaPanel({
  persona,
  isActive,
  onActivate,
}: {
  persona: Persona;
  isActive: boolean;
  onActivate: () => void;
}) {
  const [imgOk, setImgOk] = useState<boolean | null>(null);

  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-expanded={isActive}
      aria-label={`${persona.name} — ${isActive ? 'expanded' : 'click to expand'}`}
      className={cn(
        'group relative h-[32rem] cursor-pointer overflow-hidden rounded-3xl border text-left',
        'transition-[flex,border-color] duration-700 ease-cinematic',
        // Desktop: active grows to flex-[5], inactive to flex-[1]
        isActive
          ? 'md:flex-[5] border-accent/40 bg-accent/[0.04]'
          : 'md:flex-[1] border-white/15 bg-white/[0.025] hover:border-white/25',
        'w-full',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
      )}
    >
      {/* Soft accent glow when active */}
      {isActive && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_0%,rgba(165,138,255,0.10),transparent_55%)]"
        />
      )}

      <div className="relative flex h-full flex-col p-6 md:p-7">
        {/* Photo — same size everywhere */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/15">
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
              <User className="h-7 w-7 text-white/70" aria-hidden="true" />
            </div>
          )}
        </div>

        {/* Name + role */}
        <div className="mt-5 min-w-0">
          <h4
            className={cn(
              'font-display font-semibold leading-tight text-ink',
              isActive ? 'text-xl md:text-2xl' : 'text-base md:text-lg',
            )}
          >
            {persona.name}
          </h4>
          <p
            className={cn(
              'mt-1 text-muted transition-opacity duration-300',
              isActive ? 'text-sm opacity-100' : 'text-xs opacity-90',
            )}
          >
            {persona.role}
          </p>
        </div>

        {/* Rich content — only when active (fades in) */}
        <div
          className={cn(
            'mt-6 flex-1 space-y-5 overflow-y-auto pr-1 transition-opacity duration-500',
            isActive ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          {/* Who are they */}
          {persona.whoAreThey.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
                Who are they
              </p>
              <ul className="mt-2 space-y-1.5">
                {persona.whoAreThey.map((line, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-relaxed text-ink/85"
                  >
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
            <div>
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
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/85">
                Our messaging goal
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink">
                {persona.messagingGoal}
              </p>
            </div>
          )}

          {/* Features tags */}
          {persona.features.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
                Features
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {persona.features.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center rounded-full border border-accent/30 bg-accent/[0.08] px-2.5 py-1 text-[11px] font-medium text-ink/90"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
