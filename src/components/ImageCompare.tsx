import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCompareProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  altBefore?: string;
  altAfter?: string;
  initialPosition?: number;
  className?: string;
}

/**
 * Draggable before/after image comparison.
 * Pattern adapted from Magic MCP's image-comparison-slider sample.
 *
 * Renders a graceful violet placeholder when images are missing.
 */
export function ImageCompare({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  altBefore = 'Before',
  altAfter = 'After',
  initialPosition = 50,
  className,
}: ImageCompareProps) {
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMove(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let next = ((clientX - rect.left) / rect.width) * 100;
    next = Math.max(0, Math.min(100, next));
    setPosition(next);
  }

  useEffect(() => {
    if (!dragging) return;
    function onMove(e: MouseEvent) {
      handleMove(e.clientX);
    }
    function onTouch(e: TouchEvent) {
      if (e.touches[0]) handleMove(e.touches[0].clientX);
    }
    function onEnd() {
      setDragging(false);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onTouch, { passive: true });
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);
    document.body.style.cursor = 'ew-resize';
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onTouch);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchend', onEnd);
      document.body.style.cursor = '';
    };
  }, [dragging]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 bg-surface select-none',
        'shadow-card-lg group',
        className,
      )}
      onMouseDown={() => setDragging(true)}
      onTouchStart={() => setDragging(true)}
      role="slider"
      aria-label={`Drag to compare ${beforeLabel} vs ${afterLabel}`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
    >
      {/* After (bottom layer) */}
      <SmartImage src={afterImage} alt={altAfter} className="absolute inset-0 h-full w-full object-cover" tint="emerald" />

      {/* Before (top layer, clipped) */}
      <div
        className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
        style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
      >
        <SmartImage src={beforeImage} alt={altBefore} className="h-full w-full object-cover" tint="rose" />
      </div>

      {/* Labels */}
      <span className="absolute left-5 top-5 z-10 rounded-full border border-rose-400/40 bg-rose-400/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-rose-100 backdrop-blur">
        {beforeLabel}
      </span>
      <span className="absolute right-5 top-5 z-10 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-100 backdrop-blur">
        {afterLabel}
      </span>

      {/* Divider + Handle */}
      <div
        className="absolute top-0 z-20 h-full w-px cursor-ew-resize bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.45)]"
        style={{ left: `${position}%` }}
      >
        <button
          type="button"
          onMouseDown={() => setDragging(true)}
          onTouchStart={() => setDragging(true)}
          aria-label="Drag to compare"
          className={cn(
            'absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full',
            'border border-white/30 bg-white/15 text-white backdrop-blur-md shadow-2xl',
            'transition-transform duration-200 ease-cinematic group-hover:scale-110',
            dragging && 'scale-110 shadow-[0_0_40px_rgba(165,138,255,0.6)]',
          )}
        >
          <div className="flex items-center text-white">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </div>
        </button>
      </div>
    </div>
  );
}

function SmartImage({
  src,
  alt,
  className,
  tint,
}: {
  src: string;
  alt: string;
  className?: string;
  tint: 'rose' | 'emerald';
}) {
  const [ok, setOk] = useState<boolean | null>(null);

  if (ok === false) {
    return (
      <div
        className={cn(
          'relative flex h-full w-full items-center justify-center bg-gradient-to-br',
          tint === 'rose'
            ? 'from-rose-500/15 via-rose-700/8 to-canvas'
            : 'from-emerald-500/15 via-sky-500/8 to-canvas',
          className,
        )}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className={cn(
              'absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl',
              tint === 'rose' ? 'bg-rose-400/20' : 'bg-emerald-400/20',
            )}
          />
        </div>
        <div className="relative z-[1] text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <ImageIcon className="h-5 w-5 text-white/60" aria-hidden="true" />
          </span>
          <p className="mt-3 px-4 font-mono text-[10px] text-white/40">{src}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      className={cn(className, ok === null && 'opacity-0')}
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
    />
  );
}
