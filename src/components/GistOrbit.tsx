import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Bot,
  MessageSquare,
  LayoutGrid,
  Workflow,
  ShieldCheck,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn, withBase } from '@/lib/utils';
import type { GistOrbitNode } from '@/types';

/**
 * GistOrbit — visual centerpiece of the Background section.
 *
 * Behavior (matches 21st.dev radial-orbital-timeline):
 *  - Orbit AUTO-ROTATES (via requestAnimationFrame, so motion is smooth at
 *    60fps without CSS transitions fighting each new tick).
 *  - Click a node → rotation pauses, the orbit snaps that node to the top,
 *    and a compact card appears directly below it (with a connector tick).
 *  - Click the X, the same node again, or the empty stage → reset.
 *
 * Center: bold rounded-rect anchor for "Humans + Agents" with an
 * overlapping avatar cluster. Fades while a card is open.
 */

interface GistOrbitProps {
  center: { title: string; tagline: string };
  nodes: GistOrbitNode[];
}

const iconByNodeId: Record<string, LucideIcon> = {
  agents: Bot,
  communication: MessageSquare,
  workspace: LayoutGrid,
  workflows: Workflow,
  governance: ShieldCheck,
};

/** 6 mixed avatars (humans + stylized agents). */
const CENTER_AVATARS = [
  '/center/avatar-1.avif',
  '/center/avatar-2.avif',
  '/center/avatar-3.avif',
  '/center/avatar-4.avif',
  '/center/avatar-9.avif',
  '/center/avatar-10.avif',
];

const RADIUS = 250; // px — orbit radius (more breathing room around the plate)
const STAGE = 700;  // px — square stage height

