import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, ImageIcon } from 'lucide-react';
import { cn, withBase } from '@/lib/utils';
import type { CapabilityTab, CapabilityCard } from '@/types';

/**
 * ProductAccordion — vertical accordion that solves the "6 domains × N features"
 * matrix.
 *
 * Desktop:
 *  - Left column: 6 accordion rows (one per domain). Single-open.
 *  - Expanded row reveals: tagline + a vertical list of feature chips.
 *    Clicking a feature chip selects it (and updates the right preview).
 *  - Right column: sticky hero preview of the active feature (image, title,
 *    description).
 *
 * Mobile: accordion only, image renders inline inside the expanded row.
 */

interface ProductAccordionProps {
  tabs: CapabilityTab[];
}

export function ProductAccordion({ tabs }: ProductAccordionProps) {
  const reduce = useReducedMotion();
  // Start with the first domain open so the preview shows a feature
  // by default — empty right-pane felt like a broken state.
  const [openId, setOpenId] = useState<string>(tabs[0]?.id ?? '');
  const [activeFeatureId, setActiveFeatureId] = useState<string>(
    tabs[0]?.cards[0]?.id ?? '',
  );

  // Resolve the currently active feature (for the right preview). Null when
  // nothing is open.
  const activeTab = openId ? tabs.find((t) => t.id === openId) ?? null : null;
  const activeFeature =
    activeTab?.cards.find((c) => c.id === activeFeatureId) ?? activeTab?.cards[0] ?? null;

  function selectTab(id: string) {
    const next = id === openId ? '' : id;
    setOpenId(next);
    if (next) {
      const first = tabs.find((t) => t.id === next)?.cards[0]?.id ?? '';
      setActiveFeatureId(first);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Left: Accordion */}
      <div className="lg:col-span-5">
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {tabs.map((tab) => {
            const isOpen = tab.id === openId;
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => selectTab(tab.id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${tab.id}`}
                  className={cn(
                    'group flex w-full items-center justify-between gap-4 py-6 text-left transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded-md',
                  )}
                >
                  <span
                    className={cn(
                      'font-display text-[clamp(20px,2.4vw,28px)] font-semibold leading-tight transition-colors',
                      isOpen ? 'text-ink' : 'text-muted group-hover:text-ink',
                    )}
                  >
                    {tab.title}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted/70">
                      {tab.cards.length.toString().padStart(2, '0')}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        'h-5 w-5 shrink-0 text-muted/70 transition-transform duration-300',
                        isOpen && 'rotate-180 text-accent',
                      )}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`panel-${tab.id}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={reduce ? undefined : { height: 'auto', opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7">
                        {tab.tagline && (
                          <p className="mt-1 text-sm leading-relaxed text-muted md:text-base">
                            {tab.tagline}
                          </p>
                        )}

                        {/* Feature chips */}
                        <ul className="mt-5 space-y-1.5">
                          {tab.cards.map((card) => {
                            const isActive =
                              isOpen && card.id === activeFeatureId;
                            return (
                              <li key={card.id}>
                                <button
                                  type="button"
                                  onClick={() => setActiveFeatureId(card.id)}
                                  className={cn(
                                    'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200',
                                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
                                    isActive
                                      ? 'border-accent/40 bg-accent/[0.08] shadow-[0_0_30px_-12px_rgba(165,138,255,0.55)]'
                                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]',
                                  )}
                                  aria-pressed={isActive}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={cn(
                                      'mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full transition-colors',
                                      isActive ? 'bg-accent' : 'bg-muted/40',
                                    )}
                                  />
                                  <span className="min-w-0 flex-1">
                                    <span
                                      className={cn(
                                        'block font-display text-base font-semibold leading-snug',
                                        isActive ? 'text-ink' : 'text-ink/85',
                                      )}
                                    >
                                      {card.title}
                                    </span>
                                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                                      {card.description}
                                    </span>
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>

                        {/* Mobile-only inline preview */}
                        {activeFeature && (
                          <div className="mt-6 lg:hidden">
                            <FeaturePreview card={activeFeature} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right: sticky preview (desktop only) */}
      <div className="hidden lg:col-span-7 lg:block">
        <div className="sticky top-24">
          <AnimatePresence mode="wait">
            {activeFeature ? (
              <motion.div
                key={`${activeTab?.id}-${activeFeature.id}`}
                initial={reduce ? undefined : { opacity: 0, y: 16 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <FeaturePreview card={activeFeature} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={reduce ? undefined : { opacity: 0 }}
                animate={reduce ? undefined : { opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex aspect-[16/10] w-full items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.015] p-10 text-center"
              >
                <p className="max-w-xs text-sm leading-relaxed text-muted/70">
                  Open a domain on the left to preview the features inside.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ---------- preview card ---------- */

function FeaturePreview({ card }: { card: CapabilityCard }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-card-lg">
      <div className="aspect-[16/10] w-full bg-gradient-to-br from-violet-500/12 via-indigo-500/6 to-sky-500/8">
        <PreviewMedia card={card} />
      </div>
      <div className="p-7">
        <h3 className="font-display text-2xl font-semibold text-ink">{card.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-muted">{card.description}</p>
      </div>
    </div>
  );
}

function PreviewMedia({ card }: { card: CapabilityCard }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false || !card.media?.src) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <ImageIcon className="h-5 w-5 text-white/60" aria-hidden="true" />
          </span>
          <p className="mt-3 px-4 font-mono text-[10px] text-white/40">{card.media?.src}</p>
        </div>
      </div>
    );
  }
  if (card.media.type === 'video') {
    return (
      <video
        src={withBase(card.media.src)}
        muted
        loop
        playsInline
        autoPlay
        aria-label={card.media.alt}
        className={cn('h-full w-full object-cover', ok === null && 'opacity-0')}
        onLoadedData={() => setOk(true)}
        onError={() => setOk(false)}
      />
    );
  }
  return (
    <img
      src={withBase(card.media.src)}
      alt={card.media.alt}
      className={cn('h-full w-full object-cover', ok === null && 'opacity-0')}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}
