import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardGradientProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Use the subtler 16px-radius variant. */
  subtle?: boolean;
  /** Inner padding shorthand. */
  padded?: boolean;
  innerClassName?: string;
}

/**
 * Signature surface — gradient border + radial purple glow inner.
 * Composed in every card across the site so the visual language stays cohesive.
 */
export function CardGradient({
  children,
  subtle = false,
  padded = false,
  className,
  innerClassName,
  ...rest
}: CardGradientProps) {
  return (
    <div
      className={cn(subtle ? 'card-gradient-subtle' : 'card-gradient', 'group/card', className)}
      {...rest}
    >
      <div
        className={cn(
          'card-gradient-inner h-full',
          padded && 'p-6 md:p-8',
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
