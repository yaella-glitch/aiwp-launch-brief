import { Headphones, Presentation, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopBarProps {
  presentMode: boolean;
  externalPreview: boolean;
  audioAvailable: boolean;
  onTogglePresent: () => void;
  onToggleExternal: () => void;
  onPlayAudio: () => void;
}

/**
 * Slim sticky top bar. Holds the wordmark + three controls:
 *  - Listen (NotebookLM audio brief, hidden if missing)
 *  - Present mode (hide rail, scale type for live meetings)
 *  - External preview (hide internal-only sections)
 */
export function TopBar({
  presentMode,
  externalPreview,
  audioAvailable,
  onTogglePresent,
  onToggleExternal,
  onPlayAudio,
}: TopBarProps) {
  return (
    <header
      className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-between border-b border-white/5 bg-canvas/80 px-4 backdrop-blur md:px-8"
      role="banner"
    >
      <a
        href="#hero"
        className="group flex items-center gap-3 text-sm font-medium text-ink"
        aria-label="Jump to top"
      >
        <span
          className="inline-block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_rgba(165,138,255,0.7)]"
          aria-hidden="true"
        />
        <span className="hidden sm:inline">monday</span>
        <span className="hidden text-muted sm:inline">·</span>
        <span className="hidden text-muted md:inline">AI Work Platform</span>
        <span className="hidden text-muted md:inline">·</span>
        <span className="text-muted">Launch Brief</span>
      </a>

      <div className="flex items-center gap-1.5 md:gap-2">
        {audioAvailable && (
          <Toggle
            icon={<Headphones className="h-4 w-4" aria-hidden="true" />}
            label="Listen"
            ariaLabel="Play audio brief"
            onClick={onPlayAudio}
          />
        )}
        <Toggle
          icon={<Presentation className="h-4 w-4" aria-hidden="true" />}
          label="Present"
          ariaLabel="Toggle present mode"
          active={presentMode}
          onClick={onTogglePresent}
        />
        <Toggle
          icon={
            externalPreview ? (
              <Eye className="h-4 w-4" aria-hidden="true" />
            ) : (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            )
          }
          label={externalPreview ? 'External' : 'Internal'}
          ariaLabel={
            externalPreview
              ? 'External preview ON — internal content hidden. Click to show internal.'
              : 'Internal mode — showing internal-only content. Click to hide.'
          }
          active={externalPreview}
          onClick={onToggleExternal}
        />
      </div>
    </header>
  );
}

interface ToggleProps {
  icon: React.ReactNode;
  label: string;
  ariaLabel: string;
  active?: boolean;
  onClick: () => void;
}

function Toggle({ icon, label, ariaLabel, active, onClick }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      title={ariaLabel}
      className={cn(
        'inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors duration-200',
        'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
        active
          ? 'border-accent/50 bg-accent/15 text-ink'
          : 'border-white/10 bg-white/5 text-muted hover:bg-white/10 hover:text-ink',
      )}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
