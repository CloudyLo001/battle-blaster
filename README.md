# Battle Blaster

An interactive archive of five plasma casters. Pick a frame, fit modules, change
the finish, and inspect it in 3D.

Built with Vite, TypeScript and Three.js — no UI framework, no state library.
Every model and sound effect was generated with [Mint](https://mint.gg).

## Running it

```bash
npm install
npm run dev
```

The dev server listens on <http://localhost:5173>.

| Script | Does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the built output |

## Layout

```
src/
  main.ts              composition root — wires state, scene and UI
  app/state.ts         selection, loadouts, view toggles, finishes
  data/arsenal.ts      weapons, modules, stats, mount anchors
  data/finishes.ts     finish presets
  scene/showcase.ts    renderer, studio lighting, bloom, firing
  scene/material-finish.ts   applies a finish to a loaded model
  scene/patterns.ts    generated camo textures
  ui/                  topbar, index rail, spec panel, tool bar, notes
```

`mint-assets.json` is the generated-asset registry. It maps each logical key to
its Mint asset and the files under `public/assets/mint/`, and is written by
Mint's sync tooling — edit it by hand only for non-generated fields.

## Controls

Click the weapon to fire. `F` or the CTA inspects it. Drag to orbit, scroll to
zoom, double-click to reset. The tool bar carries Reset, Lift, Explode, Compare
and Sound; the sound setting persists across reloads.

## Deploying

Pushing to `main` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`. Set **Settings → Pages → Source** to
**GitHub Actions** once, and the rest is automatic.

Asset URLs are built from `import.meta.env.BASE_URL`, and `vite.config.ts` sets
`base: "./"`, so the app works from any subpath without knowing the repo name.

## Known limitation

Module mount points (`slots` in `data/arsenal.ts`) are bounding-box coordinates
that were tuned against an earlier, slimmer set of models. They have not been
re-measured against the current plasma bodies, so a fitted module can sit off
its frame. `Showcase.showHotspots = true` draws a marker at each anchor, which
is the intended way to re-tune them — the values are pure data and need no code
changes.
