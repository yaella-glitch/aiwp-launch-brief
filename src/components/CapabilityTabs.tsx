import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CapabilityTab, CapabilityCard } from '@/types';

interface CapabilityTabsProps {
  tabs: CapabilityTab[];
  className?: string;
}

/**
 * Monday-style top tabs + horizontal card grid.
 *
 * Top: pill-style tab nav (active = violet bg). Below the active tab:
 * optional tagline + grid of capability cards. Each card has a media
 * slot (image or video) plus title + description.
 */
export function CapabilityTabs({ tabs, className }: CapabilityTabsProps) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];
  if (!active) return null;

  return (
    <div className={cn('w-full', className)}>
      {/* Tab nav */}
      <nav
        aria-label="Capability domains"
        className="flex w-full flex-wrap justify-center gap-2 md:gap-3"
      >
        {tabs.map((t) => {
          const isActive = t.id === active.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              aria-pressed={isActive}
              className={cn(
                'cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
                isActive
                  ? 'bg-accent text-canvas shadow-[0_8px_24px_-12px_rgba(165,138,255,0.7)]'
                  : 'border border-white/10 bg-white/[0.03] text-ink/80 hover:border-white/20 hover:bg-white/[0.06] hover:text-ink',
              )}
            >
              {t.title}
            </button>
          );
        })}
      </nav>

      {/* Tab body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          {active.tagline && (
            <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted md:text-lg">
              {active.tagline}
            </p>
          )}

          <div
            className={cn(
              'mt-10 grid gap-5',
              active.cards.length === 1 && 'grid-cols-1 max-w-2xl mx-auto',
              active.cards.length === 2 && 'grid-cols-1 md:grid-cols-2',
              active.cards.length >= 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {active.cards.map((card) => (
              <CardTile key={card.id} card={card} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CardTile({ card }: { card: CapabilityCard }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.05]">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/5">
        {card.media.type === 'video' ? (
          <MediaVideo src={card.media.src} alt={card.media.alt} />
        ) : (
          <MediaImage src={card.media.src} alt={card.media.alt} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="font-display text-lg font-semibold leading-tight text-ink md:text-xl">
          {card.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-muted">{card.description}</p>
      </div>
    </article>
  );
}

function MediaImage({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500/12 via-indigo-500/6 to-sky-500/8">
        <div className="text-center">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <ImageIcon className="h-4 w-4 text-white/60" aria-hidden="true" />
          </span>
          <p className="mt-2 px-4 font-mono text-[10px] text-white/40">{src}</p>
        </div>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'h-full w-full object-cover transition-transform duration-700 ease-cinematic group-hover:scale-[1.03]',
        ok === null && 'opacity-0',
      )}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}

function MediaVideo({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <Play className="h-5 w-5 text-white" aria-hidden="true" />
          </span>
          <p className="mt-3 px-4 font-mono text-[10px] text-white/40">{src}</p>
        </div>
      </div>
    );
  }
  return (
    <video
      src={src}
      muted
      loop
      playsInline
      autoPlay
      aria-label={alt}
      className={cn('h-full w-full object-cover', ok === null && 'opacity-0')}
      onLoadedData={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}
