/**
 * Pillar tint palette — each tint maps to bg/15, border/30, text-100 classes.
 * Used by PillarCard, PillarBadge, ChannelTile, etc.
 */
export type Tint = 'violet' | 'indigo' | 'sky' | 'emerald' | 'amber' | 'rose' | 'slate';

export const tintClasses: Record<
  Tint,
  { bg: string; border: string; text: string; ring: string; stripe: string }
> = {
  violet: {
    bg: 'bg-violet-400/15',
    border: 'border-violet-400/30',
    text: 'text-violet-100',
    ring: 'ring-violet-400/40',
    stripe: 'bg-violet-400',
  },
  indigo: {
    bg: 'bg-indigo-400/15',
    border: 'border-indigo-400/30',
    text: 'text-indigo-100',
    ring: 'ring-indigo-400/40',
    stripe: 'bg-indigo-400',
  },
  sky: {
    bg: 'bg-sky-400/15',
    border: 'border-sky-400/30',
    text: 'text-sky-100',
    ring: 'ring-sky-400/40',
    stripe: 'bg-sky-400',
  },
  emerald: {
    bg: 'bg-emerald-400/15',
    border: 'border-emerald-400/30',
    text: 'text-emerald-100',
    ring: 'ring-emerald-400/40',
    stripe: 'bg-emerald-400',
  },
  amber: {
    bg: 'bg-amber-400/15',
    border: 'border-amber-400/30',
    text: 'text-amber-100',
    ring: 'ring-amber-400/40',
    stripe: 'bg-amber-400',
  },
  rose: {
    bg: 'bg-rose-400/15',
    border: 'border-rose-400/30',
    text: 'text-rose-100',
    ring: 'ring-rose-400/40',
    stripe: 'bg-rose-400',
  },
  slate: {
    bg: 'bg-slate-400/15',
    border: 'border-slate-400/30',
    text: 'text-slate-100',
    ring: 'ring-slate-400/40',
    stripe: 'bg-slate-400',
  },
};
