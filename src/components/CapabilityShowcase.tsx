import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Capability } from '@/types';

interface CapabilityShowcaseProps {
  capabilities: Capability[];
  className?: string;
}

/**
 * Shadcnblocks-style Feature 108 layout:
 *  - Left column: vertical list of capability tabs with active indicator
 *  - Right column: large preview image of the active capability, plus
 *    a longer description below
 *
 * Click any tab to switch the preview. Designed to feel like a product
 * tour, not a card grid.
 */
export function CapabilityShowcase({
  capabilities,
  className,
}: CapabilityShowcaseProps) {
  const [activeId, setActiveId] = useState(capabilities[0]?.id);
  const active = capabilities.find((c) => c.id === activeId) ?? capabilities[0];
  if (!active) return null;

  return (
    <div className={cn('grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16', className)}>
      {/* Tabs */}
      <nav aria-label="Capabilities" className="lg:sticky lg:top-24 lg:self-start">
        <ol className="space-y-1.5">
          {capabilities.map((c, i) => {
            const isActive = c.id === active.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'group relative grid w-full grid-cols-[auto_1fr] items-start gap-4 rounded-2xl px-5 py-5 text-left',
                    'cursor-pointer transition-colors duration-300',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
                    isActive
                      ? 'border border-accent/30 bg-accent/[0.06]'
                      : 'border border-transparent hover:border-white/10 hover:bg-white/[0.03]',
                  )}
                >
                  <span
                    className={cn(
                      'mt-1 font-mono text-xs tracking-[0.2em] transition-colors',
                      isActive ? 'text-accent' : 'text-muted/60',
                    )}
                  >
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h4
                      className={cn(
                        'font-display text-lg font-semibold leading-tight transition-colors md:text-xl',
                        isActive ? 'text-ink' : 'text-ink/70 group-hover:text-ink',
                      )}
                    >
                      {c.title}
                    </h4>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {c.description}
                        </p>
                        {c.items && c.items.length > 0 && (
                          <ul className="mt-5 space-y-3">
                            {c.items.map((it) => (
                              <li key={it.title} className="border-l border-accent/30 pl-3.5">
                                <div className="flex items-center gap-2">
                                  <p className="font-display text-sm font-semibold text-ink">
                                    {it.title}
                                  </p>
                                  {it.tag && (
                                    <span className="rounded-full border border-white/15 bg-white/5 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted">
                                      {it.tag}
                                    </span>
                                  )}
                                </div>
                                <p className="mt-1 text-xs leading-relaxed text-muted">
                                  {it.description}
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </div>
                  {/* Active indicator bar */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 rounded-full bg-accent transition-opacity duration-300',
                      isActive ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Preview */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="card-gradient"
          >
            <div className="card-gradient-inner aspect-[16/10] w-full overflow-hidden">
              <PreviewImage src={active.media.src} alt={active.media.alt} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PreviewImage({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState<boolean | null>(null);
  if (ok === false) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(165,138,255,0.16),transparent_60%),rgb(17,17,32)]">
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
      src={src}
      alt={alt}
      className={cn('h-full w-full object-cover', ok === null && 'opacity-0')}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}
