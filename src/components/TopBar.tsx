import { Headphones } from 'lucide-react';

interface TopBarProps {
  audioAvailable: boolean;
  onPlayAudio: () => void;
}

/**
 * Slim sticky top bar. Just wordmark + audio brief button.
 * Present mode and External preview toggles removed per request.
 */
export function TopBar({ audioAvailable, onPlayAudio }: TopBarProps) {
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
        <span className="text-muted">Launch Brief</span>
      </a>

      <div className="flex items-center gap-2">
        {audioAvailable && (
          <button
            type="button"
            onClick={onPlayAudio}
            aria-label="Play audio brief"
            title="Play audio brief"
            className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-muted transition-colors duration-200 hover:bg-white/10 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <Headphones className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Listen</span>
          </button>
        )}
      </div>
    </header>
  );
}
