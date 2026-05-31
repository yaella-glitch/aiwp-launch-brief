import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SparklesProps {
  className?: string;
  count?: number;
  /** rgb string for sparkles, e.g. "255,255,255". */
  rgb?: string;
  minRadius?: number;
  maxRadius?: number;
  /** Twinkle speed multiplier. */
  speed?: number;
}

/**
 * Lightweight canvas-based sparkles overlay — no deps.
 * Each particle twinkles independently and is randomly placed.
 * Respects prefers-reduced-motion (static fallback).
 */
export function Sparkles({
  className,
  count = 110,
  rgb = '255,255,255',
  minRadius = 0.3,
  maxRadius = 1.5,
  speed = 0.9,
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
    let lastT = performance.now();
    let disposed = false;
    type Star = {
      x: number;
      y: number;
      r: number;
      phase: number;
      freq: number;
      /** velocity in px/sec (DPR-scaled). */
      vx: number;
      vy: number;
    };
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
        // Mostly horizontal drift left↔right, gentle vertical flutter.
        vx: (Math.random() - 0.5) * 24 * dpr,
        vy: (Math.random() - 0.5) * 8 * dpr,
      }));
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function draw() {
      if (disposed || !ctx || !canvas) return;
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastT) / 1000); // clamp dt for safety
      lastT = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = reduce ? 0 : (now / 1000) * speed;

      for (const s of stars) {
        if (!reduce) {
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          // Wrap horizontally + vertically so the band stays populated.
          if (s.x < -2) s.x = canvas.width + 2;
          else if (s.x > canvas.width + 2) s.x = -2;
          if (s.y < -2) s.y = canvas.height + 2;
          else if (s.y > canvas.height + 2) s.y = -2;
        }
        const alpha = reduce ? 0.55 : 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(t * s.freq + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${alpha})`;
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
  }, [count, rgb, minRadius, maxRadius, speed]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  );
}
