import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionFrameProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  /** Wider gutters / lighter spacing for hero-class sections. */
  fullBleed?: boolean;
  /** Inverted (light) variant — used once mid-page for tonal contrast. */
  inverted?: boolean;
  className?: string;
}

/**
 * Standard section wrapper. Provides consistent vertical rhythm (160px desktop),
 * eyebrow → H2 → lede header pattern, and full-width vs. constrained layout.
 */
export function SectionFrame({
  id,
  eyebrow,
  title,
  lede,
  children,
  fullBleed = false,
  inverted = false,
  className,
}: SectionFrameProps) {
  return (
    <section
      id={id}
      data-section={id}
      className={cn(
        'relative w-full',
        // Generous vertical padding — "air" philosophy
        'py-24 md:py-32 lg:py-40',
        inverted && 'bg-[rgb(245,245,250)] text-[rgb(12,12,20)]',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto px-6 md:px-10 lg:px-20',
          fullBleed ? 'max-w-[1600px]' : 'max-w-content',
        )}
      >
        {(eyebrow || title || lede) && (
          <header className="mb-12 md:mb-16 lg:mb-20">
            {eyebrow && (
              <p
                className={cn(
                  'mb-5 text-eyebrow uppercase',
                  inverted ? 'text-[rgb(80,80,110)]' : 'text-accent',
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={cn(
                  'font-display text-display-lg',
                  inverted ? 'text-[rgb(12,12,20)]' : 'text-ink',
                )}
              >
                {title}
              </h2>
            )}
            {lede && (
              <p
                className={cn(
                  'mt-6 max-w-3xl text-lead',
                  inverted ? 'text-[rgb(60,60,90)]' : 'text-muted',
                )}
              >
                {lede}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
