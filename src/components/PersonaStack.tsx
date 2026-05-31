import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Persona } from '@/types';

interface PersonaStackProps {
  personas: Persona[];
  /** Auto-rotate interval in ms. */
  intervalMs?: number;
  className?: string;
}

/**
 * Auto-rotating stack of persona cards. Top card animates forward, others
 * scale down behind. Click any back card to bring it to front.
 * Pattern adapted from Magic MCP (CardSlide).
 */
export function PersonaStack({
  personas,
  intervalMs = 5000,
  className,
}: PersonaStackProps) {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(() => personas.map((_, i) => i));
  const [paused, setPaused] = useState(false);

  // Auto rotate.
  useEffect(() => {
    if (reduce || paused || personas.length < 2) return;
    const id = window.setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        const top = next.shift();
        if (top !== undefined) next.push(top);
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduce, paused, intervalMs, personas.length]);

  function bringToFront(index: number) {
    setOrder((prev) => {
      const found = prev.indexOf(index);
      if (found <= 0) return prev;
      return [prev[found], ...prev.slice(0, found), ...prev.slice(found + 1)];
    });
  }

  if (personas.length === 0) return null;

  return (
    <div
      className={cn('relative mx-auto w-full max-w-md', className)}
      style={{ height: '32rem' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="card stack"
    >
      {order.map((personaIndex, stackPos) => {
        const persona = personas[personaIndex];
        if (!persona) return null;
        const isTop = stackPos === 0;
        const offsetY = stackPos * 18;
        const scale = 1 - stackPos * 0.04;
        const opacity = stackPos > 3 ? 0 : 1;
        return (
          <motion.div
            key={persona.id}
            className={cn(
              'absolute inset-x-0 mx-auto h-full origin-top',
              isTop ? 'cursor-default' : 'cursor-pointer',
            )}
            initial={false}
            animate={{
              top: offsetY,
              scale,
              opacity,
              zIndex: personas.length - stackPos,
            }}
            transition={{ type: 'spring', stiffness: 140, damping: 22 }}
            onClick={() => !isTop && bringToFront(personaIndex)}
            aria-hidden={!isTop}
            role={isTop ? undefined : 'button'}
            aria-label={!isTop ? `Show ${persona.name}` : undefined}
          >
            <PersonaCardSurface persona={persona} isTop={isTop} />
          </motion.div>
        );
      })}

      {/* Dots */}
      {personas.length > 1 && (
        <div className="absolute -bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {personas.map((_, i) => (
            <button
              key={i}
              onClick={() => bringToFront(i)}
              aria-label={`Show persona ${i + 1}`}
              className={cn(
                'h-1.5 cursor-pointer rounded-full transition-all duration-300',
                order[0] === i ? 'w-5 bg-accent' : 'w-1.5 bg-white/25 hover:bg-white/50',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PersonaCardSurface({ persona, isTop }: { persona: Persona; isTop: boolean }) {
  const [imgOk, setImgOk] = useState<boolean | null>(null);
  const isPrimary = persona.kind === 'primary';

  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-3xl border bg-canvas/95 backdrop-blur',
        isPrimary ? 'border-accent/30 shadow-[0_0_60px_-20px_rgba(165,138,255,0.4)]' : 'border-white/10 shadow-2xl',
        !isTop && 'pointer-events-none',
      )}
    >
      {/* Photo header */}
      <div className="relative h-56 w-full overflow-hidden border-b border-white/5">
        {imgOk !== false ? (
          <img
            src={persona.photo}
            alt={persona.name}
            className={cn('h-full w-full object-cover', imgOk === null && 'opacity-0')}
            onLoad={() => setImgOk(true)}
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-violet-500/25 via-indigo-500/15 to-sky-500/10">
            <User className="h-12 w-12 text-white/40" aria-hidden="true" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas via-canvas/60 to-transparent p-5">
          <p className={cn('text-eyebrow uppercase', isPrimary ? 'text-accent' : 'text-muted')}>
            {isPrimary ? 'Primary' : 'Secondary'}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-7">
        <h3 className="font-display text-2xl font-semibold leading-tight text-ink">{persona.name}</h3>
        <p className="mt-1 text-sm uppercase tracking-wider text-muted">{persona.role}</p>
        <p className="mt-5 text-base leading-relaxed text-muted">{persona.description}</p>
      </div>
    </div>
  );
}
