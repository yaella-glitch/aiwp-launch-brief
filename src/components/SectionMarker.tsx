import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionMarkerProps {
  /** Big "01", "02", etc. */
  number: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Title uses Space Grotesk display by default. */
  className?: string;
  inverted?: boolean;
}

/**
 * Apple-inspired section header: massive number watermark + part-eyebrow +
 * editorial-scale title. Used at the top of every Part (1–5).
 *
 *  ╔════════╗
 *  ║   01   ║   Part 1
 *  ╚════════╝   Product overview.
 *               One-line lede.
 */
export function SectionMarker({ number, eyebrow, title, lede, className, inverted = false }: SectionMarkerProps) {
  const reduce = useReducedMotion();
  return (
    <header
      className={cn('relative grid grid-cols-1 items-end gap-y-6 md:grid-cols-[auto_1fr] md:gap-x-12 lg:gap-x-20', className)}
    >
      {/* Big number */}
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative shrink-0"
      >
        <span
          className={cn(
            'block font-display font-bold leading-none',
            'text-[clamp(72px,12vw,160px)] tracking-tighter',
            inverted
              ? 'bg-gradient-to-br from-[rgb(20,20,40)] to-[rgb(60,40,120)] bg-clip-text text-transparent'
              : 'bg-gradient-to-br from-white/20 via-white/10 to-transparent bg-clip-text text-transparent',
          )}
          aria-hidden="true"
        >
          {number}
        </span>
        {/* Soft accent dot */}
        <span
          aria-hidden="true"
          className="absolute -right-2 top-2 inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_rgba(165,138,255,0.9)]"
        />
      </motion.div>

      <div className="min-w-0">
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className={cn('text-eyebrow uppercase', inverted ? 'text-accent' : 'text-accent')}
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          initial={reduce ? undefined : { opacity: 0, y: 18, filter: 'blur(10px)' }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'mt-4 font-display font-bold tracking-tight',
            'text-[clamp(40px,7vw,84px)] leading-[0.95]',
            inverted ? 'text-[rgb(12,12,20)]' : 'text-ink',
          )}
        >
          {title}
        </motion.h2>
        {lede && (
          <motion.p
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={cn('mt-6 max-w-2xl text-lead', inverted ? 'text-[rgb(60,60,90)]' : 'text-muted')}
          >
            {lede}
          </motion.p>
        )}
      </div>
    </header>
  );
}
