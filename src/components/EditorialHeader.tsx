import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EditorialHeaderProps {
  /** Optional small uppercase label above the title. */
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
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
}: EditorialHeaderProps) {
  const reduce = useReducedMotion();
  return (
    <header className={cn('max-w-3xl', className)}>
      {eyebrow && (
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-eyebrow uppercase text-muted"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={reduce ? undefined : { opacity: 0, y: 14, filter: 'blur(8px)' }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'font-display text-[clamp(36px,5.5vw,72px)] font-bold leading-[0.98] tracking-tight text-ink',
          eyebrow && 'mt-5',
        )}
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
