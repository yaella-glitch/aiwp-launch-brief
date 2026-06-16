import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionLinkProps {
  href: string;
  label: string;
  className?: string;
}

/**
 * Small "see more" link used in the top-right corner of brief sections
 * (e.g. "Full feature list", "Full use-cases list", "Launch board").
 * Opens in a new tab.
 */
export function ActionLink({ href, label, className }: ActionLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2',
        'text-sm font-medium text-ink/85 transition-all duration-200',
        'hover:border-accent/50 hover:bg-accent/[0.08] hover:text-ink',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
        className,
      )}
    >
      <span>{label}</span>
      <ArrowUpRight
        className="h-3.5 w-3.5 text-muted/70 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        aria-hidden="true"
      />
    </a>
  );
}
