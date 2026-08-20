# design-app — Gradient Studio

A modern design tool for crafting, previewing, and exporting CSS gradients. Built with
**React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**.

![Tech](https://img.shields.io/badge/React-18-61dafb) ![Tech](https://img.shields.io/badge/Vite-5-646cff) ![Tech](https://img.shields.io/badge/TypeScript-5-3178c6) ![Tech](https://img.shields.io/badge/TailwindCSS-3-38bdf8)

## Features

- Live gradient preview with a full-bleed ambient backdrop
- Linear and radial gradient types
- Adjustable angle and unlimited color stops (color + position)
- Curated presets (Sunset, Ocean, Grape, Mint, Aurora)
- One-click copy of production-ready CSS

## Requirements

- Node.js 20+ (developed on Node 22)
- npm 10+

## Getting started

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:5173
```

## Scripts

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the Vite dev server (port 5173)        |
| `npm run build`     | Type-check and build for production          |
| `npm run preview`   | Preview the production build (port 4173)      |
| `npm run lint`      | Run ESLint                                    |
| `npm run typecheck` | Type-check without emitting                   |

## Project structure

```
├─ index.html
├─ src/
│  ├─ main.tsx            # App entry
│  ├─ App.tsx             # Gradient Studio UI
│  ├─ index.css           # Tailwind layers + base styles
│  ├─ lib/gradient.ts     # Gradient model, CSS serialization, presets
│  └─ components/         # Preview, stop editor, code block
├─ vite.config.ts
├─ tailwind.config.js
└─ .cursor/environment.json   # Cloud Agent dev environment
```

## Cloud Agent environment

The dev environment is defined in [`.cursor/environment.json`](.cursor/environment.json):

- **install**: `npm ci` (falls back to `npm install` when no lockfile is present)
- **terminals**: runs `npm run dev` so the dev server is available on port 5173
