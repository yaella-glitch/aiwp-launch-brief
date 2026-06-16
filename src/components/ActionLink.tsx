import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionLinkProps {
  href: string;
  label: string;
  className?: string;
}

/**
 * Small "see more" link with an animated violet gradient underline that
 * continuously slides. Used in the top-right of brief sections.
 */
export function ActionLink({ href, label, className }: ActionLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'group relative inline-flex items-center gap-2 px-1 pb-1.5 pt-1',
        'text-sm font-semibold text-ink transition-colors duration-200',
        'hover:text-accent',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 rounded',
        className,
      )}
    >
      <span>{label}</span>
      <ArrowUpRight
        className="h-3.5 w-3.5 text-accent transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />

      {/* Animated violet gradient underline */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] rounded-full"
        style={{
          background:
            'linear-gradient(90deg, rgba(165,138,255,0) 0%, rgba(165,138,255,0.95) 40%, rgba(135,170,255,0.95) 60%, rgba(165,138,255,0) 100%)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['0% 50%', '200% 50%'] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
      />
    </a>
  );
}
