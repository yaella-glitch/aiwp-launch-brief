import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { PasswordGate } from '@/components/PasswordGate';
import { TopBar } from '@/components/TopBar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { LaunchDate } from '@/sections/LaunchDate';
import { BottomLine } from '@/sections/BottomLine';
import { Background } from '@/sections/Background';
import { ProductOverview } from '@/sections/ProductOverview';
import { GistStory } from '@/sections/GistStory';
import { Focus } from '@/sections/Focus';
import { Customer } from '@/sections/Customer';
import { Market } from '@/sections/Market';
import { Positioning } from '@/sections/Positioning';
import { Launch } from '@/sections/Launch';
import { Resources } from '@/sections/Resources';
import { Placeholder } from '@/sections/Placeholder';
import { manifest } from '@/content';

/** Sections after this one are hidden behind the "Read more" button. */
const READ_MORE_CUT_AFTER = 'gist-story';

function App() {
  const [audioAvailable, setAudioAvailable] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const moreAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(manifest.siteMeta.audioBriefPath, { method: 'HEAD' })
      .then((r) => {
        if (cancelled) return;
        const ct = r.headers.get('content-type') ?? '';
        setAudioAvailable(r.ok && ct.includes('audio'));
      })
      .catch(() => {
        if (!cancelled) setAudioAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function playAudio() {
    const el = document.getElementById('audio-brief') as HTMLAudioElement | null;
    if (el) void el.play();
  }

  function renderSection(id: string, order: number, title: string) {
    switch (id) {
      case 'hero':
        return <Hero />;
      case 'launch-date':
        return <LaunchDate />;
      case 'bottom-line':
        return <BottomLine />;
      case 'background':
        return <Background />;
      case 'product-overview':
        return <ProductOverview />;
      case 'gist-story':
        return <GistStory />;
      case 'focus':
        return <Focus />;
      case 'customer':
        return <Customer />;
      case 'market':
        return <Market />;
      case 'positioning':
        return <Positioning />;
      case 'launch':
        return <Launch />;
      case 'resources':
        return <Resources />;
      default:
        return (
          <Placeholder
            id={id}
            title={title}
            eyebrow={`Section · ${order.toString().padStart(2, '0')}`}
          />
        );
    }
  }

  const sections = manifest.sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  const cutIndex = sections.findIndex((s) => s.id === READ_MORE_CUT_AFTER);
  const aboveFold = cutIndex >= 0 ? sections.slice(0, cutIndex + 1) : sections;
  const belowFold = cutIndex >= 0 ? sections.slice(cutIndex + 1) : [];

  function expand() {
    setShowMore(true);
    // Smooth-scroll to where the hidden content begins.
    requestAnimationFrame(() => {
      moreAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function collapse() {
    setShowMore(false);
    // Smooth-scroll back to where the Read more button was.
    requestAnimationFrame(() => {
      moreAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  return (
    <PasswordGate>
      <TopBar audioAvailable={audioAvailable} onPlayAudio={playAudio} />

      <main className="pt-14">
        {aboveFold.map((s) => (
          <div key={s.id}>{renderSection(s.id, s.order, s.title)}</div>
        ))}

        {belowFold.length > 0 && (
          <>
            {/* Read-more button — only shown while collapsed */}
            <AnimatePresence initial={false}>
              {!showMore && (
                <motion.div
                  key="read-more-btn"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full py-16 md:py-20"
                >
                  {/* Fade overlay above the button hinting at hidden content */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-canvas to-transparent"
                  />
                  <div className="mx-auto flex max-w-[1400px] flex-col items-center px-6 md:px-10 lg:px-16">
                    <p className="mb-5 max-w-md text-center text-sm leading-relaxed text-muted">
                      The rest of the brief — who it's for, messaging, competitive,
                      launch plan, and resources — sits below.
                    </p>
                    <button
                      type="button"
                      onClick={expand}
                      className="group inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/[0.08] px-6 py-3 text-base font-semibold text-ink transition-all duration-200 hover:border-accent/70 hover:bg-accent/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                    >
                      <span>Read more</span>
                      <ChevronDown
                        aria-hidden="true"
                        className="h-4 w-4 text-accent transition-transform duration-200 group-hover:translate-y-0.5"
                      />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Anchor for smooth-scroll target */}
            <div ref={moreAnchorRef} aria-hidden="true" />

            <AnimatePresence initial={false}>
              {showMore && (
                <motion.div
                  key="below-fold"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  {belowFold.map((s) => (
                    <div key={s.id}>{renderSection(s.id, s.order, s.title)}</div>
                  ))}

                  {/* Read less — collapses the back half */}
                  <div className="w-full py-14 md:py-16">
                    <div className="mx-auto flex max-w-[1400px] justify-center px-6 md:px-10 lg:px-16">
                      <button
                        type="button"
                        onClick={collapse}
                        className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-ink/85 transition-all duration-200 hover:border-accent/40 hover:bg-accent/[0.08] hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                      >
                        <ChevronUp
                          aria-hidden="true"
                          className="h-4 w-4 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-accent"
                        />
                        <span>Read less</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        <Footer />
      </main>

      {audioAvailable && (
        <audio id="audio-brief" preload="none" src={manifest.siteMeta.audioBriefPath} />
      )}
    </PasswordGate>
  );
}

export default App;
