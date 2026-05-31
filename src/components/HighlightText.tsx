import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HighlightTextProps {
  children: ReactNode;
  className?: string;
  /** Tailwind gradient e.g. "from-violet-500 to-indigo-500". */
  gradient?: string;
  /** Reveal duration in seconds. */
  duration?: number;
  /** Reveal delay in seconds. */
  delay?: number;
}

/**
 * Animated marker-style highlight bar that paints across a key phrase
 * on scroll-into-view. Pattern from Magic MCP (Aceternity HeroHighlight).
 */
export function HighlightText({
  children,
  className,
  gradient = 'from-violet-500/80 to-indigo-500/80',
  duration = 1.4,
  delay = 0.3,
}: HighlightTextProps) {
  return (
    <motion.span
      initial={{ backgroundSize: '0% 100%' }}
      whileInView={{ backgroundSize: '100% 100%' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        'relative inline rounded-lg bg-gradient-to-r px-2 py-1 leading-[1.15] text-ink',
        gradient,
        className,
      )}
    >
      {children}
    </motion.span>
  );
}