export function GistOrbit({ center, nodes }: GistOrbitProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const reduce = useReducedMotion();

  const autoRotate = activeId === null;

  // Smooth 60fps auto-rotation via requestAnimationFrame.
  useEffect(() => {
    if (!autoRotate || reduce) return;
    let frame = 0;
    const tick = () => {
      setRotation((r) => (r + 0.08) % 360); // ~5°/sec → 1 rev / 72 sec
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoRotate, reduce]);

  // Clean up the snap-transition flag after the animation finishes.
  useEffect(() => {
    if (!isSnapping) return;
    const id = window.setTimeout(() => setIsSnapping(false), 750);
    return () => window.clearTimeout(id);
  }, [isSnapping]);

  function selectNode(id: string) {
    if (activeId === id) {
      setActiveId(null);
      return;
    }
    const idx = nodes.findIndex((n) => n.id === id);
    if (idx < 0) return;
    setIsSnapping(true);
    const targetRotation = -(idx / nodes.length) * 360;
    setRotation(targetRotation);
    setActiveId(id);
  }

  function closeActive() {
    setActiveId(null);
  }

  return (
    <div className="relative w-full">
      {/* --- Desktop: orbit --- */}
      <div
        className="relative mx-auto hidden w-full max-w-[820px] md:block"
        style={{ height: STAGE }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeActive();
        }}
      >
        {/* Soft radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_center,rgba(165,138,255,0.14),transparent_60%)]"
        />

        {/* Orbit ring */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{
            width: RADIUS * 2,
            height: RADIUS * 2,
            marginLeft: -RADIUS,
            marginTop: -RADIUS,
          }}
        >
          <div className="h-full w-full rounded-full border border-white/15" />
          <div className="absolute inset-2 rounded-full border border-white/[0.05]" />
        </motion.div>

        {/* Connector lines from center to each node */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {nodes.map((_, i) => {
            const { x, y } = nodePosition(i, nodes.length, rotation);
            return (
              <line
                key={i}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${x}px)`}
                y2={`calc(50% + ${y}px)`}
                stroke="rgba(165,138,255,0.3)"
                strokeWidth={1.25}
                strokeDasharray="4 6"
              />
            );
          })}
        </svg>

        {/* Center plate — fades when a node is active */}
        <div
          className={cn(
            'pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500',
            activeId ? 'opacity-25' : 'opacity-100',
          )}
        >
          <CenterPlate title={center.title} tagline={center.tagline} reduce={!!reduce} />
        </div>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const { x, y } = nodePosition(i, nodes.length, rotation);
          const Icon = iconByNodeId[node.id] ?? Bot;
          const isActive = activeId === node.id;

          return (
            <div
              key={node.id}
              className={cn(
                'absolute left-1/2 top-1/2',
                isSnapping && !reduce && 'transition-transform duration-700 ease-out',
                isActive ? 'z-40' : 'z-10',
              )}
              style={{
                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  selectNode(node.id);
                }}
                aria-pressed={isActive}
                aria-label={`${node.title} — click to read more`}
                className={cn(
                  'group relative flex flex-col items-center gap-2 outline-none',
                  'rounded-2xl focus-visible:ring-2 focus-visible:ring-accent/60',
                )}
              >
                <span
                  className={cn(
                    'relative grid h-14 w-14 place-items-center rounded-2xl border transition-all duration-300',
                    isActive
                      ? 'scale-110 border-accent/70 bg-accent/20 shadow-[0_0_40px_-8px_rgba(165,138,255,0.7)]'
                      : 'border-white/15 bg-canvas/80 backdrop-blur group-hover:border-accent/40 group-hover:bg-accent/10',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-6 w-6 transition-colors',
                      isActive ? 'text-accent' : 'text-ink/85 group-hover:text-accent',
                    )}
                    aria-hidden="true"
                  />
                  {isActive && (
                    <motion.span
                      aria-hidden="true"
                      initial={{ scale: 0.9, opacity: 0.6 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-2xl border border-accent/40"
                    />
                  )}
                </span>
                <span
                  className={cn(
                    'whitespace-nowrap font-display text-sm font-semibold transition-colors',
                    isActive ? 'text-ink' : 'text-ink/80 group-hover:text-ink',
                  )}
                >
                  {node.title}
                </span>
              </button>

              {/* Compact detail card — appears below the active (top) node.
                  Positioning lives on the outer div; the inner motion.div only
                  handles opacity/y so it doesn't stomp on the centering
                  translate. */}
              {isActive && (
                <div className="absolute left-1/2 top-full mt-5 w-80 -translate-x-1/2">
                  {/* Connector line from node down to the card */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-5 left-1/2 h-5 w-[2px] -translate-x-1/2 bg-gradient-to-b from-accent to-accent/40"
                  />
                  <motion.div
                    initial={reduce ? undefined : { opacity: 0, y: -8 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CompactCard node={node} onClose={closeActive} />
                  </motion.div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* --- Mobile: stacked card grid --- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
        <div className="relative col-span-full overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/15 via-canvas to-canvas p-7">
          <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_20%,rgba(165,138,255,0.18),transparent_60%)]" />
          <div className="relative">
            <div className="mb-5 flex -space-x-2">
              {CENTER_AVATARS.map((src) => (
                <span
                  key={src}
                  className="relative inline-block h-10 w-10 overflow-hidden rounded-full border-2 border-canvas/95 bg-canvas shadow-md ring-1 ring-white/10"
                >
                  <img src={withBase(src)} alt="" className="h-full w-full object-cover" draggable={false} />
                </span>
              ))}
            </div>
            <h3 className="font-display text-2xl font-bold text-ink">{center.title}</h3>
            <p className="mt-3 text-sm text-muted">{center.tagline}</p>
          </div>
        </div>
        {nodes.map((node) => {
          const Icon = iconByNodeId[node.id] ?? Bot;
          return (
            <div key={node.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-canvas/80">
                <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
              </span>
              <h4 className="mt-4 font-display text-base font-semibold text-ink">{node.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{node.summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{node.detail}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function nodePosition(index: number, total: number, rotationDeg: number) {
  const angleDeg = -90 + (index / total) * 360 + rotationDeg;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    x: RADIUS * Math.cos(angleRad),
    y: RADIUS * Math.sin(angleRad),
  };
}

function CenterPlate({
  title,
  tagline,
  reduce,
}: {
  title: string;
  tagline: string;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0 }}
      whileInView={reduce ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="relative">
        {/* Pulse halo */}
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 1.35 }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 -m-2 rounded-[22px] border border-accent/40"
        />

        {/* Tighter plate — narrower padding, smaller title, smaller avatars */}
        <div className="relative grid place-items-center rounded-[22px] border border-accent/40 bg-gradient-to-br from-accent/25 via-accent/15 to-transparent px-7 py-5 backdrop-blur shadow-[0_0_60px_-12px_rgba(165,138,255,0.55)]">
          <div className="text-center">
            {/* Uniform avatar cluster — all same size for compact width */}
            <div className="mb-3 flex items-center justify-center -space-x-2">
              {CENTER_AVATARS.map((src) => (
                <span
                  key={src}
                  className="relative inline-block h-9 w-9 overflow-hidden rounded-full border-2 border-canvas/95 bg-canvas shadow-md ring-1 ring-white/10"
                >
                  <img src={withBase(src)} alt="" className="h-full w-full object-cover" draggable={false} />
                </span>
              ))}
            </div>
            <h3 className="font-display text-[clamp(20px,2.2vw,28px)] font-bold leading-[1.05] tracking-tight text-ink">
              {title}
            </h3>
            <p className="mx-auto mt-1.5 max-w-[14rem] text-[11px] leading-snug text-muted/85">{tagline}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CompactCard({ node, onClose }: { node: GistOrbitNode; onClose: () => void }) {
  return (
    <div className="relative rounded-2xl border border-accent/40 bg-canvas/95 p-5 shadow-card-lg backdrop-blur">
      <div className="absolute inset-0 rounded-2xl [background:radial-gradient(circle_at_30%_0%,rgba(165,138,255,0.16),transparent_55%)]" />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-canvas/80 text-ink/80 transition-colors hover:border-accent/60 hover:bg-accent/15 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="relative">
        <h4 className="font-display text-base font-semibold leading-tight text-ink">
          {node.title}
        </h4>
        <p className="mt-1.5 text-xs font-medium text-accent/90">{node.summary}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink/85">{node.detail}</p>
      </div>
    </div>
  );
}
