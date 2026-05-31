import { manifest } from '@/content';

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-3 px-6 text-sm text-muted md:flex-row md:items-center md:px-10 lg:px-20">
        <p>
          <span className="text-ink/80">monday · AI Work Platform · Launch Brief</span>{' '}
          · v{manifest.siteMeta.version}
        </p>
        <p>
          Updated {manifest.siteMeta.lastUpdated} · Launch lead: {manifest.siteMeta.launchLead}
        </p>
      </div>
    </footer>
  );
}
