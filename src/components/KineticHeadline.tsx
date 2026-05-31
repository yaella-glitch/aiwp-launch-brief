import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface KineticHeadlineProps {
  text: string;
  className?: string;
  /** Starting animation delay (s). */
  delay?: number;
  /** Per-word stagger (s). */
  stagger?: number;
  /** Render each word inside a gradient text span. */
  gradient?: boolean;
}

/**
 * Word-by-word reveal with blur + y + scale — the hero centerpiece.
 *
 * Pattern adapted from a Magic MCP "Animated Hero Section" sample.
 * Each word animates independently. Respects prefers-reduced-motion.
 */
export function KineticHeadline({
  text,
  className,
  delay = 0,
  stagger = 0.08,
  gradient = false,
}: KineticHeadlineProps) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) {
    return (
      <span
        className={cn(
          className,
          gradient && 'bg-gradient-to-br from-violet-200 via-indigo-200 to-sky-300 bg-clip-text text-transparent',
        )}
      >
        {text}
      </span>
    );
  }

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-visible">
          <motion.span
            aria-hidden="true"
            className={cn(
              'inline-block',
              gradient && 'bg-gradient-to-br from-violet-200 via-indigo-200 to-sky-300 bg-clip-text text-transparent',
            )}
            initial={{ opacity: 0, y: 28, filter: 'blur(14px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
