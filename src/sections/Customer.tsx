import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, User, X } from 'lucide-react';
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

/* ---------- personas ---------- */

function PersonasGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const decisionMaker = customer.personas.find((p) => p.kind === 'primary');
  const endUserTech = customer.personas.find((p) => p.kind === 'end-user-technical');
  const endUserBiz = customer.personas.find((p) => p.kind === 'end-user-business');
  const investor = customer.personas.find((p) => p.kind === 'investor');

  const activePersona = customer.personas.find((p) => p.id === activeId) ?? null;

  return (
    <>
      <div className="mt-20 grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_2fr_1fr]">
        {decisionMaker && (
          <ScrollReveal>
            <PersonaCard persona={decisionMaker} onOpen={setActiveId} />
          </ScrollReveal>
        )}

        {(endUserTech || endUserBiz) && (
          <ScrollReveal delay={0.06}>
            <EndUserFrame
              technical={endUserTech}
              business={endUserBiz}
              onOpen={setActiveId}
            />
          </ScrollReveal>
        )}

        {investor && (
          <ScrollReveal delay={0.12}>
            <PersonaCard persona={investor} onOpen={setActiveId} />
          </ScrollReveal>
        )}
      </div>

      <PersonaModal persona={activePersona} onClose={() => setActiveId(null)} />
    </>
  );
}

function EndUserFrame({
  technical,
  business,
  onOpen,
}: {
  technical?: Persona;
  business?: Persona;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/15 bg-white/[0.015] p-5 md:p-6">
      <div className="mb-5">
        <h3 className="font-display text-lg font-semibold text-ink">End user</h3>
        <p className="mt-1 text-xs text-muted">The people who live in monday day to day.</p>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        {technical && <PersonaCard persona={technical} variant="nested" onOpen={onOpen} />}
        {business && <PersonaCard persona={business} variant="nested" onOpen={onOpen} />}
      </div>
    </div>
  );
}

/** Minimal persona card — photo, name, role, read-more arrow.
 *  Full content (whoAreThey, whatTheyCareAbout, messaging goal, features)
 *  lives in the modal, opened by the arrow. */
function PersonaCard({
  persona,
  variant = 'full',
  onOpen,
}: {
  persona: Persona;
  variant?: 'full' | 'nested';
  onOpen: (id: string) => void;
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
      {/* Read-more arrow — top-right, icon only, opens the modal */}
      <button
        type="button"
        onClick={() => onOpen(persona.id)}
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

      <PersonaPhoto persona={persona} />

      <div className="mt-5">
        <h4 className="font-display text-xl font-semibold leading-tight text-ink md:text-2xl">
          {persona.name}
        </h4>
        <p className="mt-1 text-sm text-muted">{persona.role}</p>
      </div>
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

/** Persona detail modal — opens when the read-more arrow is clicked. */
function PersonaModal({
  persona,
  onClose,
}: {
  persona: Persona | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  // Close on ESC + lock body scroll while open
  useEffect(() => {
    if (!persona) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [persona, onClose]);

  return (
    <AnimatePresence>
      {persona && (
        <motion.div
          key="persona-modal"
          initial={reduce ? undefined : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${persona.name} — details`}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-canvas/85 backdrop-blur-md" />

          {/* Card */}
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 20, scale: 0.97 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-accent/30 bg-canvas shadow-card-lg max-h-[90vh] overflow-y-auto"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_0%,rgba(165,138,255,0.12),transparent_55%)]"
            />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-canvas/80 text-muted backdrop-blur transition-colors hover:border-accent/50 hover:bg-accent/[0.12] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Content */}
            <div className="relative p-8 md:p-10">
              {/* Header — photo + name + role */}
              <div className="flex items-start gap-5">
                <PersonaPhoto persona={persona} />
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-ink md:text-3xl">
                    {persona.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted md:text-base">{persona.role}</p>
                </div>
              </div>

              {/* Who are they */}
              {persona.whoAreThey.length > 0 && (
                <div className="mt-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
                    Who are they
                  </p>
                  <ul className="mt-3 space-y-2">
                    {persona.whoAreThey.map((line, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ink/85 md:text-base"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[10px] inline-block h-1 w-1 shrink-0 rounded-full bg-accent/70"
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What they care about */}
              {persona.whatTheyCareAbout && (
                <div className="mt-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
                    What they care about
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/90 md:text-base">
                    {persona.whatTheyCareAbout}
                  </p>
                </div>
              )}

              {/* Messaging goal */}
              {persona.messagingGoal && (
                <div className="mt-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent/85">
                    Our messaging goal
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink md:text-base">
                    {persona.messagingGoal}
                  </p>
                </div>
              )}

              {/* Features tags */}
              {persona.features.length > 0 && (
                <div className="mt-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted/70">
                    Features
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {persona.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 text-xs font-medium text-ink/90 md:text-sm"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
