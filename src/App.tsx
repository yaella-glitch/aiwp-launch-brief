import { useEffect, useState } from 'react';
import { PasswordGate } from '@/components/PasswordGate';
import { TopBar } from '@/components/TopBar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Background } from '@/sections/Background';
import { ProductOverview } from '@/sections/ProductOverview';
import { Customer } from '@/sections/Customer';
import { Market } from '@/sections/Market';
import { Positioning } from '@/sections/Positioning';
import { Launch } from '@/sections/Launch';
import { Placeholder } from '@/sections/Placeholder';
import { manifest } from '@/content';

function App() {
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

  function playAudio() {
    const el = document.getElementById('audio-brief') as HTMLAudioElement | null;
    if (el) void el.play();
  }

  const renderedSections = manifest.sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <PasswordGate>
      <TopBar
        audioAvailable={audioAvailable}
        onPlayAudio={playAudio}
      />

      <main className="pt-14">
        {renderedSections.map((s) => {
          switch (s.id) {
            case 'hero':
              return <Hero key={s.id} />;
            case 'background':
              return <Background key={s.id} />;
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
