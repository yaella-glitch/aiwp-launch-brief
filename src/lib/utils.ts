import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind-aware className combiner. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Prefix asset paths with Vite's BASE_URL so they resolve under GitHub Pages
 * project paths (e.g. /aiwp-launch-brief/). Content JSON stores paths as
 * root-relative (/foo/bar.png); this rewrites them to /<base>/foo/bar.png.
 */
export function withBase(src: string): string {
  if (!src) return src;
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  const base = import.meta.env.BASE_URL || '/';
  const clean = src.startsWith('/') ? src.slice(1) : src;
  return `${base}${clean}`;
}

/** SHA-256 hash of a string, hex-encoded. */
export async function sha256(text: string): Promise<string> {
  const buffer = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
