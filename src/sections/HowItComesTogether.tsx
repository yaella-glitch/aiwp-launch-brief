import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ImageIcon } from 'lucide-react';
import { howItComesTogether } from '@/content';
import { cn } from '@/lib/utils';
import type { Aspect } from '@/types';

/**
 * S1 · How it all comes together — Weave-style image collage.
 *
 * Asymmetric bento grid of aspect cards. Each card shows a placeholder image
 * (with a graceful "drop image here" treatment) plus title + one-liner.
 * Click → 480px right drawer with full description + highlights.
 *
 * This is the "screenshot for your deck" moment.
 */

/** Bento layout — each row defines [columns] for the grid. Designed for 6 aspects. */
const LAYOUT_CLASSES = [
  // 1st card — large hero
  'md:col-span-3 md:row-span-2 aspect-[4/5] md:aspect-auto',
  // 2nd — medium tall
  'md:col-span-2 md:row-span-2 aspect-[4/5] md:aspect-auto',
  // 3rd — square
  'md:col-span-2 aspect-square',
  // 4th — wide
  'md:col-span-3 aspect-[16/9]',
  // 5th — square
  'md:col-span-2 aspect-square',
  // 6th — wide
  'md:col-span-3 aspect-[16/9]',
];

export function HowItComesTogether() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeId) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveId(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeId]);

  const active = howItComesTogether.aspects.find((a) => a.id === activeId) ?? null;

  return (
    <section
      id="how-it-comes-together"
      data-section="how-it-comes-together"
      className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        <header className="max-w-3xl">
          <p className="text-eyebrow uppercase text-accent">{howItComesTogether.eyebrow}</p>
          <h2 className="mt-4 font-display text-[clamp(40px,7vw,96px)] font-bold leading-[0.95] tracking-tight text-ink">
            {howItComesTogether.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lead text-muted">{howItComesTogether.lede}</p>
        </header>
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-5 md:auto-rows-[220px]">
        {howItComesTogether.aspects.map((a, i) => (
          <AspectCard
            key={a.id}
            aspect={a}
            className={LAYOUT_CLASSES[i] ?? 'md:col-span-2 aspect-square'}
            delay={i * 0.08}
            onOpen={() => setActiveId(a.id)}
          />
        ))}
      </div>

      </div>
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setActiveId(null)}
            />
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-surface/95 backdrop-blur-md"
              role="dialog"
              aria-labelledby="aspect-drawer-title"
            >
              <AspectDrawer aspect={active} onClose={() => setActiveId(null)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

interface AspectCardProps {
  aspect: Aspect;
  className: string;
  delay: number;
  onOpen: () => void;
}

function AspectCard({ aspect, className, delay, onOpen }: AspectCardProps) {
  const reduce = useReducedMotion();
  const [imgOk, setImgOk] = useState<boolean | null>(null);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-surface/60 text-left',
        'transition-all duration-300 ease-cinematic hover:-translate-y-1 hover:border-accent/40 hover:shadow-card',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
        className,
      )}
      aria-label={`${aspect.title} — open details`}
    >
      {/* Image / placeholder */}
      <div className="absolute inset-0">
        {imgOk !== false && (
          <img
            src={aspect.image}
            alt={aspect.imageAlt}
            className="h-full w-full object-cover"
            onLoad={() => setImgOk(true)}
            onError={() => setImgOk(false)}
          />
        )}
        {imgOk === false && <AspectPlaceholder src={aspect.image} />}
      </div>

      {/* Bottom gradient + label overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-canvas via-canvas/85 to-transparent p-5 md:p-6">
        <h3 className="font-display text-xl font-semibold leading-tight text-ink md:text-2xl">
          {aspect.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-white/70 md:text-[15px]">
          {aspect.oneLiner}
        </p>
      </div>

      {/* Hover affordance */}
      <span
        aria-hidden="true"
        className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </span>
    </motion.button>
  );
}

function AspectPlaceholder({ src }: { src: string }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/15 via-indigo-500/8 to-sky-500/12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className="relative z-[1] text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
          <ImageIcon className="h-5 w-5 text-white/60" aria-hidden="true" />
        </span>
        <p className="mt-3 px-4 font-mono text-[10px] tracking-tight text-white/40">{src}</p>
      </div>
    </div>
  );
}

function AspectDrawer({ aspect, onClose }: { aspect: Aspect; onClose: () => void }) {
  const [imgOk, setImgOk] = useState<boolean | null>(null);

  return (
    <>
      <header className="flex items-start justify-between gap-4 border-b border-white/5 p-6 md:p-8">
        <div className="min-w-0">
          <p className="text-eyebrow uppercase text-accent">Aspect</p>
          <h3 id="aspect-drawer-title" className="mt-3 font-display text-3xl text-ink md:text-4xl">
            {aspect.title}
          </h3>
          <p className="mt-3 text-base text-muted">{aspect.oneLiner}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/10 bg-white/5 text-muted transition-colors duration-200 hover:bg-white/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden border-b border-white/5">
          {imgOk !== false && (
            <img
              src={aspect.image}
              alt={aspect.imageAlt}
              className="h-full w-full object-cover"
              onLoad={() => setImgOk(true)}
              onError={() => setImgOk(false)}
            />
          )}
          {imgOk === false && <AspectPlaceholder src={aspect.image} />}
        </div>

        <div className="p-6 md:p-8">
          <p className="text-base leading-relaxed text-ink/85">{aspect.description}</p>

          <h4 className="mt-8 text-eyebrow uppercase text-muted">Highlights</h4>
          <ul className="mt-4 space-y-3">
            {aspect.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-base text-ink/90">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
