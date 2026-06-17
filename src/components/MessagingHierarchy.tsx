import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * MessagingHierarchy — visual hierarchy of:
 *   1. Official launch tagline    (biggest, top)
 *   2. Key message                (mid)
 *   3. Secondary messages         (small, up to 3, side by side)
 *
 * A thin violet rail on the left and step-down indentation give the
 * hierarchy a real visual structure (org-chart vibes, no chart).
 */
interface MessagingHierarchyProps {
  tagline: string;
  keyMessage: string;
  secondaryMessages: string[];
  className?: string;
}

export function MessagingHierarchy({
  tagline,
  keyMessage,
  secondaryMessages,
  className,
}: MessagingHierarchyProps) {
  const reduce = useReducedMotion();
  const secondaries = secondaryMessages.slice(0, 3);

  return (
    <div className={cn('relative', className)}>
      {/* Vertical rail running through the hierarchy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-3 bottom-3 w-px bg-gradient-to-b from-accent via-accent/40 to-transparent md:left-4"
      />

      {/* Tagline — top of hierarchy */}
      <Row level="tagline" reduce={!!reduce} delay={0}>
        <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent/85">
          Tagline
        </span>
        <motion.h3
          initial={reduce ? undefined : { opacity: 0, y: 12, filter: 'blur(8px)' }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-[clamp(36px,6vw,84px)] font-bold leading-[1.0] tracking-[-0.02em] text-ink"
        >
          <span className="bg-gradient-to-br from-violet-200 via-indigo-200 to-sky-300 bg-clip-text text-transparent">
            {tagline}
          </span>
        </motion.h3>
      </Row>

      {/* Key message — mid level */}
      <Row level="key" reduce={!!reduce} delay={0.1}>
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(22px,3vw,36px)] font-semibold leading-[1.18] text-ink"
        >
          {keyMessage}
        </motion.p>
      </Row>

      {/* Secondary messages — bottom level, grid */}
      {secondaries.length > 0 && (
        <Row level="secondary" reduce={!!reduce} delay={0.18}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {secondaries.map((msg, i) => (
              <motion.div
                key={i}
                initial={reduce ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <p className="mt-3 text-base leading-relaxed text-ink/90 md:text-lg">{msg}</p>
              </motion.div>
            ))}
          </div>
        </Row>
      )}
    </div>
  );
}

/* ---------- helpers ---------- */

function Row({
  level,
  reduce: _reduce,
  delay: _delay,
  children,
}: {
  level: 'tagline' | 'key' | 'secondary';
  reduce: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  // Indent grows per level — gives the visual "step-down"
  const indent =
    level === 'tagline' ? 'pl-10 md:pl-14' : level === 'key' ? 'pl-14 md:pl-20' : 'pl-14 md:pl-20';
  const spacing = level === 'tagline' ? 'pt-2' : 'pt-14 md:pt-16';
  return (
    <div className={cn('relative', indent, spacing)}>
      {/* Horizontal connector tick */}
      <span
        aria-hidden="true"
        className="absolute left-3 top-6 h-px w-6 bg-accent/40 md:left-4 md:top-7 md:w-10"
      />
      {/* Node dot on the rail */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-[7px] top-[19px] h-3 w-3 rounded-full border md:left-[11px] md:top-[22px]',
          level === 'tagline'
            ? 'border-accent bg-accent shadow-[0_0_18px_rgba(165,138,255,0.7)]'
            : level === 'key'
              ? 'border-accent/70 bg-accent/40'
              : 'border-accent/50 bg-canvas',
        )}
      />
      {children}
    </div>
  );
}

