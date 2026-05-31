import { useEffect, useState } from 'react';
import { PasswordGate } from '@/components/PasswordGate';
import { TopBar } from '@/components/TopBar';
import { LeftRail } from '@/components/LeftRail';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { ProductOverview } from '@/sections/ProductOverview';
import { Customer } from '@/sections/Customer';
import { Market } from '@/sections/Market';
import { Positioning } from '@/sections/Positioning';
import { Launch } from '@/sections/Launch';
import { Placeholder } from '@/sections/Placeholder';
import { manifest, getRailSections } from '@/content';
import { cn } from '@/lib/utils';

function App() {
  const [presentMode, setPresentMode] = useState(manifest.siteMeta.defaults.presentMode);
  const [externalPreview, setExternalPreview] = useState(
    manifest.siteMeta.defaults.externalPreview,
  );

  const [audioAvailable, setAudioAvailable] = useState(false);
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

  const railSections = getRailSections(externalPreview);

  function playAudio() {
    const el = document.getElementById('audio-brief') as HTMLAudioElement | null;
    if (el) void el.play();
  }

  const renderedSections = manifest.sections
    .filter((s) => s.visible)
    .filter((s) => (externalPreview ? s.external !== false : true))
    .sort((a, b) => a.order - b.order);

  return (
    <PasswordGate>
      <TopBar
        presentMode={presentMode}
        externalPreview={externalPreview}
        audioAvailable={audioAvailable}
        onTogglePresent={() => setPresentMode((v) => !v)}
        onToggleExternal={() => setExternalPreview((v) => !v)}
        onPlayAudio={playAudio}
      />

      {!presentMode && <LeftRail sections={railSections} />}

      <main className={cn('pt-14', !presentMode && 'xl:pl-60')}>
        {renderedSections.map((s) => {
          switch (s.id) {
            case 'hero':
              return <Hero key={s.id} presentMode={presentMode} />;
            case 'product-overview':
              return <ProductOverview key={s.id} />;
            case 'customer':
              return <Customer key={s.id} />;
            case 'market':
              return <Market key={s.id} />;
            case 'positioning':
              return <Positioning key={s.id} />;
            case 'launch':
              return <Launch key={s.id} />;
            default:
              return (
                <Placeholder
                  key={s.id}
                  id={s.id}
                  title={s.title}
                  eyebrow={`Section · ${s.order.toString().padStart(2, '0')}`}
                />
              );
          }
        })}
        <Footer />
      </main>

      {audioAvailable && (
        <audio id="audio-brief" preload="none" src={manifest.siteMeta.audioBriefPath} />
      )}
    </PasswordGate>
  );
}

export default App;
