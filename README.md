# AI Work Platform — Milestone 2 Launch Brief

Internal launch brief for monday.com's AI work platform — Milestone 2.

🔗 **Live URL:** https://yaella-glitch.github.io/aiwp-launch-brief/
🔐 **Password:** `AIWPmilestone2`
📅 **Launch date:** July 1, 2026

## Editing content

All copy, images and lists live in `/content/*.json` — one file per section. Edit them and push to `main`; GitHub Actions rebuilds and redeploys automatically.

| File | What it controls |
|---|---|
| `content/manifest.json` | Section order, visibility, site meta (launch date, version) |
| `content/hero.json` | Hero copy |
| `content/howItComesTogether.json` | Weave-style aspect collage |
| `content/productOverview.json` | Part 1 — capabilities, demo, vision parts, use cases |
| `content/customer.json` | Part 2 — personas + before/after slider |
| `content/market.json` | Part 3 — market context, quadrant, differentiators |
| `content/positioning.json` | Part 4 — vision support, emphasis, say/don't-say |
| `content/launch.json` | Part 5 — goals, marketing scope, assets, expectations |

## Adding images

Drop files into the corresponding folder under `public/`:

| Image kind | Folder |
|---|---|
| Hero | `/public/hero/hero.png` |
| Aspect collage tiles | `/public/aspects/<id>.png` |
| Product capabilities | `/public/product/<id>.png` |
| Use cases | `/public/usecases/<id>.png` |
| Customer before/after | `/public/customer/(before\|after)-<id>.png` |
| Marketing owner photos | `/public/owners/owner-<n>.png` |
| Audio brief (NotebookLM) | `/public/audio/brief.mp3` |
| Product demo video | `/public/video/product-demo.mp4` |

The site swaps from placeholder to real media automatically when the file exists.

## Dev

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

The password gate is enforced client-side via SHA-256 hash compare. Friction, not security — keep the URL private.

## Deploy

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages with `VITE_BASE=/aiwp-launch-brief/`.

---

Stack: Vite + React + TypeScript + TailwindCSS + framer-motion + OGL (WebGL mesh) + shadcn-style primitives. Hero kinetic typography and before/after slider patterns sourced via Magic MCP (21st.dev).
