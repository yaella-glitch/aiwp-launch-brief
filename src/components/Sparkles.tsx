import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SparklesProps {
  className?: string;
  /** Number of sparkles. */
  count?: number;
  /** Hex / rgba color of sparkles. */
  color?: string;
  /** Min / max radius in px. */
  minRadius?: number;
  maxRadius?: number;
  /** Twinkle speed multiplier. */
  speed?: number;
}

/**
 * Lightweight canvas-based sparkles overlay. ~50 lines, no deps.
 * Each sparkle twinkles independently (random opacity over time).
 * Respects prefers-reduced-motion.
 */
export function Sparkles({
  className,
  count = 80,
  color = 'rgba(255, 255, 255, 0.9)',
  minRadius = 0.4,
  maxRadius = 1.4,
  speed = 1,
}: SparklesProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let disposed = false;

    type Star = { x: number; y: number; r: number; phase: number; freq: number };
    let stars: Star[] = [];

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: (minRadius + Math.random() * (maxRadius - minRadius)) * dpr,
        phase: Math.random() * Math.PI * 2,
        freq: 0.4 + Math.random() * 1.2,
      }));
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (disposed || !ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = reduce ? 0 : (performance.now() / 1000) * speed;
      for (const s of stars) {
        const alpha = reduce ? 0.5 : 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * s.freq + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/rgba?\(([^,]+),([^,]+),([^,]+)[^)]*\)/, (_m, r, g, b) => `rgba(${r},${g},${b},${alpha})`);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count, color, minRadius, maxRadius, speed]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  );
}
