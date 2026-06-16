import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface EditorialHeaderProps {
  /** Optional small uppercase label above the title. */
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Optional small action (e.g. "Full feature list" link) rendered to the
   *  right of the title on desktop, below the lede on mobile. */
  action?: ReactNode;
  className?: string;
}

/**
 * Designer-style section header. NO big numbered watermark, NO part labels.
 * Just: eyebrow → title → lede (+ optional action). Tight, editorial.
 */
export function EditorialHeader({
  eyebrow,
  title,
  lede,
  action,
  className,
}: EditorialHeaderProps) {
  const reduce = useReducedMotion();
  return (
    <header className={cn('relative', action ? 'max-w-none' : 'max-w-3xl', className)}>
      <div
        className={cn(
          action
            ? 'flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10'
            : '',
        )}
      >
        <div className={cn(action ? 'max-w-3xl' : '')}>
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
        </div>

        {action && (
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: 6 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:mt-2 md:shrink-0"
          >
            {action}
          </motion.div>
        )}
      </div>
    </header>
  );
}
