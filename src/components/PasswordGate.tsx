import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';
import { sha256 } from '@/lib/utils';
import { CardGradient } from './CardGradient';

const STORAGE_KEY = 'aiwp.gate.unlocked';
// SHA-256("AIWPmilestone2")
const EXPECTED_HASH = '6fae65a0a3763debcccec792ab5b1dda85ab30eb9661b8ee4c36d33ae2dc2891';

interface PasswordGateProps {
  children: ReactNode;
}

/**
 * Client-side password gate. NOT real security — adds friction so accidental
 * shares stay private. The hash check is enough for an internal-unlisted URL.
 */
export function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (unlocked) {
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
    }
  }, [unlocked]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const hash = await sha256(pwd);
    setBusy(false);
    if (hash === EXPECTED_HASH) {
      setUnlocked(true);
    } else {
      setError(true);
      setPwd('');
    }
  }

  return (
    <>
      <AnimatePresence>
        {!unlocked && (
          <motion.div
            key="gate"
            className="fixed inset-0 z-50 flex items-center justify-center bg-canvas px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 -z-10 opacity-60">
              {/* Ambient gradient bloom on the gate itself */}
              <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-[120px]" />
            </div>
            <CardGradient className="w-full max-w-md" padded>
              <div className="flex flex-col items-start gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/40">
                  <Lock className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-eyebrow uppercase text-accent">Internal · monday</p>
                  <h1 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
                    AI Work Platform — Milestone 2
                  </h1>
                  <p className="mt-4 text-base text-muted">
                    This launch brief is internal. Enter the password to continue.
                  </p>
                </div>
                <form onSubmit={onSubmit} className="w-full">
                  <label className="block">
                    <span className="sr-only">Password</span>
                    <input
                      type="password"
                      autoFocus
                      value={pwd}
                      onChange={(e) => {
                        setPwd(e.target.value);
                        setError(false);
                      }}
                      placeholder="Password"
                      aria-invalid={error}
                      aria-describedby={error ? 'gate-error' : undefined}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-base text-ink placeholder:text-muted/60 transition-colors duration-200 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                  </label>
                  {error && (
                    <p id="gate-error" className="mt-3 text-sm text-rose-300">
                      That's not it — try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={busy || !pwd}
                    className="mt-5 w-full cursor-pointer rounded-lg bg-accent px-4 py-3 text-base font-medium text-canvas transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {busy ? 'Checking…' : 'Enter'}
                  </button>
                </form>
              </div>
            </CardGradient>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Render children behind the gate so layout calculates correctly */}
      <div aria-hidden={!unlocked} style={{ visibility: unlocked ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </>
  );
}
