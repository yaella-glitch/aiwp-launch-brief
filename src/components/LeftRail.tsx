import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { SectionMeta } from '@/types';

interface LeftRailProps {
  sections: SectionMeta[];
}

/**
 * Sticky left navigation rail. Scroll-spy highlights the section currently
 * in view. Smooth-scrolls on click. Hidden in present mode.
 */
export function LeftRail({ sections }: LeftRailProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const nodes = ids
      .map((id) => document.querySelector(`[data-section="${id}"]`))
      .filter((n): n is Element => Boolean(n));

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0];
        if (first?.target.getAttribute('data-section')) {
          setActiveId(first.target.getAttribute('data-section')!);
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed left-0 top-14 z-20 hidden h-[calc(100vh-3.5rem)] w-60 overflow-y-auto border-r border-white/5 bg-canvas/40 backdrop-blur xl:block"
    >
      <ol className="flex flex-col gap-0.5 py-6 pl-6 pr-3 text-sm">
        {sections.map((s, i) => {
          const active = s.id === activeId;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector(`[data-section="${s.id}"]`);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  history.replaceState(null, '', `#${s.id}`);
                }}
                aria-current={active ? 'location' : undefined}
                className={cn(
                  'group flex cursor-pointer items-center gap-3 rounded-md py-2 pl-2 pr-3 transition-colors duration-200',
                  active ? 'text-ink' : 'text-muted hover:text-ink',
                )}
              >
                <span
                  className={cn(
                    'inline-block h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200',
                    active
                      ? 'bg-accent shadow-[0_0_8px_rgba(165,138,255,0.7)]'
                      : 'bg-white/20 group-hover:bg-white/50',
                  )}
                  aria-hidden="true"
                />
                <span className="tabular-nums text-xs text-muted/60">
                  {String(i).padStart(2, '0')}
                </span>
                <span className="truncate">{s.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
