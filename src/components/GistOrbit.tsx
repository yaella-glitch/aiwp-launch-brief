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
import { cn, withBase } from '@/lib/utils';
import type { GistOrbitNode } from '@/types';

/** 6 mixed avatars (humans + stylized agents) shown inside the center plate. */
const CENTER_AVATARS = [
  '/center/avatar-1.avif',
  '/center/avatar-2.avif',
  '/center/avatar-3.avif',
  '/center/avatar-4.avif',
  '/center/avatar-9.avif',
  '/center/avatar-10.avif',
];

/**
 * GistOrbit — the visual centerpiece of the Background section.
 *
 * Center: a bold rounded-rect (NOT a circle) anchoring "Humans + Agents".
 * Orbit: 5 nodes evenly spaced around a violet ring. Each clickable, opening
 * a detail card below the visual.
 *
 * Implementation note: layout (positioning) is done with a static wrapper div
 * so framer-motion's transform-based animations (scale/x/y) don't stomp on
 * placement. Each orbit node is `position: absolute` with left/top set by
 * trigonometry, and the inner motion.button only animates opacity + scale.
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
const STAGE = 640; // px — square stage height; width scales to container

export function GistOrbit({ center, nodes }: GistOrbitProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const activeNode = nodes.find((n) => n.id === activeId);

  return (
    <div className="relative w-full">
      {/* --- Desktop: orbit --- */}
      <div
        className="relative mx-auto hidden w-full max-w-[760px] md:block"
        style={{ height: STAGE }}
      >
        {/* Soft radial glow behind the system */}
        <div
          aria-hidden="true"
          className="absolute inset-0 [background:radial-gradient(circle_at_center,rgba(165,138,255,0.14),transparent_60%)]"
        />

        {/* Orbit ring (static positioning, opacity-only animation) */}
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
          <div className="h-full w-full rounded-full border border-white/12" />
          <div className="absolute inset-2 rounded-full border border-white/[0.05]" />
        </motion.div>

        {/* Connector lines from center to each node */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {nodes.map((_, i) => {
            const { x, y } = nodePosition(i, nodes.length);
            return (
              <line
                key={i}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${x}px)`}
                y2={`calc(50% + ${y}px)`}
                stroke="rgba(165,138,255,0.18)"
                strokeWidth={1}
                strokeDasharray="3 5"
              />
            );
          })}
        </svg>

        {/* Center plate — positioned by wrapper, animated inside */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <CenterPlate title={center.title} tagline={center.tagline} reduce={!!reduce} />
        </div>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const { x, y } = nodePosition(i, nodes.length);
          const Icon = iconByNodeId[node.id] ?? Bot;
          const isActive = activeId === node.id;

          return (
            <div
              key={node.id}
              className="absolute z-10"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.button
                type="button"
                onClick={() => setActiveId(isActive ? null : node.id)}
                initial={reduce ? undefined : { opacity: 0, scale: 0.6 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.55,
                  delay: 0.3 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
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
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Active node card — desktop only, below the orbit */}
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
      initial={reduce ? undefined : { opacity: 0 }}
      whileInView={reduce ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto relative"
    >
      <div className="relative">
        {/* Pulse halo — uses scale + opacity but on a self-contained absolute child */}
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 1.35 }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 -m-2 rounded-[28px] border border-accent/40"
        />

        <div className="relative grid place-items-center rounded-[28px] border border-accent/40 bg-gradient-to-br from-accent/25 via-accent/15 to-transparent px-10 py-7 backdrop-blur shadow-[0_0_60px_-12px_rgba(165,138,255,0.55)]">
          <div className="text-center">
            {/* Overlapping avatar cluster — center 2 are larger for hierarchy */}
            <div className="mb-4 flex items-center justify-center -space-x-2">
              {CENTER_AVATARS.map((src, i) => {
                // Center 2 nudge larger; outer ones smaller.
                const isCenter = i === 2 || i === 3;
                const isFlank = i === 1 || i === 4;
                return (
                  <span
                    key={src}
                    className={cn(
                      'relative inline-block overflow-hidden rounded-full border-2 border-canvas/95 bg-canvas shadow-lg ring-1 ring-white/10',
                      isCenter ? 'h-14 w-14 z-10' : isFlank ? 'h-11 w-11' : 'h-9 w-9 opacity-90',
                    )}
                  >
                    <img
                      src={withBase(src)}
                      alt=""
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </span>
                );
              })}
            </div>
            <h3 className="font-display text-[clamp(26px,2.8vw,36px)] font-bold leading-[1.05] tracking-tight text-ink">
              {title}
            </h3>
            <p className="mt-2 max-w-[16rem] text-xs leading-snug text-muted/90">{tagline}</p>
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
