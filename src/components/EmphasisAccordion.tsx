import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmphasisAccordionItem {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
}

interface EmphasisAccordionProps {
  items: EmphasisAccordionItem[];
  className?: string;
  /** Default active index. */
  defaultActive?: number;
}

/**
 * Horizontal interactive image accordion — hovering a panel expands it and
 * collapses the rest. Pattern from Magic MCP (interactive-image-accordion).
 *
 * Active panel reveals image + title + description; inactive panels show
 * a vertical rotated label.
 */
export function EmphasisAccordion({
  items,
  className,
  defaultActive = 0,
}: EmphasisAccordionProps) {
  const [active, setActive] = useState(defaultActive);

  return (
    <div className={cn('flex w-full flex-col gap-3 md:flex-row md:gap-4', className)}>
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <AccordionPanel
            key={item.title}
            item={item}
            isActive={isActive}
            onActivate={() => setActive(i)}
            index={i}
          />
        );
      })}
    </div>
  );
}

interface PanelProps {
  item: EmphasisAccordionItem;
  isActive: boolean;
  onActivate: () => void;
  index: number;
}

function AccordionPanel({ item, isActive, onActivate, index }: PanelProps) {
  const [imgOk, setImgOk] = useState<boolean | null>(null);

  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-expanded={isActive}
      aria-label={`Emphasis ${index + 1}: ${item.title}`}
      className={cn(
        'group relative h-[28rem] cursor-pointer overflow-hidden rounded-3xl border border-white/10',
        'transition-[flex] duration-700 ease-cinematic',
        // On desktop: active grows to flex-[5], inactive collapses to flex-[1]
        isActive ? 'md:flex-[5]' : 'md:flex-[1]',
        // On mobile: full width, fixed height ratios
        'w-full',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {imgOk !== false ? (
          <img
            src={item.image}
            alt={item.imageAlt ?? item.title}
            className={cn(
              'h-full w-full object-cover transition-transform duration-1000 ease-cinematic',
              isActive ? 'scale-100' : 'scale-110',
              imgOk === null && 'opacity-0',
            )}
            onLoad={() => setImgOk(true)}
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-violet-500/20 via-indigo-500/10 to-sky-500/10">
            <div className="text-center">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                <ImageIcon className="h-4 w-4 text-white/60" aria-hidden="true" />
              </span>
              <p className="mt-3 px-3 font-mono text-[10px] text-white/40">{item.image}</p>
            </div>
          </div>
        )}
      </div>

      {/* Dim overlay (heavier on inactive) */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-500',
          isActive ? 'bg-gradient-to-t from-canvas via-canvas/40 to-transparent' : 'bg-canvas/80',
        )}
      />

      {/* Inactive label — vertical, rotated */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 flex items-end justify-center transition-opacity duration-300',
          isActive ? 'opacity-0' : 'opacity-100',
        )}
      >
        <div className="mb-10 origin-bottom rotate-180 [writing-mode:vertical-rl] font-display text-base font-medium uppercase tracking-[0.2em] text-white/80">
          {item.title}
        </div>
      </div>

      {/* Active content */}
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-7 text-left transition-opacity duration-500',
          isActive ? 'opacity-100' : 'opacity-0',
        )}
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {(index + 1).toString().padStart(2, '0')}
        </p>
        <h4 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink md:text-3xl">
          {item.title}
        </h4>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted md:text-base">
          {item.description}
        </p>
      </div>
    </button>
  );
}
