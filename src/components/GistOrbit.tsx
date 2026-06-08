import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Bot,
  MessageSquare,
  LayoutGrid,
  Workflow,
  ShieldCheck,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GistOrbitNode } from '@/types';

/**
 * GistOrbit — the visual centerpiece of the Background section.
 *
 * Center: a bold rounded-rect (NOT a circle) anchoring "Humans + Agents".
 * Orbit: 5 nodes evenly spaced around a violet ring. Each clickable, opening
 * a detail card below the visual.
 *
 * Static positions (no auto-rotation) — this is a brief, not a product UI.
 * Mobile fallback: simple stacked grid of cards (orbit doesn't work small).
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

const RADIUS = 220; // px — orbit radius for the 5 nodes

export function GistOrbit({ center, nodes }: GistOrbitProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const activeNode = nodes.find((n) => n.id === activeId);

  return (
    <div className="relative w-full">
      {/* --- Desktop: orbit --- */}
      <div className="relative mx-auto hidden h-[640px] w-full max-w-[760px] md:block">
        {/* Soft radial glow behind the system */}
        <div
          aria-hidden="true"
          className="absolute inset-0 [background:radial-gradient(circle_at_center,rgba(165,138,255,0.14),transparent_60%)]"
        />

        {/* Center: Humans + Agents (rounded-rect, not a circle) */}
        <CenterPlate title={center.title} tagline={center.tagline} reduce={!!reduce} />

        {/* Orbit ring */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{
            width: RADIUS * 2,
            height: RADIUS * 2,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="h-full w-full rounded-full border border-white/12" />
          <div className="absolute inset-2 rounded-full border border-white/[0.05]" />
        </motion.div>

        {/* Orbiting connector lines from center to each node */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 760 640"
          preserveAspectRatio="xMidYMid meet"
        >
          {nodes.map((_, i) => {
            const { x, y } = nodePosition(i, nodes.length);
            return (
              <line
                key={i}
                x1={380}
                y1={320}
                x2={380 + x}
                y2={320 + y}
                stroke="rgba(165,138,255,0.18)"
                strokeWidth={1}
                strokeDasharray="3 5"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const { x, y } = nodePosition(i, nodes.length);
          const Icon = iconByNodeId[node.id] ?? Bot;
          const isActive = activeId === node.id;

          return (
            <motion.button
              key={node.id}
              type="button"
              onClick={() => setActiveId(isActive ? null : node.id)}
              initial={reduce ? undefined : { opacity: 0, scale: 0.6 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: 0.35 + i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 outline-none"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              aria-pressed={isActive}
              aria-label={`${node.title} — click to read more`}
            >
              <div
                className={cn(
                  'relative flex flex-col items-center gap-2 transition-all duration-300',
                  'focus-visible:ring-2 focus-visible:ring-accent/60 rounded-2xl',
                )}
              >
                <span
                  className={cn(
                    'relative grid h-14 w-14 place-items-center rounded-2xl border transition-all duration-300',
                    isActive
                      ? 'border-accent/70 bg-accent/20 shadow-[0_0_40px_-8px_rgba(165,138,255,0.7)] scale-110'
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
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Active node card — desktop only, sits below the orbit */}
      <AnimatePresence mode="wait">
        {activeNode && (
          <motion.div
            key={activeNode.id}
            initial={reduce ? undefined : { opacity: 0, y: 14 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 14 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto -mt-4 hidden max-w-2xl md:block"
          >
            <NodeCard node={activeNode} onClose={() => setActiveId(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Mobile: stacked card grid --- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
        <div className="relative col-span-full overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/15 via-canvas to-canvas p-7">
          <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_20%,rgba(165,138,255,0.18),transparent_60%)]" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted/70">At the core</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-ink">{center.title}</h3>
            <p className="mt-3 text-sm text-muted">{center.tagline}</p>
          </div>
        </div>
        {nodes.map((node) => {
          const Icon = iconByNodeId[node.id] ?? Bot;
          return (
            <div
              key={node.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
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

function nodePosition(index: number, total: number) {
  // Start at top (-90deg), distribute evenly clockwise.
  const angleDeg = -90 + (index / total) * 360;
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
      initial={reduce ? undefined : { opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="relative">
        {/* Pulse halo */}
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 1.35 }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 -m-2 rounded-[28px] border border-accent/40"
        />

        <div className="relative grid place-items-center rounded-[28px] border border-accent/40 bg-gradient-to-br from-accent/25 via-accent/15 to-transparent px-10 py-7 backdrop-blur shadow-[0_0_60px_-12px_rgba(165,138,255,0.55)]">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent/90">At the core</p>
            <h3 className="mt-2 font-display text-[clamp(28px,3vw,40px)] font-bold leading-[1.05] tracking-tight text-ink">
              {title}
            </h3>
            <p className="mt-2 max-w-[14rem] text-xs leading-snug text-muted/90">{tagline}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NodeCard({ node, onClose }: { node: GistOrbitNode; onClose: () => void }) {
  return (
    <div className="relative rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/12 via-canvas to-canvas p-7 shadow-card-lg">
      <div className="absolute inset-0 rounded-3xl [background:radial-gradient(circle_at_30%_0%,rgba(165,138,255,0.18),transparent_55%)]" />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-canvas/60 text-muted transition-colors hover:bg-canvas/90 hover:text-ink"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="relative">
        <h4 className="font-display text-2xl font-semibold text-ink">{node.title}</h4>
        <p className="mt-2 text-sm font-medium text-accent/90">{node.summary}</p>
        <p className="mt-4 text-base leading-relaxed text-ink/85">{node.detail}</p>
      </div>
    </div>
  );
}
