# AIWP Milestone 2 Launch Brief — Project Handoff

## What this is

Internal launch brief website for monday.com's **AI Work Platform — Milestone 2**. Used as a presentation deck during a 30-min kickoff and as an offline-shareable URL after. Password-protected, intended for marketing/PMM/product/enablement leadership.

**Launch date:** July 1, 2026

## Live site & repo

- 🌐 https://yaella-glitch.github.io/aiwp-launch-brief/
- 🔐 Password: `AIWPmilestone2`
- 📦 GitHub: https://github.com/yaella-glitch/aiwp-launch-brief
- 📂 Local: `/Users/yaella/AI work launch Jul 1/aiwp-launch-brief`

Every push to `main` auto-deploys via `.github/workflows/deploy.yml` (~90s).

## Stack

- **Vite + React 19 + TypeScript + TailwindCSS**
- **framer-motion** for animation
- **lucide-react** for icons
- **Font:** Figtree (monday's brand font, Google Fonts)
- **Theme:** dark canvas (`rgb(6,6,14)`) + violet accent (`rgb(165,138,255)`)
- **No backend** — content is JSON files imported at build time

## Site structure

7 sections, top to bottom:

1. **Hero** — Aceternity Sparkles "Acme" pattern: centered kinetic headline + glowing beam of drifting sparkles
2. **Background** — title + paragraphs + small HighlightText accent
3. **What we're launching?** — monday-style top tabs (5 domains) + horizontal carousel of capability cards
4. **Who it's for** — persona grid (primary spans 2 cols) + draggable image-comparison sliders for pains & solutions
5. **Market & competitive** — market context + 2×2 quadrant + 4 spotlight differentiator cards
6. **Launch positioning & messaging** — vision statement w/ HighlightText, image accordion for external emphasis, Say/Don't-say grid
7. **Launch plan** — date (huge gradient), 2 goal cards, assets+owners table, expectations card, out-of-scope footer

## Where content lives

All in `/content/*.json`. Schema is typed in `/src/types.ts`.

| File | Section |
|---|---|
| `manifest.json` | Section order, site meta, launch date |
| `hero.json` | Hero copy |
| `background.json` | Background section |
| `productOverview.json` | What we're launching (5 tabs with nested cards) |
| `customer.json` | Personas + pains & solutions |
| `market.json` | Market context, quadrant competitors, differentiators |
| `positioning.json` | Vision, emphasis, Say/Don't-say |
| `launch.json` | Launch date, goals, assets, owners, expectations, out-of-scope |

## Images & video

Drop files into `/public/...`. Components auto-swap from placeholder to real media when files exist.

| Where | Folder |
|---|---|
| Persona photos | `/public/personas/persona-1.png` … `-3.png` |
| Customer before/after | `/public/customer/before-collab.png`, `after-collab.png`, etc. |
| Capability cards | `/public/product/<tab-id>/<card-id>.png` (e.g. `/public/product/human-agents/container.png`) |
| Use case images | `/public/usecases/uc-1.png` … `-3.png` |
| Emphasis panels | `/public/emphasis/emphasis-1.png` … `-3.png` |
| Owner avatars | `/public/owners/owner-1.png` … `-5.png` |
| Product demo video | `/public/video/product-demo.mp4` |
| Audio brief (NotebookLM) | `/public/audio/brief.mp3` |

## Components (key ones)

- `CapabilityTabs.tsx` — monday-style tab nav + horizontal card carousel with arrow buttons and snap scroll
- `EmphasisAccordion.tsx` — interactive image accordion (hover to expand)
- `ImageCompare.tsx` — draggable before/after slider
- `HighlightText.tsx` — animated marker bar that paints across a key phrase on scroll
- `KineticHeadline.tsx` — word-by-word blur+y reveal for hero
- `Sparkles.tsx` — lightweight canvas-based twinkling drifting particles
- `EditorialHeader.tsx` — standard section header (title + lede, no eyebrow)
- `SpotlightCard.tsx` — hover-following violet glow card
- `FlipCard.tsx` — 3D card flip for use cases
- `PasswordGate.tsx` — client-side SHA-256 password gate

## Design system

- **One-font system:** Figtree everywhere (display + body)
- **Two title sizes:**
  - Top-level section title (`EditorialHeader`): `clamp(36px, 5.5vw, 72px)` font-bold
  - Sub-section title: `clamp(28px, 4vw, 44px)` font-semibold
- **No eyebrows** — every section/sub-section is title + description only
- **Section vertical padding:** `py-20 md:py-24 lg:py-28`
- **Internal spacers:** `mt-24` between major sub-blocks
- **Container:** `mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16` (uniform across all sections)
- **Reading column:** `max-w-3xl` for header text inside the 1400px container
- **Accent color** used sparingly — reserved for emphasis, hover states, the violet glow on primary

## How the user (Yaella) likes to work

- **Tells copy in plain English**, Claude commits to JSON files and pushes
- **No JSON/code editing herself** — wants visual edits or assistant-mediated
- **Direct, opinionated design decisions** — doesn't want to be asked to pick between options unless necessary
- Cares about: **less is more, consistency, "designer-feel" not AI-feel, monday.com brand alignment, accessibility, motion**
- Strongly dislikes: small uppercase eyebrows, "PART X" labels, inconsistent title sizes, excessive empty space, anything that feels SaaS-generic or AI-generated

## Open items / next steps

- Real content for most fields (currently placeholder copy in many sections)
- Persona photos, capability screenshots, customer before/after images, owner avatars, product demo video, NotebookLM audio brief
- Consider TinaCMS-style in-place visual editor for **next** project (Yaella explicitly noted current GitHub.com editing flow is uncomfortable)

## Recent decisions worth remembering

- Removed: Present mode toggle, External preview toggle, left rail navigation (all from top bar / chrome)
- Hero pattern locked in: Aceternity Sparkles ("Acme" variant). Earlier iterations tried: WebGL mesh, container scroll, elegant shapes, scroll-expand — all rejected for being "too much" or hard to read
- Background section content alignment was the last bug fixed (was using narrow `max-w-3xl` outer container, now uses `max-w-[1400px]` like everything else)
