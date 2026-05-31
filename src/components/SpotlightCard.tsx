import { useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** rgba color of the spotlight that follows the cursor. */
  spotlightColor?: string;
  /** Radius of the spotlight in px. */
  radius?: number;
}

/**
 * Hover-following spotlight surface — pattern adapted from a Magic MCP
 * (21st.dev easemize/spotlight-card) sample.
 *
 * Used for capability cards, differentiator cards, and any "discover by
 * pointing" affordance.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(165, 138, 255, 0.10)',
  radius = 360,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]',
        'transition-colors duration-300 hover:border-white/15',
        className,
      )}
    >
      {/* Spotlight layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 60%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
