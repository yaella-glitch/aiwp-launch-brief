import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionLinkProps {
  href: string;
  label: string;
  className?: string;
}

/**
 * Small "see more" pill button used in the top-right of brief sections
 * (e.g. "Full feature list", "Full use-cases list", "Launch board").
 *
 * The pill has an animated violet→indigo gradient ring that continuously
 * slides around its border for a subtle "alive" effect.
 */
export function ActionLink({ href, label, className }: ActionLinkProps) {
  return (
    <span className={cn('relative inline-flex rounded-full p-[1.5px]', className)}>
      {/* Animated gradient ring */}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'linear-gradient(90deg, rgba(165,138,255,0.4) 0%, rgba(135,170,255,1) 50%, rgba(165,138,255,0.4) 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
      />
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cn(
          'group relative inline-flex items-center gap-2 rounded-full bg-canvas px-4 py-2',
          'text-sm font-medium text-ink/90 transition-colors duration-200',
          'hover:text-ink',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
        )}
      >
        <span>{label}</span>
        <ArrowUpRight
          className="h-3.5 w-3.5 text-accent transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    </span>
  );
}
