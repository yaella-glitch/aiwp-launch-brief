import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EditorialHeaderProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
  /** When true, the eyebrow gets the violet thin-line accent treatment. */
  withRule?: boolean;
}

/**
 * Designer-style section header. NO big numbered watermark, NO part labels.
 * Just: eyebrow → title → lede. Tight, editorial, restrained.
 */
export function EditorialHeader({
  eyebrow,
  title,
  lede,
  className,
  withRule = true,
}: EditorialHeaderProps) {
  const reduce = useReducedMotion();
  return (
    <header className={cn('max-w-3xl', className)}>
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 10 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3"
      >
        {withRule && (
          <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
        )}
        <p className="text-eyebrow uppercase text-accent">{eyebrow}</p>
      </motion.div>
      <motion.h2
        initial={reduce ? undefined : { opacity: 0, y: 14, filter: 'blur(8px)' }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 font-display text-[clamp(36px,5.5vw,72px)] font-bold leading-[0.98] tracking-tight text-ink"
      >
        {title}
      </motion.h2>
      {lede && (
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 max-w-2xl text-lead text-muted"
        >
          {lede}
        </motion.p>
      )}
    </header>
  );
}
